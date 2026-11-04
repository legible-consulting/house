---
tool: Skills For Real Engineers (mattpocock/skills)
kind: skill
verdict: watch
tier: deep
use: [build]
tags: [skill, claude, code]
recheck: 2027-05-04
source: https://github.com/mattpocock/skills
shared: https://www.facebook.com/share/r/1ELqmjv7DN/
via: Amr Tawfik
date: 2026-11-04
---

# Skills For Real Engineers (mattpocock/skills)

A set of agent skills by Matt Pocock for Claude Code, Codex, Copilot and other agents. It installs as a Claude Code plugin from the official marketplace. The skills cover alignment before work (`/grill-me`, `/grill-with-docs`), a shared glossary, specs and tickets, test-driven development (`/tdd`), bug diagnosis, code review, and a survey of a codebase for deeper modules (`/improve-codebase-architecture`). MIT licence. Free.

## Verdict: watch

Watch for `build` (why: the house already carries one global skill, `asd-ste100`, and the code-review and code-simplifier plugins (`core/stack.md`, Local machine), and a build's tickets, glossary and review already have homes in the blueprint and `07-build/CONTEXT.md`; `/setup-matt-pocock-skills` writes its own issue-tracker, label and doc layout into each repo, which would make a second home for the same facts; `/tdd` and `/improve-codebase-architecture` are worth a trial on one build, outside the template · 2026-11-04).

## What would change it

- A trial of `/tdd` or `/improve-codebase-architecture` on one client build finds real problems that the code-review plugin did not find. Then adopt that one skill, with its folder copied, not the whole plugin.
- The skills drop the per-repo setup, or the setup can point at the blueprint's existing layout.
- The plugin's automatic updates change a skill's behaviour between two sessions of one build.

## How the house would use it

Build, at a refactor ticket in a client repo (`07-build/CONTEXT.md`): run `/improve-codebase-architecture` and read its candidates beside the blueprint's conventions. It adds a design survey the house does not have; it replaces nothing yet.

## To try

`claude plugin install mattpocock-skills@claude-plugins-official` in a scratch clone of one client repo, then `/improve-codebase-architecture`. A good result: the candidates name modules a reviewer agrees are shallow, and none contradicts the blueprint's conventions.

## Source

https://github.com/mattpocock/skills · fetched 2026-11-04 · "Skills For Real Engineers". README read from raw.githubusercontent.com. Shared from a reel by Amr Tawfik, caption read with yt-dlp 2026.10.26 (uvx); it named "Matt Pocock's free skills" with no link. Found by search. The caption's claim that an open coding model's training rules reward passing tests and not clean code is not in the README and was not checked. "Comment CARE and I'll send you Matt's free skills" is a call to act.
