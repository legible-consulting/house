---
tool: Typst
kind: repo
verdict: watch
tier: verdict
use: [build, proposal, workshop]
tags: [pdf, typesetting]
recheck: 2027-04-14
source: "https://typst.app"
date: 2026-10-14
---

# Typst

Audited on 2026-10-14 for a build, a proposal and a workshop (the ledger's section "B. Documents"). Licence and latest release at the audit: Apache-2.0 · 0.15.1 (2026-07).

## Verdict: adopt

Adopt (why: Single-binary typesetter that reads shared-core and client YAML in the template (`yaml()`, `--input`), pins fonts (`--font-path --ignore-system-fonts`), emits PDF/A and PDF/UA, reproducible with `--creation-timestamp`. The model writes the body only. Decision 2026-10-14: markdown-to-PDF goes through pdfcn (see Decisions below); Typst stays recorded as the data-driven alternative · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://typst.app · audited 2026-10-14 · from the library's ledger, section "B. Documents". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.

## Update 2026-10-30

Verdict flipped from `adopt` to `watch`: no moment is left. The house renders client documents with pdfcn's components on Forme, under `core/render/` (`core/stack.md`, § The renderer, 2026-10-14 and 2026-10-26). Typst stays recorded as the data-driven alternative, for a later decision that reopens markdown-to-PDF. The recheck date 2027-04-14 stands.
