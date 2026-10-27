import { freeSlug, insertProspect, jamieId, openProspectByEmail } from "./db";
import { LANGUAGES, slugOf, type ProspectFields } from "./pool";

// A lead from the public into the pool: the two doors without a session share this code. The
// pool API (app/api/pool) posts the portfolio's contact form; /start posts the free look. Both
// insert a row Jamie sourced, at `new`, like a row he adds by hand on /pool.

// The portfolio's locale (pt, fr, en) to the pool's language. /start reads its `?lang` with it.
export const LOCALES: Record<string, (typeof LANGUAGES)[number]> = { pt: "pt-PT", fr: "fr-BE", en: "en-GB" };
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MAX = { name: 200, email: 254, phone: 50, company: 200, message: 5000 } as const;

// One field of the body: a trimmed string within its length, or the first thing wrong.
function text(b: Record<string, unknown>, key: keyof typeof MAX | "language", max: number, required: boolean): string {
  const v = b[key];
  if (v === undefined || v === null) {
    if (required) throw new Error(`${key} is required.`);
    return "";
  }
  if (typeof v !== "string") throw new Error(`${key} is a string.`);
  const t = v.trim();
  if (required && !t) throw new Error(`${key} is required.`);
  if (t.length > max) throw new Error(`${key} is at most ${max} characters.`);
  return t;
}

// The body `{ name, email, message, language, company?, phone? }` as the stored fields
// (prospect.md): the name is the contact, the message is the ask, the source is the portfolio.
// Every field the body does not carry stays empty. `language` is one of the pool's (pt-PT,
// fr-BE, en-GB) or a locale (pt, fr, en). An empty company is the name (why: a person who writes
// from the site is their own business until the sourcer says otherwise · 2026-10-22). The
// error names the first field that is wrong.
export function leadFields(body: unknown): ProspectFields {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("The body is a JSON object.");
  const b = body as Record<string, unknown>;
  const name = text(b, "name", MAX.name, true);
  const email = text(b, "email", MAX.email, true).toLowerCase();
  if (!EMAIL_RE.test(email)) throw new Error("email is not an address.");
  const message = text(b, "message", MAX.message, true);
  const lang = text(b, "language", 10, true);
  const language = LOCALES[lang] ?? ((LANGUAGES as readonly string[]).includes(lang) ? lang : "");
  if (!language) throw new Error(`language is one of ${LANGUAGES.join(", ")} or ${Object.keys(LOCALES).join(", ")}.`);
  return {
    company: text(b, "company", MAX.company, false) || name,
    contact_name: name,
    role: "",
    email,
    phone: text(b, "phone", MAX.phone, false),
    whatsapp: "",
    instagram: "",
    website: "",
    country: "",
    language,
    line: "",
    size: "",
    service: "",
    deal_size: "",
    source: "portfolio",
    ask: message,
    notes: "",
  };
}

// The row for these fields: a new one at `new` with `jamie` as its salesman, or the open row
// with that email (not lost, not handed off), and then nothing is inserted (why: one company
// has one row · prospect.md). `open` says which. The slug is where the lead's documents land
// (01-prospecting/leads/<slug>/); an open row without a slug gets the one its company gives.
export async function insertLead(f: ProspectFields): Promise<{ id: string; slug: string; open: boolean }> {
  const open = await openProspectByEmail(f.email);
  if (open) return { id: open.id, slug: open.slug || slugOf(open.company), open: true };
  const slug = await freeSlug(f.company);
  const id = await insertProspect(await jamieId(), slug, f);
  return { id, slug, open: false };
}
