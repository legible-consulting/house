---
paths:
  - "desk/app/**"
---

`desk/app/` is the desk dashboard (the stack: `core/stack.md`). `scripts/read-house.mjs`
reads the house at build time into `lib/house.json` (what it reads is listed at its top:
records, economics, client documents, the Jamie's hand list (`.icm/intake/README.md`), the latest drift
report, the close files, the Sell words, the research verdicts and concepts, every form).
The home's action cards (`app/_action.tsx`) and their copied prompt (`lib/actions.ts`) read
the glance's rows and each record's body and file list; under them the hand rows
(`app/_hand.tsx`) and their prompt (`lib/hand.ts`) read the Jamie's hand list, one step per
bullet. `/clients` (`app/(desk)/clients/page.tsx`) is the clients table.
`lib/forms.ts` parses a form (`*/forms/*.md`, the grammar in `01-prospecting/CONTEXT.md`) into a
snapshot and checks its language files against each other; `read-house.mjs` imports it, and a
form that does not parse fails the build. `lib/kit.ts` parses the seller kit
(`01-prospecting/kit.<language>.md`, the grammar in the same contract) into lessons and checks the
three files against each other, as `lib/forms.ts` does; `read-house.mjs` imports it, and a kit
that does not parse fails the build. `lib/rhythms.ts` computes the glance and the close
from it on every request; `scripts/rhythms.mjs` writes the same words as files (`rhythms.yml`).
The pool is read per request from Neon. `lib/language.ts languageOf` gives the language a user reads
in: `users.language`, which `/preferences` (`app/(desk)/preferences/`) writes, else the browser's
`Accept-Language` by `lib/lead.ts LOCALES`, else `en-GB`; `/sell` reads it when its URL names no
language. `/sell` (`app/(desk)/sell/page.tsx`) is the course's index and `/sell/<key>`
(`app/(desk)/sell/[key]/page.tsx`) one lesson, both from the kit that `lib/kit.ts` parses into
`house.json`, with the shared parts in `app/(desk)/sell/_course.tsx`; a lesson's pitch draft
shows in the document block of the row's Next touch (`app/_touch.tsx Draft`). The no-contact list (`suppressions`) is written by the
row page's "They asked not to be contacted" and read by every path that adds a row or changes
its email, phone or WhatsApp number (`lib/db.ts suppressed`); `scripts/pool-purge.mjs` clears a row nobody
worked for 12 months, by hand from the laptop. Three doors have no session: `app/api/pool/route.ts`,
where the portfolio's contact form posts a lead with `POOL_TOKEN`, `/start` (`app/start/`),
the public free look, and `/f/<token>` (`app/f/[token]/`), a sent link answered. The first two
make the pool row with `lib/lead.ts`; `/start` counts submissions per hashed IP in `throttle`.
`/start` and `/f/<token>` share the question controls (`app/_questions.tsx`) and the checks,
and write the answers to the house with `lib/answers.ts`; `/f/<token>` reads and marks its
`links` row (`lib/db.ts`) and renders only the row's snapshot. For a row with `signup` true it
saves the person as an inactive client user (`lib/db.ts saveClientUser`); `lib/user.ts
currentUser` reads an inactive user as a client with no folder, and the Users card
(`app/_users.tsx`) lists a folder's users on `/clients/<slug>`. Its action
(`app/_users-actions.ts`) activates a user and has Neon Auth mail a sign-in link
(`lib/auth.ts mailSignInLink`); `/sign-in` asks for the same link for an active client user and
refuses a client's password; the link lands on `/link` (`app/link/route.ts`), which `proxy.ts`
matches so the middleware sets the session.
Jamie's Send a form card (`app/_send.tsx`, its action `app/_send-actions.ts`) on a client page
and a pool row inserts a sent link in `links` (`lib/links.ts`, `lib/db.ts`) with the form's
snapshot from `house.json`.
`lib/mail.ts` sends the desk's one mail, a plain-text notice to Jamie, through Resend's HTTP
API with `RESEND_API_KEY`, to the business email that `read-house.mjs` reads from
`core/identity.md`.
The client repos' release and `check.yml` status are read per request over the GitHub REST
API with one token per owner, `ESTATE_PAT` and `ESTATE_PAT_<OWNER>` (`lib/repos.ts`).
The work view (`/work`, a project's board `app/(desk)/work/[client]/`, which the shell draws
with no sidebar and no tab bar, a ticket's page `app/(desk)/work/[client]/[...path]/`, and the Work
card on a client's page) reads `.icm/intake/` and the pull requests per request through
`lib/work.ts` with the same tokens, and `lib/gates.ts` writes Jamie's tick on a gate and
returns to the page that the form binds. A ticket shows as `components/desk/ticket-card.tsx`
and its steps as `components/desk/track.tsx` (`DESIGN.md`).
`DESK_PAT` reaches the house only: Contents and Pull requests for the pool handoff
(`lib/github.ts`), Contents for the research queue (`lib/research.ts`, `/share` and `/research`) and for the answers (`lib/answers.ts`, `/start` and `/f/<token>`, which also reads whether `clients/<slug>/record.md` is on `main`) and for the house's own tickets on `/work` (`lib/work.ts`),
Actions for the sync pill's runs that start `rhythms.yml` on `main` by
`workflow_dispatch` (`lib/refresh.ts`, `app/_sync.tsx`). `lib/github.ts` reads the house
workflow's latest run and the distance from the build's commit to `main`. `lib/limits.ts`
reads each token's GitHub rate limit for the sync pill's panel, and gives the three GitHub
clients the sentence, with the reset time, for a read that the limit refused.
Do not run
`npm run build`, `dev` or `test` here: `check.yml` builds it on every pull request, and Vercel deploys
it from `main` through the project's Git link (root directory `desk/app`).
Keep the app out of every other module's context; a module never imports from it.
