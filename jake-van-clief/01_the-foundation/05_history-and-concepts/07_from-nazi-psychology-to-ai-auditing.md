# 2.7 From Nazi Psychology to AI Auditing

*The Foundation › History and Concepts · Author: Jake Van Clief · Source: YouTube (linked video, transcript on disk) plus written page · Length: 13:43 · Link: https://youtu.be/UGyTimVObus*

## Summary

Jake dissects his research pipeline, the Ethics Engine, which administers personality and values questionnaires to many language models and scores their answers. The point is not the results but the anatomy: the word "agent" is stretched too far, the first thing inside the system is an orchestration layer rather than a model, models are reached through standardised request and response contracts (APIs, and increasingly the Model Context Protocol), and most of the code is parsing, scoring and statistics older than the models. He closes by saying the new semantic layer is real but sits on top of ordinary engineering, and that true autonomous loops will shift the engineer's job to reliability and safe operation. The page tightens this considerably, especially around the reliability claim and what a score means.

## Core concepts

- **"Agent" often means orchestration:** in this pipeline, regular software sequences prompts, evaluates outputs and decides the next step. The page adds that other designs let the model propose actions subject to controls, so check which steps the software picks, which the model proposes and which a person reviews.
- **Model call as a function call:** prompt in, text out; the surrounding program decides what happens next.
- **Orchestration is plain concurrency work:** queues, retries, rate limits and completion tracking across providers, none of which is AI.
- **An API is a contract:** two programs agree on the request and response shape and need not know each other's internals; here, an HTTP request carrying structured text in each direction.
- **Standardise the interface:** USB, HTTP and the language server protocol each removed a many-to-many integration problem; MCP applies the same idea to AI tools, with a host, a client and a server.
- **Bridge language to numbers:** the response is text, so pattern matching extracts a rating, then a published scoring key (including reverse-scored items) turns it into subscale totals and standard reliability statistics.
- **Semantic layer on old foundations:** operating on meaning is new, but it depends on, and does not replace, the engineering beneath it.

## Frameworks and methods

1. Pipeline anatomy: instrument and persona, orchestration, model call, parsing, scoring, reliability analysis, interpretation.
2. 60/30/10 as a split of kinds of work: in his telling for this system roughly 10 percent model calls, 30 percent orchestration, 60 percent data processing and analysis. Page: a teaching heuristic, not a measured ratio.
3. Page's inspectability exercise: pick one claim and identify where it came from, how it was scored and which check you could rerun; store the model version, prompts, sampling settings, instrument version and scoring rules next to any published result.
4. Page's parsing rule: refusals, off-topic numbers and absent ratings should never quietly count as data; document how invalid answers are treated.

## Tools, settings and resources

- **The Ethics Engine paper (arXiv 2510.11742)** — modular pipeline for psychometric assessment of language models — linked on the page.
- **Model Context Protocol (architecture overview and tool specification)** — standard for connecting AI applications to tools — introduced late 2024 per the video; page links the 2025-06-18 spec.
- **Research on model psychometrics (Nature Machine Intelligence)** — linked on the page to show reliability and validity must be tested separately.
- **Statistics libraries (SciPy, NumPy)** — mentioned for Cronbach's alpha and test-retest correlation.

## Claims and evidence

- The engine gives a model's psychological profile with about 90 percent reliability — page corrects video: the figure comes from a production source; no underlying data or analysis is given, so it cannot be verified. Scores compare responses under specified prompts, not a human-style profile.
- Agentic behaviour is just wrapped function calls and real autonomy is rare — page corrects video: a description of this workflow only; models can propose tool calls inside agent loops.
- The model "does not call APIs directly" under MCP — page corrects video: a model can propose a tool and arguments; the host applies controls and uses the client to send it.
- Reverse scoring example of five becoming one — page: depends on the scale; on a one-to-seven scale a seven becomes one.
- Scoring is "validated, peer-reviewed arithmetic" — page: check key, range and item set against instrument documentation; a familiar formula does not validate an implementation.
- Page notes the described local parser may substitute or clamp a rating while keeping a warning, which affects interpretation.
- The video's opening (about adapting 1950s tests used on Nazi defendants) is partly cut off in the captions, so the framing is secondhand.

## Key moments

- [0:02] Opening: personality tests aimed at AI models, and the intent to dismantle rather than demonstrate.
- [1:00] The word "agent" and what it actually implies.
- [2:01] Function call versus process; autonomous loops acknowledged as emerging.
- [3:01] First thing inside the system: a traffic controller, not a model.
- [4:00] APIs as contracts.
- [5:00] HTTP and JSON in each direction.
- [6:01] Many-to-many integration problem and the USB, HTTP and editor-protocol precedents.
- [7:01] MCP introduced.
- [8:01] Parsing bridges language to numbers.
- [9:00] Scoring keys and reliability statistics.
- [10:00] The 10, 30, 60 breakdown.
- [11:00] Pulling the series together: AI extends the stack.
- [12:00] Future agentic loops shift the engineering challenge to infrastructure.

## Apply to icm-workshop

- **Never build an orchestrator:** the clearest lesson here is where orchestration is legitimate (concurrency across providers) versus where Jamie's contracts do the routing; reject building one for stage flow, and adopt the "scheduled sessions, not a driver" line for the unattended runs in the goals file.
- **D4 estate conformance and C3 desk:** the page's rule to keep model version, prompts, settings and scoring with any reported result is a good house rule for the conformance report and the quarterly estate audit; adopt as one line, with its own why and date.
- **Gates are human / O1 tool research:** the "which steps are software, model or person" tracing is a ready checklist for scoring a tool or agent product before an adopt, watch or decline verdict; adapt into the O1 verdict template.
- **O4 training:** the "agent versus orchestration" vocabulary pairs with lesson 2.5 for a single workshop slide; adapt, and avoid repeating the 90 percent figure.
- Weak relevance to S1 to S5 beyond vocabulary.

## Open questions

- Does the community have the pipeline source, or only the paper, if a similar scoring-and-audit approach is to be borrowed for O1 verdicts?
- What would a minimal, human-verifiable record of a model-assisted result look like in a client folder (C2)?
