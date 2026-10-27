# Stub: The blueprint is tagged v1.0.0 and the live repos can take it

- feature-slug: tag-v1
- epic: blueprint-pipeline
- sequence: 13 of 13
- depends-on: house-alignment
- complexity: low
- priority: P1

## Problem

The twelve units land as pull requests on three repos. Until a tag exists, `copier update` has nothing to compare, and conformance reports every live repo as current at `v0.9.0`.

## Proposed change

One tag, `v1.0.0`, on the blueprint's `main`, after every unit merged and `check.yml` is green with the `update` job. Then conformance takes over.

## Acceptance criteria

- [ ] Units 1 to 12 are merged. `check.yml` on `main` is green, the `update` and `ste` jobs included.
- [ ] `git tag -a v1.0.0 -m "The ticket pipeline: lanes, the router, the board, the gated merge, the two-database UAT"` on the merge commit of the last unit, pushed. `copier copy gh:legible-consulting/blueprint /tmp/zz --defaults -d slug=zz -d client_name=Zz` from a clean folder reports `_commit: v1.0.0`.
- [ ] `README.md § Jamie's hand` in the house: the line about `copier update` on the four live repos names `v1.0.0` and the hand-given answers (`--data`, never `--defaults`, for a repo on `v0.6.0`).
- [ ] One triage stub in the house for conformance: the retire list (`.icm/CONTEXT.md`, `.icm/project.md`, `release.yaml`, `quality.yaml`, `.opencode/`, `opencode.jsonc`) and the hand-written `CLAUDE.md` rows each live repo needs. `found-by: blueprint-pipeline · <date>`.

## Out of scope

- The conformance pull requests: `conformance/CONTEXT.md`.

## Notes

The tag is a push to the blueprint's `main`, so `confirm-git-writes.sh` asks. Jamie answers in the session. Read `conformance/CONTEXT.md` before the triage stub, so its words match.

## Prompt

Repo legible-consulting/blueprint, desktop. Attach legible-consulting/house. Read CLAUDE.md in the blueprint, then .icm/intake/blueprint-pipeline/breakdown.md in the house, then this ticket, .icm/intake/blueprint-pipeline/tag-v1.md. Check that every other stub of the epic is in _done/ and check.yml is green on main. Tag v1.0.0 as the ticket says. Then, in the house, one pull request: the Jamie's hand line, the conformance triage stub, this stub into _done/, and close-out.sh for the epic. Do not merge. Your last message names the tag and the pull request.
