---
status: stub
holds: []
---
# Deliver — the D pipeline

Four stages. D1 is the one session that attaches two repos (this one and the new client repo); D2 runs on the client repo alone; D3 writes back here; D4 runs over the estate from CI and the local lane.

## Inputs

- `clients/<slug>/record.md` at `stage: kickoff`, `build`, `handover` or `after`.

## Process

- Defined when the module is built (Wave 1 for C1, C2, D2, D4; later waves for the rest).
- Start cold from this folder. Read only what Inputs names.

## Outputs

- `01-kickoff/` D1 → `02-sdlc/` D2 → `03-handover/` D3; `04-conformance/` D4 runs on a schedule, not in the chain.
