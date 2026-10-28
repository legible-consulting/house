-- Desk (the desk) schema. Neon project legible-desk, default branch, database neondb. Idempotent:
-- run the whole file again after a change (Neon console, SQL editor). Neon Auth owns
-- neon_auth.*; the app owns these six tables. The prospect row follows
-- 01-prospecting/prospect.md (prospecting). Four names differ from that schema, because the
-- first two tables were applied on 2026-10-19 and are reused, not recreated: contact_name
-- is `contact`, created_at is `added`, updated_at is `updated`, and `sourced_by` is the
-- salesman's users.handle (or `jamie`).

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null default '',
  role text not null default 'client' check (role in ('jamie', 'salesman', 'client')),
  handle text unique,
  client text,
  active boolean not null default true,
  language text not null default '' check (language in ('', 'pt-PT', 'fr-BE', 'en-GB')),
  created_at timestamptz not null default now()
);

create table if not exists prospects (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  company text not null,
  contact_name text not null default '',
  role text not null default '',
  email text not null default '',
  phone text not null default '',
  website text not null default '',
  whatsapp text not null default '',
  instagram text not null default '',
  country text not null default '',
  language text not null default '',
  line text not null default '',
  size text not null default '',
  service text not null default '',
  deal_size text not null default '',
  source text not null default '',
  salesman uuid not null references users (id),
  ask text not null default '',
  status text not null default 'new' check (
    status in ('new', 'contacted', 'replied', 'meeting', 'ready for Jamie', 'handed off', 'lost')
  ),
  previous_status text,
  next_action date,
  notes text not null default '',
  lost_reason text not null default '',
  pr_url text,
  record text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists prospects_salesman_idx on prospects (salesman);

create table if not exists touches (
  id uuid primary key default gen_random_uuid(),
  prospect uuid not null references prospects (id) on delete cascade,
  touched_on date not null,
  channel text not null check (channel in ('email', 'phone', 'whatsapp', 'in person')),
  note text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists touches_prospect_idx on touches (prospect);

-- /start's rate limit (decision 5 of .icm/intake/desk-forms): one row per hashed IP and hour,
-- with the count of the free looks sent from it. A sixth in one hour is thanked and dropped.
-- lib/db.ts countSubmission upserts it and drops the hours older than a day.
create table if not exists throttle (
  ip_hash text not null,
  hour timestamptz not null,
  n int not null default 0,
  primary key (ip_hash, hour)
);

-- The links Jamie sends (decision 6 of .icm/intake/desk-forms): one row per questionnaire sent
-- to one lead or client from the Send a form card (app/_send.tsx). The id is the token, and the
-- link is https://desk.jamienisbet.com/f/<id>: gen_random_uuid() gives 122 random bits. The row
-- lives here and not in git, so the credential never enters the house. `snapshot` is the form
-- as lib/forms.ts parses it at the moment of sending, so the page that answers it reads the
-- same questions whatever the house says later. `signup` is true when sent from a client page
-- (decision 11). Jamie withdraws a link by deleting its row here.
create table if not exists links (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  form text not null,
  language text not null check (language in ('en-GB', 'fr-BE', 'pt-PT')),
  folder text not null,
  name text not null default '',
  email text not null default '',
  snapshot jsonb not null,
  signup boolean not null default false,
  sent_at timestamptz not null default now(),
  answered_at timestamptz,
  sent_by uuid not null references users (id)
);

create index if not exists links_slug_idx on links (slug);

-- The no-contact list (01-prospecting/legitimate-interest.md §4): one row per email or phone of a
-- prospect who asked not to be contacted, written by the gesture on the row's page (lib/db.ts
-- suppressProspect). `value` is a lower-cased address or a number with its country code, as
-- lib/pool.ts contactPoints keys it. One phone number covers the phone and WhatsApp. The desk
-- and the pool API refuse a row for a value here. There is no foreign key to the row, so a
-- cleared or erased row keeps its no, and no code path deletes a row here (why: Art 21(2) GDPR
-- makes the objection absolute, and a no that did not stick is the whole objection · 2026-10-26).
create table if not exists suppressions (
  kind text not null check (kind in ('email', 'phone')),
  value text not null,
  reason text not null default '',
  created_at timestamptz not null default now(),
  primary key (kind, value)
);

-- Migration of the 2026-10-19 tables to the prospecting fields (applied 2026-10-20, with no rows).
-- Each statement does nothing where the column already has this shape.
alter table users add column if not exists handle text unique;
alter table users add column if not exists client text;
-- A client saved by the answer to a sent link starts inactive (client-signs-up of
-- .icm/intake/desk-forms). The default is true so that the rows of Jamie and the salesmen keep
-- working after this statement.
alter table users add column if not exists active boolean not null default true;
-- The language a user reads the desk in (language-preference of .icm/intake/salesman-desk). Empty
-- means no preference: the desk then reads the browser's language, else en-GB (lib/language.ts).
-- Applied 2026-10-28.
alter table users
  add column if not exists language text not null default ''
    check (language in ('', 'pt-PT', 'fr-BE', 'en-GB'));
alter table prospects
  add column if not exists slug text unique,
  add column if not exists role text not null default '',
  add column if not exists phone text not null default '',
  add column if not exists website text not null default '',
  add column if not exists country text not null default '',
  add column if not exists line text not null default '',
  add column if not exists size text not null default '',
  add column if not exists service text not null default '',
  add column if not exists deal_size text not null default '',
  add column if not exists ask text not null default '',
  add column if not exists previous_status text,
  add column if not exists lost_reason text not null default '',
  add column if not exists record text;
-- The WhatsApp number and the Instagram handle of a row, loaded from the jamie-nisbet biz
-- backup of 2026-10-25 (applied 2026-10-27, with the 105 rows of that load). The pool pages do
-- not show them yet (why: the old pool held both for most leads, and a dropped channel is a lead
-- nobody can reach · Jamie, 2026-10-27).
alter table prospects
  add column if not exists whatsapp text not null default '',
  add column if not exists instagram text not null default '';
-- The meeting of a row (meeting-on-the-row of .icm/intake/salesman-desk): when, with whom and
-- where, required at `meeting` (01-prospecting/prospect.md, Fields). `meeting_at` keeps its zone;
-- the desk reads and writes it as Jamie's time, Europe/Lisbon. Until this runs, the desk reads a
-- row as having no meeting (lib/db.ts).
alter table prospects
  add column if not exists meeting_at timestamptz,
  add column if not exists meeting_with text not null default ''
    check (meeting_with in ('', 'sourcer', 'jamie')),
  add column if not exists meeting_where text not null default '';
do $$
begin
  if (select data_type from information_schema.columns
      where table_schema = 'public' and table_name = 'prospects' and column_name = 'next_action') = 'text' then
    alter table prospects alter column next_action drop default;
    alter table prospects alter column next_action drop not null;
    alter table prospects alter column next_action type date using nullif(next_action, '')::date;
  end if;
end $$;

-- Roles, handles and the client link. A user row appears at first sign-in with role client,
-- no handle and no client, and the desk then shows that user nothing. Jamie sets the role by
-- email, before or after the first sign-in (the upsert covers both). A salesman's handle is
-- their `sourced_by` in the pool and the `salesman:` in clients/<slug>/record.md. A client's
-- `client` is the slug of the folder they read (why: the folder is the record, and a client
-- reads only their own · 2026-10-21):
--   insert into users (email, role) values ('jamie@example.com', 'jamie')
--     on conflict (email) do update set role = 'jamie';
--   insert into users (email, role, handle) values ('salesman@example.com', 'salesman', 'ana')
--     on conflict (email) do update set role = 'salesman', handle = 'ana';
--   insert into users (email, role, client) values ('client@example.com', 'client', 'motoark')
--     on conflict (email) do update set role = 'client', client = 'motoark';
-- The desk also saves a client user. The answer to a link sent from /clients/<slug> (`signup`
-- true) upserts the row with role client, client <slug> and active false (lib/db.ts saveClientUser,
-- called by app/f/[token]/actions.ts). It never changes a row at role jamie or salesman, and it
-- never sets an active row back to inactive. A user with active false is a client with no
-- folder, who sees nothing (lib/user.ts currentUser). Jamie activates the user later
-- (magic-link-sign-in) (why: Jamie decides who gets in and when · 2026-10-25).
-- The language. The user sets their own on /preferences (lib/db.ts setLanguage), from one of
-- pt-PT, fr-BE and en-GB. Jamie may set it by hand, by email, before or after the first sign-in
-- (why: a salesman reads in one language on every device · 2026-10-28):
--   insert into users (email, language) values ('salesman@example.com', 'pt-PT')
--     on conflict (email) do update set language = 'pt-PT';
