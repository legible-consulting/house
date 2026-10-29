---
tool: claude-video (/watch)
kind: skill
verdict: watch
tier: deep
use: [house]
tags: [video, skill, transcript, research]
recheck: 2027-04-29
source: https://github.com/bradautomates/claude-video
shared: https://www.facebook.com/share/r/19XXmenCQS/
via: Startscalr
date: 2026-10-29
---

# claude-video (/watch)

A skill and plugin that gives Claude Code or Codex a video as timestamped frames and a transcript: `/watch <url>` downloads with yt-dlp, extracts frames with FFmpeg, and uses the native captions, or local WhisperX, or a Groq or OpenAI key for speech to text. Licence MIT. Release v0.3.2, 2026-09-25.

## Verdict: watch

Watch (why: the research intake reads a reel's caption, and 8 of the 10 Facebook reels that yt-dlp read on 2026-10-29 named their item only in the audio or on screen; a transcript and a few frames found all eight, the same two steps this skill does; but its speech to text needs a key or WhisperX in the cloud, a key is spend and a credential, and the intake runs unattended (`CLAUDE.md`, Boundaries) · 2026-10-29).

## What would change it

- A speech-to-text route that runs in the `legible` cloud environment with no key and inside the setup script's five minutes: then adopt it for step 4c of `research/intake.md`.
- The post's skill is a different repository: the post names only "/watch".

## How the house would use it

Research, step 4c of `research/intake.md`: when a reel's caption names no tool, the intake reads its audio and three frames before it marks the share unresolved. It adds a route; it replaces nothing.

## To try

In the `legible` environment: `/watch https://www.facebook.com/share/r/1E1jEbbQGN/` (the Freebuff reel). A good result: the frames show freebuff.com, with no key set.

## Source

https://github.com/bradautomates/claude-video · fetched 2026-10-29 · "/watch". The reel names a skill and "/watch", with no name of a repository. Found by search: the repository with the most stars that gives Claude Code a `/watch` command; the match is probable, not sure. Caption read with yt-dlp 2026.10.26; the audio transcribed with faster-whisper (model small) on Jamie's desktop, not in the cloud, on 2026-10-29. The post asks for a comment to get the link; that is not information.
