# Stub: Jamie sends a questionnaire to one lead or client by link

- feature-slug: send-a-link
- epic: desk-forms
- sequence: 5 of 9
- depends-on: desk-reads-forms
- complexity: high
- priority: P1

## Problem

Jamie has no way to send a questionnaire to one person. The old Forms card left with icm-board.

## Proposed change

A "Send a form" card on `/clients/<slug>` and on `/pool/<id>`, for the `jamie` role only. Jamie picks a form and a language. The desk inserts a row in the Neon table `links` with the frozen questions, and shows the link `https://desk.jamienisbet.com/f/<token>` with a Copy button. The card lists the links sent to this slug, answered or not. Jamie sends the link from his own mail or WhatsApp.

## Acceptance criteria

- [ ] `db/schema.sql` gains the table `links`, idempotent like the rest of the file. The columns are in Notes.
- [ ] The card is on both pages, for the `jamie` role only. It lists every form in `house.json` and the three languages. The language defaults to the record's or the row's `language`. The name and the email default to the record's contact or the row's.
- [ ] "Send" inserts the row with the parsed form of that language as `snapshot`. `signup` is true on a client page and false on a pool row (decision 11).
- [ ] The card lists this slug's rows, newest first: the form, the language, the date sent and the date answered. A row not yet answered shows its link with Copy.
- [ ] `desk/CONTEXT.md` names the table and the card. `core/lexicon.md` defines **sent link**.
- [ ] `check.yml` is green.

## Out of scope

- The public page `/f/<token>`: `answer-a-link`.
- The user row: `client-signs-up`. This stub stores the `signup` flag only.
- Withdrawing a link. Jamie deletes the row in the Neon console.
- Any mail. The desk sends nothing.

## Notes

The columns of `links`: `id uuid` (the token), `slug`, `form`, `language`, `folder`, `name`, `email`, `snapshot jsonb`, `signup boolean`, `sent_at`, `answered_at`, `sent_by uuid references users`.

The token is the row's id, `gen_random_uuid()`, 122 random bits (decision 6). The link is `/f/<id>`. The row is in Neon, not in git, so the credential never enters the house (`CLAUDE.md`, Boundaries). The `snapshot` is `lib/forms.ts`'s shape, stored as it is, so the public page validates against the same object (`desk-reads-forms`). The record's contact comes from `clients/<slug>/record.md`, which carries no contact fields today, so the name and the email on a client page start empty. Jamie types them.
