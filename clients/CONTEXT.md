---
status: built
holds:
  - _template/record.md
  - "*/record.md"
  - "*/research/*.md"
  - "*/outreach/*.md"
  - "*/proposal/*.md"
  - "*/quote/*.md"
  - "*/quote/economics.yaml"
  - "*/agreement/*.md"
  - "*/kickoff/*.md"
  - "*/training/*.md"
  - "*/handover/*.md"
  - "*/case/*.md"
---
# Clients

The client folder produces one folder per relationship, opened when Jamie takes the lead and kept through after-handover, holding the relationship's facts and every module's artefact for it, so that Jamie, a salesman or the client can see in one look where it stands, what is next, and who is waiting.

## Inputs

- `_template/record.md` for a new folder.
- A module's produced artefact, written by that module into `<slug>/<stage>/`.

## Process

- Start cold from this folder. Read only what Inputs names.
- A folder opens at `prospect` when Jamie takes the lead. That is his own contact, or a
  salesman's handoff from the desk's pool that Jamie merged. Before that, a lead lives in the
  desk's pool, not here (why: the pool changes many times a day and the folder is the record
  · 2026-10-19).
- `stage` says what is true about the relationship today. A session moves `stage` when the
  artefact that ends the current stage exists (the right column of the table below):
  - The session that writes the artefact moves `stage` in the same pull request, so that the
    merge makes both true. A session that finds the artefact on `main`, or in the mail for
    the client's yes, moves `stage` by a commit to `main`.
  - The commit message names the artefact, for example `vinecliff: stage build, the go-live
    epic merged (vinecliff#33)`.
  - One row at a time. A session never skips a row and never moves `stage` back.
  - `lost` is Jamie's call. A session never moves a folder to `lost`.
  (why: the folder already proves the stage, and a stage that waits for Jamie's hand goes
  stale · Jamie, 2026-10-26).

| Stage | True at this stage | The artefact that ends it |
|---|---|---|
| `prospect` | We know who they are. No artefact exists. | Jamie decides to research. `research/` opens. |
| `research` | We learn their trade. `research/profile.md` or `primer.md` exists. | `research/profile.md` is complete. |
| `proposal` | The proposal is written or sent. Its last section is the price, rendered from the quote's `quote/quote.md` (why: a client says yes to one document, so there is no quote stage · 2026-10-22). | The client says yes to `proposal/proposal.md`, price included, by email. |
| `agreement` | The proposal is accepted. The agreement is not signed. | The signed copy's Drive link is in `record.md`. |
| `kickoff` | The agreement is signed. `repo:` is empty. | `repo:` is set in `record.md`. For `kind: training`, the week is delivered. |
| `build` | `repo:` is set. The work is in the client repo. | The last release is merged. Only for `kind: build`. |
| `handover` | The last release is merged. The pack is not sent. | `handover/pack.md` is sent. |
| `after` | The pack is sent, or for `kind: training` the materials and the attestations are sent. The folder stays. | None. |
| `lost` | The client said no, or went silent past the cadence. The reason is in the body. | None. |

- `kind` says the shape of the engagement. It does not change with `stage`:
  - `build`: a build with an end. It reaches `handover`.
  - `retainer`: Jamie is paid monthly for ongoing work. It stays at `build`. No handover
    pack, no retainer offer. The monthly close reads it as retainer income.
  - `role`: Jamie holds a position in the client's company and owns part of the product. It
    stays at `build`. No handover.
  - `training`: a workshop, a coaching block, or both, at a fixed price with an end and no
    repo. It goes from `kickoff` to `after` when the week is delivered and the materials and
    the attestations are sent. `build` and `handover` do not apply (why: the first training
    week, Euro Register, fits none of the other three · 2026-10-22).
  - Empty until the shape is known (why: a prospect can become any of the four ·
    2026-10-19).
- `public` says what the client allows in public about the work. It does not change with
  `stage`:

  | Value | The client allows |
  |---|---|
  | `named` | The name, the logo and a link to the site. |
  | `anonymous` | The trade only. No name, no logo, no link. |
  | `none` | No case. |

  - Empty reads as `none`.
  - Jamie decides it from the client's word. The email stays in the mail, outside git. Jamie
    sets it by a commit, or a session sets it on Jamie's word in the session (`CLAUDE.md`,
    Boundaries). A session never sets it on its own reading of a mail (why: a case that names
    a client without their word costs the reference · 2026-10-26).
  - The portfolio reads it (`portfolio/CONTEXT.md`). Handover's review request asks the
    client for it (`08-handover/CONTEXT.md`, step 10).
- The desk's pool, before handoff, has its own statuses: `new` → `contacted` → `replied` →
  `meeting` → `ready for Jamie` → `handed off` or `lost`. A salesman moves them. They are
  defined here once and live in the desk, never in a record.

## Outputs

- `<slug>/record.md`: frontmatter `stage` (the table above), `kind`, `public`, `repo`, `owner`,
  `vercel_project` (a list of `<vercel-team>/<project>`), `salesman`, `collaborators`,
  commission fields; `drive_folder`, the client's folder under `Clients/` in Google Drive, set
  only when it is not the slug (MotoArk's is `moto-ark`; why: the Drive folders were named
  before the house and Jamie keeps them · 2026-10-27); from the agreement on, `agreement_drive` (the Drive link of the rendered
  agreement, then of the signed copy) and `agreement_signed` (`true` once both sides signed)
  (`05-agreement/CONTEXT.md`).
- `next_action` and `deadline` in `record.md`: the one thing Jamie does next for or with the
  client, and the date he does it by. A send, a call, a walkthrough, a progress report, or the
  date the client tests on UAT. Work in the client repo is never a next action: its tickets live
  in the repo's `.icm/intake/` and show on the desk's Work board (why: the desk's home is what
  Jamie does today, and a card that names a build never closes · Jamie, 2026-10-27).
- `<slug>/research/` · `proposal/` · `quote/` · `agreement/` · `kickoff/` · `training/` ·
  `handover/` · `case/`: one subfolder per module that has produced for this client.
- `<slug>/case/case.md`, the case study, one per client, in English, for the site
  (`portfolio/CONTEXT.md`).
- `<slug>/training/record.md`, the coaching record, with `plan.md` and `attendance.md` for a
  `kind: training` engagement (`training/CONTEXT.md`).
- `<slug>/quote/economics.yaml`, the quote's file: the price and the estimates the monthly close
  reads (the shape: `04-quote/CONTEXT.md`) (why: invoices and payments are handled
  outside the house · 2026-10-22).
- The deal is the folder. The folder points (`repo:`), the client repo holds. Nothing is
  submoduled or vendored (why: a cloud session reaches only the repo it attached · 2026-10-15).
