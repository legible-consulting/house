import { ImageResponse } from "next/og";
import { LOGO_FRAME_PATH, LOGO_LETTERS_PATH, LOGO_VIEWBOX } from "@/components/desk/logo";

// The desk's icons, drawn at build so no image file lives in git (desk/CONTEXT.md): the JN
// mark from the brand's traced paths (components/desk/logo.tsx), in paper on the ink tile.
// Nothing is redrawn by hand. Two crops. `any`: the mark at 95.5% of the tile, the brand's
// own cut of the reference icon (a 1528 px frame on a 1600 px tile). `maskable`: the mark
// at 70%, inside the 80% safe zone Android keeps when it masks the icon to a circle or a
// squircle. The colours are literals: Satori reads no stylesheet, as on the brand's OG card.
const INK = "#1E1E1E";
const PAPER = "#FFFEFA";
const CROP = { any: 0.955, maskable: 0.7 } as const;

export function mark(size: number, crop: keyof typeof CROP = "any"): ImageResponse {
  const box = Math.round(size * CROP[crop]);
  return new ImageResponse(
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: INK,
      }}
    >
      <svg width={box} height={box} viewBox={LOGO_VIEWBOX}>
        <path d={LOGO_FRAME_PATH} fillRule="evenodd" fill={PAPER} />
        <path d={LOGO_LETTERS_PATH} fill={PAPER} />
      </svg>
    </div>,
    { width: size, height: size },
  );
}
