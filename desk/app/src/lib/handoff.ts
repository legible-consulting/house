import { env } from "./env";
import type { DeskUser, Prospect } from "./db";

// "Ready for Jamie": one PR on legible-consulting/house that creates clients/<slug>/record.md
// at stage prospect. The commit carries the desk's identity; the PR is opened by the
// account that owns DESK_PAT (a fine-grained token: this repo, Contents and Pull requests).
// The folder is the record from the merge on; the pool row moves to "handed off" by hand.

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
  });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { status: res.status, body: json };
}

function fail(step: string, r: GhResponse): never {
  const msg = typeof r.body.message === "string" ? r.body.message : "no message";
  throw new Error(`GitHub ${step} failed (${r.status}): ${msg}`);
}

export interface Handoff {
  slug: string;
  record: string;
  prospect: Prospect;
  salesman: DeskUser;
}

export async function openHandoffPr({ slug, record, prospect, salesman }: Handoff): Promise<string> {
  const path = `clients/${slug}/record.md`;
  const branch = `pool/${slug}`;

  const main = await gh("GET", "/git/ref/heads/main");
  if (main.status !== 200) fail("read main", main);
  const sha = (main.body.object as { sha: string }).sha;

  const existing = await gh("GET", `/contents/${path}?ref=main`);
  if (existing.status === 200) throw new Error(`clients/${slug}/ already exists on main.`);

  const ref = await gh("POST", "/git/refs", { ref: `refs/heads/${branch}`, sha });
  if (ref.status === 422) throw new Error(`Branch ${branch} already exists: an earlier handoff is open.`);
  if (ref.status !== 201) fail("create branch", ref);

  const put = await gh("PUT", `/contents/${path}`, {
    message: `Pool: open clients/${slug} at prospect\n\n${prospect.company}, handed off by ${salesman.email}.`,
    content: Buffer.from(record, "utf8").toString("base64"),
    branch,
    committer: COMMITTER,
    author: COMMITTER,
  });
  if (put.status !== 201) fail("write record.md", put);

  const contact = [prospect.contact_name, prospect.email].filter(Boolean).join(" · ");
  const body = [
    `Pool handoff from the desk. Merge opens \`clients/${slug}/\` at \`prospect\`; the pool row then moves to \`handed off\`.`,
    "",
    "| Field | Value |",
    "|---|---|",
    `| Company | ${prospect.company} |`,
    `| Contact | ${contact} |`,
    `| Language | ${prospect.language} |`,
    `| Source | ${prospect.source} |`,
    `| Salesman | ${salesman.name || salesman.email} (${salesman.email}) |`,
    `| Next action | ${prospect.next_action} |`,
    "",
    prospect.notes ? `Notes:\n\n${prospect.notes}` : "",
  ].join("\n");

  const pr = await gh("POST", "/pulls", {
    title: `Pool: ${prospect.company} is ready for Jamie`,
    head: branch,
    base: "main",
    body,
  });
  if (pr.status !== 201) fail("open PR", pr);
  return pr.body.html_url as string;
}
