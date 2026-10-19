---
holds: []
---
# Quote — S4

S4 produces the price, options and payment terms; the engagement's own economics (hours, model cost, hosting, margin); a private negotiation record (positions, concessions, a floor); and every invoice the agreement calls for, as branded PDF, so that Jamie quotes informed by the last deal, never goes below his floor, and sends an invoice he did not write by hand.

## Inputs

- `clients/<slug>/proposal/proposal.md`.
- `core/services.md` (pricing), `core/terms.md`; the last closed quote for comparison.

## Process

- Defined when the module is built (Wave 1 for C1, C2, D2, D4; later waves for the rest).
- Start cold from this folder. Read only what Inputs names.

## Outputs

- `clients/<slug>/quote/quote.md` · `economics.yaml` · `negotiation.md` (private) · `invoices/<n>.yaml` (structured, not prose; the dashboard reads them).
