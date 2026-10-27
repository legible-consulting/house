# The desk's information design

What a page of the desk shows first, and what it keeps until asked. The visual rules (paper and ink are the tints, mono is metadata, colour is for state) and every token live in `app/globals.css`, not here. When a page and this file disagree, this file wins and the page is fixed (why: one home per fact · 2026-10-27).

## The twelve rules

1. **One question per page.** The first screen of a page answers one question. `/`: what do I do today? It answers with one card per next client action, grouped by urgency, then Jamie's hand, the house's own steps, and no ticket. `/clients`: where does every client stand? `/work`: what moves, and what waits on me? `/work/<client>`: where does every ticket of this project stand? `/work/<client>/<ticket>`: what is this ticket, and what is its next step? What does not answer the question moves down, folds or leaves (why: a page that answers two questions answers neither at a glance · 2026-10-27).
2. **Status is a position.** The desk shows a state by where a thing sits: a column on a board, a section's place on a page. The mark and the name come second. A flat list with a tag per row is never the first view of a state (why: the intake makes status positional, and the eye reads a position before it reads a word · 2026-10-27).
3. **The ticket is the unit.** One ticket card, `components/desk/ticket-card.tsx`, on every page. The state mark and the title. Then one mono line: the epic and the sequence, or the lane, then complexity and priority. Then the pull request strip when a pull request is attached. The card links to the ticket's page. Nothing else on the desk shows a ticket (why: one shape learned once reads everywhere · 2026-10-27).
4. **A pull request belongs to its ticket.** It shows on its ticket's card as the strip: the number and the title, the track, the CI word, the preview, and the act when the act is Jamie's. No page lists pull requests apart from their tickets. A pull request matched to no ticket is a card of its own, marked "no ticket", at the foot of Running (why: the pull request is the ticket's vehicle, not a second list · 2026-10-27).
5. **The track is the pipeline.** One track component, `components/desk/track.tsx`, draws a walk through ordered steps: hairline segments filled to the current step, and the current step named in mono. A deal walks its eight stages. A ticket walks its five steps: spec, build, check, ready, merge. A step that waits on Jamie says so: "spec · your tick", "ready · your tick", "merge · yours". The track is the same drawing on the card, the board and the ticket page (why: the loop has steps, and the eye reads a filled track faster than two badges · 2026-10-27).
6. **Counts before lists, lists before detail.** A section opens with its count. A list of more than twelve rows folds behind its count, with "Show all N" (`components/desk/fold.tsx`). A stub's prose and its prompt are detail. They live on the ticket page, never inline in a list (why: a count is read in one glance, a list in many · 2026-10-27).
7. **Facts in columns, sentences in lines.** A table cell holds a fact of one line: a name, a date, a figure, a state. A sentence is a row's second line in body text, clamped to two lines, or it is detail. No cell wraps past two lines (why: a column that wraps to twelve lines is a paragraph in a cage · 2026-10-27).
8. **Zero is one line.** An empty state is one quiet sentence in the section's place. Never a tile that reads 0, a dashed box, or a table with no rows (why: seven tiles that read 0 say less than one line · 2026-10-27).
9. **A page does not explain itself.** No paragraph under a page title says what the page is. The contract explains. The header's quiet line carries the counts (why: Jamie built the desk and reads it every day · 2026-10-27).
10. **An action sits on its object.** Copy prompt on the ticket card, on the action card of `/` (`app/_action.tsx`), where it copies the client action with its context (`lib/actions.ts`), and on the hand row of `/` (`app/_hand.tsx`), where it copies the step with its check (`lib/hand.ts`); the row shows the step's title and opens on the rest (rule 6). The tick on the pull request strip. Board on the project row. The desk has no table of actions (why: an action found beside its object needs no label · 2026-10-27; the client action is the home's object, because Jamie starts a session from it · Jamie, 2026-10-27).
11. **Full screen is the board.** `/work/<client>` draws no sidebar and no tab bar. The header holds the way back, the project and its counts. The columns take the width and the height. The phone shows one column at a time under a segmented control (why: a board is read whole, and the chrome costs a column · 2026-10-27).
12. **The URL is the path.** A ticket's page is its intake path under its project: `/work/<client>/<epic>/<slug>` and `/work/<client>/triage/<slug>`. A board is `/work/<client>`. The house is `/work/house` (why: the intake says the path is the identity, and the desk says the same · 2026-10-27).

## The ticket's five steps

Read from `lib/work.ts` `Pr` by `stepOf(pr)`. The current step is the first step that is not done. A ticket with no pull request has no track: its state is its column (queued, next or blocked). `waitingOf` says when the act is Jamie's.

| Step | Done when | Waits on Jamie when |
|---|---|---|
| spec | `gates.specApproved` is `ticked` or `not-required` | it is `open` and CI is green (`waiting: spec-approved`) |
| build | the pull request is not a draft | never: the step is the session's |
| check | `ci` is `green` | never: the step is CI's |
| ready | `gates.readyToMerge` is `ticked` or `not-required` | it is `open`, the pull request is ready, CI is green (`waiting: ready-to-merge`) |
| merge | the pull request is merged: it leaves `prs` and enters `merged` | every step before it is done (`waiting: merge`) |
