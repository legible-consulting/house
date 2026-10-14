# GRAPH ENGINEERING 🧩 Where this fits in ICM

*THE LEGENDS › 6. Bas Rosario - Graph Engineering · Author: Bas Rosario · Source: text lesson*

## Summary

Bas holds his graph rung up against the ICM paper (arXiv 2603.16021) and finds a deliberate difference. ICM gives the cut (one stage, one job), the order (folder numbering), the edge (one stage writes to its output folder and the next stage's contract names that file as input) and a human gate on every edge. It does not give parallel branches that meet: the paper calls ICM sequential by design, the words graph, edge and convergence appear in neither source, and parallelism exists only inside a stage through sub-agents. The convergence chair is therefore the practitioner's to design.

## Core concepts

- **Cut and order map to folders:** one stage, one job; sequencing equals numbering, so a fact sheet that must come first is simply folder 01.
- **The edge is a file path:** the handoff is an output file named as the next stage's input, with the rule that folders point outward, never back.
- **ICM is one lane:** stage N feeds N+1; no mechanism lets two stages run side by side and meet.
- **Parallelism only within a stage:** sub-agents for subtasks inside one stage, not across stages.
- **What is missing:** a folder for the cross-read list, difference-listing and rulings.

## Tools, settings and resources

- **ICM paper** — arXiv 2603.16021 — used by Bas to verify his quotations.

## Claims and evidence

- Graph, edge and convergence are absent from both the paper and conventions file — Bas says he searched — checkable, not verified here.

## Apply to icm-workshop

- **Consistent with "never build an orchestrator."** The paper's sequential-by-design stance is the same line Jamie's repos draw; this lesson is the clearest statement of why parallel merging sits outside the pipeline. Where the tension appears is Bas's own graph rung, so reject graph-style fan-out as pipeline architecture, adopt it only as human-run design inside a single stage (for example parallel research sub-agents in S2, with Jamie reading the results).
- **Related Foundation notes:** `01_the-foundation/03_automate-it-keep-your-judgment/01_stages-you-can-step-into.md` for gates on every edge, and `01_the-foundation/02_build-it-around-your-work/03_one-model-different-jobs.md` for stage-per-job.
- **Module-level handoffs (C2 and goals' "only handoff"):** the file-path edge is exactly how modules should hand artefacts on; declare Inputs, point outward only.
- **Workspace-builder walk:** at stage mapping, flag any stage that wants to run beside another; either sequence it or run it as sub-agents inside one stage.

## Open questions

- Does the repo's own convention allow sub-agent fan-out inside a stage, or does a stage contract need to say so explicitly?
