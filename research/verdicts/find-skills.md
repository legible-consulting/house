---
tool: find-skills
kind: skill
verdict: decline
tier: verdict
use: [house]
tags: [skill, claude, agents]
recheck: 2027-04-29
source: https://github.com/vercel-labs/skills
shared: https://www.facebook.com/share/r/1C8YB3EcYh/
via: Ben Kimball
date: 2026-10-29
---

# find-skills

A skill in Vercel Labs' `skills` CLI (`npx skills`) that searches the skills.sh directory for skills that fit the task, then installs them into the agent's setup. The CLI supports Claude Code, Codex, OpenCode, Cursor and 75 more agents. Licence MIT. Latest release v1.7.4, 2026-10-19.

## Verdict: decline

Decline (why: each repo owns its skills, read and committed like any other file; a skill that installs other skills from a directory of hundreds of thousands puts unread instructions into a session, and a skill is code the session runs · 2026-10-29).

## What would change it

- A repo needs a skill for a task, and a session finds it faster with the directory: then search skills.sh by hand and read the skill before it enters the repo.

## Source

https://github.com/vercel-labs/skills · fetched 2026-10-29 · "skills". The reel says "an engineer at Vercel built this skill that finds all of the skills", with no name and no link. Found by search. Caption read with yt-dlp 2026.10.26; the audio transcribed with faster-whisper (model small) on Jamie's desktop, not in the cloud, on 2026-10-29. The post asks for a comment to get the link; that is not information.
