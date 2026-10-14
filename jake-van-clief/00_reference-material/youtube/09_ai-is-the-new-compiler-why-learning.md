# AI is the New Compiler (Why 'Learning AI' is the Wrong Goal)

*YouTube · Author: Jake Van Clief · Published: 2025-08-26 · Length: 22:48 · Views: 12,636 (as of 2026-10-14) · Link: https://youtu.be/RZ0AcCLVPFA*

## Why it made the top 10

Scores: influence 19.8/40 · educational 27/40 · fit 12/20 = 58.8/100. Its educational value is the clearest walk-through anywhere of how his thesis pipeline assembles prompts from templates and why it sends one questionnaire item per call; the closing "four constants" (role, structure, validation, error handling with retry) is new and doubles as a checklist for any stage contract. The Mad Libs analogy and the compiler ladder largely repeat coursework, so fit is modest.

## Summary

Jake argues that the useful mental model is not "learning AI" but treating the model as the newest abstraction layer on top of programming languages, a compiler that turns structured natural-language input into work that once needed hand-written code. He grounds this in his Edinburgh thesis pipeline, where Python fills prompt templates with personas and psychometric items and sends each item separately so runs are repeatable and the model cannot tell it is sitting a personality test. He then reduces the same idea to Mad Libs (fixed instructions plus swappable slots) and shows it works in an ordinary chat too. A viewer leaves able to split a prompt into its steady and changing parts, and to recognise the same four design concerns whether working in a chat window, Claude Code or a framework.

## Core concepts

- **AI as a compiler layer:** each step up the stack (switches, machine code, assembly, high-level languages) packed many lower-level steps into one line; he places the model as the next rung, adding a layer rather than replacing code.
- **Fixed versus variable parts:** a reusable prompt has an unchanging instruction frame and slots (persona, question, tone, scale) filled from your own lists, so you control the input rather than the model inventing it.
- **One item per call:** sending a questionnaire whole invites a favourability bias, so each item goes alone; this also lets him inspect variance item by item.
- **Reproducibility through code:** a script that assembles and sends prompts in a set order replaces thousands of copy-paste runs; he calls this one honest form of prompt engineering.
- **Context replaces edge-case branches:** where traditional code needed a branch for every persona-question combination, the model is handed both and left to resolve them.
- **Lower layers stay valuable:** fewer people will work at them, but they still matter (his Fortran-at-NASA example).
- **Four constants:** role or persona, output structure or schema, validation, and error handling with retry; in a chat you do the last two by hand, in agent tools and frameworks they move into files, schemas and automatic checks.

## Frameworks and methods

1. Build the template: write the fixed instruction once, mark the slots.
2. Keep the slot values in your own list, document or code base.
3. Combine values programmatically (or ask the chat to use only your list) to generate many prompts.
4. Send items one at a time where the model's awareness of the whole set would bias answers.
5. Check every design against the four constants: who it is acting as, what shape the output must take, how the output is checked, and what happens on failure.

## Tools, settings and resources

- **His thesis notebook (Python, notebook format)** — prompt pooling, templates and the final-prompt assembly — GitHub link said to be in the description, not captured here.
- **Model APIs shown:** Grok, Claude and OpenAI, called with model, role, content and sampling settings.
- **Semantic Kernel, CrewAI** — named as frameworks that already automate validation and retry.
- **Claude Code, ChatGPT, Gemini** — used to illustrate the same pattern at different levels.
- **Right-wing authoritarianism scale** (and a left-wing counterpart) — the psychometric instrument in the demo.

## Claims and evidence

- 95 percent of AI initiatives are failing, per an MIT study — cited verbally, no link shown — unverified here and dated (August 2025).
- AI is a bubble like the early internet; he compares roughly 500 million internet users by 2001 with 300–400 million generative-AI users — from memory — unverified, dated.
- Models answer favourably once they recognise a personality test — he says studies show this and points at on-screen citations not named in the captions — unverified here.
- His pipeline is bespoke, with nothing similar he had seen — self-report; he later concedes frameworks and large vendors do comparable work.
- The four constants have held for about a century of programming — rhetorical framing, not evidenced.
- Credentials (Marines avionics and cryptography, Edinburgh postgraduate thesis, British Council and EU work) — self-reported, offered to establish authority.
- He dates the authoritarianism scale to the 1950s — (inferred) possibly conflating the 1950s F-scale with the later RWA scale; check before reuse.

## Key moments

- [0:03] Turing quote on surprise; the three goals of the video.
- [1:35] MIT failure statistic and the bubble argument.
- [2:36] Biography and credentials; the intro runs to about 4:00.
- [5:06] Thesis prompt templates and the authoritarianism scale.
- [6:38] Why items go one by one: repeatability and favourability bias.
- [8:09] Final prompt assembled from style prompt and keys by Python.
- [9:41] Mad Libs analogy, then the same trick inside an ordinary chat.
- [13:18] Fixed parts versus variable parts.
- [14:21] The compiler ladder; lower layers keep their value.
- [20:34] The four constants across chat, Claude Code and frameworks.

## Related coursework

- `jake-van-clief/01_the-foundation/05_history-and-concepts/03_how-a-1953-word-game-explains-ai.md` — repeats: Mad Libs as typed slots and prompting as the newest programming layer are both here; this video adds the concrete thesis-pipeline use.
- `jake-van-clief/01_the-foundation/05_history-and-concepts/07_from-nazi-psychology-to-ai-auditing.md` — extends: same pipeline, but this video covers the front end (template assembly, one item per call, favourability bias) while 2.7 covers orchestration, parsing and scoring.
- `jake-van-clief/01_the-foundation/05_history-and-concepts/02_what-happens-beneath-one-line-of-python.md` — repeats: the abstraction stack and "AI is the next layer"; 2.2 is the more careful version and adds the error-handling-at-every-layer argument.
- `jake-van-clief/04_the-archive/03_ownership-in-the-ai-age/04_computational-orchestration.md` — extends: the video promises a part two on turning templates into computational orchestration; the essay is the allocation discipline that follow-up names.
- `jake-van-clief/01_the-foundation/05_history-and-concepts/04_the-ladder-that-explains-every-ai-failure.md` — partly repeats: both argue a new layer reprices rather than kills the one beneath; that video's ladder is books, films and games, not programming languages.

## Apply to icm-workshop

- **C1 shared core and S3–S5:** adopt the fixed/variable split as the rule for client documents: the fixed frame (voice, design system, terms) lives once in the shared core, and the variables come only from the C2 client folder. One home per fact; the proposal, quote and agreement restate nothing.
- **Workspace-builder walk (scaffolding):** adapt the four constants into a checklist for every stage `CONTEXT.md`: role, output schema, how the output is validated, and what happens on failure. For Jamie "retry" means hand back to a person or re-run the stage, not an automatic loop (gates are human); code-level validation runs in CI (CI is truth).
- **Never build an orchestrator:** reject the Python prompt-assembly driver as a model for stage flow. A single-purpose script that fills a template and stops is acceptable inside one module; one that sequences stages is not.
- **O1 / O4:** the Mad Libs and compiler-ladder explanations already exist in coursework notes 2.2 and 2.3; add one concept-library entry citing those rather than a third copy.

## Open questions

- Is the thesis notebook public, and does it show a validation and retry layer worth borrowing for the four-constants checklist?
- Which instrument and date is correct for the scale he uses (RWA versus F-scale)?
- Did the promised part two on computational orchestration ever ship as a video?
