# Stub: A salesman sets their language once, and the desk keeps it

- feature-slug: language-preference
- epic: salesman-desk
- sequence: 1 of 6
- depends-on: none
- complexity: medium
- priority: P0

## Problem

The desk has no language preference. `/sell` shows every language unless `?lang=` is in the URL, and the choice is lost on the next visit. A user row has no language. Nothing in the shell leads to a page of the user's own.

## Proposed change

A user picks one of the three languages on `/preferences`, and the desk keeps it on their user row. `/sell` opens in that language. A user with no preference reads in their browser's language when it is one of the three, else in `en-GB`.

## Acceptance criteria

- [ ] `db/schema.sql`: `users.language`, text, empty by default, one of `pt-PT`, `fr-BE`, `en-GB` or empty, added with `add column if not exists`. The comment at the foot says who sets it: the user, on `/preferences`, and the upsert Jamie may use by hand.
- [ ] `lib/pool.ts` `DeskUser` carries `language`. `lib/db.ts` reads it. `lib/user.ts currentUser` returns it.
- [ ] `lib/language.ts`: `languageOf(user, acceptLanguage)` returns the row's language, else the first language of the `Accept-Language` header that maps to the three (the map `/start` uses, `lib/lead.ts LOCALES`), else `en-GB`. It exports the three names in their own language: English, Français, Português.
- [ ] `/preferences`, for `jamie` and `salesman` (a client is sent to `/`): the header "Preferences", the quiet line the user's email. One field group: the name and the email as facts, read-only, and Language as a select of the three in their own names, the current one chosen. Save writes the row and comes back with a note. A failed write comes back with an error, in words.
- [ ] The shell: the user's name in the sidebar's foot and in the More drawer is a link to `/preferences`. Sign out stays where it is. The sidebar's rows and the tabs do not change otherwise.
- [ ] `/sell`: with no `?lang=`, the page shows the user's language only. "Every language" stays a choice of the toggle group and puts `?lang=all` in the URL. `?lang=<one of the three>` still works for one read. The preference does not change from `/sell`.
- [ ] The row page's Next touch keeps the prospect's language. A salesman's preference does not change the draft that goes to the prospect.
- [ ] `desk/CONTEXT.md` (Outputs, Sign-in and Jamie's pages) names `users.language` and `/preferences`. `.claude/rules/desk-app.md` names `lib/language.ts`.
- [ ] `check.yml` is green.

## Out of scope

- Any word of the shell or the pages in a language but English: `salesman-pages-in-their-language`.
- The kit and the course: `kit-grammar`, `sell-as-a-course`.
- A client's language. A client reads `clients/<slug>/record.md` `language:` through the house, not a preference.

## Notes

Read first: the breakdown, `desk/app/db/schema.sql`, `desk/app/lib/user.ts`, `desk/app/lib/db.ts` (`userSelect`, `userByEmail`), `desk/app/lib/pool.ts` (`DeskUser`, `LANGUAGES`), `desk/app/lib/lead.ts` (`LOCALES`), `desk/app/components/desk/shell.tsx` (`Who`), `desk/app/app/(desk)/sell/page.tsx` (the `?lang=` toggle), `desk/app/app/(auth)/start/copy.ts` (`languageOf`, the precedent), `desk/app/components/desk/field-group.tsx`. The page posts a plain form to a server action and comes back with `?note=` or `?error=`, as every desk form does. The route is `app/(desk)/preferences/page.tsx` with `actions.ts` and `loading.tsx`.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/salesman-desk/breakdown.md whole, desk/app/DESIGN.md, then this ticket, .icm/intake/salesman-desk/language-preference.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/salesman-desk/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria and write the accessibility checklist of .icm/intake/_done/desk-restyle/breakdown.md in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
