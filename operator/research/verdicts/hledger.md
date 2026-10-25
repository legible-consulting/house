---
tool: hledger
kind: repo
verdict: adopt
tier: verdict
modules: [C3, S4]
tags: [money, ledger, plain-text]
recheck: 2027-04-14
source: "https://hledger.org"
date: 2026-10-14
---

# hledger

Audited on 2026-10-14 for C3, S4 (the ledger's section "D. Money, hours, data, alerts, AI cost"). Licence and latest release at the audit: GPL-3 · 1.52.4 (2026-09).

## Verdict: adopt

Adopt (why: Plain-text double entry: `bal assets:receivable` is owed; `areg … amt:'>0'` invoiced, `'<0'` paid; `--pivot` by client or rep tag; invoicing cookbook in `examples/invoicing`. Money and hours in one grammar · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://hledger.org · audited 2026-10-14 · from the library's ledger, section "D. Money, hours, data, alerts, AI cost". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.
