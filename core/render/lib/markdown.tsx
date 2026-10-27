import {
  Cell,
  Link as InlineLink,
  Text as InlineRun,
  Row,
  Table,
} from "@formepdf/react";
import { Lexer } from "marked";
import type { Token, Tokens } from "marked";
import type { ReactNode } from "react";

import { Divider } from "@/components/pdf/divider/divider";
import { Heading } from "@/components/pdf/heading/heading";
import { Text } from "@/components/pdf/text/text";
import { Text as Run, View } from "@/lib/pdf-primitives";
import {
  A4_WIDTH,
  CELL_LEADING,
  CELL_PAD,
  CELL_SIZE,
  isSignRow,
  LABEL_SIZE,
  layoutTable,
} from "@/lib/table";
import type { DocumentDesign } from "@/lib/voice";

/**
 * Client markdown to pdfcn and Forme elements. What a client document uses:
 * headings 1 to 3, paragraphs, bold, italic, code, links, lists, tables,
 * rules and HTML comments (dropped). A paragraph in capitals only is an
 * eyebrow, set in mono.
 */
export const lex = (body: string): Token[] => Lexer.lex(body);

const ENTITIES: Record<string, string> = {
  "&#39;": "'",
  "&amp;": "&",
  "&gt;": ">",
  "&lt;": "<",
  "&quot;": '"',
};

// A line break in the markdown source is a space; only a hard break ("br") breaks the line.
const plain = (s: string): string =>
  s
    .replace(/&(?:amp|lt|gt|quot|#39);/g, (e) => ENTITIES[e] ?? e)
    .replace(/\s*\n\s*/g, " ");

export const isEyebrow = (t: Token): boolean =>
  t.type === "paragraph" && /^[A-ZÀ-Ý0-9 ·&/-]{3,}$/.test(t.text.trim());

export const tracking = (size: number, em: number): number =>
  Math.round(size * em * 100) / 100;

export class Markdown {
  constructor(private d: DocumentDesign) {}

  /**
   * Inline runs are Forme's own Text and Link: Forme's serialiser keeps the
   * style of a run only for its own components, not for pdfcn's wrappers.
   */
  inline(tokens: Token[] | undefined): ReactNode[] {
    return (tokens ?? []).map((t, i) => {
      switch (t.type) {
        case "strong":
          return (
            <InlineRun key={i} style={{ fontWeight: this.d.headingWeight }}>
              {this.inline(t.tokens)}
            </InlineRun>
          );
        case "em":
          return (
            <InlineRun key={i} style={{ fontStyle: "italic" }}>
              {this.inline(t.tokens)}
            </InlineRun>
          );
        case "codespan":
          return (
            <InlineRun key={i} style={{ fontFamily: this.d.mono, fontSize: this.d.bodySize - 1.5 }}>
              {plain(t.text)}
            </InlineRun>
          );
        case "link":
          return (
            <InlineLink
              key={i}
              href={t.href}
              style={{ color: this.d.ink, textDecoration: "underline" }}
            >
              {this.inline(t.tokens)}
            </InlineLink>
          );
        case "br":
          return "\n";
        case "text":
          return "tokens" in t && t.tokens ? this.inline(t.tokens) : plain(t.text);
        case "escape":
          return plain(t.text);
        case "html":
          return null;
        default:
          return "text" in t ? plain(String(t.text)) : null;
      }
    });
  }

  eyebrow(text: string, key?: number): ReactNode {
    const size = 8;
    return (
      <Text
        key={key}
        color="mutedForeground"
        style={{
          fontFamily: this.d.mono,
          fontSize: size,
          letterSpacing: tracking(size, 0.12),
          marginBottom: 10,
          textTransform: "uppercase",
        }}
      >
        {text.trim()}
      </Text>
    );
  }

  heading(t: Tokens.Heading, key?: number): ReactNode {
    const level = Math.min(t.depth, 3) as 1 | 2 | 3;
    const size = [this.d.h1, this.d.h2, this.d.h3][level - 1];
    return (
      <Heading key={key} level={level} style={{ letterSpacing: tracking(size, -0.02) }}>
        {this.inline(t.tokens)}
      </Heading>
    );
  }

  /**
   * Each item is kept whole on one page: Forme draws a row of wrapped text that
   * it moves to the next page one line short, over the item after it. A lead
   * (the heading before the list) stays on the page of the first item.
   */
  list(t: Tokens.List, key?: number, lead?: ReactNode): ReactNode {
    const start = typeof t.start === "number" ? t.start : 1;
    const rows = t.items.map((item, i) => (
      <View key={i} wrap={false} style={{ flexDirection: "row", marginBottom: 4 }}>
        <View style={{ width: 16 }}>
          <Run
            style={{
              color: this.d.meta,
              fontFamily: this.d.mono,
              fontSize: this.d.bodySize - 2,
              lineHeight: (this.d.bodySize * this.d.bodyLineHeight) / (this.d.bodySize - 2),
            }}
          >
            {t.ordered ? `${start + i}.` : "–"}
          </Run>
        </View>
        <View style={{ flex: 1 }}>{this.blocks(item.tokens, true)}</View>
      </View>
    ));
    if (lead && rows.length > 0) {
      rows[0] = (
        <View key="lead" wrap={false}>
          {lead}
          {rows[0]}
        </View>
      );
    }
    return (
      <View key={key} style={{ marginBottom: 8 }}>
        {rows}
      </View>
    );
  }

  /**
   * A table fills the text width and never passes the margin (lib/table.ts).
   * Hairlines separate the rows. A column of figures is set in mono and, after
   * the first column, right-aligned. An empty header row is not drawn. A row
   * to sign in gets room for a signature. A table short enough to fit on one
   * page is kept whole, with its lead (the heading or label before it).
   */
  table(t: Tokens.Table, key?: number, lead?: ReactNode): ReactNode {
    const layout = layoutTable(t, A4_WIDTH - 2 * this.d.marginX);
    const columns = layout.fractions.map((fraction) => ({ width: { fraction } }));
    const rule = { borderBottomColor: this.d.hairline, borderBottomWidth: 0.5 };
    const cell = (extra = {}) => ({
      ...rule,
      paddingBottom: CELL_PAD,
      paddingLeft: CELL_PAD,
      paddingRight: CELL_PAD,
      paddingTop: CELL_PAD,
      ...extra,
    });
    const align = (c: number) =>
      layout.figures[c] && c > 0 ? ("right" as const) : ("left" as const);
    const body = (c: number) => ({
      fontFamily: layout.figures[c] ? this.d.mono : this.d.sans,
      fontSize: layout.figures[c] ? CELL_SIZE - 0.5 : CELL_SIZE,
      lineHeight: CELL_LEADING,
      textAlign: align(c),
    });
    const table = (
      <Table
        columns={columns}
        style={layout.header ? undefined : { borderTopColor: this.d.hairline, borderTopWidth: 0.5 }}
      >
        {layout.header ? (
          <Row header>
            {t.header.map((head, c) => (
              <Cell key={c} style={cell({ backgroundColor: this.d.sheet })}>
                <Run
                  style={{
                    color: this.d.meta,
                    fontFamily: this.d.mono,
                    fontSize: LABEL_SIZE,
                    letterSpacing: tracking(LABEL_SIZE, 0.12),
                    textAlign: align(c),
                    textTransform: "uppercase",
                  }}
                >
                  {this.inline(head.tokens)}
                </Run>
              </Cell>
            ))}
          </Row>
        ) : null}
        {t.rows.map((row, r) => {
          const sign = isSignRow(row);
          return (
            <Row key={r}>
              {row.map((value, c) => (
                <Cell key={c} style={cell(sign ? { minHeight: 40 } : {})}>
                  <Run style={body(c)}>{this.inline(value.tokens)}</Run>
                </Cell>
              ))}
            </Row>
          );
        })}
      </Table>
    );
    const whole = layout.height < 420;
    return (
      <View key={key} wrap={whole ? false : undefined} style={{ marginBottom: 12 }}>
        {lead}
        <View style={{ marginTop: 4 }}>{table}</View>
      </View>
    );
  }

  block(t: Token, key: number, tight = false): ReactNode {
    switch (t.type) {
      case "heading":
        return this.heading(t as Tokens.Heading, key);
      case "paragraph":
        return isEyebrow(t) ? (
          this.eyebrow(t.text, key)
        ) : (
          <Text key={key}>{this.inline(t.tokens)}</Text>
        );
      case "text":
        return (
          <Text key={key} noMargin={tight}>
            {this.inline("tokens" in t ? t.tokens : undefined)}
          </Text>
        );
      case "list":
        return this.list(t as Tokens.List, key);
      case "table":
        return this.table(t as Tokens.Table, key);
      case "hr":
        return (
          <Divider key={key} spacing="md" style={{ borderBottomWidth: 0.5 }} />
        );
      case "blockquote":
        return (
          <View
            key={key}
            style={{
              borderLeftColor: this.d.hairline,
              borderLeftWidth: 1,
              marginBottom: 8,
              paddingLeft: 12,
            }}
          >
            {this.blocks(t.tokens ?? [])}
          </View>
        );
      case "code":
        return (
          <View
            key={key}
            style={{ backgroundColor: this.d.sheet, marginBottom: 8, padding: 10 }}
          >
            <Run style={{ fontFamily: this.d.mono, fontSize: this.d.bodySize - 2 }}>
              {t.text}
            </Run>
          </View>
        );
      default:
        // space, html (comments) and anything a client document does not use.
        return null;
    }
  }

  /**
   * A lead introduces what follows it: a heading, a paragraph that is all bold
   * ("Worked examples"), or a short paragraph that ends with a colon.
   */
  private isLead(t: Token): boolean {
    if (t.type === "heading") {
      return true;
    }
    if (t.type !== "paragraph" || isEyebrow(t)) {
      return false;
    }
    const tokens = (t as Tokens.Paragraph).tokens;
    const allBold = tokens.length === 1 && tokens[0].type === "strong";
    return allBold || (t.text.length < 300 && t.text.trimEnd().endsWith(":"));
  }

  /**
   * Leads stay on the page of what follows them: the first item of a list, a
   * table kept whole, or, after a heading, a paragraph short enough to move.
   */
  blocks(tokens: Token[], tight = false): ReactNode[] {
    const out: ReactNode[] = [];
    const shown = tokens.filter((t) => this.block(t, 0, tight) !== null);
    for (let i = 0; i < shown.length; i++) {
      let j = i;
      while (j < shown.length - 1 && j - i < 2 && this.isLead(shown[j])) {
        j++;
      }
      const next = shown[j];
      if (j > i && (next.type === "table" || next.type === "list")) {
        const lead = shown.slice(i, j).map((t, k) => this.block(t, k));
        out.push(
          next.type === "table"
            ? this.table(next as Tokens.Table, i, lead)
            : this.list(next as Tokens.List, i, lead)
        );
        i = j;
      } else if (
        shown[i].type === "heading" &&
        shown[i + 1]?.type === "paragraph" &&
        shown[i + 1].text.length < 600
      ) {
        out.push(
          <View key={i} wrap={false}>
            {this.block(shown[i], 0)}
            {this.block(shown[i + 1], 1)}
          </View>
        );
        i++;
      } else {
        out.push(this.block(shown[i], i, tight));
      }
    }
    return out;
  }
}
