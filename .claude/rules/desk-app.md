---
paths:
  - "desk/app/**"
---

`desk/app/` is the Astro dashboard. It reads `clients/*/record.md` frontmatter at build time
(the client repos' status through the GitHub REST API comes later, with `DASHBOARD_PAT`). Do not
run `npm run build`, `dev` or `test` here: the build runs in Actions and deploys to Vercel.
Keep the app out of every other module's context; a module never imports from it.
