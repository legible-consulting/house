---
tool: OpenCode
kind: skill
verdict: watch
tier: deep
use: [house, workshop]
tags: [agents, claude, permissions, local-lane]
recheck: 2027-04-29
source: https://opencode.ai/docs/
date: 2026-10-29
---

# OpenCode

OpenCode is an open-source coding agent by Anomaly, MIT, with a terminal UI, a desktop app (`.deb` and `.rpm` on Linux) and IDE extensions. It supports 75 or more providers and local models. Latest release 1.19.5 on 2026-10-28; 223k stars, the largest community of the field. Kilo CLI is a fork of it.

## Verdict: watch

Watch (why: on the lane's eight requirements it reads `CLAUDE.md` with no setting, reads `.claude/skills` and `~/.claude/skills`, and its permission file does what `.claude/settings.json` does, with per-command `allow`, `ask` and `deny`; but its hook is a JavaScript plugin that throws, so the three guards need a wrapper, nothing injects the board or the router into the model's context, it has no worktree command, Anthropic prohibits its Claude Pro/Max login, and Jamie did not enjoy its interface · 2026-10-29).

## What would change it

- The Hermes trial fails and the interface objection is withdrawn: OpenCode is the fallback with the least to explain.
- A plugin hook that injects context at session start lands in the docs.

## How the house would use it

The local lane, in place of goose: a `permission` block with `bash .icm/scripts/merge.sh *` on `allow` and `git push *` on `ask`, and one plugin in `~/.config/opencode/plugins/` that spawns the three guard scripts on `tool.execute.before`. For the workshop, a second open-source agent that opens an ICM workspace with no setting.

## To try

`opencode` in a workspace rendered from the blueprint, with the permission block above. A good result: the session names the routed contract from `CLAUDE.md`, and `git push origin main` asks.

## Source

https://opencode.ai/docs/rules/, /permissions/, /plugins/, /skills/, /providers/, https://opencode.ai/download · read 2026-10-29. Jamie, 2026-10-29: "I didn't particularly enjoy using opencode or goose", then "the feel of the UI".
