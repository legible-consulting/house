# Stub: Jamie activates a client, who then signs in by magic link

- feature-slug: magic-link-sign-in
- epic: desk-forms
- sequence: 8 of 9
- depends-on: client-signs-up
- complexity: high
- priority: P1

## Problem

A saved client user cannot get in. The desk signs in by email and password only, and a client keeps no password.

## Proposed change

On `/clients/<slug>`, Jamie activates a saved user: the desk sets `active: true` and asks Neon Auth to mail them a magic link. `/sign-in` gains "Email me a sign-in link" for clients. The desk asks Neon Auth for a link only when an active client user has that email. The link signs the person in and lands them on `/clients/<slug>`. Jamie and the salesmen keep email and password.

## Acceptance criteria

- [ ] Jamie enables magic links in the Neon Auth config of project `legible-desk`. Named in `desk/CONTEXT.md` as his step.
- [ ] "Activate" on `/clients/<slug>`, for the `jamie` role only, sets `users.active = true` and asks Neon Auth for a magic link to that email. The page says the link is on its way. "Send again" repeats the link for an active user.
- [ ] `/sign-in` has a second form: an email, "Email me a sign-in link". The desk asks Neon Auth for a link when an active `client` user has that email, and does nothing otherwise. The note is the same in both cases, as `/forgot-password` does.
- [ ] The magic link signs the person in with the session cookies, runs `ensureUser`, and lands on `/clients/<slug>` for their folder.
- [ ] A `client` user never signs in with a password. The password form answers a client's email with the note to use the link.
- [ ] `desk/CONTEXT.md` says how a client gets in. It records that Neon Auth sends the link at Jamie's click, like the reset mail today (why: Jamie decides who gets in · 2026-10-25). The desk's own mail still goes to Jamie only.
- [ ] `check.yml` is green.

## Out of scope

- A magic link for Jamie or a salesman.
- Content for the client page. A later epic (decision 12).

## Notes

Decision 10. The SDK call is `auth().signIn.magicLink({ email, callbackURL })` on `@neondatabase/auth`, with the callback on the desk's origin, the way `requestReset` builds `redirectTo`. The build checks the SDK's name for the call before it starts, and says so on the pull request. The password form's refusal for a client reads the `users` row by email before it calls Neon Auth.
