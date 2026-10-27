import { mark } from "../_mark";

// The maskable icon of the manifest (app/_mark.tsx): the mark inside Android's safe zone.
export const dynamic = "force-static";

export function GET(): Response {
  return mark(512, "maskable");
}
