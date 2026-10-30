# Stub: berceo keeps only the environment variables that the new blueprint reads

- lane: chore
- found-by: the environment variable inventory for the blueprint Neon redesign · 2026-10-28
- complexity: low
- priority: P2

## Problem

The blueprint stops using `preview-db.sh`, `NEON_API_KEY` and `MIGRATE_AT_BUILD`. berceo keeps the names of the old design. Names only, read 2026-10-28:

| System | Name | Where | Why it goes |
|---|---|---|---|
| GitHub Actions | secret `NEON_API_KEY` | k0d0minio/berceo | no workflow reads it after the conformance |
| GitHub Actions | variable `NEON_PROJECT_ID` | k0d0minio/berceo | no workflow reads it after the conformance |
| GitHub Actions | secret `VERCEL_TOKEN_KODOMINIO` | k0d0minio/berceo | the old name of `VERCEL_TOKEN` |
| Vercel `kodominio/berceo` | `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `MIGRATE_AT_BUILD` | Preview, git branch `triage/communes-bastogne-refnis` | set by `preview-db.sh`. The integration makes the branch now |

The integration's own variables stay: `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `PG*`, `POSTGRES_*`, `NEON_PROJECT_ID`, `NEON_AUTH_BASE_URL`, `VITE_NEON_AUTH_URL` on Production and on `Preview, Development, uat`.

## Proposed change

After the berceo conformance pull request to the new blueprint tag merges, Jamie deletes the names in the table. Then Jamie deletes the Neon branch `preview/triage/communes-bastogne-refnis` in `uat-berceo` when its pull request is closed.

## Acceptance criteria

- [x] k0d0minio/berceo has the secrets `CRON_SECRET`, `DATABASE_URL` and `VERCEL_TOKEN`, the variable `VERCEL_TEAM`, and no other Actions name of the old design.
- [x] Vercel `kodominio/berceo` has no variable scoped to a git branch.
- [ ] `uat-berceo` has no Neon branch of a closed pull request.
- [ ] The open setup stubs in berceo's `.icm/intake/setup/` are done or have a date.

## Notes

- Read 2026-10-30: the berceo conformance pull request `k0d0minio/berceo` #124 merged 2026-10-29, and #125 (the environments file) merged the same day. The blocker is gone.
- Done 2026-10-30: `gh secret delete NEON_API_KEY`, `gh secret delete VERCEL_TOKEN_KODOMINIO` and `gh variable delete NEON_PROJECT_ID` on `k0d0minio/berceo`, checked first against `.github/workflows/` for a reader (none). GitHub Actions on `k0d0minio/berceo` now has only the secrets `CRON_SECRET`, `DATABASE_URL` and `VERCEL_TOKEN`, and the variable `VERCEL_TEAM`.
- Read 2026-10-30: `vercel env ls --scope kodominio` on `berceo` shows no variable scoped to a git branch. The pull request `#107` (`triage/communes-bastogne-refnis`) merged and closed 2026-10-28; its branch-scoped `DATABASE_URL`, `DATABASE_URL_UNPOOLED` and `MIGRATE_AT_BUILD` are already gone.
- Open, waits on Jamie: the Neon branch `preview/triage/communes-bastogne-refnis` in `uat-berceo`. The session has no Neon credential (no `NEON_API_KEY` in the shell, `neonctl` not signed in) and does not hold one by design. Jamie deletes the branch in the Neon console, or gives the session a key.
- Open, waits on Jamie: all 8 setup stubs in berceo's `.icm/intake/setup/` are unchecked with no date (`actions-production-database`, `actions-vercel`, `github-delete-head-branches`, `neon-projects`, `neon-vercel-integration`, `uat-database`, `uat-variables`, `vercel-uat-environment`). Most are dashboard acts (Vercel Storage integration, custom environment `uat`, Pro-plan and domain checks) that need Jamie's hand in the Vercel and Neon consoles, not a credential the session is missing.
- blocked (closed): the berceo conformance pull request to the new blueprint tag is not merged. A deletion before the merge makes the old `preview-db.yml` fail.
- Depends on the deletion check in `env-cleanup-remi-ai`: does the integration delete a preview's Neon branch with its git branch?
- The integration also serves Development from `uat-berceo`. A local session then reads UAT data. Keep it, or give Development a branch of its own? Default: keep.
- The Neon project `berceo` (production) shows no compute activity since 2026-09-29. Read that Production's `DATABASE_URL` comes from it.
- This stub stays in the house until the berceo conformance pull request. That pull request moves each act that is still open into the repo's `.icm/intake/setup/`, one setup stub per act, and moves this stub to `_done/` (why: the blueprint built `setup/` for the acts a person does in a repo, and the house is a second home for them · Jamie, 2026-10-29).
