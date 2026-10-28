# Stub: Every word of the salesman's pages reads in their language

- feature-slug: salesman-pages-in-their-language
- epic: salesman-desk
- sequence: 6 of 6
- depends-on: meeting-on-the-row
- complexity: high
- priority: P1

## Problem

The kit and the drafts read in the salesman's language, and the pages around them do not: the shell's labels, the filters, the columns, the field labels, the hints, the buttons, the empty states, the flashes and the errors are English. A French salesman reads a French lesson under an English header.

## Proposed change

The salesman's pages speak the user's language in every word of their own, from one typed words file in three languages, as `/start` does. Jamie's pages and the sign-in page stay English. The pool's statuses, the channels and the field keys stay the model's words.

## Acceptance criteria

- [ ] `lib/words.ts`: `WORDS: Record<Language, Words>`, one typed object per language, one key per string. A key missing in one language fails the build by the type. `words(language)` returns the object. No dependency is added.
- [ ] The pages read it: the shell's labels for the `salesman` role (Pool, Sell, More, Preferences, Sign out, Skip to content), `/pool` (the filters, the columns, Due now, the empty states, the foot line, Add a prospect, the drawer's title and what, the add form's labels and placeholders, the search), `/pool/<id>` (every label, legend, hint, section title, the touches table, Log a touch, Next touch and its eyebrow, the action cards' titles and what, the buttons, the read-only sentence, the facts line), the flashes and the errors the salesman's actions return (`pool/actions.ts`, `pool/[id]/actions.ts`), `/sell` and `/sell/<key>` (the header, the parts' names, Read in, Previous, Next, Copy), `/preferences`.
- [ ] Every user reads the pages in their own language. Jamie's is `en-GB`, so Jamie reads what he reads today. A page only Jamie sees has no entry in `WORDS`.
- [ ] The pool's statuses, the channels, the countries, the language codes and the field keys stay the model's words, in mono, in every language (why: one word for one thing across three languages, and the kit names them · 2026-10-28).
- [ ] `<html lang>` is the user's language on every page in the shell. A date stays ISO, `YYYY-MM-DD`.
- [ ] `en-GB` is written first. `fr-BE` and `pt-PT` are its translation. The pull request body lists what Jamie reviews.
- [ ] `desk/CONTEXT.md`, Outputs, says the salesman's pages read in the user's language, and Jamie's in English. `.claude/rules/desk-app.md` names `lib/words.ts`.
- [ ] `check.yml` is green.

## Out of scope

- The sign-in, forgot-password and reset-password pages: a visitor has no preference yet.
- Jamie's pages: `/`, `/work`, `/clients`, `/close`, `/research`, the boards, the ticket pages, the Send a form and Users cards.
- A client's page: it reads the house in the client's language through the record.
- `/start` and `/f/<token>`: they have their own words.

## Notes

Read first: the breakdown, `desk/app/app/(auth)/start/copy.ts` (the pattern), every file under `desk/app/app/(desk)/pool/`, `desk/app/app/(desk)/sell/` and `desk/app/app/(desk)/preferences/`, `desk/app/app/_touch.tsx`, `desk/app/app/_copy.tsx`, `desk/app/components/desk/shell.tsx`, `page-header.tsx`, `data-table.tsx`, `empty.tsx`, `flash.tsx`, `desk/app/app/layout.tsx` (`lang`), `desk/app/lib/language.ts`, `core/voice.md`. The words are the voice's: sentence case, no emoji, no exclamation mark, the salesman addressed as "you". A string that names a status or a key keeps it in mono, outside the sentence's translation.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/salesman-desk/breakdown.md whole, desk/app/DESIGN.md, then this ticket, .icm/intake/salesman-desk/salesman-pages-in-their-language.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/salesman-desk/_done/ in the same pull request. Write the en-GB words first, then translate them. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria, list the words file for Jamie's review, and write the accessibility checklist of .icm/intake/_done/desk-restyle/breakdown.md in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
