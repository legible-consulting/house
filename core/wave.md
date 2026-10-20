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

## Now (as of 2026-10-20 morning)

| Order | What | Whose hand | State |
|---|---|---|---|
| 1 | agorasim#198, C2 adoption | J merges | green, read the kept assets in its body |
| 2 | berceo#67, C2 adoption | J | blocked: the `main` ruleset requires a `Vercel` status and Vercel posts none. Connect the Vercel project to the org repo or drop that required check. Close berceo#66 (older duplicate) when 67 merges |
| 3 | Run `sweep-deadlines` once from the Actions tab | J | the first glance lands in `desk/glance/` |
| 4 | Paste `core/setup/cloud.sh` into the `legible` environment again | J | the research intake routine needs the fetch tool |
| 5 | Sign in to the desk at desk.jamienisbet.com (account contact@jamienisbet.com, password set in the Neon console), then say so and a session sets your role to `jamie` | J | the Astro desk is live; `NEON_AUTH_COOKIE_SECRET` was the missing variable, fixed 2026-10-20 |
| 7 | The desk is rebuilt in Next.js with Tailwind, shadcn/ui and Motion, in its own session; it goes live today and the Astro desk dies with its merge. `core/stack.md` records the stack in the same PR (Jamie, 2026-10-20) | S, then J merges | running |
| 6 | The pitch drafts session (three touches, three languages) is unblocked now that voice and services are on main | J starts it | optional, S1 extra |

Landed on 2026-10-20: D1 (core files), D2 (contract status, tickets producer), E1 (S1 model), E2 (desk app), E3 (sweep), F4 (research intake). On 2026-10-19: F1, B1, B2, C1, F2, A1, vinecliff adopted, the F5 gates band.

Next: C3 (the `app` tier from what the three adopted repos share) once 1 and 2 merge; D3 after the 21 Oct call; A2 (the move) when you take an afternoon for it.

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

- [ ] **C2** (S, one PR per repo; J merges) Adopt vinecliff (in vinecliff-vineyard#25,
  parked), then berceo, then agorasim: `BUILD.md` from `clients/<slug>/tickets.md`, the
  guards in `.claude/`, `ci.yml` with the tier, release-please, `.copier-answers.yml`.
  Assets the goals dropped (`.opencode`, `opencode.jsonc`, `AGENTS.md`) go in the same PR.
  Check: `ci` green on each; the drift report reads `current`.
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
