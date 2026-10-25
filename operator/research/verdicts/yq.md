---
tool: yq
kind: repo
verdict: adopt
tier: verdict
modules: [C1, C2, D4]
tags: [yaml, frontmatter, cli]
recheck: 2027-04-14
source: "https://github.com/mikefarah/yq"
date: 2026-10-14
---

# yq

Audited on 2026-10-14 for C1, C2, D4 (the ledger's section "A. Repo structure, validation and voice"). Licence and latest release at the audit: MIT · 4.54.1 (2026-09).

## Verdict: adopt

Adopt (why: `--front-matter=extract` / `=process` turns every record's frontmatter into a JSON row or edits it in place. The hinge for all other checks · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://github.com/mikefarah/yq · audited 2026-10-14 · from the library's ledger, section "A. Repo structure, validation and voice". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.
