import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { parse } from "yaml";

/**
 * Reads a client document from the house and assembles what is rendered.
 * The naming rule is stated in core/CONTEXT.md § Outputs, beside the renderer;
 * this file is its one implementation.
 */
export type Kind = "proposal" | "quote" | "agreement";

export const KINDS: Kind[] = ["proposal", "quote", "agreement"];

export interface Source {
  kind: Kind;
  title: string;
  date: string;
  lang: string;
  body: string;
  fileName: string;
}

/**
 * The kind as the first word of the file name, in the document's language (its `language` frontmatter).
 * kinds.json is the one table; place.sh reads it too.
 */
const KIND_WORD = JSON.parse(
  readFileSync(join(import.meta.dirname, "..", "kinds.json"), "utf8")
) as Record<string, Record<Kind | "signed", string>>;

export const kindWord = (lang: string, kind: Kind | "signed"): string => {
  const words = KIND_WORD[lang.slice(0, 2).toLowerCase()];
  if (!words) {
    throw new Error(`no kind words for language ${lang}`);
  }
  return words[kind];
};

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?/;

const split = (path: string): { meta: Record<string, unknown>; body: string } => {
  if (!existsSync(path)) {
    throw new Error(`${path} does not exist`);
  }
  const text = readFileSync(path, "utf8");
  const m = text.match(FRONTMATTER);
  if (!m) {
    throw new Error(`${path} has no frontmatter`);
  }
  return { body: text.slice(m[0].length), meta: parse(m[1]) ?? {} };
};

const field = (meta: Record<string, unknown>, key: string, path: string): string => {
  const value = meta[key];
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${path} has no '${key}' in its frontmatter`);
  }
  return value.trim();
};

/**
 * The proposal's last section is the quote: the proposal's last "## " section
 * is replaced by the body of quote/quote.md (03-proposal and 04-quote).
 */
const inlineQuote = (proposal: string, quote: string): string => {
  const lines = proposal.split("\n");
  let last = -1;
  lines.forEach((line, i) => {
    if (line.startsWith("## ")) {
      last = i;
    }
  });
  const head = last < 0 ? proposal : lines.slice(0, last).join("\n");
  return `${head.trimEnd()}\n\n${quote.trim()}\n`;
};

// Characters a file system or Drive refuses in a name are dropped.
const clean = (s: string): string =>
  s.replace(/[/\\:*?"<>|]/g, "").replace(/\s+/g, " ").trim();

/**
 * The kind already says what the document is, so the name carries the
 * client's name, not the document's title (Jamie, 2026-10-27).
 */
export const fileNameFor = (kind: Kind, lang: string, client: string, date: string): string =>
  `${kindWord(lang, kind)} - ${clean(client)} - Jamie Nisbet - ${date}.pdf`;

export const readSource = (root: string, client: string, kind: Kind): Source => {
  const path = join(root, "clients", client, kind, `${kind}.md`);
  const { meta, body } = split(path);
  const recordPath = join(root, "clients", client, "record.md");
  const name = field(split(recordPath).meta, "name", recordPath);
  const title = field(meta, "title", path);
  const date = field(meta, "date", path);
  const lang = field(meta, "language", path);
  let text = body;
  if (kind === "proposal") {
    const quotePath = join(root, "clients", client, "quote", "quote.md");
    if (existsSync(quotePath)) {
      text = inlineQuote(body, split(quotePath).body);
    }
  }
  return {
    body: text,
    date,
    fileName: fileNameFor(kind, lang, name, date),
    kind,
    lang,
    title,
  };
};
