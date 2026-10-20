-- Desk (C3) schema. Apply once on the Neon project legible-desk, default branch, database
-- neondb: Neon console, SQL editor, paste and run. Idempotent. Neon Auth owns neon_auth.*;
-- the app owns these two tables. The prospect fields are the minimal set until the S1
-- prospect schema (sell/01-prospecting/prospect.md) lands; then this file follows it.

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null default '',
  role text not null default 'client' check (role in ('jamie', 'salesman', 'client')),
  created_at timestamptz not null default now()
);

create table if not exists prospects (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  contact_name text not null default '',
  email text not null default '',
  language text not null default '',
  source text not null default '',
  salesman uuid not null references users (id),
  status text not null default 'new' check (
    status in ('new', 'contacted', 'replied', 'meeting', 'ready for Jamie', 'handed off', 'lost')
  ),
  next_action text not null default '',
  notes text not null default '',
  pr_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists prospects_salesman_idx on prospects (salesman);

-- Roles. A user row appears at first sign-in with role client. Jamie promotes by email:
--   update users set role = 'jamie' where email = 'jamie@example.com';
--   update users set role = 'salesman' where email = 'salesman@example.com';
