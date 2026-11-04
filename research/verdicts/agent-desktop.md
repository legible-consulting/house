---
tool: agent-desktop
kind: skill
verdict: watch
tier: deep
use: [build]
tags: [agents, cli, screenshots]
recheck: 2027-05-04
source: https://github.com/vercel-labs/agent-desktop
shared: https://www.facebook.com/share/r/19z9ytJetY/
via: DevPik
date: 2026-11-04
---

# agent-desktop

A CLI and C library from Vercel Labs that lets an AI agent operate desktop apps on macOS, Windows and Linux. It reads an app's accessibility tree and returns it as JSON, with a ref per element. The agent clicks or types on a ref, then reads the tree again to check the result. It has no model inside. It installs from npm or Homebrew and ships a skill for agent harnesses. Apache-2.0 licence. Free.

## Verdict: watch

Watch for `build`, for the AI & non-AI automation line (why: `core/services.md` sells "their tools connected", and a client's desktop app with no API is the one case where computer use is the only route; agent-desktop reads structure, not screenshots, which is more reliable than pixel matching; but no client has asked for desktop automation, the house's cloud environment has no desktop session, and a snapshot can hold a client's private screen content, which the README itself warns about · 2026-11-04).

## What would change it

- A client asks for automation of a desktop app that has no API and no export. Then try it on that app, on the client's own machine.
- An independent benchmark shows it fails often on common business apps. Then decline.
- The house needs to operate a desktop app itself, for example in a workshop demo.

## How the house would use it

Build, in an AI & non-AI automation engagement (`core/services.md`): an agent on the client's machine drives a legacy desktop app through its accessibility tree, and checks each step by a new snapshot. It adds a route where no API exists; it replaces manual data entry.

## To try

On a Linux or macOS desktop: `npm install -g agent-desktop`, then `agent-desktop status` and `agent-desktop snapshot --app <app> -i`. A good result: the snapshot lists the app's buttons and fields with refs, and a `click` on one ref does what the name says.

## Source

https://github.com/vercel-labs/agent-desktop · fetched 2026-11-04 · "agent-desktop". README read from raw.githubusercontent.com. Shared from a reel by DevPik, caption read with yt-dlp 2026.10.26 (uvx); it named the tool with no repository link and linked a breakdown on devpik.com. Found by search. The caption's "almost 4,000 stars in a single day" was not checked. "Follow DevPik for daily open-source tools" and "Yes or no?" are calls to act.
