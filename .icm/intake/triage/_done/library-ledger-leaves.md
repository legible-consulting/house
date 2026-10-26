# Stub: The tool ledger leaves the library, and every pointer to it names research/

- lane: chore
- found-by: `research/CONTEXT.md` and `library/research/README.md` · 2026-10-25
- complexity: low
- priority: P2

## Problem

`library/research/design-trail/02-tool-research.md` seeded `research/verdicts/` and `concepts/` on 2026-10-25 (70 files). Its README says the file leaves once seeded; it is still there. The library's `CLAUDE.md` tells a session to write into `house/operator/research/`, a folder that left on 2026-10-25. In the house, `core/stack.md` points at the ledger for why a tool was chosen.

## Proposed change

In the library: delete the ledger, update the README row, and point `CLAUDE.md` at `house/research/`. In the house: `core/stack.md` points at `research/verdicts/`.

## Acceptance criteria

- [ ] `library/research/design-trail/02-tool-research.md` is gone. `library/research/README.md` keeps the goals row and the artifact link, and says the verdicts live in the house at `research/verdicts/`.
- [ ] `library/CLAUDE.md` names `house/research/` as where a session writes what it learns.
- [ ] `house/core/stack.md`'s first paragraph points at `research/verdicts/` for why a tool was chosen.
- [ ] Both repos' checks are green.

## Notes

The library is read-only for a session that attaches it as reference. This change is Jamie's own, from the desktop checkout `~/Desktop/legible-consulting/library`, by Jamie or by a desktop session Jamie starts for it. Two pull requests: the library's (Conventional Commits) and the house's (message starts with "research:", the stub moved to `_done/`).

## Prompt

Desktop. Two repos: legible-consulting/library at ~/Desktop/legible-consulting/library and legible-consulting/house at ~/Desktop/legible-consulting/house. Read the house ticket .icm/intake/triage/library-ledger-leaves.md first, then the library's CLAUDE.md and research/README.md. Jamie started this session for the library change, so its never-edit rule does not bind it. Do what the ticket says: one pull request in the library, one in the house that moves the stub to .icm/intake/triage/_done/. Do not merge. Your last message names both pull requests.
