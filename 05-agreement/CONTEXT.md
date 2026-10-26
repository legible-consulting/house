---
status: built
holds:
  - "agreement.*.md"
---
# Agreement

The agreement produces the signable contract for a deal the client said yes to, in the client's language, from the accepted proposal and its price section, with every clause restating `core/terms.md`, so that the client signs exactly what was agreed and nothing is written from memory.

## Inputs

- `clients/<slug>/record.md` (`name`, `language`, `kind`, `stage`, `salesman`, `commission`).
- `clients/<slug>/proposal/proposal.md`, the accepted proposal, and `clients/<slug>/quote/quote.md`, its price section. `quote/negotiation.md` for what was said after the quote.
- `core/terms.md`, `core/identity.md` (The entity), `core/voice.md` (The documents); `core/services.md` (Retainer pricing, Training pricing) for a retainer or a training week.
- The template for the record's `language` in this folder: `agreement.en-GB.md`, `agreement.fr-BE.md` or `agreement.pt-PT.md`.
- Jamie's answers to the questions in Process.

## Process

- Start cold from this folder. Read only what Inputs names.
- First walked for MotoArk (`kind: retainer`, en-GB, 2026-10-26). The variant clauses for a
  build and a training week are learned from the three agreements written by hand before this
  stage existed: Agorasim (a commission instrument, in English), Berceo (fr-BE, a build) and
  Euro Register (fr-BE, a training week).
- The steps:
  1. Read the record. `stage` is `proposal` or `agreement`: the client said yes, or Jamie says
     the yes is coming. Read the proposal, the quote and the negotiation record. Check the
     proposal's `valid_until`. If the yes came after it, stop and ask Jamie: the number is set
     again, never silently honoured (`terms.md` § Validity and revisions).
  2. Choose the template by the record's `language`. Another language, or an empty one: stop
     and ask Jamie (why: the text in the client's language is the signed one, and a session
     does not translate a contract on its own · `terms.md` § Law and language, 2026-10-26).
  3. Choose the clauses by `kind`. Each variant block in the template starts with
     `<!-- kind: <kind>[, <kind>] -->` and ends with `<!-- end kind -->`. Keep the blocks
     that name the record's `kind`, drop the others, and drop the markers.
     - `build`: the scope is the proposal's In and Out; one revision round, defects inside the
       scope fixed before handover, no warranty after it; 50 % on signature and 50 % at
       handover; the hosting pattern the proposal names.
     - `retainer`: the monthly scope by reference to the proposal (written at the start of
       each month, checked at its end); the price and the hours a month by reference to the
       quote, with the option the client chose named; monthly in advance; the hosting pattern
       the proposal names; the notice period and the early exit from a committed block from `terms.md` § Ending an engagement.
     - `training`: the week (or the day) as the proposal describes it, the dates, the
       materials and the starter kit, and one attendance record (attestation) per person;
       the travel line and the hotel from `services.md` § Training pricing; 50 % on signature
       as the deposit and 50 % after delivery; the workshop's cancellation scale in place of
       the notice period.
     - Every kind: the agreement prevails over the proposal where they differ;
       confidentiality and the liability limit (`terms.md` § Confidentiality and liability).
     - `role` or an empty `kind`: stop and ask Jamie. A role is agreed per case and has no
       template (`services.md`, The lines).
  4. Fill each placeholder from its home. The parties: the client's legal entity, its
     registration number, address and signatory from Jamie's answers, and Jamie from
     `identity.md` § The entity (the legal name and the NIF, never the IBAN, never the trade
     name alone). The proposal's title and dates from its frontmatter. The price, the option,
     the payment schedule and the hours from `quote.md`. The hosting pattern from the
     proposal. A number has one home: the agreement names the quote's number and never
     computes a new one.
  5. Ask Jamie, in one batch, what the record, the proposal and the quote do not settle: the
     client's legal entity and who signs for it (name and title), the start date, the option
     the client chose when the quote offers two, and what the proposal left open. Offer a
     default in each question, read from the record, the proposal or the quote.
  6. A deal that needs a clause `terms.md` does not hold (a deviation the negotiation
     record names, a clause the client asks for) gets it in the client's agreement only, marked `[LAWYER]`, and
     the PR body proposes the term for `terms.md` as a question with a default. A session
     writes a term into `terms.md` only on Jamie's answer, by PR (`core/CONTEXT.md`), and the
     templates follow it (why: a term written in one agreement and not in `terms.md` is a
     term the next agreement forgets · 2026-10-26).
  7. Write `clients/<slug>/agreement/agreement.md` in the client's language. Frontmatter:
     `title`, `kind: agreement`, `client`, `language`, `date` (the day of the draft; Jamie
     sets the day he sends), `proposal` (the path of the accepted proposal), `status: draft`. Keep every
     `[LAWYER]` marker of the template. Jamie removes a marker when he has the clause read, or
     when he decides it needs no reading.
  8. Commit on a branch with a message that starts `agreement:`. Push. Open a PR against
     `main`. The PR body lists the open values as numbered questions, each with its default,
     and any term proposed for `terms.md`.
- The render: when `.github/workflows/render.yml` exists
  (`.icm/intake/render-and-publish/render-stack.md`), the pull request's render run makes the
  PDF as a run artifact. Until then Jamie renders by hand. The accepted proposal, with its
  price section, goes out with the agreement as its attachment (`voice.md`, The documents).
- The signature: Jamie sends the agreement for signature through Google Docs eSignature and
  signs it there (the library's audit decision of 2026-10-14). The signed copy goes in the
  client's Drive folder. Jamie writes its link into `record.md` as `agreement_drive` and sets
  `agreement_signed: true` (`clients/CONTEXT.md`, the agreement row).
- The commission: when `commission.sourced_by` names a salesman, Jamie writes the total into
  `commission.owed` at signature (`01-prospecting/prospect.md`, The salesman's deal). The PR
  body may propose the number. A session never writes it.
- The gate: Jamie reads the draft, answers the questions, sends and signs. A session drafts
  into the folder. It never sends, never signs, never places a file in Drive without asking,
  never ticks a gate (boundary). `stage` moves as `clients/CONTEXT.md` says: to `kickoff`
  when `agreement_signed` is `true`.

## Outputs

- `05-agreement/agreement.<language>.md`: the templates, one per language Jamie works in (`identity.md` § Languages). Each clause cites the home of the term it restates in an HTML comment that the render drops.
- `clients/<slug>/agreement/agreement.md`: the draft for one deal, in the client's language, `status: draft` until Jamie sends. `clients/CONTEXT.md` holds it.
- The signed PDF in the client's Drive folder, its link in `record.md`. Never in git (why: a signed contract carries signatures and the client's registration; the record points, Drive holds · 2026-10-26).
