# Stub: The router and the board reach the model in a Hermes session on a build

- feature-slug: plugin-router-and-board
- epic: goose-worktrees
- sequence: 2 of 7
- depends-on: none
- complexity: research
- priority: P2

## Problem

A build registers the router `route-request.sh` (UserPromptSubmit) and the board `session-start.sh` (SessionStart) in `.claude/settings.json`. Claude Code reads that file. Hermes Agent, the agent of the local lane from 2026-10-29, does not. The loop in `.icm/intake/CONTEXT.md` names both as the first things a session gets.

## Proposed change

The profile `legible` runs the repo's `.claude/hooks/session-start.sh` before the first turn and the repo's `.claude/hooks/route-request.sh` on each prompt, each only when the working directory has the file, and passes the output to the model as context. The scripts stay the blueprint's, with no second copy. The hook file is `board-context.sh` of triage stub `hermes-profile-files`. This stub proves it on a build and records the result. One pull request on the house.

## Acceptance criteria

- [ ] In a Hermes session on a build with `.claude/hooks/session-start.sh`, the open tickets reach the model on the first turn, as in Claude Code.
- [ ] In the same session, a prompt gets the router's line as context, as in Claude Code. Or the stub says that Hermes cannot do that and what the profile does instead.
- [ ] In a Hermes session on a repo with no `.claude/hooks/`, nothing runs and nothing prints.
- [ ] `core/stack.md` names the two hooks and the two events, in the rows of `hermes-profile-files`.
- [ ] The three guards still run in the same session: a `npm test` in a shell call is refused.

## Notes

- Re-cut 2026-10-29: goose left the lane in `goose-task-script`, so the goose plugin `legible-guards` is not built. The block on the trial is lifted.
- R3 of `hermes-loop-walk` reads the same result. One walk can record both.
