# Stub: A UAT build promotes every Vercel project of a monorepo in one dispatch

- lane: chore
- found-by: Jamie, `k0d0minio/remi-ai` pull request 148 · 2026-10-28
- complexity: high
- priority: P1

## Problem

A rendered build reads one Vercel project: the variable `VERCEL_PROJECT`, or the repository's name. A monorepo build has one Vercel project per app. With `uat: true`, only that one project gets promoted:

1. `promote.yml` migrates production, then promotes the staged production build of `VERCEL_PROJECT` only. The other projects stay staged. Jamie promotes them by hand in Vercel, after the migration.
2. `promote.sh status` reads the custom environment `uat`, the Auto-assign switch and the staged build of one project only.
3. `rollback.sh` names the previous deployment of one project only.
4. `preview-db.sh` sets `DATABASE_URL`, `DATABASE_URL_UNPOOLED` and `MIGRATE_AT_BUILD` on the Preview environment of one project only. Another app that reads the same database gets no preview branch.

`remi-ai` has `admin` and `app` on `uat`. Both read the database. It merges with the hand promotion of `app` as a stop-gap until this lands.

## Proposed change

A build names its Vercel projects once. `promote.yml`, `promote.sh`, `rollback.sh` and `preview-db.sh` act on each of them. A build with one project works as it does today, with no new setting.

## Acceptance criteria

- [ ] An Actions variable names one or more Vercel projects. Unset, the scripts read `VERCEL_PROJECT`, then the repository's name, as today.
- [ ] `promote.yml` migrates production once. Then it waits until the staged production build of the tag's commit is READY on every named project. Then it promotes each one. ERROR or CANCELED on any project stops the run before any promotion.
- [ ] A re-run of a failed `promote.yml` promotes only the projects that are not current yet.
- [ ] `promote.sh status` prints the setup acts, the UAT deployment and the staged build of each named project.
- [ ] `rollback.sh` prints one `vercel rollback` command per named project.
- [ ] `preview-db.sh create` and `delete` set and remove the three variables on each named project.
- [ ] `.icm/uat/CONTEXT.md`, `.icm/database/CONTEXT.md`, `.env.example` and the names tables name the new variable.
- [ ] `check.yml` renders a monorepo answer set with two projects and lints the result.

## Notes

- Repo `legible-consulting/blueprint`. Commits: `feat:`.
- Files: `template/.github/workflows/{% if uat %}promote.yml{% endif %}`, `template/{% if not workspace %}.icm{% endif %}/scripts/` (`promote.sh`, `rollback.sh`, `preview-db.sh`, `lib/vercel.sh`), `template/{% if not workspace %}.icm{% endif %}/{% if uat %}uat{% endif %}/CONTEXT.md`, `template/{% if not workspace %}.icm{% endif %}/{% if database == 'neon' %}database{% endif %}/CONTEXT.md`, `template/.github/workflows/{% if database == 'neon' %}neon-cleanup.yml{% endif %}`.
- A project the build does not name keeps "Auto-assign Custom Production Domains" on and follows `main`. In `remi-ai`, `marketing` and `documentation` do that.
- The blueprint is public: no client name in the blueprint's files or its pull request.
- Out of scope: a change in a client repo. Each client gets the change through `copier update`. `remi-ai` then sets the variable and stops the hand promotion.

## Prompt

Repo legible-consulting/blueprint, desktop or cloud. Attach legible-consulting/house read-only. The ticket is .icm/intake/triage/blueprint-uat-several-projects.md in the house: read it first, then the blueprint's CLAUDE.md. Cut the branch `uat-several-projects` from `main`. Conventional Commits, technical text in Simplified Technical English. Do not run checks locally. Do not merge.
