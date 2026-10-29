---
tool: Freebuff
kind: service
verdict: decline
tier: deep
use: [build]
tags: [agents, cli, cost]
recheck: 2027-04-29
source: https://github.com/CodebuffAI/freebuff
shared: https://www.facebook.com/share/r/1E1jEbbQGN/
via: Moody.builds
date: 2026-10-29
---

# Freebuff

A free coding agent from the makers of Codebuff, paid for by text ads in the agent. It comes as a CLI (`npm install -g freebuff`), a desktop app, a web app builder, a cloud agent on a GitHub repository and a chat. The models are its choice. The client code is Apache-2.0; the models run on its service.

## Verdict: decline

Decline (why: the house's coding agents are Claude Code and the local lane's agent (`core/stack.md`); a client's code sent to a free service paid by ads, with models the house does not choose, puts client data where the terms in `core/` do not reach, and the saving is the cost of a subscription the house already pays · 2026-10-29).

## What would change it

- Freebuff publishes a data policy that keeps code out of training and out of the ad system, and the house needs a second agent for work with no client data.

## How the house would use it

It would replace Claude Code in a build session, or run beside it as a free second agent for a workshop attendee with no subscription. The second use is the only one with no client code in it.

## To try

`npx freebuff` in a scratch repository with no client data. A good result: a ticket of the `chore` lane done to the same standard as Claude Code, with the ads in the terminal only.

## Source

https://github.com/CodebuffAI/freebuff · fetched 2026-10-29 · "Freebuff". The reel names no tool in its caption or its audio. The name shows on screen in the video: freebuff.com and "The only 100% free coding agent". Found from the frames. Caption read with yt-dlp 2026.10.26; the audio transcribed with faster-whisper (model small) on Jamie's desktop, not in the cloud, on 2026-10-29. The post asks for a comment to get the link; that is not information.
