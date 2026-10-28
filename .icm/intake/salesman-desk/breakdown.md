# Breakdown: The salesman's desk, in one language, as a course and a pool that teaches

- epic-slug: salesman-desk
- source: Jamie's words in the session of 2026-10-28, on the desk as it runs that day. The salesman interface is Pool and Sell only, and Sell is a wall to read. A salesman picks their own language in preferences, and every word they read follows it. The seller kit and the Sell page must be easy to read and to take from. A salesman is taught how Jamie works and what he sells, then the system: how to put a lead in the pool, and how to set up a meeting for Jamie to take and close. Tickets only, no build.

## What I understood

A salesman signs in and sees two pages. `/pool` is the list and the row, in English. `/sell` renders four house files at once: `target-profile.md` and `cadence.md` as card grids of every section, with the house's why-lines and the law the salesman does not act on, nine pitch drafts, and the kit in three languages, every section folded behind its heading. The language is a filter in the URL, lost on the next visit. Nothing on the desk says who Jamie is, what a deal does after the handoff, or what a salesman does at each status. The kit is the right document in the wrong shape: Jamie's voice, written for the salesman, as one file of eight headings that mixes procedure, reference and facts, read in a card grid.

The epic gives the salesman one language, set once in preferences and kept on their user row. It makes the kit the salesman's one document, with a grammar the desk parses as it parses a form, in two parts and a reference. Part one is Jamie and what he sells. Part two is the system, from the row to the 10%. The reference is the words to send and the answers to give. `/sell` becomes a course: one lesson per page, on a track, in the salesman's language, with the pitch drafts where a lesson needs them. The pool teaches at the point of action: the row draws the pool's statuses as a track, names the next step and links its lesson. A meeting becomes three facts on the row, and the handoff carries them to Jamie. Last, every word of the salesman's pages reads in their language.

Six pull requests, in order, each reviewable on a phone. The pool's statuses, the handoff and the roles do not change. The schema grows by four columns. The kit's words change, and Jamie reviews them on the pull request.

### Questions for Jamie

1. Do `target-profile.md` and `cadence.md` leave the salesman's `/sell`, with the kit carrying what a salesman needs from them in their language? Default: yes. Jamie keeps both under a fold on his own `/sell`.
2. How does a salesman set up a meeting for Jamie? Default: Jamie keeps a booking link in `core/identity.md`. The lesson tells the salesman to send it from their own account. The salesman writes the booked date, time and place on the row. The desk sends nothing and reads no calendar.
3. Do the salesman's pages' own words translate (labels, buttons, hints, flashes), or only the kit and the drafts? Default: they translate, in the last stub. The pool's statuses, the channels and the field keys stay the model's words, in mono.
4. Where does `salesman-desk` go in `## Order`? Default: first, then `triage` (why: the two open triage stubs are P2 chores on the client repos' secrets and the blueprint, so the two epics never meet in a file).

Answered by Jamie in the session on 2026-10-28: the four defaults stand. The two model files leave the salesman's `/sell`. The meeting is booked by a link in `core/identity.md`. The pages' own words translate. `salesman-desk` is first in `README.md` `## Order`.

## Decisions of record

Fixed for the whole epic. The ones that bind a page go into `desk/app/DESIGN.md` in the stub that first needs them.

- **One language per user.** `users.language` holds `pt-PT`, `fr-BE`, `en-GB`, or nothing. A page reads the row, else the first language of `Accept-Language` that maps to the three, else `en-GB`. A page may offer another language in its URL for one read. The preference does not change with it (why: a salesman reads in one language on every device, and the prospect's language is the row's, not the salesman's · 2026-10-28).
- **The kit is the salesman's one document.** `target-profile.md` and `cadence.md` stay the house's model. A salesman does not read them in the desk. The kit carries what a salesman needs from them, in Jamie's voice and in the salesman's language. Where the kit and a model file disagree, the model wins and the kit is fixed (`01-prospecting/CONTEXT.md`) (why: one document in one language, and a model file carries why-lines and law the salesman does not act on · 2026-10-28).
- **The kit has a grammar**, as a form has. A `##` heading is one lesson. The lesson opens with a `- key:` list: its key, its part, and the pool status or the touch it teaches. The three language files carry the same keys in the same order. A kit that does not parse fails the build (why: the desk maps a lesson to a status and a touch by its key, and the words change per language while the key does not · 2026-10-28).
- **The course is the kit's order.** `/sell` lists the lessons in the kit's order, under the three parts. `/sell/<key>` is one lesson. The desk stores no progress: the URL is the lesson (why: a salesman reads a lesson again at any time, and a progress table is a fact nobody asked for · 2026-10-28).
- **A lead walks a track.** The pool's six statuses, `new` to `handed off`, draw through `components/desk/track.tsx` as a deal's stages do. `lost` shows the name only. The track joins rule 5 of `DESIGN.md` (why: status is a position, rule 2, and the eye reads a filled track before it reads a tag · 2026-10-28).
- **A salesman's page may teach where the salesman acts.** One line from the kit, in the salesman's language, on the object: the next step under the row's header, the lesson link on the add drawer, the touch's lesson on Next touch. Rule 9 holds for Jamie's pages. The exception goes into `DESIGN.md` with rule 9 (why: Jamie built the desk and a salesman did not · 2026-10-28).
- **No price reaches the kit.** The lines of `core/services.md` by name and by what the client gets. Not the anchor, the floor, the bands or a discount (`core/services.md`, Never public). The commission table keeps the examples Jamie wrote on 2026-10-22.
- **The data flow holds.** The house, the kit included, is read once at build by `read-house.mjs`. The pool and the user are read per request. The desk sends nothing: the salesman sends the draft and the booking link from their own account (`cadence.md`, Who sends).
- **Jamie's pages change in three places only.** `/preferences` is his too. His `/sell` keeps the two model files under a fold. `/` lists the meetings a salesman booked for him.
- **Translation is the session's, review is Jamie's.** A stub that writes words in three languages writes `en-GB` first and translates it. Jamie reviews the translations on the pull request (`01-prospecting/CONTEXT.md`, forms).
- **Technical text in Simplified Technical English.** The kit is not technical text: it keeps `core/voice.md`. A commit message starts with `desk:`, or `prospecting:` when the pull request changes `01-prospecting/` first, and carries one why.

Do not, each with its why:

- Do not add a dependency. Not an i18n library: the three languages are three typed objects, as `app/(auth)/start/copy.ts` does (why: three languages and one app need no framework · 2026-10-28).
- Do not translate Jamie's pages or the sign-in page (why: Jamie reads English, and a visitor with no session has no preference yet · 2026-10-28).
- Do not store a salesman's progress through the course, and do not add a first-visit flow (why: the URL is the lesson, the decision above · 2026-10-28).
- Do not read or write a calendar, and do not send a mail or a message to a prospect or a salesman (why: the desk sends nothing, `CLAUDE.md` Boundaries · 2026-10-28).
- Do not render `target-profile.md` or `cadence.md` to a salesman (why: the decision above, question 1 · 2026-10-28).
- Do not change the pool's statuses, the handoff's pull request, or who writes a row (why: `prospect.md` is the model, and this epic changes what shows, not what is true · 2026-10-28).
- Do not put a price, a band or the floor in the kit or on a page (why: `core/services.md`, Never public · 2026-10-28).
- Do not define a token outside `globals.css` (why: `desk-restyle` fixed the tokens · 2026-10-28).
- Do not run build, lint, typecheck, test, format or dev locally. CI is truth.

Checking, as in `desk-ux`: on the Vercel preview, at 390 × 844 and 1440 × 900, in light and in dark, signed in as a salesman and as Jamie. Every pull request body carries the accessibility checklist of `_done/desk-restyle/breakdown.md`, ticked for what the session checked, with the preview URL. The preview is behind Vercel Authentication. A session reports what it checked in the markup, and Jamie ticks the boxes that need a render. A salesman test user is Jamie's to set in Neon (`db/schema.sql`, the upserts).

## Build order

Strict. Each stub depends on the one before it.

1. `language-preference` — `users.language`, `/preferences`, and `/sell` in the user's language — depends-on: none
2. `kit-grammar` — the grammar in the contract, `lib/kit.ts`, the three kits rewritten as lessons — depends-on: language-preference
3. `sell-as-a-course` — `/sell` as the index and `/sell/<key>` as one lesson, on a track — depends-on: kit-grammar
4. `pool-teaches-the-system` — the pool track on the row, the next step and its lesson, a search on `/pool` — depends-on: sell-as-a-course
5. `meeting-on-the-row` — the meeting as three facts, the Move to `meeting`, the handoff carries it, Jamie's home lists it — depends-on: pool-teaches-the-system
6. `salesman-pages-in-their-language` — every word of the salesman's pages in the three languages — depends-on: meeting-on-the-row

The language comes first, because every later page reads it. The kit comes before the course, because the course renders what the grammar gives. The words come last, because that stub touches every string of every salesman page and merges over the rest.

## Out of scope

- A salesman's commission page. `prospect.md` says a salesman sees their own commission only, and no page shows it today. A stub of its own, if Jamie wants it.
- The sign-in page in three languages, and Jamie's pages in any language but English.
- Progress through the course, a quiz, or a first-visit flow.
- A calendar read or write, a booking page on the desk, a mail or a WhatsApp from the desk.
- The pool API, `/start`, `/f/<token>` and the forms.
- The pitch drafts' words. They stay as `01-prospecting/pitch/` holds them.
- Who writes a row, and what one salesman sees of another's commission.
