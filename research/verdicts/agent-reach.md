---
tool: Agent Reach
kind: skill
verdict: watch
tier: deep
use: [house]
tags: [fetch, research, video]
recheck: 2027-04-25
source: https://github.com/Panniantong/Agent-Reach
shared: https://www.facebook.com/share/r/1JSuJyHucH/
via: DevPik
date: 2026-10-25
---

# Agent Reach

Agent Reach is one command-line tool that lets a coding agent read the web, GitHub, YouTube captions, RSS and, with a login, X, Reddit and Facebook. It installs and tests the tools behind each channel and has a doctor command. The README is Chinese first. Licence MIT.

## Verdict: watch

Watch (why: research fetches with trafilatura and yt-dlp (`core/stack.md`), and on this run yt-dlp failed on every YouTube short with a bot check and on two Facebook reels; Agent Reach's YouTube channel is a second route that needs no login; but its login channels copy browser cookies into its own browser, and credentials never go in git or in an unattended run (`CLAUDE.md`, Boundaries) · 2026-10-25).

## What would change it

- yt-dlp keeps failing on YouTube in the cloud environment, and Agent Reach's YouTube channel passes there without a login.
- A login channel becomes necessary; then the answer is no, by the boundary on credentials.

## How the house would use it

Research, step 4c of `intake.md`. For a YouTube link, the intake would call Agent Reach when yt-dlp fails. It would add a fallback; it would replace nothing.

## To try

`agent-reach read https://youtube.com/shorts/OeQMKmepnFc` in the `legible` environment. A good result: the title, description and captions, with no login.

## Source

https://github.com/Panniantong/Agent-Reach · fetched 2026-10-25 · "Agent Reach". gh api refused (HTTP 403: repository not enabled for this session); README and licence read from raw.githubusercontent.com.
