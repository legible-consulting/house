# Class 2 of 3: Routing, choosing the shape

*THE LEGENDS › 2. Bas Rosario – Prompt Engineering · Author: Bas Rosario · Source: text lesson*

## Summary

Knowing the eight task types is not the skill; naming the one in front of you in seconds is. Bas's central point is that the order in which you ask the identifying questions matters: the strictest types, where "almost right" is a failure, should claim a task before the softer ones. He walks three requests through the sequence, then covers mixed asks that should be split into two prompts reviewed in turn.

## Core concepts

- **Order of questions is the method:** you ask the questions top to bottom and stop at the first yes, so the first yes decides what good looks like.
- **Strict types first:** code that does not run and tables that break a downstream spreadsheet fail outright, whereas an almost-right poem or job post still works. So running code and machine-read output are tested before the looser types.
- **Modality check last, never skipped:** after naming the type, ask whether the input or output is non-text.
- **Mixed asks break routing:** a request like "study competitors and tell me what to do" is research followed by planning. Evidence and recommendations should not blur.
- **Split and sequence:** when two parts have different definitions of good, run two prompts, review the first output, and pass only the relevant part on, which also makes a weak handoff easy to locate.

## Frameworks and methods

1. Work through the type questions from most unforgiving to most forgiving, ending in the two soft types (words as product, surprise as product).
2. Stop at the first yes; then choose the shape the type requires.
3. Run the modality question.
4. If two yeses cannot share a definition of good, split into sequential prompts.

The worked examples (a job post, an invoice mismatch, a date-and-amount extraction) route to writing, math and structured output respectively.

## Tools, settings and resources

- **Praxis technique index, Technique Finder, patterns and selection guide** — destinations for choosing a named technique once the type is known.

## Claims and evidence

- Putting strict types first is the right priority — argued from consequences of failure, not measured — reasoning only.

## Apply to icm-workshop

- **Adopt** the principle directly as the design of module routing tables: a routing table in the folder map should be ordered so the most constrained job claims the request first, and a request that matches two modules should be split into two sequential stages with a human review between them (gates are human, never build an orchestrator).
- **Adapt** the split-and-pass-forward rule to the S2 to S5 sell chain: research produces a profile, a separate stage produces the proposal, and only the profile is declared as the Input.
- Keep the type list out of C1; it is a thinking aid, not a fact about the business.

## Open questions

- Would a routing order in Jamie's root map reduce mis-routed requests in practice, and is stopping at the first match safe when a request is genuinely mixed?
