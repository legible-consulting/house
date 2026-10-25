---
concept: Google service account with domain-wide delegation
kind: concept
verdict: adopt
tier: verdict
modules: [C3, S3, D1]
tags: [google, auth, ci]
recheck: 2027-04-14
source: "https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj"
date: 2026-10-14
---

# Google service account with domain-wide delegation

Audited on 2026-10-14 for C3, S3, D1 (the ledger's section "E. Google Workspace"). Licence and latest release at the audit: docs.

## Verdict: adopt

Adopt (why: Service accounts own nothing on Drive (no quota); impersonating jamie@ makes Jamie the owner and never expires; one key as a CI secret works from any cloud runner. OAuth apps left in "Testing" expire refresh tokens after 7 days. Keyless federation chained to delegation is unverified · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj · audited 2026-10-14 · from the library's ledger, section "E. Google Workspace". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.
