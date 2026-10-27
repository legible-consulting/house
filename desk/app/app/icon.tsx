import { mark } from "./_mark";

// The favicon, from the same function as the manifest's icons (app/_mark.tsx).
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return mark(64);
}
