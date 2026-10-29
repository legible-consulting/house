# Stub: The Hermes profile `legible` has a home in the house, and the installer's `.env` is gone

- lane: chore
- found-by: the Hermes trial session · 2026-10-29
- complexity: low
- priority: P1

## Problem

The trial of `goose-worktrees/hermes-loop-walk` installed Hermes Agent v0.22.5 and the profile `legible` on 2026-10-29, with the bare minimum to run. Four files live only in `~/.hermes/profiles/legible/` and no repo holds them: `config.yaml` (provider, the keyring helper, approvals, allow list, writers, hooks), `SOUL.md`, `guard-adapter.sh` and `board-context.sh`. Three things are open:

- The installer wrote `~/.hermes/.env` with 11 uncommented `KEY=` lines. The session could not read it (the read guard denies `.env`), so it does not know whether they are keys or settings. The stub `hermes-loop-walk` needs it gone or named as an exception in `core/stack.md`.
- `skills.external_dirs` holds one entry per worktree (`<worktree>/.claude/skills`), written by hand for the first ticket. Each new ticket needs its own entry until the lane script writes it, or the repo carries `.agents/skills` (Hermes reads that folder by itself).
- Only Anthropic is configured. R6 of `hermes-loop-walk` (`/model` to a second provider) needs a second key, OpenRouter by the stub.
- Hermes v0.22.5 sends the wrong `cwd` to shell hooks when a session runs through the gateway (the desktop app, or a CLI attached to it). `agent/shell_hooks.py` `_payload_fields` reads `Path.cwd()`, the gateway process's directory (`~/.hermes`), and not `session_cwd()`, the session's workspace. The plugin API uses `session_cwd()`. Nobody reported this upstream yet.

## Proposed change

`core/setup/hermes/` carries the four files, and `core/setup/local.sh` installs them into the profile. Jamie reads the key names of `~/.hermes/.env` with `grep -oE '^[A-Za-z_]+=' ~/.hermes/.env` and deletes the file when no line is a key he set. The lane script `goose-task` appends the worktree's `.claude/skills` to `skills.external_dirs` when it makes the worktree, and removes the line when it removes the worktree. The second provider waits on Jamie's decision.

## Acceptance criteria

- [ ] `core/setup/hermes/` holds `config.yaml`, `SOUL.md`, `guard-adapter.sh` and `board-context.sh`, equal to the files in `~/.hermes/profiles/legible/`, with no key and no path on one machine except `~/.hermes/profiles/legible`.
- [ ] `core/setup/local.sh` installs them and prints `ok` or `MISSING` for the profile.
- [ ] `~/.hermes/.env` does not exist, or `core/stack.md` names it as an exception with the why.
- [ ] The lane script writes and removes the worktree's `skills.external_dirs` line.
- [ ] `core/stack.md` § Local machine names the profile folder, the four files and the keyring helper (`secrets.command` reads the keyring item with service `hermes` and username `anthropic`, which holds the Anthropic key alone). Changed 2026-10-29: the goose keyring item left the machine with goose.
- [ ] An issue in the Hermes Agent repo reports the `Path.cwd()` bug, and the stub links it. When a Hermes release fixes it, the `state.db` lookup leaves both scripts.

## Out of scope

- The loop walk and its record: stub `goose-worktrees/hermes-loop-walk` (pull request 186).
- A second provider's key: Jamie decides, then one line in the profile's `config.yaml`.

## Notes

- Verified 2026-10-29: `hermes -p legible doctor` reports "Command helper: applied 1 secret" and "✓ Anthropic API" with no `.env` in the profile. `hermes -p legible hooks list` shows the four hooks, not yet allowlisted: the first chat asks once per hook.
- The three guards stay in `~/.claude/hooks/` and the repo copy wins; the adapter maps `terminal`, `write_file` and `patch` into the Claude Code shape. A guard `deny` is `block`; a guard `ask` is `approve`, Hermes's human gate.
- Changed 2026-10-29, after the first R3 run. The acceptance criterion "equal to the files in the profile" applies to these versions:
  - `guard-adapter.sh` and `board-context.sh` read the session's `cwd` from `state.db` (`sessions.cwd` by `session_id`). The payload `cwd` is the fallback. Why: under the gateway the payload `cwd` was `~/.hermes`. The board did not reach the model, which called `kanban_list` for "the board". The guards did not find the repo's copies.
  - `board-context.sh` also runs the repo's `.claude/hooks/route-request.sh` on each turn, with the user's prompt (`extra.user_message`). It passes the router's `[router] Route:` or `Suggest:` line as context. Why: this is Claude Code's `UserPromptSubmit` router, and Hermes did not run it.
  - The first-turn board context starts with one line: "the board" is the repo's `.icm/intake/`, not the Hermes kanban.
  - The edits changed the scripts' mtime. `hermes -p legible hooks doctor` shows "script modified since approval" until Jamie runs `hooks revoke` for each hook and approves it again at the next session's prompt.
- Done 2026-10-29, in the pull request that moves this stub:
  - `core/setup/hermes/` holds the four files, byte-equal to the profile's. `config.yaml` is in the form that `yq` writes, so a `goose-task` add and remove gives back the same bytes. The hook commands start with `~/.hermes/profiles/legible/`, because Hermes expands only a leading `~` and runs the hook with no shell. The four hooks are not allowlisted now (Jamie's hand).
  - `core/setup/local.sh` copies a missing file into the profile, names a file that differs, and prints `ok` or `MISSING hermes profile legible`.
  - `goose-task` writes the worktree's `.claude/skills` into `skills.external_dirs` when the folder exists, and `goose-task done` removes the line.
  - `core/stack.md` § Local machine names the profile folder, the four files and the keyring helper, in § The Hermes profile.
  - The upstream issue is https://github.com/NousResearch/hermes-agent/issues/146570. Both scripts and `core/stack.md` link it.
  - `~/.hermes/.env` still exists. Its removal is a line in `.icm/intake/README.md` § Jamie's hand.
