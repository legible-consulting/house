# 1.3 Build One Phase and Review It

*Building Your Stack › Module 1: Custom Interfaces · Author: Jake Van Clief · Source: YouTube (recording linked from the lesson page) · Length: 14:51 · Link: https://youtu.be/KC0VEZuo4OI*

## Summary

A live-stream style recording of Jake starting a real build: a front end around his animation workflow that lets him navigate scripts, specs and renders as a visual map, with a file editor and agent chat side by side. He loads a long requirements document into a front-end folder inside his existing workspace, has the agent read it, and watches it plan, spawn research helpers and fetch only the needed files from reference repositories. The page's exercise shrinks this to one small phase: read the PRD, propose a read-only script status list, review, build one phase, and record progress.

## Core concepts

- **The requirements file is persistent memory:** unlike a chat, it can be re-read after a reset; markdown is cheap in tokens and well understood by models.
- **A control surface with two drivers:** the goal is switching fluidly between human editing and agent automation, not a prettier chat.
- **Build in the right workspace:** the front-end project lives inside the workspace it fronts so the agent can pull context on demand, only when told.
- **Plan mode then execution:** the tool plans before acting; the page warns that a request to plan is not a universal execution lock, so use the tool's real permission controls.
- **Selective borrowing:** the agent fetched individual files from reference repos instead of cloning them, which Jake judged better than his own instruction.
- **Delegation is not free:** subagents keep research out of the main conversation but still consume usage and do not guarantee lower cost or better work.
- **Verified handoff file:** record implemented scope, checks run, known issues and next task so the next session checks current files.

## Frameworks and methods

1. Open the project, have the agent read the PRD and files and summarise phase one.
2. Review the plan and acceptance check.
3. Build one phase, inspect changed files and try it.
4. Write the progress record.

Acceptance in the exercise: rows match their sources, open actions reach the right file, missing files give an understandable message. The assistant's completion message is a pointer, not the test.

## Tools, settings and resources

- **Claude Code, VS Code extension** — shown; Codex acceptable.
- **Reference interface repos** — listed in 1.4.

## Claims and evidence

- A long PRD lets the agent work for a long time unattended — shown briefly, outcome not demonstrated.
- Usage runs out and a fresh session may be needed — stated as expectation; page says do not infer exhaustion from response length.

## Key moments

- [0:46] The PRD, its repo references and what was cut.
- [2:16] Panel layout: workflow map, editor, chat.
- [6:05] First step: study and strip the reference repos.
- [8:20] "I'm driving or the agent is driving" control surface.
- [9:05] Why markdown files make a prompt persistent.
- [10:35] Plan mode, subagents, shell commands.
- [12:53] Selective file fetches from the references.

## Apply to icm-workshop

- **C3 desk:** adopt the one-phase-at-a-time build with a progress file; the two-driver control surface describes the dashboard's folder-as-record relationship (tension 2 in the goals).
- **Boundary — never build an orchestrator:** the workflow map visualises folders and contracts, it must not execute them; keep it a viewer.
- **Boundary — CI is truth:** acceptance checks should be read from CI, not from the assistant's completion message.
- **Reject** building inside the real workspace by default; use a working copy.

## Open questions

- Does a workflow map over contracts add value beyond the folder tree for salesmen and clients?
