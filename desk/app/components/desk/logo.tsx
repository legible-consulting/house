import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// The 2026 Jamie Nisbet logo, as the brand traced it. The constants are copied from
// `components/brand/logo-artwork.ts` at the root of k0d0minio/jamienisbet, where the paths
// were traced from the reference PNGs and diffed back against them; nothing here is redrawn,
// and a change to the logo is a new trace there and a new copy here. The desk imports
// nothing from that repo. The box is 0 to 100 on each side, the frame's outer edges.

/** The box every path below is drawn in. */
export const LOGO_VIEWBOX = "0 0 100 100";

/** The frame's stroke as a share of the tile: 32px of the 1528px source. */
export const LOGO_FRAME_INSET = 2.09;

/** The thin square frame, as a ring (fill-rule evenodd). */
export const LOGO_FRAME_PATH = "M0 0H100V100H0ZM2.09 2.09V97.91H97.91V2.09Z";

/** The icon form's JN letters, where they sit inside the frame. */
export const LOGO_LETTERS_PATH =
  "M22.02 79.92C21.36 79.88 20.42 79.76 19.63 79.60C16.84 79.03 14.43 77.83 12.07 75.83C11.44 75.29 9.92 73.75 9.40 73.10L9.01 72.62L9.92 71.72C10.42 71.22 11.89 69.76 13.19 68.48L15.56 66.14L16.43 67.01C18.30 68.86 19.23 69.60 20.28 70.04C21.19 70.42 22.44 70.61 23.20 70.47C24.49 70.24 25.47 69.21 25.85 67.70C26.15 66.51 26.14 67.27 26.16 47.13L26.18 28.03L30.99 28.03L35.80 28.03L35.78 47.46C35.76 65.64 35.75 66.96 35.64 67.81C35.18 71.48 34.25 74.03 32.62 76.13C30.51 78.85 26.87 80.15 22.02 79.92ZM43.85 53.37L43.85 28.03L48.48 28.03L53.11 28.03L61.35 40.65C65.89 47.60 70.76 55.05 72.18 57.23L74.77 61.18L74.79 44.60L74.80 28.03L79.65 28.03L84.49 28.03L84.49 53.37L84.49 78.72L79.85 78.72L75.20 78.72L75.05 78.50C74.96 78.39 70.09 70.93 64.23 61.94L53.57 45.59L53.53 62.14L53.50 78.68L48.67 78.70L43.85 78.72L43.85 53.37Z";

/** Where the letters sit in the box, used to centre them when they stand alone. */
export const LOGO_LETTERS_BOX = { x: 9.03, y: 28.03, width: 75.46, height: 51.93 };

// The letters alone are centred in a square at the width they hold inside the frame, so the
// letters and the framed tile at one size agree on how big the JN is.
const LETTERS_VIEWBOX = (() => {
  const cx = LOGO_LETTERS_BOX.x + LOGO_LETTERS_BOX.width / 2;
  const cy = LOGO_LETTERS_BOX.y + LOGO_LETTERS_BOX.height / 2;
  return `${(cx - 50).toFixed(2)} ${(cy - 50).toFixed(2)} 100 100`;
})();

// The JN in the current text colour: the letters alone, or the framed tile with `frame`. The
// frame's ring is a 1 px hairline that does not scale, so it stays crisp at 32 px.
export function Logo({
  frame = false,
  className,
  ...props
}: Omit<ComponentProps<"svg">, "viewBox" | "children"> & { frame?: boolean }) {
  return (
    <svg
      role="img"
      aria-label="Jamie Nisbet"
      viewBox={frame ? LOGO_VIEWBOX : LETTERS_VIEWBOX}
      className={cn("inline-block size-6 shrink-0", className)}
      {...props}
    >
      {frame && (
        <rect
          x={LOGO_FRAME_INSET / 2}
          y={LOGO_FRAME_INSET / 2}
          width={100 - LOGO_FRAME_INSET}
          height={100 - LOGO_FRAME_INSET}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      )}
      <path d={LOGO_LETTERS_PATH} fill="currentColor" />
    </svg>
  );
}
