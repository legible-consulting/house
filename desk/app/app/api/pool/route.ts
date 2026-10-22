import { timingSafeEqual } from "node:crypto";
import { freeSlug, insertProspect, jamieId, openProspectByEmail } from "@/lib/db";
import { maybeEnv } from "@/lib/env";
import { LANGUAGES, type ProspectFields } from "@/lib/pool";

// The pool API: the one route with no session. The portfolio's contact form
// (k0d0minio/jamienisbet) posts each lead here with `Authorization: Bearer <POOL_TOKEN>`,
// and the lead lands in the pool as a row Jamie sourced, at `new`, like a row he adds by
// hand on /pool. The portfolio sends its own mail; the desk sends nothing (cadence.md).
//
//   POST /api/pool  body { name, email, message, language, company?, phone? }
//   201 { id }      the row is inserted
//   400 { error }   the body is not the JSON above
//   401 { error }   no bearer token, or one that is not POOL_TOKEN
//   422 { id }      a prospect with that email is open (status not lost and not handed off):
//                   nothing is inserted, the open row's id comes back
//
// `language` is one of the pool's (pt-PT, fr-BE, en-GB) or the portfolio's locale (pt, fr,
// en). An empty company is the name (why: a person who writes from the site is their own
// business until the sourcer says otherwise · 2026-10-22).
export const dynamic = "force-dynamic";

const LOCALES: Record<string, (typeof LANGUAGES)[number]> = { pt: "pt-PT", fr: "fr-BE", en: "en-GB" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (status: number, body: object) => Response.json(body, { status });

// The token is compared in constant time; no token, or none set on the project, is a no.
function authorised(req: Request): boolean {
  const header = req.headers.get("authorization") ?? "";
  const given = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const expected = maybeEnv("POOL_TOKEN");
  if (!given || !expected) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// One field of the body: a trimmed string within its length, or the first thing wrong.
function text(b: Record<string, unknown>, key: string, max: number, required: boolean): string {
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

// The body as the stored fields (prospect.md): the name is the contact, the message is the
// ask, the source is the portfolio. Every field the form does not carry stays empty.
function fieldsOf(body: unknown): ProspectFields {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("The body is a JSON object.");
  const b = body as Record<string, unknown>;
  const name = text(b, "name", 200, true);
  const email = text(b, "email", 254, true).toLowerCase();
  if (!EMAIL_RE.test(email)) throw new Error("email is not an address.");
  const message = text(b, "message", 5000, true);
  const lang = text(b, "language", 10, true);
  const language = LOCALES[lang] ?? ((LANGUAGES as readonly string[]).includes(lang) ? lang : "");
  if (!language) throw new Error(`language is one of ${LANGUAGES.join(", ")} or ${Object.keys(LOCALES).join(", ")}.`);
  return {
    company: text(b, "company", 200, false) || name,
    contact_name: name,
    role: "",
    email,
    phone: text(b, "phone", 50, false),
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

export async function POST(req: Request): Promise<Response> {
  if (!authorised(req)) return json(401, { error: "A bearer POOL_TOKEN is required." });
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "The body is not JSON." });
  }
  let fields: ProspectFields;
  try {
    fields = fieldsOf(body);
  } catch (e) {
    return json(400, { error: e instanceof Error ? e.message : String(e) });
  }
  try {
    const open = await openProspectByEmail(fields.email);
    if (open) return json(422, { id: open });
    const id = await insertProspect(await jamieId(), await freeSlug(fields.company), fields);
    return json(201, { id });
  } catch (e) {
    return json(500, { error: e instanceof Error ? e.message : String(e) });
  }
}
