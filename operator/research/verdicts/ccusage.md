---
tool: ccusage
kind: repo
verdict: adopt
tier: verdict
modules: [C3, S4]
tags: [claude, cost, usage]
recheck: 2027-04-14
source: "https://github.com/ryoppippi/ccusage"
date: 2026-10-14
---

# ccusage

Audited on 2026-10-14 for C3, S4 (the ledger's section "D. Money, hours, data, alerts, AI cost"). Licence and latest release at the audit: MIT · 20.0.32 (2026-10-14).

## Verdict: adopt

Adopt (why: Per-engagement Claude spend from `~/.claude/projects/**/*.jsonl`: `--instances` groups by project folder, `projectAliases` folds worktrees, `--offline` cached prices. Cost is list-price "would-cost" under a subscription. Anthropic's usage and cost APIs are closed to individual accounts, so this is the only deterministic source. Rust core since v20; expect churn · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://github.com/ryoppippi/ccusage · audited 2026-10-14 · from the library's ledger, section "D. Money, hours, data, alerts, AI cost". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.
