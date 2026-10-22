---
status: stub
holds: []
---
# Deliver — the D pipeline

Four stages. D1 is the one session that attaches two repos (this one and the new client repo); D2 runs on the client repo alone; D3 writes back here; D4 runs over the estate from CI and the local lane.

## Inputs

- `clients/<slug>/record.md` at `stage: kickoff`, `build`, `handover` or `after`.

## Process

- Not written yet. A session writes it from the first real walk.
- Start cold from this folder. Read only what Inputs names.

## Outputs

- `01-kickoff/` D1 → `02-sdlc/` D2 → `03-handover/` D3; `04-conformance/` D4 runs on a schedule, not in the chain.
