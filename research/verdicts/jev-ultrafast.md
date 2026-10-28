---
tool: Jev Ultrafast
kind: repo
verdict: watch
tier: deep
use: [build]
tags: [agents, browser, llm]
recheck: 2027-04-28
source: https://github.com/browser-use/jev-ultrafast
date: 2026-10-28
---

# Jev Ultrafast

A small browser agent from Browser Use. It reads the page as a numbered table of controls, and one call to TypeSafe's Jev model picks the operation and the element; a small text model writes text only when it must type. It ran a Google Flights search in about 7 seconds in the authors' own measure, three runs of one task. It needs a TypeSafe API key and an OpenRouter key, both paid per call, and drives Chrome through Browser Harness. Licence MIT; the README calls it an MVP with no frames, uploads or pop-up tabs.

## Verdict: watch

Watch (why: the AI & non-AI automation line (`core/services.md`) sells the repeated steps of a client's week done by software, and a client portal with no API is where a browser agent earns its place; but this is a demo, it binds a build to two paid model vendors, and it uses the existing Chrome profile, which on Jamie's machine can reach clients against the boundary (`CLAUDE.md`, Boundaries) · 2026-10-28). The design is worth reading: the model output never becomes a selector, a coordinate or code.

## What would change it

- A client automation that needs a site with no API, where the browser-use plugin in `core/stack.md` is too slow or too costly.
- A release past the MVP: frames, uploads and pop-ups, and a benchmark on more than one task.

## How the house would use it

- The moment: a build under the AI & non-AI automation line, at the ticket that automates a step on a website the client uses.
- The step: run it in the client repo's own process, with a fresh Chrome profile that holds only the client's test account.
- What it adds: a faster and cheaper loop than a screenshot agent, and a policy small enough to read in a review.

## To try

`git clone https://github.com/browser-use/jev-ultrafast && cd jev-ultrafast && uv sync && uv run jev`, with the two keys in `.env` and a throwaway Chrome profile. A good result: the Wikipedia example opens the right article in under 5 seconds and the inspector shows each choice.

## Source

https://github.com/browser-use/jev-ultrafast · fetched 2026-10-28 · "Jev Ultrafast". README and LICENSE read from raw.githubusercontent.com; repository page by trafilatura. The README opens with a waitlist link for Browser Use Cloud; that is an advert, not information.
