import { neon } from "@neondatabase/serverless";
import { env } from "./env";
import type { FormSnapshot } from "./forms";
import { clientSlugs } from "./house";
import type { OpenLink, SentLink } from "./links";
import type { Channel, ClientUser, ContactPoint, DeskUser, Meeting, Prospect, ProspectFields, Status, Touch } from "./pool";
import { NO_CONTACT, slugOf, STATUSES, TIME_ZONE } from "./pool";

// A client per call: the driver speaks HTTP, there is nothing to pool, and a missing
// DATABASE_URL then fails the page that needs it instead of every page. Dates come back as
// text (YYYY-MM-DD) so no time zone moves a day.
const sql = () => neon(env("DATABASE_URL"));

// `client`, `active` and `language` are read through to_jsonb so the query works before and after
// db/schema.sql adds the column: a deploy never waits on the console. A missing `client` reads
// as null, a missing `active` reads as true and a missing `language` as "", the columns' defaults.
const userActive = `coalesce((to_jsonb(users.*) ->> 'active')::boolean, true)`;
const userSelect = `
  select id, email, name, role, coalesce(handle, split_part(email, '@', 1)) as handle,
    to_jsonb(users.*) ->> 'client' as client, ${userActive} as active,
    coalesce(to_jsonb(users.*) ->> 'language', '') as language
  from users`;

export async function userByEmail(email: string): Promise<DeskUser | null> {
  const rows = (await sql().query(`${userSelect} where email = $1`, [email])) as DeskUser[];
  return rows[0] ?? null;
}

// The user's own language, from /preferences. False when no row has the id.
export async function setLanguage(id: string, language: DeskUser["language"]): Promise<boolean> {
  const rows = (await sql()`update users set language = ${language} where id = ${id} returning id`) as { id: string }[];
  return rows.length > 0;
}

// First sign-in opens the row at role client, with no handle. Jamie promotes with SQL
// (db/schema.sql).
export async function ensureUser(email: string, name: string): Promise<void> {
  await sql()`
    insert into users (email, name) values (${email}, ${name})
    on conflict (email) do nothing
  `;
}

// The answer to a link sent from a client page saves the person as a user of that folder, not
// active (client-signs-up of .icm/intake/desk-forms). The update matches a client row only, so a
// row at role jamie or salesman is never changed, and it leaves `active` as it is, so an active
// row stays active. ensureUser does nothing on conflict, so the row keeps its role and its folder
// at the person's first sign-in. The result: "saved" for a row that waits for activation,
// "active" for a client row that was active already, "kept" for a row at another role.
export async function saveClientUser(email: string, name: string, slug: string): Promise<"saved" | "active" | "kept"> {
  const rows = (await sql()`
    insert into users (email, name, role, client, active) values (${email}, ${name}, 'client', ${slug}, false)
    on conflict (email) do update set name = excluded.name, client = excluded.client
      where users.role = 'client'
    returning active
  `) as { active: boolean }[];
  return !rows[0] ? "kept" : rows[0].active ? "active" : "saved";
}

// Jamie activates a client user of this folder (magic-link-sign-in of .icm/intake/desk-forms).
// The update matches a client row of the folder only, so it never changes another role or another
// folder's user. False when no such row exists.
export async function activateClientUser(email: string, slug: string): Promise<boolean> {
  const rows = (await sql()`
    update users set active = true where email = ${email} and client = ${slug} and role = 'client'
    returning id
  `) as { id: string }[];
  return rows.length > 0;
}

// The client users of one folder, oldest first, with their state (the Users card on
// /clients/<slug>, Jamie only).
export async function usersOf(slug: string): Promise<ClientUser[]> {
  return (await sql().query(
    `select email, name, ${userActive} as active, created_at::date::text as saved
     from users where client = $1 and role = 'client' order by created_at`,
    [slug],
  )) as ClientUser[];
}

// The meeting's three columns are read through to_jsonb as the users' are, so the pool works
// before and after db/schema.sql adds them: a missing column reads as no meeting. `meeting_at`
// comes back as an ISO instant in UTC; lib/pool.ts meetingTime shows it as Jamie's time.
const meetingAt = `(to_jsonb(p.*) ->> 'meeting_at')::timestamptz`;
const prospectSelect = `
  select p.id, p.slug, p.company, p.contact_name, p.role, p.email, p.phone, p.whatsapp, p.instagram,
    p.website, p.country, p.language, p.line, p.size, p.service, p.deal_size, p.source, p.salesman,
    p.ask, p.status, p.previous_status, p.next_action::text as next_action, p.notes,
    p.lost_reason, p.record, p.created_at::date::text as added,
    to_char(${meetingAt} at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as meeting_at,
    coalesce(to_jsonb(p.*) ->> 'meeting_with', '') as meeting_with,
    coalesce(to_jsonb(p.*) ->> 'meeting_where', '') as meeting_where,
    p.updated_at::date::text as updated, u.email as salesman_email, u.name as salesman_name,
    u.handle as salesman_handle,
    case when u.role = 'jamie' then 'jamie'
         else coalesce(u.handle, split_part(u.email, '@', 1)) end as sourced_by,
    (select count(*)::int from touches t where t.prospect = p.id) as touches
  from prospects p join users u on u.id = p.salesman`;

// Jamie and every salesman read the whole pool (prospecting: one owner per row, all read it).
// `q`, the search on /pool, keeps the rows whose company, contact, email, phone, WhatsApp,
// Instagram or source holds it, in any case (cadence.md, Channels: search the pool before adding a
// row). `%`, `_` and `\` in it are literal. A number matches on its digits too, so "912 345 678"
// finds "+351912345678".
export async function allProspects(q = ""): Promise<Prospect[]> {
  const words = q.trim();
  if (!words) return (await sql().query(`${prospectSelect} order by p.updated_at desc`)) as Prospect[];
  const like = `%${words.replace(/[\\%_]/g, "\\$&")}%`;
  const digits = words.replace(/\D/g, "");
  return (await sql().query(
    `${prospectSelect}
     where p.company ilike $1 or p.contact_name ilike $1 or p.email ilike $1 or p.phone ilike $1
       or p.whatsapp ilike $1 or ('@' || p.instagram) ilike $1 or p.source ilike $1
       or ($2 <> '' and (regexp_replace(p.phone, '\\D', '', 'g') like $2
         or regexp_replace(p.whatsapp, '\\D', '', 'g') like $2))
     order by p.updated_at desc`,
    [like, digits.length >= 6 ? `%${digits}%` : ""],
  )) as Prospect[];
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
// answers 422 with it instead of a second row, and /start writes the answers under its slug
// (why: one company has one row · prospect.md).
export async function openProspectByEmail(
  email: string,
): Promise<{ id: string; slug: string | null; company: string } | null> {
  const rows = (await sql()`
    select id, slug, company from prospects where email = ${email} and status not in ('lost', 'handed off')
    order by created_at limit 1
  `) as { id: string; slug: string | null; company: string }[];
  return rows[0] ?? null;
}

// The contact points of these that are on the no-contact list. addProspect, saveProspect and the
// pool API refuse a row for any of them (legitimate-interest.md §4).
export async function suppressed(points: ContactPoint[]): Promise<ContactPoint[]> {
  if (!points.length) return [];
  return (await sql().query(
    `select kind, value from suppressions join unnest($1::text[], $2::text[]) as c (kind, value) using (kind, value)`,
    [points.map((c) => c.kind), points.map((c) => c.value)],
  )) as ContactPoint[];
}

// "They asked not to be contacted", in one transaction: the row is lost with that reason and no
// next action, and each of its contact points goes on the no-contact list. Nothing here or
// elsewhere deletes a suppression (why: a no is for good · legitimate-interest.md §4).
export async function suppressProspect(id: string, points: ContactPoint[]): Promise<void> {
  const db = sql();
  await db.transaction([
    db`update prospects set status = 'lost', lost_reason = ${NO_CONTACT}, next_action = null, updated_at = now()
      where id = ${id}`,
    ...points.map(
      (c) => db`insert into suppressions (kind, value, reason) values (${c.kind}, ${c.value}, ${NO_CONTACT})
        on conflict (kind, value) do nothing`,
    ),
  ]);
}

// /start's rate limit: one upsert per submission counts it against the hashed IP and the
// hour, and returns the count so far. The same statement drops the hours older than a day, so
// the table never holds more than a day of hashes (why: a hashed IP is still about a person,
// and an hour past is of no use to the limit · 2026-10-26).
export async function countSubmission(ipHash: string): Promise<number> {
  const rows = (await sql()`
    with old as (delete from throttle where hour < now() - interval '1 day')
    insert into throttle (ip_hash, hour, n) values (${ipHash}, date_trunc('hour', now()), 1)
    on conflict (ip_hash, hour) do update set n = throttle.n + 1
    returning n
  `) as { n: number }[];
  return rows[0]!.n;
}

export async function insertProspect(salesman: string, slug: string, f: ProspectFields): Promise<string> {
  const rows = (await sql()`
    insert into prospects (slug, company, contact_name, role, email, phone, whatsapp, instagram,
      website, country, language, line, size, service, deal_size, source, salesman, ask, notes)
    values (${slug}, ${f.company}, ${f.contact_name}, ${f.role}, ${f.email}, ${f.phone},
      ${f.whatsapp}, ${f.instagram}, ${f.website}, ${f.country}, ${f.language}, ${f.line},
      ${f.size}, ${f.service}, ${f.deal_size}, ${f.source}, ${salesman}, ${f.ask}, ${f.notes})
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
      email = ${f.email}, phone = ${f.phone}, whatsapp = ${f.whatsapp}, instagram = ${f.instagram},
      website = ${f.website}, country = ${f.country}, language = ${f.language}, line = ${f.line},
      size = ${f.size}, service = ${f.service}, deal_size = ${f.deal_size}, source = ${f.source},
      ask = ${f.ask}, notes = ${f.notes},
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

// The row's meeting, written as Jamie's time (lib/pool.ts TIME_ZONE); null clears it.
export async function setMeeting(id: string, m: Meeting | null): Promise<void> {
  if (!m) {
    await sql()`
      update prospects set meeting_at = null, meeting_with = '', meeting_where = '', updated_at = now()
      where id = ${id}
    `;
    return;
  }
  await sql()`
    update prospects set meeting_at = (${m.date}::date + ${m.time}::time) at time zone ${TIME_ZONE},
      meeting_with = ${m.with}, meeting_where = ${m.where}, updated_at = now()
    where id = ${id}
  `;
}

// A meeting a salesman, or Jamie, booked for Jamie (the section on /).
export interface BookedMeeting {
  id: string;
  company: string;
  sourced_by: string;
  meeting_at: string; // ISO in UTC
  meeting_where: string;
}

// The open rows' meetings with Jamie from today on, in his time zone, soonest first. A lost or
// handed-off row is not listed: after the handoff the record's next_action carries the meeting.
export async function meetingsForJamie(): Promise<BookedMeeting[]> {
  return (await sql().query(
    `with m as (${prospectSelect} where p.status not in ('lost', 'handed off'))
     select id, company, sourced_by, meeting_at, meeting_where from m
     where meeting_with = 'jamie' and meeting_at is not null
       and (meeting_at::timestamptz at time zone $1)::date >= (now() at time zone $1)::date
     order by meeting_at`,
    [TIME_ZONE],
  )) as BookedMeeting[];
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

// The handoff starts: the row remembers where it was, and keeps it when a handoff that wrote
// nothing is tried again.
export async function setReady(id: string, slug: string): Promise<void> {
  await sql()`
    update prospects set
      previous_status = case when status = 'ready for Jamie' then previous_status else status end,
      status = 'ready for Jamie', slug = ${slug}, updated_at = now()
    where id = ${id}
  `;
}

// The handoff's commit is on main: the row is read-only from here and names its record.
export async function setHandedOff(id: string, record: string): Promise<void> {
  await sql()`
    update prospects set status = 'handed off', record = ${record}, updated_at = now()
    where id = ${id}
  `;
}

// The links sent to one slug, newest first (the Send a form card, app/_send.tsx).
export async function linksOf(slug: string): Promise<SentLink[]> {
  return (await sql()`
    select id, form, snapshot ->> 'title' as title, language, name, email, sent_at::date::text as sent,
      answered_at::date::text as answered
    from links where slug = ${slug} order by sent_at desc
  `) as SentLink[];
}

export async function insertLink(
  slug: string,
  snapshot: FormSnapshot,
  to: { name: string; email: string },
  signup: boolean,
  sentBy: string,
): Promise<string> {
  const rows = (await sql()`
    insert into links (slug, form, language, folder, name, email, snapshot, signup, sent_by)
    values (${slug}, ${snapshot.slug}, ${snapshot.language}, ${snapshot.folder}, ${to.name},
      ${to.email}, ${JSON.stringify(snapshot)}::jsonb, ${signup}, ${sentBy})
    returning id
  `) as { id: string }[];
  return rows[0]!.id;
}

// One sent link by its token, for /f/<id>. Null when no row has that id.
export async function linkById(id: string): Promise<OpenLink | null> {
  const rows = (await sql()`
    select id, slug, form, language, folder, name, email, snapshot, signup, answered_at is not null as answered
    from links where id = ${id}
  `) as OpenLink[];
  return rows[0] ?? null;
}

// Marks a sent link answered. The guard is in the update itself, so a double submit lands once:
// false is a row answered already, or no row (answer-a-link of .icm/intake/desk-forms).
export async function markAnswered(id: string): Promise<boolean> {
  const rows = await sql()`
    update links set answered_at = now() where id = ${id} and answered_at is null returning id
  `;
  return rows.length === 1;
}
