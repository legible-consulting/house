# Vine Cliff Vineyards: kickoff note

The working agreement as it stands on 2026-10-26, from the kickoff answers of 2026-10-26
(`kickoff-2026-10-26.md`, given by Jamie after his calls with the owner). The build started in
July 2026, before the house existed, as Jamie's pitch. This note records the rhythm, not the
terms. The folder holds no proposal and no agreement. The terms are in the offer "Vine Cliff,
booked direct" of 2026-10-12, in Jamie's Drive folder `vinecliff`.

## Roles

- **Billy Carlson** (William Patrick Carlson) decides what the site says and does, alone. He
  tests the work and gives the yes before it reaches production.
- **Billy** owns the words and the look: his logo (by Julie Zack, 2019, made for him by his
  sister), his photos, his rates, rules and policies. The site changes around the logo
  (`.icm/docs/brand.md` in the repo).
- **Margaret** is named in the offer for an admin login. Her role is not checked.
- **Jamie Nisbet** builds alone. He owns the repo `k0d0minio/vinecliff`, the Vercel team
  `kodominio`, the Neon project, the merge and the release.

## Rhythm

- The channel is email, in English.
- Jamie turns what Billy asks into tickets, and the tickets are built over the following week
  (demo call, 2026-10-22).
- Go-live: the end of December 2026, ahead of the 2027 season (Jamie, 2026-10-26).

## How work flows

1. What Billy asks, by email or on a call, becomes epics under `.icm/intake/` in the client
   repo: one folder per epic with a `breakdown.md`, one stub per unit of work, `triage/` for
   one-offs. The breakdown's `source:` line names the call or the email. Billy's documents
   stay in Drive and never enter the repo.
2. One stub is one branch and one pull request. `.icm/scripts/new-run.sh` starts it. A
   `medium`, `high` or `research` stub, or a stub that leaves a decision open, carries the
   **Spec approved** gate.
3. CI runs `check-client` and Vercel builds a preview. Nothing runs locally.
4. Jamie tests the preview, ticks **Ready to merge** and merges. A session never ticks a gate
   and never merges.
5. With `uat: yes` (once conformance updates the repo, and `uat-environment` is built), every
   merge deploys UAT at `uat.vinecliffvineyard.com`. Billy tests there. Jamie records his yes
   with `.icm/scripts/promote.sh approve --by "Billy Carlson"`, merges the release pull
   request and dispatches `promote.yml`. Until then, every merge to `main` reaches production
   and migrates its database, and the previews read the production database.

## Questions for the client

- A session writes them numbered, one per line, each with a default answer, in the breakdown
  under « What I understood » or in the pull request under « Questions ».
- They reach Billy in English, by email, from Jamie. Jamie carries the answers back into the
  stub or the breakdown.

## Scope rules

- A defect inside the written scope is fixed before go-live. A change outside it is a new
  conversation (the offer: two rounds of changes, and "anything inside the scope that's simply
  wrong gets fixed regardless").
- The first epic is `go-live`. The offer's other items (one calendar with Airbnb and VRBO, card
  deposits, taxes on the total, the videos, a password reset by email, Margaret's login, the
  help page and the walkthrough) are not in it. Whether they become a second epic after
  go-live is a question in the breakdown.
- Not included, from the offer: photography and copywriting of Billy's own story, marketing,
  replacing Airbnb or VRBO, taxes and permits, other people's fees.
- Client-facing text in en-US. Code, commits and notes in English.

## What the client owes before launch

- The photos that replace the placeholders.
- The real rates, rules, guest caps and policies, typed in the admin.
- The names of the two farmhouse units.
- The business's legal name for the terms.
- A new admin password, once `admin-password-change` is live.
- His yes on the terms and the privacy policy.

## The estate

- Repo: `k0d0minio/vinecliff`, private. `.copier-answers.yml` records blueprint v0.6.0 with
  the old answers (`tier: app`, `slug: vinecliff-vineyard`). The target answers are
  `release: yes` and `uat: yes`. Conformance updates the repo.
- Vercel team `kodominio`, project `vinecliff`: `vinecliff.vercel.app` today,
  `vinecliffvineyard.com` at go-live, `uat.vinecliffvineyard.com` for UAT.
- Neon project `broad-lake-67509282` in the Kodominio org: one branch, `main`, today. A `uat`
  branch comes with `uat-environment`.
- Secret names only, in `kickoff/access-table.md`. Values live in Vercel and GitHub settings.
