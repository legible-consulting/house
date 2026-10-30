---
concept: Google service account with domain-wide delegation
kind: concept
verdict: adopt
tier: verdict
use: [build, proposal, house]
tags: [google, auth, ci]
recheck: 2027-04-14
source: "https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj"
date: 2026-10-14
---

# Google service account with domain-wide delegation

Audited on 2026-10-14 for a build, a proposal and the house (the ledger's section "E. Google Workspace"). Licence and latest release at the audit: docs.

## Verdict: adopt

Adopt (why: Service accounts own nothing on Drive (no quota); impersonating jamie@ makes Jamie the owner and never expires; one key as a CI secret works from any cloud runner. OAuth apps left in "Testing" expire refresh tokens after 7 days. Keyless federation chained to delegation is unverified · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj · audited 2026-10-14 · from the library's ledger, section "E. Google Workspace". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.

## Update 2026-10-30

`core/render/place.sh` copies a PDF into the client's Drive folder over the GNOME mount today, on Jamie's laptop (`core/stack.md`, § The renderer, 2026-10-22). The epic `google-service-account` adopts this concept: one service account that impersonates `contact@jamienisbet.com` through domain-wide delegation, its key a secret and never a file. The mount route leaves when its `place-from-anywhere` ticket lands (`.icm/intake/google-service-account/breakdown.md`). The verdict stays `adopt`.
