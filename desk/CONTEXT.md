# Desk — C3

C3 produces the morning glance, the Friday review (every client's next action and deadline plus one flat open-items list), the monthly close (invoiced, paid and owed per client; cost to run each engagement; commission due; pipeline and conversion) and the quarterly estate audit, on phone, dashboard, Google and terminal, through one dashboard with three roles (Jamie, salesman, client), so that Jamie never opens a repo to know what to do today, and a deadline inside seven days, a drifted repo or a failed release reaches him unprompted.

## Inputs

- `clients/*/record.md` frontmatter, `clients/*/quote/invoices/*.yaml`, `core/open-items.md`, `desk/estate/`, the client repos' status over the GitHub API.

## Process

- Defined when the module is built (Wave 1 for C1, C2, D2, D4; later waves for the rest).
- Start cold from this folder. Read only what Inputs names.

## Outputs

- `glance/<date>.md` (daily, from `sweep-deadlines.yml`) · `review/<week>.md` · `close/<month>.md` · `estate/<audit>.md` · `mani.yaml` (generated).
- `app/`: the Astro dashboard, built in Actions, deployed to Vercel; three roles. Kept out of module context by a path-scoped rule in `.claude/rules/`.
- Alerts: no phone channel; a failed sweep reaches Jamie by GitHub's failed-run email; Healthchecks as the dead-man's switch (why: phone alerts are not needed yet and ntfy's hosted tier is paid · Jamie, 2026-10-16).
