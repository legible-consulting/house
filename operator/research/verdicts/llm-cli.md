---
tool: llm + sqlite-utils
kind: repo
verdict: adopt
tier: verdict
modules: [S1, S2, O1]
tags: [llm, cli, usage-log]
recheck: 2027-04-14
source: "https://github.com/simonw/llm"
date: 2026-10-14
---

# llm + sqlite-utils

Audited on 2026-10-14 for S1, S2, O1 (the ledger's section "F. Research capture, prospect data"). Licence and latest release at the audit: Apache-2.0 · 0.36 (2026-09).

## Verdict: adopt

Adopt (why: CLI with YAML templates and fragments; every call logged to SQLite (`llm logs`); `llm-anthropic` plugin. A queryable usage log for API calls outside Claude Code · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://github.com/simonw/llm · audited 2026-10-14 · from the library's ledger, section "F. Research capture, prospect data". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.
