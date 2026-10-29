# Stub: The conventions name the Emdash file, and CI proves that each build renders it correctly

- feature-slug: check-emdash-files
- epic: emdash-worktrees
- sequence: 2 of 4
- depends-on: emdash-worktree-files
- complexity: low
- priority: P2

## Problem

`conventions/README.md` does not name `.emdash.json`, so estate conformance does not compare a repo against it. `check.yml` does not parse the rendered `.emdash.json`, so a template error reaches a client repo.

## Proposed change

`conventions/README.md` gets an Emdash row. The `render` job of `check.yml` parses the rendered `.emdash.json` with `jq` in each proof answer set.

## Acceptance criteria

- [ ] `conventions/README.md` has an `Emdash` row after the `Goose hints` row. It names the file and the script, says that they are the blueprint's, says what each holds, and says that a workspace has neither. The row carries its why and the date 2026-10-29.
- [ ] In each build answer set (`defaults`, `all`, `minimal`, `neon-nouat`, `mongodb-uat`), `jq` parses `.emdash.json`, and the step fails when it does not parse.
- [ ] The step checks the install script key from the breakdown's question 1, and `preservePatterns` with `.env` and `.env.local` and nothing else.
- [ ] The step checks that each entry of `preservePatterns` is a literal path that `git check-ignore` ignores in the render.
- [ ] In the `workspace` answer set, the step fails when `.emdash.json` or the setup script exists.
- [ ] `shellcheck` reads the setup script with the other rendered scripts.
- [ ] The comment at the top of the `render` job names the new checks.

## Out of scope

- A run of the setup script in CI. The proof renders have no lockfile.

## Notes

- One pull request on `legible-consulting/blueprint`, then the move of this stub to `_done/` in the house.
- Commit type `ci:` for the check, `docs:` for the row. One pull request carries both.
- `jq` is on the `ubuntu-latest` runner.
- After the merge, Jamie cuts the blueprint tag that stub `estate-emdash-files` waits on.
