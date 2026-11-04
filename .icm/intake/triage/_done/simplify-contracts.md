# Stub: The contracts carry their instructions, and the why lives beside them

- lane: chore
- found-by: the review of the house against the ICM paper · 2026-11-03
- complexity: medium
- priority: P1

## Problem

The house keeps ICM's shape and loses its point. The paper gives a stage 500 to 2,000 tokens of
instruction. The desk contract carried about 7,000 and `CLAUDE.md` about 1,500. Some 200
`(why: … · date)` clauses sat inside the instructions, so every session read the history of
each rule to follow it. The stack carried about 1,000 words on Hermes, parked since
2026-10-31. The lexicon forbade `icm` in a name while `.icm/` is the blueprint's folder in every
repo. The lexicon and the root README did not name the workshop repo. The goals file in the
library contradicted the Boundaries on stages.

## Proposed change

One text-only pass on the house, decided with Jamie on 2026-11-03:

1. Every `(why: …)` clause leaves `CLAUDE.md`, each `CONTEXT.md`, `core/lexicon.md` and
   `core/stack.md` for a `why.md` beside the file. No Inputs name a `why.md`. Each contract
   holds its own. The rule "a rule without a why is deleted" stays.
2. `desk/CONTEXT.md` keeps the contract and the writes table. The routes, roles, tables,
   variables and console steps move to `desk/app/README.md`.
3. Hermes leaves `core/stack.md` for `core/setup/hermes/README.md`. The stack keeps one row.
4. The lexicon drops the `icm` rule and gains the workshop. The root README names the
   workshop.
5. The house stops pointing at `library/research/design-trail/01-goals.md`. A pull request on
   the library retires the file.

Left as they are, by Jamie's word: the lane and the Apps clones, the 183 verdicts, the finished
tickets, the three-language files, the desk's writes, and the Layer 3 files (`core/services.md`,
`terms.md`, `voice.md`, `identity.md`, `01-prospecting/prospect.md`, `cadence.md`,
`target-profile.md`, `desk/app/DESIGN.md`, `research/intake.md`), which still carry about 60
why clauses for a later pass.

## Acceptance criteria

- [ ] No `(why:` clause remains in `CLAUDE.md`, any `CONTEXT.md`, `core/lexicon.md` or `core/stack.md`.
- [ ] Each of those files has a `why.md` beside it with one entry per clause, and the contract holds it.
- [ ] `desk/CONTEXT.md` is under 1,600 words and `check.yml`'s `desk` job still reads the writes table.
- [ ] `core/stack.md` names Hermes in one row and one line, and `core/setup/hermes/README.md` holds the rest.
- [ ] `check.yml` is green on the pull request.

## Questions

1. The Layer 3 files above: the same move in a second pull request? Default: yes.
