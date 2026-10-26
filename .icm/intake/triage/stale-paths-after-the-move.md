# Stub: Every sentence that names the local lane points at its home of today

- lane: chore
- found-by: the intake restructure · 2026-10-25
- complexity: low
- priority: P2

## Problem

The local lane moved to `~/Desktop/legible-consulting/projects/<slug>/` on 2026-10-22 (`core/stack.md`, Layout). `conformance/CONTEXT.md` Outputs still says conformance runs from `~/Desktop/Apps/projects/`. No other sentence does (audit of 2026-10-26).

## Proposed change

Point the sentence at the new path. The legacy path stays only where `core/stack.md` and `core/lexicon.md` name it as the lane's old home.

## Acceptance criteria

- [ ] `conformance/CONTEXT.md` Outputs names `~/Desktop/legible-consulting/projects/<slug>/` as where conformance runs.
- [ ] `grep -rn 'Apps/projects' --include='*.md'` over the house finds the path only in `core/stack.md` (the legacy row and the settings row), `core/lexicon.md` (the local lane) and this ticket.
- [ ] `check.yml` is green.

## Notes

Read first: `core/stack.md` (Layout), `core/lexicon.md` (local lane), `conformance/CONTEXT.md`. Message starts with "house:".

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read .icm/intake/CONTEXT.md, then this ticket, .icm/intake/triage/stale-paths-after-the-move.md. Do what it says. One branch, one pull request to main, message starts with "house:". Move the stub to .icm/intake/triage/_done/ in the same pull request. Do not merge. Your last message names the pull request.
