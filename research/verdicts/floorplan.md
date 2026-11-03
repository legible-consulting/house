---
tool: Floorplan
kind: skill
verdict: watch
tier: deep
use: [build, workshop]
tags: [claude, codex, diagrams, plugin, security]
recheck: 2027-05-03
source: https://github.com/haydenschmitty/floorplan
shared: https://www.facebook.com/share/r/18hgwoGF84/
via: GitHunt
date: 2026-11-03
---

# Floorplan

Floorplan is a plugin for Claude Code and Codex. The agent reads a codebase and draws an interactive map of it. Each part, file and web request gets a plain-English name, and the map shows the connections, also across repos. It adds a "health check" for common faults in AI-built apps (keys in code, open Supabase tables, Stripe webhooks with no check, endpoints with no sign-in), and it can export the map as one HTML file. The maker is Hayden Schmitt (`haydenschmitty`). Licence MIT, version 0.6.3, Node 18 or later, no dependencies.

## Verdict: watch

Watch (why: the house already carries `understand-anything` and `diagram-design` in the plugins row of `core/stack.md`, and Floorplan's own README places itself beside Understand Anything; its new parts are a plain-English map a client can read and a health check, which could serve the handover pack of a Site, App or Platform build, but version 0.6.3 is young, and a second map plugin on every build is a second source for the same picture until one build shows which one Jamie uses · 2026-11-03).

## What would change it

- A trial on one client build gives a map that a client reads without help, and the export fits the handover pack (`08-handover/CONTEXT.md`). Then adopt for `build`, and judge whether it replaces `understand-anything`.
- The health check finds a real fault that CI and `claude-security` did not find.
- The project stops at 0.x with no release for six months: decline.

## How the house would use it

Build, at handover (`08-handover/CONTEXT.md`): one exported HTML map of the client's app in the pack, so the client sees what they own in plain words. Also during a build, after a ticket: the "Recent work" view shows which parts the agent changed. Workshop: a map of a participant's own app shows "the folder is the architecture" on real code. It adds a client-readable picture; it would replace `understand-anything` only if the trial shows it is better.

## To try

In a session on a client repo: `/plugin marketplace add haydenschmitty/floorplan`, install it, then ask "draw a floorplan". Or first open https://haydenschmitty.github.io/floorplan-demo/. A good result: a map whose card names a non-developer understands, and a health check with no false alarms.

## Source

https://github.com/haydenschmitty/floorplan · fetched 2026-11-03 · "Floorplan". Caption read with yt-dlp 2026.10.26 (uvx): "Floorplan is a free tool that draws a plain-English map of your whole app … On GitHub → haydenschmitty/floorplan". README read from raw.githubusercontent.com; repository page read with trafilatura. The install command in "To try" is the usual marketplace form, not checked against the README.
