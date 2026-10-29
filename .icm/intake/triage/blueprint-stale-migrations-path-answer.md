# Stub: No live repo keeps the answer `migrations_path` that the blueprint no longer asks

- lane: chore
- found-by: blueprint-environments research · 2026-10-29
- complexity: low
- priority: P2

## Problem

The blueprint removed the question `migrations_path` from `copier.yml` (blueprint #34). Berceo, vinecliff, remi-ai, messy-play and agorasim still have the answer in `.copier-answers.yml`. Messy-play's says `migrations`, a folder that is not there.

## Proposed change

The next conformance run removes the answer from each `.copier-answers.yml`.

## Acceptance criteria

- [ ] No `.copier-answers.yml` of a repo tagged `live` in `desk/mani.yaml` has `migrations_path`.
