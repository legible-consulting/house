# 1.4 Ask for a Script, Then Make the Voice

*AI Animations & Workflows › Module 1: Your First Animation · Author: Jake Van Clief · Source: Skool video · Length: ~3:20*

## Summary

The AI drafts a spoken script from the saved brief and source; the learner reads it, removes anything invented, then produces a voice take either by recording themselves or through a speech service. Everything after this is timed to that actual recording, so the lesson is about locking meaning and delivery before any pictures exist. The finished state is a reviewed script, a listened-to take and a note recording which version was selected.

## Core concepts

- **Script gate before audio:** the AI must show the script before generating sound. Review is about meaning (no invented calendar date, no extra tasks for Sam) and ease of speaking.
- **Voice in the voice stage:** script and selected narration live together in the project's voice stage folder, keeping the original recording untouched.
- **Two voice routes:** self-recording placed by the AI, or a speech service using a voice you have permission to use, with cost and configuration explained before any request is sent.
- **Fix at chunk level:** if a passage is wrong, identify it and regenerate that chunk (or re-record just that passage), then re-listen in context.
- **Record the choice:** the AI writes down which script and take were selected; earlier versions stay for comparison.
- **Separate durable preferences from per-video content:** writing style and repeatable voice-stage instructions belong in reusable instructions, not in this video's script.

## Frameworks and methods

1. Ask for a spoken explanation from brief and source; read it aloud and simplify awkward lines.
2. Save the approved wording as the script.
3. Make the take by one of the two routes.
4. Listen in full with the script in hand, checking names, the due day, pauses and pacing.
5. Fix single passages, re-listen, then record the selected version.

Rule of thumb when comparing speech models: use one identical passage and choose by listening.

## Tools, settings and resources

- **ElevenLabs** — Jake's own production voice service (cloned voice); the lesson tells learners to use their own recording or service.
- **Animation & Voice Workspace (Premium Vault)** — provides the voice stage and speak command.

## Key moments

- [0:00] Brief and note give the AI something specific to write from.
- [1:02] Choose the recording route and read the script aloud once.
- [2:03] Walk through the action, owner and due day, then listen to the whole take.
- [3:05] Preview of next lesson: find where words land.

## Apply to icm-workshop

- **O3 content:** voice stage contract for the video line: input is an approved script, output is one chosen take plus a selection note; keep the "script approved before audio spend" check as a human gate.
- **Boundary — never spend money without a gate:** speech synthesis costs money; require the AI to state cost first, consistent with spending being a human decision.
- **Secrets:** API keys for voice services go in environment variables, never the folder.
- **C1:** the learner's writing-style preferences map to the voice section of the shared core.

## Open questions

- Is a cloned voice appropriate for client-branded content, and where does consent get recorded?
