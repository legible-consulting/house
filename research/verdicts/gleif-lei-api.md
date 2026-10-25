---
tool: GLEIF LEI API
kind: service
verdict: adopt
tier: verdict
use: [prospecting, house]
tags: [companies, api, prospects]
recheck: 2027-04-14
source: "https://api.gleif.org/api/v1/lei-records"
date: 2026-10-14
---

# GLEIF LEI API

Audited on 2026-10-14 for prospecting and the house (the ledger's section "F. Research capture, prospect data"). Licence and latest release at the audit: CC0.

## Verdict: adopt

Adopt (why: No key; `filter[entity.legalAddress.country]=PT` returned 18,680 legal entities with names and addresses, skewed to finance-facing firms · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://api.gleif.org/api/v1/lei-records · audited 2026-10-14 · from the library's ledger, section "F. Research capture, prospect data". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.
