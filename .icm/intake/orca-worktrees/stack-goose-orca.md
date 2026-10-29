# Stub: A fresh machine gets Goose and Orca from the stack, with the paths that each one uses

- feature-slug: stack-goose-orca
- epic: orca-worktrees
- sequence: 3 of 4
- depends-on: none
- complexity: low
- priority: P2

## Problem

Goose and Orca run on the local lane from 2026-10-29. `core/stack.md` § Local machine does not name them: not the install, not the config paths, not the guards plugin, not the folder of the Orca worktrees.

## Proposed change

`core/stack.md` § Local machine gets the rows for Goose and Orca (`core/CONTEXT.md`).

## Acceptance criteria

- [ ] The fresh-machine list says how to install Goose and Orca, and how to sign in to each one where a sign-in is necessary.
- [ ] The Layout table has a row for each path: the Goose config folder `~/.config/goose/`, the Orca folders `~/.config/orca/` and `~/.orca/`, the guards plugin `~/.agents/plugins/legible-guards/`, and the worktree folder `~/orca/workspaces/`.
- [ ] The `~/orca/workspaces/` row says that Orca makes and removes the worktrees there, and that no person and no hook removes one by hand. It uses the why of `~/.claude/CLAUDE.md` § Worktrees, with its date.
- [ ] The guards plugin row says which guards it carries and how they relate to the three guards in `~/.claude/hooks/`.
- [ ] No row holds a secret, a token or the content of `~/.config/goose/secrets.yaml`.

## Out of scope

- The Orca settings themselves, and the `orca.yaml` of any repo.

## Notes

- One pull request on `legible-consulting/house`. The same pull request moves this stub to `_done/`.
- Commit type `docs:` or `chore:`, as `core/CONTEXT.md` asks.
- Read each path on the machine on the day of the work. Do not copy a path from this stub without a check. Jamie confirms each fact that the session cannot read.
- If the stack lists Goose and Orca in the toolbox, `core/setup/local.sh` gets the `ok` or `MISSING` line for each in the same pull request (`core/CONTEXT.md`).
