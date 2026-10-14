# 4.1 Build and Deploy a Website

*AI Animations & Workflows › Module 4: Building Websites · Author: Jake Van Clief · Source: YouTube (recording linked from the lesson page) · Length: 29:23 · Link: https://youtu.be/ozkx_eUfjY0*

## Summary

Jake rebuilds an existing motorcycle-stories newsletter site from scratch with Claude chat, Claude Code, plain folders and free GitHub hosting. The sequence is: have chat study the reference site and write a structure document for the coding agent, save it into a fresh folder, write a context-rich first prompt that asks for alignment questions and a product requirements document before any code, then build, review, correct and publish. The page distils this into a vendor-neutral exercise: a one-page static site with a saved brief, a reviewed plan, a local preview inspected at two widths, and then publication on a static host with the live result checked.

## Core concepts

- **Front-load context, then spend few prompts:** four well-loaded prompts beat many vague ones, and token cost drops accordingly. Jake admits that colour choices he skipped at the start cost rework later.
- **Agent-readable documents:** the first artefact is written for the coding agent, not the human, describing the reference site's structure, content types and voice.
- **Alignment before files:** ask up to three clarifying questions and request a requirements document before building; the page adds that it should stop after the plan and that accounts, payments and form backends are out of scope for a first version.
- **Humans supply taste:** typography, logo and imagery judgements remain with the expert; concrete feedback with screenshots beats vague adjectives.
- **Local preview versus published URL:** a localhost page is not the live site; publishing is a separate step with its own verification.
- **Platform memory vs. your own:** he notes the tool wrote automatic project memory and argues elaborate home-built memory systems are unnecessary. Treat as opinion.
- **Folders replace site builders:** a repo plus natural-language edits means later changes are small pushes.

## Frameworks and methods

1. Study reference, generate a structure document for the agent.
2. Create workspace folder, drop the document in, open the agent there.
3. First prompt with goals, hosting target, non-goals and a request for questions; then requirements document using a design skill.
4. Answer questions, supply assets, build, review at narrow and wide widths, click every link, correct with screenshots.
5. Publish via a static host: manual upload route or command-line route; check the deployed site's paths.

## Tools, settings and resources

- **Claude chat, Claude Code, VS Code** — shown; page says Codex or plain chat also work.
- **Astro** — framework the agent chose; page recommends a single static HTML/CSS page for the exercise.
- **GitHub Pages** — free static hosting from public repos on the free plan, configured by a maintainer choosing a branch/folder or a workflow.
- **GitHub CLI** — used by the agent to create the repo after a device-login step.
- **UI UX Pro Max skill** — design guidance, optional.

## Claims and evidence

- A site is built in 20 to 30 minutes — demonstrated on a simple site; the page says interface, memory behaviour and prompt count belong to the recording.
- Publishing initially broke styling because asset paths lacked the repository-name prefix — shown and fixed live; the page repeats this check.
- A public repo with markdown and brand files exposes them; he pushed without ignoring them for the demo — security caveat given verbally.

## Key moments

- [0:48] Chat explores the reference site.
- [1:33] Request for a markdown structure document aimed at the agent.
- [5:20] The context-heavy first prompt and why.
- [8:24] Requirements document via design skill.
- [11:25] Automatic memory index discussion.
- [15:58] First preview and colour/photo feedback.
- [19:46] GitHub Pages manual route.
- [23:34] The ignore file and secrets.
- [25:51] Broken CSS paths diagnosed and fixed.

## Apply to icm-workshop

- **D2 SDLC (site tier):** adopt the order brief, then plan, then preview, then publish with a stop before publishing; it is a ready sketch of the lightest tier in the site, app, platform sizing.
- **Boundary — CI is truth:** pushing is not proof of deployment; read the deployment result and the live URL, never a local preview. Note Jamie's no-local-checks rule: the first review step should happen on the deployed preview, not a local server.
- **Secrets:** the ignore-file warning supports the rule that credentials never enter git; flag any .env found.
- **S3 proposal / D1 onboarding:** the brief-then-questions pattern fits the client questionnaire; adapt into the kickoff note.
- **Reject** public repos for client work and the unreviewed push.

## Open questions

- Does a Pages-hosted preview suit UAT for clients, or does D2 need a private preview host?
