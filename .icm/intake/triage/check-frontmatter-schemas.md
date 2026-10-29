# Stub: CI fails a record, an economics file, a form, a kit or a verdict whose frontmatter breaks its shape

- lane: chore
- found-by: the review of the research library against the house · 2026-10-29
- complexity: medium
- priority: P1

## Problem

The desk, the glance and the close read frontmatter. `check.yml`'s `frontmatter` job checks only that the YAML parses. A `stage` outside the nine values of `clients/CONTEXT.md`, a `kind` typo, a `deadline` that is not a date, a `verdict` outside `adopt | watch | decline`, or an `economics.yaml` with no price all pass today and render wrong on the desk. `research/verdicts/check-jsonschema.md` (adopt, 2026-10-14) names the tool. Nothing calls it.

## Proposed change

One JSON schema per frontmatter kind, in `.github/schemas/`: `record`, `economics`, `form`, `kit`, `verdict`, `concept`, `glance`, `close`, `estate`. `check.yml`'s `frontmatter` job extracts each file's frontmatter with `yq` and validates it with `check-jsonschema`. The schema's enums come from the contract that owns the values, and the contract names the schema file. One pull request on the house.

## Acceptance criteria

- [ ] `.github/schemas/<kind>.schema.json` exists for each kind above. Each enum repeats the values of the contract that owns them, and the contract's Outputs name the schema file (why: one home for the values, and the schema is its reader).
- [ ] `check.yml` fails a `record.md` whose `stage`, `kind` or `public` is outside its enum, whose `deadline` is not `YYYY-MM-DD`, or whose `repo` is not `owner/name`.
- [ ] `check.yml` fails an `economics.yaml` with no price, and a verdict with no `verdict`, `tier`, `recheck` or `date`.
- [ ] `clients/_template/record.md` is skipped, as today.
- [ ] The job names the file and the failing field in one `::error` line.
- [ ] `core/stack.md` gains the `check-jsonschema` row: CI only, pinned.

## Out of scope

- The body of a file. The schema reads frontmatter only.
- A schema for `CONTEXT.md` frontmatter. The `contracts` and `placement` jobs read it already.
