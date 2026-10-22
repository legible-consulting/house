---
title: Wave 2
kind: wave
owner: jamie
date: 2026-10-19
source: desk/estate/audit-2026-10-19.md and Jamie's six notes of 2026-10-19
---
# Wave 2 — one real deal and one real build run through the house

One home for the current wave: what is open now, what is next, and whose hand each step is.
A box is Jamie's. A step leaves this file when it is done and its result lives in the file
that owns it. When the wave ends, this file is rewritten for the next one (why: a plan with
two homes drifts, and a finished step kept here is a decision trail · 2026-10-19).

Done when: motoark has walked `research` → `proposal` in the folders; vinecliff ships a
release through D2; Jamie and one salesman sign in to the desk; every repo is where its owner
wants it.

Legend: **J** Jamie's hand · **S** a session · **J+S** Jamie's answers, a session's writing.

## Now (as of 2026-10-20 afternoon)

No PR is open. Landed today: D1, D2, E1, E2 (the Astro desk, then its Next.js replacement with Tailwind, shadcn/ui, Motion and the password reset in house#20, the Sell page in house#21), E3 (the first glance exists), F4, the pitch drafts (house#18), and C2 for all three repos (vinecliff#25, agorasim#198, berceo#67).

| Order | What | Whose hand | State |
|---|---|---|---|
| 1b | Merge blueprint#7 (the ticket loop stands alone, gates at the top of the pull request, the platform tier), then tag the merge commit `v0.4.0` and push the tag | J | open |
| 1c | After the tag: tick and merge the four `v0.4.0` pull requests, berceo#70, agorasim#200, vinecliff#27 and remi-ai (the platform adoption). site-proof follows when the proof repo is next touched | J | open |
| 1d | Merge house `d2-gates-loop` (D2 says the loop in the blueprint's words) and the desk work view (`/work`: tickets and pull request gates per repo). Then give `ESTATE_PAT` and `ESTATE_PAT_SUSTENTUS` the `Pull requests` permission, read to show the gates and write to tick them from the desk | J | open |
| 3 | Try the intake: an issue on the house labelled `research` with a link in the title; the routine runs daily at 06:00 UTC | J | not yet tried |

Landed 2026-10-21: C3 (blueprint#6, tag `v0.3.0`), the intake convention in the house (house#23), A2 (every client repo is `k0d0minio/<slug>`; the org is the house, the blueprint, the library, `.github`, site-proof and shared projects), A3 (the pointers, house#24), the stray `BUILD.md` files deleted, the house's Vercel credentials removed. Next: D3 after the MotoArk call; A4, A5, B3, F3 as listed below. The platform tier is written in blueprint#7. remi-ai adopts it in its pull request. sustentus follows once Jamie decides how its own org adopts the loop.

## A · Ownership and access

- [ ] **A4** (J) GPardas gets a new invite as a member once 2FA is on. Check: listed by
  `gh api orgs/legible-consulting/members`.
- [ ] **A5** (J) The `gh` login that sessions use carries `repo` and `workflow` only. A
  second login holds `admin:org` for runbook steps. Check: `gh auth status` shows no
  `admin:org` on the default login.

## B · Guards

- [ ] **B3** (J, after A2) Secret scanning and push protection on for every public repo
  that remains. Check: the repo's Settings → Code security shows both on.

## C · Deliver now (D2)

## D · Core and sell

- [ ] **D3** (the real deal, after 21 Oct) Motoark walks `research` → `proposal`. S3's
  Process is written from that walk. Check: `clients/motoark/proposal/proposal.md` exists
  and S3 has no placeholder.

## E · The desk as an app

Landed 2026-10-21 (house PR, C3): the glance, the Friday review, the monthly close, the
estate and the client's page in the app; the deal's stage on a handed-off pool row; the
Healthchecks ping. Landed 2026-10-21 (house PR, E6 and E7): E7, the review and the close as
files: `rhythms.yml` commits `desk/review/<ISO week>.md` on Fridays and
`desk/close/<YYYY-MM>.md` on the 1st with the app's own rules, and `/review` and `/close`
render the file when one exists (`desk/CONTEXT.md`, Outputs). The code of E6 landed too.
What is left is Jamie's hand.

- [ ] **E4** (J) Set the roles in the Neon console, project `legible-desk`, database
  `neondb`: run `desk/app/db/schema.sql` once (it adds `users.client`), then the three upserts
  at its foot with the real emails: Jamie as `jamie`; each salesman as `salesman` with a
  handle; a client as `client` with the folder's slug. Check: the desk shows Jamie the
  clients table, not the client placeholder.
- [ ] **E5** (J) A Healthchecks check with a daily period and a one-hour grace, its ping URL
  stored as the house's Actions secret `HEALTHCHECKS_URL`. Check: the next `sweep-deadlines`
  run ends with the ping step green.
- [ ] **E6** (J) The client repos' status in the desk (D2's release and check runs). The code
  is in: the clients table and the client's page read each repo's latest release and
  `check.yml` run per request (`desk/app/lib/repos.ts`) with one token per owner, and each
  cell says which variable is not set until the tokens exist. The tokens are what remains:
  1. Create two fine-grained tokens, read-only, repository permissions Contents, Actions and
     Metadata: one with resource owner `k0d0minio`, all repositories; one with resource owner
     `sustentus`. A `sustentus` owner approves the second when the org asks for approval.
  2. Store them as the Vercel project's variables `ESTATE_PAT` and `ESTATE_PAT_SUSTENTUS`
     (Production and Preview), then redeploy.
  3. Add the two names to `desk/app/.env.example`. A session cannot read that file.

  Check: a client's page names the last release and whether `check.yml` is green.

## F · Writing and hygiene

- [ ] **F3** (J) `library`: commit the ticked boxes in `07-infrastructure-setup.md`; delete
  `00-goal-questions.md` (superseded) and the two estate JSON snapshots once A2 is done.
  Check: `git status` clean in `library`.
