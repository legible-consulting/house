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
| Vercel `kodominio/happymessmakers` | `ADMIN_PASSWORD` | `Development, Preview, Production` | read: one password on each environment. Give `uat` and Preview their own |
| Neon | no project named `messy-play` or `uat-messy-play` | the three organisations | read which project serves the integration |
| GitHub Actions | no secret and no variable | k0d0minio/messy-play | add `DATABASE_URL`, `VERCEL_TOKEN`, `VERCEL_TEAM` (setup stubs) |
| GitHub | "Automatically delete head branches" off | k0d0minio/messy-play | turn on |

## Proposed change

After the messy-play conformance pull request merges, Jamie does the setup stubs in messy-play's `.icm/intake/setup/`. The first acts: Preview and Development stop reading production.

## Acceptance criteria

- [ ] Vercel Preview and Development of `happymessmakers` never read production's Neon project.
- [ ] `happymessmakers` has the custom environment `uat`, with its database variables.
- [ ] k0d0minio/messy-play has the secrets `DATABASE_URL` and `VERCEL_TOKEN`, and the variable `VERCEL_TEAM`.
- [ ] The open setup stubs in messy-play's `.icm/intake/setup/` are done or have a date.

## Notes

- blocked: the messy-play conformance pull request to the new blueprint tag is not merged.
- Depends on the deletion check in `env-cleanup-remi-ai`: does the integration delete a preview's Neon branch with its git branch?
- Why `main` has no workflow after the v1.0.3 answers: the conformance session reads it first.
