// The pool's rules, from 01-prospecting/prospect.md (the fields, the statuses, who
// writes a row) and cadence.md (next_action). Pure functions; the SQL lives in db.ts.

export const STATUSES = [
  "new",
  "contacted",
  "replied",
  "meeting",
  "ready for Jamie",
  "handed off",
  "lost",
] as const;
export type Status = (typeof STATUSES)[number];
export const isStatus = (v: unknown): v is Status => STATUSES.includes(v as Status);

export const CHANNELS = ["email", "phone", "whatsapp", "in person"] as const;
export type Channel = (typeof CHANNELS)[number];
export const isChannel = (v: unknown): v is Channel => CHANNELS.includes(v as Channel);

export const LANGUAGES = ["pt-PT", "fr-BE", "en-GB"] as const;

// cadence.md: three touches on days 0, 7 and 21 from the first touch, each a different angle;
// day 28 is when the row is due for `lost`. The desk sets next_action from it and the Sell
// page shows it as a strip.
export const CADENCE = [
  { day: 0, touch: 1, angle: "opener" },
  { day: 7, touch: 2, angle: "follow-up" },
  { day: 21, touch: 3, angle: "last note" },
  { day: 28, touch: null, angle: "due for lost" },
] as const;
export const LINES = ["local", "sme"] as const;
export const SIZES = ["1", "2-9", "10-49", "50+"] as const;
export const SERVICES = ["site", "app", "platform", "workshop", "coaching", "unknown"] as const;
export const DEAL_SIZES = ["<2k", "2k-10k", "10k-30k", ">30k"] as const;

export type Role = "jamie" | "salesman" | "client";

export interface DeskUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  handle: string;
  client: string | null; // the clients/<slug> a client-role user reads; null for the rest
}

export interface Touch {
  id: string;
  touched_on: string;
  channel: Channel;
  note: string;
}

export interface Prospect {
  id: string;
  slug: string | null;
  company: string;
  contact_name: string;
  role: string;
  email: string;
  phone: string;
  website: string;
  country: string;
  language: string;
  line: string;
  size: string;
  service: string;
  deal_size: string;
  source: string;
  salesman: string;
  sourced_by: string;
  salesman_email: string;
  salesman_name: string;
  ask: string;
  status: Status;
  previous_status: Status | null;
  next_action: string | null;
  notes: string;
  lost_reason: string;
  pr_url: string | null;
  record: string | null;
  added: string;
  updated: string;
  touches: number;
}

export type ProspectFields = Pick<
  Prospect,
  | "company"
  | "contact_name"
  | "role"
  | "email"
  | "phone"
  | "website"
  | "country"
  | "language"
  | "line"
  | "size"
  | "service"
  | "deal_size"
  | "source"
  | "ask"
  | "notes"
>;

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// The slug is the folder name under clients/: ASCII, lower case, dashes.
export function slugOf(company: string): string {
  const slug = company
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/, "");
  return slug || "prospect";
}

export const today = (): string => new Date().toISOString().slice(0, 10);

export function addDays(day: string, n: number): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

// Only the sourcer and Jamie write a row; every other salesman reads it. A handed-off row
// is read-only for all: the client folder is the record from then on.
export function canWrite(p: Prospect, u: DeskUser): boolean {
  if (p.status === "handed off") return false;
  return u.role === "jamie" || (u.role === "salesman" && p.salesman === u.id);
}

// The statuses the user may move the row to from where it is. Jamie may set any. The sourcer
// follows the arrows: new → contacted (after one logged touch) → replied → meeting, and lost
// from any status but handed off. `ready for Jamie` and `handed off` are not moves: the
// handoff sets them.
export function nextMoves(p: Prospect, u: DeskUser): Status[] {
  if (!canWrite(p, u)) return [];
  if (u.role === "jamie") return STATUSES.filter((s) => s !== p.status);
  switch (p.status) {
    case "new":
      return p.touches > 0 ? ["contacted", "lost"] : ["lost"];
    case "contacted":
      return ["replied", "lost"];
    case "replied":
      return ["meeting", "lost"];
    case "meeting":
    case "ready for Jamie":
      return ["lost"];
    default:
      return [];
  }
}

// What `ready for Jamie` needs, by name, so the page can say what is missing.
export function missingForReady(p: Prospect): string[] {
  const missing: string[] = [];
  if (!p.contact_name) missing.push("contact");
  if (!p.email && !p.phone) missing.push("email or phone");
  if (!p.country) missing.push("country");
  if (!p.language) missing.push("language");
  if (!p.ask) missing.push("ask");
  if (p.touches < 1) missing.push("one logged touch");
  return missing;
}

// Ready goes from replied or meeting, once: a second PR for one row is a second folder.
export const canGoReady = (p: Prospect): boolean =>
  (p.status === "replied" || p.status === "meeting") && !p.pr_url;

// After each logged touch, before a reply, next_action is the cadence's next date, counted
// from the first touch. From `replied` on the sourcer sets it by hand: null means keep.
export function nextActionAfterTouch(status: Status, touches: Touch[]): string | null {
  if (status !== "new" && status !== "contacted") return null;
  const first = touches.map((t) => t.touched_on).sort()[0];
  if (!first) return null;
  const step = CADENCE[Math.min(Math.max(touches.length, 1), 3)]!;
  return addDays(first, step.day);
}

// Form input to the stored fields: trimmed strings. Company and source are required at add
// (prospecting); the closed lists are checked against their values.
export function fieldsFrom(form: FormData): ProspectFields {
  const s = (k: string) => String(form.get(k) ?? "").trim();
  const oneOf = (k: string, list: readonly string[]) => {
    const v = s(k);
    if (v && !list.includes(v)) throw new Error(`${k} is one of ${list.join(", ")}.`);
    return v;
  };
  const f: ProspectFields = {
    company: s("company"),
    contact_name: s("contact_name"),
    role: s("role"),
    email: s("email").toLowerCase(),
    phone: s("phone"),
    website: s("website"),
    country: s("country").toUpperCase(),
    language: oneOf("language", LANGUAGES),
    line: oneOf("line", LINES),
    size: oneOf("size", SIZES),
    service: oneOf("service", SERVICES),
    deal_size: oneOf("deal_size", DEAL_SIZES),
    source: s("source"),
    ask: s("ask"),
    notes: s("notes"),
  };
  if (!f.company) throw new Error("Company is required.");
  if (!f.source) throw new Error("Source is required: who referred, which event, which list.");
  if (f.country && !/^[A-Z]{2}$/.test(f.country)) throw new Error("Country is a two-letter code: PT, BE, GB.");
  return f;
}
