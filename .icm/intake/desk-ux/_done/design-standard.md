# Stub: The desk's information rules have one home, and a ticket has one card and one track

- feature-slug: design-standard
- epic: desk-ux
- sequence: 1 of 6
- depends-on: none
- complexity: medium
- priority: P0

## Problem

The desk has visual rules in `globals.css` and no rule for what a page shows first. Every page shows a ticket in a different shape: a table row under "Next up", a `details` row under "Tickets", a list item on the client page. A pull request shows apart from its ticket. The deal has a track and the ticket has none.

## Proposed change

Write the twelve rules into `desk/app/DESIGN.md`. Build the three pieces every later stub uses: the ticket card, the track and the fold. Add `stepOf`, `ticketHref` and `summaryOf` to `lib/work.ts`. No page changes in this stub.

## Acceptance criteria

- [ ] `desk/app/DESIGN.md` holds the breakdown's twelve rules, each with its why and its date, the five steps table, and one line that names `globals.css` as the home of the visual rules. `desk/CONTEXT.md` Outputs names the file in one line under "The app".
- [ ] `components/desk/track.tsx` draws a walk through ordered steps: hairline segments filled to the current step, the current step's name in mono meta beside them, and `role="img"` with "Step n of m, <name>" for a reader. `StageTrack` renders through it, with no change on the client page or in the clients table. A `size="lg"` variant (segments 24 px wide and 2 px tall) is for the ticket page.
- [ ] `lib/work.ts` exports `Step` (`spec | build | check | ready | merge`), `STEPS` in order, and `stepOf(pr)`: the first step not done, by the breakdown's table, or `done` when every step is done. It exports `ticketHref(client, stub)` by rule 12, and `summaryOf(w)`: the counts of next, running, blocked and queued, the count that waits on Jamie, and the next stub.
- [ ] `components/desk/ticket-card.tsx` draws the state mark and the title (ui, 600 when next), one mono meta line (the epic and `n of m`, or `triage · <lane>`, then complexity and priority), and the blocked reason in red words when blocked. With a pull request it draws the strip under a hairline: the number and the title as a link, the track with the step's name ("spec · your tick" when the act is Jamie's), the CI word, "Preview" when there is one, and the act (`NextAct`) when it is Jamie's. `compact` hides the meta line. The title is the card's link to `ticketHref`. The strip's links and the act stay their own targets. The card is 44 px tall or more at 390.
- [ ] `components/desk/fold.tsx` is a `details` whose summary reads "<label> · N" in heading style: open by default at `limit` rows or fewer, folded above it with "Show all N" as the summary. No script.
- [ ] `check.yml` is green.

## Out of scope

- Any change to a page. Stubs 2 to 6 use the pieces.

## Notes

Read first: the breakdown, `components/desk/stage-track.tsx`, `components/desk/status-tag.tsx` (`TicketTag` and the marks), `app/_work.tsx` (`NextAct`, `CiBadge`, `metaOf`: the card takes them over, and stub 4 removes them from `_work.tsx`), `lib/work.ts` (`Pr`, `Stub`, `waitingOf`). An `<a>` with links inside it is not valid HTML. So the card is an `<article>`, its title is the link with an `after:absolute after:inset-0` target, and the strip's controls sit above it with `relative z-10`, as the data table's action cell does.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-ux/breakdown.md whole, then this ticket, .icm/intake/desk-ux/design-standard.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-ux/_done/ in the same pull request. Never run build, lint or dev; read check.yml. Tick the acceptance criteria in the pull request body. Do not merge. Your last message names the pull request.
