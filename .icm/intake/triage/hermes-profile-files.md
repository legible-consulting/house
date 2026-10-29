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

## Proposed change

`core/setup/hermes/` carries the four files, and `core/setup/local.sh` installs them into the profile, as it does for `~/.agents/plugins/legible-guards/`. Jamie reads the key names of `~/.hermes/.env` with `grep -oE '^[A-Za-z_]+=' ~/.hermes/.env` and deletes the file when no line is a key he set. The lane script (`goose-task`, or its Hermes successor) appends the worktree's `.claude/skills` to `skills.external_dirs` when it makes the worktree, and removes the line when it removes the worktree. The second provider waits on Jamie's decision.

## Acceptance criteria

- [ ] `core/setup/hermes/` holds `config.yaml`, `SOUL.md`, `guard-adapter.sh` and `board-context.sh`, equal to the files in `~/.hermes/profiles/legible/`, with no key and no path on one machine except `~/.hermes/profiles/legible`.
- [ ] `core/setup/local.sh` installs them and prints `ok` or `MISSING` for the profile.
- [ ] `~/.hermes/.env` does not exist, or `core/stack.md` names it as an exception with the why.
- [ ] The lane script writes and removes the worktree's `skills.external_dirs` line.
- [ ] `core/stack.md` § Local machine names the profile folder, the four files and the keyring helper (`secrets.command` reads the goose keyring item, service `goose`, username `secrets`).

## Out of scope

- The loop walk and its record: stub `goose-worktrees/hermes-loop-walk` (pull request 186).
- A second provider's key: Jamie decides, then one line in the profile's `config.yaml`.

## Notes

- Verified 2026-10-29: `hermes -p legible doctor` reports "Command helper: applied 1 secret" and "✓ Anthropic API" with no `.env` in the profile. `hermes -p legible hooks list` shows the four hooks, not yet allowlisted: the first chat asks once per hook.
- The three guards stay in `~/.claude/hooks/` and the repo copy wins; the adapter maps `terminal`, `write_file` and `patch` into the Claude Code shape. A guard `deny` is `block`; a guard `ask` is `approve`, Hermes's human gate.
