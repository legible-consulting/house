---
tool: Qwen Code
kind: skill
verdict: watch
tier: deep
use: [house]
tags: [agents, claude, hooks, permissions, local-lane]
recheck: 2027-04-29
source: https://github.com/QwenLM/qwen-code
date: 2026-10-29
---

# Qwen Code

Qwen Code is the Qwen team's (Alibaba) open-source coding agent, Apache-2.0, a fork of Gemini CLI that stopped syncing at v0.1. It ships a CLI, a desktop app (`.deb` and AppImage), a web UI and IDE plugins. Latest release 0.26.3 on 2026-10-28, with a release most days; 28.8k stars. It runs on Anthropic, any OpenAI-compatible endpoint, OpenRouter and local models from environment keys.

## Verdict: watch

Watch, as the second candidate for the local lane (why: it is the closest to Claude Code in shape of the twenty-one agents the spike read: hooks take the same stdin JSON, exit 2 blocks, `permissionDecision: "ask"` opens the prompt, SessionStart and UserPromptSubmit stdout reach the model, `permissions.allow/ask/deny` with `Bash(git push *)` is the allow list, `--worktree` is built in, and a bwrap sandbox exists on Linux; but nothing is read from `~/.claude` or `.claude` without a config line, usage statistics go to an Alibaba Cloud endpoint until switched off, auto-memory and auto-skills write files on their own, and the surface moves daily · 2026-10-29).

## What would change it

- Hermes Agent fails a requirement of `goose-worktrees/hermes-loop-walk` with no shim: Qwen Code is tried next.
- A Qwen Code session on the house passes the same walk with telemetry off and the writers off.

## How the house would use it

The local lane: `context.fileName` set to `CLAUDE.md`, `skills.directories` set to `~/.claude/skills` and `.claude/skills`, the three guards copied into `.qwen/settings.json` as PreToolUse hooks, `privacy.usageStatisticsEnabled: false`, auto-memory and auto-skills off. It would replace goose.

## To try

`qwen --worktree` on a live repo with the settings above. A good result: the board prints on the first turn, `npm test` is blocked, `git push origin main` asks, and `merge.sh` runs on `allow`.

## Source

https://github.com/QwenLM/qwen-code and its `docs/users/` folder (configuration, hooks, approval-mode, auto-mode, sandbox, skills, model-providers, auth, worktree, headless, tos-privacy) · read 2026-10-29 through the GitHub API. The free Qwen OAuth tier ended 2026-04-15.
