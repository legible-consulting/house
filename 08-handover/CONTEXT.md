---
status: built
holds:
  - pack.md
  - walkthrough.md
  - support-and-hosting.md
  - retainer-offer.md
  - review-request.md
---
# Handover

Handover produces the handover pack, the walkthrough, the support and hosting record, the retainer offer and the review and case-study request for a finished build, from the client folder, the client repo and the core, so that the relationship continues after the build and the portfolio grows from it.

## Inputs

- `clients/<slug>/record.md`: `slug`, `name`, `language`, `kind`, `stage`, `repo`, `vercel_project`, `collaborators`, and the body.
- `clients/<slug>/proposal/proposal.md` (the scope In and Out, the hosting pattern), `quote/quote.md` and `quote/economics.yaml` (the price, the retainer option when the quote has one, `costs_monthly`), `agreement/agreement.md` (the signed terms and any deviation).
- `clients/<slug>/kickoff/access-table.md` and `kickoff-note.md`: who holds each account, the secret names, the domains, the people.
- The client repo `k0d0minio/<slug>`, read only, by `gh api` or at the local lane clone: `README.md`, `.env.example`, `.icm/intake/` (the epics in `_done/` are what was built), the releases and their tags, and `.icm/uat/CONTEXT.md` when `uat` is yes. A handover session never writes to the client repo.
- `core/terms.md` (Payment, Validity and revisions, Ownership, Hosting and support, Ending an engagement), `core/services.md` (Retainer, Retainer pricing), `core/voice.md` (Register, The documents).
- The templates in this folder: `pack.md`, `walkthrough.md`, `support-and-hosting.md`, `retainer-offer.md`, `review-request.md`.
- Jamie's answers to the questions in Process.

## Process

- Start cold from this folder. Read only what Inputs names.
- The stages this module serves, and who moves them, are in `clients/CONTEXT.md` (the `handover` and `after` rows). A session moves `stage` only as that contract says.
- Handover is for `kind: build` only. A `retainer` or a `role` stays at `build` and gets no pack and no retainer offer. A `training` engagement closes in `training/CONTEXT.md` (`clients/CONTEXT.md`, `kind`).
- No handover was done in the house before this contract. It is written from the module's goal (library `research/design-trail/01-goals.md`, D3), from `core/terms.md` and from the release loop of `07-build/CONTEXT.md`. The first run is Agorasim's or Berceo's last release. What that run teaches goes back into this Process and the templates (why: a contract written before its first run describes work nobody did · 2026-10-25).
- The steps:
  1. **When handover starts.** The last release of the proposal's scope is merged (`07-build/CONTEXT.md`, step 7): each epic that kickoff cut from the proposal is in the client repo's `.icm/intake/_done/`, and the release pull request that carries the last of them is merged. For `uat: yes`, production also runs that release's tag (Jamie dispatched `promote.yml`), because the walkthrough is written against production. Read the record. `stage` is `build` or `handover`, and `kind` is `build`. If not, stop and ask Jamie. When `stage` is `build` and the last release is merged, the session moves `stage` to `handover` in its pull request (`clients/CONTEXT.md`).
  2. **Read.** The record, the proposal, the quote, `economics.yaml`, the agreement, the access table and the kickoff note. In the client repo: the production URL, the flows that the scope's In names, the secret names in `.env.example`, the last release's tag. Make one list of every account: what it holds, who holds it today, and who holds it after handover.
  3. **Ask Jamie, in one batch.** Each question has a default, read from the files:
     - Who holds each account after handover. Default: what the hosting pattern in the proposal puts in whose name (`core/terms.md` § Hosting and support).
     - The monthly cost of each account, and who pays it. Default: `economics.yaml` `costs_monthly`. A cost that is in neither file is `not checked`.
     - What Jamie is on the hook for after handover. Default: the support line of the pattern in `core/terms.md` § Hosting and support, and nothing more. For a Jamie-hosted build with state and no retainer, the outcome that the proposal or the agreement names: the move to client-owned, or free hosting that Jamie keeps working. When neither names it, the move to client-owned (`core/terms.md` § Hosting and support).
     - The retainer: offered or not, the hours a month, and the monthly scope. Default: offered. The hours and the scope from the quote's retainer option when it has one. Otherwise the hours that basic support needs, priced by `core/services.md` § Retainer pricing.
     - The people to offboard and their seats. Default: every name in `collaborators:` and in the access table, on every system the access table lists.
     - Open defects inside the written scope. Default: none, when no stub of the proposal's epics is open in the client repo. A defect inside the scope is fixed before handover, so handover waits for it (`core/terms.md` § Validity and revisions).
     - The final invoice: the second payment of `core/terms.md` § Payment, or the deviation that the agreement names. Default: Jamie sends it on the day he sends the pack. Invoices are outside the house.
  4. **Write the support and hosting record.** `clients/<slug>/handover/support-and-hosting.md`, from the template. One row per account: what it holds, who holds it after handover, the monthly cost, who pays it, and what Jamie is on the hook for. Then the transfers, and the access that ends on the day of the pack. Secret names only. A plaintext credential found in a file, a mail or the repo is flagged to Jamie in the pull request body and never copied (why: a secret in git outlives every rotation · `CLAUDE.md`, Boundaries).
  5. **Write the walkthrough.** `clients/<slug>/handover/walkthrough.md`, from the template: a numbered list that the client follows on the production URL. One action per step: where to go, what to do, what they see. The steps follow the scope's In, in the client's words (`core/voice.md`, Register), the tasks they do alone first. A step that needs an account names the account and who holds it, never a password.
  6. **Write the retainer offer.** `clients/<slug>/handover/retainer-offer.md`, from the template, when Jamie offers one. The monthly scope, the hours a month, the price per committed term and what basic support means in the hosting pattern. The price is the quote's retainer option when it has one. Otherwise it is computed by `core/services.md` § Retainer pricing from Jamie's hours. A number has one home: the offer names that number and never invents a discount. With no retainer offered, there is no file, and the record says what support exists without one. When the client says yes, Jamie sets `kind: retainer` and `stage: agreement` in the record by hand, and `05-agreement/CONTEXT.md` drafts the retainer agreement (why: a retainer is a new engagement with its own agreement, and a session never moves `stage` back · Jamie, 2026-10-26).
  7. **Write the pack.** `clients/<slug>/handover/pack.md`, from the template, in the shape of `core/voice.md` (The documents, Handover pack). The pack is one document: the render joins `pack.md`, `walkthrough.md`, `support-and-hosting.md` and `retainer-offer.md`, in that order (why: the client reads one document on the day the build ends, and each part keeps one home · 2026-10-26). Ownership is restated from `core/terms.md` § Ownership: the code, the content and the repository pass to the client on final payment.
  8. **Plan the offboarding.** The record's last section lists each person, each seat and the system it is on, for the day Jamie sends the pack. That day, Jamie removes every seat and empties `collaborators:` in the record (why: a seat left open after handover is access nobody watches · 2026-10-26). For the client-owned pattern, Jamie's own access ends that day too, unless a retainer runs (`core/terms.md` § Hosting and support). Each account that moves to the client is listed with the step that moves it: the repository transfer, the Vercel project transfer, the domain. Jamie does every step. A session never changes an account or a seat (boundary).
  9. **Commit.** On a branch, with a message that starts `handover:`. Set `next_action: send the handover pack` in the record. Push. Open a pull request against `main`. The body lists the questions for Jamie that his answers left open, numbered, each with a default, the offboarding list, and each credential found.
  10. **The review and case-study request, 30 days after the pack.** When the pack is sent, the record's `next_action` becomes `send the review request`, with `deadline` 30 days after the pack's date. On that date, a session writes `clients/<slug>/handover/review-request.md` from the template and opens a pull request with a message that starts `handover:`. Jamie sends it from his own mailbox. The request asks for a short review that Jamie may quote, for one figure the client allows, and for the use the client allows: `named`, `anonymous` or `none`, the values of `public:` (`clients/CONTEXT.md`). The reply stays in the mail, outside git. Jamie sets `public:` by a commit from it, and the case file is the portfolio's (`portfolio/CONTEXT.md`) (why: after a month the client has used the build, and a draft in the folder reaches the client's page at once (`desk/CONTEXT.md`), so a check-in written on day one reads false · 2026-10-26).
- The render: when `.github/workflows/render.yml` exists (`.icm/intake/render-and-publish/`), the pull request's render run makes the pack's PDF as a run artifact. Until then, Jamie renders by hand. The PDF goes in the client's Drive folder (`core/voice.md`). The review request is a mail and is not rendered.
- Every file in `clients/<slug>/handover/` is in the client's language, because the client reads it on their page in the desk (`desk/CONTEXT.md`, a client's page). The questions for Jamie and the pull request body are in English.
- The gate: Jamie answers the questions, reads the files, merges, renders the pack and sends it with the final invoice, removes every seat the same day, and sends the review request at 30 days. When the pack is sent, `stage` moves to `after` (`clients/CONTEXT.md`): Jamie sets it, or the next session that finds the sent mail moves it by a commit to `main`. A session drafts. It never sends to the client, never changes an account or a seat, never merges, never ticks a gate (boundary).

## Outputs

- `pack.md`, `walkthrough.md`, `support-and-hosting.md`, `retainer-offer.md`, `review-request.md`: the templates, with `{{PLACEHOLDERS}}` like `clients/_template/record.md`.
- `clients/<slug>/handover/pack.md`, `walkthrough.md`, `support-and-hosting.md`, `retainer-offer.md` when a retainer is offered, and `review-request.md` 30 days after the pack. `clients/CONTEXT.md` holds them.
- The pack's PDF, the four files joined, in the client's Drive folder.
- The house pull requests, with a message that starts `handover:`.
