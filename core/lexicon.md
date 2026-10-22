# Lexicon — the words Legible Consulting uses

One home for our jargon. Everything we build is ICM, so no name carries `icm`. When a term
here and a word in another file disagree, this file wins and the other file is fixed
(why: one home per fact; a brand speaks one vocabulary · 2026-10-16).

## The repos

| Term | Is | Visibility |
|---|---|---|
| **house** | the operating repo: core, client folders, module contracts, desk. Where the business runs. | private, Jamie only; in the org, with no grant to any member |
| **blueprint** | the public method: the copier template, conventions, workshop kit. Every client build is rendered from it. | public |
| **library** | read-only reference: Jake Van Clief's course, the ICM paper, the goals the house is measured against and the audited tool verdicts (`research/design-trail/`). | private |
| **.github** | the org's front page and reusable CI. Name fixed by GitHub. | public |
| **client repo** | one per build, `k0d0minio/<slug>`, under Jamie's own account, rendered from the blueprint. | private; Jamie owns it |

The org `legible-consulting` holds the house, the blueprint, the library, `.github`, the proof
repo and the projects Jamie shares with collaborators. Every client build is Jamie's own, under
`k0d0minio` (why: the org is the method and the shared space; a collaborator who joins it must
never see a client's code · 2026-10-21).

Said aloud: "edit the core in the house", "render it from the blueprint", "that's library
material, not house".

## Modules

| Family | Codes |
|---|---|
| **C** core | C1 shared core · C2 client folder · C3 desk |
| **S** sell | S1 prospecting · S2 client research · S3 proposal · S4 quote · S5 agreement |
| **D** deliver | D1 onboarding and kickoff · D2 SDLC pipeline · D3 handover and support · D4 estate conformance |
| **O** operator | O1 tool and concept research · O2 case studies and portfolio · O3 content · O4 training and coaching |

## Other house words

- **client folder** — `clients/<slug>/` in the house; the deal is the folder. Its `record.md`
  carries the `stage`.
- **desk** — the morning glance, monthly close, estate audit and the dashboard.
- **estate** — every repo in the org; D4 checks it conforms to the blueprint.
- **local lane** — `~/Desktop/Apps/projects/` clones on Jamie's machine for bulk estate work.
- **gate** — a human checkbox. In a client repo, the two at the top of a pull request body,
  **Spec approved** and **Ready to merge**, each anchored by an HTML comment
  (`<!-- gate:spec-approved -->`, `<!-- gate:ready-to-merge -->`) so the desk reads them. A
  session reads a gate and never ticks it. Jamie ticks on GitHub or from the desk.
- **wave** — a build phase of the system itself. What is open in it, and what Jamie decides,
  lives in `core/wave.md`.
- **kind** — the shape of an engagement in `record.md`: `build`, `retainer` or `role`.
  Defined in `clients/CONTEXT.md`.
- **pool** — the leads a salesman works in the desk before Jamie takes one. Its statuses are
  defined in `clients/CONTEXT.md` and live in the desk, never in a record.
- **intake** — `.icm/intake/` in every client repo: the tickets, one folder per epic
  with a `breakdown.md` and one stub per unit of work, `triage/` for one-offs. A ticket's
  folder is its status; `_done/` is done. There is no `BUILD.md` and no ticket list in the
  house (why: one home for tickets, the repo where the work is · 2026-10-21).
- **holds** — the globs in a contract's frontmatter that name the files its folder may carry:
  its outputs and its own tools. `check.yml` fails on a file no contract holds.
- **status** — a contract's frontmatter says `stub` (no Process yet) or `built`.
- **legible** — the cloud environment every session runs in.
