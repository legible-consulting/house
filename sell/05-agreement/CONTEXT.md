---
status: stub
holds: []
---
# Agreement — S5

S5 produces the signable contract from the accepted proposal and quote, in the client's language, so that signature happens on a document that restates nothing and the folder holds exactly what was agreed.

## Inputs

- `clients/<slug>/proposal/proposal.md`, `clients/<slug>/quote/quote.md`.
- `core/terms.md`.

## Process

- Defined when the module is built (Wave 1 for C1, C2, D2, D4; later waves for the rest).
- Start cold from this folder. Read only what Inputs names.

## Outputs

- `clients/<slug>/agreement/agreement.md` → PDF; signed through Google Docs eSignature; the signed copy's Drive link recorded in the record.
