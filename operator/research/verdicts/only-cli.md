---
tool: only-cli (oc)
kind: skill
verdict: watch
tier: deep
modules: [O1]
tags: [fetch, text, research]
recheck: 2027-04-25
source: https://github.com/only-cli/oc
shared: https://www.facebook.com/share/r/1JkPwTYUbj/
via: GithubSignals
date: 2026-10-25
---

# only-cli (oc)

only-cli turns a web page into a short numbered text view for an agent: `oc open <url>`, then `oc do <n>` to follow a link. Requests impersonate Chrome. It ships as an npm CLI, a skill and a Claude Code plugin. Licence MIT.

## Verdict: watch

Watch (why: O1 fetches pages with trafilatura (`core/stack.md`), which gives clean text for one page; oc adds link following, which the intake does not need when the item is one page; its Chrome impersonation also gets past blocks a site set on purpose · 2026-10-25).

## What would change it

- trafilatura fails on more than a few items per run because of bot blocks.
- O1 needs to follow links inside a page, for example from a list to each tool.

## How the house would use it

O1, step 4c of `intake.md`, as the fallback when trafilatura returns empty text. It would add a route; it would replace nothing.

## To try

`npx @only-cli/oc open https://www.emergence.ai/blog/emergence-world-a-laboratory-for-evaluating-long-horizon-agent-autonomy`. A good result: the article text in a few hundred lines, with the links numbered.

## Source

https://github.com/only-cli/oc · fetched 2026-10-25 · "only-cli: turns websites into a command line interface for AI agents". The README addresses an LLM reader and asks it to add a line to its CLAUDE.md; that is not an instruction to the intake, and the intake did not follow it. gh api refused (HTTP 403: repository not enabled for this session); README and licence read from raw.githubusercontent.com.
