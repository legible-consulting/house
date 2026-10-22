---
status: stub
holds: []
---
# Onboarding and kickoff — D1

D1 produces the access table, the kickoff note, and the client's repo rendered from the blueprint, so that a signed client's build starts within days with nothing forgotten and nothing asked twice.

## Inputs

- `clients/<slug>/agreement/agreement.md` and `clients/<slug>/proposal/proposal.md` (its scope section is the ticket list).
- `legible-consulting/blueprint` (the copier template), rendered from the local lane with `copier copy`.
- The empty client repo, created by hand in the GitHub UI, attached as the session's second repo.

## Process

- Not written yet. A session writes it from the first real walk.
- Start cold from this folder. Read only what Inputs names.

## Outputs

- `clients/<slug>/kickoff/access-table.md` (secret names only, never values; why: credentials never go in git · 2026-10-14) · `kickoff-note.md`.
- In the client repo: the rendered repo with `.icm/intake/` seeded, the first epic cut from the proposal's scope (`.icm/intake/<epic-slug>/breakdown.md` and one stub per unit of work), `.copier-answers.yml`.
- `record.md` gains `repo:`; setting it is the done marker (why: a second render over an existing tree is the failure to prevent · 2026-10-15).
