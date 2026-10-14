# 🖋️ Don't Let Being New Stop You

*THE LEGENDS › Don Roy – Master Builder · Author: Don Roy · Source: text lesson (resource: "Diana Agency Assistant")*

## Summary

Don tells how, a few weeks into learning, he entered a weekly build competition by building an assistant for a real-estate agency. His method was simple: tell the model honestly you do not know what you are doing, argue about what the deliverable should be, pick the genuinely hard part (the messy handoff between agents, since real home sales are untidy), capture a plan in one markdown file, and have a fresh session build from it. The slow part came after: reading every file and fixing gaps by describing them to the model. He claims readers can get most of the way by repeating the sequence.

## Core concepts

- **Argue the deliverable first:** the most valuable stage was challenging the model's reading of the brief, not building.
- **Pick the real problem:** he focused on the awkward middle handoff rather than surface features.
- **Plan file as handoff:** one markdown plan carried all context into a clean session, which then generated the folders and identity files as a fast first draft.
- **Build, read, patch, repeat:** reading every line and hunting gaps where a messy human would break the flow is what made the draft shippable; fixes were described to the model, then checked.
- **Minimal tooling:** just a simple three-step prompt structure and patience.

## Frameworks and methods

His "your turn" sequence: copy the brief into a project; argue until the deliverable is clear; find the messy problem worth solving; write the plan in one file; let a fresh session build; read every line and patch gaps. A page addendum adds: trace one awkward case through the files before calling a draft done.

## Claims and evidence

- Following the sequence lands within about 90% of his result — anecdote, no measurement.
- The result "could ship to a customer" after a few weeks — self-assessment, not independently reviewed.

## Apply to icm-workshop

- **Workspace-builder walk:** this is a compact version of discovery, stage mapping, scaffolding and validation. The plan file maps to the stage-mapping output; the read-every-file pass maps to validation, which stays a human step (gates are human).
- **O4 workshop kit:** a good low-intimidation case study for attendees with no coding background.
- **Boundary:** "let it rip" generation is fine for a first scaffold, but Jamie's rule is that CI is the verdict, so the read pass should be a review of the diff and CI results, not local test runs.

## Open questions

- What awkward-case trace would reveal gaps in a client's scaffolded workspace before handover (D3)?
