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
- `stage` says what is true about the relationship today. A session may draft the artefact
  that ends a stage. Only Jamie moves `stage`, by a commit to `record.md` (boundary: never
  advance a stage).

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
- The desk's pool, before handoff, has its own statuses: `new` → `contacted` → `replied` →
  `meeting` → `ready for Jamie` → `handed off` or `lost`. A salesman moves them. They are
  defined here once and live in the desk, never in a record.

## Outputs

- `<slug>/record.md`: frontmatter `stage` (the table above), `kind`, `repo`, `owner`,
  `vercel_project` (a list of `<vercel-team>/<project>`), `salesman`, `collaborators`,
  commission fields; from the agreement on, `agreement_drive` (the Drive link of the rendered
  agreement, then of the signed copy) and `agreement_signed` (`true` once both sides signed)
  (`05-agreement/CONTEXT.md`).
- `<slug>/research/` · `proposal/` · `quote/` · `agreement/` · `kickoff/` · `training/` ·
  `handover/`: one subfolder per module that has produced for this client.
- `<slug>/training/record.md`, the coaching record, with `plan.md` and `attendance.md` for a
  `kind: training` engagement (`training/CONTEXT.md`).
- `<slug>/quote/economics.yaml`, the quote's file: the price and the estimates the monthly close
  reads (the shape: `04-quote/CONTEXT.md`) (why: invoices and payments are handled
  outside the house · 2026-10-22).
- The deal is the folder. The folder points (`repo:`), the client repo holds. Nothing is
  submoduled or vendored (why: a cloud session reaches only the repo it attached · 2026-10-15).
