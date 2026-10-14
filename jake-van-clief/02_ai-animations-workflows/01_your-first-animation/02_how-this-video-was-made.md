# 1.2 How This Video Was Made

*AI Animations & Workflows › Module 1: Your First Animation · Author: Jake Van Clief · Source: YouTube https://www.youtube.com/watch?v=EhWlGingCl0 · Length: ~6:55 · Link: https://www.youtube.com/watch?v=EhWlGingCl0*

## Summary

Jake opens the single folder that produced the video itself and walks through its five stages: voice, timed words, storyboard, animation, render. He ties the structure to how classic animation studios worked (voice recorded first, then timing charts, story reels, pencil tests and review sessions) and argues that a person checking each stage before the next runs is what keeps one bad take from becoming a bad video. The closing move generalises: any repeated process can become folders, each with a short contract file, plus one top-level file telling the AI how to walk them. This is a direct demonstration of ICM applied to video production.

## Core concepts

- **Folder as production line:** a top-level map file tells any AI what lives where; one pipeline table lists each stage, its command, its output file and its human check; each stage folder has its own small contract (reads, makes, who checks); a videos folder holds one directory per piece of work.
- **Voice first:** the narration is the clock for everything else, so pictures are timed to real audio rather than guessed.
- **Cheap-to-fix ordering:** the storyboard is plain text, so changing a beat there costs far less than changing a finished scene. Review happens before expensive work.
- **Human-kept decisions:** Jake listens to the whole take, skims the transcript for mis-heard names, reads the storyboard, watches the full preview, and personally chooses title and thumbnail.
- **Portable:** Claude Code runs his folders, but any AI that reads files could.
- **Separation of reusable vs. per-video:** shared tooling and stage instructions are kept apart from each video's work folder.

## Frameworks and methods

1. Voice: a brief (audience, shape, metaphor, whose voice) then a script in his speaking style, then synthesis in chunks so single chunks can be re-rolled.
2. Words: speech-to-text on a local GPU yields per-word start/end times, compared against the script to flag disagreements.
3. Storyboard: one beat per picture change, each anchored to a phrase; a command resolves phrases to timings into a table.
4. Animation: scene written as code from a reusable kit; contact-sheet stills act as a pencil test; full preview with voice acts as the review room.
5. Render: frame-by-frame browser render, mixed with music and effects, plus a phone-size copy, thumbnails and description.

The generalisation recipe: list the steps of any repeated job, make each a folder, give each a short contract, add one routing file at the top, keep the checks.

## Tools, settings and resources

- **ElevenLabs** — cloned-voice speech synthesis — used in his production setup.
- **Whisper (local GPU)** — word-level transcription.
- **Metricool** — scheduling app connection used to queue posts; his service accounts are not in the course download.
- **Animation & Voice Workspace (Premium Vault)** — the reusable version of this folder.

## Claims and evidence

- Over a hundred posts across four platforms were queued from this setup — shown as a claim, not demonstrated — unverified.
- The studio-history analogy (exposure sheets, story reels, pencil tests) is used as framing — general history, not sourced in the lesson.

## Key moments

- [0:00] One folder produced the whole video, including the voice and character.
- [1:25] Studio analogy: why work is split into stages with reviews between them.
- [2:32] Walk through the map file, pipeline table, stages and videos folders.
- [3:09] Stage 1: brief, script, chunked voice synthesis, full listen.
- [3:45] Stage 2: timed transcript compared against script.
- [4:11] Stage 3: text storyboard resolved into timings.
- [4:46] Stage 4: scene as code, stills as pencil test, studio review.
- [5:26] Stage 5: render, phone copy, human-picked title and thumbnail.
- [5:49] How to build the same pattern for non-video work.

## Apply to icm-workshop

- **O3 content / O4 training:** this is the reference shape for an animation pipeline stage set; adopt the five-stage order and per-stage contracts as the O3 video line, and as a demo in the O4 workshop kit because it shows ICM to non-engineers.
- **Boundary — gates are human:** the check between each stage maps exactly to human-ticked gates; keep them as checkboxes the AI reads but never ticks.
- **Boundary — never build an orchestrator:** the walking order lives in one routing file and the pipeline table, not in code; the per-stage commands are tools, not a driver. Adopt that split.
- **C1 shared core:** reusable kit and voice/brand settings belong once in the shared core, with per-video folders under O3.

## Open questions

- Does the Premium workspace keep its pipeline table and stage contracts in plain markdown, so it can be audited against ICM contract conventions?
- How much of the ElevenLabs voice setup assumes a cloned voice Jamie would not want to use for client work?
