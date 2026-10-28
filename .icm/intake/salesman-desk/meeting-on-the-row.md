# Stub: A meeting is three facts on the row, and the handoff carries them to Jamie

- feature-slug: meeting-on-the-row
- epic: salesman-desk
- sequence: 5 of 6
- depends-on: pool-teaches-the-system
- complexity: medium
- priority: P1

## Problem

`meeting` is a status with no facts: a row says a meeting is booked or held, and not when, with whom or where. A salesman has no way, in the desk or in the kit, to set up a meeting for Jamie. Jamie learns of a meeting a salesman booked for him from a note, or not at all.

## Proposed change

A row carries the meeting: when, with whom (the sourcer or Jamie), and where. The Move to `meeting` asks for them. The kit's lesson says how a meeting with Jamie is booked (the breakdown, question 2). The handoff carries the meeting into the record. Jamie's home lists the meetings booked for him.

## Acceptance criteria

- [ ] `01-prospecting/prospect.md`, Fields: `meeting_at` (a date and a time, shown in Jamie's time zone), `meeting_with` (`sourcer` or `jamie`), `meeting_where` (text: a place, a phone number or a link), required at `meeting`, set by the sourcer. Statuses: `meeting` reads "A meeting is booked or held, with the sourcer or with Jamie. `meeting_at` and `meeting_with` are set." Handoff mapping: `next_action` is `meeting_at`'s date when `meeting_with` is `jamie` and the date is ahead, else the row's `next_action`. Paragraph 2 ends with "Meeting with Jamie on <date> at <time>, <where>." when set.
- [ ] `db/schema.sql`: the three columns on `prospects`, added with `add column if not exists`. `lib/pool.ts` and `lib/db.ts` carry them. The handoff (`lib/github.ts`) writes them as the mapping says.
- [ ] `/pool/<id>`: the Move card, when the move is to `meeting`, asks for the date, the time, with whom and where, and refuses the move without the first three, in words. A row at `meeting` or later shows the meeting in the header's facts line: the date and the time in mono, with whom, and where as a link when it is a URL. The sourcer edits the three in a Meeting field group of Facts, shown from `replied` on.
- [ ] `core/identity.md`: a `Booking link` row in the entity table, with the value Jamie gives on the pull request, or "none yet". `read-house.mjs` reads it as it reads the business email. The lesson with `status: meeting` shows the link with Copy under its words when it is set, and the words say to send it from the salesman's own account. The desk sends nothing and reads no calendar.
- [ ] `kit.<language>.md`, `set-up-the-meeting`: the words for the mechanism Jamie answered in question 2, in the three languages. Its `next:` reads what the salesman does at `meeting`.
- [ ] `/` for Jamie: a section "Meetings booked for you · <n>", soonest first, each row the company, the sourcer, the date and the time in mono, and where, linked to the pool row, for the rows with `meeting_with: jamie` and `meeting_at` today or ahead. The section renders only when one exists (why: the home answers what Jamie does today, and no meeting is no row · 2026-10-28). `lib/actions.ts` does not change: a meeting is not a client action until the handoff.
- [ ] `desk/CONTEXT.md` names the three fields in "A lead" and the section on `/`. `.claude/rules/desk-app.md` names the booking link.
- [ ] `check.yml` is green.

## Out of scope

- A calendar event, an invite, a reminder: the salesman and Jamie book from their own accounts.
- A meeting after the handoff: the record's `next_action` carries it (`clients/CONTEXT.md`).
- A change to `canGoReady` beyond the three fields.

## Notes

Read first: the breakdown, `01-prospecting/prospect.md`, `desk/app/db/schema.sql`, `desk/app/lib/pool.ts` (`nextMoves`, `missingForReady`), `desk/app/lib/db.ts`, `desk/app/lib/github.ts` (the handoff), `desk/app/app/(desk)/pool/[id]/page.tsx` (the Move card, the facts line), `desk/app/app/(desk)/pool/[id]/actions.ts` (`moveStatus`), `desk/app/app/(desk)/page.tsx`, `desk/app/scripts/read-house.mjs` (the business email), `core/identity.md`, `01-prospecting/kit.en-GB.md`. Jamie's time zone is Europe/Lisbon. The time is stored with its zone and shown as Jamie's.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, 01-prospecting/CONTEXT.md, .icm/intake/CONTEXT.md, .icm/intake/salesman-desk/breakdown.md whole, desk/app/DESIGN.md, then this ticket, .icm/intake/salesman-desk/meeting-on-the-row.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/salesman-desk/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria and write the accessibility checklist of .icm/intake/_done/desk-restyle/breakdown.md in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
