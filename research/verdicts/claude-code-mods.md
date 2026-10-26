---
tool: Claude Code mods
kind: skill
verdict: watch
tier: deep
use: [house, workshop]
tags: [claude, plugin, hooks]
recheck: 2027-04-26
source: https://claude.com/resources/articles/claude-code-mods
shared: https://www.facebook.com/share/r/1DUGgTX2g8/
via: Rick Morty
date: 2026-10-26
---

# Claude Code mods

Mods are small TypeScript functions that change how Claude Code works. A mod hooks an event (a tool call, a permission request, a part of the screen) and runs before it, after it or instead of it. It can rewrite a prompt, block or rewrite a tool call, redact output, or draw new UI. Mods ship inside plugins. Anthropic announced them on 2026-10-01 for the CLI and the desktop app. They are not sandboxed.

## Verdict: watch

Watch (why: the house's guards are three shell hooks kept equal to the blueprint's copies by `check.yml` (`core/stack.md`, Global hooks), and they must run in cloud sessions, where only the repo's copy is seen; the article names the CLI and the desktop app only, so a guard moved to a mod could stop guarding on the web and the phone; for the local terminal, a mod could show the desk's glance or the estate's state beside the chat · 2026-10-26).

## What would change it

- Anthropic says mods run in claude.ai/code cloud sessions, from the repo's own `.claude/` folder.
- A guard needs a thing a hook cannot do: rewrite a command rather than refuse it, or redact a secret from tool output.

## How the house would use it

Two moments. The house: a mod in the local lane that shows the morning glance or the open gates beside the chat; the three guards stay hooks. The workshop: a mod is a clear example of "a human gate at every boundary" (`core/services.md`, Workshop), because it can turn a tool call into a question for the human.

## To try

Ask Claude Code in the local terminal: "write a mod that adds a status band with the count of open gates in `clients/`". A good result: the band shows, hot reloads, and leaves the three hooks untouched.

## Source

https://claude.com/resources/articles/claude-code-mods · fetched 2026-10-26 · "Customize Claude Code with mods in TypeScript". The reel (yt-dlp) gives no link. Found by search. The post claims inter-session messages and automatic routing to cheaper models; the article does not name either. The post asks for a comment to get the link; that is not information.
