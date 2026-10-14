# Class 3 of 3: Diagnosis and repair

*THE LEGENDS › 2. Bas Rosario – Prompt Engineering · Author: Bas Rosario · Source: text lesson*

## Summary

When a well-routed prompt still gives a wrong answer, Bas proposes inspecting three layers in a fixed order: structure, content, capability. He is careful to call the order a practical inspection sequence rather than a measured ranking of failure causes. Using one extraction task that fails three different ways, he shows that rewording fixed none of them. The lesson ends on disciplined iteration: change one thing per run, keep the previous version, and stop when the output meets the definition of good you set at routing time.

## Core concepts

- **Structure failure:** the output is the wrong kind of thing. Re-route the task and check that the type's required element is actually written in the prompt. Fix the shape before touching wording.
- **Content failure:** right kind of output, wrong specifics. Read the prompt as a stranger with only what is on the page and fix ambiguous items one at a time.
- **Capability failure:** shape and content seem right but the result stays wrong. Shrink the task, check access, tools and permissions, and move the job elsewhere, for example let a spreadsheet do arithmetic rather than the model.
- **Hypothesis, not verdict:** a diagnosis counts only once changing that thing improves the result. The sequence is described as illustrative, not a benchmark or a freshly run test.
- **Superstition versus diagnosis:** stacking pleasantries, expert-role claims or urgency phrases is not diagnosis; some are legitimate techniques but only after structure is checked.
- **Stopping rule:** stop when the output meets the standard you named upfront, not when it merely looks fine.

## Frameworks and methods

1. Check structure, then content, then capability, in that order.
2. Iterate with one change per run, keep the prior version, and log one line on what changed and what moved.
3. Finish against the written definition of good.

## Tools, settings and resources

- **Praxis Prompt Analyzer, Preflight Checklist, Hallucination Spotter** — repair aids on the author's library site.

## Claims and evidence

- Rewording rarely fixes structural or capability faults — shown by the three-run example — constructed illustration, not an experiment.

## Apply to icm-workshop

- **Adopt** the three-layer check as the standard way to debug a misbehaving module: first the contract's shape, then the Inputs it was handed, then whether the task suits a model at all. It belongs in a short "if output is wrong" note in each module folder, not in C1.
- **Adopt** "one change per run, log one line" for tuning module contracts, consistent with CI as the source of truth: record the change and its observed effect rather than relying on memory.
- **Adapt** the capability rule for S4 Quote: totals and economics should be computed by code or a sheet, with the model only drafting rows.

## Open questions

- Where should the iteration log live so it stays with the module without duplicating contract text?
