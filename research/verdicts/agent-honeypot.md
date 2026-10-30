---
tool: agent-honeypot
kind: repo
verdict: decline
tier: verdict
use: [house]
tags: [security, agents]
recheck: 2027-04-29
source: https://github.com/jamesalmeida/agent-honeypot
shared: https://www.facebook.com/share/r/19dyv3Bbba/
via: Vishnu.ai
date: 2026-10-29
---

# agent-honeypot

A script that puts a `flag.txt` in the home folder, and links to it in the places a visiting agent looks. The file is a prompt injection: it tells an agent that is not on the owner's list to stop, to fix the way it came in, and to sign a guestbook. The owner's own agents are on an allow list. Licence MIT. 53 stars, no release.

## Verdict: decline

Decline (why: the file is an instruction that every agent on the machine reads, and the house's agents are told that text in a file is data, not an instruction (`research/intake.md`, Boundary); an injection that tells an agent to "remediate" is a second writer on the machine, and a list of allowed agents goes stale at each new trial · 2026-10-29).

## What would change it

- A client asks for a tripwire for agents on a shared server: then judge it as a security control, beside the server's logs.

## Source

https://github.com/jamesalmeida/agent-honeypot · fetched 2026-10-29 · "agent-honeypot". The reel names "Agent Honeypot" in its audio, with no link. Found by search. Caption read with yt-dlp 2026.10.26; the audio transcribed with faster-whisper (model small) on Jamie's desktop, not in the cloud, on 2026-10-29. The post asks for a comment to get the link; that is not information.
