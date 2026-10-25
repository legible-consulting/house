---
tool: DuckDB
kind: repo
verdict: adopt
tier: verdict
use: [proposal, house]
tags: [sql, csv, json]
recheck: 2027-04-14
source: "https://duckdb.org"
date: 2026-10-14
---

# DuckDB

Audited on 2026-10-14 for a proposal and the house (the ledger's section "D. Money, hours, data, alerts, AI cost"). Licence and latest release at the audit: MIT · 1.5.6 (2026-09).

## Verdict: adopt

Adopt (why: SQL over CSV/JSON/Parquet with globs; `SELECT client,next_action,deadline FROM read_json('fm/*.json') ORDER BY deadline` is the Friday review; `GROUP BY stage` is the pipeline · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://duckdb.org · audited 2026-10-14 · from the library's ledger, section "D. Money, hours, data, alerts, AI cost". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.
