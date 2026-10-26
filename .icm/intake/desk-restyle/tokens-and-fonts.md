# Stub: The desk shows the brand's paper, ink and two faces from one token file

- feature-slug: tokens-and-fonts
- epic: desk-restyle
- sequence: 1 of 11
- depends-on: none
- complexity: medium
- priority: P1
- blocked: `house-modules/desk-process` is not merged (the breakdown's Build order). Remove this line when it is.

## Problem

`app/globals.css` holds shadcn's default greys, `--chart-*` variables the desk never draws, and `--font-sans` set to the system stack while `layout.tsx` loads Geist. No type step, row height or radius is named; every component carries its own numbers.

## Proposed change

Rewrite the tokens in `app/globals.css` to the brand's values, define the type steps, the sizes and the radii as tokens, write the `.prose` rules, and load Hanken Grotesk and IBM Plex Mono with `next/font/google`. No component changes.

## Acceptance criteria

- [ ] `app/globals.css` keeps `@import "tailwindcss"`, `@import "tw-animate-css"` and `@import "shadcn/tailwind.css"`, the shadcn variable names, `color-scheme: light dark` on `html`, the dark block under `@media (prefers-color-scheme: dark)` and the `@theme inline` mapping. Every colour is OKLCH with the brand hex in a comment beside it. The `--chart-*` variables are gone.
- [ ] The light and dark values are the tables in Notes. `--foreground-2`, `--success`, `--success-soft`, `--warning`, `--warning-text`, `--warning-soft`, `--destructive-soft` and `--shadow-float` are mapped in `@theme inline`, so `text-foreground-2`, `bg-success-soft` and `shadow-float` exist as utilities.
- [ ] Every text colour carries its contrast ratio against its canvas in a comment, and every pair that carries text passes 4.5:1. `--warning` carries no text.
- [ ] The seven type steps of Notes exist as `:root` variables, with a `@media (pointer: coarse)` block that lifts each one notch, mapped in `@theme inline` as `--text-<step>`, `--text-<step>--line-height`, `--text-<step>--font-weight` and `--text-<step>--letter-spacing`, so a call site writes `text-title` and never a number.
- [ ] The sizes and radii of Notes exist as `:root` variables mapped in `@theme inline` (`--spacing-row`, `--radius-control`, and so on). shadcn's `--radius`, or `--radius-md` and `--radius-lg` directly, are set so `rounded-md` is 6 px and `rounded-lg` is 8 px.
- [ ] Under `@layer base`, `:focus-visible` draws `outline: 2px solid var(--ring)` at `outline-offset: -2px`, so a scrolling container never clips it. An inline link in prose keeps a positive offset.
- [ ] The `.prose` rules exist under `@layer components` as Notes gives them.
- [ ] One comment block at the top of the file states the three rules (paper and ink are the tints; mono is metadata; colour is for state only), the date, and that this file is the design system's one home.
- [ ] `app/layout.tsx` loads `Hanken_Grotesk` (variable, `subsets: ["latin", "latin-ext"]`, variable `--font-sans`) and `IBM_Plex_Mono` (weights 400, 500, 600, variable `--font-mono`) with `next/font/google`. Geist is gone.
- [ ] No file in `components/` and no page changes. `check.yml` is green. The preview shows the paper canvas, Hanken Grotesk words and mono figures, and nothing is broken at 390 or 1440, light or dark.

## Out of scope

- Any component or page change: stubs 2 and on.
- A dark-mode toggle: there is none.

## Notes

Light values:

| Variable | Value | Brand source |
|---|---|---|
| `--background` | `oklch(0.997 0.005 95)` | paper `#FFFEFA` |
| `--foreground` | `oklch(0.235 0 0)` | ink `#1E1E1E` |
| `--card`, `--popover` | `oklch(1 0 0)` | `#FFFFFF`, one step off the paper |
| `--card-foreground`, `--popover-foreground` | `oklch(0.235 0 0)` | ink |
| `--primary` | `oklch(0.235 0 0)` | ink is the tint |
| `--primary-foreground` | `oklch(0.997 0.005 95)` | paper |
| `--secondary`, `--accent`, `--sidebar` | `oklch(0.976 0.005 95)` | `#F8F7F3`, the lifted sheet and the hover wash |
| `--muted` | `oklch(0.952 0.007 97)` | `#F0EFEA`, the sunken fill |
| `--muted-foreground` | `oklch(0.538 0.006 95)` | `#6F6E6A`, meta; 5.06:1 on paper |
| `--foreground-2` (new) | `oklch(0.424 0.005 92)` | `#4F4E4B`, secondary text; 8.25:1 on paper |
| `--border`, `--sidebar-border` | `oklch(0.915 0.008 99)` | `#E4E3DD`, the hairline |
| `--input` | `oklch(0.847 0.008 99)` | `#CECDC7`, the strong hairline on a control |
| `--ring` | `oklch(0.235 0 0 / 30%)` | ink at 30% |
| `--success` | `oklch(0.531 0.095 162)` | `#2E7D5B`; 4.95:1 on paper |
| `--success-soft` | `oklch(0.962 0.012 162)` | `#ECF5F0` |
| `--warning` | `oklch(0.626 0.125 70)` | `#B7791F`; 3.61:1, a mark only, never text |
| `--warning-text` | `oklch(0.519 0.106 70)` | `#8F5C12`; 5.61:1 on paper, for words |
| `--warning-soft` | `oklch(0.966 0.022 83)` | `#FBF3E4` |
| `--destructive` | `oklch(0.559 0.160 28)` | `#C0453B`; 5.01:1 on paper |
| `--destructive-soft` | `oklch(0.954 0.017 27)` | `#FBECEA` |
| `--shadow-float` | `0 8px 16px oklch(0.235 0 0 / 8%), 0 24px 56px oklch(0.235 0 0 / 14%)` | the one shadow |

Dark values:

| Variable | Value | Brand source |
|---|---|---|
| `--background` | `oklch(0.235 0 0)` | ink is the canvas |
| `--foreground`, `--primary` | `oklch(0.997 0.005 95)` | paper is the text and the tint |
| `--primary-foreground` | `oklch(0.235 0 0)` | ink |
| `--card`, `--popover`, `--sidebar` | `oklch(0.268 0.002 0)` | `#262625` |
| `--secondary`, `--accent` | `oklch(0.293 0.002 0)` | `#2C2C2B` |
| `--muted` | `oklch(0.205 0 0)` | `#171717` |
| `--muted-foreground` | `oklch(0.629 0.007 97)` | `#8A8984`; 4.76:1 on ink |
| `--foreground-2` | `oklch(0.782 0.008 99)` | `#B9B8B2`; 8.38:1 on ink |
| `--border`, `--sidebar-border` | `oklch(0.325 0.002 0)` | `#343433` |
| `--input` | `oklch(0.390 0.003 107)` | `#454543` |
| `--ring` | `oklch(0.997 0.005 95 / 40%)` | paper at 40% |
| `--success` | `oklch(0.692 0.115 162)` | `#4FB286`; 6.39:1 on ink |
| `--warning`, `--warning-text` | `oklch(0.732 0.129 74)` | `#D89B3E`; 6.89:1 on ink |
| `--destructive` | `oklch(0.660 0.152 27)` | `#E0685E`; 5.01:1 on ink |
| `--*-soft` | the state colour at 16% over the canvas, `color-mix(in oklch, …, transparent)` | |
| `--shadow-float` | `0 8px 16px oklch(0 0 0 / 50%), 0 24px 56px oklch(0 0 0 / 60%)` | |

Type steps (desk size/line, weight, tracking; the touch step one notch up):

| Step | Desk | Touch | Face | Used for |
|---|---|---|---|---|
| `title` | 24/30, 700, −0.02em | 28/34 | sans | the page title |
| `heading` | 15/20, 600, −0.01em | 17/22 | sans | a section inside a page |
| `body` | 14/22, 400 | 16/24 | sans | reading text, prose |
| `ui` | 13/18, 500 | 15/20 | sans | rows, labels, controls, the base size |
| `meta` | 12/16, 400 | 13/18 | mono | dates, slugs, values in a row |
| `micro` | 11/14, 500, +0.06em when uppercase | 12/16 | mono | eyebrows, table headers, tags |
| `figure` | 20/26, 500, tabular | 22/28 | mono | a count or an amount that leads a view |

`body` sets the page. The touch step makes it 16 px, which stops a phone from zooming a focused field. Every figure, date, slug, email, repo name, key and amount is mono with `tabular-nums`. Eyebrows and table headers are mono micro, uppercase, +0.06em. No text below `micro`.

Sizes and radii:

| Variable | Desk | Touch |
|---|---|---|
| `--row` (a list row, a control, a button) | 32 px | 44 px |
| `--control-sm` | 28 px | 44 px |
| `--grid-row` (a data-table body row) | 40 px | 48 px |
| `--grid-header` | 32 px | 44 px |
| `--sidebar-width` | 208 px | same |
| `--tab-bar` (the phone tab bar, before the safe-area inset) | 56 px | same |
| `--page-header` | 56 px | same |
| `--gutter` | 16 px below `md`, 24 px from `md`, 32 px from `lg` | |
| `--content-max` | 1120 px | |
| `--reading-max` (a document: the glance, a report, a client document) | 720 px | |
| `--radius-key` | 4 px | |
| `--radius-control` | 6 px | |
| `--radius-pane` | 8 px | |

Elevation and borders: a card rests on a 1 px `--border` hairline and no shadow; a control (input, select, textarea, outline button) draws a 1 px `--input` hairline; `shadow-float` goes on a drawer, a popover and a menu only; no gradient, no blur, no image.

The `.prose` rules (markdown from the house): `text-body`; headings on the `heading` step; `h2` opens a section with a top margin of 24 px; links underlined with a 3 px offset; `code` mono on `--muted` with `--radius-key`; `pre` wraps and never scrolls sideways; a table takes the column's width at most and its cells wrap; a list marker in `--muted-foreground`; task-list checkboxes read-only. Nothing in prose scrolls horizontally.

Read first: `CLAUDE.md`, `desk/CONTEXT.md`, `.claude/rules/desk-app.md`, `core/voice.md` (Register, Document design), `.icm/intake/desk-restyle/breakdown.md`, `desk/app/package.json`, `desk/app/components.json`, `desk/app/app/globals.css`, `desk/app/app/layout.tsx`. The brand's tokens: `tokens/colors.css`, `typography.css` and `desk.css` at the root of `k0d0minio/jamienisbet`, by `gh api` or at `~/Desktop/legible-consulting/projects/jamienisbet`. The tables above are their copy. When the two disagree, the tokens win and the table is fixed.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-restyle/breakdown.md whole, then this ticket, .icm/intake/desk-restyle/tokens-and-fonts.md, then the files its Notes name. Do what it says. One branch, one pull request to main under 600 lines, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-restyle/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Write the breakdown's accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
