# Stub: Kickoff: the access table, the kickoff note and the client repo rendered from the blueprint

- feature-slug: kickoff
- epic: house-modules
- sequence: 3 of 8
- depends-on: none
- complexity: medium
- priority: P1

## Problem

A signed build starts by hand: access is asked twice, the repo is rendered from memory, the proposal's scope is cut into tickets without a procedure.

## Proposed change

A module that produces the access table, the kickoff note and the client's repo rendered from the blueprint with copier, and cuts the proposal's scope into the client repo's `.icm/intake/`. The one session that attaches two repos (`CLAUDE.md`, house rules). Its folder sits before the build.

## Acceptance criteria

- [ ] A kickoff contract, `status: built`, written from the first signed build.
- [ ] The access-table, kickoff-note and client questionnaire templates.
- [ ] `02-proposal/CONTEXT.md` and `04-build/CONTEXT.md` name it.

## Out of scope

- Any other module. One stub, one folder.

## Notes

`clients/agorasim/kickoff/` and `clients/euro-register/kickoff/` hold what was done by hand.
