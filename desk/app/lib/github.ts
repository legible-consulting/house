import { env } from "./env";
import type { Prospect } from "./pool";

// "Ready for Jamie": one PR on legible-consulting/house that creates clients/<slug>/record.md
// at stage prospect. The commit carries the desk's identity; the PR is opened by the account
// that owns DESK_PAT (a fine-grained token: this repo, Contents and Pull requests). The
// folder is the record from the merge on; "Check the PR" moves the row to handed off.

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

// The handoff PR's state: open, merged, or closed without a merge.
export async function handoffPrState(prUrl: string): Promise<"open" | "merged" | "closed"> {
  const number = /\/pull\/(\d+)$/.exec(prUrl)?.[1];
  if (!number) throw new Error("The PR link does not name a pull request.");
  const r = await gh("GET", `/pulls/${number}`);
  if (r.status !== 200) fail("read PR", r);
  if (r.body.merged === true) return "merged";
  return r.body.state === "closed" ? "closed" : "open";
}
