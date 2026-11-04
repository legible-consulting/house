# The desk app

What the desk's app does, route by route: the roles, the sign-in, the tables, the variables
and the console steps. The contract is `../CONTEXT.md`: what the desk produces, what it reads
and what it writes to `main`. The code map is `../../.claude/rules/desk-app.md`. The why of
each rule is in `../why.md`.

- Next.js on Vercel (`core/stack.md`), project `legible-desk`, `https://desk.jamienisbet.com`,
  deployed from `main` by the project's Git link (root directory `desk/app`), a preview per PR.
  `check.yml` builds it on every pull request and every push to `main`.
- Design: `app/DESIGN.md` holds the information rules (what a page shows first, the ticket
  card, the track, the fold); `app/app/globals.css` holds the visual rules and the tokens.
- Data: the house is read once, at build, by `app/scripts/read-house.mjs` (what it reads is
  listed at its top). The pool, the house workflow and the client repos are read per request. A
  page never reads the repo.
- Sign-in by Neon Auth. Tables `users`, `prospects`, `touches`, `throttle`, `links` and
  `suppressions` in Neon Postgres, from `app/db/schema.sql`. Three roles from `users.role`:
  `jamie`, `salesman`, `client`. A new account starts as `client` with no folder and sees
  nothing until Jamie sets the role in the Neon console (the upserts are at the foot of
  `schema.sql`). `users.active` is false for a client that the answer to a sent link saved, and
  true for every other row. `currentUser()` (`app/lib/user.ts`) reads a user with `active`
  false as a client with no folder. `users.language` is `pt-PT`, `fr-BE`, `en-GB` or empty. The
  user sets it on `/preferences`, and Jamie may set it by hand (the upsert at the foot of
  `schema.sql`). A page reads the row's language, else the first language of the browser's
  `Accept-Language` that maps to the three, else `en-GB` (`app/lib/language.ts`). A `?lang=` in
  a page's URL is for one read and does not change the row.
- The words of a page. The salesman's pages read in the user's language: the shell's labels,
  `/pool`, `/pool/<id>`, `/sell`, `/sell/<key>`, `/preferences`, and the flashes and the errors
  of their actions, from one typed words file in the three languages (`app/lib/words.ts`).
  `/sell` with `?lang=` reads in that language for the read. Jamie's pages, the sign-in pages
  and a client's page read in English, and a `jamie` user reads every page in English. A pool
  status, a channel, a country, a language code, a field key and a stage stay the model's word,
  in mono, in every language, and a date stays ISO. `<html lang>` is the language of the page's
  words.
- How a client gets in. Jamie and the salesmen sign in with email and password. A client user
  of a folder (`role: client` with a `client`) signs in by magic link only: the password form
  reads the `users` row by email before it asks Neon Auth, and answers a client's email with
  the note to use the link. Neon Auth mails the link (`app/lib/auth.ts mailSignInLink`), as it
  mails the reset link: at Jamie's click on "Activate" or "Send again" in the Users card, or
  when the person asks on `/sign-in` with "Email me a sign-in link". The desk asks for a link
  only for an active client user of a folder, and `/sign-in` shows the same note whether or not
  it asked. The link lands on `/link` (`app/link/route.ts`): the middleware sets the session
  cookies, the route runs `ensureUser` and lands the client on `/clients/<slug>`. A spent or
  expired link lands on `/sign-in`, which names Neon Auth's code and asks for a new link. The
  desk's own mail still goes to Jamie only.
- Jamie's step for the links, in the Neon console, project `legible-desk`, Settings > Better
  Auth > Magic Link: Enable Magic Link on. Allow New User Registration on, because a client has
  no Neon Auth account before the first link; the desk asks for a link for nobody but an active
  client user. Link Expiration long enough for the first mail, which goes out at Jamie's click
  and is read later (1440 minutes is the maximum). The link lands on the origin that asked for
  it, so that origin is a trusted domain of Neon Auth, as for the reset mail.
- Variables, names only, on the Vercel project (`app/.env.example`): `DATABASE_URL`,
  `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `DESK_PAT` (the house only: Contents, Pull
  requests and Actions, read and write), `ESTATE_PAT` and `ESTATE_PAT_<OWNER>` (one
  fine-grained token per repo owner: Contents, Actions, Metadata, Commit statuses and Pull
  requests read, Pull requests write for the gates), `POOL_TOKEN` (the bearer the portfolio's
  contact form sends to the pool API; the Vercel project `portfolio` holds the same value as
  `DESK_POOL_TOKEN`), `RESEND_API_KEY` (the desk's own key in the Resend account that holds
  `mail.jamienisbet.com`), `THROTTLE_SALT` (the key of the IP hash in `/start`'s rate limit). A
  token unset, or a repo out of reach, fails only its own cell, in words.
- The pool API, `app/api/pool/route.ts`, a route without a session: `POST /api/pool` with
  `Authorization: Bearer <POOL_TOKEN>` and a JSON body (`name`, `email`, `message`, `language`,
  `company?`, `phone?`) inserts a `prospects` row at `new` with `source: portfolio`,
  `sourced_by: jamie` and the `jamie` user as its salesman, like a row Jamie adds by hand. 201
  with the id. 401 on a missing or wrong token. 400 on a bad body. 422 with the open row's id
  when a prospect with that email is open (not `lost`, not `handed off`), and nothing is
  inserted. 422 with `{ error: "suppressed" }` when the email or the phone is on the no-contact
  list, and nothing is inserted. No mail: the portfolio sends its own.
- The no-contact list, the table `suppressions`: "They asked not to be contacted" on
  `/pool/<id>`, for the sourcer and Jamie, sets the row to `lost` with that reason, clears
  `next_action` and writes the row's email, phone and WhatsApp number to it (one number is the
  phone and WhatsApp). Adding a row, saving a row with a new email, phone or WhatsApp number,
  and the pool API refuse a value on the list, in words. No code path deletes an entry.
- The purge, `app/scripts/pool-purge.mjs`: Jamie runs it by hand from the laptop with
  `DATABASE_URL` in the environment, never on a timer. It clears the person's data from a pool
  row nobody worked for 12 months (`01-prospecting/prospect.md`, Statuses). It prints the rows
  and the fields it would clear, and it writes only with `--yes`.
- The free look, `/start?lang=en|fr|pt` (`app/start/`), the other page without a session,
  outside the shell and `noindex`. It renders `01-prospecting/forms/free-look.<language>.md`
  (no `lang`, or an unknown one, is `en`) with the page's own words in the same language. A
  valid submission inserts a pool row by the pool API's code (`lib/lead.ts`): at `new`,
  `source: free look`, Jamie as salesman, or no row when one with that email is open. It writes
  the answers to `01-prospecting/leads/<slug>/free-look-<date>.md` on `main` with `DESK_PAT`
  (`lib/answers.ts`, the row `free-look`), mails Jamie (`Free look: <name>`, reply-to the
  visitor) and shows the visitor a confirmation. The visitor gets no mail. A filled honeypot,
  or a sixth submission from one IP in one hour (table `throttle`: the IP hashed with
  `THROTTLE_SALT`, the hour, the count, kept one day), is thanked and stores nothing. A failed
  count, row or file is an error on the page, and the visitor can send again.
- `/preferences`, for Jamie and a salesman (a client goes to `/`): the name and the email as
  read-only facts, and the language as a select of the three in their own names. Save writes
  `users.language` and comes back with a note, or with the error in words. The user's name in
  the sidebar's foot and in the More drawer links to it.
- Jamie's pages: `/` (one card per next client action, the glance's rows, grouped by urgency:
  overdue, this week, later, no deadline; each card with Copy prompt, the words that start a
  session on the house to do the action, with the record, the folder's files and the stage's
  contract, `lib/actions.ts`; tiles that count the urgent actions and the open leads; then the
  section "Meetings booked for you · <n>" when one exists: the open pool rows with
  `meeting_with: jamie` from today on, soonest first, each the date and the time in mono, the
  company linked to its pool row, the sourcer and where (`app/_meetings.tsx`); a meeting is not
  a client action until the handoff, so `lib/actions.ts` does not read it; then one row per
  step of Jamie's hand (`.icm/intake/README.md`): the step's bold title, with Copy prompt on
  the row; the row opens on the step and its check; the prompt is the words that start a
  session on the house to prepare the step, `lib/hand.ts`; no ticket), `/clients` (the clients
  table: each client's stage, its repo's blueprint drift and, beside it, the Platform cell when
  an answer is not backed, latest release and `check.yml` run, one row linked to the client's
  page), `/work` (three sections across every client repo and the house: On your desk, the
  ticket cards whose next act is Jamie's, each with the act; Running, the other cards in
  flight, newest first; Projects, one row per repo, the house last, with its counts, its next
  ticket with the prompt to copy, and its board as the row's link; `?repo=<client>` redirects
  to the board), a project's board at `/work/<client>`, full screen with no sidebar and no tab
  bar (`<client>` as below: four columns, Queued, Next, Running and Shipped, each a stack of
  ticket cards; the phone shows one column at a time, `?column=`; a tick returns to it), a
  ticket's page at its intake path, `/work/<client>/<epic>/<slug>` and
  `/work/<client>/triage/<slug>` (`<client>` is `house` for the house: the state and the next
  step, the pull request with its gates, the prompt, the stub, its place in the epic; a tick
  returns to it), `/close?month=`, `/clients/<slug>`, `/pool`, `/sell` (the salesman's course,
  and the house's model under a fold at its foot), `/research` (every verdict and concept from
  `main`, under four filters, use, kind, verdict and tier, each file as prose on
  `/research/<slug>`; the links shared to the desk that the intake has not judged yet; and the
  form to paste one; `research/CONTEXT.md`). `/close` renders the committed file when one
  exists and computes the same rules live otherwise, or with `?live=1`.
- The sync pill (Jamie only), at the top of every page: up to date, running, deploying, out of
  sync, or unknown, with the reason in its panel. The panel starts `rhythms.yml` on `main` by
  `workflow_dispatch` with `DESK_PAT` (the glance or the close). A failed deploy is fixed from
  the laptop.
- Gates: a tick from the desk writes the box in the pull request's body with the owner's token,
  for the `jamie` role only. The house never ticks one.
- The Send a form card (`app/_send.tsx`), Jamie only, on `/clients/<slug>` and `/pool/<id>`: he
  picks a form of the house and a language (the record's or the row's by default), and a name
  and an email (the row's contact by default; a record carries none, so they start empty on a
  client page). "Send" inserts a sent link, a `links` row: the slug, the form, the language,
  the folder, the name, the email, the form as `lib/forms.ts` parses it in that language
  (`snapshot`), `signup` (true from a client page, false from a pool row), and who sent it. The
  row's id is the token, and the link is `https://desk.jamienisbet.com/f/<id>`. The card lists
  every link sent to the slug, newest first, with the form, the language, the date sent and the
  date answered; one not answered yet shows its link with Copy. Jamie sends it from his own
  mail or WhatsApp; the desk sends nothing. A pool row's slug stays once a link is sent to it.
  Jamie withdraws a link by deleting its row in the Neon console.
- The Users card (`app/_users.tsx`), Jamie only, on `/clients/<slug>`: every user at role
  `client` whose `client` is the slug, with the name, the email, the date saved and the state,
  active or waits for activation. A failed read fails the card only, in words. "Activate" sets
  the user's `active` to true, then asks Neon Auth for a sign-in link to their email, and the
  page says the link is on its way. "Send again" asks for a new link for an active user. A link
  that Neon Auth does not send leaves the user active, and the page says so
  (`app/_users-actions.ts`).
- The Environments card (`app/_environments.tsx`), Jamie only, on `/clients/<slug>` when
  `repo:` is set: each row of the repo's own `.icm/environments.md` on its default branch, read
  per request with the owner's token by `lib/environments.ts`, the five columns with each
  address as a link. A repo with no file, a file with no table and a failed read are one line
  each. The record holds no copy. A client does not see it: a cell may name a triage stub.
- A sent link answered, `/f/<token>` (`app/f/[token]/`), another page without a session,
  outside the shell and `noindex`; `/robots.txt` disallows `/f/`. It renders the row's frozen
  title, intro and questions, never `forms/` or `house.json`, with the page's own words in the
  row's language. A token that is not a uuid, or has no row, says the link is not valid and
  names the business email. A row answered already says the answers are with Jamie. The checks
  are `/start`'s (`lib/answers.ts`). A valid submission sets `answered_at` where it is null;
  the update that matches no row is the answered dead end, so a double submit lands once. It
  then writes the answers to `clients/<slug>/<folder>/<form>-<date>.md` when
  `clients/<slug>/record.md` is on `main`, else to
  `01-prospecting/leads/<slug>/<form>-<date>.md`, with `source: link` (the row `link-answers`),
  and mails Jamie (`<form title>: <name>`, the answers as text, reply-to the row's email). The
  desk marks the row before it writes the file. A failed write is in the Vercel log with the
  row id, and the mail says so and carries the answers. The person gets no mail.
- A sent link with `signup` true answered (a link sent from `/clients/<slug>`): after the file,
  the desk upserts the person's `users` row (`lib/db.ts saveClientUser`): the row's email and
  name, `role: client`, `client: <slug>`, `active: false`. No password and no session. The
  upsert does not change a row at role `jamie` or `salesman`, and it does not set an active row
  back to inactive. `ensureUser` does nothing on conflict, so the row keeps its role and its
  folder at the first sign-in. Jamie's mail says what became of the user: saved and waits for
  activation, active already, or not changed because of another role. A failed upsert is in the
  Vercel log with the row id, and the mail says so. A link with `signup` false changes no user.
- A salesman's pages: `/pool`, `/preferences`, `/sell` and `/sell/<key>`, the course of the
  seller kit, `01-prospecting/kit.<language>.md` as `lib/kit.ts` parses it, in the user's
  language, or for one read another of the three, `?lang=` (the "Read in" group). `/sell` is
  the index: the kit's intro, then its three parts, Jamie and what he sells, The system, The
  reference, each a list of its lessons in the kit's order, one row per lesson with its number,
  its title and the status it teaches. `/sell/<key>` is one lesson: its place in its part as a
  track, its words, for a lesson with `touch:` the pitch draft of each touch in the reader's
  language with Copy, for the lesson with `status: meeting` the booking link of
  `core/identity.md` with Copy when it is set (`read-house.mjs` reads it as it reads the
  business email; the salesman sends it from their own account, and the desk reads no
  calendar), and the lessons before and after it in the kit's order. A key no kit has is a 404.
  The desk stores no progress: the URL is the lesson. A salesman does not read
  `target-profile.md` or `cadence.md` in the desk: Jamie reads them at the foot of his `/sell`,
  under the fold "The house's model". `/pool` opens on Mine for a salesman (All, Open, Handed
  off and Lost stay choices; Jamie's opens on All), with the rows due now first whatever the
  filter. A search on the header's trailing edge, `?q=`, keeps the rows of the filter whose
  company, contact, email, phone, WhatsApp, Instagram or source holds it, in any case, in SQL
  (`lib/db.ts allProspects`); the empty result asks the salesman to search All before adding a
  row (`cadence.md`, Channels). A row's header draws the pool's six statuses, `new` to `handed
  off`, as a track (`components/desk/pool-track.tsx`); `lost` shows its name only. Under it,
  for an open row the user writes, one line: "Next:" and the `next:` of the kit's lesson for
  the row's status, in the user's language, with the lesson's title as its link to
  `/sell/<key>`. The add card and the drawer link the lesson for `new`; Next touch's eyebrow
  links the lesson that shows the touch. The Move card asks for the meeting's date, time, with
  whom and where when the move is to `meeting`, and refuses the move without the first three.
  From `meeting` on, the header's facts line shows the meeting: the date and the time in mono,
  in Lisbon time, with whom, and where, as a link when it is a URL. From `replied` on, the
  sourcer edits it in the Meeting field group of Facts. On a handed-off row, the deal's stage
  up to `agreement` and nothing after it (`01-prospecting/`). On a row at `new` or `contacted`,
  the next touch's draft from `01-prospecting/pitch/` in the row's language, with the first
  name in, to copy or to open in the seller's own mail or WhatsApp.
- A client's page: `/clients/<slug>` for the folder `users.client` names: where it stands, the
  repo's latest release and `check.yml` result (no link, no reason when the read fails), the
  documents the client reads (`proposal/proposal.md`, `agreement/*.md`, `handover/*.md`), and
  the work in words: in progress with the preview link, shipped in the last 14 days, queued.
  Research, negotiation, economics, drift, gates, CI and triage never reach it.
- The price is the proposal's last section (`clients/CONTEXT.md`). `read-house.mjs` puts
  `quote/quote.md` in place of the proposal's section that holds the marker comment naming it,
  so the client reads one document with the price. HTML comments leave every client document.
- The phone: the desk installs from Chrome's menu (`app/desk.webmanifest/route.ts`; the icons
  are drawn by `app/_mark.tsx`, so no image file lives in git). Installed, it is a share
  target: a link shared to Desk opens `/share`, which writes
  `research/queue/<date>-<host>-<hash>.md` on `main` with `DESK_PAT` and shows `/research` with
  the result. Jamie only. The desk judges nothing: the file holds the link, the title, the text
  around it and the time.
- Freshness: the sync pill. Each run and pull request shows its state with a link. A page
  re-reads itself in place every minute while anything it shows is in flight, and only while
  its tab is shown: the scroll and an open ticket stay as they are.
- Alerts: GitHub's failed-run mail, and the pill.