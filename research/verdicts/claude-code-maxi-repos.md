---
tool: Claude Code Maxi repos (Ai Builders list)
kind: list
verdict: decline
tier: deep
use: [build]
tags: [claude, skill, memory, mcp]
recheck: 2027-04-30
source: https://www.facebook.com/share/v/1HatmzBgnB/
via: Ai Builders
date: 2026-10-31
---

# Claude Code Maxi repos (Ai Builders list)

A reel by Ai Builders that lists about ten add-ons for Claude Code, by name and with no links. The names that a search matched to a repository: claude-mem (`thedotmack/claude-mem`, memory across sessions), n8n-MCP (`czlonkowski/n8n-mcp`, n8n node docs as an MCP server), Obsidian skills (`kepano/obsidian-skills`), LightRAG (`HKUDS/LightRAG`, retrieval), Everything Claude Code (`affaan-m/everything-claude-code`), Superpowers (`obra/superpowers`, a development method built from skills), awesome-claude-code (`hesreallyhim/awesome-claude-code`, a directory) and GSD, "Get Shit Done" (`glittercowboy/get-shit-done`, whose README says the project has moved). Two more items, an anti-slop design skill and a skill cleaner, have no name in the captions.

## Verdict: decline

Decline (why: the house gives a session its job through the folder's `CONTEXT.md` and the `.claude/` hooks (`CLAUDE.md`, House rules), so a memory plugin, a method made of skills (Superpowers, GSD) or a bundle of agents (Everything Claude Code) is a second instruction source no contract names, and a memory store is a second home for facts; the house runs no n8n and no retrieval build (`core/stack.md`); awesome-claude-code is a directory, not a tool · 2026-10-31).

## What would change it

- A client build needs retrieval over its own documents. Then LightRAG gets its own verdict.
- A client runs n8n. Then n8n-MCP gets its own verdict.
- A workshop client already uses Superpowers or GSD, and the workshop must place it beside ICM.

## How the house would use it

Build: one of the skills would load in a client repo session through `.claude/`. It would add a second method beside the contract; it would replace nothing.

## To try

`curl -fsSL https://raw.githubusercontent.com/obra/superpowers/HEAD/README.md` and read what a skill tells the agent to do. A good result: a check the house's contracts do not already carry.

## Source

https://www.facebook.com/share/v/1HatmzBgnB/ · fetched 2026-10-31 · "Ai Builders on Reels". The caption is empty; the names come from the reel's auto-captions, read with yt-dlp 2026.10.26 (uvx). Found by search: each repository was matched by name and its README read with `curl` from raw.githubusercontent.com. "Take a screenshot" and "let me know which one is your favorite" are calls to act, not information.
