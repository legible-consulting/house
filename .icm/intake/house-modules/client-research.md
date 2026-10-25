# Stub: Client research: a prospect profile and an industry primer before the first call

- feature-slug: client-research
- epic: house-modules
- sequence: 1 of 8
- depends-on: none
- complexity: medium
- priority: P1

## Problem

Jamie enters a first call without a written profile of the prospect or a primer on their trade, and the proposal has no one file to read for the client's language.

## Proposed change

A module that produces a prospect profile and an industry primer per client, so that Jamie enters the first call knowing the client's trade and the proposal speaks their language. Its folder is `02-client-research/`, between prospecting and the proposal; the later stages renumber.

## Acceptance criteria

- [ ] `02-client-research/CONTEXT.md` with Inputs, Process and Outputs, `status: built`, written from one real prospect.
- [ ] The profile and the primer land in `clients/<slug>/research/`.
- [ ] `02-proposal/CONTEXT.md` names the profile as an Input.

## Out of scope

- Any other module. One stub, one folder.

## Notes

The profiles already written by hand (`clients/*/research/profile.md`) are the examples to generalise from.
