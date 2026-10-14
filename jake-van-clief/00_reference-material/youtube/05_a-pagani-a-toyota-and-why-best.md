# A Pagani, a Toyota, and Why "Best" Is a Trap in AI

*YouTube · Author: Jake Van Clief (with Katie Bakewell, NLP Logix) · Published: 2026-07-09 · Length: 47:42 · Views: 49,047 (as of 2026-10-14) · Link: https://youtu.be/-YursW-UIoY*

## Why it made the top 10

Scores 60.3/100: influence 23.3/40, educational 22/40, fit 15/20. The coursework teaches discovery mostly from the builder's side (outcome first, 60/30/10). This interview adds a practitioner's client-side view: a return-on-investment gate before any build, a three-way triage of software vs machine learning vs agents, and a data-leakage story that shows why you have to sit with the client's data. The educational score is held back by long tangents (intelligence, Einstein, ELIZA, company history).

## Summary

Jake interviews Katie Bakewell, a mathematician and data scientist at NLP Logix, a machine-learning consultancy founded in 2011. Her core argument is that most failed AI projects fail before any model is chosen: the client asked for the technology, not for a solution to a costed problem. She describes discovery as structured, in-person conversation that surfaces the real problem and its value, followed by a triage of which kind of tool fits. The car analogy in the title makes the point that "best" only means something relative to a need and a budget. A viewer comes away with a short screening sequence for any AI request and two cautionary examples (data leakage, bias) to raise with clients.

## Core concepts

- **Discovery before technology:** start from the client's problems and the value of fixing them; she estimates about half of incoming requests aim AI at the wrong problem, sometimes where a process change or basic chat-assistant training would do.
- **ROI gate:** for business work, if the requester cannot name higher revenue, lower cost or lower risk, she advises not doing it.
- **Triage by problem type:** fixed steps with no decision are plain software; predicting an outcome is machine learning; agents add non-deterministic risk and earn a place only where that risk is affordable.
- **"Best" is relative:** a supercar is not the best car for a four-mile commute on a budget; likewise an LLM is not the best answer to every problem, and smaller models or simpler methods are often the right buy.
- **Off-the-shelf vs custom:** where almost everyone would agree on the answer (reading a word off a page), use a ready-made model; where your view of the problem differs from the market's, that difference is what justifies custom work.
- **Know the data with the client:** data shape and domain knowledge from the client matter as much as modelling; throwing data over the fence produces confident nonsense.
- **Keep a human in the process:** both stress augmentation over replacement, and Katie objects to people shipping AI-generated output they have not read.

## Frameworks and methods

1. **Screening sequence (as described by Katie):** discovery conversation, then the ROI test (revenue, cost, risk), then problem-type triage (deterministic, predictive, agentic), then off-the-shelf vs custom by how far your view differs from the norm.
2. **Discovery format:** in a room, sticky notes, building trust so people speak openly about problems; she calls it a kind of corporate therapy and prefers it to surveys or online whiteboards.
3. **Bias testing by substitution:** swap names, schools or other identity markers in language inputs and check that the model's output does not move.
4. **Jake's promotion rule:** when an agent or model keeps doing the same thing the same way, replace that behaviour with custom code and give it back to the model as a tool.

## Tools, settings and resources

- **LangTest (John Snow Labs)** — open-source package for generating perturbed language data to test bias and robustness — named in the video, no version given.
- **Meta SAM 3** — text-prompted segmentation; used to mask dolphin dorsal fins for a conservation project — named, not shown.
- **NLP Logix document-capture tool** — LLM plus OCR extraction where a new form needs only a schema and field descriptions — product name unclear in the captions.
- **Engelbart, "Augmenting Human Intellect" (1962)** — Jake's current reading, used to argue for augmentation.
- **ELIZA emulators** — Katie's prop for showing chatbots date to 1966.

## Claims and evidence

- Only about 5% of AI projects get past pilot, per an MIT article — cited from memory, no link — unverified secondhand figure (likely the 2025 MIT NANDA report, inferred).
- About 70% of NLP Logix projects reached production and stayed a year or more — her own count — self-reported, sales context, definition not given.
- A vendor's eight-network debt-scoring model keyed on capitalised state fields, which actually marked one client's pre-cleared accounts — told as a story about another company — anecdote, details unverifiable.
- Jake's thesis found strongly consistent political biases when models were given personas and personality instruments — his own research — not shown here; see the coursework note below.
- Texas, New York and Colorado are leading AI regulation — opinion — dated and unverified.
- Jake says the top 10% of earners make up 60% of his audience — self-reported channel analytics — unverified.
- NLP Logix held several document-processing patents around 2016 and grew from five to about 160 people — self-reported; the captions give both three and four patents.

## Key moments

- [4:06] Discovery first; the MIT 5% figure against NLP Logix's production rate.
- [5:36] Roughly half of clients bring AI to the wrong problem; the Indiana Jones talk.
- [9:44] ROI rule: revenue, cost or risk, or don't build.
- [10:44] Deterministic vs predictive vs agentic triage.
- [11:15] Jake's pattern of turning repeated model behaviour into a code tool.
- [13:46] Debt-collection data-leakage story.
- [15:50] Bias in hiring models and LangTest name and school swaps.
- [21:23] Reading what the AI generated is non-negotiable.
- [28:02] Pagani vs 1998 Toyota: best depends on the need.
- [30:33] Use off-the-shelf where everyone agrees, custom where you differ.

## Related coursework

- `jake-van-clief/01_the-foundation/02_build-it-around-your-work/01_start-with-outcome.md` — extends: the four outcome questions gain an explicit ROI test and a problem-type triage from the consultant's side.
- `jake-van-clief/01_the-foundation/03_automate-it-keep-your-judgment/02_steady-parts-into-code.md` — repeats: Jake's promote-repeated-behaviour-to-code rule is the same determinism argument, stated in passing.
- `jake-van-clief/01_the-foundation/04_live-lessons/02_do-you-actually-need-ai-agents.md` — extends: Katie supplies the risk-based reason agents are often the wrong tool, where the lesson argues from plumbing cost.
- `jake-van-clief/01_the-foundation/05_history-and-concepts/07_from-nazi-psychology-to-ai-auditing.md` — extends: same psychometrics research, here paired with LangTest as a practical bias-testing layer.
- `jake-van-clief/05_davids-corner/03_learning-for-everyone/08_stop-automating-your-frustration-audit-it-first.md` — repeats in spirit: impact and risk scoring before automating maps onto the ROI gate and agent-risk triage.

## Apply to icm-workshop

- **S2 client research:** adopt the screening sequence as a section of the prospect profile: named problem, which of revenue/cost/risk it moves, and problem type. A lead that cannot answer the ROI line gets flagged before S3. Lives in S2's contract.
- **S3 proposal:** adapt the triage and best-is-relative framing into the approach section, so the client sees why a script, a model or an agent was chosen; written in the client's language.
- **Workspace-builder walk, discovery step:** adopt the about-half-bring-the-wrong-problem finding as a standing prompt to ask whether a process change would do, including for Jamie's own modules.
- **O1 tool research:** add LangTest as a watch verdict for any client build that scores people (hiring, credit); weak relevance for most site-tier work.
- **Boundary, gates are human:** the human-in-the-process stance matches; nothing to change.

## Open questions

- Which MIT study is the 5% figure, and does it measure the same thing as NLP Logix's 70%?
- Is LangTest maintained and usable on LLM outputs today, or only on classic NLP models?
- Does in-person discovery translate to Jamie's remote, multilingual clients, or does the trust-building need a different format?
