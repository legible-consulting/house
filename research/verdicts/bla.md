---
tool: BLA (Blind LLM Agents)
kind: repo
verdict: decline
tier: glance
use: []
tags: [security, agents]
recheck: 2027-10-30
source: https://github.com/qybaihe/bla
shared: https://www.facebook.com/share/r/18cJATB3xB/
via: Marco Kazandjieff
date: 2026-10-30
---

# BLA (Blind LLM Agents)

A CLI and MCP server that plants decoys, canary keys and padding in a release build so that AI reverse-engineering agents such as REA hit their budgets and stop. Licence MIT, on npm as `bla-agents`.

## Verdict: decline

Decline: the house keeps every secret on the server, its builds ship nothing worth hiding, and fake keys in a client's release would trip the secret scan that the house runs in CI (`verdicts/gitleaks.md`); REA is declined too (`verdicts/rea.md`).

## Source

https://github.com/qybaihe/bla · fetched 2026-10-30 · "BLA: Blind LLM Agents". README, LICENSE and DISCLAIMER.md from raw.githubusercontent.com; the repository page refused trafilatura (SSL error). Caption read with yt-dlp 2026.10.26. The benchmark numbers are the authors' own.
