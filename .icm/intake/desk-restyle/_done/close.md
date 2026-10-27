# Stub: The monthly close reads as totals, a money table and two pipeline cards at every width

- feature-slug: close
- epic: desk-restyle
- sequence: 7 of 11
- depends-on: desk-and-work
- complexity: medium
- priority: P1

## Problem

`/close` is an eight-column money table that scrolls sideways on the phone, with the month as inline text links and the totals as text.

## Proposed change

Restyle `/close` with the patterns against the criteria below. The rules in `lib/rhythms.ts` and the committed file's rendering do not change.

## Acceptance criteria

- [ ] The "every page" criteria of `desk-and-work`.
- [ ] Header quiet line = the month. The previous and the next month are two buttons on the trailing edge (chevrons with `aria-label`s), not inline text links.
- [ ] The four totals as stat tiles above the table at every width.
- [ ] The engagements table at 1440: eight columns, figures right-aligned mono, the total row 600 weight, a negative margin in `--destructive`. At 390: one card per client with the client as title, kind and price as meta, and four lines (hours, cost, margin, hourly) each with its label in mono micro; commission as one more line when it has a value.
- [ ] The definitions as a two-column list in `text-meta` under the table.
- [ ] The two pipeline cards: pool counts by status and folders by stage as stat tiles; two columns at 390.
- [ ] `?month=` and `?live=1` work as today. `check.yml` is green.

## Out of scope

- A new figure or a new rule in the close.

## Notes

Read first: the breakdown, `desk/app/app/close/page.tsx`, `desk/app/lib/rhythms.ts` (the close), `desk/CONTEXT.md` (Outputs, the close files), the patterns in `components/desk/`.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-restyle/breakdown.md whole, then this ticket, .icm/intake/desk-restyle/close.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-restyle/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria and write the breakdown's accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
