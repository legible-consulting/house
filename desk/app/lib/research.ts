import { createHash } from "node:crypto";
import { stringify } from "yaml";
import { type FolderRead, listFolder, writeFile } from "./github";

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
  const result = await writeFile(path, queueFile(found, s, now), `research: queue ${new URL(found.link).hostname}`);
  return { note: result === "created" ? `Queued ${found.link}` : `Already queued today: ${found.link}` };
}

// The queue as it stands on main.
export const queue = (): Promise<FolderRead> => listFolder(QUEUE);
