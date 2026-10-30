---
tool: Hermes Agent
kind: skill
verdict: watch
tier: deep
use: [house, workshop]
tags: [agents, claude, hooks, memory, local-lane]
recheck: 2027-04-29
source: https://github.com/NousResearch/hermes-agent
date: 2026-10-29
---

# Hermes Agent

Hermes Agent is an open-source agent from Nous Research: a CLI, a terminal UI and an Electron desktop app in one MIT repository, with a messaging gateway, cron, memory, skills and plugins beside the coding loop. It runs on any provider: an Anthropic key, OpenRouter, an OpenAI-compatible endpoint or a local model. Latest release 0.22.5 on 2026-10-23. Nous sells two services beside it, Nous Portal (models and a Tool Gateway for web, images, speech and a cloud browser) and Hermes Cloud (hosted instances); neither is needed to run the agent.

## Verdict: watch

Watch, as the agent under trial for the local lane (why: the spike of 2026-10-29 read twenty-one agents against the lane's eight requirements, and Hermes meets the most of them together: shell hooks with an `approve` that escalates to the human gate, so the git-writes guard keeps its ask; `command_allowlist` globs and `approvals.deny`, so `merge.sh` runs and a force push never does; `CLAUDE.md` read per folder; every provider; a Linux desktop from the same repository; telemetry off by default and opt-in in source. It is not adopted until `goose-worktrees/hermes-loop-walk` proves the loop, because three defaults cut against the house: the memory and skill writers run freely, worktrees land inside the repo, and keys live in a plaintext `~/.hermes/.env` · 2026-10-29).

## What would change it

- The loop walk passes with the writers on approval, the lane script's worktree and a key outside a plaintext file: adopt, `use: house`.
- Hermes cannot take a key from the keyring or a command, and Jamie refuses the `.env` exception: decline for the lane.
- The board's text cannot reach the model on the first turn by any route: watch stays, and Qwen Code is tried next.

## How the house would use it

The local lane (`core/stack.md` § Local machine), one profile `legible`: the lane script makes the worktree and starts `hermes -p legible` in it; the three guards run as `pre_tool_call` shell hooks; `SOUL.md` carries the words of `~/.claude/CLAUDE.md`; `.claude/skills` loads through `skills.external_dirs`. It replaces goose in the lane. For the workshop it is a second open-source agent to show beside goose, with the same ICM workspace.

## To try

`hermes -p legible` in a worktree of a live repo, on an Anthropic key, with `approvals.mode: manual` and the three hooks registered. A good result: `npm test` is blocked, `git push origin main` asks, `bash .icm/scripts/merge.sh <n>` runs after the tick with no prompt, and `MEMORY.md` holds no client fact afterwards.

## Source

https://github.com/NousResearch/hermes-agent · read 2026-10-29 · "The self-improving AI agent built by Nous Research". Docs read: memory, skills, context-files, security, providers, tool-gateway, nous-portal, hooks, git-worktrees, profiles. Source read: `LICENSE`, `CONTRIBUTING.md`, `hermes_cli/config_defaults.py`, `hermes_cli/observability/shared_metrics_consent.py`. 258k stars, 51.7k open issues and pull requests, one author with about 25,000 of 60,000 commits. Jamie: "I'm leaning towards hermes, I just need assurance that it is truly open source".
