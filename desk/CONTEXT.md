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

C3 produces the morning glance, the Friday review (every client's next action and deadline plus one flat open-items list), the monthly close (invoiced, paid and owed per client; cost to run each engagement; commission due; pipeline and conversion) and the quarterly estate audit, on phone, dashboard, Google and terminal, through one dashboard with three roles (Jamie, salesman, client), so that Jamie never opens a repo to know what to do today, and a deadline inside seven days, a drifted repo or a failed release reaches him unprompted.

## Inputs

- `clients/*/record.md` frontmatter, `clients/*/quote/invoices/*.yaml`, `core/open-items.md`, `desk/estate/`, the client repos' status over the GitHub API.

## Process

- Defined when the module is built (Wave 1 for C1, C2, D2, D4; later waves for the rest).
- Start cold from this folder. Read only what Inputs names.
- A client with `kind: retainer` or `kind: role` stays at `build` (`clients/CONTEXT.md`). The glance and the Friday review do not flag it as stalled or overdue for handover. The monthly close reads `retainer` as retainer income (why: neither engagement ends · 2026-10-16).

## Outputs

- `glance/<date>.md` (daily, from `sweep-deadlines.yml`) · `review/<week>.md` · `close/<month>.md` · `estate/<audit>.md` · `mani.yaml` (generated).
- `app/`: the Next.js dashboard (the stack and its why: `core/stack.md`), every page
  rendered per request on Vercel, deployed to production by the Vercel project's Git link on
  every push to `main` (root directory `desk/app`; previews on every PR behind Vercel's own
  protection; why: one deploy path, and the link's PR preview is the UAT environment D2
  names · 2026-10-20); `check.yml` builds it on every push. Sign-in by Neon Auth; the pool
  and the roles in Neon Postgres, project `legible-desk` (org Kodominio, Frankfurt, created
  from the Vercel project's Storage tab); tables `users`, `prospects` and `touches` from
  `app/db/schema.sql`, the prospect row by `sell/01-prospecting/prospect.md`. Three roles
  from `users.role`: `jamie`, `salesman`, `client`; a new account starts as `client` with
  no folder and sees nothing until Jamie sets the role in the console (the upserts are in
  `app/db/schema.sql`). Variables, names only, set on the Vercel project: `DATABASE_URL`,
  `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `DESK_PAT` (`app/.env.example`). Kept
  out of module context by a path-scoped rule in `.claude/rules/`.
  - The house is read once, at build (`app/scripts/read-house.mjs`): the records, the
    invoices, each client's economics and client-facing documents, `core/open-items.md`,
    the latest glance and the latest drift report. The pool is read per request. So the app
    shows the house as of the last push to `main`, and a page never reads the repo (why: a
    deployed function has no checkout; a push is the one way a fact reaches the desk ·
    2026-10-21).
  - Jamie's pages: the desk (the glance, the pool's counts, the clients table), the Friday
    review (`/review`: every client's next action and deadline, the open items), the monthly
    close (`/close?month=YYYY-MM`: invoiced, paid, owed and overdue per client from
    `quote/invoices/`; cost and margin per month from `quote/economics.yaml`; commission due
    by S1's rule; the pool and the folders as the pipeline), the estate (`/estate`: the
    latest drift report) and every client's page (`/clients/<slug>`).
  - A salesman's pages: the pool and Sell, and on a handed-off row the deal's stage up to
    `agreement` and nothing after it (S1).
  - A client's page: `/clients/<slug>` for the one folder `users.client` names: where it
    stands, the invoices, and the documents the client reads (`proposal/proposal.md`,
    `quote/quote.md`, `agreement/*.md`, `handover/*.md`). Research, negotiation and
    economics never reach it.
- Alerts: GitHub's failed-run email; Healthchecks as the dead-man's switch, pinged by
  `sweep-deadlines.yml` at the end of every run through the secret `HEALTHCHECKS_URL` (a
  day without a ping reaches Jamie by Healthchecks' mail; the secret unset, the step passes
  and says so).
