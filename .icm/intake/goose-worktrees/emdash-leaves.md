# Stub: Emdash leaves the stack and the machine

- feature-slug: emdash-leaves
- epic: goose-worktrees
- sequence: 4 of 5
- depends-on: goose-task-script
- complexity: low
- priority: P2

## Problem

`core/stack.md` names Emdash in the toolbox, the install list, the Layout table (`~/.config/emdash/`, `~/.agents/plugins/emdash/`, `~/emdash/worktrees/`) and the hooks paragraph. The machine has the package `emdash` 1.2.9, the plugin, the config line and three task worktrees of the house. `~/.claude/CLAUDE.md` § Worktrees names Emdash as the exception.

## Proposed change

The stack rows are rewritten for `goose-task` and the Emdash rows leave. Jamie removes Emdash from the machine. One pull request on the house.

## Acceptance criteria

- [ ] `core/stack.md` names Emdash nowhere. The toolbox row reads `goose` and `goose-task`.
- [ ] `~/.claude/CLAUDE.md` § Worktrees names `~/goose/worktrees/` and `goose-task done` in place of the Emdash exception. `core/stack.md` quotes the rule.
- [ ] The three Emdash task worktrees of the house are gone, and `git -C ~/Desktop/legible-consulting/house worktree list` shows none under `~/emdash/`.
- [ ] The package `emdash` is not installed, `~/.agents/plugins/emdash/` does not exist, and `~/.config/goose/config.yaml` has no `emdash` line under `plugins:`.
- [ ] `~/.config/emdash/` and `~/emdash/` do not exist.

## Notes

- Jamie's hand, in this order: delete the three tasks in Emdash, so that Emdash removes its own worktrees; `sudo dpkg -r emdash`; remove `~/.agents/plugins/emdash/` and the config line; remove `~/.config/emdash/` and `~/emdash/`. The session writes the stack and asks for each act.
- Question 7 of the breakdown decides when: default after `goose-task` ran one house ticket and one live repo ticket to a merged pull request.
- The memory of Jamie's Claude sessions names the Emdash exception. The session that ships this stub rewrites it for `goose-task`.
