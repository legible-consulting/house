# Class 1 of 3: Context window is designed space

*THE LEGENDS › 3. Bas Rosario – Context Engineering · Author: Bas Rosario · Source: text lesson*

## Summary

Bas reframes the context window as a budget to allocate rather than a bucket to fill. He gives six headings for auditing what is in a window, stresses that limits are finite and model-specific, and shows how an over-stuffed setup (style guide, old summaries, agenda) can distort a simple extraction. He finishes with three questions to ask of every line before it is admitted. The takeaway is selective inclusion verified against the full source, not minimalism for its own sake.

## Core concepts

- **Six areas of the window:** standing instructions, history, material, examples, the instruction itself, and the answer, which also occupies space. The list is an audit aid, not a complete account of tool internals.
- **Fresh does not mean empty:** a brand-new conversation can still arrive with project rules, stored memory or linked files already attached, while model training is not something sitting in the window. Check how your tool is set up.
- **Finite and tool-dependent:** limits are in tokens; what happens at the limit (rejection, trimming, summarising) varies, and the oldest lines are not guaranteed to go first. Fitting is necessary but not sufficient, since extra irrelevant material can make relevant facts harder to use.
- **Cost and latency are separate:** billing can distinguish input, cached input and output, and a context meter is not an invoice.
- **Distractors teach shape:** in the worked case, a style guide imposed its tone, old summaries imposed their format, and an agenda invited invented decisions.
- **Verification step:** smaller context only counts if the result is checked against the transcript and nothing real vanished.

## Frameworks and methods

Three questions per line: does this output need it (related is not enough), is it in its smallest useful form, and would I notice if it were missing. A line must pass all three. Exercise: copy your most-used setup, list its content under the six headings, mark unknowns, remove one item, compare against the full source.

## Tools, settings and resources

- **Provider documentation** (OpenAI context-window and prompt-caching guidance) — model-specific limits — cited by the lesson; check current versions yourself.
- **AskBas.com** — "Context windows, why the ceiling exists" — author's companion piece.

## Claims and evidence

- The over-stuffed window produces style-guide tone, borrowed shapes and invented decisions — constructed illustration, explicitly not a recorded comparison.

## Apply to icm-workshop

- **Adopt** the three-question test as the rule for what a module's Inputs section may list; it enforces "stay within declared Inputs" and keeps modules cold-start friendly. Only the artefact it needs is read, not the whole client folder (C2).
- **Adapt** the six headings as the audit of what a session actually receives when it opens a module: root CLAUDE.md as standing instructions, shared core files (C1) as material, the contract as the instruction.
- **Adopt** the principle that the full source stays available while excerpts are used: modules should point to the original, not paste copies, which keeps one home per fact.

## Open questions

- What does a Claude Code session actually load beyond the root map at start (settings, memory, hooks), so Jamie can mark the unknowns honestly?
