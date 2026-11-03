---
tool: Six motion details of premium apps
kind: article
verdict: adopt
tier: deep
use: [build]
tags: [video, react, mobile]
recheck: 2027-05-03
source: https://www.facebook.com/share/r/1A4hoC316y/
via: Motion Ui Interface
date: 2026-11-03
---

# Six motion details of premium apps

A reel by Motion Ui Interface. It says the difference between a cheap app and a premium one is mostly in the motion, and it gives six details with numbers: a button press sinks to 95% and springs back; pull to refresh moves the list 35% of the finger's travel; a rolling number puts its digits in place 100 ms apart; drag to reorder lifts the item to 105% while the others slide away; a card expands with ease-out in 350 ms; a success tick draws the circle first, then the tick, in 470 ms.

## Verdict: adopt

Adopt for `build`, as a starting point for interaction motion (why: the house's apps use Motion for the interface (`core/stack.md`, the Next.js row), and six values with numbers are a concrete default a ticket can name; they are common practice, not a claim to test, and the cost is nothing · 2026-11-03).

## What would change it

- The blueprint's conventions get their own motion values. Then those are the one home, and this file only points at them.
- A client's preview shows the values feel slow or fussy on a real device.
- An accessibility check shows a value ignores `prefers-reduced-motion`. Each value applies only when the user does not ask for reduced motion.

## How the house would use it

Build, at a ticket that adds interaction to an App or Platform screen (`07-build/CONTEXT.md`): the press scale, the 350 ms ease-out expand and the reorder lift are the defaults, in Motion, behind `prefers-reduced-motion`. It adds a shared value set; it replaces ad hoc choices per build.

## To try

In a build's button component: `<motion.button whileTap={{ scale: 0.95 }} transition={{ type: "spring" }}>`, then check it on the preview on a phone. A good result: the press reads as a response, with no lag.

## Source

https://www.facebook.com/share/r/1A4hoC316y/ · fetched 2026-11-03 · "The difference between cheap and premium is mostly in the motion. Here are 6 details, slowed down so you can see exactly what they do". Caption read with yt-dlp 2026.10.26 (uvx). "Which one should I break down next?" and "Save this for your next build" are calls to act.
