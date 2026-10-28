# Stub: Every live repo is on the blueprint v1.0.0, with its own answers and its own CLAUDE.md rows

- feature-slug: conformance-v1-0-0
- lane: chore
- found-by: blueprint-pipeline · 2026-10-27
- complexity: medium
- priority: P1

## Problem

The blueprint `v1.0.0` exists. Each live repo in `desk/mani.yaml` names `v0.6.0` or `v0.8.0` in its `.copier-answers.yml`. `copier update` changes only the files the blueprint renders. It does not change the legacy files of the live repos or their hand-written `CLAUDE.md`. Thus, after the update, each repo still carries the old pipeline beside the new one. Its `CLAUDE.md` also still says that the merge is a human's.

A local dry run on berceo, on 2026-10-27, updated `v0.8.0` to `bd48742` (the commit of `v1.0.0`) with no conflict. The router test passed (83 of 83). The board, `new-run.sh --dry-run`, `close-out.sh` and the refusals of `merge.sh` worked on a fake epic. The dry run also found the answer and row errors below.

## Proposed change

One conformance pull request per live repo, as `conformance/CONTEXT.md` says. Each pull request gives the answers by hand and lists the legacy files for Jamie's decision. Then it writes the `CLAUDE.md` rows that the repo needs.

## Acceptance criteria

- [ ] `desk/mani.yaml` names the path `~/Desktop/legible-consulting/projects/berceo` for berceo. The clone moved there on 2026-10-27.
- [ ] Each live repo runs `copier update --vcs-ref v1.0.0` with each answer from the table below, by `--data`, never by `--defaults`. Jamie confirms each value that the table marks `Jamie`.
- [ ] Each repo's `.copier-answers.yml` on `main` says `_commit: v1.0.0`.
- [ ] The drift report lists the legacy files of each repo from the retire list below. Jamie decides each removal. The report removes nothing (`conformance/CONTEXT.md`).
- [ ] Each repo's `CLAUDE.md` has the hand-written rows below. Each row uses the words of the blueprint's `template/CLAUDE.md.jinja` at `v1.0.0`.
- [ ] The `check` run on each conformance pull request is green.

### The answers to give

| Repo | On | workspace | monorepo | release | uat | database | migrations_path |
|---|---|---|---|---|---|---|---|
| berceo | v0.8.0 | false | false | true | true | neon | drizzle |
| vinecliff | v0.6.0 (tier app) | false | false | Jamie | Jamie | neon | drizzle |
| agorasim | v0.8.0 | false | true | true | true | neon | web/drizzle |
| remi-ai | v0.6.0 (tier platform) | false | true | Jamie | Jamie | neon | packages/services/src/db/migrations |
| jamienisbet | v0.6.0 (tier app) | false | false | Jamie | Jamie | none | not asked |

- The default of `migrations_path` is `migrations`. No live repo uses that folder. On a wrong answer, `preview-db.yml` never runs, and no failure shows it.
- In the berceo dry run, `monorepo` was answered `true`. Berceo has no `apps/` and no `packages/`. The table says `false`.
- The `database` and `migrations_path` values come from each repo's tree and `CLAUDE.md` on 2026-10-27. Jamie confirms them before the run.

### The retire list

The legacy template's files, as found on each repo's `main` on 2026-10-27:

| Repo | Legacy files |
|---|---|
| berceo | `.icm/CONTEXT.md`. It names `uat-db.sh`, and `v1.0.0` deletes that script. |
| vinecliff | `.icm/CONTEXT.md` |
| agorasim | `.icm/CONTEXT.md`, `.icm/project.md` |
| remi-ai | `.icm/CONTEXT.md`, `.github/workflows/release.yaml`, `.github/workflows/quality.yaml` |
| jamienisbet | none |

No repo carries `.opencode/` or `opencode.jsonc` on `main`. Check again at the run. remi-ai's `CLAUDE.md` says that `release.yaml` deploys production on the merge. Do not remove it until the blueprint's `ci.yml` does that work in remi-ai.

### The hand-written CLAUDE.md rows

Every live repo needs these rows in its routing table. No repo has them today:

- `fix a bug, make a tweak or do a chore, with or without a stub` → `.icm/lanes/<lane>/CONTEXT.md`.
- `fix a fault that production shows now` → `.icm/lanes/hotfix/CONTEXT.md`.
- `do work that has no ticket` → `.icm/intake/CONTEXT.md` § A request with no stub.
- `answer a question about the build, or review` → read and answer. No stub, no branch, no pull request.
- `merge after the tick`, with `, or release` on a `release` build and `, release or promote` on a UAT build → `.icm/intake/CONTEXT.md` § The loop, step 7.
- On a `neon` build: `change the database, or read where a preview's database comes from` → `.icm/database/CONTEXT.md`, then `preview-db.sh`.

Every live repo needs this change in its rules:

- Replace "The merge is a human's" (or "The merge is Jamie's") with the blueprint's line: Jamie ticks Ready to merge, and the session merges with `.icm/scripts/merge.sh`. On a `release` build, add the line about Jamie's word `release` and `.icm/scripts/release.sh`.

Per repo:

- berceo: the `Release` section and the UAT rule say that Jamie merges the release pull request and that a session never dispatches `promote.yml`. Replace both with the blueprint's UAT rule. Remove "tier `app`" from the first paragraph. `.icm/intake/README.md` has no `## Order` and four open epics. Thus the board prints no order, and `new` cannot take the next stub. Add the `## Order` list. Jamie sets it.
- agorasim: the same `Release` section and UAT rule as berceo. Keep the Apps and packages table.
- vinecliff, remi-ai, jamienisbet: the merge rule only. remi-ai keeps its release text until the retire decision on `release.yaml`.

## Out of scope

- The conformance pull requests themselves: `conformance/CONTEXT.md`.
- A change to the blueprint. The dry run found no defect in the blueprint.

## Notes

- Read `conformance/CONTEXT.md` before the run. The run is Jamie's hand from the local lane (`~/Desktop/legible-consulting/projects/<slug>/`).
- The dry run's local branches in berceo are `dryrun/blueprint-v1` and `zz-beta`. They are not pushed. Delete them before the conformance run.
