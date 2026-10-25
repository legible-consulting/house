# Stub: Portfolio: a case study per finished build and a portfolio index

- feature-slug: portfolio
- epic: house-modules
- sequence: 6 of 8
- depends-on: none
- complexity: medium
- priority: P2

## Problem

Proposals cite work from memory and training examples are not checked against real builds.

## Proposed change

A module that produces a case study per finished build, at `clients/<slug>/case/case.md`, and a current portfolio index, seeded from the four cases on jamienisbet.com. Its folder is `portfolio/`.

## Acceptance criteria

- [ ] `portfolio/CONTEXT.md`, `status: built`.
- [ ] Four cases seeded: Agorasim, and the three others on the site.
- [ ] `02-proposal/CONTEXT.md` names the index as an Input.

## Out of scope

- Any other module. One stub, one folder.

## Notes

`core/wave.md` already describes the case file's home.
