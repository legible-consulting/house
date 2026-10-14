# LESSON 3.4: Computational Orchestration

*The Archive › Module 3: Ownership In the AI Age · Author: Jake Van Clief · Source: text lesson (essay with course guide)*

## Summary

Jake names a discipline he says senior engineers already practise: deciding which kind of computation fits each part of a problem. Deterministic code handles the fixed parts, language models handle the semantic parts, and humans make judgment calls. He backs it with a client pattern of 60 percent database queries, 30 percent rule-based logic and 10 percent AI calls, and argues that most failed "AI transformations" fail for lack of this thinking. The course guide stresses that 60/30/10 is illustrative, not a quota, and offers an exercise: split a workflow into steps and label each as rule, model or human.

## Core concepts

- **Orchestration is selection:** the skill is not prompting; it is knowing which computation to apply where, including when to use no AI.
- **Three allocations:** fixed rule, model interpretation, human decision.
- **60/30/10:** the shape of one successful build. The essay's own line is "The 10% makes the whole thing feel intelligent. The 90% makes it actually work."
- **Abstraction without abandonment:** AI adds a semantic layer; you still need to understand the layers below.
- **Judgment as the hard part:** the example is giving a startup a calendar integration instead of an AI scheduler.
- **Flow over features:** a simple pattern-match in the right place beats a powerful model in the wrong one.
- **Multiple computation types:** the essay lists deterministic, probabilistic, semantic, quantum and biological, and predicts the key question shifts from whether you can write the code to whether you can orchestrate it.

## Frameworks and methods

The argument:

1. Teams that actually ship AI spend much of their time keeping it out of places it does not belong.
2. Assign each step to code, model or person.
3. Default to cheap, debuggable methods and use the model only where meaning is required.
4. Keep the layers beneath in view rather than replacing them.
5. Prefer pipeline placement over component capability.
6. Expect new computation types to join the mix, so treat orchestration as a standing discipline.

Page exercise: map one workflow into five steps, label each as rule, model or human, name input, output and check, then check if a rule could replace any of the model steps and if any human judgment call has no review point.

## Claims and evidence

- 60/30/10 recurs in successful implementations, he says — one client anecdote — anecdote, and the guide says it is not a quota.
- Most AI transformations fail for lack of orchestration — assertion without data.
- The calendar-integration story — anecdote, unnamed client.

## Apply to icm-workshop

- **Workspace-builder walk (stage mapping):** adopt the rule / model / human label as a column when mapping each stage's steps. Deterministic steps become scripts or checks, model steps become the agent's work, human steps become gates. Home: stage-mapping questionnaire and each stage CONTEXT.md.
- **Gates are human; never build an orchestrator:** this essay's "orchestration" is a design habit about allocation, not a driver program. Keep it that way: the folder tree and contracts are the orchestration, and the three-way labelling decides what a stage contract asks of the model versus a person or a plain check.
- **D2 SDLC and C3 desk:** apply the exercise to the SDLC and the morning glance; reads and sweeps are mostly fixed rules, so only drafting and summarising need a model.
- **O1 / O4:** the essay is a ready concept-library entry and workshop exercise; rewrite in Jamie's own words and drop the 60/30/10 numbers unless measured.

## Open questions

- Can Jamie measure the real split across one of his own builds and record it, instead of borrowing Jake's figures?
