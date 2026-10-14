# Building Agents With Cognitive Functions

*David's Corner › Brooke Hays: The Lens Series · Author: Brooke Hays (with Curtis Hays and Tom Nixon on the call) · Source: Skool linked video, live "watering hole" session (the Bullhorns & Bullseyes crew), with companion text · Length: about 1:00:50 · Link: https://www.youtube.com/watch?v=st7Q1Q8yc5I*

## Summary

In a relaxed live conversation, Brooke explains cognitive functions to two adult hosts who know workplace assessments, then shows an experiment applying them to AI agents. Two ChatGPT projects get identical instructions and prompt, differing only in the two functions they are told to use, and they return strikingly different analyses of the same business data. Curtis then shows how he uses short function codes in his agent folder, loaded by an orchestrator, to give each specialist a distinct way of processing information. The companion text lays out strengths and use cases per function. The consistent caveat is that functions steer reasoning style; they do not give an agent a personality.

## Core concepts

- **Typing an agent is choosing a reasoning strategy:** pick the strengths and tradeoffs you want for the task, not a character.
- **Shorthand over prose:** because the definitions of the functions are written down once, an agent only needs its top two functions named, and the instructions expand from that.
- **Function pairs make a team:** one function gathers or generates, another evaluates, so combine two, for example a collector with a values check or a brainstormer with a logic check.
- **Matching function to job:** broadly, fact-gathering suits research and review mining; consistency suits documentation and QA; possibility-generation suits ideation; pattern synthesis suits strategy and root cause; efficiency suits operations; precision suits debugging; audience awareness suits copy and support; values alignment suits brand voice. These are the author's suggestions.
- **Values sit above function:** Curtis adds that organisational values and non-negotiables sit a layer above reasoning style and are loaded first.
- **Head, chest and gut:** a hosts' summary phrase for agents that carry judgment and values, not only language output.

## Frameworks and methods

1. Decide what the agent does, then how you want it to approach that task.
2. Choose a pair of functions (the hero and its supporting parent; full stack only for complex agents).
3. Keep one shared definitions file for the functions so instructions stay short.
4. Hold everything else constant (role, input, prompt) so the difference is attributable to the functions.
5. Compare outputs for usefulness and sourcing, not for personality.
6. Place organisational values above the agent layer, and have a router load the right specialist plus its context.

## Tools, settings and resources

- **ChatGPT projects (free account)** — Brooke's thirty-minute experiment with two agents analysing business performance data — demo as described on the call.
- **Claude Code folder with an orchestrator** — Curtis's team of named specialist agents, each with a short personality code and extra rules (for example writing for the audience first, search optimisation last).
- **Function definitions as a single shared reference** — how to keep agent instructions small.

## Claims and evidence

- Same instructions and prompt but different function pairs produced a brainstormer-style answer (many hypotheses and questions) versus a one-sentence diagnosis with next steps — live demo, one run, not a controlled test; the page's reading guide says a label alone does not establish a capability.
- The agent asked follow-up questions without being told to — presenter's observation, plausible from the instruction but unverified.
- An orchestrator re-routed a request to the right writer agent — host anecdote, shown in conversation only.
- Typing eighteen agents in one evening — reported on the call; no outputs shown for most.

## Key moments

- [02:55] Brooke introduced; the hosts' season theme is repeat guests.
- [08:36] Brooke's route into the topic through a writing group and character development.
- [12:56] Why most personality tests look at presentation, while functions look at how information is taken in and decided on.
- [15:13] Curtis asks what the judgment layer in a language model is and why the same answer would not suit everyone.
- [31:31] Start of the two-agent ChatGPT experiment with identical prompts.
- [36:32] Output comparison: the brainstormer's hypotheses versus the other agent's single diagnosis.
- [37:53] Curtis explains mapping his specialist agents to function types and typing eighteen in an evening.
- [53:26] Curtis shows his orchestrator and agent folder, with personality codes, and the values layer above them.

## Apply to icm-workshop

- **Boundary (never build an orchestrator) and D2 SDLC:** Curtis's orchestrator that loads a specialist plus context maps in ICM to stage folders with contracts. The valid takeaway is the principle: define reasoning style per stage in its contract, without a runtime router. Adapt, do not adopt the personality-code layer.
- **S2/S3 stages:** a two-pass pattern (first gather concrete facts, then propose and evaluate options) is a useful structure for the research and proposal contracts, expressed in plain language rather than function codes. Adopt the pattern, reject the typology.
- **C1 shared core:** the "values above agents, loaded first" idea reinforces keeping house rules and voice in one core file that every module reads (one home per fact).
- **Evidence gap:** the demo is one uncontrolled run; if used in the workshop kit (O4), run it live with a plain "gather then evaluate" instruction as a control.

## Open questions

- Does a two-pass plain-language instruction (facts first, alternatives second) match the function-typed result in the same experiment? That would show whether the labels add anything.
- Which agents or outputs from the eighteen typed agents were actually kept, and how were they checked over time?
