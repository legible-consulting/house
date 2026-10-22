---
status: stub
holds:
  - mani.yaml
  - "estate/*.md"
  - "glance/*.md"
  - "review/*.md"
  - "close/*.md"
  - "app/**"
---
# Desk — C3

C3 produces the morning glance, the Friday review (every client's next action and deadline, plus what Jamie decides), the monthly close (invoiced, paid and owed per client; cost to run each engagement; commission due; pipeline and conversion) and the quarterly estate audit, on phone, dashboard, Google and terminal, through one dashboard with three roles (Jamie, salesman, client), so that Jamie never opens a repo to know what to do today, and a deadline inside seven days, a drifted repo or a failed release reaches him unprompted.

## Inputs

- `clients/*/record.md` frontmatter, `clients/*/quote/invoices/*.yaml`,
  `clients/*/quote/economics.yaml`, the client-facing documents in `clients/*/`,
  `core/wave.md` (the "Jamie decides" list), `desk/estate/`, `sell/01-prospecting/`, the
  pool in Neon, and the house and the client repos over the GitHub API.

## Process

- Not written yet. A session writes it from the first real walk.
- Start cold from this folder. Read only what Inputs names.
- A client with `kind: retainer` or `kind: role` stays at `build` (`clients/CONTEXT.md`). The
  glance and the Friday review do not flag it as stalled or overdue for handover. The monthly
  close reads `retainer` as retainer income (why: neither engagement ends · 2026-10-16).

## Outputs

The files:

- `glance/<date>.md`: the morning glance, written daily by `sweep-deadlines.yml` from the
  records and `core/wave.md`. The latest only. Git holds the past ones.
- `review/<ISO week>.md` (Fridays) and `close/<YYYY-MM>.md` (the 1st, for the month that
  ended): written by `rhythms.yml` through `app/scripts/read-house.mjs` and
  `app/scripts/rhythms.mjs` with the rules in `app/lib/rhythms.ts`, committed to `main`. The
  latest review only. 13 months of closes, because `/close?month=` reads them (why: one set
  of rules for the page and the file, so phone, Google and terminal read the same words as
  the desk · 2026-10-21).
- `estate/drift-<date>.md`: D4's report, the latest only.
- `mani.yaml`: hand-written. Every client build and the proof render, with their tags
  (`deliver/04-conformance/CONTEXT.md`).

The app, `app/` (the code map: `.claude/rules/desk-app.md`):

- Next.js on Vercel (`core/stack.md`), project `legible-desk`, `https://desk.jamienisbet.com`,
  deployed from `main` by the project's Git link (root directory `desk/app`), a preview per
  PR. `check.yml` builds it on every push.
- Data: the house is read once, at build, by `app/scripts/read-house.mjs` (what it reads is
  listed at its top). The pool, the house workflows and the client repos are read per
  request. A page never reads the repo (why: a deployed function has no checkout; a push is
  the one way a fact reaches the desk · 2026-10-21).
- Sign-in by Neon Auth. Tables `users`, `prospects` and `touches` in Neon Postgres, from
  `app/db/schema.sql`. Three roles from `users.role`: `jamie`, `salesman`, `client`. A new
  account starts as `client` with no folder and sees nothing until Jamie sets the role in the
  Neon console (the upserts are at the foot of `schema.sql`).
- Variables, names only, on the Vercel project (`app/.env.example`): `DATABASE_URL`,
  `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `DESK_PAT` (the house only: Contents, Pull
  requests and Actions, read and write), `ESTATE_PAT` and `ESTATE_PAT_<OWNER>` (one
  fine-grained token per repo owner: Contents, Actions, Metadata, Commit statuses and Pull
  requests read, Pull requests write for the gates). A token unset, or a repo out of reach,
  fails only its own cell, in words (why: a fine-grained token cannot span owners, and a
  missing token must not stop the desk · 2026-10-21).
- Jamie's pages: `/` (the glance, the refresh, the pool's counts, the clients table with each
  repo's latest release and `check.yml` run), `/work` (every repo's open tickets in
  `.icm/intake/` and pull requests with their gates, CI and preview, what waits on Jamie
  first), `/review`, `/close?month=`, `/estate`, `/clients/<slug>`, `/pool`, `/sell`.
  `/review` and `/close` render the committed file when one exists and compute the same rules
  live otherwise, or with `?live=1`.
- The refresh (Jamie only): three buttons that start `sweep-deadlines.yml` or `rhythms.yml`
  on `main` by `workflow_dispatch` with `DESK_PAT`. A run that changes a file commits to
  `main`, and Vercel redeploys.
- Gates: a tick from the desk writes the box in the pull request's body with the owner's
  token, for the `jamie` role only. The house never ticks one (why: a gate ticked from the
  phone is still Jamie's own tick · 2026-10-21).
- A salesman's pages: `/pool` and `/sell`. On a handed-off row, the deal's stage up to
  `agreement` and nothing after it (S1).
- A client's page: `/clients/<slug>` for the folder `users.client` names: where it stands,
  the repo's latest release and `check.yml` result (no link, no reason when the read fails),
  the invoices, the documents the client reads (`proposal/proposal.md`, `quote/quote.md`,
  `agreement/*.md`, `handover/*.md`), and the work in words: in progress with the preview
  link, shipped in the last 14 days, queued. Research, negotiation, economics, gates, CI and
  triage never reach it.
- Freshness: the footer names the build's commit and its distance from `main`. Each run and
  pull request shows its state with a link. A page re-reads itself every 15 seconds while
  anything it shows is in flight.
- Alerts: GitHub's failed-run mail, and the desk itself. A missing or old glance means a run
  did not happen, and the refresh starts it by hand.
