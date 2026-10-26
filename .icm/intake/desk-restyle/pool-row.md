# Stub: A pool row reads as four field groups, a touch log and three action cards

- feature-slug: pool-row
- epic: desk-restyle
- sequence: 9 of 11
- depends-on: pool-list
- complexity: medium
- priority: P1

## Problem

`/pool/<id>` is one long form, the touches and the actions under it, the same at every width. The read-only states show as a disabled form alone.

## Proposed change

Restyle `/pool/<id>` with the patterns against the criteria below. The server actions, the fields and the handoff do not change.

## Acceptance criteria

- [ ] The "every page" criteria of `desk-and-work`.
- [ ] Header: a back link to the pool, the company as title, the status tag and the meta line (sourced by, added, updated) as the quiet line.
- [ ] The facts as four field groups: Company (company, slug, website, country, language), Contact (contact, role, email, phone), Fit (line, size, service, deal size, source), Ask (ask, notes, next action). One column at 390, three at 1440. Save at the end of the form.
- [ ] Touches: a table (title = date, meta = channel, show = note) above the log form; the log form is one row at 1440 and a stacked group at 390.
- [ ] "Next touch": the draft in a document-like block in the reading width, the Copy button first, then "Open in mail" and "Open in WhatsApp" as outline buttons; one column at 390.
- [ ] Move, Ready for Jamie and Handoff: each a Card with its one button; the "Fill first" list is a flash inside the card.
- [ ] A read-only state reads as one sentence under the header, not as a disabled form alone.
- [ ] The Send a form card (Jamie only, `app/_send.tsx`, shared with the client page) as a Card: the picker as one field group, four columns at 1440 and one stacked group at 390, Send at the end; the sent links as a data table (title = form, meta = language and dates, an unanswered row's link in mono with Copy).
- [ ] `check.yml` is green.

## Out of scope

- The handoff's logic (`lib/github.ts`): `triage/handoff-walk`.
- A new field.

## Notes

Read first: the breakdown, `desk/app/app/pool/[id]/page.tsx`, `desk/app/app/pool/[id]/actions.ts`, `desk/app/app/_touch.tsx`, `desk/app/app/_copy.tsx`, `desk/app/lib/pool.ts`, `01-prospecting/prospect.md`, `01-prospecting/cadence.md`, the patterns in `components/desk/`.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-restyle/breakdown.md whole, then this ticket, .icm/intake/desk-restyle/pool-row.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-restyle/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria and write the breakdown's accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
