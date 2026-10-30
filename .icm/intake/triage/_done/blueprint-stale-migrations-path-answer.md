# Stub: check-client finds the migrations folder without the retired answer, then no live repo keeps `migrations_path`

- lane: chore
- found-by: blueprint-environments research · 2026-10-29, re-cut by the review of the open tickets · 2026-10-29
- complexity: low
- priority: P1

## Problem

The blueprint removed the question `migrations_path` from `copier.yml` (blueprint pull request 34). Berceo, vinecliff, remi-ai, messy-play and agorasim still have the answer in `.copier-answers.yml`. Messy-play's says `migrations`, a folder that is not there. The first cut of this stub removed the answer at the next conformance. The review found that `check-client.yml` still reads it: `mpath="$(sed -n "s/^migrations_path: *//p" .copier-answers.yml)"` decides when the migration-order check runs. Remove the answer first, and the check stops running in five repos with no error.

## Proposed change

Two steps, in order. First, `check-client.yml` finds the migrations folder another way: the repo's own `check:migrations` script runs on every pull request that changes code, and the script knows its folder, so `check-client.yml` reads no answer. Second, the next conformance run removes the answer from each `.copier-answers.yml`. One pull request on `legible-consulting/.github`, then the conformance pull requests.

## Acceptance criteria

- [ ] `check-client.yml` reads no `migrations_path`. The migration-order step runs when `package.json` defines `check:migrations` and the pull request changes code. The comment above the step says why.
- [ ] The step's cost is measured on one pull request of a live repo and written in the pull request body: the seconds added when no migration changed.
- [ ] After that merge: no `.copier-answers.yml` of a repo tagged `live` in `desk/mani.yaml` has `migrations_path`.
- [ ] `06-kickoff/CONTEXT.md` step 6 passes no `migrations_path` (triage stub `kickoff-stale-lines` carries it, or this stub does when it merges first).

## Notes

- The order is the point. The `.github` change merges before any conformance run that touches the answers.
