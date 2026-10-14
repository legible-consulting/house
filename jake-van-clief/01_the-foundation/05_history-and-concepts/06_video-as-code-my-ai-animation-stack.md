# 2.6 Video as Code: My AI Animation Stack

*The Foundation › History and Concepts · Author: Jake Van Clief · Source: YouTube (linked video, transcript on disk) plus written page · Length: 13:13 · Link: https://youtu.be/yEa6dgh7wuc*

## Summary

Jake explains how he produces animated explainer videos in a fraction of the old time by treating video as a software project. A markdown spec is the brief, a style guide fixes the visual language, a component registry supplies reusable building blocks, and a coding agent builds each scene as a React component that a video library renders frame by frame. A human then does voice-over, cuts, music and extra footage in an ordinary editor. He wraps the workflow in a case for constraints as a creative aid and compares the moment to earlier democratising tools. The learner walks away with a pattern (spec, reusable components, reviewable stages) that transfers well beyond video.

## Core concepts

- **The spec is the leverage point:** the hard work is not the model or the code but the precise written description of structure, scenes, timing and emphasis. A loose spec makes the agent guess more; a tight one directs every beat.
- **Brief as freedom:** the quote used here, attributed to Ogilvy on the page, argues that a clear brief frees the executor to solve the problem rather than discover it.
- **Style guide and component registry:** the first holds decisions that never change between videos (palette, timing, text rules); the second lists reusable pieces (text animations, backgrounds, transitions, data visuals) so the agent composes rather than invents.
- **Video as a function of frames:** because each frame is a function of the frame number, anything that runs in a browser can be part of the animation.
- **Separation of concerns:** spec, implementation, components and style are independent, so any can change without touching the others.
- **The animation is not the finished video:** the time saved is on the animation; voice, cutting, re-recording and adding real footage remain human work and are where he wants to spend attention.
- **Constraints enable creativity:** the agent is the constrained party, so it executes rather than guesses; he cites an inverted-U relationship between constraints and creative output.
- **Democratising tools follow a pattern:** early messy output, then a rising floor of quality.

## Frameworks and methods

1. Pipeline: write the spec, point the agent at the style guide and registry, name the scene to build, preview, describe changes in plain language, iterate scene by scene.
2. Hand-off to an editor: export the rendered scenes (or screen-record), then voice-over, cut, music and refinements by hand where that is faster than regenerating code.
3. Page version: check the stills and rendered video yourself; a style guide and registry make expectations checkable but do not guarantee compliance.
4. Current beginner route (page): voice, timed words, storyboard, scene, export, taught in a separate animation course.

## Tools, settings and resources

- **Claude Code or any coding agent (Codex, Aider)** — builds scenes from the spec.
- **A code editor** — VS Code, Cursor or similar; optional.
- **Remotion** — library that renders React components into video — http://remotion.dev/.
- **CapCut** — final editing, voice-over and music — http://capcut.com/.
- **OBS** — alternative to render export by recording the screen, avoiding codec problems.
- **Spec and script templates** — Jake offers to email them on request; not on the page.

## Claims and evidence

- Animations that took a week to a month now take under an hour — page qualifies: refers only to that demonstration; research, writing, narration, review and revisions also take time.
- One person doing the work of 4 to 6 specialists over 8 to 12 weeks — page only, stated as "the real claim"; no evidence given.
- Steve Lacy made tracks for Kendrick Lamar on a cracked phone with GarageBand and that phone is in the Smithsonian; Canva has 200 million monthly users after more than 100 investor rejections — anecdotes and statistics, unverified here.
- Dr. Seuss wrote a 50-word book on a $50 bet and sold 200 million copies; the Jaws shark appears around 80 minutes — popular lore, unverified, and the sales figure is likely inflated.
- Inverted-U relationship between constraints and creativity — "actual research" is mentioned without a citation.
- Page corrects the earlier recording's tool-first framing by pointing to a newer beginner route.

## Key moments

- [0:02] Claim: week-long animations in under an hour; stack overview.
- [1:01] Remotion, editor and CapCut; the tools are not the point.
- [2:01] The spec as brief; "tight brief" quote.
- [3:00] What a spec file looks like.
- [4:00] Agent reads style guide and component registry, builds scenes as React components.
- [4:00] Remotion's frames-as-function idea.
- [5:01] Detailed workflow with preview and natural-language fixes.
- [6:01] Reusable components and separation of concerns.
- [7:01] Export and hand-finishing in the editor.
- [8:01] Where creative energy should go; GarageBand and Canva parallels.
- [10:00] Constraints enable creativity.
- [11:01] Recap: the system, not magic.

## Apply to icm-workshop

- **Workspace-builder walk (stage mapping):** the spec, build, review progression with a style guide and component registry is a concrete stage-contract example; adopt as the worked example in O4 material, noting that the human stages stay human.
- **C1 shared core:** the style guide holds decisions made once; this is the same one-home-per-fact idea as Jamie's voice and document design system, and the registry parallels reusable document components for S3 and S4 PDFs. Adapt rather than adopt, since Jamie's output is branded documents, not video.
- **O3 content:** a possible route for case-study videos; log as watch, not a build item for the 90-day window.
- **D2 SDLC:** "the spec is the leverage point" supports writing the ticket-to-release spec before build at every tier; adopt as a principle only.
- **Reject** unattended multi-scene runs: keep a human review gate between scenes, in line with "gates are human".

## Open questions

- Is there a lighter route (slides rather than video) that reuses the spec-plus-registry pattern for S3 proposal pages?
- Would the newer course's voice, timed-words and storyboard flow suit O4 course material?
