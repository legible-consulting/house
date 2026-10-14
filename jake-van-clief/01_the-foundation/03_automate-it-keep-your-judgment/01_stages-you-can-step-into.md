# 3.1 Stages You Can Step Into

*The Foundation › Module 3: Automate It, Keep Your Judgment · Author: Jake Van Clief · Source: Skool video + text page · Length: ~4:30 (estimated from captions)*

## Summary

Automation without losing control comes from splitting a job into stages that each leave one openable file, so human judgment lands early when fixes are cheap. Jake uses his animation folder: voice, timed words, storyboard, scene, render, with a map rule that nothing advances until someone has looked at the previous file. He covers three strengths of stop (a line in the map, permission modes, hooks) and argues that you should watch only the stages where taste changes the result.

## Core concepts

- **One stage, one file:** each stage's output is a plain artifact between steps, which is where review happens.
- **Cheap early, expensive late:** a wrong fact caught in the script costs one line; caught after animation it costs new audio, timings and frames. A single prompt-to-finished run leaves only the costliest point to intervene. He calls the failure the narrow funnel.
- **Stage contract:** short English note per stage covering what it reads, what it makes and who checks it.
- **Selective attention:** do not watch scripted steps like transcription; review the voice take, storyboard and stills.
- **Stepping in is richer than approve or reject:** add a line, stretch a beat, and most often delete.
- **Engelbart framing:** the AI does more while the person keeps steering; because a sentence is interpreted, the complicated layer must stay open to inspection.

## Frameworks and methods

1. Write the job as stages, each with its single output file (example: gather, draft, check, send).
2. Give each stage a contract.
3. Choose a stop strength: map instruction (usually followed but only advisory), Manual or Plan permission mode, or a hook that blocks an action regardless.
4. Mark the one or two stages where your judgment changes the outcome.

## Tools, settings and resources

- **Permission modes and hooks (Claude Code docs)** — Manual asks before edits or runs, Plan only outlines, hooks hard-block; use hooks for send and delete.
- **His YouTube video on AI videos that avoid slop** — full animation folder tour.
- **Optional reading** — Engelbart (1962), Toyota jidoka.

## Claims and evidence

- A script error in lesson 1.1 (two years versus nearly four) was caught at script stage — worked example from the course itself.
- A map instruction is "pretty much always" followed — his experience, hence the advice to back critical stops with settings.

## Key moments

- [0:00] Goal; animation folder revisited.
- [0:40] Stages leave files; the stop rule in the map.
- [1:01] The two-year-versus-four example and why early review is cheap.
- [1:40] Writing stages and contracts.
- [2:01] Three strengths of stop.
- [2:40] Where to put your eyes.
- [3:02] Engelbart and the sentence-as-interface point.

## Apply to icm-workshop

- **Boundary, gates are human:** adopt the stage contract with a named checker, and enforce stops by hook, not map text, for anything that sends, merges, spends or signs; checkboxes remain human-ticked.
- **D2 SDLC:** adapt one-stage-one-file to ticket-to-release stages sized by tier, with the UAT sign-off as the judgment stop.
- **S3-S5 chain:** each of research, proposal, quote, agreement leaves one file the next module declares as an Input; mark proposal and quote as the stages Jamie reviews.
- **Workspace-builder walk (stage mapping):** use his "mark where judgment changes the result" step as a standing question.

## Open questions

- How do hooks interact with unattended runs such as the drift check, which must proceed without a human stop?
