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

  table(t: Tokens.Table, key?: number): ReactNode {
    const width = (cells: Tokens.TableCell[]) => cells.map((c) => c.text.length);
    const longest = t.header.map((_, c) =>
      Math.max(...[width(t.header), ...t.rows.map(width)].map((w) => w[c] ?? 0), 4)
    );
    const total = longest.reduce((a, b) => a + b, 0);
    const columns = longest.map((l) => ({
      width: { fraction: Math.max(l / total, 0.12) },
    }));
    const pad = { paddingBottom: 6, paddingLeft: 6, paddingRight: 6, paddingTop: 6 };
    const rule = { borderBottomColor: this.d.hairline, borderBottomWidth: 0.5 };
    const label = 7.5;
    return (
      <View key={key} style={{ marginBottom: 12, marginTop: 4 }}>
        <Table columns={columns}>
          <Row header style={{ backgroundColor: this.d.sheet, ...rule }}>
            {t.header.map((cell, c) => (
              <Cell key={c} style={pad}>
                <Run
                  style={{
                    color: this.d.meta,
                    fontFamily: this.d.mono,
                    fontSize: label,
                    letterSpacing: tracking(label, 0.12),
                    textTransform: "uppercase",
                  }}
                >
                  {this.inline(cell.tokens)}
                </Run>
              </Cell>
            ))}
          </Row>
          {t.rows.map((row, r) => (
            <Row key={r} style={rule}>
              {row.map((cell, c) => (
                <Cell key={c} style={pad}>
                  <Run style={{ fontSize: this.d.bodySize - 1, lineHeight: 1.4 }}>
                    {this.inline(cell.tokens)}
                  </Run>
                </Cell>
              ))}
            </Row>
          ))}
        </Table>
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
   * A heading is kept on the page of what follows it: a paragraph short enough
   * to move with it, or the first item of a list.
   */
  blocks(tokens: Token[], tight = false): ReactNode[] {
    const out: ReactNode[] = [];
    const shown = tokens.filter((t) => this.block(t, 0, tight) !== null);
    for (let i = 0; i < shown.length; i++) {
      const t = shown[i];
      const next = shown[i + 1];
      if (
        t.type === "heading" &&
        next?.type === "paragraph" &&
        next.text.length < 600
      ) {
        out.push(
          <View key={i} wrap={false}>
            {this.block(t, 0)}
            {this.block(next, 1)}
          </View>
        );
        i++;
      } else if (t.type === "heading" && next?.type === "list") {
        out.push(this.list(next as Tokens.List, i, this.block(t, 0)));
        i++;
      } else {
        out.push(this.block(t, i, tight));
      }
    }
    return out;
  }
}
