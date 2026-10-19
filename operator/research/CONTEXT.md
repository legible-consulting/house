# Tool and concept research — O1

O1 produces a dated verdict per tool (adopt · watch · decline, with a recheck date), a "could build for a client" catalogue tied to the services list, industry primers, and a concept library of reusable explainers, so that Jamie decides on a tool once, offers gain new ideas, and proposals and training reuse the same explanations.

## Inputs

- `core/services.md`.
- `legible-consulting/library` (attached as a second repo for this module only): the course, the paper, the raw ledger.
- The web, captured as text with trafilatura and a monolith snapshot beside it.

## Process

- Defined when the module is built (Wave 1 for C1, C2, D2, D4; later waves for the rest).
- Start cold from this folder. Read only what Inputs names.

## Outputs

- `verdicts/<tool>.md` (frontmatter `verdict`, `recheck`) · `catalogue.md` · `primers/<trade>.md` · `concepts/<concept>.md`.
- Verdicts audited on 2026-10-14 are seeded from `library`'s `research/design-trail/02-tool-research.md` when this module is built.
- `research-recheck.yml` lists verdicts whose `recheck` has passed as glance lines.
