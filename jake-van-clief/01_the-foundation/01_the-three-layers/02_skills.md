# 1.2 Skills (and Projects)

*The Foundation › Module 1: The Three Layers · Author: Jake Van Clief · Source: Skool video + text page · Length: ~6:30 (estimated from captions)*

## Summary

Layer two turns repeated corrections into a skill: a written process the AI can pick up on its own. A skill is a folder holding a markdown file with a name, a when-to-use description and plain-English steps, optionally with templates or scripts. The lesson walks through generating one from the 1.1 corrections via an interview, reading and fixing it, and testing it in a fresh chat. It then separates skills (how you do a kind of job) from projects (facts about one area of work).

## Core concepts

- **Skill as a process written down:** only names and descriptions sit on the desk until a request matches; then the full instructions load. That keeps the desk clean even with many skills.
- **Markdown:** plain text with light formatting, which the AI already writes in; Jake credits Gruber (2004) as its originator.
- **Generated skills need review:** the model sometimes invents a rule you never stated or promotes a single example into a universal law; the human edits, then the model rewrites.
- **Skill versus project:** method travels to the next client; facts stay with this client. Mixing them leaks one client's details into every reply.
- **Instructions box:** reserved for things true in every chat, such as your name.
- **Big projects:** not every file lands on the desk, so name the important one explicitly.

## Frameworks and methods

1. Ask for a skill for your job and paste the corrections.
2. Answer the interview (purpose, trigger, a good example).
3. Save the file and read it critically.
4. Test in a new chat with a one-line request and confirm it announces the skill.

## Tools, settings and resources

- **Claude Customize → Skills; Settings → Capabilities → code execution must be on** — checked 6 October 2026; skills are installed via upload.
- **Projects** — project knowledge plus per-project instructions.
- **humanizer skill (GitHub)** — strips AI-sounding writing; Jake recommends it widely.
- **Anthropic skills repository** — readable examples; ChatGPT and Codex use a near-identical format, so skills travel.
- **Optional reading** — Gruber's Markdown page; Anthropic's agent-skills engineering article.

## Claims and evidence

- A Dubai team mapped 38 workflows in four days and cut a three-day pre-sales estimate to six hours within three weeks — told in the video, not on the page — anecdote, unverified.
- Skills carry across Claude, ChatGPT and Codex — page asserts, linking vendor docs.

## Key moments

- [0:00] Goal: first skill from your corrections, plus a project.
- [0:50] What a skill is and where to find them in Claude.
- [1:02] Inside a skill: folder, markdown file, description.
- [2:02] Desk management; building the email skill by interview.
- [3:04] Reading the result and the fresh-chat test.
- [4:05] Team anecdote; projects introduced.
- [5:05] Skill versus project; instructions box; segue to folders.

## Apply to icm-workshop

- **C1 shared core:** adopt the skill/project split as the test for "one home per fact": voice and house rules live once as method, client facts live in C2 client folders.
- **Boundary, one home per fact:** the Dubai-style "map your workflows" exercise suits the discovery step of the workspace-builder walk.
- **Reject for the repo:** per the goals the shared layer is deliberately thin with no global skills; Jake's skill-upload flow belongs in the workshop kit (O4) as teaching, not as repo plumbing.
- **Adapt:** a description line that states when to trigger is a useful lint for any reusable module contract.

## Open questions

- Does the skills-need-code-execution requirement still hold on the current Claude plans?
