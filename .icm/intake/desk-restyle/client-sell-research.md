# Stub: The client page, Sell and Research read as documents, card grids and filtered lists

- feature-slug: client-sell-research
- epic: desk-restyle
- sequence: 10 of 11
- depends-on: pool-row
- complexity: medium
- priority: P1

## Problem

`/clients/<slug>`, `/sell`, `/research` and `/research/<slug>` render with the old pieces: definition lists as paragraphs, documents as raw prose, filters as text links, verdicts as a plain list.

## Proposed change

Restyle the four pages with the patterns against the criteria below. Facts, roles and actions do not change.

## Acceptance criteria

- [ ] The "every page" criteria of `desk-and-work`.

Client page, `/clients/<slug>` (Jamie, client):

- [ ] Header: a back link for Jamie, the client's name as title, the stage track as the quiet line.
- [ ] "Where it stands" as a definition list: two columns at 390, three at 1440; labels in mono micro uppercase; values in `text-ui`, mono where the value is a date, a repo or a slug. The blueprint fact (Jamie only) takes the `--destructive` text when drifted.
- [ ] The Work card is the ticket rows of the Work page for one repo (Jamie), or the three lists in words (client).
- [ ] Each document as a document pattern in the reading column, with the stage as a mono tag in the masthead.
- [ ] The Send a form card and the users list (`desk-forms/send-a-link`, `client-signs-up`, `magic-link-sign-in`), Jamie only, as two Cards under the documents: the card as on the pool row; the users as a data table (title = email; meta = name and the state as a status tag, active a check, saved a hollow ring; Activate or Send again as the trailing action).

Sell, `/sell`:

- [ ] The jump links as a toggle group that scrolls to the section.
- [ ] The profile and the cadence as card grids, one card per section of the file; the cadence strip as four stat tiles (day 0, 7, 21, 28).
- [ ] The language filter as a toggle group kept in the URL (`?lang=`).
- [ ] The pitch cards: one column at 390, three at 1440 when every language shows; the language as a mono tag, the Copy button beside it; a placeholder marked with `--warning-soft`. The kit as the fourth section, in the same cards.

Research, `/research` and `/research/<slug>` (Jamie):

- [ ] Header title "Research"; the quiet line is the number of verdicts, concepts and queued links.
- [ ] The four filters (use, kind, verdict, tier) as toggle groups kept in the URL as today.
- [ ] The queued links (not judged yet) as one list above the verdicts, each with its host, title and time in mono meta, and the paste form in a Card under the list; at 390 the form is one stacked group.
- [ ] The verdicts and concepts as a data table: title = the name (a link); meta = kind, the verdict as a status tag (the mapping in `patterns`), tier; show = use; hide = recheck and date. An empty filter result renders the empty pattern.
- [ ] `/research/<slug>` as a document: the name as title, the date as the eyebrow, the frontmatter (kind, verdict, tier, use, tags, recheck, source) as a definition list in the masthead, the body as prose.
- [ ] `check.yml` is green.

## Out of scope

- A new fact on any of the four pages.
- The research queue's write path (`lib/research.ts`).

## Notes

Read first: the breakdown, `desk/app/app/clients/[slug]/page.tsx`, `desk/app/app/sell/page.tsx`, `desk/app/app/research/page.tsx`, `desk/app/app/research/[slug]/page.tsx`, `desk/app/app/research/_verdict.tsx`, `desk/app/app/research/actions.ts`, `desk/app/lib/house.ts`, `desk/app/lib/research.ts`, `desk/app/lib/rhythms.ts` (the stages), `research/CONTEXT.md` (kind, tier, use), the patterns in `components/desk/`.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-restyle/breakdown.md whole, then this ticket, .icm/intake/desk-restyle/client-sell-research.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-restyle/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria and write the breakdown's accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
