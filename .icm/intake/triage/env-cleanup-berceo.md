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

- [ ] k0d0minio/berceo has the secrets `CRON_SECRET`, `DATABASE_URL` and `VERCEL_TOKEN`, the variable `VERCEL_TEAM`, and no other Actions name of the old design.
- [ ] Vercel `kodominio/berceo` has no variable scoped to a git branch.
- [ ] `uat-berceo` has no Neon branch of a closed pull request.
- [ ] The open setup stubs in berceo's `.icm/intake/setup/` are done or have a date.

## Notes

- blocked: the berceo conformance pull request to the new blueprint tag is not merged. A deletion before the merge makes the old `preview-db.yml` fail.
- Depends on `env-check-neon-preview-branching`.
- The integration also serves Development from `uat-berceo`. A local session then reads UAT data. Keep it, or give Development a branch of its own? Default: keep.
- The Neon project `berceo` (production) shows no compute activity since 2026-09-29. Read that Production's `DATABASE_URL` comes from it.
