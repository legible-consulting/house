# Stub: The pool keeps a no for good, and forgets a row nobody worked for a year

- lane: chore
- found-by: the legitimate-interest assessment · 2026-10-26
- complexity: medium
- priority: P1

## Problem

`01-prospecting/legitimate-interest.md` §4 and §5: the balance for cold outreach holds on two controls. A no closes every channel for good. A row nobody worked for 12 months is cleared. Today both are by hand. `lost` is final for the row, but `/pool` adds a new row with the same address without a check, and `POST /api/pool` refuses only an open row with that email. Nothing in the desk clears a row. The first clearance is due on 2027-10-19, twelve months after the pool's first row.

## Proposed change

1. A `suppressions` table in `desk/app/db/schema.sql`: `kind` (`email`, `phone`), `value` (a lower-cased address, an E.164 number), `reason`, `created_at`. Unique on `(kind, value)`. No foreign key to the row.
2. One gesture on the row's page, "They asked not to be contacted": it sets `lost` with that reason, writes one suppression per contact point on the row, and clears `next_action`. Jamie and the sourcer only.
3. `addProspect`, `saveProspect` and `POST /api/pool` refuse a suppressed email or phone, in words. The API answers 422 with `suppressed`. No code path deletes a suppression.
4. `desk/app/scripts/pool-purge.mjs`: a row at `new`, `contacted` or `lost` whose last touch (or `added`, when it has no touch) is older than 12 months has `contact_name`, `email`, `phone`, `website`, `ask` and `notes` cleared and keeps `company`, `country`, `line`, `source` and the dates. Its touches keep their dates and lose their notes. The script reports first and writes only with `--yes`. Run by hand from the laptop, not on a timer.
5. `prospect.md`, `cadence.md` and `legitimate-interest.md` §4 and §5 say the above where each rule lives.

## Acceptance criteria

- [ ] A row set "They asked not to be contacted" cannot be added again by its email or phone on `/pool`, and the API returns 422 for its email.
- [ ] No code path deletes a suppression.
- [ ] `node scripts/pool-purge.mjs` prints what it would clear and changes nothing. With `--yes` it clears it.
- [ ] `check.yml` is green and the Vercel preview builds.

## Questions for Jamie

1. Does the gesture also close WhatsApp for a number given by phone? Default: yes. One number is one contact point.
2. Does the purge clear `ask` and `notes`? Default: yes. §5 of the assessment clears them, and nobody reads a row a year cold.
3. Does the purge run monthly from `rhythms.yml`? Default: no. By hand, from the laptop.

## Notes

Read first: `01-prospecting/legitimate-interest.md` (§4, §5), `01-prospecting/cadence.md` (Channels), `01-prospecting/prospect.md`, `desk/CONTEXT.md`, `desk/app/db/schema.sql`, `desk/app/lib/pool.ts`, `desk/app/lib/db.ts`, `desk/app/app/pool/actions.ts`, `desk/app/app/pool/[id]/actions.ts`, `desk/app/app/api/pool/route.ts`. The schema is applied by hand in the Neon console (`schema.sql` is idempotent): name that step in the pull request body as Jamie's.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, .icm/intake/CONTEXT.md, then this ticket, .icm/intake/triage/pool-opt-outs-and-purge.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:". Move the stub to .icm/intake/triage/_done/ in the same pull request. Never run build, lint or dev. Do not merge. Your last message names the pull request and what waits on Jamie.
