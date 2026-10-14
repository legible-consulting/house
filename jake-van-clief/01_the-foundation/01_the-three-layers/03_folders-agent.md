# 1.3 Folders and One Agent

*The Foundation › Module 1: The Three Layers · Author: Jake Van Clief · Source: Skool video + text page · Length: ~7:30 (estimated from captions)*

## Summary

Layer three moves the AI inside a folder of real work. After defining an agent as a model running tools in a loop toward a goal, Jake builds a small client-email workspace: a map file read every session, a profile, a copied skill, per-client notes, an inbox and a drafts folder. The key device is a routing table in the map that lists, for each job, the files to open, the files to ignore, the skill to apply and the output location. A three-word request then triggers the whole chain.

## Core concepts

- **Agent as loop:** read, act, observe, decide, repeat; a "research agent" or "email agent" is the same model with different instructions and tools. Value comes from instructions, reach and outcome.
- **The map file:** CLAUDE.md in Claude Code, AGENTS.md in Codex; the floor plan loaded every time, holding purpose, layout, naming and routing.
- **Routing as context selection:** the table keeps most files in the drawer so only job-relevant material reaches the desk.
- **Naming rules in the map:** let you ask for last week's draft by name with no database.
- **Human-in-the-loop drafts:** outputs are plain files you edit and send yourself; the map is only something it reads, so hard prohibitions belong in settings too.
- **Why folders last:** files and folders predate current tools; a better model next month can reuse the same structure, possibly with a renamed map.

## Frameworks and methods

1. Copy a real folder (never the original first time).
2. Open it in Code (Local), permission mode set to ask first.
3. Have the AI draft a map, then read and fix it.
4. Add one routing row for one job.
5. Give a short request and watch what it reads; wrong reads mean the map needs work.

## Tools, settings and resources

- **Claude desktop Code tab** — needs Pro, Max, Team or Enterprise; quickstart and permission-mode docs linked — checked 6 October 2026.
- **Codex with AGENTS.md** as the equivalent.
- **Connectors** — swap the inbox folder for real Gmail.
- **ICM paper (arXiv 2603.16021)** and **ICM Architect (RinDig, GitHub)** — referenced for the pattern and the builder skill, used in 2.2.
- **Optional reading** — Anthropic's context-engineering article.

## Claims and evidence

- ICM Architect had almost 1,800 GitHub stars when recorded — stated in video, moves over time.
- The same pattern drives his animation pipeline (map at top, a room per stage) — shown as description, tour is in 3.1 and a YouTube video.
- A sales or developer folder follows the same pattern — asserted, not demonstrated.

## Key moments

- [0:00] Goal and prerequisites.
- [0:30] Simon Willison's agent definition; agents as naming convention.
- [1:00] Opening the folder in Code; manual permissions.
- [2:00] The map file and folder anatomy.
- [3:01] Routing table; "check my email" run.
- [4:02] Words as questions answered by files; drafts are editable files.
- [5:04] Naming rules, other folder types, ICM mention.
- [6:08] The Engelbart mouse analogy and layer recap.

## Apply to icm-workshop

- **C2 client folder:** the email folder is a small version of the client folder (records shaped, notes per client, drafts out); adopt "map plus per-record notes" as the check that a folder alone lets a cold session start.
- **Boundary, never build an orchestrator:** Jake's routing table is the folder acting as orchestration, matching the repo's stage CONTEXT.md contracts; no scripts needed. Adopt.
- **Boundary, gates are human:** his "never send" rule plus settings aligns with the goals' never-send-to-client line; adapt by enforcing through the repo's hook, not the map alone.
- **O4:** use this lesson's folder as the base for the client ICM workspace template.

## Open questions

- Does his routing-table pattern scale past a handful of jobs before the map becomes the "giant map" he warns about in 2.2?
