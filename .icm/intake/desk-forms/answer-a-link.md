# Stub: A lead or client answers a questionnaire on `/f/<token>`

- feature-slug: answer-a-link
- epic: desk-forms
- sequence: 6 of 9
- depends-on: send-a-link
- complexity: high
- priority: P1

## Problem

A sent link has no page to open.

## Proposed change

`/f/<token>` is public. It reads the `links` row, and renders the frozen questions in the row's language. On submit the desk validates the answers against the frozen questions. It writes the answers file to the house and marks the row answered. It mails Jamie and shows a confirmation. An unknown token gets one dead end. An answered one gets another.

## Acceptance criteria

- [ ] `/f/<token>` renders without a session. `proxy.ts` leaves `/f` out of the matcher.
- [ ] A token that is not a uuid, or has no row, says the link is not valid and names the business email.
- [ ] A row with `answered_at` set says the answers are with Jamie.
- [ ] The page renders the frozen title, intro and questions from the row's `snapshot`, never from `forms/` or `house.json`.
- [ ] Validation is the same as on `/start`: required, options, lengths, the error under the field, the typed values kept.
- [ ] A valid submission sets `answered_at` where it is null. The update that matches no row is the dead end, so a double submit lands once.
- [ ] The answers file is `clients/<slug>/<folder>/<form>-<date>.md` when `clients/<slug>/record.md` exists on `main`, else `01-prospecting/leads/<slug>/<form>-<date>.md`. The shape is decision 1, `source: link`, written with `writeFile`.
- [ ] Jamie gets one mail: subject `<form title>: <name>`, the answers as text, reply-to the row's email.
- [ ] The page carries `noindex`. `app/robots.ts` serves `Disallow: /f/`.
- [ ] `desk/CONTEXT.md` names the route. `check.yml` is green. The preview answers `/f/anything` with the dead end.

## Out of scope

- The user row: `client-signs-up`. A row with `signup` true behaves like any other in this stub.
- The desk's pages showing the answers.
- Reminders.

## Notes

The page's own words are in the row's language, the same three sets as `/start`. The desk marks the row before it writes the file (why: a second submit must see the row spent. A failed write is in the Vercel log with the row id · 2026-10-25). The old shape: `app/f/[token]/page.tsx`, `components/customer-form.tsx`, `app/actions/form.ts` and `lib/form-answer-schema.ts` at `9d5db8c`.
