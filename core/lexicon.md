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

The org `legible-consulting` holds the house, the blueprint, the library, `.github` and the
projects Jamie shares with collaborators. Every client build is Jamie's own, under
`k0d0minio` (why: the org is the method and the shared space; a collaborator who joins it must
never see a client's code · 2026-10-21).

Said aloud: "edit the core in the house", "render it from the blueprint", "that's library
material, not house".

## The folders of the house

One level, every name a word. The numbered folders are the stages a deal walks, in order; the rest have no order between them (why: a number promises a sequence, and a code names nothing a reader can say aloud · 2026-10-25).

| Folder | Holds |
|---|---|
| `core/` | the business's facts: identity, services, voice, terms, stack, this lexicon |
| `clients/` | one folder per relationship, from the first touch to after the handover |
| `desk/` | the dashboard and its app, the glance, the close, the estate reports |
| `01-prospecting/` | the target profile, the pitches, the cadence, the seller kit |
| `02-client-research/` | the prospect profile and the industry primer, before the first call |
| `03-proposal/` | the client-facing offer |
| `04-quote/` | the price, the options and the engagement's economics |
| `05-agreement/` | the signable agreement, one template per language |
| `06-kickoff/` | the kickoff form, the templates of the access table and the kickoff note, and the procedure that renders the client repo and cuts its first epic |
| `07-build/` | the build from ticket to release, on the client repo |
| `conformance/` | every live repo against the blueprint, on a schedule |
| `training/` | the workshop and coaching procedure, the template of the coaching record. The kit is in the blueprint |
| `research/` | the verdicts on tools and the concept library |
| `.icm/intake/` | the house's own tickets: a module not built yet, a change to the desk |

The stage numbers are final, in deal order. The gap 08 (handover) is a stage not built yet, with a ticket in `.icm/intake/house-modules/` (why: one renumber beats one renumber per new stage, and a gap keeps the place of a stage in the sequence a deal walks · 2026-10-26).

A module the business needs and the house does not have yet (handover, the portfolio, content) is a ticket in `.icm/intake/`, not an empty folder (why: the tree shows what exists; a folder with a stub contract promised work and held none · 2026-10-25).

## Other house words

- **client folder** — `clients/<slug>/` in the house; the deal is the folder. Its `record.md`
  carries the `stage`.
- **desk** — the morning glance, monthly close, estate audit and the dashboard.
- **estate** — every repo in the org; conformance checks it conforms to the blueprint.
- **form** — a questionnaire as markdown, `<stage>/forms/<form>.<language>.md`, one file per
  language, for a public page of the desk. The answers land in the house as markdown. The
  grammar is in `01-prospecting/CONTEXT.md` Outputs.
- **sent link** — a form Jamie sends to one lead or client: a row of the desk's Neon table
  `links`, made from the Send a form card on a client page or a pool row. The row's id is the
  token in `https://desk.jamienisbet.com/f/<id>`, and the row keeps the questions as they were
  when it was sent (`desk/CONTEXT.md`).
- **local lane** — `~/Desktop/legible-consulting/projects/<slug>/` clones on Jamie's machine
  for bulk estate work (from 2026-10-22; `~/Desktop/Apps/projects/` until every clone moves,
  `core/stack.md` Layout).
- **gate** — a human checkbox. In a client repo, the two at the top of a pull request body,
  **Spec approved** and **Ready to merge**, each anchored by an HTML comment
  (`<!-- gate:spec-approved -->`, `<!-- gate:ready-to-merge -->`) so the desk reads them. A
  session reads a gate and never ticks it. Jamie ticks on GitHub or from the desk.
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
