---
status: built
holds:
  - README.md
  - "*/breakdown.md"
  - "*/*.md"
  - "*/_done/*.md"
  - "triage/*.md"
  - "triage/_done/*.md"
  - "_done/**"
---
# Intake — the house's own tickets

The house's work on itself, as tickets in the blueprint's shape, so that the desk's Work page lists them beside the client repos' tickets and a session takes one cold.

## Inputs

- The blueprint's `template/.icm/intake/CONTEXT.md`: the stub, the breakdown, the folder as status and the loop from stub to merge. This folder keeps that shape and adds nothing (why: one ticket format across the estate, read by one desk · 2026-10-25).
- `CLAUDE.md`: the Boundaries and the house rules.

## Process

- An epic is a folder with `breakdown.md` and one stub per unit of work. A one-off is a stub in `triage/`. The path is the identity. The folder is the status: open here, done in `_done/`. Nothing is deleted.
- A session takes a stub: it reads the stub and the contract the stub names, works on a branch, moves the stub to `_done/` in the same pull request, and opens the pull request. Jamie merges.
- A module the business needs and the house does not have yet is a stub here until its first real walk writes the folder and its contract. The stub names the folder (why: the tree shows what exists; the stub holds the promise · 2026-10-25).

## Outputs

- `<epic-slug>/breakdown.md` and `<epic-slug>/<feature-slug>.md`; `triage/<slug>.md`; each one's `_done/`.
