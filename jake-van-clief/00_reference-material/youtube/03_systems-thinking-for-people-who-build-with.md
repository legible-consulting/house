# Systems Thinking for People Who Build With AI (HOUR AND A HALF LONG Webinar Recording)

*YouTube · Author: Jake Van Clief · Published: 2026-08-01 · Length: 1:31:31 · Views: 33,268 (as of 2026-10-14) · Link: https://youtu.be/NWyTsKTKka8*

## Why it made the top 10

Scores 65.8/100: influence 24.8/40 · educational 24/40 · fit 17/20. Roughly half the runtime is teaching (about 12 minutes of room-filling and bio up front, about 31 minutes of Lyceum sales at the end), but the teaching block adds things the coursework lacks: a named list of why company AI pilots stall, a taxonomy that maps today's tool names onto old software primitives, and a library analogy for ICM that works for non-technical audiences.

## Summary

A live Zoom webinar that argues most failed AI projects chased features instead of understanding the system underneath. Jake cites failure statistics, names five recurring failure modes, then sorts the buzzword landscape (n8n, swarms, vector stores, memory plugins) into five plain software jobs. He presents ICM as one orchestration answer, demos a fundraising folder that a fresh model navigates to answer questions, and explains it as a librarian walking a catalogued library. The teaching closes on augmentation over automation, the Solow paradox and a jobs-to-be-done exercise; the last half hour sells the $4,750 Lyceum cohort. A viewer leaves able to classify any new AI tool by the job it does and to question whether a workflow should be automated at all.

## Core concepts

- **Five failure modes:** pilots that demo well then stall (pilot purgatory); generated knowledge nobody can find or read; token burn with little outcome; one expert who builds it and cannot hand it on, which is also a governance gap (who owns it, PII, liability); and teams that keep rebuilding from scratch.
- **Tool names are solutions, not categories:** every product maps to one of five primitives: scheduling and triggers, orchestration (including ICM itself), context delivery, memory and state (the ground truth you verify against), and interface. Learn the primitive, then judge the product.
- **Folders are a form of RAG:** retrieval-augmented generation is any way of putting the right material into the context window; vector search, SQL, APIs/MCP and a walkable folder are all variants.
- **Swarms have a niche:** high-concurrency, high-volume processes justify multi-agent builds; otherwise you cannot easily answer why a given agent acted, what it cost or who approved it.
- **One model becomes the agent:** a fresh session reads the map, opens only what the question needs (progressive disclosure) and writes new files back, so state survives the session and the next session starts from disk.
- **Structure outlasts models:** he claims the same folder layout since Sonnet 3.5; when a model learns to do something natively, he deletes the instructions, so upgrades cut tokens.
- **Augmentation over automation:** the machine turns intent into artifacts, the human reviews; human-readable SOPs keep working if the AI disappears. His closing line: "in a world full of cheap answers, questions become valuable."

## Frameworks and methods

1. **Library analogy:** front desk = interface (a chat window or IDE extension), catalog = the ICM folder (what exists, who owns it, where it lives), request slip = scripts and connectors that fetch from Drive, SQL or BigQuery, librarian = the model, which gets more specific as it reads.
2. **Describe big data, don't move it:** for a large database, keep a markdown/YAML file that says where each kind of record lives and how to query it, rather than refactoring the database. He links this to Google's open knowledge format (OKF) over BigQuery; a co-founder frames ICM as process and OKF as retrieval.
3. **Jobs to be done:** before improving a drill, ask why the hole is needed; the real job (hang a picture) may need tape, not a drill. Applied live: attendees post one workflow they would hand off, and he answers each by asking who it is for and why it matters.
4. **Complexity check for n8n-style builds:** keep it if it earns money; otherwise ask whether an existing connector in the harness already does the job.

## Tools, settings and resources

- **ICM paper** and his **workspace-builder skill repo** — shown on screen, repo name not spoken (inferred to be his ICM builder) — about 353 stars live during the call.
- **Cartographer's Desk** — community member's interactive-resume build using his folder method — https://github.com/Danneytrieu/cartographers-desk.
- **Open knowledge format (OKF)** — Google's markdown/YAML layer over BigQuery — no link given.
- **Unnamed deployment layer** from Eduba (upload folders, chat with them; C# on Azure) — alpha, not released at recording.
- **Reading list:** Brooks, *The Mythical Man-Month*; Weinberg, *The Psychology of Computer Programming*; he also points to Nate B. Jones as a credible agent-focused voice.

## Claims and evidence

- MIT Project NANDA: 95% of agentic initiatives showed zero measurable return; Gartner: 40% of agentic projects cancelled by end of 2027; 42% abandoned entirely versus 17% a year earlier — slide figures, third source unnamed — unverified; the coursework (Curtis Hays note) warns the 95% figure measures return, not failure.
- A community member cut a team's AI tooling spend from about $10,000 to $400 a month — anecdote.
- Google and Anthropic are adopting this methodology (skills, project files) — assertion, no evidence shown.
- 43,000 community members, 1,600+ professionals trained, sessions billed near $2,000/hour — self-reported.
- Live proof: while talking, one session with a Drive/Gmail connector drafted personalised emails for his review — demonstrated, not inspected.
- Lyceum: $4,750, 12 weeks, three cohorts, starts September 12, prizes, a promise to keep working with students until they finish — sales context and dated.

## Key moments

- [16:55] Failure statistics.
- [20:29] Five failure modes, from pilot purgatory to endless rebuild.
- [23:34] Mapping tool names onto software primitives.
- [27:11] RAG explained; folders as one form of it.
- [31:46] Live fundraising ICM demo with a fresh model.
- [34:56] Library analogy and mapping it to features.
- [49:08] Solow productivity paradox applied to AI.
- [53:12] Jobs-to-be-done drill and attendee workflows.
- [59:50] Lyceum pitch begins (sales context to the end).
- [1:27:22] Reading list: Weinberg and Brooks.

## Related coursework

- `jake-van-clief/01_the-foundation/04_live-lessons/02_do-you-actually-need-ai-agents.md` — repeats the one-model-plus-folder case; extends it with failure modes and a non-technical analogy.
- `jake-van-clief/01_the-foundation/05_history-and-concepts/05_openclaw-orchestration-and-ai.md` — extends: the four-part model/tools/routing/channels view becomes a five-primitive taxonomy for any product.
- `jake-van-clief/04_the-archive/03_ownership-in-the-ai-age/04_computational-orchestration.md` — repeats the idea that failed transformations lack systems thinking; this video adds named failure modes.
- `jake-van-clief/01_the-foundation/02_build-it-around-your-work/01_start-with-outcome.md` — extends the four outcome questions with the jobs-to-be-done drill; both lean on Weinberg.
- `jake-van-clief/05_davids-corner/07_curtis-hays-systems-worth-amplifying/09_the-tool-is-ten-percent.md` — partly contradicts: Curtis cautions against quoting the 95% figure as failure, which the video does.

## Apply to icm-workshop

- **S2 / S3:** adopt the five failure modes as a discovery checklist in S2's industry primer and as problem-framing language in S3 proposals. One home: O1's concept library, referenced from both.
- **O1 concept library and O4 kit:** adopt the five-primitive taxonomy and the library analogy as reusable explainers; the jobs-to-be-done drill is a ready workshop exercise.
- **C2 / tension 4:** adapt the describe-not-move pattern: invoice and economics facts live as structured data, and the client folder holds a short description of where and how to read them. Keeps one home per fact.
- **Boundaries:** the single-expert handoff mode is exactly what the every-module-starts-cold boundary prevents; swarms are rejected under never build an orchestrator. Reject the Lyceum guarantee framing for O4; note $4,750/12 weeks only as a market price point for training.

## Open questions

- Check the NANDA, Gartner and 42%/17% figures against their sources before using them in a proposal.
- Does OKF give a usable pattern for structured invoice facts in C2, or is plain YAML front matter enough?
