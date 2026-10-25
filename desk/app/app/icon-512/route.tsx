import { mark } from "../_mark";

// One icon of the manifest (app/_mark.tsx).
export const dynamic = "force-static";

export function GET(): Response {
  return mark(512);
}
