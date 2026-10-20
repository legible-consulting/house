import { neon } from "@neondatabase/serverless";
import { env } from "./env";

// The pool's statuses, defined once in clients/CONTEXT.md and mirrored in db/schema.sql.
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

export type Role = "jamie" | "salesman" | "client";

export interface DeskUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface Prospect {
  id: string;
  company: string;
  contact_name: string;
  email: string;
  language: string;
  source: string;
  salesman: string;
  salesman_name: string;
  salesman_email: string;
  status: Status;
  next_action: string;
  notes: string;
  pr_url: string | null;
  created_at: string;
  updated_at: string;
}

export type ProspectFields = Pick<
  Prospect,
  "company" | "contact_name" | "email" | "language" | "source" | "next_action" | "notes"
>;

// A client per call: the driver speaks HTTP, there is nothing to pool, and a missing
// DATABASE_URL then fails the page that needs it instead of every page.
const sql = () => neon(env("DATABASE_URL"));

export async function userByEmail(email: string): Promise<DeskUser | null> {
  const rows = (await sql()`
    select id, email, name, role from users where email = ${email}
  `) as DeskUser[];
  return rows[0] ?? null;
}

// First sign-in opens the row at role client. Jamie promotes with SQL (db/schema.sql).
export async function ensureUser(email: string, name: string): Promise<void> {
  await sql()`
    insert into users (email, name) values (${email}, ${name})
    on conflict (email) do nothing
  `;
}

const prospectSelect = `
  select p.*, u.name as salesman_name, u.email as salesman_email
  from prospects p join users u on u.id = p.salesman
`;

// Jamie sees the whole pool; a salesman sees their own rows.
export async function prospectsFor(user: DeskUser): Promise<Prospect[]> {
  const q = sql();
  if (user.role === "jamie") {
    return (await q.query(`${prospectSelect} order by p.updated_at desc`)) as Prospect[];
  }
  return (await q.query(`${prospectSelect} where p.salesman = $1 order by p.updated_at desc`, [
    user.id,
  ])) as Prospect[];
}

export async function prospectFor(user: DeskUser, id: string): Promise<Prospect | null> {
  const q = sql();
  const rows =
    user.role === "jamie"
      ? await q.query(`${prospectSelect} where p.id = $1`, [id])
      : await q.query(`${prospectSelect} where p.id = $1 and p.salesman = $2`, [id, user.id]);
  return (rows[0] as Prospect | undefined) ?? null;
}

export async function countsByStatus(): Promise<Record<Status, number>> {
  const rows = (await sql()`
    select status, count(*)::int as n from prospects group by status
  `) as { status: Status; n: number }[];
  const counts = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<Status, number>;
  for (const r of rows) counts[r.status] = r.n;
  return counts;
}

export async function insertProspect(salesman: string, f: ProspectFields): Promise<string> {
  const rows = (await sql()`
    insert into prospects (company, contact_name, email, language, source, salesman, next_action, notes)
    values (${f.company}, ${f.contact_name}, ${f.email}, ${f.language}, ${f.source}, ${salesman}, ${f.next_action}, ${f.notes})
    returning id
  `) as { id: string }[];
  return rows[0]!.id;
}

export async function updateProspect(id: string, f: ProspectFields): Promise<void> {
  await sql()`
    update prospects set
      company = ${f.company}, contact_name = ${f.contact_name}, email = ${f.email},
      language = ${f.language}, source = ${f.source}, next_action = ${f.next_action},
      notes = ${f.notes}, updated_at = now()
    where id = ${id}
  `;
}

export async function setStatus(id: string, status: Status): Promise<void> {
  await sql()`update prospects set status = ${status}, updated_at = now() where id = ${id}`;
}

export async function setHandoff(id: string, prUrl: string): Promise<void> {
  await sql()`
    update prospects set status = 'ready for Jamie', pr_url = ${prUrl}, updated_at = now()
    where id = ${id}
  `;
}

// Form input to the stored fields: trimmed strings, company required.
export function fieldsFrom(form: FormData): ProspectFields {
  const s = (k: string) => String(form.get(k) ?? "").trim();
  const f = {
    company: s("company"),
    contact_name: s("contact_name"),
    email: s("email").toLowerCase(),
    language: s("language"),
    source: s("source"),
    next_action: s("next_action"),
    notes: s("notes"),
  };
  if (!f.company) throw new Error("Company is required.");
  return f;
}
