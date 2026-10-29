# Stub: A goose session takes one ticket from the board to the merge, and each gap gets a fix or a stub

- feature-slug: goose-loop-walk
- epic: goose-worktrees
- sequence: 6 of 6
- depends-on: plugin-router-and-board, blueprint-new-run-in-worktree
- complexity: research
- priority: P1

## Problem

Goose is the agent of the local lane, and the lane must run the whole loop of `.icm/intake/CONTEXT.md`, step 0 to step 7, on a build. Nobody has walked it in goose. The known differences from Claude Code: the router and the board are Claude Code hooks (stub `plugin-router-and-board`); a guard's ask becomes a block, so a direct `gh api` write that asks (a push to `main`, a ref delete) stops the session and Jamie runs it himself; `.claude/settings.json`'s allow list is not read. `merge.sh` and `release.sh` are not blocked: the guard reads the typed command line, and `bash .icm/scripts/merge.sh <n>` matches no REST pattern (`confirm-git-writes.sh`, header). Jamie's answer of 2026-10-29: if goose stays, the lane completes the loop, or the house finds an agent that does.

## Proposed change

Jamie runs `goose-task` on one open ticket of one live repo and walks the loop to the merge from the goose session. The session records each step, what ran, what goose blocked, and what Jamie did by hand. Each gap becomes a fix in this epic or a triage stub. Then the same on one house ticket. One pull request on the house: the record goes into this stub's `_done/` copy under `## Notes`.

## Acceptance criteria

- [ ] On a live repo: the board printed at session start, the router named the case, `new-run.sh` kept the worktree's branch and opened the pull request, CI ran, the stop report was given, and after Jamie's tick `merge.sh` merged from the goose session.
- [ ] On the house: a triage stub taken to a merged pull request from a goose session.
- [ ] Each step that goose could not do is listed with what Jamie did instead, and each has a fix in this epic or a triage stub with `found-by: goose-loop-walk`.
- [ ] `core/stack.md` § Local machine says which steps of the loop a goose session runs and which Jamie runs by hand, with the date.
- [ ] If a gap has no fix, this stub says so and names the alternative agent to test next, and stub `emdash-leaves` waits.

## Out of scope

- A change to the blueprint's loop. The loop is one for every lane.
- The release and the promotion. One walk proves the merge; `release.sh` is the same shape.

## Notes

- Stub `emdash-leaves` depends on this one: Emdash leaves after the replacement is proved (the breakdown's decision of record).
- The `ask` to `block` rule stays. Jamie runs a direct write by hand or says yes in the chat. It is not a gap of this walk.
