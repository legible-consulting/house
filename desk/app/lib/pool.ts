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
// cadence.md, Channels: a no is permanent for the company, on every channel. The row's page sets
// this reason with one gesture, which also puts the row's email, phone and WhatsApp number on the
// no-contact list (the table suppressions).
export const NO_CONTACT = "asked not to be contacted";

export const LINES = ["local", "sme"] as const;
export const SIZES = ["1", "2-9", "10-49", "50+"] as const;
// One value per line of core/services.md, in its order, then unknown.
export const SERVICES = [
  "site",
  "app",
  "platform",
  "workshop",
  "coaching",
  "retainer",
  "geo",
  "landing-page",
  "automation",
  "ai-infrastructure",
  "ai-consultancy",
  "project-management",
  "software",
  "lead-gen",
  "unknown",
] as const;
export const DEAL_SIZES = ["<2k", "2k-10k", "10k-30k", ">30k"] as const;

export type Role = "jamie" | "salesman" | "client";

export interface DeskUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  handle: string;
  client: string | null; // the clients/<slug> a client-role user reads; null for the rest
  active: boolean; // false for a client saved by a sent link and not activated yet
  language: (typeof LANGUAGES)[number] | ""; // the user's own, set on /preferences; "" for none
}

// A client user of one folder, as the Users card on /clients/<slug> lists them.
export interface ClientUser {
  email: string;
  name: string;
  active: boolean;
  saved: string; // YYYY-MM-DD, the row's creation
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
  whatsapp: string; // a number with its country code, as typed
  instagram: string; // the handle, lower case, without @
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
  salesman_handle: string | null; // users.handle of the sourcer; null for Jamie or a salesman without one
  ask: string;
  status: Status;
  previous_status: Status | null;
  next_action: string | null;
  notes: string;
  lost_reason: string;
  meeting_at: string | null; // the meeting's instant, ISO in UTC; shown as Jamie's time (meetingTime)
  meeting_with: MeetingWith | "";
  meeting_where: string; // a place, a phone number or a link
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
  | "whatsapp"
  | "instagram"
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

// One contact point of a row: its email lower-cased, or its phone as `+` and the digits of the
// country code and number (00 reads as +), so "+351 912 345 678" and "00351912345678" are one
// number. A phone without a country code keeps its digits only (prospect.md asks for the code).
// One number is one contact point: the phone and WhatsApp. So the row's WhatsApp number is a
// `phone` point too, and one point with the phone when they are one number.
export type ContactPoint = { kind: "email" | "phone"; value: string };

export function phoneKey(phone: string): string {
  const t = phone.trim().replace(/^00/, "+");
  const digits = t.replace(/\D/g, "");
  if (!digits) return "";
  return t.startsWith("+") ? `+${digits}` : digits;
}

export function contactPoints(c: { email: string; phone: string; whatsapp: string }): ContactPoint[] {
  const points: ContactPoint[] = [];
  const email = c.email.trim().toLowerCase();
  const phone = phoneKey(c.phone);
  const whatsapp = phoneKey(c.whatsapp);
  if (email) points.push({ kind: "email", value: email });
  if (phone) points.push({ kind: "phone", value: phone });
  if (whatsapp && whatsapp !== phone) points.push({ kind: "phone", value: whatsapp });
  return points;
}

// wa.me takes the number with its country code and no + or 00. A number without a country code
// keeps its digits, as phoneKey does.
export function whatsappUrl(number: string): string | null {
  const n = phoneKey(number).replace(/^\+/, "");
  return n ? `https://wa.me/${n}` : null;
}

// An Instagram handle: letters, digits, dots and underscores, at most 30. instagramHandle takes
// it from `@name`, `name` or an instagram.com address, in lower case (handles ignore case).
const HANDLE_RE = /^[a-z0-9._]{1,30}$/;

export function instagramHandle(v: string): string {
  return v
    .trim()
    .replace(/^(https?:\/\/)?(www\.)?instagram\.com\//i, "")
    .replace(/^@/, "")
    .replace(/[/?#].*$/, "")
    .toLowerCase();
}

export function instagramUrl(handle: string): string | null {
  const h = instagramHandle(handle);
  return HANDLE_RE.test(h) ? `https://www.instagram.com/${h}/` : null;
}

// The refusal, in words, for the contact points the no-contact list holds.
export const noContactError = (hits: ContactPoint[]): string =>
  `${hits.map((c) => c.value).join(" and ")}: they asked not to be contacted. The pool takes no row for it, on any channel (cadence.md, Channels).`;

// The meeting (prospect.md, Fields): when, with whom and where. The time is Jamie's, in his time
// zone: the desk writes it there and shows it there, so a salesman in Brussels and Jamie read
// one time (why: the meeting is Jamie's to take or to know of · 2026-10-28).
export const TIME_ZONE = "Europe/Lisbon";
export const MEETING_WITH = ["sourcer", "jamie"] as const;
export type MeetingWith = (typeof MEETING_WITH)[number];
export const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

export interface Meeting {
  date: string; // YYYY-MM-DD, in Jamie's time zone
  time: string; // HH:MM, in Jamie's time zone
  with: MeetingWith;
  where: string;
}

// An instant as Jamie's date and time.
export function meetingTime(at: string): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(at));
  const v = (t: Intl.DateTimeFormatPartTypes) => parts.find((x) => x.type === t)?.value ?? "";
  return { date: `${v("year")}-${v("month")}-${v("day")}`, time: `${v("hour")}:${v("minute")}` };
}

// The row's meeting, or null when it has none.
export function meetingOf(p: Prospect): Meeting | null {
  if (!p.meeting_at || !p.meeting_with) return null;
  return { ...meetingTime(p.meeting_at), with: p.meeting_with, where: p.meeting_where };
}

// Who takes the meeting, in words: Jamie, or the sourcer by handle.
export const meetingWho = (m: Meeting, p: Pick<Prospect, "sourced_by">): string =>
  m.with === "jamie" ? "Jamie" : p.sourced_by;

// A `where` that is a link opens as one.
export const linkOf = (where: string): string | null => (/^https?:\/\/\S+$/.test(where.trim()) ? where.trim() : null);

export const MEETING_NEEDED = "meeting needs its date, its time and with whom.";

// The meeting fields of a form (the Move card and the Meeting field group): null when all four
// are empty. A part filled without the date, the time or with whom is refused, in words.
export function meetingFrom(form: FormData): Meeting | null {
  const s = (k: string) => String(form.get(k) ?? "").trim();
  const date = s("meeting_date");
  const time = s("meeting_time");
  const withWhom = s("meeting_with");
  const where = s("meeting_where");
  if (!date && !time && !withWhom && !where) return null;
  if (!date || !time || !withWhom) throw new Error(`The ${MEETING_NEEDED}`);
  if (!DATE_RE.test(date)) throw new Error("The meeting's date is YYYY-MM-DD.");
  if (!TIME_RE.test(time)) throw new Error("The meeting's time is HH:MM, in Lisbon time.");
  if (!MEETING_WITH.includes(withWhom as MeetingWith)) throw new Error("The meeting is with the sourcer or with Jamie.");
  return { date, time, with: withWhom as MeetingWith, where };
}

// Only the sourcer and Jamie write a row; every other salesman reads it. A handed-off row
// is read-only for all: the client folder is the record from then on.
export function canWrite(p: Prospect, u: DeskUser): boolean {
  if (p.status === "handed off") return false;
  return u.role === "jamie" || (u.role === "salesman" && p.salesman === u.id);
}

// The statuses the user may move the row to from where it is. Jamie may set any other. The
// sourcer follows the arrows: new → contacted (after one logged touch) → replied → meeting, and
// lost from any status but handed off. `ready for Jamie` and `handed off` are not moves, for
// Jamie too: the handoff sets them, with its PR and its record (prospect.md, Statuses).
const HANDOFF: readonly Status[] = ["ready for Jamie", "handed off"];

export function nextMoves(p: Prospect, u: DeskUser): Status[] {
  if (!canWrite(p, u)) return [];
  if (u.role === "jamie") return STATUSES.filter((s) => s !== p.status && !HANDOFF.includes(s));
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
  if (p.status === "meeting" && !meetingOf(p)) missing.push("the meeting's date, time and with whom");
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
    whatsapp: s("whatsapp"),
    instagram: instagramHandle(s("instagram")),
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
  if (f.instagram && !HANDLE_RE.test(f.instagram)) {
    throw new Error("Instagram is a handle: letters, digits, dots and underscores, at most 30.");
  }
  return f;
}
