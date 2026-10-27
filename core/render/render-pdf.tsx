/**
 * The house renderer: one client document to one PDF in the house's design.
 * Called by render.sh, which checks the arguments first:
 *   tsx render-pdf.tsx --root <house> --client <slug> --kind <kind> --out <dir>
 * Prints "RESULT: RENDERED <path>" on success.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";

import { renderDocument } from "@formepdf/core";
import type { ReactElement } from "react";

import { PdfcnThemeProvider } from "@/components/pdf/theme-provider";
import { fetchFonts } from "@/lib/fonts";
import { HouseDocument, readLogo } from "@/lib/house-document";
import { houseTheme } from "@/lib/pdf-themes/house";
import { KINDS, readSource } from "@/lib/source";
import type { Kind } from "@/lib/source";
import { readDesign } from "@/lib/voice";

const { values } = parseArgs({
  options: {
    client: { type: "string" },
    kind: { type: "string" },
    out: { type: "string" },
    root: { type: "string" },
  },
});

const { client, kind, out, root } = values;
if (!client || !kind || !out || !root || !KINDS.includes(kind as Kind)) {
  throw new Error("usage: render-pdf.tsx --root <house> --client <slug> --kind <kind> --out <dir>");
}

const design = readDesign(join(root, "core", "voice.md"));
const source = readSource(root, client, kind as Kind);
const fonts = await fetchFonts(design.sans, design.mono);
const assets = join(import.meta.dirname, "assets");

// pdfcn components read the theme while the tree is serialised, so the
// provider is called as a function: it sets the theme, then expands the tree.
const document = PdfcnThemeProvider({
  children: (
    <HouseDocument
      source={source}
      design={design}
      fonts={fonts}
      logoFull={readLogo(join(assets, "logo-full.svg"))}
      logoMark={readLogo(join(assets, "logo-mark.svg"))}
    />
  ),
  theme: houseTheme(design),
}) as ReactElement;

const pdf = await renderDocument(document);
mkdirSync(out, { recursive: true });
const path = join(out, source.fileName);
writeFileSync(path, pdf);
console.log(`RESULT: RENDERED ${path}`);
