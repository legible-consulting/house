# Stub: Where a build runs is a file the blueprint owns, so copier update gives it to every build

- feature-slug: environments-file
- epic: blueprint-environments
- sequence: 6 of 9
- depends-on: environments-table
- complexity: medium
- priority: P2

## Problem

Stub `environments-table` rendered the table into `README.md`. `README.md` is in `_skip_if_exists`, so `copier update` never adds the table to a repo rendered before it. The six live repos get it by a hand edit each, or not at all. Jamie does not want a hand edit across pull requests (2026-10-29).

## Proposed change

The table moves to `.icm/environments.md`, a file the blueprint owns. Copier writes it on `copier copy` and merges it three ways on `copier update`, so a cell a person filled survives a new tag. `README.md.jinja` keeps one line that points at the file. Every blueprint file that reads the table reads the new path. One pull request on `legible-consulting/blueprint`, then a tag, then the move of this stub.

## Acceptance criteria

- [ ] A build render has `.icm/environments.md` with the table of `environments-table`: the five columns, a `UAT` row on `uat` yes only, the `Database` and `Moves on` cells from the answers. A workspace render has no such file.
- [ ] `README.md.jinja` has no table. It has one line that names `.icm/environments.md` as the home of where the build runs.
- [ ] `.icm/environments.md` is not in `_skip_if_exists`.
- [ ] `.icm/intake/CONTEXT.md` § The loop step 7, `.icm/uat/CONTEXT.md`, `promote.sh`, the setup stubs `neon-projects` and `vercel-uat-environment`, and `conventions/README.md` row Environments name `.icm/environments.md` and not `README.md`.
- [ ] `check.yml`'s render job reads the table from the new path, and its comment says so.
- [ ] A `copier update` from the tag before this change to this change adds the file to a render that had the table in `README.md`, and leaves that `README.md` as it was. The update job proves it.

## Out of scope

- The removal of the hand-written table from berceo's and agorasim's `README.md`. Stub `estate-environments-file` does it in the conformance pull request, because `copier update` touches no written-once file.

## Notes

- The file is a blueprint file, so the rule of 2026-10-28 holds: a rule the file must follow lives in a blueprint file that calls it, never in a copied line.
- After the merge, Jamie cuts the tag that `estate-environments-file` waits on.
