# The History of Classifiers (And How Jev Replaces Them)

*YouTube · Author: Jake Van Clief · Published: 2026-09-24 · Length: 10:33 · Views: 23,003 (as of 2026-10-14) · Link: https://youtu.be/EeVu0nflXQg*

## Why it made the top 10

Scores: influence 27.5/40 · educational 30/40 · fit 14/20 = 71.5/100. The coursework splits work two ways, scripts for exact steps and the model for judgment. This video adds a third bucket between them: cheap, fast, confidence-scored sorting decisions. It also shows how to keep those decisions in a markdown file inside an ICM folder.

## Summary

Jake explains classifiers through a mailroom clerk who routes every envelope to a desk without ever answering one. He then traces how they evolved, from hand-trained single-purpose models to large language models that sort into categories they were never trained on. His argument is that chat models are overkill for sorting: slow, costly, wordy and inconsistent. A dedicated zero-shot classifier (TypeSafe's Jev, launched just before the video) makes sorting decisions so cheap that you start making decisions you never bothered with before. Viewers come away with a test for spotting LLM steps that are really sorting steps, a threshold rule for acting on confidence scores, and a pattern for keeping the decision rules as a file in the folder.

## Core concepts

- **Classifier as a smart if-statement:** its only job is choosing the pile an item belongs on, and he argues much of what software does all day is exactly this.
- **The old cost of a new pile:** every pre-LLM classifier was trained for one job, so adding a category meant labelled examples, ML expertise and weeks of effort. Most people did the sorting themselves by reading everything.
- **Zero-shot:** since around 2020, you describe the piles in plain language and the model sorts into them without training. Using a chat model for this works but returns essays and can answer differently twice.
- **System 1 vs System 2 (Kahneman):** fast instinct vs slow deliberation. He casts the classifier as pure System 1 and chat LLMs as System 2.
- **Jevons paradox:** when a resource gets more efficient people use more of it, not less. Applied here, near-free decisions get used in places that were never worth paying for.
- **Calibrated confidence:** every answer comes with a probability. If calibration holds, the number can drive routing rules, and you keep it because any single answer may still be wrong.
- **The decision lives in the folder:** in his workspaces, numbered folders hold order and files hold memory. The one thing left in the model's head is the routing judgment, and a decision file moves that into the folder too.

## Frameworks and methods

1. **Three-way split of any step:** if the output is a paragraph, use an LLM. If it is a pick from a list, a yes/no or a rating, and the step repeats, use a classifier. If it has one exact answer (counts, dates, totals), use code. His example: whether spending fits a policy is a judgment call, but the total is code.
2. **Confidence routing:** above 0.8, act automatically. Below 0.5, send to a person. In between, act but flag it.
3. **Always include an "other" pile:** the classifier cannot invent a category that is not on your list.
4. **Decision-file pattern:** a markdown file states which file it reads and the thresholds, then lists plain-language questions, each typed as pick-one, yes/no or scale. A short script (Claude wrote it) sends a document through the file and writes the answers into a sibling file. A person can overrule any answer, and each overrule becomes a test case for the next version of the decision file.
5. **Model opines, code decides:** for picking a video hook, the classifier scored candidates on curiosity and clarity, and code chose the winner from the scores. In his words, "The model gave its opinion, the code made the decision." He generalises it: the chat model drafts the rule a single time and the classifier applies it on every run after.
6. **Where else it fits (his list):** routing; quality gates; best-of-N draft picking; labelling and filing; picking the current version among duplicates; rubric scoring; checking customer names before shipping; staleness; which file or skill to load next; whether an agent is really finished or should stop and ask.

## Tools, settings and resources

- **Jev (TypeSafe)** — single-call zero-shot classifier that TypeSafe positions as a System 1 model; question types are pick-one, yes/no and described scale, several per input, each with a confidence score — typesafe.ai (not stated in the spoken video). Launch context: the video opens on the launch, so treat it as product promotion.
- **Claude** — used to write the decision file's runner script; he suggests asking it to turn a step into a decision file plus script rather than learning the API.
- **Background reading named in the video** — Kahneman, *Thinking, Fast and Slow*; W. S. Jevons (1865, coal). Paul Graham's 2002 spam work is described but no essay is named.

## Claims and evidence

- Rosenblatt's 1958 learning machine drew press predictions of walking, talking and self-awareness, but in practice learned to tell left from right after about 50 tries, on a $2 million borrowed Weather Bureau computer — historical anecdote, broadly consistent with standard accounts; specifics unverified here.
- Minsky and Papert's 1969 book is widely blamed for the first AI winter — he hedges by saying it was blamed rather than that it caused it; the historical causation is contested.
- Graham's trained filter let fewer than 5 spams per 1,000 through, with zero false positives — attributed to Graham's 2002 work; not checked against the source.
- A 2012 neural network beat everything before it at sorting a million photos into 1,000 classes (ImageNet, inferred) — well documented.
- Jev's 80% means right about 80% of the time — vendor calibration claim; not tested in the video; sales context.
- He estimates labelling his ~26,000 desktop markdown files would cost about $2.65 — his own arithmetic; depends on pricing at launch; dated.
- His demo ran in about half a second for a tiny fraction of a cent and worked almost first time — single demo; anecdote.
- A classifier trained on your own examples still beats it on that one task, and for small batches a regular model's bulk mode may be cheaper, per an unnamed team's measurement — honest concession; the measurement is unsourced.

## Key moments

- [0:02] Jev launch framed; the mailroom analogy.
- [1:03] Rosenblatt's 1958 machine and the hype around it.
- [2:04] Graham's 2002 spam classifier; classifiers in everyday systems.
- [2:35] 2012 image classification; the one-job, one-model problem.
- [3:06] Zero-shot LLMs; why chat models are a poor fit for sorting.
- [4:06] Concession that trained classifiers still win on a single task.
- [4:36] System 1/2 naming; Jevons paradox and the $2.65 estimate.
- [5:38] Question types, confidence scores and the threshold rule.
- [6:08] His test for when a step should become a classifier; limits.
- [7:08] Decision-file demo, overrides as tests, and fit with ICM folders.

## Related coursework

- `jake-van-clief/01_the-foundation/03_automate-it-keep-your-judgment/02_steady-parts-into-code.md` — extends: keeps the rule that exact work goes to code and adds a middle tier for repeated choice/yes-no/rating steps, which 3.2 would leave with the model.
- `jake-van-clief/01_the-foundation/03_automate-it-keep-your-judgment/01_stages-you-can-step-into.md` — extends: 3.1 puts a person at fixed stops; confidence bands decide case by case whether the stop fires.
- `jake-van-clief/01_the-foundation/05_history-and-concepts/04_the-ladder-that-explains-every-ai-failure.md` — partly contradicts: the ladder warns against investing in a capability a platform will soon absorb, and this video builds on a just-launched vendor API. The decision-file method survives that risk; the product dependency may not (inferred).
- `jake-van-clief/06_the-legends/02_bas-rosario-prompt-engineering/03_class-2-of-3-routing-choosing-the.md` — extends (inferred): Bas's ordered type questions are a classification task done by hand; a decision file is one way to make that routing explicit and testable.

## Apply to icm-workshop

- **Boundary, gates are human:** adapt the threshold rule. The auto-act band may only do reversible, non-gate work (labelling, filing, drafting a morning-glance line). It never advances a stage or ticks a gate, whatever the confidence.
- **C3 desk (unattended sweeps):** adopt the three-way split. Deadlines inside seven days are dates, so code handles them. Calls such as whether a client folder is waiting on someone, or whether a note is stale, suit a classifier, and low-confidence answers go to the morning glance for Jamie.
- **S1 prospecting:** candidate use. A decision file scoring researched targets against the target profile (fit: pick-one plus confidence) would sit beside the target list in the module folder; salesmen see the flagged middle band.
- **Boundaries, never build an orchestrator · CI is truth:** a decision file plus a one-input, one-output runner script is acceptable. Overrides become fixture cases, and those run in CI, not locally.
- **O1 tool research:** reject coupling to the product for now. Give Jev a dated verdict of *watch* with a recheck date, and keep the decision-file method vendor-neutral, since any model with structured output and scores could run it (inferred).

## Open questions

- Does the calibration claim hold on Jamie's own documents, and how many overrides does it take before the thresholds should move?
- At Jamie's volumes (tens to hundreds of items, not thousands) is it actually cheaper than a batched general model, given his own concession?
- Where do the sibling answer files live so they don't turn client folders into the swamp 3.3 warns about?
