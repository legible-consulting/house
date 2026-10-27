# Breakdown: The desk reads at a glance, and a ticket is a page

- epic-slug: desk-ux
- source: Jamie's review of the restyled desk on 2026-10-27, a screen recording of `/`, `/work`, `/close`, `/sell` and `/research` at 1440, and his words: too much to read at once, a ticket is the focal point, a pull request attaches to its ticket, a project's tickets and state in full screen from the Work page. The mock that draws the stubs is an artifact, linked and not committed (house rule): https://claude.ai/artifact/XyRqB8Rsybqpxekw6EeeBK

## What I understood

`desk-restyle` (eleven pull requests, the last merged on 2026-10-27) gave the desk its tokens, its two faces, its components, its patterns and its shell. The colours, the spacing and the type are right. The pages are not. Each page puts every fact it has on the screen at once, in the order the code reads it. On `/`, the glance runs to fifteen bullets, seven tiles read 0, and the clients table has nine columns, so a next action wraps to twelve lines in one cell. On `/work`, a paragraph explains the page, an empty box says that nothing waits, a table lists the next ticket per repo, then 235 tickets follow as rows under two filter bars, and the pull requests sit in a list of their own after the tickets. Jamie finds a fact by reading, not by looking.

The pipeline the desk shows has a shape, and the desk does not draw it. In the intake, a path is an identity and a folder is a status. In the loop, a ticket walks from queued to next, to a draft pull request, to Spec approved, to a build, to a green check, to Ready to merge, to the merge. A deal walks eight stages, and the desk draws them as a track (`StageTrack`). This epic draws the ticket's steps the same way. It puts a ticket where its state is: a column. It attaches the pull request to its ticket. It gives each of Jamie's two questions one page: what do I do now (`/work`) and where does this project stand (`/work/<client>`). A ticket gets a page of its own at its intake path.

Six pull requests, in order, each reviewable on a phone. The data flow, the server actions, the role checks, the schema and the tokens do not change. What changes is what a page shows first, and what it keeps until asked.

## Decisions of record

Fixed for the whole epic. The first stub writes the rules into `desk/app/DESIGN.md`, the desk's one home for its information design. `globals.css` keeps the visual rules: paper and ink are the tints, mono is metadata, colour is for state. `DESIGN.md` holds the rules below. When a page and the file disagree, the file wins and the page is fixed (why: one home per fact · 2026-10-27).

The twelve rules:

1. **One question per page.** The first screen of a page answers one question. `/`: what do I do today? `/work`: what moves, and what waits on me? `/work/<client>`: where does every ticket of this project stand? `/work/<client>/<ticket>`: what is this ticket, and what is its next step? What does not answer the question moves down, folds or leaves (why: a page that answers two questions answers neither at a glance · 2026-10-27).
2. **Status is a position.** The desk shows a state by where a thing sits: a column on a board, a section's place on a page. The mark and the name come second. A flat list with a tag per row is never the first view of a state (why: the intake makes status positional, and the eye reads a position before it reads a word · 2026-10-27).
3. **The ticket is the unit.** One ticket card, `components/desk/ticket-card.tsx`, on every page. The state mark and the title. Then one mono line: the epic and the sequence, or the lane, then complexity and priority. Then the pull request strip when a pull request is attached. The card links to the ticket's page. Nothing else on the desk shows a ticket (why: one shape learned once reads everywhere · 2026-10-27).
4. **A pull request belongs to its ticket.** It shows on its ticket's card as the strip: the number and the title, the track, the CI word, the preview, and the act when the act is Jamie's. No page lists pull requests apart from their tickets. A pull request matched to no ticket is a card of its own, marked "no ticket", at the foot of Running (why: the pull request is the ticket's vehicle, not a second list · 2026-10-27).
5. **The track is the pipeline.** One track component draws a walk through ordered steps: hairline segments filled to the current step, and the current step named in mono. A deal walks its eight stages. A ticket walks its five steps: spec, build, check, ready, merge. A step that waits on Jamie says so: "spec · your tick", "ready · your tick", "merge · yours". The track is the same drawing on the card, the board and the ticket page (why: the loop has steps, and the eye reads a filled track faster than two badges · 2026-10-27).
6. **Counts before lists, lists before detail.** A section opens with its count. A list of more than twelve rows folds behind its count, with "Show all N". A stub's prose and its prompt are detail. They live on the ticket page, never inline in a list (why: a count is read in one glance, a list in many · 2026-10-27).
7. **Facts in columns, sentences in lines.** A table cell holds a fact of one line: a name, a date, a figure, a state. A sentence is a row's second line in body text, clamped to two lines, or it is detail. No cell wraps past two lines (why: a column that wraps to twelve lines is a paragraph in a cage · 2026-10-27).
8. **Zero is one line.** An empty state is one quiet sentence in the section's place. Never a tile that reads 0, a dashed box, or a table with no rows (why: seven tiles that read 0 say less than one line · 2026-10-27).
9. **A page does not explain itself.** No paragraph under a page title says what the page is. The contract explains. The header's quiet line carries the counts (why: Jamie built the desk and reads it every day · 2026-10-27).
10. **An action sits on its object.** Copy prompt on the ticket card. The tick on the pull request strip. Board on the project row. The desk has no table of actions (why: an action found beside its object needs no label · 2026-10-27).
11. **Full screen is the board.** `/work/<client>` draws no sidebar and no tab bar. The header holds the way back, the project and its counts. The columns take the width and the height. The phone shows one column at a time under a segmented control (why: a board is read whole, and the chrome costs a column · 2026-10-27).
12. **The URL is the path.** A ticket's page is its intake path under its project: `/work/<client>/<epic>/<slug>` and `/work/<client>/triage/<slug>`. A board is `/work/<client>`. The house is `/work/house` (why: the intake says the path is the identity, and the desk says the same · 2026-10-27).

The ticket's five steps, read from `lib/work.ts` `Pr`:

| Step | Done when | Waits on Jamie when |
|---|---|---|
| spec | `gates.specApproved` is `ticked` or `not-required` | it is `open` and CI is green (`waiting: spec-approved`) |
| build | the pull request is not a draft | never: the step is the session's |
| check | `ci` is `green` | never: the step is CI's |
| ready | `gates.readyToMerge` is `ticked` or `not-required` | it is `open`, the pull request is ready, CI is green (`waiting: ready-to-merge`) |
| merge | the pull request is merged: it leaves `prs` and enters `merged` | every step before it is done (`waiting: merge`) |

The current step is the first step not done. A ticket with no pull request has no track. Its state is its column: queued, next or blocked. `lib/work.ts` gets `stepOf(pr)`, and the card reads it. `waitingOf` does not change.

Do not, each with its why:

- Do not change the data flow, the server actions, the role checks or the schema (why: this epic changes what shows first, not what is true · 2026-10-27).
- Do not add a dependency. Not a board library, not a drag-and-drop library. The board is a CSS grid of server-rendered cards (why: the board is read, not dragged, and the move of a ticket is a commit · 2026-10-27).
- Do not draw an icon-only rail or a command palette (`desk-restyle`, Not built). The board's full screen comes from drawing no sidebar, not from a smaller one.
- Do not open a ticket in a pane beside the board. A ticket is a page with a URL (why: the phone has one column, and a URL goes back and is shared · 2026-10-27).
- Do not define a token outside `globals.css`, and do not add one for the board (why: `desk-restyle` fixed the tokens, and the board needs no new value · 2026-10-27).
- Do not keep a page's explanation by moving it into a tooltip. It leaves.
- Do not write a stub's prose or its prompt into a list row. It lives on the ticket page.
- Do not run build, lint, typecheck, test, format or dev locally. CI is truth.

Checking, as in `desk-restyle`: on the Vercel preview, at 390 × 844 and 1440 × 900, in light and in dark. Every pull request body carries the accessibility checklist of `desk-restyle/breakdown.md`, ticked for what the session checked, with the preview URL. The preview is behind Vercel Authentication. A session reports what it checked in the markup, and Jamie ticks the boxes that need a render.

## Build order

Strict. Each stub depends on the one before it.

1. `design-standard` — `DESIGN.md`, the ticket card, the track, the fold, `stepOf` and the project summary in `lib/work.ts` — depends-on: none
2. `ticket-page` — `/work/<client>/<epic>/<slug>` and `/work/<client>/triage/<slug>` — depends-on: design-standard
3. `project-board` — `/work/<client>`, full screen — depends-on: ticket-page
4. `work-overview` — `/work` around its question, and the Work card on the client page — depends-on: project-board
5. `desk-density` — `/`: the pool in one line, the clients table in five columns, the hand folded — depends-on: work-overview
6. `quiet-pages` — the explanations leave every page, and the long lists fold — depends-on: desk-density

The ticket page comes before the board, because the board's cards link to it (why: a card that links to a 404 cannot be reviewed · 2026-10-27).

## Out of scope

- A new fact from GitHub: review comments, the diff, the commits. The desk reads what `lib/work.ts` reads today.
- A drag of a card. The move of a ticket is a commit on its branch.
- A read of the intake's `README.md` `## Order` for the board's epic order. A stub of its own, if Jamie wants it.
- The salesman's pages beyond rules 6 and 9. The portfolio and the brand's tokens.
- The close-out of `desk-restyle` into `_done/`: a chore of its own.
