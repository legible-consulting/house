import { env } from "./env";
import type { Prospect } from "./pool";

// The desk's client for the house itself, with DESK_PAT (a fine-grained token on this repo
// only: Contents, Pull requests and Actions, read and write). Two uses:
// - "Ready for Jamie": one PR on legible-consulting/house that creates clients/<slug>/record.md
//   at stage prospect. The commit carries the desk's identity; the PR is opened by the account
//   that owns DESK_PAT. The folder is the record from the merge on; "Check the PR" moves the
//   row to handed off.
// - Refresh: a manual run of a house workflow on main (dispatchWorkflow, lib/refresh.ts).

const REPO = "legible-consulting/house";
const COMMITTER = { name: "desk", email: "desk@users.noreply.github.com" };

interface GhResponse {
  status: number;
  body: Record<string, unknown>;
}

async function gh(method: string, path: string, body?: unknown): Promise<GhResponse> {
  const res = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
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
  });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { status: res.status, body: json };
}

function fail(step: string, r: GhResponse): never {
  const msg = typeof r.body.message === "string" ? r.body.message : "no message";
  throw new Error(`GitHub ${step} failed (${r.status}): ${msg}`);
}

const cell = (s: string) => s.replace(/\|/g, "\\|").replace(/\n+/g, " ");

export async function openHandoffPr(p: Prospect, slug: string, record: string, touches: number): Promise<string> {
  const path = `clients/${slug}/record.md`;
  const branch = `pool/${slug}`;

  const main = await gh("GET", "/git/ref/heads/main");
  if (main.status !== 200) fail("read main", main);
  const sha = (main.body.object as { sha: string }).sha;

  const existing = await gh("GET", `/contents/${path}?ref=main`);
  if (existing.status === 200) throw new Error(`clients/${slug}/ already exists on main.`);

  const ref = await gh("POST", "/git/refs", { ref: `refs/heads/${branch}`, sha });
  if (ref.status === 422) throw new Error(`Branch ${branch} already exists: an earlier handoff is open, or its branch was kept.`);
  if (ref.status !== 201) fail("create branch", ref);

  const put = await gh("PUT", `/contents/${path}`, {
    message: `Pool: open clients/${slug} at prospect\n\n${p.company}, handed off by ${p.sourced_by}.`,
    content: Buffer.from(record, "utf8").toString("base64"),
    branch,
    committer: COMMITTER,
    author: COMMITTER,
  });
  if (put.status !== 201) fail("write record.md", put);

  const rows: [string, string][] = [
    ["Company", p.company],
    ["Contact", [p.contact_name, p.role].filter(Boolean).join(", ")],
    ["Email", p.email],
    ["Phone", p.phone],
    ["Website", p.website],
    ["Country", p.country],
    ["Language", p.language],
    ["Line", p.line],
    ["Size", p.size],
    ["Service", p.service],
    ["Deal size", p.deal_size],
    ["Source", p.source],
    ["Sourced by", p.sourced_by],
    ["Touches", String(touches)],
    ["Next action", p.next_action ?? ""],
  ];
  const body = [
    `Pool handoff from the desk. Merge opens \`clients/${slug}/\` at \`prospect\`; the row then moves to \`handed off\` when its sourcer or Jamie checks the PR from the desk.`,
    "",
    "| Field | Value |",
    "|---|---|",
    ...rows.map(([k, v]) => `| ${k} | ${cell(v)} |`),
    "",
    p.ask ? `Ask:\n\n${p.ask}` : "",
    p.notes ? `\nNotes:\n\n${p.notes}` : "",
  ].join("\n");

  const pr = await gh("POST", "/pulls", {
    title: `Pool: ${p.company} is ready for Jamie`,
    head: branch,
    base: "main",
    body,
  });
  if (pr.status !== 201) fail("open PR", pr);
  return pr.body.html_url as string;
}

// The three runs Jamie starts from the desk, each a workflow_dispatch on main. The glance is
// sweep-deadlines.yml; the Friday review and the monthly close are rhythms.yml with its
// `rhythm` input, and the close takes an optional `month` (YYYY-MM).
export type WorkflowFile = "sweep-deadlines.yml" | "rhythms.yml";
export type RunKey = "glance" | "review" | "close";

export const RUNS: Record<RunKey, { label: string; file: WorkflowFile; inputs: Record<string, string> }> = {
  glance: { label: "Glance", file: "sweep-deadlines.yml", inputs: {} },
  review: { label: "Friday review", file: "rhythms.yml", inputs: { rhythm: "review" } },
  close: { label: "Monthly close", file: "rhythms.yml", inputs: { rhythm: "close" } },
};

export const isRunKey = (v: unknown): v is RunKey => typeof v === "string" && Object.hasOwn(RUNS, v);

// The workflow's runs page on GitHub, where Jamie follows a run.
export const runsUrl = (file: WorkflowFile) => `https://github.com/${REPO}/actions/workflows/${file}`;

// Start one run of a house workflow on main. GitHub answers 204 and queues the run: the run
// itself commits to main when its file changed, and Vercel redeploys the desk from that
// push. The call needs Actions write on DESK_PAT. GitHub answers 403 when the token has no
// Actions write, and 404 when the token cannot see the workflow at all; both say so here in
// words, with GitHub's own message.
export async function dispatchWorkflow(file: WorkflowFile, inputs: Record<string, string> = {}): Promise<void> {
  const r = await gh("POST", `/actions/workflows/${file}/dispatches`, {
    ref: "main",
    ...(Object.keys(inputs).length ? { inputs } : {}),
  });
  if (r.status === 204) return;
  if (r.status === 403 || r.status === 404) {
    const msg = typeof r.body.message === "string" ? r.body.message : "no message";
    throw new Error(
      `DESK_PAT cannot start ${file} (${r.status}: ${msg}). Give it Actions read and write on ${REPO}, then redeploy the desk.`,
    );
  }
  fail(`start ${file}`, r);
}

// The handoff PR's state: open, merged, or closed without a merge.
export async function handoffPrState(prUrl: string): Promise<"open" | "merged" | "closed"> {
  const number = /\/pull\/(\d+)$/.exec(prUrl)?.[1];
  if (!number) throw new Error("The PR link does not name a pull request.");
  const r = await gh("GET", `/pulls/${number}`);
  if (r.status !== 200) fail("read PR", r);
  if (r.body.merged === true) return "merged";
  return r.body.state === "closed" ? "closed" : "open";
}
