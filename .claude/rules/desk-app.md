---
paths:
  - "desk/app/**"
---

`desk/app/` is the desk dashboard (the stack: `core/stack.md`). `scripts/read-house.mjs`
reads the house at build time into `lib/house.json` (what it reads is listed at its top:
records, invoices, economics, client documents, open items, the latest glance and drift
report, the review and close files, the Sell words). The pool is read per request from Neon.
The client repos' release and `check.yml` status are read per request over the GitHub REST
API with `ESTATE_PAT` (`lib/repos.ts`). `DESK_PAT` reaches the house only.
`scripts/rhythms.mjs` writes the review and close files with the rules in `lib/rhythms.ts`.
Do not run
`npm run build`, `dev` or `test` here: `check.yml` builds it on every push, and Vercel deploys
it from `main` through the project's Git link (root directory `desk/app`).
Keep the app out of every other module's context; a module never imports from it.
