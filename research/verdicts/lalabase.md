---
tool: Lalabase
kind: repo
verdict: decline
tier: verdict
use: [house]
tags: [self-hosted, hours, tickets]
recheck: 2027-04-28
source: https://github.com/lalabase/lalabase
shared: https://www.facebook.com/share/r/1FEj8xBnQa/
via: GithubSignals
date: 2026-10-28
---

# Lalabase

A self-hosted project tool for software agencies and their clients. It holds tickets, time tracking, docs and meetings in one place. Its AI assistant answers from the project's own data and cites the tickets and meetings it used. It is Ruby on Rails on PostgreSQL, licence AGPL-3.0-only, first public release 2026.10.0. Self-hosting is free; a hosted plan in Germany is paid monthly.

## Verdict: decline

Decline (why: the house keeps its client records in `clients/`, its tickets in each client repo and its view of the business in the desk app on Next.js and Neon (`core/stack.md`, The desk app); a Rails app beside them is a second home for the same facts, against "one home per fact" in `CLAUDE.md` · 2026-10-28). Its cited-source assistant is a fair reference for the shape of an answer under the AI business infrastructure line (`core/services.md`), but that is a pattern to read, not a tool to run.

## What would change it

- A client who asks for a ready project portal with their own tickets and hours, and who does not want a custom build.
- The desk app dropping its own client and ticket views.

## Source

https://github.com/lalabase/lalabase · fetched 2026-10-28 · "Lalabase". README and LICENSE read from raw.githubusercontent.com; repository page by trafilatura. The post also links a Hacker News thread, not read.
