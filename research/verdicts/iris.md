---
tool: Iris
kind: skill
verdict: watch
tier: verdict
use: [build, house]
tags: [screenshots, playwright, cli]
recheck: 2027-04-25
source: https://github.com/brijr/iris
shared: https://www.facebook.com/share/r/19epR6Gwho/
via: GithubSignals
date: 2026-10-25
---

# Iris

Iris is a command and a local MCP server that takes one screenshot of a page in an installed Chrome-family browser: sizes, dark mode, a selector, batches. Bridger Tower makes it in Rust. Licence MIT.

## Verdict: watch

Watch (why: shot-scraper is adopted for screenshots in research (`verdicts/shot-scraper.md`), and the Playwright plugin gives a the build session eyes on a preview; Iris does the same job with an MCP tool and no Python, so it adds a third route to one job · 2026-10-25).

## What would change it

- shot-scraper or the Playwright plugin fails in the cloud environment where Iris works.
- the build needs visual checks of each preview inside a session, and the MCP tool is faster than the plugin.

## Source

https://github.com/brijr/iris · fetched 2026-10-25 · "iris: a camera for coding agents". gh api refused (HTTP 403: repository not enabled for this session); README and licence read from raw.githubusercontent.com.
