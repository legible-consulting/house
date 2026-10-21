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

- `glance/<date>.md` (daily, from `sweep-deadlines.yml`, kept 14 days) · `estate/<audit>.md`
  · `mani.yaml` (generated).
- `review/<ISO week>.md` (Fridays) and `close/<YYYY-MM>.md` (the 1st, for the month that
  ended), from `rhythms.yml`: it runs `app/scripts/read-house.mjs`, then
  `app/scripts/rhythms.mjs`, which writes the file with the app's own rules
  (`app/lib/rhythms.ts`), and commits it to `main`. The review carries every client's next
  action and deadline and the open items. The close carries the money and the folders by
  stage. The pool's counts are not in the house, so the file says the app reads them live.
  The script keeps 8 weeks of reviews and 13 months of closes. `check.yml` runs the script
  on every push without a commit (why: one set of rules for the page and the file, so phone,
  Google and terminal read the same words as the desk · 2026-10-21).
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
  `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `DESK_PAT`, `ESTATE_PAT`,
  `ESTATE_PAT_SUSTENTUS` (`app/.env.example`). Kept out of module context by a path-scoped
  rule in `.claude/rules/`.
  - `ESTATE_PAT` and `ESTATE_PAT_<OWNER>` are fine-grained GitHub tokens on the client
    repos: repository permissions Contents, Actions, Metadata, Commit statuses and Pull
    requests read, and Pull requests write when Jamie ticks gates from the desk. Never
    Checks: a fine-grained token has no such permission, so CI is read from the Actions runs
    (why: one token type for the whole estate · 2026-10-21). With
    them the desk reads, per request, each record's `repo:`: the latest release (tag, date)
    and the latest completed `check.yml` run on the default branch (`app/lib/repos.ts`, kept
    five minutes per repo in the function's memory).
  - `/work` (Jamie only) reads, per request, each record's `repo:` on its default branch: the
    tickets in `.icm/intake/` (one tree read, then one blob read per open stub and breakdown,
    kept by sha) and the pull requests (the two gates from the body's anchors, CI from the
    head's Actions runs, the preview from the body's `- preview:` line or the Vercel commit
    status, the merges of the last 14 days), in `app/lib/work.ts`, kept 60 seconds per repo
    in the function's memory, a failed read 30 seconds. The data contract is the blueprint's
    `.icm/intake/CONTEXT.md` and its pull request template. The page opens with what waits on
    Jamie: a gate to tick on a pull request with green CI, or a merge. "Tick Spec approved"
    and "Tick Ready to merge" write the box in the pull request's body with the owner's
    token (`app/lib/gates.ts`), for the `jamie` role only. A token without Pull requests
    write fails that tick with a sentence that names the variable, and Jamie ticks on GitHub.
    The client's page shows Jamie the same card, and a client three lists in words: in
    progress with the preview link, shipped in the last 14 days, queued. A client never sees
    the gates, CI, triage or a failure reason (why: the desk is where Jamie reads what waits
    on him, and a gate ticked from the phone is still Jamie's own tick; the house never
    ticks one · 2026-10-21).
  - A fine-grained token reads one owner's repos, so each owner has its own token. A repo
    under an owner uses `ESTATE_PAT_<OWNER>` (the owner in capitals, other characters as
    `_`) when it is set, else `ESTATE_PAT`. Today: `ESTATE_PAT` on `k0d0minio`,
    `ESTATE_PAT_SUSTENTUS` on `sustentus`. A new client org needs one more variable and no
    code (why: a fine-grained token cannot span owners, and a classic token would give write
    to every private repo · 2026-10-21).
  - A token unset, or a repo out of reach, fails only that cell, which says so in words. The
    page renders (why: `DESK_PAT` reaches the house only and stays so, and a missing token
    must not stop the desk · 2026-10-21).
  - The house is read once, at build (`app/scripts/read-house.mjs`): the records, the
    invoices, each client's economics and client-facing documents, `core/open-items.md`,
    the latest glance, the latest review, every close file and the latest drift report. The
    pool and the client repos' status are read per request. So the app
    shows the house as of the last push to `main`, and a page never reads the repo (why: a
    deployed function has no checkout; a push is the one way a fact reaches the desk ·
    2026-10-21).
  - Jamie's pages: the desk (the glance, the pool's counts, the clients table with each
    repo's latest release and `check.yml` result), the Friday review (`/review`: every
    client's next action and deadline, the open items), the monthly close
    (`/close?month=YYYY-MM`: invoiced, paid, owed and overdue per client from
    `quote/invoices/`; cost and margin per month from `quote/economics.yaml`; commission due
    by S1's rule; the pool and the folders as the pipeline), the estate (`/estate`: the
    latest drift report) and every client's page (`/clients/<slug>`). `/review` and `/close`
    render the committed file for the current week or the month shown when one exists, and
    compute the same rules live otherwise or with `?live=1`.
  - A salesman's pages: the pool and Sell, and on a handed-off row the deal's stage up to
    `agreement` and nothing after it (S1).
  - A client's page: `/clients/<slug>` for the one folder `users.client` names: where it
    stands, the repo's latest release and `check.yml` result (those two facts only, no link
    and no reason when the read fails), the invoices, and the documents the client reads
    (`proposal/proposal.md`, `quote/quote.md`, `agreement/*.md`, `handover/*.md`).
    Research, negotiation and economics never reach it.
- Alerts: GitHub's failed-run email; Healthchecks as the dead-man's switch, pinged by
  `sweep-deadlines.yml` at the end of every run through the secret `HEALTHCHECKS_URL` (a
  day without a ping reaches Jamie by Healthchecks' mail; the secret unset, the step passes
  and says so). `rhythms.yml` logs each run on the same check through its `/log` endpoint,
  which is not a success ping (why: a weekly success ping would hide a missed sweep on that
  day · 2026-10-21).
