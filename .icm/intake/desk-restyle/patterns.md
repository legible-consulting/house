# Stub: The desk's patterns exist once each in components/desk, and the pool and the home use them

- feature-slug: patterns
- epic: desk-restyle
- sequence: 3 of 11
- depends-on: primitives
- complexity: high
- priority: P1

## Problem

Every page draws its own tiles, tags, tables and prose. `app/_ui.tsx` holds a few shared pieces with no design behind them. Sixteen named states (seven pool statuses, nine stages) have no agreed mark, and a deadline has no agreed treatment.

## Proposed change

Build the patterns in `components/desk/`, one file each, from the primitives: stat tile, status tag, stage track, data table, field group, flash, empty, document, prose, logo. Replace `app/_ui.tsx` with them. The pool and the desk home use the data table and the status tag.

## Acceptance criteria

- [ ] `components/desk/stat.tsx`, `status-tag.tsx`, `stage-track.tsx`, `data-table.tsx`, `field-group.tsx`, `flash.tsx`, `empty.tsx`, `document.tsx`, `prose.tsx` and `logo.tsx` exist, server components except where a hook is needed, built as Notes says.
- [ ] `app/_ui.tsx` is gone. Every page that imported it imports the patterns.
- [ ] The status tag maps the pool statuses and the flash maps the states as the tables in Notes say. The stage track draws eight segments and reads "Stage 4 of 8, agreement" to a screen reader.
- [ ] `logo.tsx` renders the traced JN path in `currentColor` from path constants copied from the brand's `logo-artwork.ts`. Nothing is redrawn.
- [ ] `/pool` and `/` use the data table and the status tag on the preview. At 390 each row is a card; at 1440 a table with a sticky header. An empty table renders the empty pattern.
- [ ] `check.yml` is green.

## Out of scope

- The app shell and the page header: stub 4.
- The per-page criteria: stubs 6 to 11. This stub makes the pieces and proves them on two pages.

## Notes

The patterns:

1. **Stat tile** (`stat.tsx`): the figure in `text-figure` mono, the label under it in `text-ui` `--muted-foreground`, in a `Card size="sm"`. A grid of tiles is two columns on the phone, four from `sm`, seven from `lg` where there are seven. A tile is a link when it filters a list.
2. **Status tag** (`status-tag.tsx`): the mark (an 8 px dot, a hollow ring, or a 12 px check) plus the name in `text-meta` mono, sentence case. The mark is `aria-hidden`; the name is the text.
3. **Stage track** (`stage-track.tsx`): eight hairline segments, prospect to after (`lib/rhythms.ts` `STAGES`, `lost` apart); the segments up to the current stage filled with `--foreground`, the rest with `--border`; the stage name in mono meta beside it; `aria-label` reads "Stage 4 of 8, agreement". `lost` shows no track and the name in `--muted-foreground`. In a table cell, the name only. On the client page header, the name and the track.
4. **Data table** (`data-table.tsx`): one `<table>` with a column definition `{ key, label, align: "start" | "end", phone: "title" | "show" | "meta" | "hide" }`. From `md`: a real table in a scroll container with a sticky header; when the table is wider than its container the first column is sticky on the left. Below `md`: CSS turns each row into a card with a hairline; the `thead` becomes `sr-only`; each `td` shows its `data-label` in mono micro above the value through `::before`; the `title` cell spans the card at `text-ui` 600; `meta` cells sit on one line under it in mono meta; `hide` cells are `hidden md:table-cell`. A row with a link makes the whole card the target. An empty table renders the empty pattern, not an empty row.
5. **Field and field group** (`field-group.tsx`): `Field` from the registry; `FieldGroup` is a `<fieldset>` with a mono micro uppercase `<legend>`, one column below `sm`, two from `sm`, three from `lg`; a full-width field spans the row. Every input carries `autocomplete`, `inputmode` and `enterkeyhint` where they apply. One primary button per form, at the end, full width below `sm`.
6. **Flash** (`flash.tsx`): the `Alert` with `role="alert"` for an error and `role="status"` for a note, under the page header, full width of the content column. An error uses `--destructive` and `--destructive-soft`; a note uses `--foreground` on `--secondary`.
7. **Empty** (`empty.tsx`): the `Empty` component with one sentence that says what is absent and what writes it, in the house's words (for example "No glance yet. The sweep writes one every morning.").
8. **Document** (`document.tsx`): the readable form of a glance, a verdict, a drift report, a proposal: a masthead with the title in `text-title`, the date in mono micro uppercase as an eyebrow, and the body in the prose renderer, inside `--reading-max`.
9. **Prose** (`prose.tsx`): markdown from the house through the `.prose` rules of stub 1.
10. **Logo** (`logo.tsx`): the traced JN path from the brand's `logo-artwork.ts` (`components/brand/logo-artwork.ts` at the root of `k0d0minio/jamienisbet`, by `gh api` or at `~/Desktop/legible-consulting/projects/jamienisbet`), copied as constants, rendered in `currentColor`. Stub 5 draws the icons from the same constants.

Pool statuses (`lib/pool.ts` `STATUSES`):

| Status | Mark | Colour | Text |
|---|---|---|---|
| `new` | hollow ring | `--muted-foreground` | normal |
| `contacted` | filled dot | `--muted-foreground` | normal |
| `replied` | filled dot | `--foreground` | normal |
| `meeting` | filled dot | `--foreground` | 600 weight |
| `ready for Jamie` | filled dot | `--warning` | `--warning-text`, 600 weight. It waits on Jamie. |
| `handed off` | check | `--success` | normal |
| `lost` | filled dot | `--border` | `--muted-foreground` |

Research verdicts (`research/CONTEXT.md`), the same tag: `adopt` is a check in `--success`; `watch` is a filled dot in `--warning` with the name in `--warning-text`; `decline` is a filled dot in `--border` with the name in `--muted-foreground`.

Time and money:

| Fact | Treatment |
|---|---|
| deadline or next action inside seven days | the date and the day count in `--warning-text`, 600 weight |
| deadline or next action past | the date in `--destructive`, 600 weight, and the word "overdue" |
| a negative margin in the close | the amount in `--destructive`, 600 weight |
| `kind: retainer` or `role` with no next action | the word "ongoing" in `--muted-foreground`; never flagged |

Read first: the breakdown, `desk/app/app/_ui.tsx`, `desk/app/app/_repo.tsx`, `desk/app/app/page.tsx`, `desk/app/app/pool/page.tsx`, `desk/app/lib/pool.ts` (the statuses), `desk/app/lib/rhythms.ts` (the stages), `desk/app/lib/markdown.ts`, `desk/app/components/ui/*.tsx`.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-restyle/breakdown.md whole, then this ticket, .icm/intake/desk-restyle/patterns.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-restyle/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Write the breakdown's accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
