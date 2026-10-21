-- Desk (C3) schema. Neon project legible-desk, default branch, database neondb. Idempotent:
-- run the whole file again after a change (Neon console, SQL editor). Neon Auth owns
-- neon_auth.*; the app owns these three tables. The prospect row follows
-- sell/01-prospecting/prospect.md (S1). Four names differ from that schema, because the
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

-- Migration of the 2026-10-19 tables to the S1 fields (applied 2026-10-20, with no rows).
-- Each statement does nothing where the column already has this shape.
alter table users add column if not exists handle text unique;
alter table users add column if not exists client text;
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
