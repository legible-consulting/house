---
status: built
holds:
  - "*.sh"
---
# Estate conformance — D4

D4 produces a report that every live repo matches its tier's template and carries only the Claude assets it uses, and that every dormant repo is archived, secret-free and named, so that the estate is in order and drift is known before it costs anything.

## Inputs

- `desk/mani.yaml` (generated from `clients/*/record.md`; hand-written until the generator exists).
- `legible-consulting/blueprint` tags (what "conformant" means per tier).

## Process

- Start cold from this folder. Read only what Inputs names.
- Conformant means: the default branch's `.copier-answers.yml` names the latest blueprint tag.
  A repo built before the blueprint has no answers file and is adopted: the PR adds only that
  file, from its client record, so no file of its own changes and later tags reach it by
  `copier update` (why: the live repos predate the blueprint; overwriting them to conform
  would be a rebuild, not a check · 2026-10-16).
- `desk/mani.yaml` tags each repo `live`, `dormant` or `proof`. A live or proof repo is
  checked against the blueprint tag. A dormant repo is checked for being archived and gets
  no PR (why: an archived repo changes no more, so a template update would only reopen it
  · 2026-10-19).
- Claude and agent assets (`.claude/`, `CLAUDE.md`, `AGENTS.md`, `.icm/`, `.opencode/` and
  the like) are listed in the report, not removed: whether one is still used is Jamie's call.
- From the local lane, Jamie's own `gh` login: `bash deliver/04-conformance/drift.sh` writes the
  report, then per drifted repo
  `GITHUB_TOKEN="$(gh auth token)" multi-gitter run "$PWD/deliver/04-conformance/conform.sh" -R k0d0minio/<repo> -B conformance/blueprint -m "chore: conform to the blueprint"`
  opens the PR. Opening a PR is remote, so the run is Jamie's hand; the merge is the gate.

## Outputs

- `desk/estate/drift-<date>.md`.
- One PR per drifted repo (`copier update` and the asset check via multi-gitter); the gate stays human.
- Runs from `.github/workflows/conformance.yml` for the live set and from the local lane (`~/Desktop/Apps/projects/`) for bulk work.
