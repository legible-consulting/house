---
status: built
holds: []
---
# Quote

The quote produces the price, options and payment terms; the engagement's own economics (the price, hours, model cost, hosting, margin, and the actuals per month); and a private negotiation record (positions, concessions, a floor), so that Jamie quotes informed by the last deal and never goes below his floor.

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
     closed proposal. For a retainer: Jamie's hours of attention a month × the anchor, less
     the term discount (`services.md` § Retainer pricing), checked against the last retainer
     quote's `economics.yaml`. The hours are an honest estimate of Jamie's own attention per
     month, not the sessions' time.
  3. Ask Jamie, in one batch: the price (his hours, the committed term, and any discount
     beyond the term table with its reason), the floor, whether a second option exists (the
     smallest honest version of the job), and for a retainer whether hours beyond the promise
     are absorbed or billed at the anchor. Offer the computed default in each question. A
     session never sets a discount beyond the table or the floor (why: the floor is where
     Jamie's judgement enters · 2026-10-21).
  4. Write `quote/quote.md` in the client's language: the price table, what the rate covers
     and what it does not, payment, ending, ownership and access, validity, the parties, law
     and language, from `terms.md`. A deviation from a term is named in the text. The file is
     the proposal's last section when rendered: `render.yml` renders the proposal with it on
     the pull request, and the PDF is the run's artifact `pdf`, kept 14 days
     (`core/CONTEXT.md` § Outputs, `render/`). A client with no proposal gets the quote alone.
  5. Write `quote/economics.yaml` (internal): the anchor, the price, the hours, the effective
     hourly rate, the costs (model, hosting, other), the margin, the precedent read, and the
     open item the quote closes if any. An estimate is marked as an estimate. The desk reads
     three keys: `price.monthly` (a retainer or a role) or `price.total` (a build), and the
     estimates `hours.per_month` and `costs_monthly`, which the monthly close shows (why: the
     close sets the engagement against what was agreed; invoices and payments are handled
     outside the house · 2026-10-22).
  6. Write `quote/negotiation.md` (private, English): the positions (opening, standard,
     floor), the concessions in order with what each costs, the non-price positions, what the
     client may say and the answer, each deviation from a house rule with its reason, and a
     dated record of what was said.
  7. Commit on a branch with a message that starts `quote:`. Push. Open a PR against `main`.
     The PR body names the number proposed for any open item in `core/` that the quote
     touches. A session does not edit `core/`. Jamie closes the item there.
- A price below the band, or below the standard rate, is written in `negotiation.md` with its
  reason. The next quote reads it as precedent (`services.md`).
- The gate: Jamie sends the price with the proposal: Jamie places the PDF in the client's
  Drive folder with `core/render/place.sh`, then sends it. A session never sends and never ticks a
  gate (boundary).

## Outputs

- `clients/<slug>/quote/quote.md` · `economics.yaml` (the desk reads it) · `negotiation.md` (private). `clients/CONTEXT.md` holds them.
