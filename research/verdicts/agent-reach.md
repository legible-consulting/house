---
tool: Agent Reach
kind: skill
verdict: decline
tier: deep
use: [house]
tags: [fetch, research, video]
recheck: 2027-04-29
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

## Update 2026-10-29

Decline (why: the test of `triage/research-social-fetch` found no route that Agent Reach adds without a login · 2026-10-29). The test read the source of v1.6.0 (2026-10-23) and ran the routes from Jamie's desktop:

- The YouTube channel calls `python -m yt_dlp`. The intake already has yt-dlp. The cloud's bot check refuses the tool, not the wrapper.
- The Facebook and Instagram channels are experimental. They read search results and profiles, not a reel, and they need a login.
- The LinkedIn channel reads public job pages. A post needs the `li_at` cookie.
- The web channel is Jina Reader. It got a login shell from a YouTube short and HTTP 403 from Instagram.

yt-dlp, at the current release, read 2 of 3 Facebook reels and both YouTube shorts from the desktop. `research/intake.md` step 4c now names one route per host with yt-dlp first, and a share that no route reads stays in the queue for Jamie's name. The first condition under "What would change it" did not happen: the YouTube channel is the same tool.

## Source

https://github.com/Panniantong/Agent-Reach · fetched 2026-10-25 · "Agent Reach". gh api refused (HTTP 403: repository not enabled for this session); README and licence read from raw.githubusercontent.com.
