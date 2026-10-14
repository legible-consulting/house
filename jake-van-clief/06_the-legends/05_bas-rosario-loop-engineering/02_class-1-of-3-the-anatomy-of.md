# Class 1 of 3 : The anatomy of a loop📚

*THE LEGENDS › 5. Bas Rosario - Loop Engineering · Author: Bas Rosario · Source: text lesson*

## Summary

Bas breaks a loop into four parts (act, evaluate, decide, repeat) and argues that evaluate carries the entire job. He contrasts a vague "write it, review it, improve it until good" prompt, which he calls a mood, with a version where every part has a written input: a list of pass/fail checks, a decision rule, a retry limit and a one-line carry of what failed. The learner leaves able to convert their habitual reasons for saying "again" into checks the system can run, and to recognise the remainder that will not convert.

## Core concepts

- **Act:** the model does the task, supplied by the room (what it may touch, what done means) and memory (what stays true).
- **Evaluate:** judge output against a written standard and nothing else: not effort, history or model confidence. Result is pass or fail per line, naming any failing line.
- **Decide:** exactly three outcomes: done (all pass), again (something failed, go once more carrying the failure), or stop (budget spent or no progress, hand back). Bas calls it bookkeeping, but a loop with no stop rule has an interruption rather than an ending.
- **Repeat / carry:** the next attempt must be told what failed and what to change, which is memory used inside the loop. Without it attempt two is an alternative, not an improvement.
- **A check the system cannot run is an adjective:** the test is whether the system can verify it against its own output (count, look up, compare). "Professional" fails that test; a length limit or a source cross-check passes.

## Frameworks and methods

1. Write the ask using the room and memory.
2. Write checks: pass/fail only (scores let models grade themselves generously), one job each so a fail points to one fix, each fail names its line.
3. Write the decision rule: all pass means done, any fail means again, budget spent means hand back.
4. Write the carry: what failed, change only that.

Converting "agains" into checks: turn each reason into something countable or lookup-able. Soft qualities such as tone become examples-to-match plus banned-words checks. Anything that still will not convert is kept as the human's remainder and handled in class 3.

## Claims and evidence

- A loop can only reach the standard you wrote, so the ceiling is the author's, not the model's — worked example of a customer-update loop, vague vs fully specified — illustrative, no measured results.

## Apply to icm-workshop

- **Adapt for the Audit step of a stage contract.** A stage's pass/fail checklist is the same object as a loop's evaluator. In the workspace-builder walk, the stage-mapping and questionnaire phases should ask for the checks that make a stage's output acceptable, and reject any check phrased as an adjective.
- **D2 SDLC:** ticket-to-release is a refinement loop whose evaluator should be hard signals. CI is truth, so tests and build results are the evaluate step; the retry happens via push and reading CI, not a local run, per Jamie's no-local-checks rule.
- **S3/S4 drafts:** proposal and quote drafts can carry mechanical checks (language of the client, terms match the quote, floor not breached). The remainder (does it say what Jamie meant) stays a human gate.
- **One home per fact:** the checks for a deliverable should live once, in the stage that produces it, not be copied into prompts.

## Open questions

- For client-facing documents in the client's language, which checks are genuinely mechanical and which will always be Jamie's read?
