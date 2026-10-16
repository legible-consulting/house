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
| understand why the system is shaped this way | `meta/` (the design trail; moves to `library` after Wave 1) |

Read the contract you are routed to, then only what its Inputs name. Do not read other
stages' folders.

## Boundaries (full list and whys in `meta/01-goals.md`)

- Without asking: read email, calendar and Drive; draft into the folder; commit words to
  `main`; create calendar events; place files in Drive.
- Never, even if asked in the moment: send anything to a client; merge or release; advance
  a stage or tick a gate; spend money or sign.
- Never in git: credentials and identity documents.
- Client-facing documents in the client's language; internal notes in English.

## House rules

- Gates are human checkboxes: read them, never tick them.
- Never build an orchestrator: the folders and contracts are the pipeline.
- One home per fact. A rule carries its own why and date; a rule without a why is deleted.
- CI is truth: never run build, lint, typecheck, test, format or dev locally. The hook in
  `.claude/hooks/` enforces it.
- One session, one repo. Kickoff (D1) is the named exception and attaches the new client
  repo as well.

## Sibling repos (same org; attached only when a contract names them)

- `legible-consulting/library` — read-only: Jake Van Clief's course, the ICM paper,
  the research ledger.
- `legible-consulting/blueprint` — public: the copier template per tier, conventions, the
  workshop kit.
- `legible-consulting/.github` — the org's front page and the reusable client CI workflows.
- `legible-consulting/<client-slug>` — one per build; the client folder's `repo:` field
  points at it.
