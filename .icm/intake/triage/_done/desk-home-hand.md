# Stub: Jamie's hand returns to the home, and the clients table gets its own page

- lane: tweak
- found-by: Jamie, in a desktop session · 2026-10-27
- complexity: low
- priority: P1

## Problem

`desk-home-actions` moved Jamie's hand, the house's own open items, from `/` to `/work`, and kept the clients table on `/`. Jamie's words: "the homepage of desk.jamienisbet used to have an open items list of actions for me to accomplish. I don't see that anymore, let's have that instead of the clients list below the client work needing done. We can just have a separate client table view".

## Proposed change

The home shows Jamie's hand under the action cards, in the clients table's place. The clients table moves to `/clients`, a page of its own, with a link in the sidebar and the tab bar. `/work` no longer shows Jamie's hand.

## Acceptance criteria

- [ ] `/` shows the action cards, then Jamie's hand (`.icm/intake/README.md`, read at build) behind its count. With no step, one quiet line.
- [ ] `/` has no clients table.
- [ ] `/clients` shows the clients table: the client, the stage, the release with the drift, and `check.yml`. A row links to `/clients/<slug>`. The drift report's line sits under it.
- [ ] The sidebar and the tab bar carry Clients for Jamie. `/clients` and `/clients/<slug>` light it. A client user's own page still lights Desk.
- [ ] `/work` shows no step of Jamie's hand.
- [ ] The glance file that `rhythms.yml` writes does not change.
- [ ] `check.yml` is green.

## Notes

- `DESIGN.md` rule 1, `desk/CONTEXT.md` and `.claude/rules/desk-app.md` name the two pages.

## Prompt

Repo legible-consulting/house. The ticket is .icm/intake/triage/desk-home-hand.md: read it first, then desk/CONTEXT.md and desk/app/DESIGN.md. Do what it says. One branch, one pull request to main, the stub moved to .icm/intake/triage/_done/ in the same pull request. Do not run the build locally. Do not merge.
