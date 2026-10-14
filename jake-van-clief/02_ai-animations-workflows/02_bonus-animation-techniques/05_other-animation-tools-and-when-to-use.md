# 2.5 Other Animation Tools and When to Use Them

*AI Animations & Workflows › Module 2: Bonus Animation Techniques · Author: Jake Van Clief · Source: text lesson*

## Summary

A pointer list of alternatives to the course's default scene approach, framed as optional and justified only when a tool makes something specific easier. The lesson groups them by need: finer motion control, explanatory vector animation, reusable React video scenes, and animated interface assets. The suggested test is to reproduce one beat of an existing video with an alternative and compare clarity, editing effort and export behaviour.

## Core concepts

- **Adopt on a named reason:** try another tool only when you can say what it would make easier.
- **Seekability matters:** timeline libraries must give the same picture when scrubbed forwards and backwards, which is what a frame-by-frame renderer needs.
- **Interactive vs exported:** an interactive animated asset and an exported video serve different purposes.
- **Check licence and docs per version:** especially before redistributing a package.

## Frameworks and methods

Needs-to-tool mapping, in my words: motion control points to GSAP or anime.js; explanatory vector work to Motion Canvas; React-based video to Remotion; interface assets to dotLottie or Rive. Evaluation recipe: one beat, one alternative, compare three criteria.

## Tools, settings and resources

- **GSAP, anime.js** — JavaScript motion/timelines.
- **Motion Canvas** — code-driven vector animation with an editor, with official examples.
- **Remotion** — React video authoring and rendering, with a community prompt showcase.
- **dotLottie, Rive** — animated interface assets, Rive with interactive states.

## Apply to icm-workshop

- **O1 research:** each tool is a candidate for a dated adopt/watch/decline verdict; the one-beat comparison is a ready-made trial protocol with a recheck date.
- **O3:** Remotion is the one most likely to matter if videos must render in a cloud session ("runs from anywhere"); worth testing against the current browser-render route.
