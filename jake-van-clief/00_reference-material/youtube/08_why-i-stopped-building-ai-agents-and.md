# Why I Stopped Building AI Agents and Started Using Claude Cowork

*YouTube · Author: Jake Van Clief · Published: 2026-03-21 · Length: 51:22 · Views: 26,557 (as of 2026-10-14) · Link: https://youtu.be/0fCQ-4J_jzk*

## Why it made the top 10

Scores: influence 20.8/40 · educational 24/40 · fit 14/20 = 58.8/100. It is the only unedited, end-to-end build of a writing workspace in the set: feeding real audience data, steering from the thinking trace, and splitting a voice document into small files. The coursework states these ideas briefly; here they are shown with mistakes and corrections. Roughly 40% is rants and asides, so the useful material is concentrated in the timestamps below.

## Summary

Jake opens a fresh, empty folder in the Cowork tab of the Claude desktop app and builds a scripting and writing workspace for his own channel, narrating each choice. He describes the space before giving any task, pastes transcripts of his best-performing videos, then dumps YouTube comments and community introductions so the model can extract what the audience asks for. He reviews the proposed content pillars and folders, ties audience questions to each pillar, and has a long voice file replaced by three short ones. A final fresh request for a video idea shows the workspace routing itself. Between steps he argues that most people should build on the vendor's agent rather than write their own frameworks. Viewers come away with a repeatable sequence for standing up a content workspace and several rules for keeping voice files from flattening output.

## Core concepts

- **Describe the room before the work:** explain what the space is for and how you work before asking for tasks; a task-first prompt gets a folder shaped around the wrong thing.
- **Order of information is a route:** he pictures each word as a coordinate steering the model, so the same facts in a different order land somewhere else (his simplification, not a technical claim).
- **Read the thinking trace:** small misreadings of you grow with use, so correct them the moment they appear.
- **Pillars set where, not how:** pillars and attached audience questions tell the model which territory a piece belongs to, leaving the wording open; prescribing structure makes every script sound alike.
- **AI-described voice sounds like AI:** a voice file written by the model drifts toward model patterns, so voice guidance should point a direction rather than script it, and the hard rules should be your own.
- **Separation of concerns for markdown:** one file per concern, loaded only when that concern is needed; he treats around 100 lines as the sign a file should be split.
- **Build on the platform:** subscription agents improve without your effort, and third-party orchestration layers tend to get absorbed by the model vendor. His summary: "Instructionalize your opinions."
- **Automation is not scale:** he credits hand-written DMs to a thousand people, not bots, for community growth.

## Frameworks and methods

1. Open an empty folder; state purpose and way of working, and ask it to explore source material before proposing structure.
2. Let it create a minimal receiving structure and record the folder map in CLAUDE.md so later sessions skip searching; keep that file lean.
3. Feed the best-performing pieces across formats (short clips, screen-share tutorials, animated essays), restating key facts even if memory holds them.
4. Paste raw audience data (comments, community intros) and ask for a needs analysis; check it against what you know.
5. Review the proposed pillars and folders as a human editor: where would you edit, test new ideas, add files?
6. Attach each recurring audience question to the pillar it belongs to.
7. Word thesis statements as background to understand, not lines to repeat.
8. Split voice into tone and style, per-format guidance, and a never-do constraints list read on every task.
9. Test with a fresh one-line request; watch which files it reads and tighten anything it globs unnecessarily.

## Tools, settings and resources

- **Claude desktop, Cowork tab** — folder-scoped workspace used for the build — as of March 2026, Opus 4.6.
- **VS Code with Claude Code** — his usual setup, preferred for file navigation and many parallel sessions.
- **Brand-voice skill (Anthropic brand and marketing plugin)** — reviewed; good but not how he would break down pillars.
- **Humanizer skill** — reviewed; he would keep parts and write his own, finding it token-heavy.
- **Dispatch** — phone access to Cowork, mentioned for a future video.
- **CrewAI, Semantic Kernel, LangChain / LangGraph, DSPy, n8n** — named as frameworks most people need not build with.
- **Show Your Work (book)** — recommended; author not named in the video (Austin Kleon, inferred).

## Claims and evidence

- His two best videos, one at 1.4 million views, were unscripted — self-report — cautions against over-scripting.
- Restating a fact boosts in-context accuracy — research paper mentioned, not cited — unverified.
- Running the same comment analysis through a paid API agent would already cost about five dollars — rough guess (first said 100) — dated, ignores subscription usage limits (inferred).
- He predicted Anthropic would absorb what Clawdbot offered — self-reported prediction.
- One thousand personal DMs grew his community — anecdote.
- The model handled hundreds of uncleaned comments well — single demo, model-specific, dated.

## Key moments

- [2:04] Conceptualise the space before tasks; why he types the prompt live.
- [3:05] Information order as a route; he re-orders after a misstep.
- [6:13] Critique of the built-in brand-voice skill; make your own skills.
- [12:23] Reading the thinking trace to catch drift.
- [14:58] Why an AI-written voice description reads as AI.
- [18:35] Audience comments and the case for showing your work.
- [21:10] Rant: subscription agents versus building on APIs.
- [35:30] Attaching audience questions to pillars; where, not how.
- [38:35] Understand the thesis, don't regurgitate it.
- [42:10] Splitting the voice file into three; the 100-line rule at [46:48].

## Related coursework

- `jake-van-clief/01_the-foundation/04_live-lessons/02_do-you-actually-need-ai-agents.md` — repeats the folder-over-agents argument; this video adds the subscription economics and a live build.
- `jake-van-clief/01_the-foundation/01_the-three-layers/02_skills.md` — partly contradicts: the lesson recommends the humanizer skill widely, while here he would rewrite it and trim it.
- `jake-van-clief/06_the-legends/03_bas-rosario-context-engineering/03_class-2-of-3-demonstration-over-description.md` — extends: feeding real transcripts and comments is demonstration in practice; his hand-written constraints list mirrors Bas's labelled reject.
- `jake-van-clief/01_the-foundation/01_the-three-layers/04_pick-your-setup.md` — extends: shows the Cowork tab in use and why he still prefers an editor.
- `jake-van-clief/01_the-foundation/02_build-it-around-your-work/01_start-with-outcome.md` — extends: his sixty-percent share (knowing what to post from performance data) is what he feeds the model here.

## Apply to icm-workshop

- **C1 voice:** adopt the three-file split (tone and style, per-format guidance, constraints), each under about 100 lines, in the shared core's voice area; the constraints file is the one every client-facing module loads. Write the constraints by hand.
- **O3 content:** adopt pillars-as-territory; attach real questions from workshop attendees, prospects and case studies to each pillar, kept in the O3 module folder rather than C1.
- **Skills, boundary one home per fact:** adapt: read downloaded skills such as humanizer, then write a repo-owned version with only the rules that apply; never install a second copy alongside it.
- **Workspace-builder walk:** adopt describe-the-space-first and information order in the discovery step, and read the thinking trace during validation.
- **Boundary, every module runs from anywhere:** watch Cowork rather than adopt it; it binds to a desktop folder, which sits awkwardly with cloud-reachable modules (inferred).

## Open questions

- Does the understand-not-regurgitate wording measurably reduce repeated thesis lines across several drafts?
- Is 100 lines the right split point for C1 files, or should the measure be one concern per file regardless of length?
