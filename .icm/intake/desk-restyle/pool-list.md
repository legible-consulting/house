# Stub: The pool is a filtered table with a status tag per row, and a prospect is added from a drawer on the phone

- feature-slug: pool-list
- epic: desk-restyle
- sequence: 8 of 11
- depends-on: close
- complexity: medium
- priority: P1

## Problem

`/pool` is a wide table with the add form under it at every width. The status is a word with no mark. The filter is text.

## Proposed change

Restyle `/pool` with the patterns against the criteria below. The server actions and the fields do not change.

## Acceptance criteria

- [ ] The "every page" criteria of `desk-and-work`.
- [ ] A segmented filter (toggle group) under the header: All, Open, Mine, Handed off, Lost. It filters by `?status=` kept in the URL, or client-side on a `data-status` attribute; one of the two, not both.
- [ ] "Due now" is one line of links above the table in `--warning-text`, present only when a row is due.
- [ ] The table: title = company (a link to the row); meta = status tag, deal stage and sourced by; show = next action and touches; hide = contact and updated. A due next action takes the warning treatment.
- [ ] "Add a prospect" is a button on the header's trailing edge. At 390 it opens a Drawer with the form; at 1440 it opens the same form in a Card under the table. One form component, two containers.
- [ ] A salesman sees the same page with the rows `01-prospecting/CONTEXT.md` allows. `check.yml` is green.

## Out of scope

- A new field or status (`01-prospecting/prospect.md`).
- The row page: stub 9.

## Notes

Read first: the breakdown, `desk/app/app/pool/page.tsx`, `desk/app/app/pool/actions.ts`, `desk/app/lib/pool.ts`, `01-prospecting/prospect.md` (Fields, Statuses), the patterns in `components/desk/`.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-restyle/breakdown.md whole, then this ticket, .icm/intake/desk-restyle/pool-list.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-restyle/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria and write the breakdown's accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
