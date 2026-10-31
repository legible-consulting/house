---
tool: goose
kind: skill
verdict: watch
tier: deep
use: [workshop]
tags: [agents, mcp, icm, workshop]
recheck: 2027-04-29
source: https://goose-docs.ai/extensions/
date: 2026-10-29
---

# goose

goose is an open-source AI agent with a desktop app and a CLI. It runs on any model provider and takes its tools from MCP servers, which it calls extensions. The extensions page is a directory of those servers. goose began at Block and has moved to the Agentic AI Foundation (AAIF), as the page says. The page states no price and no licence.

## Verdict: watch

Watch (why: the house builds and runs on Claude Code (`core/stack.md`), and goose reads none of the `.claude/` hooks the house rules depend on, so it does not replace that row; but the Workshop line in `core/services.md` teaches ICM as folders and markdown contracts, not as one vendor's tool, and goose has the same parts under other names: `.goosehints` for `CLAUDE.md`, recipes for a stored routine prompt, extensions for MCP; a client who cannot buy Claude can still follow the workshop on goose · 2026-10-29).

## What would change it

- A workshop or coaching client asks for an open-source or self-hosted agent, or a model provider other than Anthropic. Then adopt it for that workshop's kit.
- goose reads `CLAUDE.md` and folder `CONTEXT.md` files with no setup, so one workshop kit serves both tools.
- The AAIF move stalls and releases stop.

## How the house would use it

Workshop, the hands-on part of the day (`training/CONTEXT.md`). The kit would show the same ICM workspace opened in goose: `CONTEXT_FILE_NAMES` set so goose reads the folder contracts, and one recipe in the place of a stored routine prompt. It would add a second tool to the kit; it would replace nothing in the house.

## To try

`CONTEXT_FILE_NAMES='["CLAUDE.md","CONTEXT.md"]' goose session` in a workspace rendered from the blueprint, then ask "which contract do you follow for a proposal?". A good result: goose names `03-proposal/CONTEXT.md` and quotes its Inputs.

## Source

https://goose-docs.ai/extensions/ · fetched 2026-10-29 · "goose | Your open source AI agent". The directory loads its servers by script, so the fetched text lists none.

## Update 2026-10-29

Second source: https://goose-docs.ai/docs/guides/recipes/ · fetched 2026-10-29 · "Recipes | goose | Your open source AI agent". Recipes package extensions, prompts and settings into one shareable workflow. A recipe can call subrecipes, run them in parallel and become a slash command. This is the routine's stored prompt and a skill in one file. The verdict stands: it is a workshop parallel, not a house tool, because the house rule says the folders are the pipeline and a recipe that drives the stages is an orchestrator (`CLAUDE.md`, House rules).

## Update 2026-10-29

Third source: https://goose-docs.ai/docs/guides/context-engineering/using-goosehints/ · fetched 2026-10-29 · "Providing Hints to goose". `.goosehints` is goose's `CLAUDE.md`: a global file in `~/.config/goose/` and local files per directory, the local one wins on a conflict, and `CONTEXT_FILE_NAMES` lets goose read other agents' rule files. It needs the Developer extension. The verdict stands; this page is what the To try line rests on.

## Update 2026-10-29

Goose held the local lane for one day and left it on 2026-10-29, with Emdash (`.icm/intake/_done/goose-worktrees/_done/goose-task-script.md`). Hermes Agent is the lane's agent (`research/verdicts/hermes-agent.md`, `core/stack.md`). Jamie's why for the lane's agent stays: an agent on his own machine on the model he chooses. The verdict stays `watch`, for the workshop only.
