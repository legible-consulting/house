# Stub: A Hermes session takes one ticket from the board to the merge, scored on the lane's eight requirements

- feature-slug: hermes-loop-walk
- epic: goose-worktrees
- sequence: 7 of 7
- depends-on: blueprint-new-run-in-worktree
- complexity: research
- priority: P1

## Problem

Jamie did not enjoy the interface of goose or of OpenCode (2026-10-29). The open-source agent spike of the same day read twenty-one agents against the eight things the local lane must do. Hermes Agent (Nous Research, MIT) meets the guards with an ask, the allow list, `CLAUDE.md`, any provider and a Linux desktop, and Jamie leans to it. Nobody has walked the loop in it. Two of its defaults cut against the house: the memory and skill writers run freely, and worktrees land inside the repo. Its keys live in a plaintext `~/.hermes/.env`.

## Proposed change

Jamie installs Hermes Agent on a profile `legible` and walks one open ticket of one live repo from the board to the merge, then one house triage stub, in a worktree that the lane script made. The session records each requirement as met, met with a shim, or not met, and each shim as a file the house must keep. The writers stay on with approval, and the walk ends with a read of what they wrote. One pull request on the house: the record goes into this stub's `_done/` copy under `## Notes`, and `core/stack.md` gets the lane's agent row with its why.

## Acceptance criteria

- [ ] The profile `legible` exists with: `memory.write_approval: true`, `skills.write_approval: true`, `skills.create_dir` outside every repo, `approvals.mode: manual`, `approvals.deny` with the force-push and history-rewrite patterns, `command_allowlist` with `bash .icm/scripts/merge.sh *` and `bash .icm/scripts/release.sh *`, shared metrics answered "No thanks", and `SOUL.md` carrying the words of `~/.claude/CLAUDE.md` plus one line: a client's facts are never saved to memory, the folder is the record.
- [ ] The provider is Anthropic by API key or OpenRouter, never a Claude subscription login. The key is read from the keyring or a command, or this stub records that Hermes reads it from `~/.hermes/.env` only and Jamie decides whether that file is a named exception in `core/stack.md`.
- [ ] R1: the session names the routed `CONTEXT.md` for a prompt from the repo's `CLAUDE.md` (through `AGENTS.md`, stub `agents-md-pointer`) with no other hint.
- [ ] R2: the three guards run as shell hooks on `pre_tool_call`: a `npm test` is blocked, a plaintext key in a write is blocked, and `git push origin main` reaches the human approval gate through `approve`.
- [ ] R3: the board's text reaches the model on the first turn, through a `pre_llm_call` hook's `context` or another route, and the router names the case of a prompt. Or the stub records that it cannot, and what replaces it.
- [ ] R4: the three skills of a build load from `.claude/skills` through `skills.external_dirs`, and `asd-ste100` from `~/.claude/skills`.
- [ ] R5: `merge.sh` ran from the Hermes session after Jamie's tick with no prompt. `release.sh` the same shape.
- R6 moved to triage stub `hermes-cheap-models` (Jamie, 2026-10-29). The walk does not wait on a second provider (why: the second provider is the same choice as the cheapest models that can do the lane's work, and a key Jamie has not chosen blocked the walk).
- [ ] R7: the session ran in a worktree made by the lane script, not by `hermes -w`. If Hermes made a `.worktrees/` folder anyway, the stub says so and the blueprint ignores it.
- [ ] The writers: after both walks, `MEMORY.md` holds no client fact and no path, every staged memory line was approved or rejected, and every staged skill was promoted by a pull request or rejected with a reason. The pending lists are empty.
- [ ] The record lists each shim as a file with its path and its owner, and the count of shims.
- [ ] `core/stack.md` § Tools and § Local machine name the lane's agent, the profile, the writers' settings, the key's home and the why, dated. If Hermes fails a requirement with no shim, the stub names the next agent to try (Qwen Code is the spike's second). Goose and Emdash left the stack on 2026-10-29 (`goose-task-script`), so the stack keeps Hermes until the next agent passes.

## Out of scope

- Hermes's messaging gateway, cron, dashboard, Hermes Cloud and Nous Portal. None is installed or signed in to.
- The cloud and phone lane. Claude Code keeps it.
- The rename of the lane script to `ticket` and its folder to `~/worktrees/`: triage stub `ticket-command` (Jamie, 2026-10-29).
- A second provider and R6: triage stub `hermes-cheap-models` (Jamie, 2026-10-29).

## Notes

- The spike and the Hermes assessment of 2026-10-29 are session reports in the scratchpad, linked from the pull request that cut this stub. Their distillation is `research/verdicts/hermes-agent.md`, `opencode.md` and `qwen-code.md`.
- Open-source assurance, checked in source on 2026-10-29: MIT licence, contributions MIT, no CLA file, the desktop app is in the same repository and builds on Linux with `hermes desktop`, shared metrics default to `enabled: false, send: false` with an opt-in offer whose default answer is no. The paid parts (Nous Portal, Tool Gateway, Hermes Cloud) are services the lane does not use.
- Stub `plugin-router-and-board` reads the same result as R3. Stub `emdash-leaves` is dropped (2026-10-29).
- R3 in the CLI is met: `_done/plugin-router-and-board.md` § Result (2026-10-29). The walk still reads R3 in a desktop session on a build, where the hook finds the build through `state.db`.

### Pre-walk audit (2026-10-29)

A Hermes session on the profile `legible` (desktop app, Hermes v0.22.5, model `claude-opus-5-5`) started this ticket. The session read the profile and the machine before the walk. Neither walk has started. Each line is the state on 2026-10-29.

- Profile: `memory.write_approval: true`, `skills.write_approval: true`, `skills.create_dir` is `~/.hermes/profiles/legible/scratch-skills`, the deny list and both script globs are in `command_allowlist`, telemetry is at its defaults, and `SOUL.md` equals `~/.claude/CLAUDE.md` plus the client-facts line. Met.
- Profile: `approvals.mode` is `smart`, not `manual`. Not met. Jamie decides (Questions, 1).
- Profile: `memory.memory_enabled: false` and `user_profile_enabled: false`. The memory writer is off, not on with approval. This differs from the decision "the writers stay on, with approval" (Questions, 2).
- Key: `config.yaml` reads the Anthropic key from the keyring through `secrets.command`. But `~/.hermes/profiles/legible/.env` exists (written 2026-10-29 16:17) and holds three plaintext keys: `ANTHROPIC_API_KEY`, `AI_GATEWAY_API_KEY`, `OPENCODE_ZEN_API_KEY`. `core/stack.md` § Local machine says the profile has no `.env`. `~/.hermes/.env` also exists with 14 set lines. Not met. Jamie's hand.
- R7: `goose-task` is not in `~/.local/bin`, so `core/setup/local.sh` did not install it. The session ran the copy from `origin/main` and it made `~/goose/worktrees/house/hermes-loop-walk/`. A stub `hermes` on `PATH` replaced `agent_start`, because this session is the agent. This session's own folder is `~/Desktop/legible-consulting`, not the worktree. R7 is not met by this session.
- R4: `yq` is not installed. `goose-task` warned and did not write the worktree's `.claude/skills` into `skills.external_dirs`. The house has no `.claude/skills`, so the house walk loses nothing. A live repo walk loses its three skills. Not met until `yq` is installed.
- R3: this session's folder has no `.claude/hooks`, so the board did not reach the first turn. Not read yet in a worktree session.
- The writers: `MEMORY.md` holds the importer's copy of an older `~/.claude/CLAUDE.md` in 30 lines. It holds paths (`~/emdash/worktrees/`, `~/.claude/hooks/reap-worktrees.sh`) and the Emdash rule that left on 2026-10-29. No client fact. Not met: it holds paths.
- The writers: `pending/skills/` holds 32 staged batches from `background_review`. Fifteen create or patch skills named `icm-ticket-loop`, `icm-intake-ticket`, `icm-ticket-session`, `icm-ticket-execution`, `icm-ticket-to-pr` and `legible-house-tickets`. These restate `.icm/intake/CONTEXT.md` and are a second home of the loop. The rest patch bundled skills (`github`, `hermes-agent`, `blocked-page-recovery`) or create `copier-template-change` and `vercel-api`. None is approved or rejected.

### Jamie's answers (2026-10-29)

- `approvals.mode` is `manual` in `core/setup/hermes/config.yaml` and in the profile. Met.
- `memory.memory_enabled` is `true`, with `write_approval: true`. The memory writer is on with approval. Met.
- The 15 staged `icm-*` and `legible-house-tickets` batches are rejected (why: `.icm/intake/CONTEXT.md` is the one home of the loop). 18 batches stay staged for the read after the walks.
- `~/.hermes/.env` and the profile's `.env` stay. `core/stack.md` § Local machine names them as an exception with the why. The key criterion is met by that record.
- The live repo ticket waits on Jamie's choice of repo.
- `local.sh` ran from `main` on Jamie's word (2026-10-29). Homebrew was not on the session's `PATH`, so the session loaded `brew shellenv` first. Every tool reports `ok`, `yq` v4.54.1 included, and the link `~/.local/bin/goose-task` exists. The R4 shim can now run. `config.yaml` differs from the house copy until this pull request merges.
