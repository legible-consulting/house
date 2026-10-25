import { parse } from "yaml";

// A form (core/lexicon.md): one markdown file per form and language,
// `<module>/forms/<form>.<language>.md`, in the grammar of 01-prospecting/CONTEXT.md. This
// file turns one into a snapshot: plain JSON that the public pages render and that a sent
// link freezes in Neon as it is, so the questions asked and the answers' check use one shape.
// Ported from k0d0minio/jamienisbet `packages/services/src/forms-parse.ts` at 9d5db8c, with
// `key:` now required and the language files checked against each other.
//
// Pure: no filesystem, no network. scripts/read-house.mjs loads this file through Node's type
// stripping, as scripts/rhythms.mjs loads lib/rhythms.ts: keep the syntax erasable (type-only
// imports, no enum, no namespace). Each function throws an Error that names the file and the
// reason; read-house.mjs prints it and fails the build.

export const FORM_LANGUAGES = ["en-GB", "fr-BE", "pt-PT"] as const;
export type FormLanguage = (typeof FORM_LANGUAGES)[number];

// Four types. No conditional logic, no uploads.
export const FIELD_TYPES = ["text", "textarea", "select", "boolean"] as const;
export type FieldType = (typeof FIELD_TYPES)[number];

export interface FormField {
  key: string; // the answer's key: the same in every language of the form
  label: string; // the `##` heading, in the words the visitor reads
  type: FieldType;
  required: boolean; // true unless `optional: yes`
  hint: string | null;
  options: string[] | null; // `select` only, in the file's order; null for the other types
}

export interface FormSnapshot {
  form: string; // the file name before the language tag; it never changes once a link was sent
  language: FormLanguage;
  folder: string; // the client subfolder the answers land in
  title: string;
  intro: string;
  fields: FormField[];
}

const NAME_RE = /^([a-z0-9-]+)\.([A-Za-z]{2}-[A-Za-z]{2})\.md$/;

// One question's `- key: value` list. Prose outside the list is ignored, and so is a key the
// grammar does not name.
function config(lines: string[]): Map<string, string> {
  const out = new Map<string, string>();
  for (const line of lines) {
    const m = line.match(/^\s*[-*]\s+([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) out.set(m[1].toLowerCase(), m[2].trim());
  }
  return out;
}

function field(file: string, label: string, lines: string[]): FormField {
  const c = config(lines);
  const key = c.get("key") ?? "";
  if (!key) throw new Error(`${file}: "${label}" has no \`key:\` line.`);
  const type = (c.get("type") || "text") as FieldType;
  if (!FIELD_TYPES.includes(type)) {
    throw new Error(`${file}: "${label}" has the type "${type}", not one of ${FIELD_TYPES.join(", ")}.`);
  }
  const options =
    type === "select"
      ? (c.get("options") ?? "")
          .split("|")
          .map((o) => o.trim())
          .filter(Boolean)
      : null;
  if (options && options.length === 0) throw new Error(`${file}: "${label}" is a select with no \`options:\` line.`);
  return {
    key,
    label,
    type,
    required: !/^(yes|true)$/i.test(c.get("optional") ?? ""),
    hint: c.get("hint") || null,
    options,
  };
}

// One form file as its snapshot. `file` is the path from the house root
// (`01-prospecting/forms/free-look.en-GB.md`): the name gives the form and the language, and
// every error starts with it.
export function parseForm(file: string, raw: string): FormSnapshot {
  const name = NAME_RE.exec(file.split("/").at(-1) ?? "");
  if (!name) throw new Error(`${file}: the name is not <form>.<language>.md.`);
  const [, form, tag] = name;

  const m = raw.replace(/^﻿/, "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: no frontmatter.`);
  let fm: Record<string, unknown>;
  try {
    fm = (parse(m[1]) ?? {}) as Record<string, unknown>;
  } catch (e) {
    throw new Error(`${file}: the frontmatter does not parse: ${e instanceof Error ? e.message : String(e)}`);
  }
  const str = (k: string) => (typeof fm[k] === "string" ? (fm[k] as string).trim() : "");

  if (str("kind") !== "form") throw new Error(`${file}: the frontmatter has no \`kind: form\`.`);
  const title = str("title");
  if (!title) throw new Error(`${file}: the frontmatter has no \`title\`.`);
  const language = str("language") as FormLanguage;
  if (!FORM_LANGUAGES.includes(language)) {
    throw new Error(`${file}: the frontmatter's \`language\` is not one of ${FORM_LANGUAGES.join(", ")}.`);
  }
  if (language !== tag) throw new Error(`${file}: the name says ${tag}, the frontmatter says ${language}.`);
  const folder = str("folder");
  if (!folder) throw new Error(`${file}: the frontmatter has no \`folder\`.`);

  // Each `##` heading opens a question; `###` and deeper are prose inside it.
  const fields: FormField[] = [];
  let label: string | null = null;
  let lines: string[] = [];
  const flush = () => {
    if (label !== null) fields.push(field(file, label, lines));
    lines = [];
  };
  for (const line of m[2].split(/\r?\n/)) {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2) {
      flush();
      label = h2[1];
    } else if (label !== null) lines.push(line);
  }
  flush();
  if (fields.length === 0) throw new Error(`${file}: no question. Each question is a \`##\` heading.`);

  // A second answer under one key would overwrite the first.
  const seen = new Set<string>();
  for (const f of fields) {
    if (seen.has(f.key)) throw new Error(`${file}: the key "${f.key}" is on two questions.`);
    seen.add(f.key);
  }

  return { form, language, folder, title, intro: str("intro"), fields };
}

// The language files of one form against each other: the same folder, the same keys in the
// same order, the same type and the same option count per question (why: the desk maps an
// answer to a pool field by the option's position; the words differ per language, the
// position does not · 2026-10-25). Each error names both files.
export function checkLanguages(files: { file: string; snapshot: FormSnapshot }[]): void {
  const [first, ...rest] = files;
  if (!first) return;
  const a = first.snapshot;
  for (const { file, snapshot: b } of rest) {
    const both = `${first.file} and ${file}`;
    if (a.folder !== b.folder) throw new Error(`${both}: the folder differs (${a.folder}, ${b.folder}).`);
    const keysA = a.fields.map((f) => f.key).join(", ");
    const keysB = b.fields.map((f) => f.key).join(", ");
    if (keysA !== keysB) throw new Error(`${both}: the keys differ (${keysA}; ${keysB}).`);
    a.fields.forEach((fa, i) => {
      const fb = b.fields[i];
      if (fa.type !== fb.type) throw new Error(`${both}: "${fa.key}" is a ${fa.type} and a ${fb.type}.`);
      const na = fa.options?.length ?? 0;
      const nb = fb.options?.length ?? 0;
      if (na !== nb) throw new Error(`${both}: "${fa.key}" has ${na} and ${nb} options.`);
    });
  }
}
