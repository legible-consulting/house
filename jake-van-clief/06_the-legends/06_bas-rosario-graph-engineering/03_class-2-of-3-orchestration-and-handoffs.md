# Class 2 of 3 : Orchestration and handoffs. 📚

*THE LEGENDS › 6. Bas Rosario - Graph Engineering · Author: Bas Rosario · Source: text lesson*

## Summary

Class 2 is about what travels along each edge of a graph. Bas likens a good handoff to a leave-cover handover page: what you take over and in what state, what you owe back and in what form, what you may assume. That page is a contract, and contracts let branches be built, run and judged separately. He contrasts a generous orchestration (full chat history, sibling drafts shared mid-flight) that quietly corrupts state with a tight one where each branch gets only an approved shared artifact and its own brief, and returns only its deliverable and a list of missing facts.

## Core concepts

- **Contract per edge:** receives, returns, may assume. It serves as the unit of trust for one worker and the unit of orchestration for many.
- **Edges first, boxes second:** define what crosses each arrow before building the node.
- **Generosity corrupts:** forwarding chat history brings superseded decisions along; sharing drafts sideways propagates mistakes and makes version provenance unknowable.
- **Missing-facts list as signal:** a branch reporting facts it needed but did not have is not failing; it shows where decomposition missed an arrow.
- **Swappable workers:** if the contract holds, who or what does the job can change.

## Frameworks and methods

Five edge rules: write the edge line before the box; pass artifacts, not conversation history; status (draft, approved, superseded, approved by whom) travels with the artifact; the return includes deliverable plus missing-facts list; changes go up through the top gate and affected branches rerun, never patched sideways. Test: could a fresh worker, given only what crosses the edge, do the job without asking anything?

## Claims and evidence

- The contract in ICM terms is the stage contract — author's own mapping; see the "fits in ICM" lesson for his checks against the paper.

## Apply to icm-workshop

- **Strong match to the module-handoff boundary.** The goals say a module's artefact is the only handoff and a downstream module declares it as an Input and nothing else. That is Bas's "artifacts cross, history does not". Adopt his status-rides-with-artifact rule: every produced artefact (profile, proposal, quote) should carry draft/approved status and date so the next module does not treat a maybe as fact.
- **Every module starts cold:** the "fresh worker" test is the same acceptance test. Run it on each module's Inputs list when scaffolding.
- **Adapt "changes go through the top"** into C2: when a client fact changes, it changes in the client folder once and downstream artefacts are regenerated, not hand-edited.
- **Orchestrator boundary:** the contracts are plain files; nothing here requires code to move artefacts. Reject any reading where an agent forwards or routes work between modules.
- Related: `01_the-foundation/03_automate-it-keep-your-judgment/01_stages-you-can-step-into.md`.

## Open questions

- How should "approved by whom" be recorded where gates are human checkboxes: in the artefact header or only in the gate file?
