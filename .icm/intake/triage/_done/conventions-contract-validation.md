# Stub: The blueprint says how a contract is checked by a machine, and the workshop shows it

- lane: chore
- found-by: the review of the research library against the house · 2026-10-29
- complexity: low
- priority: P2

## Problem

The one named criticism of ICM online is that it lacks programmatic validation of stage contracts (`research/verdicts/icm-miraheze-page.md`). The house answers it in `check.yml`: the `contracts` job (Inputs, Process, Outputs, `status`), the `placement` job (`holds:`), and `check-client.yml`'s contract check for a workspace. `research/verdicts/folder-structure-protocol.md` (watch, 2026-10-14) holds a scored audit rubric and 14 anti-patterns for the same purpose. Neither the conventions nor the workshop kit says any of this. Jamie's word, 2026-10-29: one line in the conventions, one slide in the kit.

## Proposed change

`conventions/README.md` gains the row `Checked by a machine`: what CI reads of a contract, where, and what a red check means. `workshop-kit/slides.md` gains one slide, "A contract a machine can check", with the three checks and two or three anti-patterns from the protocol's list that the walk test already catches. One pull request on `legible-consulting/blueprint`.

## Acceptance criteria

- [ ] `conventions/README.md` has the row. It names `check-client.yml`'s contract check for a workspace and the three sections, and says that a build's contracts are the blueprint's and are checked in the blueprint's `check.yml`.
- [ ] `slides.md` has one new slide after the walk test. It fits the kit's slide shape and names its source, the protocol repository, by link.
- [ ] `workshop-kit/exercises.md` names the slide in the exercise where attendees run the walk test.
- [ ] `research/verdicts/folder-structure-protocol.md` and `icm-miraheze-page.md` get an update note: what the house took, with the date.

## Out of scope

- The protocol's five skills. They are model-driven, and the kit teaches the checks, not the tool.
- A new check in CI.
