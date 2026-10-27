---
tool: Call.md
kind: repo
verdict: decline
tier: verdict
use: [proposal]
tags: [transcript, gdpr, speech]
recheck: 2027-04-27
source: https://github.com/video-db/call.md
date: 2026-10-27
---

# Call.md

Call.md is a desktop app from VideoDB that records meetings, transcribes them live and gives AI notes before, during and after a call. It is an Electron app, licence MIT. It needs a VideoDB API key, and it sends the call audio to VideoDB for transcription. Recording works on macOS only; on Linux the app builds from source, but recording is not supported.

## Verdict: decline

Decline (why: Jamie's local machine is Ubuntu 24.04, `core/stack.md`, where Call.md cannot record; and it sends a client's voice to a third party, which needs the client's consent before every call · 2026-10-27).

## What would change it

- Recording support on Linux, with transcription that runs on the machine (for example whisper.cpp) and sends no audio out.
- A client call habit where a transcript would replace notes in the profile after a call (`02-client-research`).

## Source

https://github.com/video-db/call.md · fetched 2026-10-27 · "Call.md". The queue link carried `?sfnsn=mo`, a Facebook share tag; the item is the repository. README read from raw.githubusercontent.com.
