---
concept: Claude Code session JSONL
kind: concept
verdict: adopt
tier: verdict
modules: [C3, S4]
tags: [claude, usage, jsonl]
recheck: 2027-04-14
source: "https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj"
date: 2026-10-14
---

# Claude Code session JSONL

Audited on 2026-10-14 for C3, S4 (the ledger's section "D. Money, hours, data, alerts, AI cost"). Licence and latest release at the audit: local.

## Verdict: adopt

Adopt (why: `~/.claude/projects/<encoded-cwd>/<session>.jsonl` carries cwd, timestamp, model and usage; DuckDB `read_json` plus a price CSV is the offline fallback. Transcripts are pruned after `cleanupPeriodDays` (default 30): run before month end or raise it · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj · audited 2026-10-14 · from the library's ledger, section "D. Money, hours, data, alerts, AI cost". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.
