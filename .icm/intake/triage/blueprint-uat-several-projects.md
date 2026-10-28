# Stub: A UAT build finds its Vercel projects and promotes each one in one dispatch

- lane: chore
- found-by: Jamie, `k0d0minio/remi-ai` pull request 148 · 2026-10-28
- complexity: high
- priority: P1

## Problem

A rendered build reads one Vercel project: the Actions variable `VERCEL_PROJECT`, or the repository's name. It reads the Neon project of the base from the Actions variable `NEON_PROJECT_ID`. A monorepo build has one Vercel project per app, and no project has the repository's name. With `uat: true`, only that one project gets promoted:

1. `promote.yml` migrates production, then promotes the staged production build of `VERCEL_PROJECT` only. The other projects stay staged. Jamie promotes them by hand in Vercel, after the migration.
2. `promote.sh status` reads the custom environment `uat`, the Auto-assign switch and the staged build of one project only.
3. `rollback.sh` names the previous deployment of one project only.
4. `preview-db.sh` sets `DATABASE_URL`, `DATABASE_URL_UNPOOLED` and `MIGRATE_AT_BUILD` on the Preview environment of one project only. Another app that reads the same database gets no preview branch.

`remi-ai` has `admin` and `app` on `uat`. Both read the database. Jamie wants no `VERCEL_PROJECT` and no `NEON_PROJECT_ID` to set by hand (2026-10-28). The goal is one promotion that moves every app of the monorepo that has `uat`.

## Proposed change

The scripts find the build's Vercel projects themselves: every project in `VERCEL_TEAM` whose git link is this repository. The projects that have the custom environment `uat` are the UAT projects. The scripts also find the Neon project of the base with no variable set by hand. `promote.yml`, `promote.sh`, `rollback.sh` and `preview-db.sh` act on each UAT project. A build with one project works as it does today.

## Acceptance criteria

- [ ] No Actions variable names a Vercel project or a Neon project. The scripts find the projects of the repository through the Vercel API (`GET /v10/projects` filtered by the repository) and keep those with the custom environment `uat`.
- [ ] The scripts find the Neon project of the base with no `NEON_PROJECT_ID`. The contract names the rule, for example a project name from the repository's name.
- [ ] `promote.yml` migrates production once. Then it waits until the staged production build of the tag's commit is READY on every UAT project. Then it promotes each one. ERROR or CANCELED on any project stops the run before any promotion.
- [ ] A re-run of a failed `promote.yml` promotes only the projects that are not current yet.
- [ ] `promote.sh status` prints the setup acts, the UAT deployment and the staged build of each UAT project.
- [ ] `rollback.sh` prints one `vercel rollback` command per UAT project.
- [ ] `preview-db.sh create` and `delete` set and remove the three variables on each UAT project.
- [ ] `.icm/uat/CONTEXT.md`, `.icm/database/CONTEXT.md`, `.env.example` and the names tables drop `VERCEL_PROJECT` and `NEON_PROJECT_ID`, and state the discovery rule.
- [ ] `check.yml` renders a monorepo answer set with two projects and lints the result.

## Notes

- Repo `legible-consulting/blueprint`. Commits: `feat:`.
- Files: `template/.github/workflows/{% if uat %}promote.yml{% endif %}`, `template/{% if not workspace %}.icm{% endif %}/scripts/` (`promote.sh`, `rollback.sh`, `preview-db.sh`, `lib/vercel.sh`), `template/{% if not workspace %}.icm{% endif %}/{% if uat %}uat{% endif %}/CONTEXT.md`, `template/{% if not workspace %}.icm{% endif %}/{% if database == 'neon' %}database{% endif %}/CONTEXT.md`, `template/.github/workflows/{% if database == 'neon' %}neon-cleanup.yml{% endif %}`.
- A project with no `uat` keeps "Auto-assign Custom Production Domains" on and follows `main`. In `remi-ai`, `marketing` and `documentation` do that.
- The blueprint is public: no client name in the blueprint's files or its pull request.
- The Vercel API filter: `GET /v10/projects?repoUrl=<the repository URL>` lists the projects linked to the repository. A project's custom environments come from `GET /v9/projects/<id>/custom-environments`.
- Out of scope: a change in a client repo. Each client gets the change through `copier update`. `remi-ai` then stops the hand promotion.

## Prompt

Repo legible-consulting/blueprint, desktop or cloud. Attach legible-consulting/house read-only. The ticket is .icm/intake/triage/blueprint-uat-several-projects.md in the house: read it first, then the blueprint's CLAUDE.md. Cut the branch `uat-several-projects` from `main`. Conventional Commits, technical text in Simplified Technical English. Do not run checks locally. Do not merge.
