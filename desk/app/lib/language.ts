import { LOCALES } from "./lead";
import { LANGUAGES, type DeskUser } from "./pool";

// The language a user reads the desk in (salesman-desk, decision 1): the user row's, set on
// /preferences, else the first language of the browser's Accept-Language that maps to the three
// (the map /start uses, lib/lead.ts LOCALES), else en-GB. A page may offer another language in its
// URL for one read; the preference does not change with it (why: a salesman reads in one language
// on every device, and the prospect's language is the row's, not the salesman's · 2026-10-28).

export type Language = (typeof LANGUAGES)[number];

// Each language by its own name, as /preferences lists them.
export const LANGUAGE_NAMES: Record<Language, string> = {
  "en-GB": "English",
  "fr-BE": "Français",
  "pt-PT": "Português",
};

export const isLanguage = (v: unknown): v is Language =>
  typeof v === "string" && (LANGUAGES as readonly string[]).includes(v);

// The header's languages, highest weight first; a tie keeps the header's order. "fr-FR;q=0.8"
// maps by its primary subtag, fr, to fr-BE.
function fromHeader(header: string): Language | null {
  const tags = header
    .split(",")
    .map((part, i) => {
      const [tag = "", ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const weight = q ? Number(q.slice(2)) : 1;
      return { tag: tag.trim().toLowerCase(), weight: Number.isFinite(weight) ? weight : 0, i };
    })
    .filter((t) => t.tag && t.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.i - b.i);
  for (const t of tags) {
    const hit = LOCALES[t.tag.split("-")[0] ?? ""];
    if (hit) return hit;
  }
  return null;
}

export function languageOf(user: Pick<DeskUser, "language"> | null, acceptLanguage: string | null): Language {
  if (user && isLanguage(user.language)) return user.language;
  return (acceptLanguage && fromHeader(acceptLanguage)) || "en-GB";
}
