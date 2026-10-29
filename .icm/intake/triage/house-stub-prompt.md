# Stub: The stub grammar says whether a ticket carries its own Prompt section

- lane: chore
- found-by: the review of the open tickets · 2026-10-29
- complexity: low
- priority: P2

## Problem

The desk copies a stub's `## Prompt` section as the words that start it in a session (`desk/app/lib/work.ts`, `.icm/intake/README.md`). The blueprint's stub grammar in `.icm/intake/CONTEXT.md` has no such section. The house's `.icm/intake/CONTEXT.md` says it keeps the blueprint's shape "and adds nothing". One house stub has a Prompt. A session that reads the grammar does not know the section exists.

## Proposed change

Decide once: the blueprint's stub grammar gains an optional `## Prompt` section with one line on what it holds, or the desk stops reading it and builds the prompt from the stub alone. One pull request on the repo the answer names.

## Acceptance criteria

- [ ] `.icm/intake/CONTEXT.md` in the blueprint § The stub names `## Prompt` as optional, and says the desk copies it, or `desk/app/lib/work.ts` reads no Prompt section and the README says so.
- [ ] The house's `.icm/intake/CONTEXT.md` and `README.md` say the same as the blueprint.

## Questions

1. Which? Default: the grammar gains the section. A stub that names its own repo, branch and first file saves the session a read, and the desk already shows it.
