# Stub: Jamie's hand on the home as cards, each with a prompt to copy

- lane: tweak
- found-by: Jamie, in a desktop session · 2026-10-27
- complexity: low
- priority: P1

## Problem

`desk-home-hand` put Jamie's hand back on `/` as the old prose list. Jamie's words: "you've brought it back with the previous shitty design, bring it into today's design system, make these todo items look nice and then add a copy paste button for flinging its context into a prompt for a session to handle". Also, `scripts/read-house.mjs` kept only the first line of a wrapped bullet, so the home and the glance file showed truncated steps.

## Proposed change

Each step of Jamie's hand is a card in the action card's shape, with Copy prompt. The prompt holds the step, its check, what to read and the rules of the boundary, so that a cold session on the house can prepare the step. A wrapped bullet is read whole.

## Acceptance criteria

- [ ] `/` shows one card per step under the action cards: the step's place in the list in mono, the step in body text, the check in mono, Copy prompt. Inline `code` keeps the prose look.
- [ ] Copy prompt on a card copies the step, the check (or the ask for one), what to read, and the rules: prepare, never act on an account, the estate or money; stop before each act that is Jamie's; when the check holds, remove the line by pull request.
- [ ] More than twelve steps fold behind their count. No step is one quiet line.
- [ ] `read-house.mjs` joins a bullet's wrapped lines. The glance file that `rhythms.yml` writes shows each step whole.
- [ ] `check.yml` is green.

## Notes

- `lib/hand.ts` parses the steps and writes the prompt. `app/_hand.tsx` draws the card and the group. `lib/markdown.ts inline` renders one line of markdown.
- `DESIGN.md` rule 10, `desk/CONTEXT.md` and `.claude/rules/desk-app.md` name the card.

## Prompt

Repo legible-consulting/house. The ticket is .icm/intake/triage/desk-hand-cards.md: read it first, then desk/CONTEXT.md and desk/app/DESIGN.md. Do what it says. One branch, one pull request to main, the stub moved to .icm/intake/triage/_done/ in the same pull request. Do not run the build locally. Do not merge.
