// The desk's writes to the house: the typed list of every action that commits to
// legible-consulting/house, and the one function that makes each commit. The table
// "The desk's writes to main" in desk/CONTEXT.md holds the same rows, with each row's why.
// scripts/read-house.mjs reads both and fails the build when they differ (why: one home,
// two readers · 2026-10-29).
//
// read-house.mjs loads this file with Node's type stripping, so keep the syntax erasable and
// make no value import at the top: commitToHouse imports lib/github.ts when it runs.

export type WriteOp = "create" | "delete";

export interface Write {
  role: string; // who triggers it: a role of users.role, or the words of the table's cell
  globs: readonly string[]; // the paths it may write. `*` is one path segment, or part of one
  branch: string; // "main", or a branch glob such as "pool/*"
  identity: string; // the token the commit uses
  ops: readonly WriteOp[]; // what the app does to a path. Empty: the app never commits it
  app: boolean; // false: a workflow commits it, and commitToHouse refuses the action
}

export const WRITES = {
  "free-look": {
    role: "visitor, no session",
    globs: ["01-prospecting/leads/*/free-look-*.md"],
    branch: "main",
    identity: "DESK_PAT",
    ops: ["create"],
    app: true,
  },
  "link-answers": {
    role: "visitor, no session",
    globs: ["clients/*/*/*.md", "01-prospecting/leads/*/*.md"],
    branch: "main",
    identity: "DESK_PAT",
    ops: ["create"],
    app: true,
  },
  share: {
    role: "jamie",
    globs: ["research/queue/*.md"],
    branch: "main",
    identity: "DESK_PAT",
    ops: ["create"],
    app: true,
  },
  "queue-name": {
    role: "jamie",
    globs: ["research/queue/*.md"],
    branch: "main",
    identity: "DESK_PAT",
    ops: ["create", "delete"],
    app: true,
  },
  handoff: {
    role: "salesman, jamie",
    globs: ["clients/*/record.md", "clients/*/*/*.md", "01-prospecting/leads/*/*.md"],
    branch: "pool/*",
    identity: "DESK_PAT",
    ops: ["create", "delete"],
    app: true,
  },
  rhythms: {
    role: "none: the morning and monthly runs",
    globs: ["desk/glance/*.md", "desk/close/*.md"],
    branch: "main",
    identity: "GITHUB_TOKEN (rhythms.yml)",
    ops: [],
    app: false,
  },
} as const satisfies Record<string, Write>;

export type WriteAction = keyof typeof WRITES;

export const isWriteAction = (v: unknown): v is WriteAction => typeof v === "string" && Object.hasOwn(WRITES, v);

const escape = (s: string) => s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");

// Whether a path or a branch matches a glob: `*` matches one segment or part of one, never a
// `/`. No `**`.
export function matches(glob: string, value: string): boolean {
  return new RegExp(`^${glob.split("*").map(escape).join("[^/]*")}$`).test(value);
}

// A path the desk may name at all: relative, with no empty, `.` or `..` segment.
const SAFE_PATH = (p: string) => p !== "" && p.split("/").every((s) => s !== "" && s !== "." && s !== "..");

// The first thing wrong with a write, in words, or null when the list allows it.
export function refusal(action: WriteAction, op: WriteOp, path: string, branch: string): string | null {
  const w: Write = WRITES[action];
  const where = "desk/CONTEXT.md, The desk's writes to main";
  if (!w.app) return `The desk app makes no commit for ${action}: ${w.identity} does (${where}).`;
  if (!SAFE_PATH(path)) return `The desk may not write ${JSON.stringify(path)}: the path is not a plain relative path.`;
  if (!w.ops.includes(op)) return `The desk may not ${op} ${path} for ${action}. ${where}, allows ${w.ops.join(", ")}.`;
  if (!matches(w.branch, branch)) return `The desk may not write to the branch ${branch} for ${action}. ${where}, names ${w.branch}.`;
  if (!w.globs.some((g) => matches(g, path))) {
    return `The desk may not write ${path} for ${action}. ${where}, names ${w.globs.join(", ")}.`;
  }
  return null;
}

export type Change =
  | { path: string; content: string; message: string; branch?: string }
  | { path: string; delete: true; message: string; branch?: string };

// The one function that commits to the house. It refuses, in words, a write that the list does
// not allow, and nothing is written. Then it writes the one file with the Contents API (lib/github.ts).
// A create answers "created", or "exists" when a file is at the path already: the desk never
// updates. A conflict (409) is tried once more from the branch's new head; a second one fails.
export async function commitToHouse(action: WriteAction, change: Change): Promise<"created" | "exists" | "deleted"> {
  const branch = change.branch ?? "main";
  const op: WriteOp = "delete" in change ? "delete" : "create";
  const refused = refusal(action, op, change.path, branch);
  if (refused) throw new Error(refused);
  const { putContents } = await import("./github");
  return putContents(op, change.path, branch, change.message, "content" in change ? change.content : "");
}
