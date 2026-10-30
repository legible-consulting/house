# Stub: agorasim keeps only the environment variables that the new blueprint reads

- lane: chore
- found-by: the environment variable inventory for the blueprint Neon redesign · 2026-10-28
- complexity: low
- priority: P2

## Problem

The blueprint stops using `preview-db.sh`, `NEON_API_KEY` and `MIGRATE_AT_BUILD`. agorasim keeps the names of the old design. Names only, read 2026-10-28:

| System | Name | Where | Why it goes |
|---|---|---|---|
| GitHub Actions | secret `NEON_API_KEY` | k0d0minio/agorasim | no workflow reads it after the conformance |
| GitHub Actions | variable `NEON_PROJECT_ID` | k0d0minio/agorasim | no workflow reads it after the conformance |
| GitHub Actions | secret `VERCEL_TOKEN_KODOMINIO` | k0d0minio/agorasim | the old name of `VERCEL_TOKEN` |
| Vercel `kodominio/agorasim` | `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `MIGRATE_AT_BUILD` | Preview, git branch `balance-payable-from-deposit` | set by `preview-db.sh`. The integration makes the branch now |

The integration's own variables stay: `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `PG*`, `POSTGRES_*`, `NEON_PROJECT_ID`, `NEON_AUTH_BASE_URL`, `VITE_NEON_AUTH_URL` on Production and on `Preview, uat`.

## Proposed change

After the agorasim conformance pull request to the new blueprint tag merges, Jamie deletes the names in the table. Then Jamie deletes the Neon branch `preview/balance-payable-from-deposit` in `uat-agorasim` when its pull request is closed.

## Acceptance criteria

- [x] k0d0minio/agorasim has the secrets `DATABASE_URL` and `VERCEL_TOKEN`, the variable `VERCEL_TEAM`, and no other Actions name of the old design.
- [x] Vercel `kodominio/agorasim` has no variable scoped to a git branch.
- [x] `uat-agorasim` has no Neon branch of a closed pull request.
- [x] The open setup stubs in agorasim's `.icm/intake/setup/` are done or have a date.

## Notes

- blocked: the agorasim conformance pull request to the new blueprint tag is not merged. A deletion before the merge makes the old `preview-db.yml` fail.
- Depends on the deletion check in `env-cleanup-remi-ai`: does the integration delete a preview's Neon branch with its git branch?
- The `uat` variables of the app (`ADMIN_SESSION_SECRET`, `BOOKING_*`, `STRIPE_*`, `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`) stay.
- This stub stays in the house until the agorasim conformance pull request. That pull request moves each act that is still open into the repo's `.icm/intake/setup/`, one setup stub per act, and moves this stub to `_done/` (why: the blueprint built `setup/` for the acts a person does in a repo, and the house is a second home for them · Jamie, 2026-10-29).
- Closed, 2026-10-30. The conformance pull request `k0d0minio/agorasim` #242 merged 2026-10-29, and its head branch `balance-payable-from-deposit` is gone, with it. GitHub Actions on `k0d0minio/agorasim` now has only the secrets `DATABASE_URL` and `VERCEL_TOKEN` and the variable `VERCEL_TEAM`; `NEON_API_KEY`, `VERCEL_TOKEN_KODOMINIO` and the variable `NEON_PROJECT_ID` are gone. Vercel `kodominio/agorasim` has no variable scoped to a git branch (`vercel env ls` shows `DATABASE_URL`/`DATABASE_URL_UNPOOLED` on `Preview, uat` only, the integration's own, matching `env-cleanup-remi-ai`'s answer). `uat-agorasim` holds only `main` and the live `preview/release-please-...` branch — no branch of a closed pull request. The 7 setup stubs in agorasim's `.icm/intake/setup/` (`actions-production-database`, `actions-vercel`, `github-delete-head-branches`, `neon-projects`, `neon-vercel-integration`, `uat-database`, `uat-variables`, `vercel-uat-environment`) were checked against GitHub, Vercel and Neon directly and all are done; agorasim's own pull request closes them out.
