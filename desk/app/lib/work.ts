import { maybeEnv } from "./env";
import { HOUSE_REPO } from "./github";
import { limitReason } from "./limits";
import { inFlight, ownerVariable, runOf, tokenFor, type Run, type Token } from "./repos";

// The work in each client repo, read per request over the GitHub REST API: the tickets in
// `.icm/intake/` on the default branch and the pull requests. The data contract is the
// blueprint's `.icm/intake/CONTEXT.md` and its pull request template. The token is the
// owner's, as lib/repos.ts chooses it (ESTATE_PAT_<OWNER>, else ESTATE_PAT). It needs
// Contents, Metadata and Pull requests read, plus Actions and Commit statuses read for the CI
// word and the preview. Pull requests write lets Jamie tick a gate from the desk
// (lib/gates.ts). The CI word comes from the Actions runs on the head commit, not from the
// Checks API: a fine-grained token has no Checks permission (GitHub's token UI offers none;
// its docs list the Checks API among the gaps), and every repo's CI is check.yml, an Actions
// workflow. Vercel's own check is not an Actions run; its preview arrives as a commit status
// (why: one token type for the whole estate · 2026-10-21).
//
// Per repo: one recursive tree read filtered to `.icm/intake/`, one blob read per open stub
// and breakdown (cached forever by sha, because a sha is its content), the open pull
// requests with each head's Actions runs and commit statuses, and the pull requests merged in
// the last 14 days. The whole read is kept 60 seconds per repo in the function's memory, a
// failed read 30 seconds, and concurrent page views share the one read in flight. A failed
// read returns `error` in words and empty lists, and the page still renders. Each read says
// when it was made (`readAt`), so a list can say how old it is. A pull request whose CI is
// pending because a run is queued or running is in flight, like a run (workInFlight); the
// page re-reads itself while one is (components/desk/page-header.tsx).

export type StubState = "next" | "queued" | "blocked" | "running";

export interface Stub {
  path: string; // .icm/intake/<epic>/<slug>.md or .icm/intake/triage/<slug>.md
  slug: string; // the file name without .md
  featureSlug: string; // the feature-slug line, else the file name
  title: string; // the H1 without "Stub: "
  epic: string | null; // the epic folder; null for triage
  sequence: number | null;
  sequenceOf: number | null;
  dependsOn: string[];
  complexity: string | null;
  priority: string | null;
  blocked: string | null; // the reason
  lane: string | null; // triage only
  foundBy: string | null;
  state: StubState;
  pr: number | null; // the open pull request matched to it
  body: string; // the stub's text after its meta lines, markdown; "" when the blob was not read
  prompt: string | null; // the stub's own "## Prompt" section, when it has one
}

export interface Epic {
  name: string; // the folder
  title: string; // the breakdown's H1 without "Breakdown: ", else the folder
  open: Stub[]; // by sequence
  done: number;
  total: number;
}

export type GateState = "ticked" | "open" | "not-required";
export type GateName = "spec-approved" | "ready-to-merge";
export type Ci = "green" | "red" | "pending" | "none";
// The act that waits on Jamie: a gate to tick, or the merge.
export type Waiting = GateName | "merge";

export interface Pr {
  number: number;
  title: string;
  url: string;
  draft: boolean;
  headBranch: string;
  ticketPath: string | null; // the `- ticket:` line
  stub: string | null; // the path of the open stub matched to it
  gates: { specApproved: GateState; readyToMerge: GateState };
  ci: Ci;
  run: Run | null; // the head's Actions run the word comes from: the one in flight, else the newest
  preview: string | null;
  updatedAt: string; // YYYY-MM-DD
  waiting: Waiting | null;
}

export interface Merged {
  number: number;
  title: string;
  url: string;
  mergedAt: string; // YYYY-MM-DD
}

export interface RepoWork {
  repo: string;
  branch: string; // the default branch, where the intake is read
  runScript: boolean; // .icm/scripts/new-run.sh exists: the blueprint's loop starts a ticket with it
  epics: Epic[];
  triage: Stub[];
  prs: Pr[];
  merged: Merged[];
  waitingOnJamie: Pr[];
  error: string | null;
  readAt: number; // epoch ms: when this read was made
}

const API = "https://api.github.com";
const FRESH_MS = 60 * 1000;
const FAILED_MS = 30 * 1000;
const TIMEOUT_MS = 5000;
const REPO_RE = /^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/;
const INTAKE = ".icm/intake/";
const RUN_SCRIPT = ".icm/scripts/new-run.sh";
const STUB_CAP = 80;
const MERGED_DAYS = 14;
const OPEN_PRS = 30;
const CLOSED_PRS = 15;
const BATCH = 8;
const GREEN = new Set(["success", "neutral", "skipped"]);
const RED = new Set(["failure", "timed_out", "cancelled", "startup_failure"]);

const cache = new Map<string, { at: number; ttl: number; value: Promise<RepoWork> }>();
const blobs = new Map<string, Promise<string>>();

// A read that failed with a sentence to show. Any other error shows "GitHub read failed".
export class ReadFailed extends Error {}

export interface Answer {
  status: number;
  body: unknown;
}

const obj = (v: unknown): Record<string, unknown> =>
  v !== null && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
const list = (v: unknown): Record<string, unknown>[] => (Array.isArray(v) ? v.map(obj) : []);
const str = (v: unknown): string => String(v ?? "");
const day = (v: unknown): string => str(v).slice(0, 10);

// One request with the owner's token. The timeout and the words are those of lib/repos.ts.
export async function request(token: Token, method: string, path: string, body?: unknown): Promise<Answer> {
  let res: Response;
  try {
    res = await fetch(`${API}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "legible-desk",
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    throw new ReadFailed("GitHub did not answer");
  }
  if (res.status === 401) throw new ReadFailed(`GitHub refuses ${token.name} (401)`);
  const limited = limitReason(res);
  if (limited) throw new ReadFailed(limited);
  const json: unknown = await res.json().catch(() => ({}));
  return { status: res.status, body: json };
}

// The token for a repo, or the sentence that says which variable is missing.
export function tokenOrReason(repo: string): { token: Token } | { reason: string } {
  if (!REPO_RE.test(repo)) return { reason: `repo: "${repo}" is not owner/name` };
  // The house's own tickets (.icm/intake/ in this repo) read with DESK_PAT, the token that
  // reaches the house; the estate tokens cover the client owners only.
  if (repo === HOUSE_REPO) {
    const value = maybeEnv("DESK_PAT");
    return value ? { token: { name: "DESK_PAT", value } } : { reason: "DESK_PAT is not set" };
  }
  const owner = repo.split("/")[0]!;
  const token = tokenFor(owner);
  if (!token) return { reason: `${ownerVariable(owner)} and ESTATE_PAT are not set` };
  return { token };
}

async function inBatches<T, R>(items: T[], fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = [];
  for (let i = 0; i < items.length; i += BATCH) {
    out.push(...(await Promise.all(items.slice(i, i + BATCH).map(fn))));
  }
  return out;
}

// --- The tree and the blobs ---------------------------------------------------------------

interface Entry {
  path: string; // from the repo root
  sha: string;
  type: string;
}

const entriesOf = (body: unknown, prefix = ""): Entry[] =>
  list(obj(body).tree).map((e) => ({ path: prefix + str(e.path), sha: str(e.sha), type: str(e.type) }));

// Every entry under .icm/intake/, and whether .icm/scripts/new-run.sh exists (the start of
// the loop, blueprint .icm/intake/CONTEXT.md). A truncated answer may have cut the intake, so
// then the intake's own tree is read by its sha: that tree is small and comes whole.
async function intakeEntries(
  token: Token,
  repo: string,
  branch: string,
): Promise<{ inside: Entry[]; runScript: boolean }> {
  const t = await request(token, "GET", `/repos/${repo}/git/trees/${encodeURIComponent(branch)}?recursive=1`);
  if (t.status !== 200) throw new ReadFailed(`GitHub answered ${t.status} for the tree of ${repo}`);
  const entries = entriesOf(t.body);
  const runScript = entries.some((e) => e.path === RUN_SCRIPT && e.type === "blob");
  const inside = entries.filter((e) => e.path.startsWith(INTAKE));
  if (obj(t.body).truncated !== true) return { inside, runScript };
  const root = entries.find((e) => e.path === ".icm/intake" && e.type === "tree");
  if (!root) return { inside, runScript };
  const sub = await request(token, "GET", `/repos/${repo}/git/trees/${root.sha}?recursive=1`);
  if (sub.status !== 200) throw new ReadFailed(`GitHub answered ${sub.status} for the intake tree of ${repo}`);
  return { inside: entriesOf(sub.body, INTAKE), runScript };
}

// A blob's text, kept forever by sha: a sha is its content. A failed read is not kept.
function blob(token: Token, repo: string, sha: string): Promise<string> {
  const hit = blobs.get(sha);
  if (hit) return hit;
  const value = request(token, "GET", `/repos/${repo}/git/blobs/${sha}`).then((a) => {
    if (a.status !== 200) throw new ReadFailed(`GitHub answered ${a.status} for a file of ${repo}`);
    const b = obj(a.body);
    const content = str(b.content);
    return b.encoding === "base64" ? Buffer.from(content, "base64").toString("utf8") : content;
  });
  blobs.set(sha, value);
  value.catch(() => blobs.delete(sha));
  return value;
}

// --- The stubs ----------------------------------------------------------------------------

interface Meta {
  title: string;
  fields: Map<string, string>;
}

// The H1 and the `- key: value` lines before the first `##`.
function parseMeta(text: string, kind: "Stub" | "Breakdown"): Meta {
  const fields = new Map<string, string>();
  let title = "";
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (/^##\s/.test(line)) break;
    const h1 = /^#\s+(.+)$/.exec(line);
    if (h1 && !title) {
      title = h1[1]!.replace(new RegExp(`^${kind}:\\s*`, "i"), "").trim();
      continue;
    }
    const field = /^-\s+([a-z][a-z-]*):\s*(.*)$/i.exec(line);
    if (field && !fields.has(field[1]!.toLowerCase())) fields.set(field[1]!.toLowerCase(), field[2]!.trim());
  }
  return { title, fields };
}

const sequenceOf = (v: string | undefined): [number | null, number | null] => {
  const m = /^(\d+)(?:\s+of\s+(\d+))?/.exec(v ?? "");
  return m ? [Number(m[1]), m[2] ? Number(m[2]) : null] : [null, null];
};

const dependsOnOf = (v: string | undefined): string[] =>
  (v ?? "")
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter((s) => s && s.toLowerCase() !== "none");

const humanize = (slug: string) => slug.replace(/-/g, " ");

// The stub's text after its meta lines, and its own "## Prompt" section when it has one: the
// words that start it in a session. The Prompt section leaves the body, so the page shows it
// once, beside the copy button.
function sections(text: string): { body: string; prompt: string | null } {
  const lines = text.split(/\r?\n/);
  const first = lines.findIndex((l) => /^##\s/.test(l.trim()));
  const body: string[] = [];
  const prompt: string[] = [];
  let inPrompt = false;
  for (const line of first < 0 ? [] : lines.slice(first)) {
    const heading = /^##\s/.test(line.trim());
    if (heading) inPrompt = /^##\s+prompt\s*$/i.test(line.trim());
    if (!inPrompt) body.push(line);
    else if (!heading) prompt.push(line);
  }
  return { body: body.join("\n").trim(), prompt: prompt.join("\n").trim() || null };
}

function stubOf(path: string, epic: string | null, text: string | null): Stub {
  const slug = path.slice(path.lastIndexOf("/") + 1).replace(/\.md$/, "");
  const meta = text === null ? { title: "", fields: new Map<string, string>() } : parseMeta(text, "Stub");
  const { body, prompt } = text === null ? { body: "", prompt: null } : sections(text);
  const f = meta.fields;
  const [sequence, sequenceTotal] = sequenceOf(f.get("sequence"));
  const blocked = f.get("blocked") ?? null;
  return {
    path,
    slug,
    featureSlug: f.get("feature-slug") || slug,
    title: meta.title || humanize(slug),
    epic,
    sequence,
    sequenceOf: sequenceTotal,
    dependsOn: dependsOnOf(f.get("depends-on")),
    complexity: f.get("complexity") ?? null,
    priority: f.get("priority") ?? null,
    blocked: blocked === "" ? null : blocked,
    lane: f.get("lane") ?? null,
    foundBy: f.get("found-by") ?? null,
    state: "queued",
    pr: null,
    body,
    prompt,
  };
}

interface Intake {
  epics: Map<string, { breakdownSha: string | null; open: { path: string; sha: string }[]; done: number }>;
  triage: { path: string; sha: string }[];
}

// The layout, from the paths. Root files are not tickets. `_done/<epic>/` is finished and
// not shown. Deeper paths are ignored.
function layout(entries: Entry[]): Intake {
  const epics: Intake["epics"] = new Map();
  const triage: Intake["triage"] = [];
  const epicOf = (name: string) => {
    let e = epics.get(name);
    if (!e) {
      e = { breakdownSha: null, open: [], done: 0 };
      epics.set(name, e);
    }
    return e;
  };
  for (const e of entries) {
    if (e.type !== "blob" || !e.path.endsWith(".md")) continue;
    const parts = e.path.slice(INTAKE.length).split("/");
    if (parts.length < 2 || parts[0] === "_done") continue;
    if (parts[0] === "triage") {
      if (parts.length === 2) triage.push({ path: e.path, sha: e.sha });
      continue;
    }
    const epic = epicOf(parts[0]!);
    if (parts.length === 2) {
      if (parts[1] === "breakdown.md") epic.breakdownSha = e.sha;
      else epic.open.push({ path: e.path, sha: e.sha });
    } else if (parts.length === 3 && parts[1] === "_done") {
      epic.done += 1;
    }
  }
  return { epics, triage };
}

// --- The pull requests --------------------------------------------------------------------

// The gate's state from the body: the first checklist line after the anchor. A missing
// anchor means the gate is not required.
export function gateOf(body: string, name: GateName): GateState {
  const lines = body.split(/\r?\n/);
  const at = lines.findIndex((l) => l.includes(`<!-- gate:${name} -->`));
  if (at < 0) return "not-required";
  for (let i = at + 1; i < lines.length; i++) {
    const line = lines[i]!.trim();
    if (!line) continue;
    const box = /^-\s+\[([ xX])\]/.exec(line);
    return box && box[1] !== " " ? "ticked" : "open";
  }
  return "open";
}

// The body with the gate's `- [ ]` ticked: the first checklist line after the anchor. Null
// when the body has no open box there. Line endings are kept.
export function tickedBody(body: string, name: GateName): string | null {
  const lines = body.split("\n");
  const at = lines.findIndex((l) => l.includes(`<!-- gate:${name} -->`));
  if (at < 0) return null;
  for (let i = at + 1; i < lines.length; i++) {
    const line = lines[i]!;
    if (!line.trim()) continue;
    if (!/^\s*-\s+\[ \]/.test(line)) return null;
    lines[i] = line.replace("[ ]", "[x]");
    return lines.join("\n");
  }
  return null;
}

const ticketPathOf = (body: string): string | null => {
  const m = /^-\s*ticket:\s*`?\s*(\.\/)?(\.icm\/intake\/\S+?\.md)\s*`?\s*$/im.exec(body);
  return m ? m[2]! : null;
};

const slugOf = (body: string): string | null => {
  const row = /\|\s*\*\*Slug\*\*\s*\|\s*`([^`]+)`\s*\|/.exec(body);
  if (row) return row[1]!.trim();
  const line = /^-\s*slug:\s*`?([A-Za-z0-9._-]+)`?\s*$/im.exec(body);
  return line ? line[1]! : null;
};

const previewOf = (body: string): string | null => {
  const m = /^-\s*preview:\s*(https?:\/\/\S+)/im.exec(body);
  return m ? m[1]! : null;
};

// The slugs a head branch may name: the branch, `triage/<slug>` and `claude/<slug>-<hex>`.
function branchSlugs(branch: string): string[] {
  const out = [branch];
  if (branch.startsWith("triage/")) out.push(branch.slice("triage/".length));
  const claude = /^claude\/(.+)-[a-z0-9]{6}$/.exec(branch);
  if (claude) out.push(claude[1]!);
  return out;
}

// The CI word from the Actions runs on one commit: red if any run failed, pending while one
// runs or has no verdict yet, green when every run concluded well, none without a run.
function ciOf(runs: Record<string, unknown>[]): Ci {
  if (runs.length === 0) return "none";
  let pending = false;
  for (const r of runs) {
    if (r.status !== "completed") {
      pending = true;
      continue;
    }
    const c = str(r.conclusion);
    if (RED.has(c)) return "red";
    if (!GREEN.has(c)) pending = true; // action_required, stale: not a verdict yet
  }
  return pending ? "pending" : "green";
}

// The run the CI word comes from: the first one in flight, else the newest. GitHub lists
// the runs newest first.
const runFor = (runs: Record<string, unknown>[]): Run | null => {
  const raw = runs.find((r) => r.status !== "completed") ?? runs[0];
  return raw ? runOf(raw) : null;
};

// A Vercel preview arrives as a commit status with a target_url.
const vercelPreview = (statuses: Record<string, unknown>[]): string | null => {
  const s = statuses.find((x) => str(x.context).startsWith("Vercel") && x.state === "success" && str(x.target_url));
  return s ? str(s.target_url) : null;
};

// The next act is Jamie's when CI is green and a gate is open, or when a ready pull request
// has every gate ticked or not required and waits for the merge. A draft waits only for
// Spec approved.
function waitingOf(p: Omit<Pr, "waiting">): Waiting | null {
  if (p.ci !== "green") return null;
  if (p.gates.specApproved === "open") return "spec-approved";
  if (p.draft) return null;
  if (p.gates.readyToMerge === "open") return "ready-to-merge";
  return "merge";
}

async function pulls(token: Token, repo: string, query: string): Promise<Record<string, unknown>[]> {
  const a = await request(token, "GET", `/repos/${repo}/pulls?${query}`);
  if (a.status !== 200) throw new ReadFailed(`GitHub answered ${a.status} for the pull requests of ${repo}`);
  return list(a.body);
}

async function prOf(token: Token, repo: string, raw: Record<string, unknown>): Promise<Omit<Pr, "waiting">> {
  const head = obj(raw.head);
  const sha = str(head.sha);
  const body = str(raw.body);
  const [runsAnswer, status] = await Promise.all([
    request(token, "GET", `/repos/${repo}/actions/runs?head_sha=${sha}&per_page=100`),
    request(token, "GET", `/repos/${repo}/commits/${sha}/status`),
  ]);
  if (runsAnswer.status !== 200) {
    throw new ReadFailed(
      `${token.name} cannot read the Actions runs of ${repo} (${runsAnswer.status}): it needs Actions read`,
    );
  }
  const runs = list(obj(runsAnswer.body).workflow_runs);
  if (status.status !== 200) {
    throw new ReadFailed(
      `${token.name} cannot read the commit statuses of ${repo} (${status.status}): it needs Commit statuses read`,
    );
  }
  return {
    number: Number(raw.number),
    title: str(raw.title),
    url: str(raw.html_url),
    draft: raw.draft === true,
    headBranch: str(head.ref),
    ticketPath: ticketPathOf(body),
    stub: null,
    gates: { specApproved: gateOf(body, "spec-approved"), readyToMerge: gateOf(body, "ready-to-merge") },
    ci: ciOf(runs),
    run: runFor(runs),
    preview: previewOf(body) ?? vercelPreview(list(obj(status.body).statuses)),
    updatedAt: day(raw.updated_at),
  };
}

// The open stub a pull request ships: by the ticket path, else by the slug in the body,
// else by the head branch.
function matchStub(pr: Omit<Pr, "waiting">, body: string, stubs: Stub[]): Stub | undefined {
  if (pr.ticketPath) {
    const byPath = stubs.find((s) => s.path === pr.ticketPath);
    if (byPath) return byPath;
  }
  const bySlug = (slug: string) => stubs.find((s) => s.featureSlug === slug || s.slug === slug);
  const slug = slugOf(body);
  if (slug) {
    const hit = bySlug(slug);
    if (hit) return hit;
  }
  for (const candidate of branchSlugs(pr.headBranch)) {
    const hit = bySlug(candidate);
    if (hit) return hit;
  }
  return undefined;
}

// --- The read -----------------------------------------------------------------------------

async function read(token: Token, repo: string, readAt: number): Promise<RepoWork> {
  const empty: RepoWork = {
    repo,
    branch: "",
    runScript: false,
    epics: [],
    triage: [],
    prs: [],
    merged: [],
    waitingOnJamie: [],
    error: null,
    readAt,
  };
  try {
    // The repo first: a 404 here means the repo does not exist or the token cannot see it.
    const meta = await request(token, "GET", `/repos/${repo}`);
    if (meta.status === 404 || meta.status === 403) {
      const own = ownerVariable(repo.split("/")[0]!);
      const hint = token.name === own ? "" : `. A token for this owner goes in ${own}`;
      return { ...empty, error: `${token.name} cannot read ${repo} (${meta.status})${hint}` };
    }
    if (meta.status !== 200) return { ...empty, error: `GitHub answered ${meta.status} for ${repo}` };
    const branch = str(obj(meta.body).default_branch) || "main";

    const [{ inside: entries, runScript }, openRaw, closedRaw] = await Promise.all([
      intakeEntries(token, repo, branch),
      pulls(token, repo, `state=open&per_page=${OPEN_PRS}`),
      pulls(token, repo, `state=closed&sort=updated&direction=desc&per_page=${CLOSED_PRS}`),
    ]);

    // The stubs: the first 80 open ones by path are read, the rest show their file name.
    const intake = layout(entries);
    const openFiles = [
      ...[...intake.epics].flatMap(([epic, e]) => e.open.map((f) => ({ ...f, epic: epic as string | null }))),
      ...intake.triage.map((f) => ({ ...f, epic: null as string | null })),
    ].sort((a, b) => a.path.localeCompare(b.path));
    const toRead = new Set(openFiles.slice(0, STUB_CAP).map((f) => f.sha));
    const stubs = await inBatches(openFiles, async (f) =>
      stubOf(f.path, f.epic, toRead.has(f.sha) ? await blob(token, repo, f.sha) : null),
    );
    const titles = await inBatches([...intake.epics], async ([name, e]) => {
      if (!e.breakdownSha) return [name, name] as const;
      const text = await blob(token, repo, e.breakdownSha);
      return [name, parseMeta(text, "Breakdown").title || name] as const;
    });
    const titleOf = new Map(titles);

    // The pull requests, then the match to a stub: a matched stub is running.
    const details = await inBatches(openRaw, (raw) => prOf(token, repo, raw));
    const prs: Pr[] = details.map((d, i) => {
      const stub = matchStub(d, str(openRaw[i]!.body), stubs);
      if (stub) {
        stub.state = "running";
        stub.pr = d.number;
      }
      return { ...d, stub: stub?.path ?? null, waiting: waitingOf(d) };
    });

    // The states. A dependency is met when no open stub carries that slug: it is in _done/,
    // or it does not exist. One stub per epic is next: the lowest sequence whose
    // dependencies are met, among the stubs that are neither running nor blocked.
    const openSlugs = new Set(stubs.flatMap((s) => [s.slug, s.featureSlug]));
    for (const s of stubs) {
      if (s.state === "running") continue;
      if (s.blocked) s.state = "blocked";
    }
    const bySeq = (a: Stub, b: Stub) => (a.sequence ?? 1e9) - (b.sequence ?? 1e9) || a.slug.localeCompare(b.slug);
    const epics: Epic[] = [...intake.epics]
      .map(([name, e]) => {
        const open = stubs.filter((s) => s.epic === name).sort(bySeq);
        const next = open.find((s) => s.state === "queued" && s.dependsOn.every((d) => !openSlugs.has(d)));
        if (next) next.state = "next";
        return { name, title: titleOf.get(name) ?? name, open, done: e.done, total: open.length + e.done };
      })
      .sort((a, b) => Number(a.open.length === 0) - Number(b.open.length === 0) || a.name.localeCompare(b.name));
    const triage = stubs.filter((s) => s.epic === null).sort((a, b) => a.slug.localeCompare(b.slug));

    const since = Date.now() - MERGED_DAYS * 24 * 60 * 60 * 1000;
    const merged: Merged[] = closedRaw
      .filter((p) => p.merged_at && Date.parse(str(p.merged_at)) >= since)
      .map((p) => ({ number: Number(p.number), title: str(p.title), url: str(p.html_url), mergedAt: day(p.merged_at) }));

    return {
      repo,
      branch,
      runScript,
      epics,
      triage,
      prs,
      merged,
      waitingOnJamie: prs.filter((p) => p.waiting),
      error: null,
      readAt,
    };
  } catch (e) {
    return { ...empty, error: e instanceof ReadFailed ? e.message : "GitHub read failed" };
  }
}

// One repo's work, from the cache when it is fresh. `repo` is the record's `repo:` field.
export function repoWork(repo: string): Promise<RepoWork> {
  const now = Date.now();
  const empty = { repo, branch: "", runScript: false, epics: [], triage: [], prs: [], merged: [], waitingOnJamie: [], readAt: now };
  const t = tokenOrReason(repo);
  if ("reason" in t) return Promise.resolve({ ...empty, error: t.reason });
  const hit = cache.get(repo);
  if (hit && now - hit.at < hit.ttl) return hit.value;
  const value = read(t.token, repo, now);
  const entry = { at: now, ttl: FRESH_MS, value };
  cache.set(repo, entry);
  void value.then((w) => {
    if (w.error) entry.ttl = FAILED_MS;
  });
  return value;
}

// Forgets one repo's read, so the next page view reads again (after a tick).
export function dropWork(repo: string): void {
  cache.delete(repo);
}

// Whether a pull request of the repo has a run queued or running on its head. A completed
// run without a verdict (action_required, stale) waits for a hand and is not in flight. A
// failed read is not in flight.
export const workInFlight = (repo: string): Promise<boolean> =>
  repoWork(repo).then((w) => w.prs.some((p) => inFlight(p.run)));

// --- The steps, the path and the summary --------------------------------------------------

// A ticket's walk through its pull request (desk/app/DESIGN.md, the five steps): spec, build,
// check, ready, merge. A step is done when spec: Spec approved is ticked or not required;
// build: the pull request is not a draft; check: CI is green; ready: Ready to merge is ticked
// or not required; merge: the pull request is merged. The current step is the first step not
// done. A ticket with no pull request has no step: its state is its column.
export type Step = "spec" | "build" | "check" | "ready" | "merge";
export const STEPS: readonly Step[] = ["spec", "build", "check", "ready", "merge"];

const passed = (g: GateState) => g !== "open";

// The current step of an open pull request, or `done` for a merged one: a merged pull
// request leaves `prs` and enters `merged`.
export function stepOf(pr: Pr | Merged): Step | "done" {
  if (!("gates" in pr)) return "done";
  if (!passed(pr.gates.specApproved)) return "spec";
  if (pr.draft) return "build";
  if (pr.ci !== "green") return "check";
  if (!passed(pr.gates.readyToMerge)) return "ready";
  return "merge";
}

// A ticket's page on the desk: its intake path under its project (DESIGN.md, rule 12).
// `client` is the client folder's slug, or `house` for the house's own tickets.
export function ticketHref(client: string, stub: Pick<Stub, "epic" | "slug">): string {
  const parts = [client, stub.epic ?? "triage", stub.slug].map(encodeURIComponent);
  return `/work/${parts.join("/")}`;
}

export interface Summary {
  next: number;
  running: number;
  blocked: number;
  queued: number;
  waiting: number; // the pull requests whose next act is Jamie's
  nextStub: Stub | null; // an epic's next, else the first queued triage stub
}

// A repo's work in counts, for a header's quiet line and a project row.
export function summaryOf(w: RepoWork): Summary {
  const stubs = [...w.epics.flatMap((e) => e.open), ...w.triage];
  const count = (state: StubState) => stubs.filter((s) => s.state === state).length;
  return {
    next: count("next"),
    running: count("running"),
    blocked: count("blocked"),
    queued: count("queued"),
    waiting: w.waitingOnJamie.length,
    nextStub:
      w.epics.flatMap((e) => e.open).find((s) => s.state === "next") ??
      w.triage.find((s) => s.state === "queued") ??
      null,
  };
}

// --- The start of a ticket ----------------------------------------------------------------

// The words that start a ticket in a session, copied from the desk: the stub's own Prompt
// section when it has one; else the start of the loop in the blueprint's words when the repo
// has new-run.sh; else a plain read-and-do line for a repo with its own conventions.
export function startPrompt(w: RepoWork, s: Stub): string {
  if (s.prompt) return s.prompt;
  const ref = s.path.slice(INTAKE.length).replace(/\.md$/, "");
  if (w.runScript) {
    return (
      `In ${w.repo}, read .icm/intake/CONTEXT.md, then run .icm/scripts/new-run.sh ${ref} and build the stub ` +
      `${s.path} as the loop says. Stop at the first gate. Your last message names the pull request and what ` +
      `waits on Jamie.`
    );
  }
  return (
    `In ${w.repo}, read ${s.path} for the full context, then do the work it describes. Follow the repo's own ` +
    `CLAUDE.md and .icm/ contracts. Stop at the first gate and say what waits on Jamie.`
  );
}

// The stub's file on GitHub, on the default branch.
export const stubUrl = (w: RepoWork, s: Stub): string =>
  `https://github.com/${w.repo}/blob/${w.branch || "main"}/${s.path}`;
