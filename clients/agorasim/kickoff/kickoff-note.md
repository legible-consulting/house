# Agorasim: kickoff note

The working agreement as it stands on 2026-10-23. The build started before the house existed:
the proposal was accepted on 2026-07-23 and the first commit is 2026-07-01. This note records
the rhythm, not the terms. The terms are in `proposal/proposal.md` and `agreement/agreement.md`.
The rhythm comes from the ways-of-working guide "How We'll Work Together" of 27 July 2026
(How-We-Will-Work-Together.docx at commit 8f3b477 of `k0d0minio/agorasim`, removed from the tree
2026-09-26), from the client repo's `CLAUDE.md` and `.icm/_shared/promotion.md`, and from Jamie's
answers of 2026-10-23.

## Roles

- **Diogo Trajano** decides. He owns the accounts (registrar, Workspace, Stripe) and writes the
  feedback.
- **Rita** operates the admin from her phone. Her phone is the reference device.
- **Jamie Nisbet** builds alone, owns the repo `k0d0minio/agorasim`, the Vercel team `kodominio`
  and the merge. He signs off on the client's behalf after their yes.

## Rhythm

- The channel is WhatsApp, in Portuguese. Email reaches info@agorasim.pt.
- Feedback comes in batches: one list per round, as the guide of 27 July asked. Round 1 arrived
  on 2026-10-12 as a WhatsApp export, filed in Drive as `feedback-round-1.pdf`.
- No fixed call. No fixed date. Go-live happens when Agorasim approves UAT (Jamie, 2026-10-23).

## How work flows

1. A feedback round becomes epics and stubs under `.icm/intake/` in the client repo: one folder
   per epic with a `breakdown.md`, one stub per unit of work, `triage/` for one-offs. The
   breakdown's `source:` line names the Drive file.
2. One stub is one branch and one pull request. `.icm/scripts/new-run.sh` starts it. A
   `medium`, `high` or `research` stub, or a stub that leaves a decision open, carries the
   **Spec approved** gate: the session writes what it will build and its numbered questions,
   each with a default, and stops until Jamie ticks.
3. CI runs `check-client` and Vercel builds a preview. Nothing runs locally.
4. Jamie tests the preview, ticks **Ready to merge** and merges. A session never ticks a gate
   and never merges.
5. Every merge to `main` deploys UAT at `uat.agorasim.pt`. The client tests there. Production
   is built from the same commit and held staged.
6. When Diogo and Rita say yes on UAT, Jamie runs `.icm/scripts/promote.sh approve --by "<who>"`,
   which drafts the Release, and publishes it on GitHub. `release.yaml` migrates, promotes the
   staged build and announces. The last production release is 2026-09-24.

## Questions for the client

- A session writes them numbered, one per line, each with a default answer, in the stub's
  `Notes` or the breakdown's `What I understood`.
- They reach Diogo and Rita in Portuguese, over WhatsApp, from Jamie. Jamie carries the answers
  back into the stub.
- The twelve questions of August 2026 are not sent as a pack. They are open points in
  `research/profile.md`. A stub asks the ones it needs.

## Scope rules

- A bug inside the six features is fixed free. A new request is quoted. The guide of 27 July
  says so and Jamie confirmed it on 2026-10-23.
- The blog batch, the social generator and auto-poster, and SMS are owed inside the €2,000 and
  wait until after go-live.
- Gift vouchers, a review wall and a referral programme are out. A connection that loads Google
  reviews on the experience page is in (Jamie, 2026-10-23).
- Client-facing text in `pt-PT` with the `en` version kept in sync. The admin is Portuguese
  only, phone-first. Code, commits and notes in English.

## The estate

- Repo: `k0d0minio/agorasim`, private, blueprint tier `app`, tag v0.6.0 since 2026-10-22.
- Vercel team `kodominio`, one project `agorasim`, custom environment `uat`.
- Neon org Kodominio: `agorasim` (production) and `uat-agorasim`.
- Stripe: Jamie's platform account, live-activated 2026-09-11. Agorasim's own account exists and
  is connected (Jamie, 2026-10-23). Previews and UAT run on sandbox keys.
- Secret names only, in `kickoff/access-table.md`. Values live in Vercel and GitHub settings.
