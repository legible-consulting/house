---
tool: GAM7
kind: repo
verdict: adopt
tier: verdict
use: [build, proposal, house]
tags: [google, admin, cli]
recheck: 2027-04-14
source: "https://github.com/GAM-team/GAM"
date: 2026-10-14
---

# GAM7

Audited on 2026-10-14 for a build, a proposal and the house (the ledger's section "E. Google Workspace"). Licence and latest release at the audit: Apache-2.0 · 7.48.26 (2026-10-12).

## Verdict: adopt

Adopt (why: Workspace admin CLI on the same service account: `gam user j@ add drivefile localfile x.md mimetype gdoc parentid <id>`; calendar and gmail verbs. Jamie is his own admin · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://github.com/GAM-team/GAM · audited 2026-10-14 · from the library's ledger, section "E. Google Workspace". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.

## Update 2026-10-30

The house does not install GAM7 today (`core/setup/`). The verdict stays `adopt` for its moment named in the epic `google-service-account`: GAM7 and gogcli for a person at a terminal, for Workspace admin (`.icm/intake/google-service-account/breakdown.md`, Question 5). The epic is not built. The Drive copy runs through `core/render/place.sh` over the GNOME mount today (`core/stack.md`, § The renderer), not through GAM7.
