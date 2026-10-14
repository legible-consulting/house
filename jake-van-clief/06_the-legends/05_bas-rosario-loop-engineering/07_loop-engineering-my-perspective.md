# LOOP ENGINEERING 🔍 My perspective

*THE LEGENDS › 5. Bas Rosario - Loop Engineering · Author: Bas Rosario · Source: text lesson*

## Summary

Bas gives his practitioner view: refinement loops pointed at code pay him most because tests and builds provide objective signals, and the one evaluator he trusts above all is a failing test written before the work. He shares a recent failure where a build passed every written gate and was still wrong, because the key check was missing, and credits his "nothing ships without my read" rule for catching it. He closes by noting that one loop per task does not describe a real week, setting up series five.

## Core concepts

- **Refinement beats research for him, because code is checkable:** a test, benchmark or build outcome is a signal the model cannot talk its way around.
- **Test first, then loop:** the human's work reduces to defining good before the work and reading output at the gate.
- **When output is wrong, fix the evaluator:** the circuit did what was written; the missing piece is almost always one check, found at the human read.
- **He practises it:** his own posts pass a script gate (word count, banned punctuation, sign-off check), a scored voice rubric, then his final read.
- **Measure, do not assert:** the closing maxim echoing the series.

## Claims and evidence

- A content-pipeline build passed all gates yet delivered confidently wrong output — personal anecdote, no details of the missing check.
- Posts in this classroom go through automated gates and a rubric before publication — self-reported process.

## Apply to icm-workshop

- **CI is truth:** Bas's failing test first is the same instinct as treating CI results as the sole verdict. Adopt it for D2: write acceptance checks (or CI tests) from the ticket before the build starts.
- **Adapt with a conflict:** his loop reruns tests inside the cycle, whereas Jamie's rule forbids local checks unless asked. In this repo's terms the loop's evaluate step is a CI run read after push, which makes cycles slower and budgets (attempts) more valuable.
- **Gates are human:** the "missing check found at the read" story supports keeping Jamie's read before any send, merge or sign, and logging each such miss as a candidate new check.

## Open questions

- What would a "failing test first" equivalent look like for non-code deliverables such as proposals (S3)?
