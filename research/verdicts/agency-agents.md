---
tool: Agency Agents
kind: skill
verdict: decline
tier: deep
use: [build]
tags: [agents, claude, skill]
recheck: 2027-04-29
source: https://github.com/msitarzewski/agency-agents
shared: https://www.facebook.com/share/r/1CLWxDRaE4/
via: ZaindevX
date: 2026-10-29
---

# Agency Agents

Agency Agents ("The Agency") is a collection of agent persona files: one markdown file per role, such as Frontend Developer, Backend Architect, Reality Checker or TikTok Strategist. An install script or a desktop app copies them into `~/.claude/agents/` and into the folders of Cursor, Codex, Gemini CLI and other tools. The maker is Mike Sitarzewski (`msitarzewski`). Licence MIT. The post says 200+ agents.

## Verdict: decline

Decline (why: the house gives a session its job through a folder's `CONTEXT.md` contract and the `.claude/` hooks (`CLAUDE.md`, House rules; `core/stack.md`, global hooks), not through a persona; a role file with a personality adds a second instruction source that no contract names, and 200 global agents load into every session, client builds included, where one home per fact is the rule · 2026-10-29).

## What would change it

- A build needs a review lens the house does not have, for example accessibility or security, and one file from the collection covers it better than a contract line does. Then copy that one file into the client repo, with its source, not the collection.
- A workshop client already uses the collection, and the workshop must show how it sits beside ICM contracts.

## How the house would use it

Build, a ticket in a client repo (`07-build/CONTEXT.md`). One persona, for example a reviewer, would run as a Claude Code subagent on a pull request. It would add a second opinion; it would replace nothing, because the contract already says what the stage does.

## To try

`curl -fsSL https://raw.githubusercontent.com/msitarzewski/agency-agents/HEAD/README.md | grep -n "agents/"` to list the files, then read one reviewer file. A good result: a file with checks the house's contracts do not already carry.

## Source

https://github.com/msitarzewski/agency-agents · fetched 2026-10-29 · "The Agency: AI Specialists Ready to Transform Your Workflow". The post named the tool with no link. Found by search. Post: "This GitHub repo is a GOLDMINE for AI coders … Agency Agents gives you 200+ specialized AI agents". The words "Bookmark this one" are a call to act, not information.

## Update 2026-10-31

A second reel shared the same repository: https://www.facebook.com/share/r/1JVPQSMfim/ (via Jordan Blake, caption read with yt-dlp 2026.10.26). It calls the collection "over 200 specialized AI agents" across engineering, design, marketing, sales and finance, each with a role, a workflow and success metrics. It names the tool with no link and adds no fact the 2026-10-29 reading did not have. The verdict stands: decline.
