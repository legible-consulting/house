# Stub: The blueprint names the lane script `ticket`

- lane: chore
- found-by: triage stub `ticket-command` · 2026-10-29
- complexity: low
- priority: P2

## Problem

`conventions/README.md` (Worktree setup row) and `template/.icm/scripts/worktree-setup.sh` (line 6 comment) in `legible-consulting/blueprint` name `goose-task` and `core/setup/goose-task.sh`. The house renamed the script to `ticket` on 2026-10-29.

## Proposed change

Both files name `ticket` and `core/setup/ticket.sh`.

## Acceptance criteria

- [ ] `git grep goose-task` on the blueprint's `main` finds no line.
