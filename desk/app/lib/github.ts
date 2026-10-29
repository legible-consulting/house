import { parse } from "yaml";
import { env, maybeEnv } from "./env";
import { limitReason } from "./limits";
import { FLIGHT_MS, inFlight, runOf, type Run } from "./repos";
import type { FileChange } from "./writes";

// The desk's client for the house itself, with DESK_PAT (a fine-grained token on this repo
// only: Contents, Pull requests and Actions, read and write). Every commit goes through
// commitToHouse (lib/writes.ts), which checks the action against the table "The desk's writes
// to main" in desk/CONTEXT.md, then calls putContents or commitFiles here. Five uses:
// - "Ready for Jamie": one commit on main of legible-consulting/house that creates
//   clients/<slug>/record.md at stage prospect, and moves the lead's answers from
//   01-prospecting/leads/<slug>/ into clients/<slug>/<folder>/ (planHandoff, then commitToHouse
//   "handoff", which calls commitFiles). The commit carries the desk's identity; the account
//   that owns DESK_PAT moves main. The commit is the handoff.
// - The research queue: one file per link Jamie shares to the desk, written to main
//   (commitToHouse "share"), and the folder as it stands for /research (listFolder, then readOnMain for
//   each file). A file the intake marks unresolved is named or dropped (commitToHouse
//   "queue-name"). lib/research.ts.
// - Refresh: a manual run of a house workflow on main (dispatchWorkflow, lib/refresh.ts).
// - The latest run of each house workflow, any status (houseRun): the sync pill says
//   queued, running or done.
// - The distance from the build's commit to main (distance): the sync pill says up to date,
//   deploying, or out of sync.
// The two reads keep the posture of lib/repos.ts: a module-level map each, concurrent views
// share the one read in flight, a failed read is kept shorter, no-store on the fetch, a
// 5-second timeout. Each read fails only its own line, in words, and the page renders.

// The house itself. lib/work.ts reads its tickets with the same token.
export const HOUSE_REPO = "legible-consulting/house";
const COMMITTER = { name: "desk", email: "desk@users.noreply.github.com" };
const TIMEOUT_MS = 5000;

interface GhResponse {
  status: number;
  body: Record<string, unknown>;
  limited: string | null; // the sentence when GitHub's rate limit is reached (lib/limits.ts)
}

async function gh(method: string, path: string, body?: unknown, timeoutMs?: number): Promise<GhResponse> {
  const res = await fetch(`https://api.github.com/repos/${HOUSE_REPO}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${env("DESK_PAT")}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "legible-desk",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
    signal: timeoutMs ? AbortSignal.timeout(timeoutMs) : undefined,
  });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { status: res.status, body: json, limited: limitReason(res) };
}

function fail(step: string, r: GhResponse): never {
  const msg = typeof r.body.message === "string" ? r.body.message : "no message";
  throw new Error(`GitHub ${step} failed (${r.status}): ${msg}`);
}

const LEADS = "01-prospecting/leads";
// A client subfolder: the `folder:` of an answers file names one (01-prospecting/CONTEXT.md).
const FOLDER = /^[a-z0-9][a-z0-9-]*$/;

interface Move {
  from: string;
  to: string;
  content: string; // base64, as the Contents API gives it and takes it
}

// The lead's answers on main, each with the path the handoff moves it to:
// clients/<slug>/<folder>/<name>, where <folder> is the file's frontmatter. A lead without a
// folder has none. Read before any write, so a file that names no folder stops the handoff
// with nothing made.
async function leadMoves(slug: string): Promise<Move[]> {
  const dir = `${LEADS}/${slug}`;
  const list = await listFolder(dir);
  if (!list.ok) throw new Error(`Cannot read ${dir}/: ${list.reason}.`);
  const moves: Move[] = [];
  for (const { name } of list.files) {
    const from = `${dir}/${name}`;
    const r = await gh("GET", `/contents/${from}?ref=main`);
    if (r.status !== 200) fail(`read ${from}`, r);
    const content = String(r.body.content ?? "").replace(/\n/g, "");
    const head = /^---\r?\n([\s\S]*?)\r?\n---/.exec(Buffer.from(content, "base64").toString("utf8"))?.[1];
    let folder: unknown;
    try {
      folder = head ? (parse(head) as Record<string, unknown> | null)?.folder : undefined;
    } catch {
      folder = undefined;
    }
    if (typeof folder !== "string" || !FOLDER.test(folder)) {
      throw new Error(`${from} names no folder in its frontmatter. Move it by hand, then hand off again.`);
    }
    moves.push({ from, to: `clients/${slug}/${folder}/${name}`, content });
  }
  return moves;
}

// The files of the handoff's one commit: the record, and each of the lead's answers created
// at its new path and deleted at the old one. Reads only: a file that names no folder throws
// here, before the row or main changes.
export async function planHandoff(slug: string, record: string): Promise<FileChange[]> {
  const moves = await leadMoves(slug);
  return [
    { path: `clients/${slug}/record.md`, content: record },
    ...moves.flatMap((m): FileChange[] => [
      { path: m.to, content: Buffer.from(m.content, "base64").toString("utf8") },
      { path: m.from, delete: true },
    ]),
  ];
}

// The two runs Jamie starts from the desk, each a workflow_dispatch of rhythms.yml on main
// with its `rhythm` input; the close takes an optional `month` (YYYY-MM).
export type WorkflowFile = "rhythms.yml";
export type RunKey = "glance" | "close";

export const RUNS: Record<RunKey, { label: string; file: WorkflowFile; inputs: Record<string, string> }> = {
  glance: { label: "Glance", file: "rhythms.yml", inputs: { rhythm: "glance" } },
  close: { label: "Monthly close", file: "rhythms.yml", inputs: { rhythm: "close" } },
};

// The house workflows the sync pill follows.
export const WORKFLOWS: WorkflowFile[] = ["rhythms.yml"];

export const isRunKey = (v: unknown): v is RunKey => typeof v === "string" && Object.hasOwn(RUNS, v);

// The workflow's runs page on GitHub, where Jamie follows a run.
export const runsUrl = (file: WorkflowFile) => `https://github.com/${HOUSE_REPO}/actions/workflows/${file}`;

// Start one run of a house workflow on main. GitHub answers 204 and queues the run: the run
// itself commits to main when its file changed, and Vercel redeploys the desk from that
// push. The call needs Actions write on DESK_PAT. GitHub answers 403 when the token has no
// Actions write, and 404 when the token cannot see the workflow at all; both say so here in
// words, with GitHub's own message. A start forgets the workflow's cached run, so the next
// view reads again.
export async function dispatchWorkflow(file: WorkflowFile, inputs: Record<string, string> = {}): Promise<void> {
  const r = await gh("POST", `/actions/workflows/${file}/dispatches`, {
    ref: "main",
    ...(Object.keys(inputs).length ? { inputs } : {}),
  });
  if (r.status === 204) {
    runs.delete(file);
    return;
  }
  if (r.status === 403 || r.status === 404) {
    const msg = typeof r.body.message === "string" ? r.body.message : "no message";
    throw new Error(
      `DESK_PAT cannot start ${file} (${r.status}: ${msg}). Give it Actions read and write on ${HOUSE_REPO}, then redeploy the desk.`,
    );
  }
  fail(`start ${file}`, r);
}

// --- The reads for the page: the house's runs and the distance to main --------------------

class Unreachable extends Error {}

// One read of the house for a line on the page, with the words of lib/repos.ts when the
// token is unset, GitHub does not answer in 5 seconds, refuses the token or is rate-limited
// (with the time the limit resets).
async function read(path: string): Promise<GhResponse> {
  if (!maybeEnv("DESK_PAT")) throw new Unreachable("DESK_PAT is not set");
  let r: GhResponse;
  try {
    r = await gh("GET", path, undefined, TIMEOUT_MS);
  } catch {
    throw new Unreachable("GitHub did not answer");
  }
  if (r.status === 401) throw new Unreachable("GitHub refuses DESK_PAT (401)");
  if (r.limited) throw new Unreachable(r.limited);
  return r;
}

const reason = (e: unknown): string => (e instanceof Unreachable ? e.message : "GitHub read failed");

interface Entry<T> {
  at: number;
  ttl: number;
  value: Promise<T>;
}

// --- The latest run of a house workflow ---------------------------------------------------

export type RunRead = { ok: true; run: Run | null } | { ok: false; reason: string };

const RUN_DONE_MS = 5 * 60 * 1000;
const RUN_FAILED_MS = 60 * 1000;
// How long a start made from the desk is followed: after it, ?started= and ?at= are stale.
const START_MS = 10 * 60 * 1000;
// The margin between the desk's clock and GitHub's when a run is matched to a start.
const CLOCK_MS = 30 * 1000;

const runs = new Map<WorkflowFile, Entry<RunRead>>();

async function readRun(file: WorkflowFile): Promise<RunRead> {
  try {
    const r = await read(`/actions/workflows/${file}/runs?per_page=1`);
    if (r.status !== 200) return { ok: false, reason: `GitHub answered ${r.status} for the runs of ${file}` };
    const raw = (r.body.workflow_runs as Record<string, unknown>[] | undefined)?.[0];
    return { ok: true, run: raw ? runOf(raw) : null };
  } catch (e) {
    return { ok: false, reason: reason(e) };
  }
}

// A start Jamie made from the desk, from the page's query (?started=<key>&at=<seconds>,
// lib/refresh.ts): the run and its time, or null when there is none, it is older than ten
// minutes, or its time is not one.
export interface Start {
  key: RunKey;
  file: WorkflowFile;
  at: number; // epoch ms
}

export function startOf(q: Record<string, string | string[] | undefined>): Start | null {
  const key = q.started;
  const at = Number(q.at) * 1000;
  if (!isRunKey(key) || !Number.isFinite(at) || at <= 0) return null;
  const age = Date.now() - at;
  if (age > START_MS || age < -60 * 1000) return null;
  return { key, file: RUNS[key].file, at };
}

// Whether the run is the one a start made, or a later one: GitHub lists a dispatched run a
// few seconds after the 204, so a run created before the start is an earlier run.
export const since = (run: Run | null, start: Start | null): boolean =>
  start === null || (run !== null && Date.parse(run.created) >= start.at - CLOCK_MS);

// The latest run of a house workflow, any status, from the cache when it is fresh: 1 minute
// while the run is queued or running, 5 minutes when it is done, 1 minute after a failed
// read. While a start Jamie made on this workflow is followed (`start`), the read is at most
// 1 minute old as well, so the new run shows on the next re-read after GitHub lists it.
export function houseRun(file: WorkflowFile, start: Start | null = null): Promise<RunRead> {
  const now = Date.now();
  const maxAge = start?.file === file ? FLIGHT_MS : Infinity;
  const hit = runs.get(file);
  if (hit && now - hit.at < Math.min(hit.ttl, maxAge)) return hit.value;
  const value = readRun(file);
  const entry = { at: now, ttl: RUN_DONE_MS, value };
  runs.set(file, entry);
  void value.then((r) => {
    if (!r.ok) entry.ttl = RUN_FAILED_MS;
    else if (inFlight(r.run)) entry.ttl = FLIGHT_MS;
  });
  return value;
}

// Whether the workflow's run is in flight: queued or running, or, while a start on this
// workflow is followed, not listed yet. A failed read is not in flight.
export function houseInFlight(file: WorkflowFile, start: Start | null): Promise<boolean> {
  const own = start?.file === file ? start : null;
  return houseRun(file, own).then((r) => r.ok && (inFlight(r.run) || !since(r.run, own)));
}

// --- The distance from the build's commit to main -----------------------------------------

export type Distance =
  | { ok: true; ahead: number; messages: string[]; newest: string } // newest: ISO time of the newest commit ahead
  | { ok: false; reason: string };

// The build's commit (next.config.ts): a sha on Vercel and in check.yml, "local" elsewhere.
export const BUILD = process.env.BUILD_COMMIT || "local";
export const BUILD_IS_COMMIT = /^[0-9a-f]{7,40}$/.test(BUILD);

const COMPARE_MS = 30 * 1000;
const COMPARE_FAILED_MS = 15 * 1000;
// How long a push to main is waited for: Vercel deploys one in about a minute. After this,
// main ahead of the build is a failed build, and the page stops re-reading itself.
export const DEPLOY_MS = 10 * 60 * 1000;

const compares = new Map<string, Entry<Distance>>();

const firstLine = (c: Record<string, unknown>): string =>
  String((c.commit as Record<string, unknown> | undefined)?.message ?? "").split("\n")[0]!.trim();
const committed = (c: Record<string, unknown>): string =>
  String(((c.commit as Record<string, unknown> | undefined)?.committer as Record<string, unknown> | undefined)?.date ?? "");

async function readDistance(): Promise<Distance> {
  try {
    const r = await read(`/compare/${BUILD}...main`);
    if (r.status !== 200) {
      return { ok: false, reason: `GitHub answered ${r.status} for the compare of ${BUILD.slice(0, 7)} with main` };
    }
    // GitHub lists the commits ahead oldest first.
    const commits = (r.body.commits as Record<string, unknown>[] | undefined) ?? [];
    const last = commits[commits.length - 1];
    return {
      ok: true,
      ahead: Number(r.body.ahead_by ?? 0),
      messages: commits.map(firstLine).filter(Boolean),
      newest: last ? committed(last) : "",
    };
  } catch (e) {
    return { ok: false, reason: reason(e) };
  }
}

// How far main is ahead of the build's commit, with the commits' first lines. Kept 30
// seconds; a failed read 15. A build without a commit has no distance.
export function distance(): Promise<Distance> {
  if (!BUILD_IS_COMMIT) return Promise.resolve({ ok: false, reason: "the build is not a commit" });
  const now = Date.now();
  const hit = compares.get(BUILD);
  if (hit && now - hit.at < hit.ttl) return hit.value;
  const value = readDistance();
  const entry = { at: now, ttl: COMPARE_MS, value };
  compares.set(BUILD, entry);
  void value.then((d) => {
    if (!d.ok) entry.ttl = COMPARE_FAILED_MS;
  });
  return value;
}

// Whether a deploy is on its way: main ahead of the build, and the newest commit ahead
// pushed in the last ten minutes. Older means the build failed; the pill says out of sync,
// and the page stops re-reading itself.
export const deployInFlight = (): Promise<boolean> =>
  distance().then((d) => d.ok && d.ahead > 0 && Date.now() - Date.parse(d.newest) < DEPLOY_MS);

// --- The research queue: a file on main, and a folder's files ------------------------------

// The Contents API write of one file, for commitToHouse (lib/writes.ts) only: no other code
// calls PUT or DELETE on /contents. A create sends no sha: 201 is the file created, and 422 is a
// file already at the path, because the desk never updates. A delete reads the file's sha on the
// branch first. A 409 is the branch's head moved during the write: the call reads again and
// tries once more, and a second 409 fails in words (why: two writers on one branch is rare, and
// one retry ends it · 2026-10-29).
export async function putContents(
  op: "create" | "delete",
  path: string,
  branch: string,
  message: string,
  content: string,
): Promise<"created" | "exists" | "deleted"> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    let r: GhResponse;
    if (op === "create") {
      r = await gh("PUT", `/contents/${path}`, {
        message,
        content: Buffer.from(content, "utf8").toString("base64"),
        branch,
        committer: COMMITTER,
        author: COMMITTER,
      });
      if (r.status === 201) return "created";
      if (r.status === 422) return "exists";
    } else {
      const cur = await gh("GET", `/contents/${path}?ref=${encodeURIComponent(branch)}`);
      if (cur.status !== 200) fail(`read ${path} on ${branch}`, cur);
      r = await gh("DELETE", `/contents/${path}`, {
        message,
        sha: String(cur.body.sha),
        branch,
        committer: COMMITTER,
        author: COMMITTER,
      });
      if (r.status === 200) return "deleted";
    }
    if (r.status !== 409) fail(`${op === "create" ? "write" : "delete"} ${path}`, r);
  }
  throw new Error(`${path} changed on ${branch} twice while the desk wrote it. Nothing was written. Try again.`);
}

// The Git Data API write of many files as one commit, for commitToHouse (lib/writes.ts) only:
// no other code makes a tree, a commit or moves a ref. It reads the branch's head, checks that
// each file it creates is absent and each file it deletes is present there, makes one tree on
// the head's tree and one commit on the head, then moves the branch to it without force. A head
// that moved in between answers 409 or 422 (not a fast-forward): the call reads again and tries
// once more, and a second one fails in words. Until the branch moves, nothing is written (why:
// the handoff is one commit or none · 2026-10-29).
export async function commitFiles(files: readonly FileChange[], branch: string, message: string): Promise<"committed"> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    const ref = await gh("GET", `/git/ref/heads/${branch}`);
    if (ref.status !== 200) fail(`read ${branch}`, ref);
    const head = (ref.body.object as { sha: string }).sha;
    const commit = await gh("GET", `/git/commits/${head}`);
    if (commit.status !== 200) fail(`read the head of ${branch}`, commit);
    const base = (commit.body.tree as { sha: string }).sha;
    for (const f of files) {
      const r = await gh("GET", `/contents/${f.path}?ref=${head}`);
      const present = r.status === 200;
      if (r.status !== 200 && r.status !== 404) fail(`read ${f.path}`, r);
      if ("delete" in f && !present) throw new Error(`${f.path} is not on ${branch}. Nothing was written.`);
      if (!("delete" in f) && present) throw new Error(`${f.path} already exists on ${branch}. Nothing was written.`);
    }
    const tree = await gh("POST", "/git/trees", {
      base_tree: base,
      tree: files.map((f) =>
        "delete" in f
          ? { path: f.path, mode: "100644", type: "blob", sha: null }
          : { path: f.path, mode: "100644", type: "blob", content: f.content },
      ),
    });
    if (tree.status !== 201) fail("make the tree", tree);
    const made = await gh("POST", "/git/commits", {
      message,
      tree: String(tree.body.sha),
      parents: [head],
      author: COMMITTER,
      committer: COMMITTER,
    });
    if (made.status !== 201) fail("make the commit", made);
    const moved = await gh("PATCH", `/git/refs/heads/${branch}`, { sha: String(made.body.sha), force: false });
    if (moved.status === 200) return "committed";
    if (moved.status !== 409 && moved.status !== 422) fail(`move ${branch}`, moved);
  }
  throw new Error(`${branch} moved twice while the desk wrote to it. Nothing was written. Try again.`);
}

// Whether a file is on main: /f/<id> asks for clients/<slug>/record.md. Throws with the words of
// read() when GitHub does not answer.
export async function existsOnMain(path: string): Promise<boolean> {
  const r = await read(`/contents/${path}?ref=main`);
  if (r.status === 200) return true;
  if (r.status === 404) return false;
  fail(`read ${path}`, r);
}

// The text of a file on main. Throws with the words of read() when GitHub does not answer,
// and on any answer but 200.
export async function readOnMain(path: string): Promise<string> {
  const r = await read(`/contents/${path}?ref=main`);
  if (r.status !== 200) fail(`read ${path}`, r);
  const content = typeof r.body.content === "string" ? r.body.content : "";
  return Buffer.from(content, "base64").toString("utf8");
}

export type FolderRead = { ok: true; files: { name: string; url: string }[] } | { ok: false; reason: string };

// The files of a folder on main, by name, each with its link on GitHub. A folder that does
// not exist yet is empty. Read per request, with the words of read() when it fails.
export async function listFolder(path: string): Promise<FolderRead> {
  try {
    const r = await read(`/contents/${path}?ref=main`);
    if (r.status === 404) return { ok: true, files: [] };
    if (r.status !== 200) return { ok: false, reason: `GitHub answered ${r.status} for ${path}` };
    const items = (Array.isArray(r.body) ? r.body : []) as Record<string, unknown>[];
    const files = items
      .filter((i) => i.type === "file")
      .map((i) => ({ name: String(i.name), url: String(i.html_url) }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return { ok: true, files };
  } catch (e) {
    return { ok: false, reason: reason(e) };
  }
}
