# Stub: A client's answer saves them as a user of the desk

- feature-slug: client-signs-up
- epic: desk-forms
- sequence: 7 of 9
- depends-on: answer-a-link
- complexity: medium
- priority: P1

## Problem

A client gets a `users` row by hand: a first sign-in, then Jamie's SQL in the Neon console to set the role and the folder. Nothing connects the questionnaire to the user.

## Proposed change

The answer to a sent link with `signup` true upserts a `users` row: the row's email and name, `role: client`, `client: <slug>`, `active: false`. No password, no session. The person sees the same confirmation as any other. Jamie activates them later (`magic-link-sign-in`).

## Acceptance criteria

- [ ] `db/schema.sql` gains `users.active boolean not null default true`. The comment on the upserts names this path.
- [ ] A valid answer to a row with `signup` true upserts the `users` row with `role: client`, `client: <slug>`, `active: false`. A row with `signup` false changes no user.
- [ ] The upsert never changes a row whose role is `jamie` or `salesman`. It never sets `active` back to false on a row that is active.
- [ ] `currentUser()` treats a user with `active: false` as a client with no folder, who sees nothing.
- [ ] Jamie's mail for this answer says the user was saved and waits for activation.
- [ ] `/clients/<slug>` shows Jamie the saved users of this folder with their state, active or not.
- [ ] `desk/CONTEXT.md` says how a client user is saved. `check.yml` is green.

## Out of scope

- The magic link and the activation: `magic-link-sign-in`.
- Content for the client page. A later epic (decision 12).

## Notes

Decision 10. `ensureUser` inserts at first sign-in with `on conflict do nothing`, so a row saved here keeps its role and its folder when the person signs in later. `active` defaults to true so that Jamie's and the salesmen's rows keep working after the migration. The Neon Auth account is not created here: Neon Auth creates it at the first magic link (`magic-link-sign-in`).
