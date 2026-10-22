---
title: Wave 2
kind: wave
owner: jamie
date: 2026-10-22
source: desk/estate/audit-2026-10-22.md and Jamie's answers of 2026-10-22
---
# Wave 2 — one real deal and one real build run through the house

One home for the current wave: what is open now, what is next, and whose hand each step is.
A box is Jamie's. A step leaves this file when it is done and its result lives in the file
that owns it. When the wave ends, this file is rewritten for the next one (why: a plan with
two homes drifts, and a finished step kept here is a decision trail · 2026-10-19).

Done when: the factory is done, then motoark has walked `research` → `proposal` →
`agreement` in the folders, vinecliff ships a release through D2, Jamie and one salesman
(Cunha) sign in to the desk, and every repo is where its owner wants it. The factory is done
when (Jamie, 2026-10-22): no contract on the customer path is a stub (S2, S5, D1, D3, C3),
this Now table has no open W row, the desk shows truth to all three roles, and the
blueprint's functionality questionnaire is designed and reviewed.

Legend: **J** Jamie's hand · **S** a session · **J+S** Jamie's answers, a session's writing.

## Now (as of 2026-10-22, after the audit)

Client work (MotoArk's send, Vinecliff's kickoff, Berceo's and Agorasim's releases) waits
until the W rows are done. The records and the glance carry it meanwhile (why: the estate is
the factory; a client run through a half-built factory proves nothing · 2026-10-22). W is
this week, by Fri 24 Oct. N is next week. The detail and the prompt of each row is the
audit section named in its What column.

| Order | What | Whose hand | State |
|---|---|---|---|
| W1 | The research inbox from the phone: the desk becomes installable with a `share_target`, a shared link lands in a Neon `inbox` table, `operator/research/intake.md` reads that table with `gh api` only. Audit § O1. Check: a link shared from the phone is in the desk's inbox and the next 06:00 UTC run opens a PR with its draft | S | open |
| W2 | `clients/motoark/record.md` reads `stage: proposal`, the stage its files hold. Audit § C2. Check: the next glance says MotoArk (proposal) | J | open |
| W3 | C3's Process written from the running desk, `status: built`, `quote/quote.md` leaves the client page. Audit § C3. Check: no placeholder line, `/clients/motoark` shows the proposal only | S | open |
| W4 | S2's Process from the MotoArk walk, `status: built`. Audit § S2 | S | open |
| W5 | S5: the Process, the agreement templates in en-GB, fr-BE and pt-PT from the legacy ones against `core/terms.md`, MotoArk's draft on the branch. `status: built`. Audit § S5. Check: a yes on Friday has a document to render on Monday | S | open |
| W6 | The render stack in `core/render/` and `render.yml`: a changed proposal, quote or agreement renders to a branded PDF and lands in Drive when `GOOGLE_SA_KEY` is set. Audit § S3. Check: the MotoArk proposal PDF is a run artifact on the PR | S | open |
| W7 | A Google service account on the `Clients` Drive folder, its key as the house secret `GOOGLE_SA_KEY`. Audit § S3 | J | open |
| W8 | D1's Process, the access-table, kickoff-note and client questionnaire templates, `status: built`. Audit § D1 | S | open |
| W9 | D3's Process and its five templates, `status: built`. Audit § D3 | S | open |
| W10 | Neon, project `legible-desk`: Cunha as `salesman` with handle `cunha`, one client account linked to a folder. Audit § C3. Check: Cunha lands on `/pool`, the client lands on its page | J | open |
| W11 | The handoff walked once with a test row as Cunha: the desk opens the PR, Jamie merges, the row reads `handed off`, the test folder is deleted. Audit § S1 | J+S | open |
| W12 | The blueprint's functionality questionnaire designed and reviewed: the question bank in `copier.yml`, one template root, the legacy UAT and promotion files behind `uat`, two proof renders in `check.yml`, and the MIT `LICENSE`. Audit § Blueprint. Check: `check.yml` green on the PR, every question has a default and a help line | S, J reviews | open |
| W13 | Berceo, Agorasim, Vinecliff and Remi AI private. Audit § D4. Check: `gh repo list k0d0minio --visibility public` lists none of them | J | open |
| W14 | `desk/mani.yaml` tags Sustentus `client`, `drift.sh` reads it for status only. Then pull `site-proof`, run `drift.sh`, conform `site-proof` to v0.6.0, re-run. Audit § D4. Check: every live and proof row says current against v0.6.0 | S, then J | open |
| W15 | Cloud sessions read the estate read-only: the Claude GitHub App on `blueprint`, `library`, `.github` and `site-proof`, the rule in `CLAUDE.md` gains its line. Audit § 8. Check: `gh api repos/legible-consulting/blueprint --jq .full_name` answers from a `legible` session | J+S | open |
| W16 | The desk as a phone app and the design restyle, from `~/Desktop/legible-consulting/desk-design-prompt.md` in its § 11 order, after W1 and W3 merge. Audit § C3. Check: the desk installs on the phone and every route passes the file's § 7 | S | open |
| N1 | The blueprint build: every question group's files, `copier update` on the four repos with their answers, `tier` leaves `core/lexicon.md`, `conform.sh` and `check-client.yml`, `deliver/02-sdlc/CONTEXT.md` reads flags. Audit § Blueprint, § D2 | S | open |
| N2 | MotoArk after the call: `next_action` and `deadline` set, the PDF sent, on a yes the agreement rendered and sent for signature, `stage: agreement`, `invoices/1.yaml` and its PDF. Audit § C2, § S4, § S5 | J, then S | open |
| N3 | Vinecliff kickoff: the owner answers the questionnaire, `clients/vinecliff/kickoff/`, the first epic in the repo, `next_action` set. Audit § D1 | J+S | open |
| N4 | Berceo #68 merged as changelog and tag or closed, then the next promotion through `promote.sh`. Agorasim's `go-live` epic through the loop. Audit § D2 | J | open |
| N5 | O1's verdicts seeded from the library's tool research. The dormant `k0d0minio` repos enter the manifest or the manifest says why not. Audit § O1, § D4 | S | open |

## A · Ownership and access

- [ ] **A4** (J) GPardas gets a new invite as a member once 2FA is on. Check: listed by
  `gh api orgs/legible-consulting/members`.
- [ ] **A5** (J) The `gh` login that sessions use carries `repo` and `workflow` only. A
  second login holds `admin:org` for runbook steps. Check: `gh auth status` shows no
  `admin:org` on the default login.

## B · Guards

- [ ] **B3** (J, after W13) Secret scanning and push protection on for every public repo
  that remains: `blueprint`, `.github`, `english-with-jamie`, `garmani`. Check: the repo's
  Settings → Code security shows both on.

## F · Writing and hygiene

- [ ] **F3** (J) `library`: commit the ticked boxes in `07-infrastructure-setup.md`; delete
  `00-goal-questions.md` (superseded) and the two estate JSON snapshots. Check: `git status`
  clean in `library`.
- [ ] **F4** (J) The stale worktrees: five under `house/.claude/worktrees/`, twelve under
  `~/Desktop/Apps/.claude/worktrees/`. `git worktree remove` each, then `git worktree
  prune`. Check: `git worktree list` prints the main checkout only, in both.
