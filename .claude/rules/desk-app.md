---
paths:
  - "desk/app/**"
---

`desk/app/` is the desk dashboard (the stack: `core/stack.md`). `scripts/read-house.mjs`
reads the house at build time into `lib/house.json` (what it reads is listed at its top:
records, economics, client documents, what Jamie decides (`core/wave.md`), the latest drift
report, the close files, the Sell words). `lib/rhythms.ts` computes the glance and the close
from it on every request; `scripts/rhythms.mjs` writes the same words as files (`rhythms.yml`).
`scripts/sessions.mjs` measures a month's Claude Code sessions per client into `desk/sessions/`
from the transcripts on Jamie's machine and, with `--ledger`, from the session ledger that
`app/api/sessions/route.ts` keeps in Neon (table `sessions`), posted by the `session-ledger.sh`
hook at the end of every turn; `rhythms.yml` runs it with the ledger on every run.
The pool is read per request from Neon.
The client repos' release and `check.yml` status are read per request over the GitHub REST
API with one token per owner, `ESTATE_PAT` and `ESTATE_PAT_<OWNER>` (`lib/repos.ts`).
The work view (`/work`, and the Work card on a client's page) reads `.icm/intake/` and the
pull requests per request through `lib/work.ts` with the same tokens, and `lib/gates.ts`
writes Jamie's tick on a gate.
`DESK_PAT` reaches the house only: Contents and Pull requests for the pool handoff
(`lib/github.ts`), Actions for the sync pill's runs that start `rhythms.yml` on `main` by
`workflow_dispatch` (`lib/refresh.ts`, `app/_sync.tsx`). `lib/github.ts` reads the house
workflow's latest run and the distance from the build's commit to `main`.
Do not run
`npm run build`, `dev` or `test` here: `check.yml` builds it on every push, and Vercel deploys
it from `main` through the project's Git link (root directory `desk/app`).
Keep the app out of every other module's context; a module never imports from it.
