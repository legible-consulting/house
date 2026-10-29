# Stub: A monorepo build with UAT gives each app of a pull request the same preview database

- lane: chore
- found-by: Jamie, `k0d0minio/remi-ai` pull request 148 · 2026-10-28
- complexity: medium
- priority: P2

## Problem

Blueprint pull request 36 states the migration rule for a monorepo in `.icm/database/CONTEXT.md`. Each app that reads the database names `db:migrate` and `db:verify` in its own `package.json`, and its `vercel.json` has the line `"buildCommand": "bash ../../.icm/scripts/vercel-build.sh turbo run build"`. The script migrates before turbo starts, so `turbo.json` names no variable. The advisory lock of `db:migrate` makes two apps that migrate one database wait for each other. `check.yml` proves the line in the answer set `all` (monorepo, UAT, Neon).

UAT and production are correct with several apps on one database. Each UAT project reads the default branch of `uat-<slug>`, and `promote.yml` migrates `<slug>` one time for all the UAT projects.

Preview is not proved. The Neon integration names each preview branch `preview/<git branch>`. That name comes from the git branch, not from the Vercel project. Two apps of one pull request ask for the same name. No Neon or Vercel document says what the integration does for the second app:

1. It uses the branch of the first app. Then the rule of pull request 36 is correct.
2. It makes a second branch. Then the two apps of one preview read different data.
3. It fails. Then the second app's build has no `DATABASE_URL`, and the build stops.

The Neon-managed integration connects each Neon project to exactly one Vercel project. The Vercel-managed integration lets several projects connect to one database, but its document does not say what happens to the preview branch. A user on Neon's Discord reports the same monorepo case: one project is the "primary integration", and the other projects get no branch variables.

The database contract's setup act 2, `neon-vercel-integration`, puts the integration on each Vercel project of the build. That act is correct only for answer 1.

## Proposed change

1. Jamie turns on "Create database branch for deployment" for Preview on the remi-ai Vercel projects `app` and `admin`, with the Vercel-managed integration, both connected to `uat-remi-ai`.
2. Jamie pushes one test branch that changes the two apps, and the two preview builds start.
3. A session reads the branches of the Neon project `uat-remi-ai` and the two build logs. It records the answer (1, 2 or 3) in `triage/_done/env-check-neon-preview-branching.md` § Notes, because `env-cleanup-remi-ai` reads the answer there.
4. Jamie closes the pull request and deletes the test branch. The session reads that each preview branch is gone.

Steps 1 to 3 are done on 2026-10-29: answer 1. Step 4 is in `env-cleanup-remi-ai`.

Then the blueprint follows the answer:

- Answer 1: the database contract and setup act 2 say that each app of a monorepo connects to the same database, and that one pull request has one Neon branch.
- Answer 2 or 3: a blueprint pull request gives each app of a pull request the same branch. A workflow makes the branch `preview/<git branch>` and puts its connection strings, scoped to the git branch, on each Vercel project of the repository that reads the database. This changes the decision "No script and no workflow of this build makes or deletes a branch" in `.icm/database/CONTEXT.md`, so Jamie decides before the build.

## Acceptance criteria

- [ ] `triage/_done/env-check-neon-preview-branching.md` § Notes records the answer: the two apps of one remi-ai pull request use one Neon branch, one branch each, or the second build fails.
- [ ] `.icm/database/CONTEXT.md` in the blueprint and its setup act `neon-vercel-integration` say how the apps of a monorepo get the database of a preview, and the statement agrees with the answer.
- [ ] `check.yml` renders the answer set `all` with the changed contract and lints the result.

## Notes

- Repo `legible-consulting/blueprint`. Commits: `feat:` or `fix:`.
- Files: `template/{% if not workspace %}.icm{% endif %}/{% if database == 'neon' %}database{% endif %}/CONTEXT.md`, `template/{% if not workspace %}.icm{% endif %}/intake/{% if uat or database == 'neon' %}setup{% endif %}/{% if database == 'neon' %}neon-vercel-integration.md{% endif %}.jinja`, `check.yml`.
- The Vercel projects of remi-ai are on the team `remi21`. The Vercel connector does not read `remi21`. The Vercel CLI does.
- On 2026-10-29 the test made one Neon branch, `preview/test/shared-preview-branch`, in `uat-remi-ai`. `env-cleanup-remi-ai` checks that it is deleted.
- The integration gives the branch's variables to each deployment only. No variable is scoped to the git branch on a Vercel project. The branch's `DATABASE_URL` wins over a Preview `DATABASE_URL` for all branches (remi-ai, 2026-10-29).
- Turbo's strict environment mode gives a build only the names in `turbo.json`. The builds warn that `PG*` and `POSTGRES_*` do not reach them. `DATABASE_URL` and `DATABASE_URL_UNPOOLED` must stay in `turbo.json` (remi-ai, 2026-10-29).
- Sources: [Neon: Vercel-managed integration](https://neon.com/docs/guides/vercel-managed-integration), [Neon: Neon-managed integration](https://neon.com/docs/guides/neon-managed-vercel-integration), [Neon Discord: "Script to set Vercel preview branch env vars?"](https://www.answeroverflow.com/m/1359642662445121627).
- Related: the answer and its evidence are in `triage/_done/env-check-neon-preview-branching.md` § Notes. `env-cleanup-remi-ai` holds the deletion check.
- The blueprint is public: no client name in the blueprint's files or its pull request.
- Out of scope: a change in a client repo. Each client gets the change through `copier update`.

## Prompt

A goose session in a worktree of legible-consulting/blueprint, made by `goose-task ~/Desktop/legible-consulting/blueprint monorepo-preview-database`. The worktree is on that branch: cut no branch. The ticket is .icm/intake/triage/blueprint-monorepo-uat-build.md in the house clone at ~/Desktop/legible-consulting/house: read it first, then `triage/_done/env-check-neon-preview-branching.md` § Notes in the same clone for the remi-ai answer, then the blueprint's CLAUDE.md. Stop when the answer is not recorded. Conventional Commits, technical text in Simplified Technical English. Do not run checks locally. Do not merge.
