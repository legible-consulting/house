---
status: built
holds: []
---
# Quote — S4

S4 produces the price, options and payment terms; the engagement's own economics (hours, model cost, hosting, margin); a private negotiation record (positions, concessions, a floor); and every invoice the agreement calls for, as branded PDF, so that Jamie quotes informed by the last deal, never goes below his floor, and sends an invoice he did not write by hand.

## Inputs

- `clients/<slug>/proposal/proposal.md`.
- `core/services.md` (pricing), `core/terms.md`; the last closed quote in `clients/*/quote/` for comparison.
- Jamie's answers to the questions in Process. The discount and the floor are his numbers.

## Process

- Start cold from this folder. Read only what Inputs names.
- First walked for MotoArk (`kind: retainer`, 2026-10-21). The steps:
  1. Read the proposal's scope and timeline. Read the anchor, the floor, the bands and the
     two-options rule in `services.md`, and the terms in `terms.md`. Read the last closed
     quote if one exists.
  2. Compute a default. For a build: honest hours × the anchor, checked against the last
     closed proposal. For a retainer: the range in `services.md`, or, while the range is an
     open item, the range Jamie named to the client, against the written monthly scope. The
     hours are an honest estimate of Jamie's own attention per month, not the sessions' time.
  3. Ask Jamie, in one batch: the price (the standard rate and any discounted rate, with the
     reason for the discount), the floor, whether a second option exists (the smallest honest
     version of the job), and his hours. Offer the computed default in each question. A
     session never sets the discount or the floor (why: the floor is where Jamie's judgement
     enters · 2026-10-21).
  4. Write `quote/quote.md` in the client's language: the price table, what the rate covers
     and what it does not, payment, ending, ownership and access, validity, the parties, law
     and language, from `terms.md`. A deviation from a term is named in the text. The file is
     the proposal's last section when rendered.
  5. Write `quote/economics.yaml` (internal): the anchor, the price, the hours, the effective
     hourly rate, the costs (model, hosting, other), the margin, the precedent read, and the
     open item the quote closes if any. An estimate is marked as an estimate. The monthly
     close replaces it with the measured figure.
  6. Write `quote/negotiation.md` (private, English): the positions (opening, standard,
     floor), the concessions in order with what each costs, the non-price positions, what the
     client may say and the answer, each deviation from a house rule with its reason, and a
     dated record of what was said.
  7. Commit on a branch with a message that starts `S4:`. Push. Open a PR against `main`.
     The PR body names the number proposed for any open item in `core/` that the quote
     touches. A session does not edit `core/`. Jamie closes the item there.
- A price below the band, or below the standard rate, is written in `negotiation.md` with its
  reason. The next quote reads it as precedent (`services.md`).
- The gate: Jamie sends the price with the proposal. A session never sends, never moves
  `stage`, never ticks a gate (boundary).
- Not yet walked: the invoices. The first one is written when Jamie moves the stage to
  `agreement`, one per payment the quote names, as `invoices/<n>.yaml`. The first agreement
  sets the file's shape.

## Outputs

- `clients/<slug>/quote/quote.md` · `economics.yaml` · `negotiation.md` (private) · `invoices/<n>.yaml` (structured, not prose; the dashboard reads them). `clients/CONTEXT.md` holds them.
