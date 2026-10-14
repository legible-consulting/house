# The Golden Rules

*David's Corner › Must Have Resources · Author: David's Corner (author not stated; "contributor notes") · Source: text lesson*

## Summary

Seven principles for applying ICM, presented as an approach to adapt rather than a fixed spec: layer context, give each stage one job, write stage contracts, configure the factory instead of the product, add human review gates, keep global files lean and stage files precise, and iterate the structure itself. The page includes hedges that the original token ranges are illustrative and that numbered folders do not execute anything; a person, agent or runner still has to follow the order. It closes with a two-stage exercise (draft, review) that records the current stage and next action in a file.

## Core concepts

- **Inputs named per stage:** a contract lists exactly which files and sections a stage reads, starting small and loading more only when a dependency is missing.
- **One stage, one job:** narrow stages make handoffs reviewable and reusable; small tasks may need fewer stages.
- **Factory versus product:** durable material (voice, design, domain knowledge, templates) lives in reference folders; run-specific material stays in the run.
- **Gates scale with consequence:** review where an error would contaminate later work.
- **Lean global, precise local:** project-wide rules in one place, stage detail with the stage, links over copies.
- **Structure is editable:** if folders or stages change, fix dependent paths and compare quality, context loaded and review effort.

## Frameworks and methods

The page refers to a five-layer context hierarchy (identity at the top, run material at the bottom) shown as an image; only Layers 3 (reference) and 4 (run-specific) are named in text. Stage contracts cover purpose, inputs, work, output and a completion check.

## Claims and evidence

- Token savings from staged loading — asserted as task-dependent; the page itself says to measure — unverified.

## Apply to icm-workshop

- Adopt (already aligned): stage CONTEXT.md contracts with explicit Inputs, matching "every module starts cold" and "one home per fact". Use as a checklist for D4 conformance of module folders.
- Adapt rule 5: the goals file makes gates human checkboxes that sessions never tick; stricter than the page's "review before continuing".
- Reject any impression that numbered folders orchestrate: "never build an orchestrator" holds, and the page agrees on that point.

## Open questions

- Which five layers exactly does Jake's canonical model name, and do they match the ICM paper used as Layer 3 for the rebuild?
