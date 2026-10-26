import type { FontRegistration } from "@formepdf/react";

/**
 * Fetches the two families from Google Fonts at render, as TrueType. Forme
 * embeds each one as a subset of the glyphs the document uses. Nothing is
 * cached in the repo: the fonts are the brand's, served where the site gets
 * them (tokens/fonts.css in the brand's home).
 */
interface Face {
  family: string;
  weight: number;
  italic?: boolean;
}

const css2 = (faces: Face[]): string => {
  const byFamily = new Map<string, Face[]>();
  for (const face of faces) {
    byFamily.set(face.family, [...(byFamily.get(face.family) ?? []), face]);
  }
  const params = [...byFamily].map(([name, list]) => {
    const axes = list
      .map((f) => `${f.italic ? 1 : 0},${f.weight}`)
      .sort()
      .join(";");
    return `family=${name.replaceAll(" ", "+")}:ital,wght@${axes}`;
  });
  return `https://fonts.googleapis.com/css2?${params.join("&")}`;
};

// Without a browser user agent, the API answers with one TrueType file per face.
const FACE =
  /font-family: '([^']+)';\s*font-style: (normal|italic);\s*font-weight: (\d+);\s*src: url\((https:[^)]+\.ttf)\)/g;

export const fetchFonts = async (
  sans: string,
  mono: string
): Promise<FontRegistration[]> => {
  const faces: Face[] = [
    { family: sans, weight: 400 },
    { family: sans, weight: 400, italic: true },
    { family: sans, weight: 600 },
    { family: sans, weight: 600, italic: true },
    { family: mono, weight: 400 },
    { family: mono, weight: 500 },
  ];
  const res = await fetch(css2(faces), {
    headers: { "User-Agent": "legible-render" },
  });
  if (!res.ok) {
    throw new Error(`Google Fonts answered ${res.status} for ${sans}, ${mono}`);
  }
  const css = await res.text();
  const fonts: FontRegistration[] = [];
  for (const m of css.matchAll(FACE)) {
    const file = await fetch(m[4]);
    if (!file.ok) {
      throw new Error(`Google Fonts answered ${file.status} for ${m[4]}`);
    }
    fonts.push({
      family: m[1],
      fontStyle: m[2] as "normal" | "italic",
      fontWeight: Number(m[3]),
      src: new Uint8Array(await file.arrayBuffer()),
    });
  }
  if (fonts.length !== faces.length) {
    throw new Error(
      `Google Fonts gave ${fonts.length} of ${faces.length} faces for ${sans}, ${mono}`
    );
  }
  // The semibold file is also weight 700, for bold runs inside a paragraph
  // (lib/markdown.tsx says why). The design has no 700.
  const bold = fonts
    .filter((f) => f.family === sans && f.fontWeight === 600)
    .map((f) => ({ ...f, fontWeight: 700 }));
  return [...fonts, ...bold];
};
