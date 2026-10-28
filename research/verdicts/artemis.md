---
tool: ARTEMIS
kind: skill
verdict: watch
tier: verdict
use: [build]
tags: [agents, phone, mcp]
recheck: 2027-04-28
source: https://github.com/google/artemis
shared: https://www.facebook.com/share/r/1DxwrpZtiu/
via: Nick Saraev
date: 2026-10-28
---

# ARTEMIS

An agent from Google's GitHub organisation that operates an Android phone or emulator from natural-language instructions: it taps, swipes, types, takes screenshots and reads Logcat. It has a web console, a CLI, a Python SDK for pytest or CI, and an MCP server that installs into Claude Code with `artemis mcp --install claude`. It needs Python 3.12+ and a key for a multimodal model, billed apart. Licence Apache-2.0. The README claims 99%+ task completion on AndroidWorld; that is the project's own number.

## Verdict: watch

Watch (why: its one fit is testing an Android build of an App line client (`core/services.md`), and the house ships no store app yet, as the Capacitor verdict says (`verdicts/capacitor.md`); on Jamie's own phone an agent can send messages to clients, which the boundary forbids (`CLAUDE.md`, Boundaries), so it would run only on an emulator or a test device · 2026-10-28).

## What would change it

- A client build that ships an Android app, through Capacitor or otherwise: then try it on an emulator in that build's tests.
- A cloud route that runs it against an emulator without a device on Jamie's desk.

## Source

https://github.com/google/artemis · fetched 2026-10-28 · "ARTEMIS". The post names the tool and "Google's GitHub" without a link. Found by search. The caption asks for a comment ("GOOGLE") to get the tool; that is not information. README and LICENSE read from raw.githubusercontent.com. The reel of `verdicts/facebook-reel-21a24c.md` (2026-10-27, unresolved) probably pointed at the same tool.
