import { ImageResponse } from "next/og";

// The desk's icon for the manifest (app/desk.webmanifest/route.ts): a D on the desk's dark,
// drawn at build, so no image file lives in git. Full bleed: Android masks it to its shape,
// and the letter sits inside the safe centre.
export function mark(size: number): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#fafafa",
        fontSize: size * 0.56,
        fontWeight: 600,
      }}
    >
      D
    </div>,
    { width: size, height: size },
  );
}
