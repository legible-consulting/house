---
tool: Pullboard
kind: repo
verdict: decline
tier: verdict
use: [build]
tags: [agents, cli, tickets]
recheck: 2027-05-04
source: https://github.com/pullboard-dev/pullboard
shared: https://github.com/pullboard-dev/pullboard?sfnsn=mo
date: 2026-11-04
---

# Pullboard

A coordination queue for many coding agents, by pullboard-dev, installed with `npx pullboard`. A person approves the rows of `SPEC.md` and the rules of `DOCTRINE.md`. Builder agents claim items, each in its own worktree, and a second agent verifies the commit; a coordinator agent then lands the accepted work on `main`, through the night, with no human move. It works with Claude Code, Codex and MCP clients, and pairs a phone for questions. MIT licence. Latest release named in the README: 0.9.3 on npm.

## Verdict: decline

Decline (why: Pullboard is an orchestrator that merges to `main` on an agent's accept, and the house rules say never build an orchestrator, and that a client repo's merge comes after a human tick on the preview (`CLAUDE.md`, House rules and Boundaries); the blueprint already gives a build its tickets, its branch per ticket and its CI as truth, so Pullboard would replace the folders and gates with its own board · 2026-11-04).

## What would change it

- Pullboard can stop at a pull request and leave the merge to a human tick, with the board only as a view of the tickets.
- A client's own team runs its repo on Pullboard, so build work has to happen in their tool.

## Source

https://github.com/pullboard-dev/pullboard · fetched 2026-11-04 · "Pullboard". README read from raw.githubusercontent.com; repository page read with trafilatura.
