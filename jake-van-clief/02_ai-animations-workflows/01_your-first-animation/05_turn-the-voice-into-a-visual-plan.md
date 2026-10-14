# 1.5 Turn the Voice into a Visual Plan

*AI Animations & Workflows › Module 1: Your First Animation · Author: Jake Van Clief · Source: Skool video · Length: ~3:10*

## Summary

With a chosen voice take, the AI transcribes it into a readable transcript plus a word-timing file, then drafts a storyboard that gives every spoken phrase a visual job. A matching step resolves the storyboard phrases against real word timings, so nothing is hand-timed. The learner's checks are about listening: does the transcript match what was said, and does each picture answer the phrase being spoken?

## Core concepts

- **Two transcript artefacts:** a readable transcript for the human and a timed-word file for the machine. The timed file is what drives the scene.
- **Optional transcription tooling:** it is not installed by the base workspace, so the AI explains any installation or model download first and helps pick a model that suits the computer.
- **Beat = phrase + visual job + what the viewer should notice:** for the example, the source note appears when introduced, the action card builds as action, owner and due day are named, and source and card stay together for the final comparison.
- **Cheap edit point:** the storyboard is a text file, so moving or deleting a beat there costs nearly nothing.
- **Timings come from the recording:** if the take changes, timings must be rechecked because a different pause shifts everything.
- **Decorative beats must earn a job:** a folder animation while the narrator says Friday gets rewritten to show the due day, with enough time to read.

## Frameworks and methods

1. Check transcription requirements, then transcribe the approved audio.
2. Listen to the phrases naming Sam and Friday against the transcript; check any flagged-uncertain words.
3. Draft and read the storyboard along with the voice.
4. Compile phrase-to-timing cues; report non-matches.
5. Save checked timings and plan beside the voice; re-run if the take changes.

## Tools, settings and resources

- **Whisper-style transcription (optional install)** — word timings from audio.
- **Cue compile command in the prepared workspace** — stage 3 output is a cues file in the cues folder; stage 2 outputs live in a transcript folder.

## Key moments

- [0:00] Voice chosen; this is the words and storyboard part of 1.2.
- [1:00] Ask for a storyboard where each phrase has a visual job.
- [2:00] Check pictures against the voice; compile and verify cue times.

## Apply to icm-workshop

- **D2 / O3 stage contracts:** treat transcript, timed words and cues as three declared artefacts, each with a named human check; downstream stages list only these as Inputs.
- **Boundary — never build an orchestrator:** the cue compile step is a deterministic helper command, fine as a tool; do not extend it into something that advances stages itself.
- **Staleness rule:** "change the take, recheck timings" is a good dependency note to carry in the stage contract (a rule with its own why).

## Open questions

- Which model size is practical on Jamie's hardware, and can transcription run in a cloud session ("runs from anywhere")?
