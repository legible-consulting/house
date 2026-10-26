---
status: stub
holds:
  - mani.yaml
  - "estate/*.md"
  - "glance/*.md"
  - "close/*.md"
  - "app/**"
---
# Desk

The desk produces the morning glance (every client's next action and deadline, soonest first, plus the steps of its own build that wait on Jamie), the monthly close (every engaged client's agreed price against the quote's estimated hours and cost; commission owed; pipeline and conversion) and the quarterly estate audit, on phone, dashboard, Google and terminal, through one dashboard with three roles (Jamie, salesman, client), so that Jamie never opens a repo to know what to do today, and a deadline inside seven days, a drifted repo or a failed release reaches him unprompted.

## Inputs

- `clients/*/record.md` frontmatter, `clients/*/quote/economics.yaml`, the client-facing
  documents in `clients/*/`, `.icm/intake/README.md` (the Jamie's hand list), `desk/estate/`,
  `01-prospecting/`, the pool in Neon, and the house and the client repos over the
  GitHub API.

## Process

- Not written yet. A session writes it from the first real walk.
- Start cold from this folder. Read only what Inputs names.
- A client with `kind: retainer` or `kind: role` stays at `build` (`clients/CONTEXT.md`). The
  glance does not flag it as stalled or overdue for handover. The monthly close reads its
  `price.monthly` (why: neither engagement ends · 2026-10-16).

## Outputs

The files:

- `glance/<date>.md` (daily) and `close/<YYYY-MM>.md` (the 1st, for the month that ended):
  written by `rhythms.yml` through `app/scripts/read-house.mjs` and `app/scripts/rhythms.mjs`
  with the rules in `app/lib/rhythms.ts`, committed to `main`. The desk computes the same
  words live on every request, from the house as of the last push to `main`; the file is the
  day's record for the phone, Google and the terminal. The latest glance only. 13 months of
  closes, because `/close?month=` reads them (why: one set of rules for the page and the
  file, so every reader gets the same words, and a push to `main` reaches the desk without
  waiting for the morning run · 2026-10-22).
- `estate/drift-<date>.md`: conformance's report, the latest only. The desk reads each repo's line
  into its client's row at build (why: a drifted repo is a fact about the client, not a page
  of its own · 2026-10-22).
- `mani.yaml`: hand-written. Every client build, with its tags
  (`conformance/CONTEXT.md`).

The app, `app/` (the code map: `.claude/rules/desk-app.md`):

- Next.js on Vercel (`core/stack.md`), project `legible-desk`, `https://desk.jamienisbet.com`,
  deployed from `main` by the project's Git link (root directory `desk/app`), a preview per
  PR. `check.yml` builds it on every push.
- Data: the house is read once, at build, by `app/scripts/read-house.mjs` (what it reads is
  listed at its top). The pool, the house workflow and the client repos are read per
  request. A page never reads the repo (why: a deployed function has no checkout; a push is
  the one way a fact reaches the desk · 2026-10-21).
- Sign-in by Neon Auth. Tables `users`, `prospects` and `touches` in Neon Postgres, from
  `app/db/schema.sql`. Three roles from `users.role`: `jamie`, `salesman`, `client`. A new
  account starts as `client` with no folder and sees nothing until Jamie sets the role in the
  Neon console (the upserts are at the foot of `schema.sql`).
- Variables, names only, on the Vercel project (`app/.env.example`): `DATABASE_URL`,
  `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `DESK_PAT` (the house only: Contents, Pull
  requests and Actions, read and write), `ESTATE_PAT` and `ESTATE_PAT_<OWNER>` (one fine-grained token per
  repo owner: Contents, Actions, Metadata, Commit statuses and Pull requests read, Pull
  requests write for the gates), `POOL_TOKEN` (the bearer the portfolio's contact form sends
  to the pool API; the Vercel project `portfolio` holds the same value as
  `DESK_POOL_TOKEN`). A token unset, or a repo out of reach, fails only its own
  cell, in words (why: a fine-grained token cannot span owners, and a missing token must not
  stop the desk · 2026-10-21).
- The pool API, `app/api/pool/route.ts`, the one route without a session: `POST /api/pool`
  with `Authorization: Bearer <POOL_TOKEN>` and a JSON body (`name`, `email`, `message`,
  `language`, `company?`, `phone?`) inserts a `prospects` row at `new` with `source:
  portfolio`, `sourced_by: jamie` and the `jamie` user as its salesman, like a row Jamie adds
  by hand. 201 with the id. 401 on a missing or wrong token. 400 on a bad body. 422 with the
  open row's id when a prospect with that email is open (not `lost`, not `handed off`), and
  nothing is inserted. No mail: the portfolio sends its own (why: the site's contact form is
  the one door from the public into the pool, and a lead copied by hand from a mail is a
  lead lost; the token stands in for the session the form has none of · 2026-10-22).
- Jamie's pages: `/` (the glance, the pool's counts, the clients table with each repo's
  blueprint drift, latest release and `check.yml` run), `/work` (every client repo's open tickets, and the house's own from `.icm/intake/` read with `DESK_PAT`, in
  `.icm/intake/` as rows, each with the prompt that starts it in a session; the pull requests
  with their gates, CI and preview; what waits on Jamie first), `/close?month=`,
  `/clients/<slug>`, `/pool`, `/sell`, `/research` (every verdict and concept from `main`,
  under four filters, use, kind, verdict and tier, each file as prose on `/research/<slug>`;
  the links shared to the desk that the intake has not judged yet; and the form to paste one;
  `research/CONTEXT.md`). `/close`
  renders the committed file when one exists
  and computes the same rules live otherwise, or with `?live=1`.
- The sync pill (Jamie only), at the top of every page: up to date, running, deploying, out
  of sync, or unknown, with the reason in its panel. The panel starts `rhythms.yml` on `main`
  by `workflow_dispatch` with `DESK_PAT` (the glance or the close). A failed deploy is fixed
  from the laptop (why: one word says whether the desk shows `main` · 2026-10-22).
- Gates: a tick from the desk writes the box in the pull request's body with the owner's
  token, for the `jamie` role only. The house never ticks one (why: a gate ticked from the
  phone is still Jamie's own tick · 2026-10-21).
- A salesman's pages: `/pool` and `/sell` (the target profile, the cadence, the pitch drafts
  and the seller kit, `01-prospecting/kit.<language>.md`, in one language or all). On a
  handed-off row, the deal's stage up to `agreement` and nothing after it (`01-prospecting/`). On a row at `new` or `contacted`, the next touch's
  draft from `01-prospecting/pitch/` in the row's language, with the first name in, to
  copy or to open in the seller's own mail or WhatsApp (why: the seller sends from their own
  account, and the desk sends nothing · 2026-10-22).
- A client's page: `/clients/<slug>` for the folder `users.client` names: where it stands,
  the repo's latest release and `check.yml` result (no link, no reason when the read fails),
  the documents the client reads (`proposal/proposal.md`, `quote/quote.md`,
  `agreement/*.md`, `handover/*.md`), and the work in words: in progress with the preview
  link, shipped in the last 14 days, queued. Research, negotiation, economics, drift, gates,
  CI and triage never reach it.
- The phone: the desk installs from Chrome's menu (`app/desk.webmanifest/route.ts`; the icons are drawn
  by `app/_mark.tsx`, so no image file lives in git). Installed, it is a share target: a link
  shared to Desk opens `/share`, which writes `research/queue/<date>-<host>-<hash>.md`
  on `main` with `DESK_PAT` and shows `/research` with the result. Jamie only. The desk judges
  nothing: the file holds the link, the title, the text around it and the time (why: the share
  sheet is the one tap Jamie takes on the phone; a link that waits in a chat is a link lost ·
  2026-10-25).
- Freshness: the sync pill. Each run and pull request shows its state with a link. A page
  re-reads itself every 15 seconds while anything it shows is in flight.
- Alerts: GitHub's failed-run mail, and the pill.
