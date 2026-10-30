# Stub: messy-play stops reading production on Preview and Development, and gets its setup

- lane: chore
- found-by: the environment variable inventory for the blueprint Neon redesign · 2026-10-28
- complexity: medium
- priority: P1

## Problem

messy-play answers `uat: true` and `database: neon` at blueprint v1.0.3, but `main` has no workflow. Its Vercel project is `kodominio/happymessmakers`. Names only, read 2026-10-28:

| System | Name | Where | Action |
|---|---|---|---|
| Vercel `kodominio/happymessmakers` | the integration's `DATABASE_URL`, `PG*`, `POSTGRES_*`, `NEON_PROJECT_ID` | `Production, Preview, Development`, from one Neon project | Preview and a local session read production's data today. Connect Preview to a UAT project, and disconnect Development |
| Vercel `kodominio/happymessmakers` | `ADMIN_PASSWORD` | `Development, Preview, Production` | ~~read: one password on each environment. Give `uat` and Preview their own~~ — dropped, Neon Auth replaces it (Jamie, 2026-10-30) |
| Neon | no project named `messy-play` or `uat-messy-play` | the three organisations | read which project serves the integration |
| GitHub Actions | no secret and no variable | k0d0minio/messy-play | add `DATABASE_URL`, `VERCEL_TOKEN`, `VERCEL_TEAM` (setup stubs) |
| GitHub | "Automatically delete head branches" off | k0d0minio/messy-play | turn on |

## Proposed change

After the messy-play conformance pull request merges, Jamie does the setup stubs in messy-play's `.icm/intake/setup/`. The first acts: Preview and Development stop reading production.

## Acceptance criteria

- [x] Vercel Preview and Development of `happymessmakers` never read production's Neon project (Jamie, 2026-10-30).
- [x] `happymessmakers` has the custom environment `uat` (Jamie, 2026-10-30). Its database variables are a setup stub (`uat-variables`) below; `ADMIN_PASSWORD` is dropped from this stub, not carried to `uat` — see Notes.
- [ ] k0d0minio/messy-play has the secrets `DATABASE_URL` and `VERCEL_TOKEN`, and the variable `VERCEL_TEAM` — open, now tracked in messy-play's own `.icm/intake/setup/actions-vercel.md` and `actions-production-database.md`.
- [ ] The open setup stubs in messy-play's `.icm/intake/setup/` are done or have a date — open: `github-delete-head-branches` (`delete_branch_on_merge` reads `false` today, 2026-10-30) and `uat-variables`, besides the two above.

## Notes

- blocked: the conformance pull request, for the setup stubs only. The first acts, Preview and Development off production's Neon project, wait on no tag: `main` has no workflow that reads them (Jamie, 2026-10-29).
- Depends on the deletion check in `triage/env-cleanup-remi-ai.md`: does the integration delete a preview's Neon branch with its git branch? Still open there, 2026-10-30.
- Why `main` has no workflow after the v1.0.3 answers: the conformance session reads it first.
- ADMIN_PASSWORD: Jamie does not want a password set on `uat` and Preview; Neon Auth replaces the password gate, so this act is dropped rather than done (Jamie, 2026-10-30).
- Closed, 2026-10-30. The messy-play conformance pull request `k0d0minio/messy-play` #10 ("chore: render from the blueprint v1.3.0") merged 2026-10-29, and rendered the 8 setup stubs into `.icm/intake/setup/`, including `actions-vercel`, `actions-production-database`, `github-delete-head-branches` and `uat-variables`. Read 2026-10-30, no token: Vercel Preview/Development disconnect and the `uat` environment are Jamie's word, not independently verified here (no Vercel CLI or token in this session). GitHub reads directly: `k0d0minio/messy-play` has `delete_branch_on_merge: false` and no Actions secret or variable yet — those acts are still open and now live in messy-play's own setup stubs, per this stub's own rule. This stub moves to `_done/`; the remaining acts are Jamie's hand in messy-play's repo, each dated there when done.
