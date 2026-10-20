---
status: stub
holds: []
---
# Proposal — S3

S3 produces the client-facing offer (problem, approach, scope, timeline) in the client's language, as branded PDF, Google Doc in their Drive folder, and a page in the dashboard, so that a client can say yes to a document they understand without a second call.

## Inputs

- `clients/<slug>/research/profile.md`.
- `core/identity.md`, `core/services.md`, `core/voice.md`; `operator/research/concepts/` for reusable explainers.

## Process

- Defined when the module is built (Wave 1 for C1, C2, D2, D4; later waves for the rest).
- Start cold from this folder. Read only what Inputs names.

## Outputs

- `clients/<slug>/proposal/proposal.md` (source) → PDF rendered in CI, Doc placed in Drive from the session, page read by the dashboard.
- `clients/<slug>/tickets.md`: the ticket list derived from the proposal's scope, one line per ticket. D1 renders it into the client repo's `BUILD.md`.
