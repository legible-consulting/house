# Stub: The home and the Work page read as a ledger on the phone and at the desk

- feature-slug: desk-and-work
- epic: desk-restyle
- sequence: 6 of 11
- depends-on: pwa
- complexity: medium
- priority: P1

## Problem

`/` and `/work` render with the old pieces: a glance as plain prose, counts as text, the clients table and the ticket rows as a desktop table that scrolls sideways on the phone, filters as text links.

## Proposed change

Restyle the two pages with the patterns against the criteria below. Facts, data flow and actions do not change.

## Acceptance criteria

Every page, here and in stubs 7 to 11:

- [ ] No horizontal scroll at 390. Every tap target is 44 px tall at 390. The page title is the first heading and the only `h1`. Focus is visible on every control by keyboard. The tab bar (390) or the sidebar (1440) marks the current page. A `?error=` shows the flash under the header; a `?note=` the same in the quiet style.

Desk, `/` (Jamie):

- [ ] The glance (computed live, `lib/rhythms.ts`) renders as a document: an eyebrow with the date, the title, prose. At 1440 it sits in the reading column on the left two thirds and the pool tiles on the right third. At 390 the glance comes first, the tiles second, the clients third. A bold due date keeps the warning or overdue treatment.
- [ ] Seven stat tiles: two columns at 390, seven at 1440. Each tile links to the pool.
- [ ] The clients table: title cell = the client's name (a link); meta = stage and kind; show = next action and deadline; hide = repo, blueprint drift, release and check. A drifted repo's cell takes the `--destructive` text. At 390 each client is one card. At 1440 a table with the deadline right-aligned mono and the warning or overdue treatment.
- [ ] The client role's "no folder" state renders as the empty pattern.

Work, `/work`:

- [ ] Header title "Work"; the quiet line is the number of repos and tickets read.
- [ ] "Waiting on you" and "Next up" as two data tables; the Copy button is the row's trailing action at every width.
- [ ] The ticket filters as a toggle group (state) and a second one (repo), kept in the URL as today.
- [ ] A ticket row is a `details` element: the summary is one line (status tag, title, mono meta: epic, sequence, complexity, priority); the body is the stub as prose, the Prompt in a mono block, and the Copy button first in the action row. 44 px summary on touch. The house's own tickets are one more repo row, last, as today.
- [ ] The pull requests of a repo as one compact list with their gates, CI and preview; "Shipped" folded.
- [ ] `check.yml` is green.

## Out of scope

- A new fact on either page.
- The gates' behaviour (`lib/gates.ts`).

## Notes

Read first: the breakdown, `desk/app/app/page.tsx`, `desk/app/app/work/page.tsx`, `desk/app/app/_work.tsx`, `desk/app/app/_repo.tsx`, `desk/app/app/_copy.tsx`, `desk/app/lib/rhythms.ts` (the glance), `desk/app/lib/house.ts` (the clients), `desk/app/lib/work.ts` (the stubs and their fields), the patterns in `components/desk/`.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-restyle/breakdown.md whole, then this ticket, .icm/intake/desk-restyle/desk-and-work.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-restyle/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria and write the breakdown's accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
