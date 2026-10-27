---
status: built
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
  `01-prospecting/`, the business email in `core/identity.md`, the pool in Neon, and the house
  and the client repos over the GitHub API.

## Process

A session walks the desk in this order. The Outputs below name every file, route and
variable. The Process says what a session does with them.

- Start cold from this folder. Read only what Inputs names.
- The facts. A page reads the house from `lib/house.json`, which `app/scripts/read-house.mjs`
  writes at build. The pool, the client repos, the house's tickets and the house's runs are
  read per request. A fact changed in the house reaches the desk only by a push to `main`. To
  change what a page shows, change the house file and push (why: a page never reads the repo,
  Outputs, Data · 2026-10-21).
- The roles. `jamie` sees every page. `salesman` sees `/pool` and `/sell`, and a handed-off
  deal up to `agreement`. `client` sees `/clients/<slug>` for the folder `users.client` names,
  and nothing else. Jamie sets a role in the Neon console (Outputs, Sign-in).
- A client user. Jamie sends a form from `/clients/<slug>`. The person's answer saves them as
  a user: `role: client`, `client: <slug>`, `active: false`. A user who is not active is a
  client with no folder and sees nothing. The Users card on the client page shows Jamie each
  user of the folder and the state. Jamie clicks "Activate": the desk sets `active: true` and
  asks Neon Auth to mail the person a sign-in link. From then on the person signs in by link
  only (Outputs, How a client gets in) (why: Jamie decides who gets in and when · 2026-10-25).
- The glance and the close. `app/lib/rhythms.ts` computes both on every request, from the
  house as of the last push to `main`. `rhythms.yml` writes the same words to
  `glance/<date>.md` every morning and to `close/<YYYY-MM>.md` on the 1st, and commits the
  file to `main`. To change a rule, change `rhythms.ts`. The page and the file change
  together (why: one set of rules for every reader · 2026-10-22).
- A client with `kind: retainer` or `kind: role` stays at `build` (`clients/CONTEXT.md`). The
  glance does not flag it as stalled or overdue for handover. The monthly close reads its
  `price.monthly` (why: neither engagement ends · 2026-10-16).
- A ticket. Each project's board, `/work/<client>`, holds its tickets: the house's own
  (`.icm/intake/`, read with `DESK_PAT`) and each client repo's (read with the owner's token).
  A card opens the ticket's page, with the stub and its Prompt, the stub's own `## Prompt`
  section. Jamie copies the Prompt into a session on the repo that holds the ticket. The
  session works on a branch, moves the stub to `_done/` and opens a pull request. The pull
  request then shows on its ticket's card with its gates, its CI and its preview, on the board
  and on `/work` (why: a session takes a ticket cold, `.icm/intake/CONTEXT.md` · 2026-10-25).
- A gate. Jamie ticks a gate from `/work` or from the Work card on a client's page.
  `app/lib/gates.ts` writes the box in the pull request's body with the owner's token. When
  the token cannot write, the page names the variable. Jamie then ticks on GitHub (why: a gate
  ticked from the phone is still Jamie's own tick · 2026-10-21).
- A shared link. On the phone, Jamie shares a link to the installed desk, and `/share` writes
  it. At the computer, Jamie pastes it in the form on `/research`. Both write
  `research/queue/<date>-<host>-<hash>.md` to `main` with `DESK_PAT`. The desk judges nothing.
  The daily intake writes the verdict (`research/CONTEXT.md`) (why: the share sheet is the one
  tap Jamie takes on the phone · 2026-10-25).
- A lead. The portfolio's contact form posts to `/api/pool` with `POOL_TOKEN`. The free look
  posts through `/start`. Both put a row in the pool at `new`, or no row when one with that
  email is open. A salesman or Jamie moves the row through the pool's statuses
  (`clients/CONTEXT.md`). At `ready for Jamie` the desk opens a pull request on the house that
  creates `clients/<slug>/record.md` and moves the lead's answers into the folder
  (`01-prospecting/CONTEXT.md`, The handoff). Jamie merges it (why: a lead copied by hand from a
  mail is a lead lost · 2026-10-22).
- The sync pill. It says up to date, running, deploying, out of sync or unknown. Read it
  before you trust a page: only up to date means the page shows `main`'s head. Out of sync is
  fixed from the laptop. Its panel starts `rhythms.yml` for the glance or the close (why:
  one word says whether the desk shows `main` · 2026-10-22).
- A change to the app. The session pushes to a branch and opens a pull request. `check.yml`
  builds the app on every pull request. Vercel deploys a preview per pull request. Read the result
  from CI and the preview, never from a local run (`CLAUDE.md`, House rules).
- A session never merges and never ticks a gate. It moves a stage only as `clients/CONTEXT.md`
  says. It sends nothing to a client. The desk's one mail goes to Jamie (`CLAUDE.md`, Boundaries).

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
  PR. `check.yml` builds it on every pull request and every push to `main`.
- Design: `app/DESIGN.md` holds the information rules (what a page shows first, the ticket
  card, the track, the fold); `app/app/globals.css` holds the visual rules and the tokens.
- Data: the house is read once, at build, by `app/scripts/read-house.mjs` (what it reads is
  listed at its top). The pool, the house workflow and the client repos are read per
  request. A page never reads the repo (why: a deployed function has no checkout; a push is
  the one way a fact reaches the desk · 2026-10-21).
- Sign-in by Neon Auth. Tables `users`, `prospects`, `touches`, `throttle`, `links` and `suppressions` in Neon Postgres, from
  `app/db/schema.sql`. Three roles from `users.role`: `jamie`, `salesman`, `client`. A new
  account starts as `client` with no folder and sees nothing until Jamie sets the role in the
  Neon console (the upserts are at the foot of `schema.sql`). `users.active` is false for a
  client that the answer to a sent link saved, and true for every other row. `currentUser()`
  (`app/lib/user.ts`) reads a user with `active` false as a client with no folder.
- How a client gets in. Jamie and the salesmen sign in with email and password. A client user
  of a folder (`role: client` with a `client`) signs in by magic link only: the password form
  reads the `users` row by email before it asks Neon Auth, and answers a client's email with
  the note to use the link. Neon Auth mails the link (`app/lib/auth.ts mailSignInLink`), as it
  mails the reset link: at Jamie's click on "Activate" or "Send again" in the Users card, or
  when the person asks on `/sign-in` with "Email me a sign-in link". The desk asks for a link
  only for an active client user of a folder, and `/sign-in` shows the same note whether or
  not it asked. The link lands on `/link` (`app/link/route.ts`): the middleware sets the
  session cookies, the route runs `ensureUser` and lands the client on `/clients/<slug>`. A
  spent or expired link lands on `/sign-in`, which names Neon Auth's code and asks for a new
  link. The desk's own mail still goes to Jamie only (why: Jamie decides who gets in, and a
  client keeps no password · 2026-10-25).
- Jamie's step for the links, in the Neon console, project `legible-desk`, Settings > Better
  Auth > Magic Link: Enable Magic Link on. Allow New User Registration on, because a client
  has no Neon Auth account before the first link; the desk asks for a link for nobody but an
  active client user. Link Expiration long enough for the first mail, which goes out at
  Jamie's click and is read later (1440 minutes is the maximum). The link lands on the origin
  that asked for it, so that origin is a trusted domain of Neon Auth, as for the reset mail.
- Variables, names only, on the Vercel project (`app/.env.example`): `DATABASE_URL`,
  `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `DESK_PAT` (the house only: Contents, Pull
  requests and Actions, read and write), `ESTATE_PAT` and `ESTATE_PAT_<OWNER>` (one fine-grained token per
  repo owner: Contents, Actions, Metadata, Commit statuses and Pull requests read, Pull
  requests write for the gates), `POOL_TOKEN` (the bearer the portfolio's contact form sends
  to the pool API; the Vercel project `portfolio` holds the same value as
  `DESK_POOL_TOKEN`), `RESEND_API_KEY` (the desk's own key in the Resend account that holds
  `mail.jamienisbet.com`), `THROTTLE_SALT` (the key of the IP hash in `/start`'s rate limit). A token unset, or a repo out of reach, fails only its own
  cell, in words (why: a fine-grained token cannot span owners, and a missing token must not
  stop the desk · 2026-10-21).
- The pool API, `app/api/pool/route.ts`, a route without a session: `POST /api/pool`
  with `Authorization: Bearer <POOL_TOKEN>` and a JSON body (`name`, `email`, `message`,
  `language`, `company?`, `phone?`) inserts a `prospects` row at `new` with `source:
  portfolio`, `sourced_by: jamie` and the `jamie` user as its salesman, like a row Jamie adds
  by hand. 201 with the id. 401 on a missing or wrong token. 400 on a bad body. 422 with the
  open row's id when a prospect with that email is open (not `lost`, not `handed off`), and
  nothing is inserted. 422 with `{ error: "suppressed" }` when the email or the phone is on
  the no-contact list, and nothing is inserted. No mail: the portfolio sends its own (why: the site's contact form is
  a door from the public into the pool, and a lead copied by hand from a mail is a
  lead lost; the token stands in for the session the form has none of · 2026-10-22).
- The no-contact list, the table `suppressions`: "They asked not to be contacted" on
  `/pool/<id>`, for the sourcer and Jamie, sets the row to `lost` with that reason, clears
  `next_action` and writes the row's email, phone and WhatsApp number to it (one number is the
  phone and WhatsApp). Adding a row, saving a row with a new email, phone or WhatsApp number,
  and the pool API refuse a value on the list, in words. No code path
  deletes an entry (why: a no is for good, `01-prospecting/legitimate-interest.md` §4 ·
  2026-10-26).
- The purge, `app/scripts/pool-purge.mjs`: Jamie runs it by hand from the laptop with
  `DATABASE_URL` in the environment, never on a timer. It clears the person's data from a pool
  row nobody worked for 12 months (`01-prospecting/prospect.md`, Statuses). It prints the rows
  and the fields it would clear, and it writes only with `--yes` (why: the retention of
  `legitimate-interest.md` §5, and a clearance Jamie reads before it happens · 2026-10-26).
- The free look, `/start?lang=en|fr|pt` (`app/start/`), the other page without a session,
  outside the shell and `noindex`. It renders `01-prospecting/forms/free-look.<language>.md`
  (no `lang`, or an unknown one, is `en`) with the page's own words in the same language. A
  valid submission inserts a pool row by the pool API's code (`lib/lead.ts`): at `new`,
  `source: free look`, Jamie as salesman, or no row when one with that email is open. It
  writes the answers to `01-prospecting/leads/<slug>/free-look-<date>.md` on `main` with
  `DESK_PAT` (`lib/answers.ts`), mails Jamie (`Free look: <name>`, reply-to the visitor) and
  shows the visitor a confirmation. The visitor gets no mail. A filled honeypot, or a sixth
  submission from one IP in one hour (table `throttle`: the IP hashed with `THROTTLE_SALT`,
  the hour, the count, kept one day), is thanked and stores nothing (why: the portfolio's
  links open it, and a bot must not fill the pool · 2026-10-25). A failed count, row or file
  is an error on the page, and the visitor can send again (why: nothing is thanked that is not
  in the house · 2026-10-26).
- Jamie's pages: `/` (one card per next client action, the glance's rows, grouped by urgency:
  overdue, this week, later, no deadline; each card with Copy prompt, the words that start a
  session on the house to do the action, with the record, the folder's files and the stage's
  contract, `lib/actions.ts`; tiles that count the urgent actions and the open leads; then
  one row per step of Jamie's hand (`.icm/intake/README.md`): the step's bold title, with
  Copy prompt on the row; the row opens on the step and its check; the prompt is the words that start a session on the house to prepare the step, `lib/hand.ts`; no ticket),
  `/clients` (the clients table: each client's stage, its repo's blueprint drift, latest
  release and `check.yml` run, one row linked to the client's page), `/work` (three sections across every client repo and the house: On your desk, the ticket
  cards whose next act is Jamie's, each with the act; Running, the other cards in flight,
  newest first; Projects, one row per repo, the house last, with its counts, its next ticket
  with the prompt to copy, and its board as the row's link; `?repo=<client>` redirects to the
  board), a project's board at
  `/work/<client>`, full screen with no sidebar and no tab bar (`<client>` as below: four
  columns, Queued, Next, Running and Shipped, each a stack of ticket cards; the phone shows one
  column at a time, `?column=`; a tick returns to it), a ticket's page at its intake
  path, `/work/<client>/<epic>/<slug>` and `/work/<client>/triage/<slug>` (`<client>` is
  `house` for the house: the state and the next step, the pull request with its gates, the
  prompt, the stub, its place in the epic; a tick returns to it), `/close?month=`,
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
- The Send a form card (`app/_send.tsx`), Jamie only, on `/clients/<slug>` and `/pool/<id>`:
  he picks a form of the house and a language (the record's or the row's by default), and a
  name and an email (the row's contact by default; a record carries none, so they start empty
  on a client page). "Send" inserts a sent link, a `links` row: the slug, the form, the
  language, the folder, the name, the email, the form as `lib/forms.ts` parses it in that
  language (`snapshot`), `signup` (true from a client page, false from a pool row), and who
  sent it. The row's id is the token, and the link is `https://desk.jamienisbet.com/f/<id>`.
  The card lists every link sent to the slug, newest first, with the form, the language, the
  date sent and the date answered; one not answered yet shows its link with Copy. Jamie sends
  it from his own mail or WhatsApp; the desk sends nothing. A pool row's slug stays once a link
  is sent to it. Jamie withdraws a link by deleting its row in the Neon console (why: the token
  is a credential, so it lives in Neon and never in git; the questions are frozen so the answer
  matches what the person read · 2026-10-26).
- The Users card (`app/_users.tsx`), Jamie only, on `/clients/<slug>`: every user at role
  `client` whose `client` is the slug, with the name, the email, the date saved and the state,
  active or waits for activation. A failed read fails the card only, in words. "Activate" sets
  the user's `active` to true, then asks Neon Auth for a sign-in link to their email, and the
  page says the link is on its way. "Send again" asks for a new link for an active user. A
  link that Neon Auth does not send leaves the user active, and the page says so
  (`app/_users-actions.ts`).
- A sent link answered, `/f/<token>` (`app/f/[token]/`), another page without a session,
  outside the shell and `noindex`; `/robots.txt` disallows `/f/`. It renders the row's frozen
  title, intro and questions, never `forms/` or `house.json`, with the page's own words in the
  row's language. A token that is not a uuid, or has no row, says the link is not valid and
  names the business email. A row answered already says the answers are with Jamie. The checks
  are `/start`'s (`lib/answers.ts`). A valid submission sets `answered_at` where it is null; the
  update that matches no row is the answered dead end, so a double submit lands once. It then
  writes the answers to `clients/<slug>/<folder>/<form>-<date>.md` when
  `clients/<slug>/record.md` is on `main`, else to `01-prospecting/leads/<slug>/<form>-<date>.md`,
  with `source: link`, and mails Jamie (`<form title>: <name>`, the answers as text, reply-to
  the row's email). The desk marks the row before it writes the file (why: a second submit must
  see the row spent · 2026-10-25). A failed write is in the Vercel log with the row id, and the
  mail says so and carries the answers. The person gets no mail.
- A sent link with `signup` true answered (a link sent from `/clients/<slug>`): after the file,
  the desk upserts the person's `users` row (`lib/db.ts saveClientUser`): the row's email and
  name, `role: client`, `client: <slug>`, `active: false`. No password and no session. The
  upsert does not change a row at role `jamie` or `salesman`, and it does not set an active
  row back to inactive. `ensureUser` does nothing on conflict, so the row keeps its role and its
  folder at the first sign-in. Jamie's mail says what became of the user: saved and waits for
  activation, active already, or not changed because of another role. A failed upsert is in
  the Vercel log with the row id, and the mail says so. A link with `signup` false changes no
  user (why: a pool row has no folder for a user · 2026-10-25).
- A salesman's pages: `/pool` and `/sell` (the target profile, the cadence, the pitch drafts
  and the seller kit, `01-prospecting/kit.<language>.md`, in one language or all). On a
  handed-off row, the deal's stage up to `agreement` and nothing after it (`01-prospecting/`). On a row at `new` or `contacted`, the next touch's
  draft from `01-prospecting/pitch/` in the row's language, with the first name in, to
  copy or to open in the seller's own mail or WhatsApp (why: the seller sends from their own
  account, and the desk sends nothing · 2026-10-22).
- A client's page: `/clients/<slug>` for the folder `users.client` names: where it stands,
  the repo's latest release and `check.yml` result (no link, no reason when the read fails),
  the documents the client reads (`proposal/proposal.md`, `agreement/*.md`,
  `handover/*.md`), and the work in words: in progress with the preview link, shipped in the
  last 14 days, queued. Research, negotiation, economics, drift, gates, CI and triage never
  reach it.
- The price is the proposal's last section (`clients/CONTEXT.md`). `read-house.mjs` puts
  `quote/quote.md` in place of the proposal's section that holds the marker comment naming
  it, so the client reads one document with the price. HTML comments leave every client
  document (why: the client says yes to one document, and the renderer that joins the two for
  the PDF is not built yet · 2026-10-26).
- The phone: the desk installs from Chrome's menu (`app/desk.webmanifest/route.ts`; the icons are drawn
  by `app/_mark.tsx`, so no image file lives in git). Installed, it is a share target: a link
  shared to Desk opens `/share`, which writes `research/queue/<date>-<host>-<hash>.md`
  on `main` with `DESK_PAT` and shows `/research` with the result. Jamie only. The desk judges
  nothing: the file holds the link, the title, the text around it and the time (why: the share
  sheet is the one tap Jamie takes on the phone; a link that waits in a chat is a link lost ·
  2026-10-25).
- Freshness: the sync pill. Each run and pull request shows its state with a link. A page
  re-reads itself in place every minute while anything it shows is in flight, and only
  while its tab is shown: the scroll and an open ticket stay as they are.
- Alerts: GitHub's failed-run mail, and the pill.
