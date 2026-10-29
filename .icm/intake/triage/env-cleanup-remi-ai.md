# Stub: remi-ai keeps only the environment variables that the new blueprint reads

- lane: chore
- found-by: the environment variable inventory for the blueprint Neon redesign · 2026-10-28
- complexity: medium
- priority: P2

## Problem

The blueprint stops using `preview-db.sh`, `NEON_API_KEY` and `MIGRATE_AT_BUILD`. remi-ai's Vercel projects are on the team `remi21`, and its Neon projects `remi-ai` and `uat-remi-ai` are in the Neon organisation Remi AI. Names only, read 2026-10-28:

| System | Name | Where | Action |
|---|---|---|---|
| GitHub Actions | secret `NEON_API_KEY` | k0d0minio/remi-ai | delete: no workflow reads it after the conformance |
| Vercel `remi21/admin` | `ALLOW_NON_PRODUCTION_MIGRATIONS` | Preview | read: the build now migrates each preview's own branch. Delete it when `db:migrate` no longer reads it |
| Vercel `remi21/admin` | no variable on `uat` | — | read: does `admin` have the custom environment `uat`? The UAT promotion needs it on each app that the client tests |
| Vercel `remi21/marketing`, `remi21/documentation` | no variable | — | none: they read no database and follow `main` |
| Vercel `remi21/app`, `remi21/admin` | `DATABASE_URL`, `PGHOST`, `NEON_PROJECT_ID` | Preview and Development, all branches | read: the API shows no integration that owns them (2026-10-29). Not owned: delete them, by the rule "No `DATABASE_URL` on Preview for all branches". Owned: a blueprint triage stub changes that rule |

The integration's own variables stay: `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `PG*`, `POSTGRES_*`, `NEON_PROJECT_ID`, `NEON_AUTH_BASE_URL`, `VITE_NEON_AUTH_URL` on `app` and `admin`.

## Proposed change

After the remi-ai conformance pull request to the new blueprint tag merges, Jamie does the actions in the table.

## Acceptance criteria

- [ ] k0d0minio/remi-ai has the secrets `DATABASE_URL`, `SLACK_BOT_TOKEN` and `VERCEL_TOKEN`, its `SLACK_*` variables and `VERCEL_TEAM`, and no `NEON_API_KEY`.
- [ ] `remi21/admin` has the custom environment `uat` with the variables it needs, or this stub says why it has none.
- [ ] `ALLOW_NON_PRODUCTION_MIGRATIONS` is gone, or this stub says what still reads it.
- [ ] The integration of `uat-remi-ai` makes a branch for each preview on `app` and `admin`.
- [ ] `uat-remi-ai` has no Neon branch of a closed pull request. The integration deleted `preview/test/shared-preview-branch` when the git branch `test/shared-preview-branch` was deleted, or this stub says that it did not.
- [ ] The open setup stubs in remi-ai's `.icm/intake/setup/` are done or have a date.

## Notes

- blocked: the remi-ai conformance pull request to the new blueprint tag is not merged.
- The shared branch answer is 1: the two apps of one pull request use one Neon branch. The evidence is in `triage/_done/env-check-neon-preview-branching.md` § Notes.
- The Vercel CLI and the house session read `remi21`. The Vercel connector does not.
- The deletion check: the other `env-cleanup-<repo>` stubs read its answer here. A free Neon project allows 10 branches.
