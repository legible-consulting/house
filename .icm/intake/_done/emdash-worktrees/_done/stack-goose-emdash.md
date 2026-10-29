# Stub: A fresh machine gets Goose and Emdash from the stack, with the paths that each one uses

- feature-slug: stack-goose-emdash
- epic: emdash-worktrees
- sequence: 3 of 4
- depends-on: none
- complexity: low
- priority: P2

## Problem

Goose and Emdash run on the local lane from 2026-10-29. `core/stack.md` § Local machine does not name them: not the install, not the config paths, not the guards plugin, not the folder of the Emdash worktrees.

## Proposed change

`core/stack.md` § Local machine gets the rows for Goose and Emdash (`core/CONTEXT.md`).

## Acceptance criteria

- [ ] The fresh-machine list says how to install Goose (CLI and desktop) and Emdash (the `.deb`), and how to sign in to each one where a sign-in is necessary. Goose takes the Anthropic key in its keyring, never in a file.
- [ ] The Layout table has a row for each path: the Goose config folder `~/.config/goose/` with its `.goosehints`, the Emdash config folder, the guards plugin `~/.agents/plugins/legible-guards/`, and the worktree folder `~/emdash/worktrees/`.
- [ ] The `~/emdash/worktrees/` row says that Emdash makes and removes the worktrees there, and that no person and no hook removes one by hand. It uses the why of `~/.claude/CLAUDE.md` § Worktrees, with its date.
- [ ] The guards plugin row says which guards it carries and how they relate to the three guards in `~/.claude/hooks/`: one adapter, the same three scripts, and a repo copy wins.
- [ ] No row holds a secret, a token or the content of `~/.config/goose/secrets.yaml`.

## Out of scope

- The Emdash settings themselves, and the `.emdash.json` of any repo.

## Notes

- One pull request on `legible-consulting/house`. The same pull request moves this stub to `_done/`.
- Commit type `docs:` or `chore:`, as `core/CONTEXT.md` asks.
- Read each path on the machine on the day of the work. Do not copy a path from this stub without a check. Jamie confirms each fact that the session cannot read.
- If the stack lists Goose and Emdash in the toolbox, `core/setup/local.sh` gets the `ok` or `MISSING` line for each in the same pull request (`core/CONTEXT.md`).
