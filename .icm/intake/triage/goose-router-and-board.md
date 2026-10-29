# Stub: The router and the board run in a goose session on a build

- lane: chore
- found-by: the alignment read of the open stubs against goose and Emdash · 2026-10-29
- complexity: medium
- priority: P2

## Problem

A build registers the router `route-request.sh` (UserPromptSubmit) and the board `session-start.sh` (SessionStart) in `.claude/settings.json`. Claude Code reads that file. Goose does not. The goose plugin `~/.agents/plugins/legible-guards/` carries the three guards only. In an Emdash task with goose on a build, no board prints the open tickets at the start, and no router names the case of a prompt. The loop in `.icm/intake/CONTEXT.md` names both as the first things a session gets.

## Proposed change

The plugin `legible-guards` gets two more rules: on SessionStart it runs the repo's `.claude/hooks/session-start.sh`, and on UserPromptSubmit it runs the repo's `.claude/hooks/route-request.sh`, each only when the working directory has the file. The scripts stay the blueprint's, with no second copy. `core/stack.md` § Local machine, the `legible-guards` row, says so. One pull request on the house for the stack row. The plugin files are machine files, as the row says.

## Acceptance criteria

- [ ] In a goose session on a build with `.claude/hooks/session-start.sh`, the open tickets print at the start, as in Claude Code.
- [ ] In the same session, a prompt gets the router's line, as in Claude Code. The output of each hook reaches the model as context, or the stub says that goose cannot do that and what the plugin does instead.
- [ ] In a goose session on a repo with no `.claude/hooks/`, nothing runs and nothing prints.
- [ ] `core/stack.md`, the `legible-guards` row, names the two rules and the two events.
- [ ] The three guards still run in the same session: a `npm test` in a shell call is refused.

## Notes

- Goose supports the two events: the `emdash` plugin registers SessionStart and UserPromptSubmit in its `hooks.json`.
- The guards' matchers name the tools as goose 1.57 sends them: `shell`, `write` and `edit`, as `core/stack.md` says. The adapter maps `write {path, content}` to Write and `edit {path, before, after}` to Edit. The two new rules go into the same `hooks.json`.
