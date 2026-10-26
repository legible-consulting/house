# Stub: The auth pages match the desk, every route passes the checks, and the voice file names the desk's design home

- feature-slug: auth-and-close-out
- epic: desk-restyle
- sequence: 11 of 11
- depends-on: client-sell-research
- complexity: medium
- priority: P1

## Problem

The three auth pages still render with the old pieces. No route has passed the whole accessibility checklist in one pass. `core/voice.md` names the brand's home for documents and says nothing about the desk.

## Proposed change

Restyle sign-in, forgot password, reset password and the two public form pages of `desk-forms`; run the breakdown's accessibility checklist on every route and fix what fails; add one paragraph "The desk" to `core/voice.md` under Document design.

## Acceptance criteria

- [ ] The "every page" criteria of `desk-and-work`, on the three auth pages.
- [ ] Sign-in, forgot password, reset password: one card of 360 px max on a centred column, the mark above the title. At 390 the card fills the width minus the gutter, the submit button is full width, and the keyboard does not cover the field being typed in. The Home Screen line is on sign-in (stub 5).
- [ ] `/start` and `/f/<token>` (`desk-forms/start-route`, `answer-a-link`) take the same centred column at `--reading-max`, the mark above the title, the questions as field groups, the error flash under the title and the confirmation as one sentence in the document pattern. The second form on `/sign-in`, "Email me a sign-in link" (`desk-forms/magic-link-sign-in`), sits under the password form in the same card, after a hairline.
- [ ] Every criterion of stubs 6 to 11 passes on the preview at 390 and 1440, light and dark. The pull request body lists each route with its result.
- [ ] The breakdown's accessibility checklist passes on every route. Each item is ticked in the pull request body with the route it failed on first, if any, and the fix.
- [ ] `core/voice.md`, under Document design, gains one paragraph "The desk" that points to `desk/app/app/globals.css` as the desk's design home and states the three rules (paper and ink are the tints; mono is metadata; colour is for state only), with the date. Edited as `core/CONTEXT.md` says: a fact changes in `core/` first, by pull request, Jamie merges.
- [ ] `desk/CONTEXT.md` needs no change: `app/**` already holds every new file. The pull request body says so.
- [ ] `check.yml` is green.

## Out of scope

- A new page or a new fact.
- The portfolio's restyle.

## Notes

Read first: the breakdown (the accessibility checklist), `desk/app/app/sign-in/page.tsx`, `forgot-password/page.tsx`, `reset-password/page.tsx` and their `actions.ts`, `desk/app/app/start/` and `desk/app/app/f/[token]/` as `desk-forms` left them, `core/voice.md` (Document design), `core/CONTEXT.md`.

## Prompt

Repo legible-consulting/house, desktop at ~/Desktop/legible-consulting/house (the phone checks need Jamie's phone). Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-restyle/breakdown.md whole, then this ticket, .icm/intake/desk-restyle/auth-and-close-out.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-restyle/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Tick every criterion and the accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request, the preview, and the phone checks that wait on Jamie.
