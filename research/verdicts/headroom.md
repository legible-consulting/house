---
tool: Headroom
kind: skill
verdict: watch
tier: deep
use: [house]
tags: [claude, llm, usage, cost]
recheck: 2027-04-26
source: https://github.com/chopratejas/headroom
shared: https://www.facebook.com/share/r/196P7Z11gN/
via: Voxaris AI Solutions
date: 2026-10-26
---

# Headroom

Headroom compresses what a coding agent reads (tool output, logs, files, history) before it reaches the model. It keeps the originals in a local cache, and the model can ask for them back. It runs as a library, a local proxy, an MCP server, or a wrapper: `headroom wrap claude`. Tejas Chopra started it; the README now points at `headroomlabs-ai/headroom`. Licence Apache 2.0. A paid team plan exists, and an anonymous telemetry beacon is on by default.

## Verdict: watch

Watch (why: the house runs Claude Code (`core/stack.md`, the `claude` row) on a subscription, so fewer tokens buy context room, not money (`verdicts/ccusage.md`); the wrapper puts a proxy between every session and the model, its `headroom learn` writes into `CLAUDE.md`, which breaks one home per fact, and the house's cloud sessions on claude.ai cannot be wrapped at all · 2026-10-26).

## What would change it

- Long local-lane sessions over the estate hit the context limit often, and a wrapped session reaches the same result in fewer compactions.
- The house moves a build or a client feature to the API at per-token prices.

## How the house would use it

The local lane (`core/stack.md`, Local machine), when a session reads large logs across the estate's clones. It would add a compression step in front of the model; it would replace nothing. Run it with telemetry off and without `headroom learn`.

## To try

`HEADROOM_TELEMETRY=off uvx --from "headroom-ai[all]" headroom wrap claude` in a clone, on one task that reads a long CI log. A good result: the same fix found, and a lower token count in `ccusage` than the same task unwrapped.

## Source

https://github.com/chopratejas/headroom · fetched 2026-10-26 · "Headroom". README from raw.githubusercontent.com. The reel (yt-dlp) names "Headroom" and gives no link. Found by search. The post claims "over 77,000 GitHub stars"; the repository page refused the fetch (HTTP 403), so the count is not checked. The README addresses "AI agents / LLMs" with a link to read; that is not an instruction to the intake, and it was not followed.
