# Stub: Client research: a prospect profile and an industry primer before the first call

- feature-slug: client-research
- epic: house-modules
- sequence: 4 of 9
- depends-on: stage-numbers
- complexity: medium
- priority: P1

## Problem

Jamie enters a first call without a written procedure for the profile of the prospect or the primer on their trade. Seven profiles exist (`clients/*/research/profile.md`), written by hand, each in a different shape. The proposal reads one file for the client's facts, and no contract says how that file is made.

## Proposed change

The module `02-client-research/`: a contract with a built Process, written back from how MotoArk's profile and primer were made. Every proposal reads the profile. The primer is written when the trade is new to Jamie.

## Acceptance criteria

- [ ] `02-client-research/CONTEXT.md` exists with Inputs, Process and Outputs, `status: built`, no placeholder line.
- [ ] The Process says, in order: what to read (the record, the pack the client sent, the public web as text); the questions for Jamie in one batch, each with a default; what `profile.md` holds (who they are, their trade, their words for the problem, who decides, what they asked for, open questions); what `primer.md` holds and when one is written; how a call note in `research/` updates the profile before the proposal reads it (`03-proposal/CONTEXT.md`, Inputs); the commit prefix `client-research:` and the pull request; the gate: Jamie reads, and a session never contacts the client.
- [ ] The Outputs name `clients/<slug>/research/profile.md` and `primer.md`, held by `clients/CONTEXT.md`.
- [ ] `03-proposal/CONTEXT.md` Inputs name the module's folder as the home of the profile. `CLAUDE.md` Routing gains the row. `core/lexicon.md`'s folder table shows `02-client-research/` as built.
- [ ] `check.yml` is green.

## Out of scope

- Rewriting the seven existing profiles to the shape. The shape is written from them.
- Research on tools and concepts: `research/`.

## Notes

Read first: `CLAUDE.md`, `clients/CONTEXT.md` (the research stage), `03-proposal/CONTEXT.md` (its Process is the shape to match), `clients/motoark/record.md`, `clients/motoark/research/profile.md`, `clients/motoark/research/primer.md`, the other profiles in `clients/*/research/`, `clients/remi-ai/research/privacy-policy-review-2026-10-23.md` (a research note that is not a profile), `research/CONTEXT.md` (the concepts a proposal reuses). Point at `clients/CONTEXT.md` for the stage; do not restate it.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, .icm/intake/CONTEXT.md, .icm/intake/house-modules/breakdown.md, then this ticket, .icm/intake/house-modules/client-research.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "client-research:". Move the stub to .icm/intake/house-modules/_done/ in the same pull request. Never run build, lint or dev. Never contact a client. Do not merge. Your last message names the pull request and what waits on Jamie.
