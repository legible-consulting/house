# Stub: An agent session on library or .github starts with a map

- lane: chore
- found-by: the alignment read of the open stubs against goose and Emdash · 2026-10-29
- complexity: low
- priority: P2

## Problem

Goose reads `.goosehints`, not `CLAUDE.md`. The house and the blueprint have `.goosehints` (house pull request 175, blueprint pull request 37). `legible-consulting/library` and `legible-consulting/.github` have none, and `.github` has no `CLAUDE.md`. A goose task on either repo starts with no map. The open stub `check-environments-table` is a pull request on `.github`.

## Proposed change

Each of the two repos gets `.goosehints` with the words of the house's file, and a one-line `AGENTS.md` that points at `CLAUDE.md` (triage stub `agents-md-pointer`). `.github` also gets a `CLAUDE.md` of a few lines that says what the repo is and routes to `check-client.yml`. One pull request per repo, then the move of this stub.

## Acceptance criteria

- [ ] `legible-consulting/library` has `.goosehints` and `AGENTS.md` at the root, each one that sends the agent to `CLAUDE.md` first.
- [ ] `legible-consulting/.github` has `.goosehints`, `AGENTS.md` and a `CLAUDE.md` under 30 lines that names the repo's job and its reusable workflows.
- [ ] Neither file names a client, a secret or a path on one machine.

## Notes

- Questions for Jamie. 1. Does `.github` get a `CLAUDE.md`? Default: yes, a short one, because `.goosehints` has nothing to point at without it.
