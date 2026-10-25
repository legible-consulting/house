# Stub: Desk: the contract's Process written from the running desk

- feature-slug: desk-process
- epic: house-modules
- sequence: 5 of 8
- depends-on: none
- complexity: low
- priority: P2

## Problem

`desk/CONTEXT.md` describes the app in full but its Process still reads "Not written yet", so the contract is a stub while the desk runs.

## Proposed change

Write the Process from the running desk: the glance, the close, the sync pill, the gates, the research queue, in the order a session walks them. Set `status: built`.

## Acceptance criteria

- [ ] `desk/CONTEXT.md` Process written; the placeholder line gone; `status: built`.
- [ ] CI's contracts job passes.

## Out of scope

- Any other module. One stub, one folder.

## Notes

The Outputs section already describes every route; the Process says what a session does with them.
