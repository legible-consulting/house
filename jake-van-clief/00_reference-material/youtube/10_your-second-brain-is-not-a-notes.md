# Your Second Brain Is Not a Notes App (Afternoon tea Recording)

*YouTube · Author: Jake Van Clief · Published: 2026-07-07 · Length: 55:35 · Views: 17,078 (as of 2026-10-14) · Link: https://youtu.be/-CUsfao6m7E*

## Why it made the top 10

Scores: influence 19.8/40 · educational 22/40 · fit 16/20 = 57.8/100. Where the memory-taxonomy video (note 07) explains what kinds of memory exist, this live session is the practical side: what belongs in a second brain, how folder structure decides what later sessions read, and a self-audit that turns a pain point into folders, skills and scripts. Fit is high because the store conclusions, not raw material rule and the audit map straight onto client folders and the workspace-builder walk; educational value is diluted by a long platform pitch.

## Summary

Recorded as a members' afternoon-tea session, the video argues that a second brain is simply a context layer for the AI, and that ICM is one way to organise it. A bucket of notes turns into a graveyard that does little better than built-in assistant memory; what helps is a structure that already encodes where each kind of information goes and what a later session should read. Jake demonstrates with a vault he built that day for his session prep (briefs, decks, transcripts, derived packages) and with an Obsidian graph of a company's teams. He then covers how this scales to organisations, answers how to keep only the signal, and closes with a list of questions for auditing your own processes. Viewers leave able to design a small, pain-driven brain and decide which parts become folders, skills or scripts.

## Core concepts

- **Second brain = context layer:** whatever the label (Obsidian vault, LLM wiki, ICM), the job is feeding the right context to the model; a dump of notes and research is not that.
- **"A skill is technically a frozen conversation":** dialogue about how you do a job, written down as a skill, folder or single markdown file; an ICM workspace is the same thing at larger scale.
- **Many small brains, not one big one:** build one per workflow, starting from an annoying process rather than a plan to capture everything.
- **Structure decides the signal:** do not ask the model to judge what matters; the folder layout and map already say where a transcript lands and where conclusions drawn from it go.
- **Derived over raw:** process each raw transcript once into a short output, and have later sessions read that output, not the transcript.
- **Graph navigation:** in an Obsidian vault, files are nodes and links are edges; for a company map (team, roles, reports) this lets the model walk straight to the relevant team instead of searching a large wiki.
- **Human in the loop by design:** people are good at knowing what to ask; systems that augment that need far less infrastructure than ones that try to replace the head.

## Frameworks and methods

1. Self-audit: which processes produce the most value, which are most annoying, what tools each uses and when, where you prefer not to use AI, what has gone wrong with AI, and what is sensitive or carries accountability.
2. Map each step's input, process and output: where data lands becomes a folder; arithmetic becomes a skill with a script; reading and note-taking becomes a notes folder.
3. Layer progression in his own prep: pasting into chat (layer one), skills (layer two), a folder workspace with one agent and you acting as the human in the compute layer (layer three).
4. Scaling: before building shared infrastructure, ask whether each person can keep a local brain; if you must share, you need per-file access control, which plain folders do not give you.
5. Be willing to rebuild a structure once you see how you actually work.

## Tools, settings and resources

- **Obsidian** — graph and link view over plain markdown folders; optional viewer, not the method.
- **Whisper (not Whisper Flow)** — local transcription of session recordings.
- **Claude, Claude Cowork, ChatGPT, Gemini built-in memory** — the baseline he says a notes dump barely beats.
- **SharePoint / Microsoft permissions** — his stopgap for restricting files when sharing a workspace across a company.
- **Self-audit workbook** — attached to an earlier members' session; not inspected here.
- **His upcoming platform** — workspace hosting, licensing and hiring; pre-launch at recording.

## Claims and evidence

- Structured navigation answers a cross-team question in near-zero time and few tokens, while a large wiki would be slow and invite hallucination — live demo on a small vault, no measurement — anecdote.
- No good off-the-shelf solution exists for per-file permissions on shared workspaces — his view — sales context, since he is building one.
- Three or four people would normally do what his session-prep brain does — anecdote.
- Most people will run local models within four to five years; Mac minis win on price-to-performance — prediction and opinion, dated.
- A legal-AI startup (he could not recall the name) raised about $160 million building per-vertical workflows — unverified.
- Licensing your workflows through a horizontal marketplace will become a new industry — thesis behind his own product — sales context.

## Key moments

- [2:34] Topic set: what a second brain is (Obsidian, Karpathy-style wiki).
- [3:35] Note buckets become graveyards; second brain defined as a context layer.
- [7:07] Tour of the session-prep vault: briefs, decks, transcripts, packages.
- [11:44] Nodes and edges; the company-teams graph.
- [14:51] Skill as frozen conversation; why folders are quick to reshape.
- [18:53] Mini brains; folder structure steers how the AI approaches a task.
- [21:30] Scaling to an organisation: permissions, SharePoint, then the platform pitch.
- [25:05] Start from a pain point, not a plan.
- [28:39] How to keep only the signal: structure, and reading conclusions instead of transcripts.
- [48:05] Self-audit questions and mapping answers to folders, skills and scripts.

## Related coursework

- `jake-van-clief/01_the-foundation/01_the-three-layers/02_skills.md` — repeats and sharpens: a skill as a written process; the "frozen conversation" framing is a useful one-line version.
- `jake-van-clief/01_the-foundation/02_build-it-around-your-work/02_design-your-folder.md` — repeats: the wiki shape with raw sources kept apart from AI-written pages, and smallest version first; this video adds the derived-output rule.
- `jake-van-clief/06_the-legends/04_bas-rosario-memory-engineering/02_class-1-of-3-what-deserves-to.md` — agrees and extends: Bas's "decision, not story" filter is the line-level version of Jake's rule that later sessions read conclusions, not transcripts.
- `jake-van-clief/05_davids-corner/03_learning-for-everyone/01_folders-obsidian-and-workflow-execution.md` — agrees: Obsidian as an optional viewer over plain files; this video shows a case (company map) where the graph earns its place.
- `jake-van-clief/05_davids-corner/03_learning-for-everyone/08_stop-automating-your-frustration-audit-it-first.md` — complements: that skill scores impact and risk to choose automate, hybrid or manual; Jake's audit decides structure (folder, skill, script). Run both.

## Apply to icm-workshop

- **C2 client folder and S2 research:** adopt derived over raw: raw call transcripts sit in a raw subfolder of the client folder, S2 produces the profile from them, and S3 onward declare the profile as Input, never the transcript. This is the goals' "artefact is the only handoff" rule applied to research.
- **Workspace-builder walk (discovery) and O4:** adopt the self-audit questions as the discovery questionnaire for client ICM workspaces, with the input-process-output mapping deciding folder, skill or script.
- **C1 shared core:** adapt the teams graph as plain relative links between shared-core files so a cold session can walk from one fact to its neighbours; reject Obsidian-only syntax, so modules still run from anywhere and open in any editor.
- **C3 dashboard roles:** the per-file permission problem is the same as tension 2 in the goals (salesmen writing through the dashboard); reject SharePoint and do not wait on his platform (sales context). Access belongs to the dashboard's three roles, with folders as the record.

## Open questions

- Does the derived-output rule need a written check (for example, a stage contract stating that it must not read `raw/`) to hold up, or is the folder map enough?
- What did the self-audit workbook from the earlier session contain beyond the questions shown here?
