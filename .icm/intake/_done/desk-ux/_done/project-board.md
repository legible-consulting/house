# Stub: A project's tickets stand in four columns, full screen

- feature-slug: project-board
- epic: desk-ux
- sequence: 3 of 6
- depends-on: ticket-page
- complexity: high
- priority: P0

## Problem

To see where a project stands, Jamie filters `/work` to one repo and scrolls a list of rows where every state looks the same. The sidebar and the filter bars take the width.

## Proposed change

`/work/<client>` is the project's board, Jamie only. Four columns, the pipeline's positions, each a stack of ticket cards. No sidebar and no tab bar.

## Acceptance criteria

- [ ] The route `app/(desk)/work/[client]/page.tsx` resolves `<client>` as the ticket page does. The header: back to `/work`, the project's name as the title, the quiet line `<owner/repo> · N open · N running · N wait on you · read N seconds ago`, and the sync pill.
- [ ] The shell draws no sidebar and no tab bar when the pathname is a board (`/work/<client>`, one segment after `work`), and `main` takes the full width. The skip link, the page header and its back link stay. Every other path is unchanged.
- [ ] Four columns from `md`: Queued, Next, Running, Shipped, each with its heading in heading style and its count. A column's heading sticks to the top of its column. Each column scrolls on its own inside the viewport's height, so the page never scrolls as a whole. Below `md`, a segmented control under the header picks one column, its segments carry the counts, and the choice is kept in `?column=`.
- [ ] Queued: the blocked stubs first as one group, "Blocked · N", with the red mark and the reason line on each card. Then one group per epic, by `lib/work.ts`'s order: the epic's title, "n of m done", and its open stubs in sequence order as ticket cards. Triage is the last group. An epic with no open stub does not show.
- [ ] Next: one ticket card per epic whose next stub exists, and the first queued triage stub, each with the Copy prompt button on the card.
- [ ] Running: the stubs with a pull request as ticket cards with the strip, the ones that wait on Jamie first with the act, then by the pull request's updated date, newest first. A pull request matched to no stub follows as a "no ticket" card.
- [ ] Shipped: the pull requests merged in 14 days as compact rows, the date in mono and the title as a link. An empty column shows one quiet line.
- [ ] A read that failed shows the reason in words in the place of the columns. `loading.tsx` draws four skeleton columns. `check.yml` is green.

## Out of scope

- A drag of a card. The ticket moves by a commit.
- A filter by state or lane: the column is the filter.
- The epic order of the intake's `README.md`.

## Notes

Read first: the breakdown, `components/desk/shell.tsx` (`currentOf` and the pathname it reads), `app/_work.tsx` (`nextOf`, `Shipped`, `RepoRows`), `lib/work.ts` (`Epic` and the sort of `epics`), `components/desk/ticket-card.tsx`, `app/_filters.tsx` (the segmented control). The columns' grid from `md` is `h-[calc(100dvh-var(--page-header)-var(--safe-top))]` with `overflow-y-auto` on each column. The board's `/work/house` is the house's own tickets.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-ux/breakdown.md whole, desk/app/DESIGN.md, then this ticket, .icm/intake/desk-ux/project-board.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-ux/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria and write the breakdown's accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
