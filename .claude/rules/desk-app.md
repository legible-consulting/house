---
paths:
  - "desk/app/**"
---

`desk/app/` is the desk dashboard (the stack: `core/stack.md`). `scripts/read-house.mjs`
reads the house at build time into `lib/house.json` (what it reads is listed at its top:
records, economics, client documents, the Jamie's hand list (`.icm/intake/README.md`), the latest drift
report, the close files, the Sell words, the research verdicts and concepts, every form).
`lib/forms.ts` parses a form (`*/forms/*.md`, the grammar in `01-prospecting/CONTEXT.md`) into a
snapshot and checks its language files against each other; `read-house.mjs` imports it, and a
form that does not parse fails the build. `lib/rhythms.ts` computes the glance and the close
from it on every request; `scripts/rhythms.mjs` writes the same words as files (`rhythms.yml`).
The pool is read per request from Neon. Three doors have no session: `app/api/pool/route.ts`,
where the portfolio's contact form posts a lead with `POOL_TOKEN`, `/start` (`app/start/`),
the public free look, and `/f/<token>` (`app/f/[token]/`), a sent link answered. The first two
make the pool row with `lib/lead.ts`; `/start` counts submissions per hashed IP in `throttle`.
`/start` and `/f/<token>` share the question controls (`app/_questions.tsx`) and the checks,
and write the answers to the house with `lib/answers.ts`; `/f/<token>` reads and marks its
`links` row (`lib/db.ts`) and renders only the row's snapshot.
Jamie's Send a form card (`app/_send.tsx`, its action `app/_send-actions.ts`) on a client page
and a pool row inserts a sent link in `links` (`lib/links.ts`, `lib/db.ts`) with the form's
snapshot from `house.json`.
`lib/mail.ts` sends the desk's one mail, a plain-text notice to Jamie, through Resend's HTTP
API with `RESEND_API_KEY`, to the business email that `read-house.mjs` reads from
`core/identity.md`.
The client repos' release and `check.yml` status are read per request over the GitHub REST
API with one token per owner, `ESTATE_PAT` and `ESTATE_PAT_<OWNER>` (`lib/repos.ts`).
The work view (`/work`, and the Work card on a client's page) reads `.icm/intake/` and the
pull requests per request through `lib/work.ts` with the same tokens, and `lib/gates.ts`
writes Jamie's tick on a gate.
`DESK_PAT` reaches the house only: Contents and Pull requests for the pool handoff
(`lib/github.ts`), Contents for the research queue (`lib/research.ts`, `/share` and `/research`) and for the answers (`lib/answers.ts`, `/start` and `/f/<token>`, which also reads whether `clients/<slug>/record.md` is on `main`) and for the house's own tickets on `/work` (`lib/work.ts`),
Actions for the sync pill's runs that start `rhythms.yml` on `main` by
`workflow_dispatch` (`lib/refresh.ts`, `app/_sync.tsx`). `lib/github.ts` reads the house
workflow's latest run and the distance from the build's commit to `main`.
Do not run
`npm run build`, `dev` or `test` here: `check.yml` builds it on every push, and Vercel deploys
it from `main` through the project's Git link (root directory `desk/app`).
Keep the app out of every other module's context; a module never imports from it.
