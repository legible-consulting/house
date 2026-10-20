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
  rendered per request on Vercel, built and deployed to production by `dashboard.yml` on
  every push to `main`; `check.yml` builds it on every push. Sign-in by Neon Auth; the pool
  and the roles in Neon Postgres, project `legible-desk` (org Kodominio, Frankfurt, created
  from the Vercel project's Storage tab); tables `users`, `prospects` and `touches` from
  `app/db/schema.sql`, the prospect row by `sell/01-prospecting/prospect.md`. Three roles
  from `users.role`: `jamie`, `salesman`, `client`. Variables, names only, set on the Vercel
  project: `DATABASE_URL`, `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `DESK_PAT`
  (`app/.env.example`). Kept out of module context by a path-scoped rule in
  `.claude/rules/`.
- Alerts: GitHub's failed-run email; Healthchecks as the dead-man's switch.
