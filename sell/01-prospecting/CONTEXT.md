---
status: built
holds:
  - target-profile.md
  - cadence.md
  - prospect.md
  - "pitch/*.md"
  - "kit.*.md"
  - "targets/*.md"
---
# Prospecting — S1

S1 produces a target profile, researched target lists, outreach drafts in the prospect's language, and a follow-up cadence, so that salesmen can work the pool from the dashboard and each closed deal records who sourced it and the commission owed.

## Inputs

- `core/services.md`, `core/voice.md`.
- `target-profile.md`, `cadence.md` and `prospect.md` in this folder (stage-level, not per
  client). The model the desk implements.
- The desk's pool (C3): the rows a salesman works. The pool is not in this repo.

## Process

- Start cold from this folder. Read only what Inputs names.

How a salesman works the pool, in the desk:

1. Read `target-profile.md`, the drafts in `pitch/` and the kit, `kit.<language>.md`. All
   three are read-only in the desk.
2. Add a prospect, or take one from a `targets/<list>.md` a session researched. The desk
   fills `slug`, `sourced_by`, `added` and `status: new`. The desk refuses a `slug` that
   exists in the pool or in `clients/*/record.md` (why: one company has one row, and a
   client is not a prospect · 2026-10-19).
3. Send the first touch from your own account. Log it: date, channel, note. The status
   becomes `contacted`. The desk sets `next_action` from `cadence.md`.
4. Follow the cadence. Log every touch. A reply makes the status `replied`. A booked or held
   meeting makes it `meeting`.
5. A no, or silence past the cadence, makes it `lost` with `lost_reason`.
6. From `replied` or `meeting`, with every `ready` field in `prospect.md` filled, set
   `ready for Jamie`.

The handoff:

- `ready for Jamie` opens one PR against `main`, under the desk's bot identity. The PR
  creates `clients/<slug>/record.md` at `stage: prospect`, filled by the handoff mapping in
  `prospect.md`. One prospect, one PR. The desk opens nothing else (why: the folder is the
  record, and a PR is the one door into it · 2026-10-19).
- Jamie reads the PR and merges it. The merge is the handoff. The desk then sets the row to
  `handed off`, sets `record`, and makes the row read-only. From then on the client folder is
  the home, and `clients/CONTEXT.md` says what is true at each stage.
- A PR Jamie closes without a merge returns the row to its previous status, with his reason
  in `notes`.
- Never: the desk or a session merges the PR, or moves `stage` (boundary).

Jamie's own leads: Jamie may add a row to the pool like a salesman, with `sourced_by: jamie`
and no commission, or open the client folder directly as `clients/CONTEXT.md` allows. Either
way the folder opens at `prospect`.

A session in this folder produces the stage-level material, never a pool row:

- `targets/<list>.md`: companies that match `target-profile.md`, with the `source` the
  sourcer copies into the row. One list per search, dated. The list it replaces is deleted.
- `pitch/<touch>.<language>.md`: one draft per touch in `cadence.md` and per language in
  `target-profile.md`, written from `core/voice.md` and `core/services.md`. The sender adapts
  it by hand.
- `kit.<language>.md`: the seller kit, one per language in `target-profile.md`: how a lead
  reaches Jamie, the openers for the seller's own channels, the follow-ups, the answers when
  a prospect hesitates, what makes a lead worth sending, the lines, and what the 10% looks
  like. Written from `core/voice.md`, `core/services.md` and `prospect.md`. Where a price
  disagrees with `core/services.md` or a term with `prospect.md`, the house wins and the kit
  is fixed. No price reaches a prospect through it (why: `core/services.md`, "Never public"
  · 2026-10-22).
- After handoff, outreach a session drafts for Jamie goes to `clients/<slug>/outreach/`.

## Outputs

- `clients/<slug>/record.md` opened at `stage: prospect` by the handoff PR, with `salesman`
  and `commission.sourced_by` set. `commission.owed` is set at S5 (`prospect.md`).
- `target-profile.md` · `cadence.md` · `prospect.md`: the model (built 2026-10-19).
- `pitch/<touch>.<language>.md`: nine drafts, three touches by three languages.
- `kit.<language>.md`: the seller kit, one per language (built 2026-10-22). The desk shows it
  on `/sell`.
- `targets/<list>.md`: one researched list per search.
- The pool rows live in the desk, never here. The monthly close reads commission from
  `record.md`, never from the pool.
