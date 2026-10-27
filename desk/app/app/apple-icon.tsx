import { mark } from "./_mark";

// The Apple touch icon, from the same function as the manifest's icons (app/_mark.tsx).
// The maskable crop: iOS masks the icon to its own shape, and the frame at 95.5% would
// lose its corners.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return mark(180, "maskable");
}
