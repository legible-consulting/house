---
status: built
holds:
  - why.md
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
  `01-prospecting/`, the business email in `core/identity.md`, the pool in Neon, and the house
  and the client repos over the GitHub API.

## Process

A session walks the desk in this order. The Outputs below name every file, route and
variable. The Process says what a session does with them.

- Start cold from this folder. Read only what Inputs names.
- The facts. A page reads the house from `lib/house.json`, which `app/scripts/read-house.mjs`
  writes at build. The pool, the client repos, the house's tickets and the house's runs are
  read per request. A fact changed in the house reaches the desk only by a push to `main`. To
  change what a page shows, change the house file and push.
- The roles. `jamie` sees every page. `salesman` sees `/pool`, `/sell` and `/preferences`, and
  a handed-off deal up to `agreement`. `client` sees `/clients/<slug>` for the folder
  `users.client` names, and nothing else. Jamie sets a role in the Neon console (Outputs,
  Sign-in).
- A client user. Jamie sends a form from `/clients/<slug>`. The person's answer saves them as a
  user: `role: client`, `client: <slug>`, `active: false`. A user who is not active is a client
  with no folder and sees nothing. The Users card on the client page shows Jamie each user of
  the folder and the state. Jamie clicks "Activate": the desk sets `active: true` and asks Neon
  Auth to mail the person a sign-in link. From then on the person signs in by link only
  (Outputs, How a client gets in).
- The glance and the close. `app/lib/rhythms.ts` computes both on every request, from the house
  as of the last push to `main`. `rhythms.yml` writes the same words to `glance/<date>.md`
  every morning and to `close/<YYYY-MM>.md` on the 1st, and commits the file to `main`. To
  change a rule, change `rhythms.ts`. The page and the file change together.
- A client with `kind: retainer` or `kind: role` stays at `build` (`clients/CONTEXT.md`). The
  glance does not flag it as stalled or overdue for handover. The monthly close reads its
  `price.monthly`.
- A ticket. Each project's board, `/work/<client>`, holds its tickets: the house's own
  (`.icm/intake/`, read with `DESK_PAT`) and each client repo's (read with the owner's token).
  A card opens the ticket's page, with the stub and its Prompt, the stub's own `## Prompt`
  section. Jamie copies the Prompt into a session on the repo that holds the ticket. The
  session works on a branch, moves the stub to `_done/` and opens a pull request. The pull
  request then shows on its ticket's card with its gates, its CI and its preview, on the board
  and on `/work`.
- A gate. Jamie ticks a gate from `/work` or from the Work card on a client's page.
  `app/lib/gates.ts` writes the box in the pull request's body with the owner's token. When the
  token cannot write, the page names the variable. Jamie then ticks on GitHub.
- A shared link. On the phone, Jamie shares a link to the installed desk, and `/share` writes
  it. At the computer, Jamie pastes it in the form on `/research`. Both write
  `research/queue/<date>-<host>-<hash>.md` to `main` with `DESK_PAT` (Outputs, the row
  `share`). The desk judges nothing. The daily intake writes the verdict
  (`research/CONTEXT.md`). A LinkedIn link with no text opens the form on `/research` and asks
  for the post's text, because no route reads a LinkedIn post. A queue file with a `Pointer
  unresolved:` line shows under "Needs a name" on `/research`: Jamie types the name, and the
  desk writes the file again with the name in `text` and without the line, or he drops the file
  (Outputs, the row `queue-name`).
- A lead. The portfolio's contact form posts to `/api/pool` with `POOL_TOKEN`. The free look
  posts through `/start`. Both put a row in the pool at `new`, or no row when one with that
  email is open. A salesman or Jamie moves the row through the pool's statuses
  (`clients/CONTEXT.md`). The move to `meeting` asks for the meeting: `meeting_at`,
  `meeting_with` (`sourcer` or `jamie`) and `meeting_where`, in Jamie's time zone
  (`01-prospecting/prospect.md`, Fields). A meeting with Jamie shows on his `/` until its day
  has passed, and the handoff carries it into the record. At `ready for Jamie` the desk commits
  to `main`, as one commit, the new `clients/<slug>/record.md` and the move of the lead's
  answers into the folder, and the row goes to `handed off` with `record` set, in one request
  (`01-prospecting/CONTEXT.md`, The handoff; Outputs, the row `handoff`). The commit is the
  handoff. The handed-off row links its record to `/clients/<slug>` for Jamie.
- The sync pill. It says up to date, running, deploying, out of sync or unknown. Read it before
  you trust a page: only up to date means the page shows `main`'s head. Out of sync is fixed
  from the laptop. Its panel starts `rhythms.yml` for the glance or the close.
- A change to the app. The session pushes to a branch and opens a pull request. `check.yml`
  builds the app on every pull request. Vercel deploys a preview per pull request. Read the
  result from CI and the preview, never from a local run (`CLAUDE.md`, House rules).
- A session never merges and never ticks a gate. It moves a stage only as `clients/CONTEXT.md`
  says. It sends nothing to a client. The desk's one mail goes to Jamie (`CLAUDE.md`,
  Boundaries).

## Outputs

The desk's writes to main: every commit the desk makes to the house, one row per action.
`commitToHouse` in `app/lib/writes.ts` makes each commit of the app. It refuses, in words, a
path, a branch or an operation that the row does not name, and writes nothing. The typed list
`WRITES` in the same file holds the same rows, and `app/scripts/read-house.mjs` fails the build
when the two differ. A new write is a new row here and a new entry there, in one pull request.
A `*` matches one path segment, or part of one.

| Action | Role | Globs | Branch | Identity | Why |
|---|---|---|---|---|---|
| `free-look` | visitor, no session | `01-prospecting/leads/*/free-look-*.md` | `main` | `DESK_PAT` | the free look's answers, create only: nothing is thanked that is not in the house · 2026-10-26 |
| `link-answers` | visitor, no session | `clients/*/*/*.md`, `01-prospecting/leads/*/*.md` | `main` | `DESK_PAT` | a sent link's answers, create only, in the folder when the record is on `main`, else with the lead · 2026-10-25 |
| `share` | jamie | `research/queue/*.md` | `main` | `DESK_PAT` | a shared link, create only: a link that waits in a chat is a link lost · 2026-10-25 |
| `queue-name` | jamie | `research/queue/*.md` | `main` | `DESK_PAT` | a share that no route read, named (a new file with the name, then the old file deleted) or dropped (deleted): a share waits for one word from the phone, not a verdict with no item · 2026-10-29 |
| `handoff` | salesman, jamie | `clients/*/record.md`, `clients/*/*/*.md`, `01-prospecting/leads/*/*.md` | `main` | `DESK_PAT` | the record and the lead's answers, created in the folder and deleted from the lead, as one commit with no pull request, `prospecting: <slug> handed off by <handle>`: the account that owns `DESK_PAT` moves `main`, and the message names the salesman. The commit is the handoff: a constrained and structured salesman action goes straight to `main` · Jamie, 2026-10-29 |
| `rhythms` | none: the morning and monthly runs | `desk/glance/*.md`, `desk/close/*.md` | `main` | `GITHUB_TOKEN (rhythms.yml)` | the glance and the close, written by the workflow, never by the app: one set of rules for every reader · 2026-10-22 |

The files:

- `glance/<date>.md` (daily) and `close/<YYYY-MM>.md` (the 1st, for the month that ended):
  written by `rhythms.yml` through `app/scripts/read-house.mjs` and `app/scripts/rhythms.mjs`
  with the rules in `app/lib/rhythms.ts`, committed to `main`. The desk computes the same words
  live on every request, from the house as of the last push to `main`; the file is the day's
  record for the phone, Google and the terminal. The latest glance only. 13 months of closes,
  because `/close?month=` reads them.
- `estate/drift-<date>.md`: conformance's report, the latest only. The desk reads each repo's
  line, its Drift and its Platform cell, into its client's row at build.
- `mani.yaml`: hand-written. Every client build, with its tags (`conformance/CONTEXT.md`).
- `.github/schemas/glance.schema.json` and `close.schema.json` check `title`, `kind` and `date`
  (and `close`'s `month`) (`check.yml`'s `frontmatter` job).

The app, `app/`: Next.js on Vercel, project `legible-desk`, `https://desk.jamienisbet.com`,
deployed from `main`, a preview per pull request. Its routes, roles, tables, variables and
console steps are in `app/README.md`. Read it when you change the app, not when you walk the
desk. The code map is `.claude/rules/desk-app.md`.
