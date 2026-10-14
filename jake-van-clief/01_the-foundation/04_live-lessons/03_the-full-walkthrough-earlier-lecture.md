# 0.3 The Full Walkthrough (Earlier Lecture)

*The Foundation › Live Lessons · Author: Jake Van Clief · Source: YouTube (linked video, transcript on disk) plus written page · Length: 23:19 · Link: https://youtu.be/MkN-ss2Nl10*

## Summary

The original full tour of the folder-as-workspace idea, previously lesson 3.1. Jake uses a deliberately fake template with three workspaces (community, production, writing room) to show how a top-level instruction file, per-workspace context files and a small routing table let one agent do the right work in the right place without a pile of agents or a database. Along the way he explains tokens, context windows, markdown and why a text editor is enough. The learner leaves able to describe which files a given task needs and to sketch a first folder for their own work. The written page is more cautious than the video and replaces the recording's tool screens and numbering with current guidance.

## Core concepts

- **Context is finite, so separate it:** a model sees only so many tokens at once; dumping everything into one file means a blog-post task also reads your video notes. Separate areas and point the agent only at the relevant one.
- **Map, rooms, tools (his three layers here):** the always-loaded entry file is the floor plan (project purpose, folder tree, naming, routing table); each workspace has its own context file describing the work and process; skills and tool servers are wired in only where a workspace needs them.
- **Routing table as the key pattern:** a short table saying, for this task, read these files, skip those, consider these skills. Without it the agent either reads everything or guesses wrong.
- **Become the agent you need:** instead of building a writing agent, a production agent and so on, one coding agent adopts the role from the workspace it is standing in. Cross-workspace handoff is a plain file move (a script from writing room into production).
- **Skills inside a system:** a skill on its own is someone else's packaged process; wired into a workspace's context it becomes one step in a thought process you control.
- **Naming conventions replace a database:** consistent filenames carrying topic, stage and version let the agent find and move work with no query layer.
- **The folder is the UI:** he predicts people will increasingly talk to their folder setup by voice; the app is the structure.

## Frameworks and methods

1. Blueprint: three workspaces, each with its own context file and process; relabel to your own work (content creator, freelancer with intake, delivery and admin, developer with front end, back end and docs).
2. Production pipeline inside one workspace: brief, spec, build, output, with each stage loading only the reference material it needs (for example technical standards at brief, design system at spec).
3. Page version, adapt-the-pattern: an entry file for the tool (CLAUDE.md for Claude Code, AGENTS.md for Codex), a CONTEXT.md for current project facts, a REFERENCES.md for supporting material; ask for one draft, its path and the sources used, then compare against the sources. In plain chat, paste the files and save the result yourself.

## Tools, settings and resources

- **VS Code** — folder-tree editor; explicitly optional, any file manager and text editor works.
- **Markdown (created 2004 by John Gruber)** — plain-text formatting used for every file.
- **Skills such as a humanizer and doc co-authoring** — examples of third-party processes wired in per workspace.
- **MCP servers** — mentioned as a plug-and-play way for the model to reach other apps; a separate video is promised.
- **ICM paper v2 (18 March 2026), Section 3 and Section 4.6** — linked from the page for structure and evidence limits.
- **Workspace Blueprint template** — shared with paid tiers per the page and video; not reproduced here.

## Claims and evidence

- 84 percent of people are "still not fully using" AI — offhand statistic in the video, no source.
- Zero code, no database, no vector store needed for most people — demonstrated on a fake template; the page cautions that file reading is not guaranteed and that the paper (Section 5.2) notes concurrent or heavily automated systems may need extra infrastructure.
- Page corrects the video: a CONTEXT.md filename alone does not mean the contents were read; a routing table "does not guarantee correct behavior"; skills listed are not proof of use. Check what was read and inspect output.
- Page corrects the video on layers: the recording calls layer three the workspace itself and says the paper has five layers; the page says map, rooms and tools is a simpler teaching model, not the paper's numbering (project identity, workspace routing, stage instructions, reusable reference material, run inputs and outputs).
- The paper's findings came from Claude Opus and Sonnet 4.6, and the page says similar outcomes on other tools were never shown.
- "Within six months everyone will be doing this" — prediction; unverified.

## Key moments

- [0:01] Promise: a template folder you can adapt to any workflow.
- [2:00] Why chat-only work stalls: token walls and re-pasting.
- [3:01] Tokens and context window explained in plain terms.
- [4:01] Three-workspace blueprint introduced.
- [7:03] Entry file read as a one-prompt orientation.
- [10:02] Writing room launched from a near-empty prompt, loading only its context file.
- [11:02] Two sessions in parallel, moving a script from writing to production.
- [12:01] One agent adopting each role instead of one agent per room.
- [13:00] Production pipeline of brief, spec, build, output with per-stage references.
- [16:00] Wiring skills and tool servers into context files.
- [17:00] Naming conventions standing in for a database.
- [20:00] Making it yours; the research paper and its five-layer version mentioned.

## Apply to icm-workshop

- **Workspace-builder walk (stage mapping, scaffolding):** the map, rooms, tools split is the simplest explanation of what the scaffolding step produces; adopt as the teaching model for O4 and keep the paper's five layers as the formal reference.
- **Every module starts cold / one home per fact:** the page's three-file pattern (entry file, project facts, references, with no competing second set of facts) matches Jamie's rule; adapt it to the C1 shared core, where project facts live once and each module's entry file only routes.
- **C2 client folder:** the freelancer relabel (intake, delivery, admin) maps to prospect-through-handover folders; adopt the per-stage "read these, skip those" table inside each client folder.
- **D2 SDLC:** the brief, spec, build, output pipeline with per-stage references is a lightweight template for tier-sized builds; adapt, but keep gates as human checkboxes rather than agent-driven stage advance.
- **Reject** the "no checking needed" tone: Jamie's CI-is-truth boundary aligns with the page's "inspect what was read" correction.

## Open questions

- How should a routing table be validated, given the page says it does not guarantee behaviour?
- At what scale (concurrency, many clients) does the paper say extra infrastructure becomes necessary, and does Jamie's estate hit it?
