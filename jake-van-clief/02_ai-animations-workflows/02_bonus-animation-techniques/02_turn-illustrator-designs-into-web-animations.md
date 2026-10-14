# 2.2 Turn Illustrator Designs into Web Animations

*AI Animations & Workflows › Module 2: Bonus Animation Techniques · Author: Jake Van Clief · Source: YouTube (recording linked from the lesson page) · Length: 12:00 · Link: https://youtu.be/izMBiWG3L24*

## Summary

Jake shows a client-style job: a friend's hand-drawn Illustrator storyboard needed custom animated characters embedded in a scrolling website, and a sceptical professor doubted AI could produce editable, organised animation from original design files. The method is to export the artwork as SVG with meaningful part names, give the AI a project routing file and two skill libraries, and then iterate in natural language so that every motion stays editable as components and variables. The page companion turns this into a small exercise: make one named part move, such as a blink, and leave everything else alone.

## Core concepts

- **Name the parts before export:** the AI works from identifiers rather than looking at pictures, so left and right eye, iris, eyebrow and similar labels let it find the right shape without taking screenshots. Distinct prefixes per character avoid collisions.
- **SVG keeps vector parts:** unlike PNG or JPG, the exported file holds separately addressable shapes and groups. Keep a clean original and a working copy.
- **Editable by component:** scenes reference character components that hold head shape, colours, expression profiles, blink timing and iris speed, so a request like "change the eyes on sadness" touches one component instead of regenerating a video.
- **Context file as router:** a project instruction file points the AI to the relevant folders and original SVG so it does not read the whole code base.
- **Appless work:** Jake argues that the folder structure becomes the editing application, with natural language replacing UI clicks, while humans still edit by hand where that is faster.
- **Design fundamentals still matter:** he credits design knowledge for turning a weeks-long job into about three hours.

## Frameworks and methods

1. Name and group parts; export SVG with layer names as object ids, minify off while editing; check fonts, linked images, colours.
2. Give the AI the SVG, the routing file and the skill libraries.
3. Ask for one small change (a gentle blink), preserve the original, review preview, list changed files, stop.
4. Check that the face keeps its shape and timing feels deliberate; then add one expression before adding another character.
5. Promote a character from the animation scene into the website components.

## Tools, settings and resources

- **Adobe Illustrator (or Figma)** — source artwork and SVG export.
- **Remotion and its agent skill** — React scenes and rendering.
- **UI UX Pro Max skill** — front-end design guidance, optional.
- **Claude Code in VS Code** — shown, but the lesson page says Codex or another assistant works.
- **Remotion Player** — embedding a composition in a web page.

## Claims and evidence

- The site was designed in roughly three hours, versus weeks by hand — personal anecdote, no breakdown.
- AI edits only the targeted component without damaging the rest — shown on screen in a few edits; unverified at scale.
- Page corrects video in one respect: it lists exact naming and export settings and says web interaction such as scroll and hover needs separate wiring.

## Key moments

- [0:02] The brief: animated characters in a storyboard site, plus a sceptical professor.
- [1:32] Relabelling eyes, irises and eyebrows so the AI can find them.
- [2:17] Two skill libraries needed.
- [5:20] Scene built from character components.
- [6:50] Natural-language edit of one expression, routed by the context file.
- [9:19] Moving a chosen character into the React website.
- [10:04] "File structures, not agents" and appless work.

## Apply to icm-workshop

- **O3/O4:** a worked example for the animation line of how to take a client's design assets and make them AI-editable; adopt the naming convention step as a client-intake checklist in the workshop kit.
- **D2 SDLC (site tier):** relevant to website builds that embed animation; the routing file plus component split fits the site template.
- **Boundary — one home per fact:** character definitions live in one component folder, referenced by scenes.
- **Reject** the claim that this removes the need for human review; keep gates human.

## Open questions

- Does the SVG-id-based approach survive when a client's file has messy or flattened layers?
