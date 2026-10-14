# 3.2 Turn the Steady Parts Into Code

*The Foundation › Module 3: Automate It, Keep Your Judgment · Author: Jake Van Clief · Source: Skool video + text page · Length: ~4:40 (estimated from captions)*

## Summary

Anything that should produce the same output from the same input belongs in a script, not in model judgment. Jake shows that most of his animation pipeline is ordinary commands, each doing one stage and stopping, and keeps the AI for work needing taste. The learner identifies a repeated, taste-free step, has the AI write the script, verifies it once against a manual result, and records a one-line routing entry in the map. Scheduling and back-end access are covered briefly.

## Core concepts

- **Determinism:** timing words, rendering frames, totalling numbers should run identically on the hundredth run as the first.
- **Judgment stays with the AI and you:** replying to clients or deciding what a video shows.
- **Candidate test:** a step done the same way three or four times whose right answer does not depend on taste.
- **Check once, properly:** a wrong script is wrong identically every time, so compare it with a hand-made result and have the AI explain unfamiliar lines.
- **One input, one output:** lets you swap or speed up a script without touching the rest, echoing the Unix one-thing-well rule.
- **Automate incrementally:** keep working by hand and let the work show the next automation; prefer exports and APIs over having the AI click through websites.

## Frameworks and methods

1. Spot a repeatable step.
2. Ask for a script in a scripts folder plus a map line on when to use it.
3. Test against a prior manual result.
4. Add the map line (script plus when to run it).
5. Optionally schedule it.

## Tools, settings and resources

- **Scheduled tasks** — Cowork's Scheduled sidebar, or Code's Routines then Local; file tasks need the app open and the computer awake — checked 6 October 2026.
- **His animation CLI** — shown as help output; one command per stage.
- **Optional reading** — McIlroy et al., Unix foreword (1978).

## Claims and evidence

- Scoring ten thousand model responses in his psychometrics work was arithmetic done by script, since scoring keys predate the models — stated by Jake.
- You do not need to write the code — plausible for simple scripts; the lesson itself says reading it becomes natural with time.

## Key moments

- [0:00] Goal; most of the pipeline is plain code.
- [0:40] Determinism defined.
- [1:04] Psychometrics scoring example; how to spot candidates.
- [2:04] Asking for the script; testing versus last week.
- [2:50] Map line and swap-ability.
- [3:05] Scheduling; what stays with the AI; back-end tip.

## Apply to icm-workshop

- **C3 desk and unattended runs:** adopt the determinism rule: the drift check, deadline sweep and research recheck should be plain scripts, with the model used only to phrase the morning-glance lines.
- **Boundary, never build an orchestrator:** a single-purpose script with one input and one output, referenced from a contract, is fine; a script that sequences stages is not.
- **Boundary, CI is truth:** reject his "test it locally against last week" step for Jamie's repos; adapt it as a fixture comparison run in CI.
- **S4 quote and invoices:** invoice arithmetic and economics roll-up are the clearest steady parts to script, with structured facts (tension 4 in the goals).

## Open questions

- Where do scheduled desktop tasks fit given "every module runs from anywhere", since they need an open, awake machine?
