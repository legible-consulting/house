# Stub: Every repo of the estate carries a one-line AGENTS.md that sends any agent to CLAUDE.md

- lane: chore
- found-by: the open-source agent spike · 2026-10-29
- complexity: low
- priority: P1

## Problem

Nine of the eleven agents the spike read take `AGENTS.md` as the instruction file by default. `CLAUDE.md` is a fallback name in some and absent in others. Hermes Agent reads `.hermes.md`, then `AGENTS.override.md`, then `AGENTS.md`, then `CLAUDE.md`, first match wins. The house's map is `CLAUDE.md` in every repo, and the blueprint renders it. Without `AGENTS.md`, each new agent needs a setting or an environment variable to find the map. Jamie's answer, 2026-10-29: yes, render the pointer.

## Proposed change

The blueprint renders `AGENTS.md` at the root of every build and every workspace: one line that sends the agent to `CLAUDE.md` first, then to the routed contract. The house gets the same file. `conventions/README.md` gets the row. The live repos get it at the next tag. One pull request on `legible-consulting/blueprint`, one on the house, then the move of this stub.

## Acceptance criteria

- [ ] `template/AGENTS.md` exists, under five lines, with no client name and no path on one machine. It says: read `CLAUDE.md` first, then only the contract it routes to; gates are human checkboxes; never build an orchestrator. The same words as the house's `.goosehints` had (removed 2026-10-29, `goose-worktrees/goose-task-script`).
- [ ] It renders for a build and for a workspace. `check.yml`'s render job checks that it exists in each proof answer set.
- [ ] `AGENTS.md` is not in `_skip_if_exists`: it is the blueprint's file.
- [ ] `conventions/README.md` has the row `Agent map`: `AGENTS.md` is the blueprint's, one line that points at `CLAUDE.md`, and why.
- [ ] The house has `AGENTS.md` at the root with the same words, and `check.yml`'s `placement` job holds it as it holds `CLAUDE.md`.
- [ ] `core/stack.md` names `AGENTS.md` as the agent map of every repo.

## Out of scope

- `library` and `.github`: the triage stub `goosehints-library-and-github` carries the file for those two repos.
- The live repos: they get the file at the next conformance tag, with `estate-worktree-files`.
