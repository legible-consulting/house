# LOOP ENGINEERING 🧩 Where this fits in ICM

*THE LEGENDS › 5. Bas Rosario - Loop Engineering · Author: Bas Rosario · Source: text lesson*

## Summary

Bas maps his loop concepts onto the ICM paper (arXiv 2603.16021). The stage contract's optional checklist section corresponds to the evaluator; the optional checkpoint section corresponds to class 3. What ICM does not supply is the ending: neither the paper nor its conventions file contains a retry budget, so the attempt limit and the fixed-target rule remain the author's to write. Bas is consistent that ICM gives blanks, not content, and that the standard still has to come from the person.

## Core concepts

- **Audit = evaluator:** a checklist the agent runs after finishing a step but before writing to output/. Each check has a name and a pass condition and is meant to be unambiguous. If a check fails, the agent revises before saving.
- **Checkpoint = class 3 in three fields:** after which step, what the agent presents, what the human decides. ICM places checkpoints between steps, not within them, matching the "never inside the polish cycle" rule.
- **Stage boundary review:** between stages the person always reviews output; recovery between stages is a manual re-run of a failed stage.
- **No ending in the format:** Bas checked and found no budget concept in the sources, so the stop rule is a user addition.

## Tools, settings and resources

- **ICM paper** — arXiv 2603.16021, cited by Bas for verifying the quoted section names.

## Claims and evidence

- The word "budget" appears in neither the paper nor the conventions file — Bas says he counted — checkable against the paper, not verified here.
- Loop engineering sits at the output door of each stage rather than having its own folder — interpretive reading by Bas.

## Apply to icm-workshop

- **Related Foundation notes:** `01_the-foundation/03_automate-it-keep-your-judgment/01_stages-you-can-step-into.md` (gates between stages) and `01_the-foundation/02_build-it-around-your-work/03_one-model-different-jobs.md` (stage-per-job). Read this lesson as the "what goes inside the gate" supplement to those.
- **Adopt** the Audit and Checkpoint sections in each stage `CONTEXT.md` that has revisable output; the repo's own contracts remain authoritative, so confirm what the repo's conventions already offer before adding fields.
- **Adapt** by adding one plain line for the attempt limit and best-attempt handback in the stage contract rather than any script; this respects "never build an orchestrator".
- **Gates are human:** the Human Decides field is Jamie's checkbox; sessions read it and never tick it. Relevant to D2 and every S-module that ends in something sent to a client.

## Open questions

- Do Jamie's current Apps contracts already carry an Audit-like section that should be mined for the rebuild?
