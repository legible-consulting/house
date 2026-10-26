import { parse } from "yaml";

// A form of the house (`*/forms/<form>.<language>.md`) as a snapshot: the grammar is in
// 01-prospecting/CONTEXT.md, Outputs. Ported from k0d0minio/jamienisbet's
// packages/services/src/forms-parse.ts at 9d5db8c, with `key:` required and every break a
// failure that names the file. Pure: scripts/read-house.mjs loads it through Node's type
// stripping, as rhythms.mjs loads rhythms.ts, so keep the syntax erasable (type-only imports,
// no enum, no namespace). The snapshot is plain JSON: send-a-link stores it in Neon as it is.

export const FORM_LANGUAGES = ["en-GB", "fr-BE", "pt-PT"] as const;
export const FIELD_TYPES = ["text", "textarea", "select", "boolean"] as const;
export type FormLanguage = (typeof FORM_LANGUAGES)[number];
export type FieldType = (typeof FIELD_TYPES)[number];

export interface FormField {
  key: string;
  label: string; // the `##` heading, in the words the visitor reads
  type: FieldType;
  required: boolean; // false with `optional: yes`
  hint: string | null;
  options: string[] | null; // `select` only, in file order
}

export interface FormSnapshot {
  slug: string;
  language: FormLanguage;
  folder: string; // the client subfolder the answers land in
  title: string;
  intro: string;
  fields: FormField[];
}

const NAME_RE = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.([A-Za-z]{2}-[A-Za-z]{2})\.md$/;
const KEY_RE = /^[a-z0-9_]+$/;

// A function declaration, not an arrow: TypeScript narrows after a call only to a declared
// function that returns never.
function fail(file: string, reason: string): never {
  throw new Error(`${file}: ${reason}`);
}

const isLanguage = (v: string): v is FormLanguage => (FORM_LANGUAGES as readonly string[]).includes(v);
const isType = (v: string): v is FieldType => (FIELD_TYPES as readonly string[]).includes(v);

// One question: the `##` heading and the `- key: value` lines under it. Prose outside the
// list is ignored, and so is a key the grammar does not name.
function field(file: string, label: string, lines: string[]): FormField {
  const config = new Map<string, string>();
  for (const line of lines) {
    const m = line.match(/^\s*[-*]\s+([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) config.set(m[1].toLowerCase(), m[2].trim());
  }
  const key = config.get("key") ?? "";
  if (!key) fail(file, `"${label}" has no \`key:\`.`);
  if (!KEY_RE.test(key)) fail(file, `"${label}" has the key "${key}": a key is lower case, digits and _.`);
  const type = config.get("type") || "text";
  if (!isType(type)) fail(file, `"${label}" has the type "${type}": a type is one of ${FIELD_TYPES.join(", ")}.`);
  const options =
    type === "select"
      ? (config.get("options") ?? "")
          .split("|")
          .map((o) => o.trim())
          .filter(Boolean)
      : null;
  if (options && options.length === 0) fail(file, `"${label}" is a select with no \`options:\`.`);
  return {
    key,
    label,
    type,
    required: !/^(yes|true)$/i.test(config.get("optional") ?? ""),
    hint: config.get("hint") || null,
    options,
  };
}

// One form file as a snapshot. `file` is its path in the house; every failure names it and
// the reason. The slug and the language come from the file name, and the frontmatter's
// `language` must agree with it.
export function parseForm(file: string, raw: string): FormSnapshot {
  const name = NAME_RE.exec(file.split("/").at(-1) ?? "");
  if (!name) fail(file, "the name is not <form>.<language>.md.");
  const [, slug, tag] = name;
  if (!isLanguage(tag)) fail(file, `the language "${tag}" is not one of ${FORM_LANGUAGES.join(", ")}.`);

  const m = raw.replace(/^﻿/, "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) fail(file, "there is no frontmatter.");
  const [, head, body] = m;
  let fm: Record<string, unknown>;
  try {
    fm = (parse(head) ?? {}) as Record<string, unknown>;
  } catch (e) {
    return fail(file, `the frontmatter does not parse: ${e instanceof Error ? e.message : String(e)}`);
  }
  const text = (k: string) => (fm[k] === undefined || fm[k] === null ? "" : String(fm[k]).trim());
  if (text("kind") !== "form") fail(file, "the frontmatter has no `kind: form`.");
  const title = text("title");
  if (!title) fail(file, "the frontmatter has no `title`.");
  if (text("language") !== tag) fail(file, `the frontmatter's language is "${text("language")}", the name's is "${tag}".`);
  const folder = text("folder");
  if (!folder) fail(file, "the frontmatter has no `folder`.");

  // `##` exactly: a `###` inside a question is prose, not a new question.
  const fields: FormField[] = [];
  let label: string | null = null;
  let lines: string[] = [];
  const flush = () => {
    if (label !== null) fields.push(field(file, label, lines));
    lines = [];
  };
  for (const line of body.split(/\r?\n/)) {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2) {
      flush();
      label = h2[1];
    } else if (label !== null) lines.push(line);
  }
  flush();
  if (fields.length === 0) fail(file, "there is no question: each question is a `##` heading.");

  const seen = new Set<string>();
  for (const f of fields) {
    if (seen.has(f.key)) fail(file, `two questions have the key "${f.key}".`);
    seen.add(f.key);
  }

  return { slug, language: tag, folder, title, intro: text("intro"), fields };
}

// The language files of one form against each other: the same folder, the same keys in the
// same order, the same type and the same option count per question (why: the desk maps an
// answer to a pool field by the option's position · 2026-10-25). A mismatch names both files.
export function checkLanguages(forms: { file: string; form: FormSnapshot }[]): void {
  const [first, ...rest] = forms;
  if (!first) return;
  const a = first.form;
  for (const { file, form: b } of rest) {
    const both = `${first.file} and ${file}`;
    if (a.slug !== b.slug) fail(both, `the form slugs differ ("${a.slug}", "${b.slug}").`);
    if (a.folder !== b.folder) fail(both, `the folders differ ("${a.folder}", "${b.folder}").`);
    const keys = (f: FormSnapshot) => f.fields.map((q) => q.key).join(", ");
    if (keys(a) !== keys(b)) fail(both, `the keys differ: ${keys(a)} against ${keys(b)}.`);
    a.fields.forEach((q, i) => {
      const r = b.fields[i];
      if (q.type !== r.type) fail(both, `"${q.key}" is ${q.type} in one and ${r.type} in the other.`);
      const n = (f: FormField) => f.options?.length ?? 0;
      if (n(q) !== n(r)) fail(both, `"${q.key}" has ${n(q)} options in one and ${n(r)} in the other.`);
    });
  }
}
