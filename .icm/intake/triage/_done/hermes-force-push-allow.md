# Stub: The Hermes profile `legible` approves no force push in its allow list

- lane: chore
- found-by: the session that started `triage/hermes-cheap-models` · 2026-10-29
- complexity: low
- priority: P1
- done: 2026-10-31, the house copy. The profile's copy and the live test are Jamie's hand

## Problem

`core/setup/hermes/config.yaml` and the profile's copy hold the line `git force push short flag (rewrites remote history)` in `command_allowlist`. This is the key of a dangerous-command pattern in Hermes v0.22.5 (`tools/approval_detection.py`, the pattern `\bgit\s+push\b.*-f\b`). An "always" answer to that prompt wrote the line. Hermes then approves a `git push ... -f` with no prompt at its own layer. `approvals.deny` holds `git push -f*`, and the guard `confirm-git-writes.sh` asks. These two may still stop the command. This session did not test them. The line is the same kind of hole as the `plugin_rule:` entry that the loop walk removed (`goose-worktrees/_done/hermes-loop-walk.md`, R2).

## Proposed change

Remove the line from the house copy and from the profile's copy. `core/stack.md` § The Hermes profile names it beside the `plugin_rule:` rule: no `command_allowlist` key of a Hermes dangerous pattern that rewrites history or force-pushes.

## Acceptance criteria

- [ ] Neither copy of `config.yaml` holds a dangerous-pattern key for a force push or a history rewrite.
- [ ] In a new `hermes -p legible` session, `git push -f origin <scratch-branch>` to a scratch remote is refused or reaches the approval gate. It does not run with no prompt.
- [ ] `core/stack.md` § The Hermes profile, the `config.yaml` row, carries the rule with its why and date.

## Result (2026-10-31)

- The line left `core/setup/hermes/config.yaml`. `core/stack.md` § The Hermes profile, the `config.yaml` row, carries the rule with its why and date.
- The profile's copy on the machine and the `git push -f` test are in `README.md` § Jamie's hand, with the Deny test of `triage/hermes-approval-deny.md`. The result of both goes there and into this file.
