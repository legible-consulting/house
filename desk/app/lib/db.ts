import { neon } from "@neondatabase/serverless";
import { env } from "./env";
import { clientSlugs } from "./house";
import type { Channel, DeskUser, Prospect, ProspectFields, Status, Touch } from "./pool";
import { slugOf, STATUSES } from "./pool";

// A client per call: the driver speaks HTTP, there is nothing to pool, and a missing
// DATABASE_URL then fails the page that needs it instead of every page. Dates come back as
// text (YYYY-MM-DD) so no time zone moves a day.
const sql = () => neon(env("DATABASE_URL"));

// `client` is read through to_jsonb so the query works before and after db/schema.sql adds
// the column: a deploy never waits on the console, and a missing column reads as null.
const userSelect = `
  select id, email, name, role, coalesce(handle, split_part(email, '@', 1)) as handle,
    to_jsonb(users.*) ->> 'client' as client
  from users`;

export async function userByEmail(email: string): Promise<DeskUser | null> {
  const rows = (await sql().query(`${userSelect} where email = $1`, [email])) as DeskUser[];
  return rows[0] ?? null;
}

// First sign-in opens the row at role client, with no handle. Jamie promotes with SQL
// (db/schema.sql).
export async function ensureUser(email: string, name: string): Promise<void> {
  await sql()`
    insert into users (email, name) values (${email}, ${name})
    on conflict (email) do nothing
  `;
}

const prospectSelect = `
  select p.id, p.slug, p.company, p.contact_name, p.role, p.email, p.phone, p.website,
    p.country, p.language, p.line, p.size, p.service, p.deal_size, p.source, p.salesman,
    p.ask, p.status, p.previous_status, p.next_action::text as next_action, p.notes,
    p.lost_reason, p.pr_url, p.record, p.created_at::date::text as added,
    p.updated_at::date::text as updated, u.email as salesman_email, u.name as salesman_name,
    case when u.role = 'jamie' then 'jamie'
         else coalesce(u.handle, split_part(u.email, '@', 1)) end as sourced_by,
    (select count(*)::int from touches t where t.prospect = p.id) as touches
  from prospects p join users u on u.id = p.salesman`;

// Jamie and every salesman read the whole pool (S1: one owner per row, all read it).
export async function allProspects(): Promise<Prospect[]> {
  return (await sql().query(`${prospectSelect} order by p.updated_at desc`)) as Prospect[];
}

export async function prospectById(id: string): Promise<Prospect | null> {
  const rows = (await sql().query(`${prospectSelect} where p.id = $1`, [id])) as Prospect[];
  return rows[0] ?? null;
}

export async function touchesOf(prospect: string): Promise<Touch[]> {
  return (await sql().query(
    `select id, touched_on::text as touched_on, channel, note
     from touches where prospect = $1 order by touched_on, created_at`,
    [prospect],
  )) as Touch[];
}

export async function countsByStatus(): Promise<Record<Status, number>> {
  const rows = (await sql()`
    select status, count(*)::int as n from prospects group by status
  `) as { status: Status; n: number }[];
  const counts = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<Status, number>;
  for (const r of rows) counts[r.status] = r.n;
  return counts;
}

export async function slugTaken(slug: string, exceptId: string | null = null): Promise<boolean> {
  const rows = (await sql().query(
    `select 1 from prospects where slug = $1 and id is distinct from $2::uuid`,
    [slug, exceptId],
  )) as unknown[];
  return rows.length > 0;
}

// The slug from the company, free in the pool and against clients/*/: the base, then base-2
// to base-9. The sourcer may edit it until the handoff (prospect.md).
export async function freeSlug(company: string): Promise<string> {
  const base = slugOf(company);
  let slug = base;
  for (let n = 2; clientSlugs.has(slug) || (await slugTaken(slug)); n++) {
    if (n > 9) throw new Error(`No free slug for ${base}: edit the company name.`);
    slug = `${base}-${n}`;
  }
  return slug;
}

// The jamie user: the salesman of a row the portfolio sources (app/api/pool). The oldest
// row with the role, should two ever carry it.
export async function jamieId(): Promise<string> {
  const rows = (await sql()`
    select id from users where role = 'jamie' order by created_at limit 1
  `) as { id: string }[];
  if (!rows[0]) throw new Error("No user has the role jamie (db/schema.sql).");
  return rows[0].id;
}

// The open row with this email, if one exists: not lost and not handed off. The pool API
// answers 422 with it instead of a second row (why: one company has one row · prospect.md).
export async function openProspectByEmail(email: string): Promise<string | null> {
  const rows = (await sql()`
    select id from prospects where email = ${email} and status not in ('lost', 'handed off')
    order by created_at limit 1
  `) as { id: string }[];
  return rows[0]?.id ?? null;
}

export async function insertProspect(salesman: string, slug: string, f: ProspectFields): Promise<string> {
  const rows = (await sql()`
    insert into prospects (slug, company, contact_name, role, email, phone, website, country,
      language, line, size, service, deal_size, source, salesman, ask, notes)
    values (${slug}, ${f.company}, ${f.contact_name}, ${f.role}, ${f.email}, ${f.phone},
      ${f.website}, ${f.country}, ${f.language}, ${f.line}, ${f.size}, ${f.service},
      ${f.deal_size}, ${f.source}, ${salesman}, ${f.ask}, ${f.notes})
    returning id
  `) as { id: string }[];
  return rows[0]!.id;
}

export async function updateProspect(
  id: string,
  slug: string,
  f: ProspectFields,
  nextAction: string | null,
): Promise<void> {
  await sql()`
    update prospects set
      slug = ${slug}, company = ${f.company}, contact_name = ${f.contact_name}, role = ${f.role},
      email = ${f.email}, phone = ${f.phone}, website = ${f.website}, country = ${f.country},
      language = ${f.language}, line = ${f.line}, size = ${f.size}, service = ${f.service},
      deal_size = ${f.deal_size}, source = ${f.source}, ask = ${f.ask}, notes = ${f.notes},
      next_action = ${nextAction}, updated_at = now()
    where id = ${id}
  `;
}

export async function setStatus(id: string, status: Status, lostReason: string): Promise<void> {
  await sql()`
    update prospects set status = ${status}, lost_reason = ${lostReason}, updated_at = now()
    where id = ${id}
  `;
}

export async function setNextAction(id: string, day: string | null): Promise<void> {
  await sql()`update prospects set next_action = ${day}, updated_at = now() where id = ${id}`;
}

export async function insertTouch(
  prospect: string,
  touchedOn: string,
  channel: Channel,
  note: string,
): Promise<void> {
  await sql()`
    insert into touches (prospect, touched_on, channel, note)
    values (${prospect}, ${touchedOn}, ${channel}, ${note})
  `;
  await sql()`update prospects set updated_at = now() where id = ${prospect}`;
}

// The handoff PR is open: the row remembers where it was, for a PR closed without a merge.
export async function setReady(id: string, slug: string, prUrl: string): Promise<void> {
  await sql()`
    update prospects set previous_status = status, status = 'ready for Jamie', slug = ${slug},
      pr_url = ${prUrl}, updated_at = now()
    where id = ${id}
  `;
}

// Jamie merged: the row is read-only from here and names its record.
export async function setHandedOff(id: string, record: string): Promise<void> {
  await sql()`
    update prospects set status = 'handed off', record = ${record}, updated_at = now()
    where id = ${id}
  `;
}

// The PR was closed without a merge: back to where the row was, so a new handoff can open.
export async function revertReady(id: string): Promise<void> {
  await sql()`
    update prospects set status = coalesce(previous_status, 'replied'), previous_status = null,
      pr_url = null, updated_at = now()
    where id = ${id}
  `;
}
