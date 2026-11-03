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

- [ ] k0d0minio/remi-ai has the secrets `DATABASE_URL`, `SLACK_BOT_TOKEN` and `VERCEL_TOKEN`, its `SLACK_*` variables and `VERCEL_TEAM`, and no `NEON_API_KEY` — `NEON_API_KEY` still reads as a secret on `k0d0minio/remi-ai`, 2026-10-30.
- [ ] `remi21/admin` has the custom environment `uat` with the variables it needs, or this stub says why it has none.
- [ ] `ALLOW_NON_PRODUCTION_MIGRATIONS` is gone, or this stub says what still reads it.
- [ ] The integration of `uat-remi-ai` makes a branch for each preview on `app` and `admin`.
- [x] `uat-remi-ai` has no Neon branch of a closed pull request. The integration deleted `preview/test/shared-preview-branch` when the git branch `test/shared-preview-branch` was deleted: `uat-remi-ai` reads clean (Jamie, 2026-10-30). The answer is **yes**, the integration deletes a preview's Neon branch with its git branch.
- [x] The remi-ai conformance pull request to the new blueprint tag is merged (`k0d0minio/remi-ai` #151, "chore: conform to the blueprint v1.3.0", merged 2026-10-29), and the 8 setup stubs render into remi-ai's own `.icm/intake/setup/`. The remaining rows above (`NEON_API_KEY`, `uat` on `admin`, `ALLOW_NON_PRODUCTION_MIGRATIONS`) are open there, each to be dated when done.

## Notes

- The remi-ai conformance pull request merged on 2026-10-29 (#151, to v1.3.0); the "blocked" line below is stale and corrected here, 2026-10-30.
- The shared branch answer is 1: the two apps of one pull request use one Neon branch. The evidence is in `triage/_done/env-check-neon-preview-branching.md` § Notes.
- The Vercel CLI and the house session read `remi21`. The Vercel connector does not.
- The deletion check: the other `env-cleanup-<repo>` stubs read its answer here. A free Neon project allows 10 branches.
- The deletion check, run 2026-10-30: PR #150 ("chore: test the shared Neon preview branch (do not merge)") was closed, not merged, on 2026-10-29, so GitHub's "delete head branches" never fired and the git branch `test/shared-preview-branch` was still on `origin` a day later — the test was never completed as designed. This session deleted that stale branch directly (`git push origin --delete test/shared-preview-branch`, 2026-10-30) to let the Neon integration react. Jamie read the Neon console for `uat-remi-ai` and confirmed it clean, 2026-10-30: the matching branch is gone. **Answer: yes, the integration deletes a preview's Neon branch when its git branch is deleted.** Every other `env-cleanup-*` stub's "Depends on the deletion check" line resolves to this answer.
- This stub stays in the house until the remi-ai conformance pull request. That pull request moves each act that is still open into the repo's `.icm/intake/setup/`, one setup stub per act, and moves this stub to `_done/` (why: the blueprint built `setup/` for the acts a person does in a repo, and the house is a second home for them · Jamie, 2026-10-29). Closed, 2026-10-30: the conformance pull request merged (#151) and the deletion-check answer, the one reason this stub stayed open past the merge, has landed. The rows still open (`NEON_API_KEY`, `uat` on `admin`, `ALLOW_NON_PRODUCTION_MIGRATIONS`) are tracked in remi-ai's own `.icm/intake/setup/`, for Jamie to date there.
