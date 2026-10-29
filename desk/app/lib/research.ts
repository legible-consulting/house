import { createHash } from "node:crypto";
import { parse, stringify } from "yaml";
import { listFolder, readOnMain } from "./github";
import { commitToHouse } from "./writes";

// The research queue (research/CONTEXT.md, research): one file per link Jamie shares to
// the desk, written to main in research/queue/. The daily intake reads the folder,
// writes the verdicts and deletes the files. The desk judges nothing: it keeps what was
// shared (the link, the title, the text around it) and the time.

export const QUEUE = "research/queue";

const URL_RE = /https?:\/\/[^\s<>"')\]]+/i;
// Query keys that name the share, not the page.
const TRACKING = /^(utm_\w+|fbclid|gclid|igsh|igshid|si|mibextid|ref_src|ref_url)$/;

export interface Shared {
  url?: string;
  text?: string;
  title?: string;
}

export interface Found {
  link: string; // the link, without its tracking keys
  raw: string; // as it was in the share
}

// The first link in what was shared: Android puts it in `url`, most apps in `text`. The
// tracking keys leave; the rest of the link stays as it was.
export function linkOf(s: Shared): Found | null {
  for (const field of [s.url, s.text, s.title]) {
    const m = field ? URL_RE.exec(field) : null;
    if (!m) continue;
    const raw = m[0].replace(/[.,;:!?]+$/, "");
    try {
      const u = new URL(raw);
      for (const k of [...u.searchParams.keys()]) if (TRACKING.test(k)) u.searchParams.delete(k);
      return { link: u.toString(), raw };
    } catch {
      continue;
    }
  }
  return null;
}

// The file's name: the day, the host and six characters of the link's hash, so a link
// shared twice in a day lands once, and the folder reads as a list of hosts.
export function queueName(link: string, now: Date): string {
  const host = new URL(link).hostname
    .replace(/^www\./, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 30);
  const hash = createHash("sha256").update(link).digest("hex").slice(0, 6);
  return `${now.toISOString().slice(0, 10)}-${host}-${hash}.md`;
}

const oneLine = (s: string, max: number) => s.replace(/\s+/g, " ").trim().slice(0, max);

// The file: frontmatter only. `text` is the share's text without the link itself; a second
// link in it stays, because a post's caption often names the repository the post is about.
export function queueFile(found: Found, s: Shared, now: Date): string {
  const front = {
    url: found.link,
    title: oneLine(s.title ?? "", 200),
    text: oneLine((s.text ?? "").replace(found.raw, ""), 1000),
    captured: `${now.toISOString().slice(0, 19)}Z`,
  };
  return `---\n${stringify(front)}---\n`;
}

// Queue what was shared. No link in it is an error the page shows.
export async function queueLink(s: Shared, now = new Date()): Promise<{ note: string }> {
  const found = linkOf(s);
  if (!found) throw new Error("No link in what was shared.");
  const path = `${QUEUE}/${queueName(found.link, now)}`;
  const result = await commitToHouse("share", {
    path,
    content: queueFile(found, s, now),
    message: `research: queue ${new URL(found.link).hostname}`,
  });
  return { note: result === "created" ? `Queued ${found.link}` : `Already queued today: ${found.link}` };
}

// One link that waits for the intake: the file on GitHub, the link's host and title, and
// the time it was shared. The host and the day come from the file's name; the title and the
// time from its frontmatter, when the file reads.
export interface Queued {
  name: string;
  url: string; // the file on GitHub
  host: string;
  title: string; // empty when the share had none, or the file did not read
  captured: string; // "2026-10-27 14:05 UTC", or the day alone when the file did not read
}

export type QueueRead = { ok: true; links: Queued[] } | { ok: false; reason: string };

const NAME_RE = /^(\d{4}-\d{2}-\d{2})-(.+)-[0-9a-f]{6}\.md$/;
// The intake empties the folder every day, so it holds a few files; a folder past this many
// shows the rest by name only, so a backlog never costs a read per file.
const READ_MAX = 30;

async function queued(file: { name: string; url: string }, read: boolean): Promise<Queued> {
  const m = NAME_RE.exec(file.name);
  const base: Queued = { ...file, host: m?.[2] ?? file.name, title: "", captured: m?.[1] ?? "" };
  if (!read) return base;
  try {
    const head = /^---\r?\n([\s\S]*?)\r?\n---/.exec(await readOnMain(`${QUEUE}/${file.name}`))?.[1] ?? "";
    const front = (parse(head) ?? {}) as Record<string, unknown>;
    const url = typeof front.url === "string" ? front.url : "";
    const at = typeof front.captured === "string" ? front.captured : "";
    return {
      ...base,
      host: url ? new URL(url).hostname.replace(/^www\./, "") : base.host,
      title: typeof front.title === "string" ? front.title : "",
      captured: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(at) ? `${at.slice(0, 10)} ${at.slice(11, 16)} UTC` : base.captured,
    };
  } catch {
    return base;
  }
}

// The queue as it stands on main: the folder, then each file, newest first. A file that does
// not read keeps what its name says.
export async function queue(): Promise<QueueRead> {
  const folder = await listFolder(QUEUE);
  if (!folder.ok) return folder;
  const files = [...folder.files].reverse();
  return { ok: true, links: await Promise.all(files.map((f, i) => queued(f, i < READ_MAX))) };
}
