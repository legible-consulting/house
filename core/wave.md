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
| 1 | Remove the repo secret `VERCEL_TOKEN` and the variables `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` from the house: nothing reads them once `dashboard.yml` is gone | J | after the PR merges |
| 3 | Try the intake: an issue on the house labelled `research` with a link in the title; the routine runs daily at 06:00 UTC | J | not yet tried |
| 4 | Archive courseday and firedough, or give them a record and `live` | J | drift report says not archived |

Next: C3 (the `app` tier from what the three adopted repos share, then `v0.3.0`); D3 after the MotoArk call on 21 Oct; A2 (the move) when you take an afternoon; A4, A5, B3, F3 as listed below.

## A · Ownership and access

- [ ] **A2** (J) The business and the client repos move back to `k0d0minio`, private:
  house, library, berceo, vinecliff-vineyard, agorasim, courseday, firedough. remi-ai goes to
  Remi's own GitHub, as sustentus is in Sustentus's. GitHub Pro on `k0d0minio` gives branch
  protection on private repos. The runbook's phases 3 to 5 apply in reverse (`library`:
  `research/design-trail/06-org-runbook.md`). Check: `gh repo list legible-consulting` shows
  `blueprint` and `.github` only.
- [ ] **A3** (S, after A2) Every pointer follows: `repo:` in each record, `desk/mani.yaml`,
  `core/stack.md` layout, `core/lexicon.md` repo table, the sibling list in `CLAUDE.md`, the
  `.github` front page. Check: `check` green and `drift.sh` runs.
- [ ] **A4** (J) GPardas gets a new invite as a member once 2FA is on. Check: listed by
  `gh api orgs/legible-consulting/members`.
- [ ] **A5** (J) The `gh` login that sessions use carries `repo` and `workflow` only. A
  second login holds `admin:org` for runbook steps. Check: `gh auth status` shows no
  `admin:org` on the default login.

## B · Guards

- [ ] **B3** (J, after A2) Secret scanning and push protection on for every public repo
  that remains. Check: the repo's Settings → Code security shows both on.

## C · Deliver now (D2)

- [ ] **C3** (S, after C2) The `app` tier template is written from what the three adopted
  repos share. Tag `v0.3.0`. Check: `copier copy` of tier `app` into a scratch folder
  renders the same files.

## D · Core and sell

- [ ] **D3** (the real deal, after 21 Oct) Motoark walks `research` → `proposal`. S3's
  Process is written from that walk. Check: `clients/motoark/proposal/proposal.md` exists
  and S3 has no placeholder.

## E · The desk as an app

## F · Writing and hygiene

- [ ] **F3** (J) `library`: commit the ticked boxes in `07-infrastructure-setup.md`; delete
  `00-goal-questions.md` (superseded) and the two estate JSON snapshots once A2 is done.
  Check: `git status` clean in `library`.
