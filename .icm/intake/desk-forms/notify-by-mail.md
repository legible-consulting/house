# Stub: A submission mails Jamie

- feature-slug: notify-by-mail
- epic: desk-forms
- sequence: 3 of 9
- depends-on: none
- complexity: low
- priority: P0

## Problem

The desk sends no mail. A submission must reach Jamie without him opening the house.

## Proposed change

`lib/mail.ts` sends one plain-text mail through Resend's HTTP API: a subject, a body and a reply-to. `RESEND_API_KEY` joins `.env.example`, `lib/env.ts` and `desk/CONTEXT.md`, name only. The recipient is the business email in `core/identity.md`, read at build. A failed send is logged and does not fail the submission (why: the answers are in git before the mail is sent).

## Acceptance criteria

- [ ] `lib/mail.ts` sends a plain-text mail with `fetch` to Resend's API. No SDK.
- [ ] `RESEND_API_KEY` is in `.env.example`, `lib/env.ts` and `desk/CONTEXT.md`, name only.
- [ ] `read-house.mjs` reads the business email from `core/identity.md` into `house.json`. Its header lists the read.
- [ ] An unset key or a failed send is logged with the reason, and the caller continues.
- [ ] `check.yml` is green.

## Out of scope

- Mail to a visitor. The desk sends nothing to a visitor.
- A template. The body is plain text.

## Notes

From `Desk <desk@mail.jamienisbet.com>`, the domain the portfolio verified in Resend (decision 7). Jamie creates a Resend API key for the desk and sets it on the Vercel project `legible-desk`. The key must belong to the Resend account that holds the domain. The old sender is in `app/actions/intake.ts` at `9d5db8c`.
