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

## Result (2026-10-29)

Hermes Agent v0.22.5, profile `legible`, CLI `hermes -p legible chat -Q --oneshot -t terminal --in <dir>`. The hook is `~/.hermes/profiles/legible/board-context.sh` on `pre_llm_call`, at the version that the notes of `triage/hermes-profile-files` describe. `hermes -p legible hooks doctor` reported each hook as allowlisted and unchanged since approval. The blueprint's two scripts ran from the build, with no copy. Each criterion, in order:

1. **Met.** The build was `projects/agorasim` (its `main`, 27 commits behind `origin/main`). Session `local-0518b05862c8…`, turn 1. The model quoted the context verbatim: the line `Session start, repo …/agorasim. "The board" means this repo's .icm/intake/ …`, then the output of `session-start.sh` (5 epics, triage 9 open, the Order, 1 started ticket, 21 open stubs). This is the same text as `bash .claude/hooks/session-start.sh` in the clone.
2. **Met.** Turn 1, prompt "fix the login bug on the signup page": the context had the router's line `[router] Suggest: .icm/lanes/bug/CONTEXT.md …`. Turn 2 (`--resume` of the same session), prompt "change the button colour on the tours page": the context had `[router] Suggest: .icm/lanes/tweak/CONTEXT.md …` only. The board did not come again. The router runs on each turn. The board runs on the first turn only (`extra.is_first_turn`).
3. **Met.** `library` has no `.claude/`. Session `local-b57728c9eb67…`, same first-turn prompt: the model answered `NONE`. A direct run of `board-context.sh` with that `cwd` printed 0 bytes and exited 0. The house has `.claude/hooks/` with the guards only. The hook finds no `session-start.sh` and no `route-request.sh` there, so it prints nothing. This desktop session, in `~/Desktop/legible-consulting`, got no board.
4. **Met** in the same pull request: `core/stack.md` § Local machine has the rows.
5. **Met.** Turn 3 of session `local-0518b05862c8…`: the model ran `npm test` with the `terminal` tool. The tool returned `{"error": "Blocked (build/lint/typecheck/test): …"}` from `block-local-checks.sh` through `guard-adapter.sh`. The command did not run.

Under the gateway (the desktop app), Hermes v0.22.5 sends `cwd` = `~/.hermes` to shell hooks. The hook reads the session's `cwd` from `state.db` first. A direct run with the payload `cwd` `~/.hermes` and the session id of the agorasim session gave the router's tweak line. Thus the fallback finds the build. This walk did not open a desktop session on a build. R3 of `hermes-loop-walk` reads that path in its walk.

Shims: 1. `board-context.sh`, owned by the house, to be stored in `core/setup/hermes/` by `triage/hermes-profile-files`. The `state.db` lookup in it stays until a Hermes release fixes the payload `cwd` (the same stub).
