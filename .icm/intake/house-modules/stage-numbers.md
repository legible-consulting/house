# Stub: The stage folders carry their final numbers, with a gap for each stage not built yet

- feature-slug: stage-numbers
- epic: house-modules
- sequence: 1 of 9
- depends-on: none
- complexity: low
- priority: P1

## Problem

The stages a deal walks are numbered in order (`core/lexicon.md`). Four stages are not built yet: client research, the agreement, kickoff and handover. Today `02-proposal`, `03-quote` and `04-build` hold the numbers those stages take. Every module that lands would renumber the folders after it and every cross-reference with them, four times over.

## Proposed change

Renumber once. `02-proposal` becomes `03-proposal`, `03-quote` becomes `04-quote`, `04-build` becomes `07-build`. The numbers 02, 05, 06 and 08 stay free for client research, the agreement, kickoff and handover. A gap says a stage is not built yet, and its ticket is in this epic.

## Acceptance criteria

- [ ] `03-proposal/`, `04-quote/` and `07-build/` exist, with their contracts and files unchanged inside. `02-proposal/`, `03-quote/` and `04-build/` are gone.
- [ ] `CLAUDE.md` Routing, the folder table in `core/lexicon.md`, `clients/CONTEXT.md`, `desk/app/lib/house.ts`, `clients/euro-register/agreement/cover-note.md`, `core/wave.md` and the three moved contracts name the new paths. `grep -rnE '0[2-4]-(proposal|quote|build)'` over the tracked files finds nothing outside `.icm/intake/`.
- [ ] The lexicon's folder table lists the final order and says, in one line with its why and date, that 02, 05, 06 and 08 are stages not built yet, with a ticket each in `.icm/intake/house-modules/`.
- [ ] `check.yml` is green: `contracts`, `placement` and `desk` pass with the moved folders.

## Out of scope

- Any change to a contract's words beyond the paths.
- The other stubs of this epic: they already name the final numbers.

## Notes

Use `git mv` so history follows. `desk/app/scripts/read-house.mjs` reads `01-prospecting/` only, which does not move. `clients/berceo/quote/negotiation.md` names a legacy file `03-quote.md` under `~/Desktop/Apps/`; that is not a house path and stays. Read first: `CLAUDE.md`, `core/lexicon.md` (The folders of the house), the three contracts.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, .icm/intake/CONTEXT.md, .icm/intake/house-modules/breakdown.md, then this ticket, .icm/intake/house-modules/stage-numbers.md. Do what it says. One branch, one pull request to main, message starts with "house:". Move the stub to .icm/intake/house-modules/_done/ in the same pull request. Never run build, lint or dev. Do not merge. Your last message names the pull request and what waits on Jamie.
