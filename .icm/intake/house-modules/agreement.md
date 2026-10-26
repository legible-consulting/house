# Stub: Agreement: the signable contract from the accepted proposal and quote, in the client's language

- feature-slug: agreement
- epic: house-modules
- sequence: 2 of 9
- depends-on: stage-numbers
- complexity: medium
- priority: P0

## Problem

A deal that says yes has no agreement to sign that restates nothing and holds exactly what was agreed. Three agreements were written by hand (Agorasim, Berceo, Euro Register), each from memory. MotoArk decides on 2026-10-26 and has no document ready.

## Proposed change

The module `05-agreement/`: a contract with a built Process, and one template per language Jamie works in (en-GB, fr-BE, pt-PT) in which every clause restates `core/terms.md` and nothing else. A draft agreement for MotoArk on the branch, not sent.

## Acceptance criteria

- [ ] `05-agreement/CONTEXT.md` exists with Inputs, Process and Outputs, `status: built`, no placeholder line. Its `holds:` names `agreement.*.md`.
- [ ] `05-agreement/agreement.en-GB.md`, `agreement.fr-BE.md` and `agreement.pt-PT.md` exist. Every clause cites the term in `core/terms.md` it restates. The parties block reads `core/identity.md` (the legal name, the NIF, never the IBAN). A clause that resembles legal drafting carries a `[LAWYER]` marker, as Berceo's hand-written agreement does. The accepted proposal is attached by reference. The signature block is last (`core/voice.md`, The documents).
- [ ] The Process says, in order: the inputs read (the record, the proposal, the quote, `terms.md`, `identity.md`); the template chosen by the record's `language`; how `kind` changes the clauses (a build; a retainer with the monthly scope by reference to the proposal, the price by reference to the quote and the notice period from `terms.md`; a training week with the deposit and the attestations), learned from the three agreements written by hand; what is filled from where; the one batch of questions for Jamie (the signatory on the client side, the start date, what the proposal left open), each with a default; the render through `render.yml` when it exists (`.icm/intake/render-and-publish/render-stack.md`); the signature through Google Docs eSignature by Jamie; the signed copy's Drive link into `record.md`; `commission.owed` set by Jamie at signature (`01-prospecting/prospect.md`); the gate: Jamie sends and signs, a session never does.
- [ ] `clients/motoark/agreement/agreement.md` exists, en-GB, frontmatter `status: draft`, drafted from the template. Not sent.
- [ ] `CLAUDE.md` Routing gains the row for the agreement. `core/lexicon.md`'s folder table shows `05-agreement/` as built.
- [ ] The pull request body lists MotoArk's open values as numbered questions, each with a default.
- [ ] `check.yml` is green.

## Out of scope

- Sending, signing or rendering for MotoArk. Jamie's hand.
- Rewriting the three hand-written agreements to the template.
- The renderer: `render-and-publish/render-stack`.

## Notes

Read first in the house: `CLAUDE.md`, `clients/CONTEXT.md` (the agreement stage), `core/terms.md`, `core/identity.md`, `core/services.md` (Retainer pricing, Training pricing), `core/voice.md` (The documents), `01-prospecting/prospect.md` (The salesman's deal), `clients/motoark/record.md`, `clients/motoark/proposal/proposal.md`, `clients/motoark/quote/quote.md`, `clients/motoark/quote/negotiation.md`, and the three agreements written by hand: `clients/agorasim/agreement/agreement.md` (pt-PT, build), `clients/berceo/agreement/agreement.md` (fr-BE, build), `clients/euro-register/agreement/agreement.md` (fr-BE, training).

One home per fact: a term lives in `terms.md`, the agreement cites it. Client-facing text in the client's language, notes in English (`.claude/rules/clients.md`). Signature goes through Google Workspace (the library's audit decision of 2026-10-14).

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, .icm/intake/CONTEXT.md, .icm/intake/house-modules/breakdown.md, then this ticket, .icm/intake/house-modules/agreement.md, then the files its Notes name, in order. Do what it says. One branch, one pull request to main, message starts with "agreement:". Move the stub to .icm/intake/house-modules/_done/ in the same pull request. Never run build, lint or dev. Never send anything. Do not merge. Your last message names the pull request and the numbered questions that wait on Jamie.
