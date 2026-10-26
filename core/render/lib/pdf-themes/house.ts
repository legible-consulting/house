import type { DocumentDesign } from "@/lib/voice";
import type { PdfcnTheme } from "@/types/pdf-themes";

import { defaultPrimitives } from "./primitives";

/**
 * House theme: the pdfcn theme built from core/voice.md § Document design.
 * Ink is the only tint, so primary and accent are ink. Info has no colour of
 * its own in the design and takes meta.
 */
export const houseTheme = (d: DocumentDesign): PdfcnTheme => ({
  colors: {
    accent: d.ink,
    background: d.paper,
    border: d.hairline,
    destructive: d.danger,
    foreground: d.ink,
    info: d.meta,
    muted: d.sheet,
    mutedForeground: d.meta,
    primary: d.ink,
    primaryForeground: d.paper,
    success: d.success,
    warning: d.warning,
  },
  name: "house",
  page: { orientation: "portrait", size: d.pageSize },
  primitives: {
    ...defaultPrimitives,
    fontWeights: { ...defaultPrimitives.fontWeights, bold: d.headingWeight },
  },
  spacing: {
    componentGap: 12,
    page: {
      marginBottom: d.marginY,
      marginLeft: d.marginX,
      marginRight: d.marginX,
      marginTop: d.marginY,
    },
    paragraphGap: 8,
    sectionGap: 26,
  },
  typography: {
    body: {
      fontFamily: d.sans,
      fontSize: d.bodySize,
      lineHeight: d.bodyLineHeight,
    },
    heading: {
      fontFamily: d.sans,
      fontSize: {
        h1: d.h1,
        h2: d.h2,
        h3: d.h3,
        h4: d.bodySize,
        h5: d.bodySize,
        h6: d.bodySize,
      },
      fontWeight: d.headingWeight,
      lineHeight: 1.2,
    },
  },
});
