# Stub: Handover: the pack, the walkthrough, the support and hosting record, the retainer offer and the review request

- feature-slug: handover
- epic: house-modules
- sequence: 7 of 9
- depends-on: stage-numbers
- complexity: medium
- priority: P1

## Problem

A finished build has no handover pack, no record of who hosts what and what Jamie is on the hook for, and no set moment for the retainer offer or the case-study request. Agorasim's and Berceo's next releases reach handover first. `core/voice.md` says the pack's shape is "Defined when handover is built".

## Proposed change

The module `08-handover/`: a contract with a built Process and five templates. A client with `kind: retainer` or `kind: role` gets no pack (`clients/CONTEXT.md`).

## Acceptance criteria

- [ ] `08-handover/CONTEXT.md` exists with Inputs, Process and Outputs, `status: built`, no placeholder line. Its `holds:` names the five templates.
- [ ] `08-handover/pack.md`, `walkthrough.md`, `support-and-hosting.md`, `retainer-offer.md` and `review-request.md` exist as templates: client-facing text under `{{LANGUAGE}}` placeholders, notes in English, secret names only.
- [ ] The Process says, in order: when handover starts (the last release merged, `07-build/CONTEXT.md`); what is read; the questions for Jamie in one batch with defaults (who hosts what, the monthly cost, the retainer scope and price from `core/services.md` and the quote); what each file holds; the walkthrough as a numbered list the client follows on the production URL; the offboarding of every collaborator the same day; the case-study request that feeds the portfolio (`.icm/intake/house-modules/portfolio.md`); the gate: Jamie sends the pack and sets `stage: after`.
- [ ] `core/voice.md` (The documents) gives the pack's shape in the Handover row. `core/terms.md` (Hosting and support) and `core/services.md` (Retainer) point at the module. `CLAUDE.md` Routing gains the row. `core/lexicon.md`'s folder table shows `08-handover/` as built.
- [ ] `check.yml` is green.

## Out of scope

- A handover for a client now. The module's first run is Agorasim's or Berceo's, after the merge.
- The case file itself: `portfolio`.

## Notes

Read first in the library, read-only: `research/design-trail/01-goals.md` (handover's goal).

Read first in the house: `CLAUDE.md`, `clients/CONTEXT.md` (handover and after), `core/services.md` (Retainer), `core/terms.md` (Ownership, Hosting and support, Ending an engagement), `core/voice.md` (The documents), `07-build/CONTEXT.md` (what a release is), `core/CONTEXT.md` (the edits in `core/`). `core/terms.md` § Hosting and support holds the terms the record restates.

## Prompt

Repo legible-consulting/house, cloud with the house attached and legible-consulting/library attached read-only, or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, .icm/intake/CONTEXT.md, .icm/intake/house-modules/breakdown.md, then this ticket, .icm/intake/house-modules/handover.md, then the files its Notes name, in order. Do what it says. One branch, one pull request to main, message starts with "handover:". Move the stub to .icm/intake/house-modules/_done/ in the same pull request. Never run build, lint or dev. Never send anything. Do not merge. Your last message names the pull request and what waits on Jamie.
