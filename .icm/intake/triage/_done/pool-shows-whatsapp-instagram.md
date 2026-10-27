# Stub: The desk pool reads and writes the WhatsApp number and the Instagram handle

- lane: feature
- found-by: the load of 105 leads into the desk pool, and legible-consulting/house#129 · 2026-10-27
- complexity: low
- priority: P2

## Problem

On 2026-10-27, 105 leads went into the live `prospects` table (Neon project `legible-desk`) with two new columns, `whatsapp` and `instagram`, both `text not null default ''`. 10 rows have a WhatsApp number and 49 have an Instagram handle. legible-consulting/house#129 adds the two columns to `desk/app/db/schema.sql` and changes no app code. The desk does not show or edit either field, so a lead with only a WhatsApp number or an Instagram handle shows no contact point. The no-contact list does not see the WhatsApp number, and the 12-month purge does not clear either field.

## Proposed change

- `lib/pool.ts`: `Prospect` and `ProspectFields` get `whatsapp` and `instagram`. `fieldsFrom` reads both. It keeps the WhatsApp number as typed, like the phone. It keeps the Instagram handle without `@` or the `instagram.com/` address, in lower case, and refuses a value that is not a handle. `whatsappUrl` gives `https://wa.me/<digits>`, and `instagramUrl` gives `https://www.instagram.com/<handle>/`.
- `lib/db.ts`: the row select, `insertProspect` and `updateProspect` read and write both columns. `lib/lead.ts` (the pool API and `/start`) writes both as empty.
- The add form (`app/(desk)/pool/_form.tsx`) and the row page's Contact group (`app/(desk)/pool/[id]/page.tsx`) get a WhatsApp field and an Instagram field. On the row page, each field with a value has its link under it. The link is an anchor, so it works on a read-only row too.
- The pool list's Contact column falls back from the email to the phone, then to the WhatsApp number, then to `@<handle>`.
- The next touch's "Open in WhatsApp" (`app/_touch.tsx`) uses the WhatsApp number, and the phone when the row has none.
- The handoff PR body (`lib/github.ts`) lists both fields.
- `scripts/pool-purge.mjs` clears both fields with the person's other data.
- `01-prospecting/prospect.md`, `cadence.md`, `legitimate-interest.md` and `desk/CONTEXT.md` name the two fields where they name the email and the phone.

### Decision: the WhatsApp number goes on the no-contact list

The WhatsApp number is a contact point. `contactPoints` keys it as a `phone`, with the same `phoneKey`. "They asked not to be contacted" writes it to `suppressions`, and the add, the save and the pool API refuse a row whose WhatsApp number is on the list. When the WhatsApp number and the phone are one number, they give one entry.

Why: one number covers the phone and WhatsApp (`schema.sql`, `cadence.md`). A number on the list is closed on both channels. A no given on WhatsApp must close the number in the `whatsapp` field when the `phone` field is empty or holds a different number. `suppressions` keeps `kind in ('email', 'phone')`, so the table and its 2026-10-26 entries do not change.

The Instagram handle does not go on the list. `suppressions` holds an address or a number, and Instagram is not a channel of `cadence.md`: the desk shows the handle as a fact and a link, and a salesman does not touch a prospect there. If Instagram becomes a channel, the list gets a third kind in its own ticket.

`missingForReady` does not change: `ready for Jamie` needs an email or a phone (`prospect.md`). A lead with only a WhatsApp number gets that number in `phone` too before the handoff.

## Acceptance criteria

- [ ] The add form and the row page write `whatsapp` and `instagram`, and the row page shows each one with a `wa.me` or `instagram.com` link.
- [ ] `contactPoints` returns the WhatsApp number as a `phone` point, once when it is the phone's number.
- [ ] "They asked not to be contacted" writes the WhatsApp number to `suppressions`. The add, the save and the pool API refuse a WhatsApp number on the list.
- [ ] `scripts/pool-purge.mjs` clears `whatsapp` and `instagram`.
- [ ] The pool docs name the two fields.
- [ ] `check.yml` is green.

## Notes

Based on main while #129 is open. #129's migration comment says the pool pages do not show the two columns yet. After #129 merges, rebase and remove that clause. Do not run build, lint, typecheck, test or dev locally: CI is the source of truth. Conventional Commits.

## Prompt

Desktop, legible-consulting/house at ~/Desktop/legible-consulting/house. Read .icm/intake/CONTEXT.md, then this ticket, .icm/intake/triage/pool-shows-whatsapp-instagram.md. Do what it says. One branch, one pull request to main, Conventional Commits. Move the stub to .icm/intake/triage/_done/ in the same pull request. Do not merge. Your last message names the pull request.
