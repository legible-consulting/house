# PROMPT ENGINEERING Series 1 Overview

*THE LEGENDS › 2. Bas Rosario – Prompt Engineering · Author: Bas Rosario · Source: text lesson*

## Summary

Bas sets out the five-rung ladder that organises his whole classroom, then defends prompt engineering against the claim that it is obsolete. His position is that the first rung looks small only to people who have climbed higher, while most daily users never left it. The series deliberately refuses a universal prompt formula, arguing that the right prompt shape depends on the type of task. The learner leaves with a plan for three classes and a first homework: label the last five real asks by task kind.

## Core concepts

- **The ladder:** prompt (the instruction), context (everything the model can see when it reads it), memory (what survives between sessions), loop (the system checks its own work and repeats), graph (steps and dependencies, with parallel branches and explicit handoffs and stopping points).
- **Rung-skipping does not work:** each layer rests on the one below, so critics who say prompting is finished have simply moved up and stopped looking down.
- **No single formula:** a maths prompt, an image prompt, an extraction prompt and a sorting prompt each need different things, so a template is just a frozen shape for one kind of task.
- **Library versus classroom:** the Praxis Library catalogues techniques (Bas says 208); the classroom teaches how to choose among them, so there is no need to memorise the catalogue.
- **Higher rungs add design choices:** they do not remove the need to inspect results.

## Frameworks and methods

1. Class 1, the taxonomy: the kinds of task that exist and why each wants a different shape.
2. Class 2, routing: name the task type and pick its shape quickly.
3. Class 3, diagnosis and repair: tell structural, content and capability failures apart.
4. Payoff with a quick card, then a perspective piece.

## Tools, settings and resources

- **Praxis Library** (praxislibrary.com) — catalogue of techniques and frameworks — Bas is its author; the count of 208 is his own figure.

## Claims and evidence

- "Prompt engineering is dead" is true only for people working higher up the ladder — argued by reasoning, no data — an opinion.
- Most daily AI users never leave rung one — stated from observation — unverified anecdote.

## Apply to icm-workshop

- **Adopt** the ladder as vocabulary when explaining the rebuild to workshop attendees (O4): prompt maps to module instructions, context to the shared core and module Inputs (C1), memory to client folder records (C2), loop and graph to the pipeline stages. Keep it as teaching language only.
- **Reject** a global prompt formula for the modules, consistent with the repo-owns-its-pipeline stance: each module's contract should say what its artefact must contain, not inherit a universal template.
- The "last five asks" exercise is a cheap way to audit how Jamie actually uses the system before writing module contracts.

## Open questions

- Which of the five rungs does the memory series (series 3) actually deliver, given the overview says only prompt and context are fully published?
