# house — Legible Consulting's operating repo

Legible Consulting is Jamie Nisbet's AI consultancy in Mafra, Portugal: sites, apps and
platforms built for clients, and ICM workshops and coaching. This repo is where the business
runs. It follows the Interpretable Context Methodology: the folder tree is the orchestration,
every stage folder carries a `CONTEXT.md` contract, and this file only says who we are and
where to go. Our words (house, blueprint, library, tiers, module codes) are defined once in
`core/lexicon.md`.

## Routing

| You are asked to | Go to |
|---|---|
| change a fact about the business (identity, services, pricing, voice, terms, stack) | `core/CONTEXT.md` |
| open, read or update a client relationship | `clients/CONTEXT.md` |
| prospect, research a client, write a proposal, quote or agreement | `sell/CONTEXT.md` |
| kick off, build, hand over, or check the estate | `deliver/CONTEXT.md` |
| research a tool, write a case study, publish content, run training | `operator/CONTEXT.md` |
| the morning glance, Friday review, monthly close, estate audit, the dashboard | `desk/CONTEXT.md` |

Read the contract you are routed to, then only what its Inputs name. Do not read other
stages' folders.

## Boundaries

Jamie's automation boundary (goal interview R7 · 2026-10-14); each line carries its why.

- Without asking: read email, calendar and Drive; draft into the folder; commit words to
  `main`; create calendar events; place files in Drive (why: all of it stays inside the
  business and is undone by a revert or a delete).
- Never, even if asked in the moment: send anything to a client; merge or release; advance
  a stage or tick a gate; spend money or sign (why: each one reaches a client, the estate or
  money and cannot be taken back; the human is the gate).
- Unattended runs only: the estate drift check, the deadline and next-action sweep, the
  research recheck; each writes lines for the morning glance (why: deterministic reads with
  nothing to send; anything that acts waits for Jamie).
- Never in git: credentials and identity documents. Client words, negotiation positions and
  contact details may live here (why: this repo is private; a secret in git outlives every
  rotation).
- Every module runs from anywhere and starts cold from its own folder (why: Jamie works from
  the phone as much as the desk; a module that needs memory breaks in a fresh session).
- Client-facing documents in the client's language; internal notes in English (why: the
  client reads their own language; one internal language keeps notes searchable).

## House rules

- Gates are human checkboxes: read them, never tick them (why: a gate is where Jamie's
  judgement enters; one ticked unread is no gate · 2026-10-14).
- Never build an orchestrator: the folders and contracts are the pipeline (why: a script
  that drives the stages hides the contracts it replaces · 2026-10-14).
- One home per fact. A rule carries its own why and date; a rule without a why is deleted
  (why: two homes drift; a rule nobody can explain is never safely changed · 2026-10-14).
- CI is truth: never run build, lint, typecheck, test, format or dev locally. The hook in
  `.claude/hooks/` enforces it (why: one verdict, recorded where the code was pushed · 2026-10-14).
- One session, one repo. Kickoff (D1) is the named exception and attaches the new client
  repo as well (why: a cloud session loads a repo's hooks and permissions only when one
  repo is attached · 2026-10-15).
- A file enters this repo only where a contract holds it: the `holds:` globs in the
  contract's frontmatter. `check.yml` fails on any other file. What a session makes for the
  moment stays in the scratchpad or an artifact and is linked, not committed. A stored
  report carries a date, and the report it replaces is deleted (why: a repo that holds only
  what its contracts name is one a stranger can audit from the contracts alone ·
  2026-10-19).

## Sibling repos (same org; attached only when a contract names them)

- `legible-consulting/library` — read-only: Jake Van Clief's course, the ICM paper,
  the research ledger, the design trail (why the system is shaped this way).
- `legible-consulting/blueprint` — public: the copier template per tier, conventions, the
  workshop kit.
- `legible-consulting/.github` — the org's front page and the reusable client CI workflows.
- `legible-consulting/<client-slug>` — one per build; the client folder's `repo:` field
  points at it.
