import { parse } from "yaml";
import type { FormLanguage } from "./forms";
import type { Status } from "./pool";

// The seller kit (`01-prospecting/kit.<language>.md`) as lessons: the grammar is in
// 01-prospecting/CONTEXT.md, Outputs. Built as lib/forms.ts is: pure, every break a failure that
// names the file. scripts/read-house.mjs loads it through Node's type stripping, so keep the
// syntax erasable and import only types from the other modules (a value import of ./pool would
// not resolve there).

export const KIT_PARTS = ["jamie", "system", "reference"] as const;
export type KitPart = (typeof KIT_PARTS)[number];

export interface KitLesson {
  key: string; // the lesson's slug in the URL, the same in the three files
  part: KitPart;
  status: Status | null; // the pool status the lesson teaches
  next: string | null; // with `status`: the one thing the salesman does at that status
  touches: number[]; // the touches whose pitch draft the lesson shows, in file order
  title: string; // the `##` heading, in the words the salesman reads
  body: string; // the lesson's words, markdown, without the key list
}

export interface Kit {
  language: FormLanguage;
  title: string;
  intro: string; // markdown before the first `##`, without the H1
  lessons: KitLesson[];
}

// A Record, so that a status or a language added to the type and not here fails the typecheck.
const LANGUAGE: Record<FormLanguage, true> = { "en-GB": true, "fr-BE": true, "pt-PT": true };
const STATUS: Record<Status, true> = {
  new: true,
  contacted: true,
  replied: true,
  meeting: true,
  "ready for Jamie": true,
  "handed off": true,
  lost: true,
};
export const KIT_LANGUAGES = Object.keys(LANGUAGE) as FormLanguage[];
const TOUCHES = [1, 2, 3];

const NAME_RE = /^kit\.([A-Za-z]{2}-[A-Za-z]{2})\.md$/;
const KEY_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const LINE_RE = /^\s*[-*]\s+([A-Za-z0-9_-]+):\s*(.*)$/;

function fail(file: string, reason: string): never {
  throw new Error(`${file}: ${reason}`);
}

const isLanguage = (v: string): v is FormLanguage => Object.hasOwn(LANGUAGE, v);
const isStatus = (v: string): v is Status => Object.hasOwn(STATUS, v);
const isPart = (v: string): v is KitPart => (KIT_PARTS as readonly string[]).includes(v);

// One lesson: the `##` heading, then one list of `- key: value` lines, then the words. The list
// ends at its first line that is not a `- key: value` line, so a list in the words is prose.
function lesson(file: string, title: string, lines: string[]): KitLesson {
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;
  const config = new Map<string, string>();
  for (; i < lines.length; i++) {
    const m = lines[i].match(LINE_RE);
    if (!m) break;
    config.set(m[1].toLowerCase(), m[2].trim());
  }
  const body = lines.slice(i).join("\n").trim();

  const key = config.get("key") ?? "";
  if (!key) fail(file, `"${title}" has no \`key:\`: the list under a lesson's heading comes first.`);
  if (!KEY_RE.test(key)) fail(file, `"${title}" has the key "${key}": a key is kebab-case.`);
  const part = config.get("part") ?? "";
  if (!isPart(part)) fail(file, `"${title}" has the part "${part}": a part is one of ${KIT_PARTS.join(", ")}.`);
  const named = config.get("status") || null;
  let status: Status | null = null;
  if (named !== null) {
    if (!isStatus(named)) fail(file, `"${title}" has the status "${named}": a status is one of ${Object.keys(STATUS).join(", ")}.`);
    status = named;
  }
  const next = config.get("next") || null;
  if (status !== null && next === null) fail(file, `"${title}" has a \`status:\` and no \`next:\`.`);
  if (status === null && next !== null) fail(file, `"${title}" has a \`next:\` and no \`status:\`.`);
  const touch = config.get("touch") ?? "";
  const touches = touch
    .split("|")
    .map((t) => t.trim())
    .filter(Boolean)
    .map(Number);
  for (const t of touches) {
    if (!TOUCHES.includes(t)) fail(file, `"${title}" has the touch "${touch}": a touch is 1, 2 or 3, separated by " | ".`);
  }
  if (new Set(touches).size !== touches.length) fail(file, `"${title}" names a touch twice.`);
  if (!body) fail(file, `"${title}" has no words under its list.`);
  return { key, part, status, next, touches, title, body };
}

// One kit file as its lessons. `file` is its path in the house; every failure names it and the
// reason. The language comes from the file name, and the frontmatter's `language` must agree.
export function parseKit(file: string, raw: string): Kit {
  const name = NAME_RE.exec(file.split("/").at(-1) ?? "");
  if (!name) fail(file, "the name is not kit.<language>.md.");
  const tag = name[1];
  if (!isLanguage(tag)) fail(file, `the language "${tag}" is not one of ${KIT_LANGUAGES.join(", ")}.`);

  const m = raw.replace(/^\uFEFF/, "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) fail(file, "there is no frontmatter.");
  const [, head, body] = m;
  let fm: Record<string, unknown>;
  try {
    fm = (parse(head) ?? {}) as Record<string, unknown>;
  } catch (e) {
    return fail(file, `the frontmatter does not parse: ${e instanceof Error ? e.message : String(e)}`);
  }
  const text = (k: string) => (fm[k] === undefined || fm[k] === null ? "" : String(fm[k]).trim());
  if (text("kind") !== "kit") fail(file, "the frontmatter has no `kind: kit`.");
  const title = text("title");
  if (!title) fail(file, "the frontmatter has no `title`.");
  if (text("language") !== tag) fail(file, `the frontmatter's language is "${text("language")}", the name's is "${tag}".`);
  for (const k of ["owner", "date"]) if (!text(k)) fail(file, `the frontmatter has no \`${k}\`.`);

  // `##` exactly: a `###` inside a lesson is prose, not a new lesson.
  const intro: string[] = [];
  const lessons: KitLesson[] = [];
  let heading: string | null = null;
  let lines: string[] = [];
  const flush = () => {
    if (heading !== null) lessons.push(lesson(file, heading, lines));
    lines = [];
  };
  for (const line of body.split(/\r?\n/)) {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2) {
      flush();
      heading = h2[1];
    } else if (heading !== null) lines.push(line);
    else if (!/^#\s/.test(line)) intro.push(line);
  }
  flush();
  if (lessons.length === 0) fail(file, "there is no lesson: each lesson is a `##` heading.");

  const keys = new Set<string>();
  const statuses = new Set<string>();
  let at = 0;
  for (const l of lessons) {
    if (keys.has(l.key)) fail(file, `two lessons have the key "${l.key}".`);
    keys.add(l.key);
    if (l.status !== null) {
      if (statuses.has(l.status)) fail(file, `two lessons teach the status "${l.status}".`);
      statuses.add(l.status);
    }
    const p = KIT_PARTS.indexOf(l.part);
    if (p < at) fail(file, `"${l.key}" is in the part ${l.part} after a lesson of a later part: the parts are ${KIT_PARTS.join(", ")}, in that order.`);
    at = p;
  }

  return { language: tag, title, intro: intro.join("\n").trim(), lessons };
}

// The kit's language files against each other: the same keys in the same order, with the same
// part, status and touches per key (why: the desk maps a lesson to a status and a touch by its
// key, and the words change per language while the key does not · 2026-10-28). A mismatch names
// both files.
export function checkKits(kits: { file: string; kit: Kit }[]): void {
  const [first, ...rest] = kits;
  if (!first) return;
  const a = first.kit;
  const keys = (k: Kit) => k.lessons.map((l) => l.key).join(", ");
  for (const { file, kit: b } of rest) {
    const both = `${first.file} and ${file}`;
    if (keys(a) !== keys(b)) fail(both, `the keys differ: ${keys(a)} against ${keys(b)}.`);
    a.lessons.forEach((l, i) => {
      const r = b.lessons[i];
      if (l.part !== r.part) fail(both, `"${l.key}" is in the part ${l.part} in one and ${r.part} in the other.`);
      if (l.status !== r.status) fail(both, `"${l.key}" teaches the status ${l.status ?? "none"} in one and ${r.status ?? "none"} in the other.`);
      if (l.touches.join("|") !== r.touches.join("|"))
        fail(both, `"${l.key}" shows the touches ${l.touches.join(" | ") || "none"} in one and ${r.touches.join(" | ") || "none"} in the other.`);
    });
  }
}
