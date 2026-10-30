# Stub: vinecliff gets a UAT database, and its previews stop reading production

- lane: chore
- found-by: the environment variable inventory for the blueprint Neon redesign · 2026-10-28
- complexity: medium
- priority: P1

## Problem

vinecliff answers `uat: true`, but it has no UAT yet. Names only, read 2026-10-28:

| System | Name | Where | Action |
|---|---|---|---|
| Vercel `kodominio/vinecliff` | the integration's `DATABASE_URL`, `PG*`, `POSTGRES_*`, `NEON_PROJECT_ID` | `Production, Preview`, from the Neon project `vinecliff` | Preview reads production's data today. Connect Preview to a UAT project instead |
| Vercel `kodominio/vinecliff` | no custom environment | — | add `uat` (setup stub `vercel-uat-environment`) |
| Neon | no UAT project | Kodominio organisation | add one (setup stub `neon-projects`) |
| GitHub Actions | only the secret `DATABASE_URL` | k0d0minio/vinecliff | add `VERCEL_TOKEN` and `VERCEL_TEAM` (setup stub `actions-vercel`) |
| GitHub | "Automatically delete head branches" off | k0d0minio/vinecliff | turn on (setup stub `github-delete-head-branches`) |

## Proposed change

After the vinecliff conformance pull request merges, Jamie does the setup stubs in vinecliff's `.icm/intake/setup/`. The first act: Preview stops reading the Neon project `vinecliff`.

## Acceptance criteria

- [ ] Vercel Preview of `kodominio/vinecliff` reads a UAT Neon project, never `vinecliff` — open, 2026-10-30: `.icm/environments.md` still reads "Preview and Production share one `DATABASE_URL`: Preview reads production."
- [ ] Vercel `kodominio/vinecliff` has the custom environment `uat`, with its database variables — open, 2026-10-30: `.icm/environments.md` still reads no custom environment `uat` and no Neon project `uat-vinecliff`.
- [ ] k0d0minio/vinecliff has the secrets `DATABASE_URL` and `VERCEL_TOKEN`, and the variable `VERCEL_TEAM` — partial, 2026-10-30: GitHub Actions has only `DATABASE_URL`; `VERCEL_TOKEN` and `VERCEL_TEAM` are still open.
- [x] The vinecliff conformance pull request to the new blueprint tag is merged (`k0d0minio/vinecliff` #38, "chore: conform to the blueprint v1.3.0", merged 2026-10-29), and the 8 setup stubs render into vinecliff's own `.icm/intake/setup/`. The three rows above are open there, each to be dated when done.

## Notes

- blocked (closed): the conformance pull request, for the setup stubs only, merged 2026-10-29 (#38). The first act, Preview off the Neon project `vinecliff`, waited on no tag and is still open, 2026-10-30 — it is a Vercel setting that no workflow of `main` reads (Jamie, 2026-10-29).
- Resolved, 2026-10-30: the deletion check in `triage/_done/env-cleanup-remi-ai.md` answers **yes**, the integration deletes a preview's Neon branch when its git branch is deleted.
- The slug is `vinecliff-vineyard`, so the setup stubs name `uat-vinecliff-vineyard`. The production project is `vinecliff`. The names are a convention only: no script reads them. Name the UAT project `uat-vinecliff`? Default: yes.
- Session work, not an operator act: vinecliff's `db-migrate.yml` migrates production on each push to `main`, before the sign-off. The conformance triage stub removes it.
- This stub stays in the house until the vinecliff conformance pull request. That pull request moves each act that is still open into the repo's `.icm/intake/setup/`, one setup stub per act, and moves this stub to `_done/` (why: the blueprint built `setup/` for the acts a person does in a repo, and the house is a second home for them · Jamie, 2026-10-29). Closed, 2026-10-30: the conformance pull request has merged, so the three open rows above move with this stub into `_done/`, tracked from here on in vinecliff's own `.icm/intake/setup/`.
