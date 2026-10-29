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
- [ ] R6: `/model` switched to a second provider mid-session and the ticket continued.
- [ ] R7: the session ran in a worktree made by the lane script, not by `hermes -w`. If Hermes made a `.worktrees/` folder anyway, the stub says so and the blueprint ignores it.
- [ ] The writers: after both walks, `MEMORY.md` holds no client fact and no path, every staged memory line was approved or rejected, and every staged skill was promoted by a pull request or rejected with a reason. The pending lists are empty.
- [ ] The record lists each shim as a file with its path and its owner, and the count of shims.
- [ ] `core/stack.md` § Tools and § Local machine name the lane's agent, the profile, the writers' settings, the key's home and the why, dated. If Hermes fails a requirement with no shim, the stub names the next agent to try (Qwen Code is the spike's second) and the stack keeps goose until then.

## Out of scope

- Hermes's messaging gateway, cron, dashboard, Hermes Cloud and Nous Portal. None is installed or signed in to.
- The cloud and phone lane. Claude Code keeps it.
- A rename of `goose-task`. The stub that ships the winner does it.

## Notes

- The spike and the Hermes assessment of 2026-10-29 are session reports in the scratchpad, linked from the pull request that cut this stub. Their distillation is `research/verdicts/hermes-agent.md`, `opencode.md` and `qwen-code.md`.
- Open-source assurance, checked in source on 2026-10-29: MIT licence, contributions MIT, no CLA file, the desktop app is in the same repository and builds on Linux with `hermes desktop`, shared metrics default to `enabled: false, send: false` with an opt-in offer whose default answer is no. The paid parts (Nous Portal, Tool Gateway, Hermes Cloud) are services the lane does not use.
- The `ask` to `block` rule of goose does not apply: Hermes's `approve` from a hook escalates to the human gate.
- Stub `plugin-router-and-board` waits on this stub. Stub `emdash-leaves` depends on it.
