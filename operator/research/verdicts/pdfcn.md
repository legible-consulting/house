---
tool: pdfcn
kind: repo
verdict: adopt
tier: verdict
modules: [S3, S4, S5, D3, O4]
tags: [pdf, react, shadcn]
recheck: 2027-04-14
source: "https://github.com/shadcn-labs/pdfcn"
date: 2026-10-14
---

# pdfcn

Audited on 2026-10-14 for S3, S4, S5, D3, O4 (the ledger's section "B. Documents"). Licence and latest release at the audit: MIT · untagged (2026-09).

## Verdict: adopt

Adopt (why: Jamie's choice for markdown-to-PDF (2026-10-14). MIT registry of React PDF components (invoice, report, tables, forms, charts) installed with the shadcn CLI, so the code is owned, not a dependency. Two interchangeable renderers: Takumi (Rust) and Forme (HTML→PDF); server-side in Node 20.9+, no browser; PDF 1.7, fonts embedded and subsetted. Takes JSX, not markdown, so a markdown-to-components step is part of the build. By "shadcn-labs", not affiliated with shadcn. ~2.9k stars, last commit 2026-09-24, no release tags yet · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://github.com/shadcn-labs/pdfcn · audited 2026-10-14 · from the library's ledger, section "B. Documents". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.
