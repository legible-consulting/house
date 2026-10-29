# Stub: /sell is a course: one lesson per page, on a track, in the salesman's language

- feature-slug: sell-as-a-course
- epic: salesman-desk
- sequence: 3 of 6
- depends-on: kit-grammar
- complexity: high
- priority: P0

## Problem

`/sell` is one page of four sections: two house files as card grids, nine pitch drafts, and the kit folded behind every heading, each in up to three languages. A salesman scrolls and reads. Nothing says where to start, what comes next, or which lesson is for the row they hold.

## Proposed change

`/sell` becomes the course's index: the kit's intro, then its three parts, each a list of lessons in order. `/sell/<key>` is one lesson: the part's track, the words, the drafts the lesson needs, and the way to the next lesson. Both read in the user's language. The two house files stay for Jamie only, under a fold.

## Acceptance criteria

- [ ] `/sell`: the header "Sell", the quiet line "<language> · <n> lessons". Under it the kit's intro as prose in the reading width. Then three sections, Jamie and what he sells, The system, The reference, each a list of its lessons in the kit's order: the number, the title, and for a lesson with `status:` the status in mono. A row is a link to `/sell/<key>`. No card grid, no fold, no jump group: `_jump.tsx` leaves.
- [ ] `/sell/<key>`: the header with a back link to Sell, the lesson's title, the quiet line "<part> · lesson <n> of <m>" for the part. Under the header the track (`components/desk/track.tsx`, unit "Lesson") of the part's lessons, filled to this one, the current one named. Then the words as prose in the reading width. A key no kit has is a 404.
- [ ] A lesson with `touch:` shows, after the words, the pitch draft of each touch in the reader's language, in the document block the row's Next touch uses, with Copy and the placeholders marked. The draft's eyebrow reads "Touch n of 3 · the <angle>" (`lib/pool.ts CADENCE`).
- [ ] At the foot of a lesson: Previous and Next, the titles of the lessons beside it in the kit's order, across the parts. The last lesson has no Next. The first has no Previous.
- [ ] The language: the index and the lesson read in `languageOf` (`language-preference`). A toggle group "Read in" on both, the three languages in their own names, kept in the URL as `?lang=`, the preference unchanged. "Every language" leaves `/sell`: one language at a time.
- [ ] Jamie only, at the foot of `/sell`: a fold "The house's model · 2" (`components/desk/fold.tsx`, folded) with `target-profile.md` and `cadence.md` as the card grids and the cadence tiles they are today. A salesman does not get the fold or the files (the breakdown, question 1).
- [ ] The phone, 390: the index is one column of rows. A lesson is one column. No horizontal scroll. The desk, 1440: the reading width for the words, as the row's Next touch has it.
- [ ] `desk/CONTEXT.md`, Outputs, "A salesman's pages", says what `/sell` and `/sell/<key>` show. `.claude/rules/desk-app.md` names the two routes and `lib/kit.ts`. `desk/app/DESIGN.md`, rule 1, gets the two questions: `/sell`, where do I start and what comes next. `/sell/<key>`, what do I do at this step.
- [ ] `check.yml` is green.

## Out of scope

- The row page's links into the course: `pool-teaches-the-system`.
- The words of the index and of the lesson page's own labels in a language but English: `salesman-pages-in-their-language`.
- Progress, a quiz, a first-visit flow (the breakdown, Out of scope).

## Notes

Read first: the breakdown, `desk/app/app/(desk)/sell/page.tsx`, `desk/app/app/(desk)/sell/_jump.tsx`, `desk/app/app/_touch.tsx` (the document block, Copy, the placeholders), `desk/app/lib/kit.ts`, `desk/app/lib/house.ts`, `desk/app/lib/language.ts`, `desk/app/components/desk/track.tsx`, `stage-track.tsx`, `fold.tsx`, `page-header.tsx`, `prose.tsx`, `desk/app/DESIGN.md`. The lesson page is a page with a URL, as a ticket is (rule 12): the phone has one column, and a URL is shared. The route is `app/(desk)/sell/[key]/page.tsx` with its `loading.tsx`.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/salesman-desk/breakdown.md whole, desk/app/DESIGN.md, then this ticket, .icm/intake/salesman-desk/sell-as-a-course.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/salesman-desk/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria and write the accessibility checklist of .icm/intake/_done/desk-restyle/breakdown.md in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
