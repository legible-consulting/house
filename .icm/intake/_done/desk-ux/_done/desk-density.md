# Stub: The home page shows the day in one screen

- feature-slug: desk-density
- epic: desk-ux
- sequence: 5 of 6
- depends-on: work-overview
- complexity: low
- priority: P1

## Problem

On `/`, seven tiles read 0, the clients table has nine columns, a next action wraps to twelve lines in one cell, and the glance runs past the fold with the hand list.

## Proposed change

Apply rules 6, 7 and 8 to `/`. The facts do not change.

## Acceptance criteria

- [ ] The pool: when every count is 0, one line in the section's place, "Pool: no open lead.", linked to `/pool`. Otherwise the tiles, and a tile that reads 0 shows its figure in the muted colour.
- [ ] The clients table has five columns: the client (the title, with the next action as its second line in body text, clamped to two lines), the stage as the track, the deadline, the release, and `check.yml`. Kind, repo and blueprint leave the table. A drifted repo shows its drift in red words under its release. The footnote under the table keeps the estate line only.
- [ ] The glance's "Jamie's hand" folds behind its count ("Jamie's hand · 9") with the fold, open by default at six lines or fewer. "Next actions" and "Ongoing" stay open.
- [ ] `rhythms.ts` does not change. The glance file keeps every section whole.
- [ ] `check.yml` is green.

## Out of scope

- The glance's words. The pool's statuses.

## Notes

Read first: the breakdown, `app/(desk)/page.tsx`, `components/desk/stat.tsx`, `components/desk/data-table.tsx` (a title cell with a second line), `components/desk/fold.tsx`, `lib/rhythms.ts` (`glance`: the sections it writes). The fold on the glance wraps the rendered section: `glanceHtml` splits at the `<h2>` that reads "Jamie's hand".

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-ux/breakdown.md whole, desk/app/DESIGN.md, then this ticket, .icm/intake/desk-ux/desk-density.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-ux/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria and write the breakdown's accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
