# Stub: The Work page answers one question, and a project is one row

- feature-slug: work-overview
- epic: desk-ux
- sequence: 4 of 6
- depends-on: project-board
- complexity: medium
- priority: P0

## Problem

`/work` carries a paragraph, an empty box, a table, two filter bars and 235 ticket rows, with the pull requests after the tickets. What waits on Jamie and what runs are found by scrolling.

## Proposed change

Rebuild `/work` as three sections: On your desk, Running, Projects. The ticket list and the filters leave for the boards. The Work card on a client's page shows the same project row.

## Acceptance criteria

- [ ] The header's quiet line is `N repos · N running · N wait on you · N queued`, streamed as today.
- [ ] The paragraph under the header leaves. "On your desk" holds the compact ticket cards that wait on Jamie across every repo, the project's name in each meta line, and the act on each. With none, one line: "Nothing waits on you."
- [ ] "Running" holds the ticket cards in flight across every repo that are not on your desk, with their strips and the project named in the meta, by the pull request's updated date, newest first. It folds above twelve.
- [ ] "Projects" is one data table row per repo of `withRepo`, the house last. The columns: the project (the title, a link to its board), the state as counts with their marks in mono (`● 3 next · ◐ 2 running · ● 1 blocked · ○ 18 queued`, a zero count left out), the next ticket's title on one line with Copy prompt as the action, and the board as the row's link. On the phone the row is a card whose target is the board. A repo whose read failed shows the reason in its state cell.
- [ ] `?state=` and `?repo=` are gone. A request with `?repo=<client>` redirects to that board. Any other query redirects to `/work`.
- [ ] The Work card on a client's page, for Jamie: the project's counts, the next ticket with Copy prompt, the cards that wait on Jamie for this repo, and a link to the board. The client's own three lists (`ClientWork`) do not change.
- [ ] `check.yml` is green.

## Out of scope

- The client's three lists in words.

## Notes

Read first: the breakdown, `app/(desk)/work/page.tsx`, `app/_work.tsx` (`WaitingOnYou`, `NextUp` and `RepoTickets` leave, `WorkBody` becomes the project row, `TicketRow`, `PrList`, `GateBadge`, `metaOf` and the state filters leave with them), `components/desk/data-table.tsx`, `components/desk/fold.tsx`, `lib/work.ts` (`summaryOf`). `_work.tsx` shrinks with this stub. `app/_filters.tsx` stays for the board's segmented control.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-ux/breakdown.md whole, desk/app/DESIGN.md, then this ticket, .icm/intake/desk-ux/work-overview.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-ux/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria and write the breakdown's accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
