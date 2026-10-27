# Stub: Jamie's hand as rows that open, with the prompt on the row

- lane: tweak
- found-by: Jamie, in a desktop session · 2026-10-27
- complexity: low
- priority: P1

## Problem

`desk-home-hand` put Jamie's hand on `/` as cards. A card shows the full step and its check, and a step is long, so the cards are too large. Jamie's words: "make it into an accordion row with a short title of the action in the row header, and then the actual description of what needs done in the dropdown, the prompt copy button should be available on the row itself".

## Proposed change

Each bullet under "## Jamie's hand" in `.icm/intake/README.md` opens with a short title in bold. `lib/hand.ts` reads the title. `app/_hand.tsx` shows one list of rows: a row shows the step's place and its title, with Copy prompt on the row. The row opens on the step and its check. The prompt names the title.

## Acceptance criteria

- [ ] Each bullet of Jamie's hand opens with `**Title.**`, and the README's prose says so.
- [ ] `/` shows Jamie's hand as one list of rows behind its count. A row shows the step's number and its title on one line.
- [ ] Copy prompt sits on the row. A click on it copies the prompt and does not open the row.
- [ ] A row opens on the step in body text and its check in mono, and closes again, with no script.
- [ ] A bullet with no bold title shows its step, cut to one line, as the row.
- [ ] `DESIGN.md` rule 10, `desk/CONTEXT.md` and `.claude/rules/desk-app.md` name the hand row.
- [ ] `check.yml` is green.
