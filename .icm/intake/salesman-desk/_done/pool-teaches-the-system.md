# Stub: The pool row draws its track, names the next step and links its lesson, and the pool has a search

- feature-slug: pool-teaches-the-system
- epic: salesman-desk
- sequence: 4 of 6
- depends-on: sell-as-a-course
- complexity: medium
- priority: P1

## Problem

A row shows its status as a tag. Nothing on the row says what the salesman does next or where to read how. `/pool` opens on every row of the pool, with no search, so a salesman cannot find a company before adding it, which the cadence asks for. The add drawer says "Company and source now" and no more.

## Proposed change

The row draws the pool's statuses as a track and names the next step from the kit, with the lesson's link. The add drawer and Next touch link their lessons. `/pool` gets a search and opens on the salesman's own rows. The rules for a salesman's page go into `DESIGN.md`.

## Acceptance criteria

- [ ] `desk/app/DESIGN.md`: rule 5 adds the lead's six statuses to the walks the track draws. Rule 9 adds the exception: a salesman's page may carry one line from the kit, in the salesman's language, on the object the salesman acts on (why: Jamie built the desk and a salesman did not · 2026-10-28). Rule 1 adds `/pool` for a salesman: which of my leads need me today?
- [ ] `components/desk/pool-track.tsx`: the six statuses `new` to `handed off` as a `Track` (unit "Status"), the current one named. `lost` is the name only, muted, as `StageTrack` draws it. In a table cell, the name only.
- [ ] `/pool/<id>`: the status tag in the header becomes the pool track with the status named. Under the header, one line for an open row the user writes: "Next: <the lesson's `next`>" and the lesson's title as a link to `/sell/<key>`, from the lesson with `status:` equal to the row's status. A status with no lesson shows no line. The read-only sentence stays before it.
- [ ] Next touch: the eyebrow "Touch n of 3 · the <angle>" links to the lesson with that touch.
- [ ] The add drawer and the add card: the "what" line keeps its words and adds the link to the lesson with `status: new`.
- [ ] `/pool` for a salesman opens on Mine. All, Open, Handed off and Lost stay choices. Jamie's `/pool` opens on All as today. Due now stays first, whatever the filter.
- [ ] `/pool`: a search field on the header's trailing edge, before Add, kept in the URL as `?q=`, applied on the server inside the filter: company, contact, email, phone, WhatsApp, Instagram and source, case-insensitive. The quiet line reads "<n> of <m> prospects · <q>". The empty result says "No row matches in <filter>. Search All before you add a row." At 390 the field is one row under the header.
- [ ] `desk/CONTEXT.md`, Outputs, "A salesman's pages", names the track, the next line and the search. `.claude/rules/desk-app.md` names `pool-track.tsx`.
- [ ] `check.yml` is green.

## Out of scope

- The meeting's fields and the Move to `meeting`: `meeting-on-the-row`.
- A hint per field of the add form. The lesson is the hint.
- A change to who writes a row, to the statuses, or to `nextMoves`.

## Notes

Read first: the breakdown, `desk/app/app/(desk)/pool/page.tsx`, `desk/app/app/(desk)/pool/[id]/page.tsx`, `desk/app/app/(desk)/pool/_add.tsx`, `desk/app/app/_touch.tsx`, `desk/app/components/desk/status-tag.tsx`, `stage-track.tsx`, `track.tsx`, `page-header.tsx`, `desk/app/lib/pool.ts` (`STATUSES`, `CADENCE`), `desk/app/lib/db.ts` (`allProspects`), `desk/app/lib/kit.ts`, `desk/app/DESIGN.md`, `01-prospecting/cadence.md` (Channels: search the pool before adding). The search runs in SQL, not in the page: `allProspects` takes the query. The track is server-rendered, as every track is.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/salesman-desk/breakdown.md whole, desk/app/DESIGN.md, then this ticket, .icm/intake/salesman-desk/pool-teaches-the-system.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/salesman-desk/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria and write the accessibility checklist of .icm/intake/_done/desk-restyle/breakdown.md in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
