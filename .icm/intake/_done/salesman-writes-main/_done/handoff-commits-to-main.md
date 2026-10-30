# Stub: Ready for Jamie commits the client folder to main, and the row is handed off at once

- feature-slug: handoff-commits-to-main
- epic: salesman-writes-main
- sequence: 2 of 2
- depends-on: desk-writes-table
- complexity: medium
- priority: P2

## Problem

`ready for Jamie` opens a pull request, Jamie merges it, and then a person clicks "Check the PR" on the row to set `handed off`. Three steps and two people for one structured act whose fields the model fixes. Jamie's word, 2026-10-29: a constrained and structured salesman action goes straight to `main`.

## Proposed change

`ready for Jamie` commits `clients/<slug>/record.md` and the move of `leads/<slug>/` to `main` as one commit through the function of `desk-writes-table`, with the message `prospecting: <slug> handed off by <handle>`. The row goes to `handed off` and `record` is set in the same request. "Check the PR" leaves the row page. `01-prospecting/CONTEXT.md` The handoff, `prospect.md` Statuses and the handoff mapping, and `clients/CONTEXT.md` Process say the commit is the handoff. One pull request on the house.

## Acceptance criteria

- [ ] A salesman sets `ready for Jamie` with every `ready` field filled: one commit lands on `main` with the record at `stage: prospect` and the lead's files under `clients/<slug>/<folder>/`, and the row shows `handed off` with `record` set, in one request.
- [ ] The commit message is `prospecting: <slug> handed off by <handle>`, and the commit's author is `DESK_PAT`'s owner, as today.
- [ ] A missing `ready` field, a slug that exists in `clients/`, or a lead file with no `folder:` stops the action before any write, in words, and the row stays.
- [ ] A 409 on `main` retries once, then fails in words, and the row stays at `ready for Jamie` with nothing written.
- [ ] "Check the PR" is gone from the row page. The handed-off row links its record on the desk.
- [ ] `01-prospecting/CONTEXT.md`, `prospect.md` and `clients/CONTEXT.md` say that the commit is the handoff, each with the why and the date, and no line says "Jamie merges the handoff".
- [ ] `desk/CONTEXT.md`'s table has the handoff row with the new identity line.

## Out of scope

- A review step for Jamie before the commit. He reads the folder afterwards, and `stage` moves only on his decision to research.
- Jamie's own leads. He opens the folder as `clients/CONTEXT.md` allows.
