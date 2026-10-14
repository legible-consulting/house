# Class 1 of 3: Decomposition. 📚

*THE LEGENDS › 6. Bas Rosario - Graph Engineering · Author: Bas Rosario · Source: text lesson*

## Summary

Class 1 argues that independence between parallel branches is designed, not declared. Bas shows two failures: cuts too coarse to run anything in parallel, and cuts that look parallel but hide dependencies. With AI branches the second failure is worse, since a model does not wait or ask, it fills the gap confidently. Using a launch package (email, pricing page, FAQ) he shows how three apparently independent writers all depend on one unowned set of facts, and how promoting that dependency into an approved upstream step fixes it. He gives three tests for finding hidden arrows.

## Core concepts

- **Hidden dependency:** something one branch would have to ask about, where the answer sits with a different branch.
- **Too coarse:** split by phase (planning then execution), so nothing can begin until the previous piece is completely done; effectively a timeline with extra meetings.
- **Fake parallel:** pieces that share an unowned fact. Each invents its own version and you get several polished disagreements at convergence.
- **Promote the dependency:** a dependency you spot becomes an upstream step with a gate, while one you overlook turns into a guess. The result is sequential only where it has to be and parallel everywhere else.
- **Cut by deliverable, not phase.**

## Frameworks and methods

Three checks to apply to each pair of branches before any of them runs:

1. Question test: write down what each worker would need to ask partway through, and who holds each answer.
2. Shared-fact test: a fact that appears in two branches is a hidden arrow between them.
3. Order-flip test: imagine the second branch finishing first and ask whether the first would change. If it would, the two were never parallel.

Every arrow then gets one of three fixes: make it a sequence with an upstream step, share it through a single approved artifact that goes to everyone who needs it, or merge the branches if they keep needing answers from each other. Also, a missing-fact rule: a branch should stop and list what it needs rather than state a fact not on the sheet.

## Claims and evidence

- A model fills dependency gaps confidently rather than waiting — reasoned from the earlier rooms series and illustrated with the launch example; no measurements.

## Apply to icm-workshop

- **One home per fact, at fan-out scale (C1).** The upstream fact sheet is what the shared core is for. Any module that fans out to several documents (S3 proposal PDF, Google Doc and dashboard page; S4 invoices) should read price, terms and names from one place, never restate them.
- **Cut by deliverable:** S3 produces one offer in three renderings. Apply the shared-fact test to those renderings; they are copies of one source, not three parallel authors.
- **Adopt the three tests in the workspace-builder stage-mapping step** to check that a proposed set of parallel stages are really independent; if not, number them sequentially (ICM's folder numbering does that for free).
- Related Foundation note: `01_the-foundation/02_build-it-around-your-work/02_design-your-folder.md`.

## Open questions

- Does any current plan for D2 SDLC assume parallel branches (design, build, test) that fail the order-flip test?
