# 2.4 Earlier Remotion Walkthrough

*AI Animations & Workflows › Module 2: Bonus Animation Techniques · Author: Jake Van Clief · Source: YouTube (recording linked from the lesson page) · Length: 22:32 · Link: https://www.youtube.com/watch?v=vyN7ITKcGXU*

## Summary

The earlier method for producing long, script-aligned animations: Claude Code plus Remotion (React-based video) working inside two plain folders, one for writing and one for animation production. A script becomes a plain-English spec that acts as a contract between the voice-over and the visuals, the AI builds scenes as code from that spec, and a render goes into a normal video editor for sound and captions. The page labels it a bonus alternative; the current course route (voice first, then timed words, then cues) supersedes the ordering shown here.

## Core concepts

- **The folders are the app, the agent is the runtime:** no custom application; a folder map in a context file lets the agent find scripts, specs and builds, and the same folders work from the desktop app or an editor.
- **The spec is the real artefact:** it carries a beat map, a visual philosophy, what the viewer should understand, key moments and audio sync points. It deliberately leaves out frame numbers, pixel positions, component props and code, because Jake found over-specifying made animations worse and left the model too little room.
- **Steps are separable:** AI can automate all stages or a human can touch only one, such as editing timestamps when the timing is off by twenty seconds.
- **Scenes as code:** each beat is a React component keyed to frame ranges, so a request to enlarge a gauge is a small edit rather than a regeneration.
- **Skills as packaged know-how:** Remotion publishes agent skills with split sub-files so the AI does not read everything at once; the code in them is explanation, not executed.
- **Remote control:** he mentions driving the same sessions from his phone through a remote-access setup, a course on which is in progress.

## Frameworks and methods

1. Write or generate scripts, pick one.
2. Write the spec from the script (beat map, philosophy, understanding, key moments, sync points).
3. Build scenes from the spec.
4. Render and finish in a video editor, rechecking sync after edits.

Page companion adds a small first exercise: ten to twenty seconds showing source, draft, review, with a reviewed beat map before any build. It marks this as a target, not a completed run.

Folder shape described: a script area (long and short form) and an animation studio area (context file, specs, builds, output).

## Tools, settings and resources

- **Remotion, Node.js, Remotion agent skills** — setup can be done by the AI, but check the preview opens first.
- **VS Code** — optional file-tree view.
- **CapCut** — final edit.
- **Model workspace protocol repo** — Jake's repository explaining the method; referenced in the video, not on the page.

## Claims and evidence

- A full slide deck was produced in four prompts — shown as a claim; unverified.
- Specs and a deeper course sit behind a paid tier at a low monthly price — a dated sales pitch; the current Premium Vault replaces it.
- Page corrects video: the current workflow approves audio before locking timing, while this recording groups script, spec, build and render differently.

## Key moments

- [0:02] What the method produces: automated 20 to 30 minute animations from scripts.
- [2:17] Why Remotion works with AI: React frames, plus official skills.
- [7:39] The two workspace folders and the script-to-spec flow.
- [9:12] Stages described.
- [10:45] Same folders work in the desktop app.
- [14:31] Render, then sound and captions in an editor.
- [15:16] What the spec contains and what it must not contain.
- [18:18] Driving it from a phone.

## Apply to icm-workshop

- **O3:** the spec-as-contract idea maps to the cue stage contract; adopt the rule of leaving implementation detail out of specs so the agent keeps latitude.
- **Every module runs from anywhere:** the phone-driven session is a pointer to remote access; see the Building Your Stack remote access lessons.
- **O1:** keep Remotion on the research list as an alternative renderer, flagged as watch.
- **Reject** the old ordering where timing is set from the script rather than recorded audio.

## Open questions

- Are the spec templates mentioned still available, or folded into the Premium workspace?
