# Stub: The neon workflows of the estate have their secrets, and the failed cleanup runs are green

- lane: chore
- found-by: the blueprint v1.0.0 conformance (`triage/conformance-v1-0-0.md`) · 2026-10-27
- complexity: low
- priority: P2

## Problem

The blueprint `v1.0.0` renders `neon-cleanup.yml` and `preview-db.yml` on a `neon` build, and `promote.yml` on a UAT build. These workflows read the secrets `NEON_API_KEY` and `VERCEL_TOKEN` and the variables `NEON_PROJECT_ID` and `VERCEL_TEAM`. `VERCEL_PROJECT` is optional. Its default is the repository name.

Three repositories do not have all of these. Thus `neon-cleanup` failed after each conformance pull request on 2026-10-27:

| Repo | Has (names only) | Missing | Failed `neon-cleanup` runs |
|---|---|---|---|
| agorasim | `NEON_API_KEY`, `VERCEL_TOKEN_KODOMINIO`, vars `NEON_PROJECT_ID`, `VERCEL_TEAM` | `VERCEL_TOKEN` | [40536221814](https://github.com/k0d0minio/agorasim/actions/runs/40536221814) (`chore/conform-blueprint-v1.0.0`), [40537963972](https://github.com/k0d0minio/agorasim/actions/runs/40537963972) (`chore/retire-legacy-files`) |
| vinecliff | `DATABASE_URL` | `NEON_API_KEY`, `VERCEL_TOKEN`, vars `NEON_PROJECT_ID`, `VERCEL_TEAM` | [40537892167](https://github.com/k0d0minio/vinecliff/actions/runs/40537892167) (`chore/conform-blueprint-v1.0.0`) |
| remi-ai | `SLACK_BOT_TOKEN`, vars `SLACK_*` | `NEON_API_KEY`, `VERCEL_TOKEN`, vars `NEON_PROJECT_ID`, `VERCEL_TEAM` | [40538423938](https://github.com/k0d0minio/remi-ai/actions/runs/40538423938) (`chore/conform-blueprint-v1.0.0`), [40540254064](https://github.com/k0d0minio/remi-ai/actions/runs/40540254064) (`proof/check-client-migration-order`) |

berceo has all of them. Its `VERCEL_TOKEN` was set on 2026-10-27. jamienisbet answers `database: none` and has no neon workflow.

A failed `neon-cleanup` run can leave a Neon preview branch or Vercel preview variables of the closed pull request. Until the secrets exist, every pull request in these three repositories fails the same way, and `preview-db.yml` gives no preview database.

## Proposed change

Jamie sets the missing secrets and variables in each repository: Settings, Secrets and variables, Actions. Then a session re-runs each failed run above and reads the result.

## Acceptance criteria

- [ ] agorasim has the secret `VERCEL_TOKEN`.
- [ ] vinecliff has the secrets `NEON_API_KEY` and `VERCEL_TOKEN`, and the variables `NEON_PROJECT_ID` and `VERCEL_TEAM`.
- [ ] remi-ai has the secrets `NEON_API_KEY` and `VERCEL_TOKEN`, and the variables `NEON_PROJECT_ID` and `VERCEL_TEAM`.
- [ ] Each failed run in the table is re-run and is green.
- [ ] No Neon branch or Vercel preview variable of a closed pull request stays in the three projects.

## Questions

1. remi-ai is a monorepo with six Vercel projects (`admin`, `app`, `demo`, `documentation`, `marketing`, `support`). `VERCEL_PROJECT` defaults to `remi-ai`. Which project gets the preview `DATABASE_URL`? Default: `app`, set as the variable `VERCEL_PROJECT`.
2. agorasim and berceo keep the old secret `VERCEL_TOKEN_KODOMINIO`. Delete it when no workflow reads it? Default: yes.
3. remi-ai's `promote.yml` also reads the secret `DATABASE_URL`, and remi-ai does not have it. Add it to the remi-ai criterion? Default: yes.

## Notes

- Secret values never go in git or in a session. Jamie sets them by hand.
- remi-ai's Vercel projects are on the team `remi21`. Its `VERCEL_TOKEN` is a remi21 token and its `VERCEL_TEAM` is `remi21`. The other two repositories use the team `kodominio`.
- The root `.env.example` lists, per repository, the names that are set and the names that are missing (read 2026-10-28).
- Re-run a failed run with `gh run rerun <id> --repo k0d0minio/<repo>`.
