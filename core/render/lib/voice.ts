import { readFileSync } from "node:fs";

/**
 * The document design, read from the table in core/voice.md § Document design.
 * That table is the one home of these values; the renderer reads it on every
 * run and keeps no copy. A value the table does not give stops the render.
 */
export interface DocumentDesign {
  paper: string;
  ink: string;
  hairline: string;
  sheet: string;
  meta: string;
  success: string;
  warning: string;
  danger: string;
  sans: string;
  mono: string;
  bodySize: number;
  bodyLineHeight: number;
  headingWeight: number;
  h1: number;
  h2: number;
  h3: number;
  pageSize: "A4";
  marginX: number;
  marginY: number;
}

const HEX = /#[0-9A-Fa-f]{6}/g;

const fail = (what: string): never => {
  throw new Error(`core/voice.md § Document design does not give ${what}`);
};

const readTable = (voicePath: string): Map<string, string> => {
  const text = readFileSync(voicePath, "utf8");
  const start = text.indexOf("\n## Document design");
  if (start < 0) {
    fail("the section");
  }
  const rest = text.slice(start + 1);
  const end = rest.indexOf("\n## ", 1);
  const section = end < 0 ? rest : rest.slice(0, end);
  const rows = new Map<string, string>();
  for (const line of section.split("\n")) {
    const cells = line.split("|").map((c) => c.trim());
    if (cells.length >= 4 && cells[1] && !/^-+$/.test(cells[1])) {
      rows.set(cells[1].toLowerCase(), cells[2]);
    }
  }
  return rows;
};

const row = (rows: Map<string, string>, name: string): string =>
  rows.get(name) ?? fail(`the row "${name}"`);

const firstHex = (rows: Map<string, string>, name: string): string =>
  row(rows, name).match(HEX)?.[0] ?? fail(`a colour in "${name}"`);

const points = (cell: string, pattern: RegExp, what: string): number => {
  const m = cell.match(pattern);
  return m ? Number(m[1]) : fail(what);
};

/** The family named first in a cell, before the first full stop. */
const family = (cell: string, what: string): string => {
  const name = cell.split(".")[0].trim();
  return /^[A-Z][A-Za-z ]+$/.test(name) ? name : fail(what);
};

export const readDesign = (voicePath: string): DocumentDesign => {
  const rows = readTable(voicePath);
  const state = row(rows, "state");
  const pick = (label: string): string =>
    state.match(new RegExp(`${label}\\s+\`?(#[0-9A-Fa-f]{6})`))?.[1] ??
    fail(`the ${label} state colour`);
  const type = row(rows, "body and headings");
  const page = row(rows, "page");
  if (!/\bA4\b/.test(page)) {
    fail("an A4 page");
  }
  return {
    paper: firstHex(rows, "paper"),
    ink: firstHex(rows, "ink"),
    hairline: firstHex(rows, "hairline"),
    sheet: firstHex(rows, "lifted sheet"),
    meta: firstHex(rows, "meta"),
    success: pick("success"),
    warning: pick("warning"),
    danger: pick("danger"),
    sans: family(type, "the body family"),
    mono: family(row(rows, "labels, figures, dates"), "the mono family"),
    bodySize: points(type, /Body (\d+(?:\.\d+)?) pt/, "the body size"),
    bodyLineHeight: points(
      type,
      /at (\d+(?:\.\d+)?) line height/,
      "the body line height"
    ),
    headingWeight: points(type, /weight (\d{3})/, "the heading weight"),
    h1: points(type, /h1 (\d+(?:\.\d+)?) pt/, "the h1 size"),
    h2: points(type, /h2 (\d+(?:\.\d+)?) pt/, "the h2 size"),
    h3: points(type, /h3 (\d+(?:\.\d+)?) pt/, "the h3 size"),
    pageSize: "A4",
    marginX: points(page, /(\d+) pt left and right/, "the side margins"),
    marginY: points(page, /(\d+) pt top and bottom/, "the top and bottom margins"),
  };
};
