import { maybeEnv } from "./env";

// The client repos' status (D2's release and check runs), read per request over the GitHub
// REST API: per repo, the latest release and the latest completed check.yml run on the
// default branch. The tokens are fine-grained and read-only, with Contents read, Actions read
// and Metadata read (desk/CONTEXT.md). A fine-grained token reads one owner's repos, so each
// owner has its own variable: ESTATE_PAT_<OWNER> (owner in capitals, other characters as _,
// e.g. ESTATE_PAT_SUSTENTUS), and ESTATE_PAT for k0d0minio and every owner without its own.
// DESK_PAT reaches the house only and stays as it is. When a token is unset or a repo is
// unreachable, the status says so in words and the page still renders: a missing variable
// fails only the cell.
//
// The cache is a module-level map with a timestamp, not Next.js fetch caching: every page is
// force-dynamic, where Next.js makes each fetch no-store by default, and the map does not
// depend on how Next.js applies that rule to a fetch with an Authorization header. The map
// lives as long as the warm function instance: one read per repo every five minutes at most,
// and concurrent page views share the one read in flight. A failed read is kept one minute
// only, so a new token takes effect soon. A cold instance reads again.

export interface Release {
  tag: string;
  date: string; // YYYY-MM-DD
  url: string;
}

export interface CheckRun {
  conclusion: string; // success, failure, cancelled, timed_out, …
  date: string; // YYYY-MM-DD
  url: string;
}

export type RepoStatus =
  | { ok: true; release: Release | null; check: CheckRun | null; checkFile: boolean }
  | { ok: false; reason: string };

const API = "https://api.github.com";
const FRESH_MS = 5 * 60 * 1000;
const FAILED_MS = 60 * 1000;
const TIMEOUT_MS = 5000;
const REPO_RE = /^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/;

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

    const [rel, runs] = await Promise.all([
      get(token, `/repos/${repo}/releases/latest`),
      get(token, `/repos/${repo}/actions/workflows/check.yml/runs?branch=${branch}&status=completed&per_page=1`),
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
    let check: CheckRun | null = null;
    if (runs.status === 200) {
      const run = (runs.body.workflow_runs as Record<string, unknown>[] | undefined)?.[0];
      if (run) {
        check = {
          conclusion: String(run.conclusion ?? "unknown"),
          date: day(run.updated_at ?? run.created_at),
          url: String(run.html_url ?? ""),
        };
      }
    } else if (runs.status !== 404) {
      return { ok: false, reason: `GitHub answered ${runs.status} for the check.yml runs` };
    }
    return { ok: true, release, check, checkFile: runs.status !== 404 };
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
  });
  return value;
}
