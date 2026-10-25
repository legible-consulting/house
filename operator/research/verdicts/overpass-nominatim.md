---
tool: Overpass API + Nominatim
kind: service
verdict: adopt
tier: verdict
modules: [S1, S2, O1]
tags: [openstreetmap, geocode, prospects]
recheck: 2027-04-14
source: "https://wiki.openstreetmap.org/wiki/Overpass_API"
date: 2026-10-14
---

# Overpass API + Nominatim

Audited on 2026-10-14 for S1, S2, O1 (the ledger's section "F. Research capture, prospect data"). Licence and latest release at the audit: AGPL software · ODbL data.

## Verdict: adopt

Adopt (why: Query OpenStreetMap by tag and area (`craft=electrician` in Mafra); geocode with `countrycodes=pt`. The only free list source for local trades by area. ODbL attribution and share-alike on derived databases; fair use about 10k queries a day, 1 request/s on Nominatim; commercial volume means self-hosting · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://wiki.openstreetmap.org/wiki/Overpass_API · audited 2026-10-14 · from the library's ledger, section "F. Research capture, prospect data". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.
