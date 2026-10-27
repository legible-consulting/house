# Stub: Every page drops its explanation, and a long list folds

- feature-slug: quiet-pages
- epic: desk-ux
- sequence: 6 of 6
- depends-on: desk-density
- complexity: low
- priority: P2

## Problem

`/close`, `/sell`, `/research` and the client page each open with a paragraph that says what the page is. `/research` lists 142 verdicts in one table. `/sell` shows the pitches and the kit in every language at once.

## Proposed change

Apply rules 6 and 9 to the pages that stubs 2 to 5 did not touch.

## Acceptance criteria

- [ ] No page in the shell carries a paragraph between its header and its first section that explains the page. The client page's "clients/<slug>/record.md is the record" line leaves. The counts stay in the header's quiet line.
- [ ] `/research`: the verdicts table folds above 25 rows with "Show all N", under the active filters. The queue and the form stay first.
- [ ] `/sell`: with every language shown, each pitch and each kit section folds behind its heading, and the chosen language's stays open.
- [ ] The client page's cards read in this order for Jamie: Where it stands, Work, Release and checks, the documents, Send a form, Users. A client's order does not change.
- [ ] `check.yml` is green.

## Out of scope

- The facts, the filters, the forms.

## Notes

Read first: the breakdown, every `page.tsx` under `app/(desk)/`, `components/desk/fold.tsx`, `desk/CONTEXT.md` (the words a page loses are there already).

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-ux/breakdown.md whole, desk/app/DESIGN.md, then this ticket, .icm/intake/desk-ux/quiet-pages.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-ux/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria and write the breakdown's accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
