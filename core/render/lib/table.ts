import type { Tokens } from "marked";

/**
 * How a markdown table is laid out on the page. Column widths follow the CSS
 * automatic table layout: each column gets at least its longest word and at
 * most its longest line, and the columns always fill the text width exactly.
 */
export const A4_WIDTH = 595.28;
export const CELL_PAD = 6;
export const CELL_SIZE = 10;
export const CELL_LEADING = 1.4;
export const LABEL_SIZE = 7.5;

// Average advance of one character, in points, at the sizes above. An estimate:
// it sets widths and the kept-whole test, never where text is drawn.
const SANS_CHAR = CELL_SIZE * 0.52;
const MONO_CHAR = CELL_SIZE * 0.6;
const LABEL_CHAR = LABEL_SIZE * 0.6 + LABEL_SIZE * 0.12;

/** The cell's text as the reader sees it, without markdown marks. */
export const cellText = (cell: Tokens.TableCell): string =>
  cell.text.replace(/[*_`]/g, "").trim();

/**
 * A figure: a price, a count, a rate or a date. Short, with a digit, and no
 * more letters than other characters ("€40 (8.5%)", "20 h × 120 €", "Fri 23 Oct 2026").
 */
export const isFigure = (s: string): boolean => {
  const chars = s.replace(/\s/g, "");
  if (chars.length === 0 || chars.length > 26 || !/\d/.test(chars)) {
    return false;
  }
  const letters = (chars.match(/\p{L}/gu) ?? []).length;
  return letters / chars.length <= 0.5;
};

export interface TableLayout {
  /** Each column's share of the text width; the shares add up to 1. */
  fractions: number[];
  /** A column of figures: IBM Plex Mono, and right-aligned unless it is the first. */
  figures: boolean[];
  /** The header row has text in it; an empty one is not drawn. */
  header: boolean;
  /** An estimate of the table's height in points. */
  height: number;
}

const longestWord = (s: string): number =>
  Math.max(0, ...s.split(/\s+/).map((w) => w.length));

export const layoutTable = (t: Tokens.Table, textWidth: number): TableLayout => {
  const columns = t.header.length;
  const body = (c: number) => t.rows.map((row) => (row[c] ? cellText(row[c]) : ""));
  const figures = Array.from({ length: columns }, (_, c) => {
    const cells = body(c).filter((s) => s !== "");
    return cells.length > 0 && cells.filter(isFigure).length / cells.length >= 0.5;
  });
  const header = t.header.some((cell) => cellText(cell) !== "");

  const pad = CELL_PAD * 2;
  const min: number[] = [];
  const max: number[] = [];
  for (let c = 0; c < columns; c++) {
    const char = figures[c] ? MONO_CHAR : SANS_CHAR;
    const head = header ? cellText(t.header[c]) : "";
    const cells = body(c);
    min[c] =
      pad +
      Math.max(
        longestWord(head) * LABEL_CHAR,
        ...cells.map((s) => (figures[c] && isFigure(s) ? s.length : longestWord(s)) * char)
      );
    max[c] = Math.max(min[c], pad + head.length * LABEL_CHAR, ...cells.map((s) => pad + s.length * char));
  }

  const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
  let widths: number[];
  if (sum(max) <= textWidth) {
    // Room to spare: the text columns take it; a table of figures only shares it out.
    const growers = figures.some((f) => !f) ? figures.map((f) => !f) : figures.map(() => true);
    const base = sum(max.filter((_, c) => growers[c]));
    widths = max.map((w, c) => (growers[c] ? w + ((textWidth - sum(max)) * w) / base : w));
  } else if (sum(min) >= textWidth) {
    widths = min.map((w) => (w * textWidth) / sum(min));
  } else {
    const share = (textWidth - sum(min)) / (sum(max) - sum(min));
    widths = min.map((w, c) => w + (max[c] - w) * share);
  }

  const line = CELL_SIZE * CELL_LEADING;
  const rowHeight = (row: Tokens.TableCell[]) =>
    pad +
    line *
      Math.max(
        1,
        ...row.map((cell, c) => {
          const char = figures[c] ? MONO_CHAR : SANS_CHAR;
          return Math.ceil((cellText(cell).length * char) / Math.max(widths[c] - pad, 1));
        })
      );
  const height = (header ? pad + 2 * LABEL_SIZE * 1.4 : 0) + sum(t.rows.map(rowHeight));

  return { figures, fractions: widths.map((w) => w / textWidth), header, height };
};

/** A row to sign in: a label, then empty cells. It gets room for a signature. */
export const isSignRow = (row: Tokens.TableCell[]): boolean =>
  row.length > 1 && cellText(row[0]) !== "" && row.slice(1).every((cell) => cellText(cell) === "");
