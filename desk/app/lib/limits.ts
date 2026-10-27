// GitHub's rate limit as the desk shows it. Two uses:
// - A read that GitHub refused for its rate limit (limitReason): the line that failed says
//   so, with the time the limit resets. lib/github.ts, lib/repos.ts and lib/work.ts use it.
// - The budget of each token the desk holds (budgets): the sync pill's panel
//   (app/_sync.tsx) lists the requests left and the reset time. GET /rate_limit does not
//   count against the limit, and GitHub answers it when the limit is reached.
// A fine-grained token spends the budget of the account that owns it: tokens of one
// account show the same numbers.

const LISBON = "Europe/Lisbon";
const clockFormat = new Intl.DateTimeFormat("en-GB", { timeZone: LISBON, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

// The reset time in Lisbon, HH:MM. GitHub's primary limit resets within the hour.
export const clock = (ms: number): string => clockFormat.format(new Date(ms));

// The sentence for a response that GitHub refused for its rate limit, or null. The primary
// limit is 403 or 429 with no requests left, and x-ratelimit-reset is the reset in epoch
// seconds. A secondary limit is 403 or 429 with retry-after, the seconds to wait.
export function limitReason(res: Response): string | null {
  if (res.status !== 403 && res.status !== 429) return null;
  const retry = Number(res.headers.get("retry-after"));
  const reset = Number(res.headers.get("x-ratelimit-reset"));
  const empty = res.headers.get("x-ratelimit-remaining") === "0";
  if (res.status === 403 && !empty && !res.headers.has("retry-after")) return null;
  const at = retry > 0 ? Date.now() + retry * 1000 : reset > 0 ? reset * 1000 : 0;
  return at ? `GitHub rate limit reached; it resets at ${clock(at)}` : "GitHub rate limit reached";
}

export type Budget =
  | { name: string; ok: true; remaining: number; limit: number; reset: number } // reset: epoch ms
  | { name: string; ok: false; reason: string };

const TIMEOUT_MS = 5000;
const FRESH_MS = 30 * 1000;
const FAILED_MS = 15 * 1000;

// The variables that hold a GitHub token: DESK_PAT, ESTATE_PAT and each ESTATE_PAT_<OWNER>
// (lib/repos.ts).
const TOKEN = /^(DESK_PAT|ESTATE_PAT(_[A-Z0-9_]+)?)$/;

async function readBudget(name: string, value: string): Promise<Budget> {
  try {
    const res = await fetch("https://api.github.com/rate_limit", {
      headers: {
        Authorization: `Bearer ${value}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "legible-desk",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.status === 401) return { name, ok: false, reason: `GitHub refuses ${name} (401)` };
    if (res.status !== 200) return { name, ok: false, reason: `GitHub answered ${res.status}` };
    const core = ((await res.json()) as { resources?: { core?: Record<string, number> } }).resources?.core;
    if (!core) return { name, ok: false, reason: "GitHub sent no core limit" };
    return { name, ok: true, remaining: core.remaining ?? 0, limit: core.limit ?? 0, reset: (core.reset ?? 0) * 1000 };
  } catch {
    return { name, ok: false, reason: "GitHub did not answer" };
  }
}

let cached: { at: number; ttl: number; value: Promise<Budget[]> } | null = null;

// The core budget of each token that is set, by variable name. Kept 30 seconds; 15 when a
// read failed.
export function budgets(): Promise<Budget[]> {
  const now = Date.now();
  if (cached && now - cached.at < cached.ttl) return cached.value;
  const tokens = Object.entries(process.env)
    .filter((e): e is [string, string] => TOKEN.test(e[0]) && !!e[1])
    .sort(([a], [b]) => a.localeCompare(b));
  const value = Promise.all(tokens.map(([name, v]) => readBudget(name, v)));
  const entry = { at: now, ttl: FRESH_MS, value };
  cached = entry;
  void value.then((bs) => {
    if (bs.some((b) => !b.ok)) entry.ttl = FAILED_MS;
  });
  return value;
}
