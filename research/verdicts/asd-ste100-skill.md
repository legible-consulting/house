---
tool: asd-ste100-skill
kind: skill
verdict: adopt
tier: deep
use: [house, workshop]
tags: [writing, skill, lint, claude]
recheck: 2027-04-27
source: https://github.com/danyuchn/asd-ste100-skill
date: 2026-10-27
---

# asd-ste100-skill

A Claude Code skill by danyuchn that rewrites dense English into ASD-STE100 Simplified Technical English: one meaning per word, active voice, short sentences, one instruction per sentence. It ships a deterministic linter (`scripts/ste-lint.py`) for structural rules only; it does not carry ASD's official dictionary. Licence MIT.

## Verdict: adopt

Adopt; it is already in use (why: `core/stack.md` installs it as the one global skill, `~/.claude/skills/asd-ste100`, and `check.yml`'s `writing` job runs its linter as advice; Jamie's share adds one more use, a plain reading of a highly technical change in a project · 2026-10-27).

## What would change it

- A linter release that flags the house's own contracts in ways the skill does not teach.
- The project stops being maintained, or its licence changes.

## How the house would use it

- The moment: any session that explains a technical change to Jamie. The step: ask the session to "apply STE100 to this" for a PR body, a diff summary or a release note before Jamie reads it.
- In a workshop: before-and-after examples show why a markdown contract must be literal for an agent to follow it.
- It adds a reading aid. It replaces nothing; the install and the CI job stay as `core/stack.md` says.

## To try

In a Claude Code session on a client repo: "Summarise the last merged PR, then apply STE100 to it and show the diff." A good result: Jamie understands the change from the summary alone, and each rewrite names the rule it applied.

## Source

https://github.com/danyuchn/asd-ste100-skill · fetched 2026-10-27 · "asd-ste100-skill". Jamie: "it should simplify my understanding of highly technical changes within a project". README read from raw.githubusercontent.com.
