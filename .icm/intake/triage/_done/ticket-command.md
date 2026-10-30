# Stub: The lane script is `ticket` and its worktrees are in `~/worktrees/`

- lane: chore
- found-by: Jamie in the session of `goose-worktrees/hermes-loop-walk` · 2026-10-29
- complexity: low
- priority: P1

## Problem

The lane script is `goose-task` and its folder is `~/goose/worktrees/`. Goose left the machine on 2026-10-29, so the name no longer says what the script does.

## Proposed change

Rename the script to `ticket` and its folder to `~/worktrees/`. The behaviour does not change.

## Acceptance criteria

- [ ] `core/setup/ticket.sh` replaces `core/setup/goose-task.sh`. Its usage, messages and environment variables (`TICKET_ROOT`, `TICKET_HERMES_CONFIG`) say `ticket`.
- [ ] `core/setup/local.sh` links `~/.local/bin/ticket` and removes the old link `goose-task` when it points at no file.
- [ ] `core/stack.md`, `core/setup/hermes/SOUL.md`, `core/setup/hermes/config.yaml`, the `goose-worktrees` breakdown and the open stubs say `ticket` and `~/worktrees/`. The breakdown records the decision that replaces "the name stays".
- [ ] Stubs in `_done/` and `research/verdicts/goose.md` keep the old name: they are history.
- [ ] After the merge, on the machine: `local.sh` runs from `main`. `~/.claude/CLAUDE.md` § Worktrees and `~/.claude/hooks/reap-worktrees.sh` say `~/worktrees/`. `~/goose/` is removed when it is empty.

## Notes

- The epic slug `goose-worktrees` stays: a path is a ticket's identity.
- The blueprint names the script in `conventions/README.md` and `worktree-setup.sh`. That change is triage stub `blueprint-ticket-name` (one session, one repo).
