---
status: built
holds:
  - target-profile.md
  - cadence.md
  - prospect.md
  # The lawful basis for cold outreach, beside the outreach it governs (2026-10-26).
  - legitimate-interest.md
  - "pitch/*.md"
  - "kit.*.md"
  - "targets/*.md"
  # The questions a lead answers on the desk, one file per form and language (2026-10-26).
  - "forms/*.md"
  # A lead's answers to a form, written by the desk, until the handoff moves them (2026-10-26).
  - "leads/*/*.md"
---
# Prospecting

Prospecting produces a target profile, researched target lists, outreach drafts in the prospect's language, and a follow-up cadence, so that salesmen can work the pool from the dashboard and each closed deal records who sourced it and the commission owed.

## Inputs

- `core/services.md`, `core/voice.md`.
- `target-profile.md`, `cadence.md` and `prospect.md` in this folder (stage-level, not per
  client). The model the desk implements.
- The desk's pool: the rows a salesman works. The pool is not in this repo.

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
- The same PR moves the lead's folder, `leads/<slug>/`. Each file goes to
  `clients/<slug>/<folder>/`, where `<folder>` is the file's `folder:` frontmatter. On the
  branch, the lead's folder is gone. A lead without a folder gets the same PR, with no move. A
  file that names no folder stops the handoff before the branch exists, and the desk names the
  file (why: the answers are documents of the relationship, and the client folder is its one
  home · 2026-10-26).
- A slug that changed after the answers landed: the desk finds no folder under the new slug,
  and the old folder stays in `leads/`. Jamie moves it by hand.
- Jamie reads the PR and merges it. The merge is the handoff. The desk then sets the row to
  `handed off`, sets `record`, and makes the row read-only. From then on the client folder is
  the home, and `clients/CONTEXT.md` says what is true at each stage.
- A PR Jamie closes without a merge returns the row to its previous status, with his reason
  in `notes`. `main` does not change: the record and the move are on the branch only.
- Never: the desk or a session merges the PR (boundary). `stage` moves as `clients/CONTEXT.md` says.

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
- `forms/<form>.<language>.md`: a form, in the grammar in Outputs. A new form gets three
  files, `en-GB`, `fr-BE` and `pt-PT`. The session writes the en-GB file and translates it.
  Jamie reviews the translations on the pull request.
- After handoff, outreach a session drafts for Jamie goes to `clients/<slug>/outreach/`.

## Outputs

- `clients/<slug>/record.md` opened at `stage: prospect` by the handoff PR, with `salesman`
  and `commission.sourced_by` set. `commission.owed` is set at the agreement (`prospect.md`).
- `target-profile.md` · `cadence.md` · `prospect.md`: the model (built 2026-10-19).
- `legitimate-interest.md`: the GDPR legitimate-interest assessment for cold outreach from the
  pool: why a business that did not ask may be contacted, how far, and where it stops. It
  lives here because it governs the outreach this stage produces (why: the lawful basis sits
  beside the activity it covers, so the limits are read where the pitch is written ·
  2026-10-26).
- `pitch/<touch>.<language>.md`: nine drafts, three touches by three languages.
- `kit.<language>.md`: the seller kit, one per language (built 2026-10-22). The desk shows it
  on `/sell`.
- `targets/<list>.md`: one researched list per search.
- `forms/free-look.<language>.md`: the free look, eight questions in `en-GB`, `fr-BE` and
  `pt-PT` (built 2026-10-26). It is the form for `/start` on the desk (the `desk-forms`
  epic in `.icm/intake/`). Its answers land in `research/` (`folder: research`).
- The form grammar. The desk parses every form with it:
  - One form per file, `<form>.<language>.md`. The name before the language tag is the form
    slug. The slug never changes after a link was sent (why: a sent link names the slug ·
    2026-10-25).
  - Frontmatter: `kind: form`, `title`, `intro`, `language` (`en-GB`, `fr-BE` or `pt-PT`),
    and `folder`. `folder` is the client subfolder where the answers land.
  - Each `##` heading is one question, in the words the visitor reads. Under the heading is
    one list of `- key: value` lines: `key:`, `type:`, `options:`, `optional: yes`, `hint:`.
    The desk ignores prose outside the list.
  - `key:` is required on every question (why: the old grammar made the key from the heading.
    Three languages give three headings and three keys. The answers of one form must line up
    across languages · 2026-10-25).
  - `type:` is `text` (the default), `textarea`, `select` or `boolean`. `options:` is for
    `select` only, separated by ` | `. There is no conditional logic and no upload. A link to
    a recording is a `text` question.
  - The three language files of one form have the same keys in the same order. Their options
    are in the same order too (why: the desk maps an answer to a pool field by the option's
    position. The words change per language. The position does not · 2026-10-25).
  - No question and no option shows a price, a band or the floor (why: a form is a public
    page, and `core/services.md` keeps these numbers off every page · 2026-10-26).
- The pool rows live in the desk, never here. The monthly close reads commission from
  `record.md`, never from the pool.
- `leads/<slug>/`: a lead's folder, by the pool row's slug. A lead's answers to a form are
  documents, so they live here, not in the pool: `<form>-<date>.md`, written by the desk
  (`/start` writes `free-look-<date>.md`). The handoff moves the folder into `clients/<slug>/`
  (The handoff, above) (why: the row changes many times a day and the answers do not · 2026-10-25).
