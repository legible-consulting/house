# Berceo: kickoff note

The working agreement as it stands on 2026-10-23. The build started in September 2026 before the
house existed, on the devis of 27 August 2026 and without a signed agreement. This note records
the rhythm, not the terms. The terms are in `quote/quote.md` and `agreement/agreement.md`.

## Roles

- **Alix Hahusseau and Jordane** decide what the product says and does. They decide together, by
  e-mail. They test on UAT and write their feedback as one document per round.
- **Surya** (Chloé Sanfilipo, Romane) owns the words and the look: the editorial and SEO guide,
  the brand identity, the web art direction, the image bank. The kick-off brief with Surya ran on
  2026-09-11.
- **Jamie Nisbet** builds alone. He owns the repo `k0d0minio/berceo`, the Vercel team `kodominio`,
  the Neon projects, the merge and the promotion to production.

## Rhythm

- 5 h/week of continuous development. Revisions are not counted. In-scope defects are fixed
  regardless.
- Two dates: a soft launch in mid-December 2026 with the first professionals, the public push in
  January 2027. A written legal opinion on chapter 5 of the discovery questionnaire blocks the
  launch, not the build.
- Feedback round 1 arrived on 2026-10-23 as `feedback-round-1.pdf` in the Drive folder `berceo`.
  A feedback request supersedes an earlier requirement, except the insurance wording, which stays
  out until a contract exists (D-8, Jamie 2026-10-23).

## How work flows

1. The founders write their feedback. It lives in the Drive folder `berceo`. It is never committed
   to the repo.
2. Jamie scopes the feedback. One round becomes epics: folders under `.icm/intake/<epic-slug>/` in
   the client repo, each with a `breakdown.md` and one stub per unit of work. The breakdown's
   `source:` line names the feedback document.
3. One stub is one branch and one pull request. `.icm/scripts/new-run.sh` starts it. A `medium`,
   `high` or `research` stub, or one that leaves a decision open, waits for **Spec approved**.
4. CI runs `check-client` and Vercel builds the preview. Every merge to `main` deploys UAT at
   `uat.berceo.be`. Jamie ticks **Ready to merge** and merges. A session never ticks a gate and
   never merges.
5. The founders say yes on UAT. Jamie records it with `.icm/scripts/promote.sh approve` and
   publishes the Release on GitHub. The release workflow migrates, promotes the staged build and
   announces. The rule is `.icm/_shared/promotion.md` in the repo.

## Questions for the founders

- A session writes them numbered, one per line, each with a default answer, in the breakdown
  under « What I understood » or in the pull request under « Questions ».
- They reach the founders in French, by e-mail from Jamie. Jamie carries their answers back into
  the breakdown.

## What the client owes before launch

- The written legal opinion on chapter 5 (ONE declaration, platform-work directive, collaborative
  economy, DAC7, CGU, DSA, P2B, accessibility). The criminal-record extract 596.2 is not stored
  until then.
- The insurance contract. The site carries no insurance wording until it exists.
- The legal texts: CGU, privacy policy, cookie policy. The two legal pages are placeholders.
- The Stripe account in Berceo's name. UAT runs on a test key.
- The Comodo font files from Surya. Fraunces stands in.

## The estate

- Repo: `k0d0minio/berceo`, blueprint tier `app`, tag v0.6.0 since 2026-10-22.
- Vercel team `kodominio`, project `berceo`: production `www.berceo.be`, UAT `uat.berceo.be`, one
  preview per pull request.
- Two Neon projects: production, and non-production for UAT and the previews (one branch per
  preview, cleaned by a workflow).
- Secret names only, in `kickoff/access-table.md`. Values live in Vercel and GitHub settings.
