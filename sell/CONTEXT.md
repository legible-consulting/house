---
holds: []
---
# Sell — the S pipeline

Five stages in order. Each produces one artefact into `clients/<slug>/`; the next stage declares that artefact as its only Input. Nothing else couples them. Only "straight to proposal" has ever landed work, so there is no free look and no paid diagnostic stage (why: interview 2026-10-14).

## Inputs

- `clients/<slug>/record.md` names the stage the relationship is at. Go to that stage's folder.

## Process

- Defined when the module is built (Wave 1 for C1, C2, D2, D4; later waves for the rest).
- Start cold from this folder. Read only what Inputs names.

## Outputs

- `01-prospecting/` S1 → `02-research/` S2 → `03-proposal/` S3 → `04-quote/` S4 → `05-agreement/` S5.
