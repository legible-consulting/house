# Stub: The desk's home shows the next client actions as cards, each with a prompt to copy

- lane: tweak
- found-by: Jamie, in a desktop session · 2026-10-27
- complexity: medium
- priority: P1

## Problem

The home, `/`, shows the glance as prose and the Jamie's hand list under it. Jamie's words: "I don't want to see tickets on the home screen, I want to see next client actions, with a copy prompt that allows to put all the context of the task onto my clipboard". The page "just looks like a bunch of text that is boring to read".

## Proposed change

The home shows one card per next client action, grouped by urgency. Each card has Copy prompt. The prompt starts a session on the house with the full context of the action. Jamie's hand moves to `/work`.

## Acceptance criteria

- [ ] `/` shows the glance's rows (`lib/rhythms.ts glanceRows`) as cards in four groups: Overdue, This week, Later, No deadline. A group with no card is not shown.
- [ ] A card shows the client's name (a link to `/clients/<slug>`), the stage and the kind, the due date, and the action. A 4 px edge shows the urgency.
- [ ] Copy prompt on a card copies: the action, the deadline, the stage, the kind, the language, the folder, the repo, the Drive links, the contract of the stage, the folder's files, the record's body and the rules of the boundary.
- [ ] Tiles count the overdue actions, the actions due this week, the leads at `ready for Jamie` and the open leads. A tile that reads 0 is not shown.
- [ ] Jamie's hand is not on `/`. It is on `/work`, under On your desk, folded behind its count.
- [ ] The clients table keeps the stage, the release, the drift and `check.yml`. The next action and the deadline leave it.
- [ ] The glance file that `rhythms.yml` writes does not change.
- [ ] `check.yml` is green.

## Notes

- `scripts/read-house.mjs` adds each record's body (`notes`) and the folder's file list (`files`) to `house.json`. Only the home's prompt reads them. A client's page never shows them.
- `DESIGN.md` rules 1 and 10, `desk/CONTEXT.md` and `.claude/rules/desk-app.md` say the new home.

## Prompt

Repo legible-consulting/house. The ticket is .icm/intake/triage/desk-home-actions.md: read it first, then desk/CONTEXT.md and desk/app/DESIGN.md. Do what it says. One branch, one pull request to main, the stub moved to .icm/intake/triage/_done/ in the same pull request. Do not run the build locally. Do not merge.
