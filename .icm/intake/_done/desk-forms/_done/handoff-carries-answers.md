# Stub: The handoff PR moves a lead's answers into the client folder

- feature-slug: handoff-carries-answers
- epic: desk-forms
- sequence: 9 of 9
- depends-on: start-route
- complexity: medium
- priority: P1

## Problem

A lead's answers live in `01-prospecting/leads/<slug>/`. The handoff PR opens `clients/<slug>/record.md` and leaves them behind.

## Proposed change

`openHandoffPr` adds the move to its branch: every file in `01-prospecting/leads/<slug>/` goes to `clients/<slug>/<folder>/`, where `<folder>` is the file's frontmatter. The merge stays Jamie's.

## Acceptance criteria

- [ ] The handoff branch holds the record and the moved files, and the lead's folder is gone from it.
- [ ] A lead without a folder opens the same PR as today.
- [ ] A PR closed without a merge leaves `main` unchanged, as today.
- [ ] `01-prospecting/CONTEXT.md` says the move, under The handoff.
- [ ] `check.yml` is green.

## Out of scope

- A lead whose `slug` changed after the answers landed. The folder keeps the old slug, and Jamie moves it by hand.

## Notes

`openHandoffPr` writes the record with one Contents call on the branch today. A move is two Contents calls on the branch per file: a `PUT` at the new path, then a `DELETE` at the old one with its sha. `listFolder` lists the lead's folder on `main`. `lib/github.ts` gains the two calls and nothing else.
