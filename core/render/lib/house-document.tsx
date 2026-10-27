import { readFileSync } from "node:fs";
import { deflateSync, crc32 } from "node:zlib";

import { Document, Fixed, Page } from "@formepdf/react";
import type { FontRegistration } from "@formepdf/react";
import type { Token } from "marked";
import type { ReactNode } from "react";

import { Heading } from "@/components/pdf/heading/heading";
import { Text } from "@/components/pdf/text/text";
import { isEyebrow, lex, Markdown, tracking } from "@/lib/markdown";
import { Text as Run, View } from "@/lib/pdf-primitives";
import { Svg } from "@/lib/pdf-svg";
import type { Source } from "@/lib/source";
import type { DocumentDesign } from "@/lib/voice";

/**
 * The house layout (core/voice.md § Document design). The full logo on the
 * cover, or at the top of the first page when a document has no cover. The
 * logo mark and the page number in the footer of every other page.
 */
interface Logo {
  viewBox: string;
  content: string;
}

export const readLogo = (path: string): Logo => {
  const svg = readFileSync(path, "utf8").replace(/<!--[\s\S]*?-->/g, "");
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
  const inner = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/)?.[1];
  if (!viewBox || !inner) {
    throw new Error(`${path} is not an SVG with a viewBox`);
  }
  return { content: inner.trim(), viewBox };
};

const LogoArt = ({ logo, size }: { logo: Logo; size: number }) => (
  <Svg width={size} height={size} viewBox={logo.viewBox} content={logo.content} />
);

/** A one-pixel PNG of the paper colour, stretched behind every page. */
const paperPng = (hex: string): string => {
  const chunk = (type: string, data: Buffer) => {
    const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
    const out = Buffer.alloc(body.length + 8);
    out.writeUInt32BE(data.length, 0);
    body.copy(out, 4);
    out.writeUInt32BE(crc32(body), body.length + 4);
    return out;
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(1, 0);
  ihdr.writeUInt32BE(1, 4);
  ihdr.writeUInt8(8, 8); // bit depth
  ihdr.writeUInt8(2, 9); // truecolour
  const rgb = Buffer.from(hex.slice(1), "hex");
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(Buffer.concat([Buffer.from([0]), rgb]))),
    chunk("IEND", Buffer.alloc(0)),
  ]);
  return `data:image/png;base64,${png.toString("base64")}`;
};

/** The tokens before the first rule are the cover, when they hold the h1. */
const splitCover = (tokens: Token[]): { cover: Token[]; body: Token[] } => {
  const rule = tokens.findIndex((t) => t.type === "hr");
  const head = rule < 0 ? [] : tokens.slice(0, rule);
  const hasTitle = head.some((t) => t.type === "heading" && t.depth === 1);
  const hasSection = head.some((t) => t.type === "heading" && t.depth > 1);
  return hasTitle && !hasSection
    ? { body: tokens.slice(rule + 1), cover: head }
    : { body: tokens, cover: [] };
};

interface Props {
  source: Source;
  design: DocumentDesign;
  fonts: FontRegistration[];
  logoFull: Logo;
  logoMark: Logo;
}

export const HouseDocument = ({ source, design: d, fonts, logoFull, logoMark }: Props) => {
  const md = new Markdown(d);
  const { cover, body } = splitCover(lex(source.body));
  const margin = { bottom: d.marginY, left: d.marginX, right: d.marginX, top: d.marginY };
  const paper = paperPng(d.paper);
  const metaSize = 7.5;
  const meta = {
    color: d.meta,
    fontFamily: d.mono,
    fontSize: metaSize,
    letterSpacing: tracking(metaSize, 0.04),
  };

  const coverBlocks: ReactNode[] = [];
  let afterTitle = 0;
  cover.forEach((t, i) => {
    if (t.type === "heading") {
      coverBlocks.push(
        <Heading key={i} level={1} style={{ letterSpacing: tracking(d.h1, -0.02), marginBottom: 14 }}>
          {md.inline(t.tokens)}
        </Heading>
      );
      afterTitle = 1;
    } else if (isEyebrow(t)) {
      coverBlocks.push(md.eyebrow(t.text, i));
    } else if (t.type === "paragraph" && afterTitle === 1) {
      coverBlocks.push(
        <Text key={i} style={{ fontSize: d.h3, lineHeight: 1.4, marginBottom: 28 }}>
          {md.inline(t.tokens)}
        </Text>
      );
      afterTitle = 2;
    } else if (t.type === "paragraph") {
      coverBlocks.push(
        <Run key={i} style={{ ...meta, fontSize: 8.5, lineHeight: 1.6 }}>
          {md.inline(t.tokens)}
        </Run>
      );
    }
  });

  return (
    <Document
      title={source.title}
      author="Jamie Nisbet"
      creator="Legible Consulting house renderer"
      lang={source.lang}
      fonts={fonts}
      style={{ color: d.ink, fontFamily: d.sans, fontSize: d.bodySize }}
    >
      {cover.length > 0 ? (
        <Page size={d.pageSize} margin={margin} backgroundImage={paper} backgroundSize="fill">
          <LogoArt logo={logoFull} size={84} />
          <View style={{ marginTop: 210 }}>{coverBlocks}</View>
        </Page>
      ) : null}
      <Page size={d.pageSize} margin={margin} backgroundImage={paper} backgroundSize="fill">
        <Fixed position="footer">
          <View
            style={{
              alignItems: "center",
              borderTopColor: d.hairline,
              borderTopWidth: 0.5,
              flexDirection: "row",
              marginTop: 18,
              paddingTop: 10,
            }}
          >
            <LogoArt logo={logoMark} size={14} />
            <Run style={{ ...meta, flex: 1, marginLeft: 10 }}>{source.title}</Run>
            <Run style={meta}>{"{{pageNumber}} / {{totalPages}}"}</Run>
          </View>
        </Fixed>
        {cover.length === 0 ? (
          <View style={{ marginBottom: 36 }}>
            <LogoArt logo={logoFull} size={64} />
          </View>
        ) : null}
        {md.blocks(body)}
      </Page>
    </Document>
  );
};
