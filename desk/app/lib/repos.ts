import { maybeEnv } from "./env";

// The client repos' status (the build's release and check runs), read per request over the GitHub
// REST API: per repo, the latest release, the latest completed check.yml run on the default
// branch, and the latest check.yml run of any status, which is the one in flight when one is.
// The tokens are fine-grained and read-only, with Contents read, Actions read and Metadata
// read (desk/CONTEXT.md). A fine-grained token reads one owner's repos, so each owner has its
// own variable: ESTATE_PAT_<OWNER> (owner in capitals, other characters as _, e.g.
// ESTATE_PAT_SUSTENTUS), and ESTATE_PAT for k0d0minio and every owner without its own.
// DESK_PAT reaches the house only and stays as it is. When a token is unset or a repo is
// unreachable, the status says so in words and the page still renders: a missing variable
// fails only the cell.
//
// The cache is a module-level map with a timestamp, not Next.js fetch caching: every page is
// force-dynamic, where Next.js makes each fetch no-store by default, and the map does not
// depend on how Next.js applies that rule to a fetch with an Authorization header. The map
// lives as long as the warm function instance: one read per repo every five minutes at most,
// every minute while the latest run is queued or running, and concurrent page views
// share the one read in flight. A failed read is kept one minute only, so a new token takes
// effect soon. A cold instance reads again.

export interface Release {
  tag: string;
  date: string; // YYYY-MM-DD
  url: string;
}

// One Actions run as the desk shows it. GitHub's status is queued, waiting, pending,
// requested, in_progress or completed; the conclusion is set once completed (success,
// failure, cancelled, timed_out, …). lib/github.ts and lib/work.ts read runs into the same
// shape.
export interface Run {
  status: string;
  conclusion: string | null;
  created: string; // ISO time: when GitHub listed the run
  started: string; // ISO time: run_started_at, else created_at
  updated: string; // ISO time: the last change; the end, once completed
  url: string;
}

export type RepoStatus =
  | { ok: true; release: Release | null; check: Run | null; latest: Run | null; checkFile: boolean }
  | { ok: false; reason: string };

const API = "https://api.github.com";
const FRESH_MS = 5 * 60 * 1000;
const FAILED_MS = 60 * 1000;
const TIMEOUT_MS = 5000;
const REPO_RE = /^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/;

// How long a read is kept while the run it shows is queued or running: the page re-reads
// itself at the same pace (components/desk/page-header.tsx). lib/github.ts keeps the house's runs by the
// same rule.
export const FLIGHT_MS = 60 * 1000;

const cache = new Map<string, { at: number; ttl: number; value: Promise<RepoStatus> }>();

class Unreachable extends Error {}

export interface Token {
  name: string; // the variable that holds it
  value: string;
}

// The owner's own variable when it is set, else ESTATE_PAT.
export const ownerVariable = (owner: string) =>
  `ESTATE_PAT_${owner.toUpperCase().replace(/[^A-Z0-9]/g, "_")}` as const;

// The token for a repo owner. lib/work.ts reads the tickets and the pull requests with the
// same token.
export function tokenFor(owner: string): Token | null {
  for (const name of [ownerVariable(owner), "ESTATE_PAT"] as const) {
    const value = maybeEnv(name);
    if (value) return { name, value };
  }
  return null;
}

async function get(token: Token, path: string): Promise<{ status: number; body: Record<string, unknown> }> {
  let res: Response;
  try {
    res = await fetch(`${API}${path}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "legible-desk",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    throw new Unreachable("GitHub did not answer");
  }
  if (res.status === 401) throw new Unreachable(`GitHub refuses ${token.name} (401)`);
  if (res.status === 429 || (res.status === 403 && res.headers.get("x-ratelimit-remaining") === "0")) {
    throw new Unreachable("GitHub rate limit reached");
  }
  const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { status: res.status, body };
}

const day = (v: unknown): string => String(v ?? "").slice(0, 10);

// A run from GitHub's shape.
export const runOf = (raw: Record<string, unknown>): Run => ({
  status: String(raw.status ?? "unknown"),
  conclusion: raw.conclusion == null ? null : String(raw.conclusion),
  created: String(raw.created_at ?? ""),
  started: String(raw.run_started_at ?? raw.created_at ?? ""),
  updated: String(raw.updated_at ?? raw.created_at ?? ""),
  url: String(raw.html_url ?? ""),
});

// A run is in flight until it is completed: queued, waiting, in progress.
export const inFlight = (run: Run | null): boolean => run !== null && run.status !== "completed";

// The first run of a runs answer, else null.
const firstRun = (body: Record<string, unknown>): Run | null => {
  const raw = (body.workflow_runs as Record<string, unknown>[] | undefined)?.[0];
  return raw ? runOf(raw) : null;
};

async function read(token: Token, repo: string): Promise<RepoStatus> {
  try {
    // The repo first: a 404 here means the repo does not exist or the token cannot see it.
    // GitHub gives the same 404 for both.
    const meta = await get(token, `/repos/${repo}`);
    if (meta.status === 404 || meta.status === 403) {
      const own = ownerVariable(repo.split("/")[0]!);
      const hint = token.name === own ? "" : `. A token for this owner goes in ${own}`;
      return { ok: false, reason: `${token.name} cannot read ${repo} (${meta.status})${hint}` };
    }
    if (meta.status !== 200) return { ok: false, reason: `GitHub answered ${meta.status} for ${repo}` };
    const branch = encodeURIComponent(String(meta.body.default_branch ?? "main"));
    const runsPath = `/repos/${repo}/actions/workflows/check.yml/runs?branch=${branch}&per_page=1`;

    const [rel, done, any] = await Promise.all([
      get(token, `/repos/${repo}/releases/latest`),
      get(token, `${runsPath}&status=completed`),
      get(token, runsPath),
    ]);

    let release: Release | null = null;
    if (rel.status === 200) {
      release = {
        tag: String(rel.body.tag_name ?? ""),
        date: day(rel.body.published_at ?? rel.body.created_at),
        url: String(rel.body.html_url ?? ""),
      };
    } else if (rel.status !== 404) {
      return { ok: false, reason: `GitHub answered ${rel.status} for the latest release` };
    }

    // A 404 on the workflow means the repo has no .github/workflows/check.yml.
    for (const r of [done, any]) {
      if (r.status !== 200 && r.status !== 404) {
        return { ok: false, reason: `GitHub answered ${r.status} for the check.yml runs` };
      }
    }
    const check = done.status === 200 ? firstRun(done.body) : null;
    const latest = any.status === 200 ? firstRun(any.body) : null;
    return { ok: true, release, check, latest, checkFile: done.status !== 404 };
  } catch (e) {
    return { ok: false, reason: e instanceof Unreachable ? e.message : "GitHub read failed" };
  }
}

// One repo's status, from the cache when it is fresh. `repo` is the record's `repo:` field,
// owner/name.
export function repoStatus(repo: string): Promise<RepoStatus> {
  if (!REPO_RE.test(repo)) return Promise.resolve({ ok: false, reason: `repo: "${repo}" is not owner/name` });
  const owner = repo.split("/")[0]!;
  const token = tokenFor(owner);
  if (!token) return Promise.resolve({ ok: false, reason: `${ownerVariable(owner)} and ESTATE_PAT are not set` });
  const now = Date.now();
  const hit = cache.get(repo);
  if (hit && now - hit.at < hit.ttl) return hit.value;
  const value = read(token, repo);
  const entry = { at: now, ttl: FRESH_MS, value };
  cache.set(repo, entry);
  void value.then((s) => {
    if (!s.ok) entry.ttl = FAILED_MS;
    else if (inFlight(s.latest)) entry.ttl = FLIGHT_MS;
  });
  return value;
}

// Whether the repo's latest check.yml run is queued or running: the page re-reads itself
// while it is (components/desk/page-header.tsx). A failed read is not in flight.
export const repoInFlight = (repo: string): Promise<boolean> =>
  repoStatus(repo).then((s) => s.ok && inFlight(s.latest));
