# 2.3 Build a Reusable Design System

*AI Animations & Workflows › Module 2: Bonus Animation Techniques · Author: Jake Van Clief · Source: YouTube (recording linked from the lesson page) · Length: 42:07 · Link: https://www.youtube.com/watch?v=pdoSAWWCDO8*

## Summary

Jake explores Claude Design, Anthropic's design product, as a machine that reads existing brand assets and compiles them into a reusable folder of skills, components and voice rules. He argues that all such tools are folders of markdown and code, so the output can be exported as a zip and used in Claude Code, Codex or even local models, avoiding usage limits and lock-in. The page companion boils this down to a vendor-neutral method: collect one real component and examples, describe the rules, generate one sample, then test reuse with a second.

## Core concepts

- **Design systems are skills plus folders:** skills are markdown files telling an AI how to approach a job; the generated system includes routing, non-negotiables, colour and type rules, voice guidance and previews.
- **Invest in the first draft:** polish brand assets by hand first, then let the tool amplify them into many variants.
- **Token cost is front-loaded:** the import reads files deeply and burns usage once; reuse afterwards is cheaper. Jake reports high-fidelity work eating his top-tier allowance quickly.
- **Portability:** the exported zip works locally with any file-reading agent; he suggests a folder-structure map in the instruction file helps the AI avoid searching.
- **Opinion as moat:** his own voice document overrides the tool's generic "salesy" voice draft; he calls this productionising your opinion.
- **Build systems that grow with the tools,** not ones tools will replace.

## Frameworks and methods

1. Collect logo, approved colours, usable fonts, one component and two examples.
2. Describe purpose, spacing, type and voice rules.
3. Generate one card or slide; correct guessed brand rules.
4. Save, reopen, record what worked.
5. Reuse test: second piece with different content, then change one shared rule and check both.

## Tools, settings and resources

- **Claude Design** — brand import from GitHub, Figma or folder; export zip, HTML, PowerPoint; guide on Anthropic's support site.
- **Local model options named:** Qwen3-Coder-Next, CodeGemma, Devstral, DeepSeek-Coder-V2 — the page warns that skill execution, offline operation and equal results all need verifying.
- **Obsidian** — optional markdown mind-map viewer; Jake rates it as marginal for beginners.
- **Remotion, Playwright** — extra tools needed for animation work.

## Claims and evidence

- Local models can replace Claude if they read files and folders — plausible, but the page says verify per model; unverified.
- "Claude Design was my system before it existed" — personal claim; unverified.
- Usage figures (83% of allowance in a day) reflect his session only, per the page.

## Key moments

- [0:48] What Claude Design is and its usage cost.
- [3:51] Skills explained as markdown prompt systems.
- [6:52] Import routes: GitHub, Figma, local folder.
- [15:13] Behind the scenes it is a coding agent writing its own skills.
- [19:45] Review and approve generated rules; voice draft rejected.
- [25:04] Export zip, then use in Claude Code with the same results at lower cost.
- [31:57] Local models and Codex as swaps.
- [37:19] Argument for fundamentals over single-vendor dependence.

## Apply to icm-workshop

- **C1 shared core:** the design system compiled from assets is exactly the voice and document design system section; keep brand rules, voice and approved assets in one place with a router, and generate client documents from it. Adopt.
- **Boundary — never build an orchestrator:** a design system as folders and skills is consistent; reject any app-style dependency.
- **O1 research:** log Claude Design as an adopt/watch verdict with a recheck date, noting usage-cost risk.
- **O4:** the two-card reuse test makes a good training exercise.

## Open questions

- Is the generated output good enough to supplant a hand-written C1 voice document, or only a starting point?
