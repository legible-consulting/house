# 1.7 Fix What You See, Then Export

*AI Animations & Workflows › Module 1: Your First Animation · Author: Jake Van Clief · Source: Skool video · Length: ~2:40*

## Summary

The learner watches the narrated preview as a viewer, notes the first moment the explanation breaks down, and hands the AI one specific correction. After checking the fix in a still and in playback, the AI explains and runs the export: a small test first, then the full render. The final check is watching the actual exported file, not the browser preview, because that is what other people will see.

## Core concepts

- **One clear correction per pass:** name the beat, say what the viewer cannot see or follow, state the change, keep the approved voice and source facts, and have the AI save a short change note.
- **Still plus playback:** a still exposes overlap; playback shows whether the picture lands with the words and stays long enough. Both are needed.
- **Deterministic rendering:** export plays the browser scene frame by frame and combines frames with audio, so a scene must produce the same picture at the same video time every run. Anything relying on a live click or wall-clock timer needs a plan for export.
- **A folder structure is not an exporter:** a self-built workspace must demonstrate a playable result and save the command and settings used.
- **Small test before full render:** check a short test export, then the full file, including the ending, speech completeness and sync.
- **Report the first divergence:** if the MP4 differs from the preview, give the AI the first point they diverge and let it investigate that.

## Frameworks and methods

1. Watch the preview end to end; log the first point of lost understanding.
2. Single, specific correction; re-open preview; check still then play into it.
3. AI explains export settings; run a small export; inspect playable file.
4. Full export; watch the whole MP4.
5. Keep reviewed export in the render stage folder with a note on what changed.

## Tools, settings and resources

- **Render command of the prepared workspace** — takes the project name, a worker count and a phone-copy flag, producing a main MP4 and a smaller copy; runs from the workspace's configured Python environment.

## Key moments

- [0:00] Watch the narrated preview; give one correction.
- [1:00] Export explained: frames drawn per timestamp then mixed with audio.
- [1:30] Test export, compare against preview, then full export.
- [2:00] Keep the reviewed export and note; next is your own idea.

## Apply to icm-workshop

- **D2 UAT analogue:** "watch the real artefact, not the preview" mirrors UAT sign-off on the real environment; adopt the principle that sign-off happens on the shipped form.
- **O3:** the render stage contract should name the output files and the change note as artefacts; the human check is watching the full file.
- **Boundary — CI is truth:** if rendering ever runs in CI, the exported file is the evidence, not a local preview; but note that Jamie's rule is not to run local checks, so exports would need to run in a cloud session or CI.

## Open questions

- Does the render command depend on a desktop GPU or display, or can it run in a cloud session?
