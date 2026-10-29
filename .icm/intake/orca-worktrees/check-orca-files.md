# Stub: The conventions name the Orca files, and CI proves that each build renders them correctly

- feature-slug: check-orca-files
- epic: orca-worktrees
- sequence: 2 of 4
- depends-on: orca-worktree-files
- complexity: low
- priority: P2

## Problem

`conventions/README.md` does not name `orca.yaml` or `.worktreeinclude`, so estate conformance does not compare a repo against them. `check.yml` does not parse the rendered `orca.yaml`, so a template error reaches a client repo.

## Proposed change

`conventions/README.md` gets an Orca row. The `render` job of `check.yml` parses the rendered `orca.yaml` with `yq` in each proof answer set.

## Acceptance criteria

- [ ] `conventions/README.md` has an `Orca` row after the `Goose hints` row. It names the two files, says that they are the blueprint's, says what each holds, and says that a workspace has neither. The row carries its why and the date 2026-10-29.
- [ ] In each build answer set (`defaults`, `all`, `minimal`, `neon-nouat`, `mongodb-uat`), `yq` parses `orca.yaml`, and the step fails when it does not parse.
- [ ] The step checks the keys that breakdown questions 1 to 4 decide. It checks that the `monorepo` set (`all`) has the shared directories of a monorepo render, and that the other build sets have the single-app list.
- [ ] The step checks that each line of `.worktreeinclude` is a literal path that `git check-ignore` ignores in the render.
- [ ] In the `workspace` answer set, the step fails when `orca.yaml` or `.worktreeinclude` exists.
- [ ] `shellcheck` reads the setup script with the other rendered scripts.
- [ ] The comment at the top of the `render` job names the new checks.

## Out of scope

- A run of the setup script in CI. The proof renders have no lockfile.

## Notes

- One pull request on `legible-consulting/blueprint`, then the move of this stub to `_done/` in the house.
- Commit type `ci:` for the check, `docs:` for the row. One pull request carries both.
- `yq` (mikefarah) is on the `ubuntu-latest` runner. If the runner does not have it, install it at a pinned version with its SHA-256, as the job does for `actionlint`.
- After the merge, Jamie cuts the blueprint tag that stub `estate-orca-files` waits on.
