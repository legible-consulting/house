# Stub: A ticket is a page at its intake path, with its pull request attached

- feature-slug: ticket-page
- epic: desk-ux
- sequence: 2 of 6
- depends-on: design-standard
- complexity: medium
- priority: P0

## Problem

A ticket has no page. Its prose and its prompt open inline in a list of 235 rows, and its pull request shows elsewhere on the same page. Nothing can link to a ticket.

## Proposed change

`/work/<client>/<epic>/<slug>` and `/work/<client>/triage/<slug>`, Jamie only. The ticket is the page: its state and its next step first, then its pull request, then its prompt, then its prose, then its place in the epic.

## Acceptance criteria

- [ ] The route `app/(desk)/work/[client]/[...path]/page.tsx` resolves `<client>` by the slug in `withRepo` (`house` for the house) and the path to an open stub of `repoWork`. A client not in `withRepo`, or a path with no open stub, is `notFound()`. A role other than `jamie` redirects to `/`.
- [ ] The header: back to `/work/<client>`, the stub's title as the title, and the quiet line `<epic> · n of m · <complexity> · <priority>` or `triage · <lane> · <complexity> · <priority>`.
- [ ] The state comes first under the header. A blocked ticket shows its reason in red words. A ticket with a pull request shows the large track with the current step named, and the act beside it when the act is Jamie's. A ticket at next shows "Next in <epic>" and the Copy prompt button as the primary action. A queued ticket names what it waits on: each open `depends-on` slug, as a link to that ticket's page.
- [ ] The pull request, when attached, is one card: the number and the title as a link, the branch in mono, draft or ready, the two gates each with its state word and the Tick button when it is open and CI is green, the CI word linked to the run, "Preview" when there is one, and the updated date. One card, no list.
- [ ] The prompt: the mono block and Copy prompt. Then the stub as prose. Then "In this epic": the epic's open stubs as compact ticket cards in sequence order, this one marked as the current, the done count ("3 of 9 done"), and a link to the breakdown on GitHub. A triage stub shows "In triage" with the other open triage stubs instead.
- [ ] "Open the stub on GitHub" at the foot.
- [ ] `tickGate` returns to the page that called it. `loading.tsx` draws the skeleton. `check.yml` is green.

## Out of scope

- The board and the overview, which link here (stubs 3 and 4).
- Any write but the tick, which stays `lib/gates.ts`.

## Notes

Read first: the breakdown, `app/_work.tsx` (`TicketRow` and `PrList`: the page takes over their words), `lib/work.ts` (`repoWork`, `startPrompt`, `stubUrl`, `stepOf`, `ticketHref`), `lib/gates.ts` (`back("/work", …)` at its foot: it gets a `back` argument, bound by the form, so the page returns to itself), `components/desk/ticket-card.tsx`, `components/desk/track.tsx`, `app/(desk)/pool/[id]/page.tsx` (the shape of a detail page). The stub's path from the URL is `.icm/intake/` plus the path segments plus `.md`, matched against `Stub.path`. A segment that is not `[a-z0-9-]+` is `notFound()`.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-ux/breakdown.md whole, desk/app/DESIGN.md, then this ticket, .icm/intake/desk-ux/ticket-page.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-ux/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria and write the breakdown's accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
