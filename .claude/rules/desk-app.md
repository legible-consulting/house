---
paths:
  - "desk/app/**"
---

`desk/app/` is the desk dashboard (the stack: `core/stack.md`). `scripts/read-house.mjs`
reads the house at build time into `lib/house.json` (what it reads is listed at its top:
records, invoices, economics, client documents, open items, the latest glance and drift
report, the Sell words); the pool is read per request from Neon. The client repos' status
through the GitHub REST API is not read yet: `DESK_PAT` reaches the house only. Do not run
`npm run build`, `dev` or `test` here: `check.yml` builds it on every push, and Vercel deploys
it from `main` through the project's Git link (root directory `desk/app`).
Keep the app out of every other module's context; a module never imports from it.
