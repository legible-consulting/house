# Stub: A monorepo build with UAT migrates at build from the app that owns the database

- lane: chore
- found-by: Jamie, `k0d0minio/remi-ai` pull request 148 · 2026-10-28
- complexity: medium
- priority: P2

## Problem

`.icm/database/CONTEXT.md` § The migration rule assumes one package at the root, or one level below it. A monorepo build from the blueprint (`monorepo: true`) has its apps two levels below the root, and Turborepo runs their builds. The rule does not say how such a build migrates:

1. The rule puts the line `"vercel-build": "bash .icm/scripts/vercel-build.sh next build"` in `package.json`. Vercel runs `vercel-build` only when the project has no Build Command override. A Turborepo project usually runs `turbo run build`, so Vercel never calls `vercel-build`.
2. `vercel-build.sh` runs `db:migrate` and `db:verify` in the app's folder. An app that only calls the shared package's scripts must name both itself. The rule does not say so.
3. Turborepo's strict environment mode removes a variable that `turbo.json` does not name. `VERCEL_TARGET_ENV`, `MIGRATE_AT_BUILD` and `DATABASE_URL_UNPOOLED` must be in `globalEnv`, or the build cannot see them.
4. Several apps can read one database. The rule does not say which app migrates. Two apps that both migrate at build race on the same database.

`remi-ai` works around it until this lands: the admin app's `build` script calls `vercel-build.sh`, and Vercel's Build Command does not change.

## Proposed change

The blueprint states the migration rule for a monorepo, and renders what the rule needs when `monorepo` is yes.

## Acceptance criteria

- [ ] `.icm/database/CONTEXT.md` says which one app of a monorepo migrates, and where its build calls `vercel-build.sh`.
- [ ] The rule works with the Vercel Build Command that a Turborepo project uses, with no dashboard setting by hand. The contract names the line, or the `vercel.json` `buildCommand`, that carries it.
- [ ] The contract says that the app which migrates names `db:migrate` and `db:verify` in its own `package.json`.
- [ ] A rendered monorepo's `turbo.json`, or the contract, names `VERCEL_TARGET_ENV`, `MIGRATE_AT_BUILD` and `DATABASE_URL_UNPOOLED` in `globalEnv`.
- [ ] `check.yml` renders a monorepo answer set with UAT and Neon, and lints the result.

## Notes

- Repo `legible-consulting/blueprint`. Commits: `feat:` or `fix:`.
- Files: `template/{% if not workspace %}.icm{% endif %}/{% if database == 'neon' %}database{% endif %}/CONTEXT.md`, `template/{% if not workspace %}.icm{% endif %}/scripts/{% if database == 'neon' %}vercel-build.sh{% endif %}`, `copier.yml` (the `monorepo` question), `check.yml`.
- `vercel-build.sh` already takes the build command as its arguments, so an app can call it from `build` with `bash ../../.icm/scripts/vercel-build.sh next build`.
- Related: `blueprint-uat-several-projects.md` promotes each project. This stub decides which project migrates. Build them in either order.
- The blueprint is public: no client name in the blueprint's files or its pull request.
- Out of scope: a change in a client repo. Each client gets the change through `copier update`.

## Prompt

Repo legible-consulting/blueprint, desktop or cloud. Attach legible-consulting/house read-only. The ticket is .icm/intake/triage/blueprint-monorepo-uat-build.md in the house: read it first, then the blueprint's CLAUDE.md. Cut the branch `monorepo-uat-build` from `main`. Conventional Commits, technical text in Simplified Technical English. Do not run checks locally. Do not merge.
