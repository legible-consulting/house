---
tool: Open Design
kind: skill
verdict: watch
tier: deep
use: [build, proposal]
tags: [claude, html, slides, mcp]
recheck: 2027-04-27
source: https://github.com/nexu-io/open-design
shared: https://www.facebook.com/reel/1418664253437259/?sfnsn=mo
via: Rick Morty
date: 2026-10-27
---

# Open Design

Open Design (OpenDesign) is a design workspace from nexu-io that uses a coding agent, Claude Code among sixteen, as its design engine. From a brief it makes prototypes, decks, images and motion graphics that follow a design system, and it can extract a design system from a brand's site. It runs as a desktop app (macOS, Windows), in Docker, from source, or as an MCP server inside the agent (`od mcp install claude`). Licence Apache 2.0. A paid cloud plan, OpenDesign Go, sells model credits; safety and reliability telemetry is always on.

## Verdict: watch

Watch (why: it touches the design plugins in `core/stack.md` (frontend-design, superdesign) and the Site and App lines in `core/services.md`, where a prototype in the client's own brand could open a proposal; but those plugins already serve the build, it has no Linux build for Jamie's Ubuntu machine, and its telemetry cannot be turned off · 2026-10-27).

## What would change it

- One trial prototype for a prospect beats what frontend-design or superdesign give in the same session.
- A Linux release, or the MCP route working inside a Claude Code cloud session with no daemon on a machine.
- Telemetry that can be turned off.

## How the house would use it

- The moment: `03-proposal`, for a Site or App prospect. The step: extract the prospect's colours, fonts and tone from their current site, then make one page prototype to put in the proposal.
- In `07-build`, a first screen in the client's brand before the tickets start.
- It would add a brand-extraction step that frontend-design and superdesign do not name. It replaces nothing yet.

## To try

`curl -fsSL https://open-design.ai/install.sh | sh -s claude`, then, in a Claude Code session, ask for the design system of a prospect's site and one landing page. A good result: the page uses the prospect's real colours and fonts, and it is better than the same prompt to frontend-design.

## Source

https://github.com/nexu-io/open-design · fetched 2026-10-27 · "OpenDesign". The post names "Open Design" with no link. Found by search. The post asks for a comment ("CANVAS") to get the link; that is not information. README read from raw.githubusercontent.com.
