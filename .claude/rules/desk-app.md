---
paths:
  - "desk/app/**"
---

`desk/app/` is the desk dashboard (the stack: `core/stack.md`). `scripts/read-house.mjs`
reads `clients/*/record.md` frontmatter at build time (the client repos' status through the
GitHub REST API comes later, with `DASHBOARD_PAT`). Do not run `npm run build`, `dev` or
`test` here: `check.yml` builds it on every push, `dashboard.yml` deploys it from `main`.
Keep the app out of every other module's context; a module never imports from it.
