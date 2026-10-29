# Stub: An agent session on library or .github starts with a map

- lane: chore
- found-by: the alignment read of the open stubs against goose and Emdash · 2026-10-29. Re-cut 2026-10-29: goose left the lane, so `.goosehints` is not added
- complexity: low
- priority: P2

## Problem

Most agents read `AGENTS.md` by default (triage stub `agents-md-pointer`). `legible-consulting/library` and `legible-consulting/.github` have none, and `.github` has no `CLAUDE.md`. An agent session on either repo starts with no map. The open stub `check-environments-table` is a pull request on `.github`.

## Proposed change

Each of the two repos gets a one-line `AGENTS.md` that points at `CLAUDE.md` (triage stub `agents-md-pointer`). `.github` also gets a `CLAUDE.md` of a few lines that says what the repo is and routes to `check-client.yml`. One pull request per repo, then the move of this stub.

## Acceptance criteria

- [ ] `legible-consulting/library` has `AGENTS.md` at the root, and it sends the agent to `CLAUDE.md` first.
- [ ] `legible-consulting/.github` has `AGENTS.md` and a `CLAUDE.md` under 30 lines that names the repo's job and its reusable workflows.
- [ ] Neither file names a client, a secret or a path on one machine.

## Notes

- Questions for Jamie. 1. Does `.github` get a `CLAUDE.md`? Default: yes, a short one, because `AGENTS.md` has nothing to point at without it.
