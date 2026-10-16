# Estate conformance — D4

D4 produces a report that every live repo matches its tier's template and carries only the Claude assets it uses, and that every dormant repo is archived, secret-free and named, so that the estate is in order and drift is known before it costs anything.

## Inputs

- `desk/mani.yaml` (generated from `clients/*/record.md`; hand-written until the generator exists).
- `legible-consulting/blueprint` tags (what "conformant" means per tier).

## Process

- Defined when the module is built (Wave 1 for C1, C2, D2, D4; later waves for the rest).
- Start cold from this folder. Read only what Inputs names.

## Outputs

- `desk/estate/drift-<date>.md`.
- One PR per drifted repo (`copier update` and the asset check via multi-gitter); the gate stays human.
- Runs from `.github/workflows/conformance.yml` for the live set and from the local lane (`~/Desktop/Apps/projects/`) for bulk work.
