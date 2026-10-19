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

## Now — open PRs, in merge order (as of 2026-10-19, late)

| Order | PR | Lands | Merge when |
|---|---|---|---|
| 1 | vinecliff-vineyard#25 | C2: vinecliff adopted | parked until GitHub Actions recovers and `ci` is green; its session removed the `lint` script to pass, so decide ESLint config or no lint when you unpark it |

Landed today and gone from the list: F1, B1, B2 (`v0.2.0`), C1 (`release.yml` and D2's
Process), F2. `guard-main` was dropped: `main` changes by PR only, by ruleset where the plan
allows one and by the boundary everywhere.

Next three: A1 (one command), D1 (one sitting with Jamie's answers, unlocks D3, E1 and F4),
C2 for berceo and agorasim (two sessions, after vinecliff is green).

## A · Ownership and access

- [ ] **A1** (J, today) Mika from owner to member. An owner reads every private repo,
  the house included. Check: `gh api orgs/legible-consulting/memberships/mikaelbelmont --jq .role`
  prints `member`.
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

- [ ] **D1** (J+S) `core/identity.md`, `services.md` (with pricing), `voice.md`, `terms.md`.
  Check: seven contracts' Inputs exist; `check` green.
- [ ] **D2** (S) `tickets.md` gets its producer: S3's Outputs. Every contract carries
  `status: stub | built` in its frontmatter. Check: the desk shows the count.
- [ ] **D3** (the real deal, after 21 Oct) Motoark walks `research` → `proposal`. S3's
  Process is written from that walk. Check: `clients/motoark/proposal/proposal.md` exists
  and S3 has no placeholder.

## E · The desk as an app

- [ ] **E1** (J+S) S1's model: `sell/01-prospecting/target-profile.md`, `cadence.md`, and
  the prospect schema (fields, the pool statuses from `clients/CONTEXT.md`, commission).
  Check: S1 has no placeholder.
- [ ] **E2** (S, after E1 and D1) The desk app: Astro with the Vercel server adapter, Neon
  Postgres, Neon Auth, three roles. Production deploy on push to `main`; the preview and the
  6-hour cron go. Pages: Jamie's clients table, a salesman's pool. "Ready for Jamie" opens
  one PR that creates the client folder, under a bot identity. Check: Jamie and one salesman
  sign in on the phone.
- [ ] **E3** (S) `sweep-deadlines.yml` writes `desk/glance/<date>.md`. Check: a glance exists
  the morning after the merge.

## F · Writing and hygiene

- [ ] **F3** (J) `library`: commit the ticked boxes in `07-infrastructure-setup.md`; delete
  `00-goal-questions.md` (superseded) and the two estate JSON snapshots once A2 is done.
  Check: `git status` clean in `library`.
- [ ] **F4** (S, after D1) The research intake: a Gmail label or one Sheet, a scheduled
  routine that drafts a verdict into `operator/research/inbox/` and opens one PR. The
  boundary gains that unattended run with its why. Check: one PR from a link shared from the
  phone.
- [ ] **F5** (S, own session) A mod that shows the session's pending gates in a band above
  the prompt. Check: a merge prompt is visible without scrolling.
