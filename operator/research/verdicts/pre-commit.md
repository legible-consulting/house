---
tool: pre-commit
kind: repo
verdict: adopt
tier: verdict
modules: [C1, C2, D4]
tags: [hooks, ci]
recheck: 2027-04-14
source: "https://github.com/pre-commit/pre-commit"
date: 2026-10-14
---

# pre-commit

Audited on 2026-10-14 for C1, C2, D4 (the ledger's section "A. Repo structure, validation and voice"). Licence and latest release at the audit: MIT · 4.7.0 (2026-10).

## Verdict: adopt

Adopt (why: One config runs check-jsonschema, yamllint, gitleaks; `pre-commit run --all-files` in CI · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://github.com/pre-commit/pre-commit · audited 2026-10-14 · from the library's ledger, section "A. Repo structure, validation and voice". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.
