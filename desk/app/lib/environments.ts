import { ReadFailed, request, tokenOrReason } from "./work";

// Where a build runs: the table of `.icm/environments.md` on the repo's default branch, read per
// request with the owner's token, as lib/work.ts reads `.icm/intake/`. The blueprint owns the
// file and renders it; it is the one home of the fact, and the house record holds no copy (why:
// one home per fact, blueprint-environments · Jamie, 2026-10-29). The grammar has two readers:
// parseEnvironments here, and the step "Environments file" of `check-client.yml` in
// legible-consulting/.github. Both take the first line that starts with `|` as the header row
// and find the five columns by name, in any order. The read is kept 5 minutes per repo, a failed
// read 1 minute, and concurrent page views share the one read in flight. A failed read returns
// the reason in words, and the page still renders.

export const ENVIRONMENTS_FILE = ".icm/environments.md";
export const COLUMNS = ["Environment", "Address", "Vercel project", "Database", "Moves on"] as const;

export interface EnvironmentRow {
  environment: string;
  address: string;
  vercelProject: string;
  database: string;
  movesOn: string;
}

export type EnvironmentsRead =
  | { ok: true; state: "rows"; rows: EnvironmentRow[] }
  | { ok: true; state: "no-file" }
  | { ok: true; state: "no-table"; missing: string[] }
  | { ok: false; reason: string };

const FRESH_MS = 5 * 60 * 1000;
const FAILED_MS = 60 * 1000;
const cache = new Map<string, { at: number; ttl: number; value: Promise<EnvironmentsRead> }>();

// The cells of one table line: the text between the pipes, trimmed. The outer pipes are optional.
const cellsOf = (line: string): string[] => {
  const t = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return t.split("|").map((c) => c.trim());
};

const isSeparator = (cells: string[]) => cells.length > 0 && cells.every((c) => /^:?-+:?$/.test(c));

// The rows of the file's table, or the columns the header row does not have. The header row is
// the first line that starts with `|`. The body is the table lines after it, up to the first line
// that is not one; the separator row is skipped.
export function parseEnvironments(text: string): { rows: EnvironmentRow[] } | { missing: string[] } {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((l) => /^\s*\|/.test(l));
  if (start < 0) return { missing: [...COLUMNS] };
  const header = cellsOf(lines[start]!);
  const index = COLUMNS.map((c) => header.indexOf(c));
  const missing = COLUMNS.filter((_, i) => index[i]! < 0);
  if (missing.length > 0) return { missing };
  const rows: EnvironmentRow[] = [];
  for (const line of lines.slice(start + 1)) {
    if (!/^\s*\|/.test(line)) break;
    const cells = cellsOf(line);
    if (isSeparator(cells)) continue;
    const at = (i: number) => cells[index[i]!] ?? "";
    rows.push({ environment: at(0), address: at(1), vercelProject: at(2), database: at(3), movesOn: at(4) });
  }
  return { rows };
}

async function read(repo: string): Promise<EnvironmentsRead> {
  const t = tokenOrReason(repo);
  if ("reason" in t) return { ok: false, reason: t.reason };
  try {
    // No ref: GitHub reads the default branch, where lib/work.ts reads the intake.
    const a = await request(t.token, "GET", `/repos/${repo}/contents/${ENVIRONMENTS_FILE}`);
    if (a.status === 404) return { ok: true, state: "no-file" };
    if (a.status !== 200) return { ok: false, reason: `GitHub answered ${a.status} for ${ENVIRONMENTS_FILE} of ${repo}` };
    const body = (a.body ?? {}) as Record<string, unknown>;
    const content = typeof body.content === "string" ? body.content : "";
    const text = Buffer.from(content, "base64").toString("utf8");
    const parsed = parseEnvironments(text);
    if ("missing" in parsed) return { ok: true, state: "no-table", missing: parsed.missing };
    return { ok: true, state: "rows", rows: parsed.rows };
  } catch (e) {
    return { ok: false, reason: e instanceof ReadFailed ? e.message : "GitHub read failed" };
  }
}

// One repo's environments, from the cache when it is fresh. `repo` is the record's `repo:` field.
export function repoEnvironments(repo: string): Promise<EnvironmentsRead> {
  const now = Date.now();
  const hit = cache.get(repo);
  if (hit && now - hit.at < hit.ttl) return hit.value;
  const value = read(repo);
  const entry = { at: now, ttl: FRESH_MS, value };
  cache.set(repo, entry);
  void value.then((r) => {
    if (!r.ok) entry.ttl = FAILED_MS;
  });
  return value;
}
