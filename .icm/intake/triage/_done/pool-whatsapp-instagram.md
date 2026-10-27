# Stub: The pool row holds a WhatsApp number and an Instagram handle

- lane: chore
- found-by: the load of the jamie-nisbet biz backup of 2026-10-25 into the desk pool, on Jamie's word in the session of 2026-10-27
- complexity: low
- priority: P2

## Problem

The old pool (Neon project `jamie-nisbet`, table `biz.clients`) held a WhatsApp number for 10 of the 105 leads and an Instagram handle for 49. The desk's `prospects` table had no column for either, so the load had no place for them.

## Proposed change

Add `whatsapp` and `instagram` to `prospects`, both `text not null default ''`, in the `create table` and in the migration block of `desk/app/db/schema.sql`. The live database (Neon project `legible-desk`) got the same `alter table` on 2026-10-27, before the load.

## Acceptance criteria

- [ ] `desk/app/db/schema.sql` creates `prospects` with `whatsapp` and `instagram`.
- [ ] The migration block adds both columns with `add column if not exists`.
- [ ] `check.yml` is green.

## Notes

The pool pages (`app/(desk)/pool/`) and `lib/pool.ts` do not read or write the two columns yet. Showing and editing them is not part of this change.
