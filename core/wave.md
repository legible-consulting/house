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

## Now (as of 2026-10-22)

From the estate stocktake of 2026-10-22. W is this week, N is next.

| Order | What | Whose hand | State |
|---|---|---|---|
| W1 | Send MotoArk the demo video and the discounted 3-month retainer rate before the call on Fri 23 Oct 09:00 Lisbon, then move `clients/motoark/record.md` to `stage: proposal`, the stage its files hold. Check: `.stage` prints `proposal` and `next_action` names the step after the call | J | open |
| W2 | Give `ESTATE_PAT` and `ESTATE_PAT_SUSTENTUS` the Pull requests permission, read and write, and Commit statuses read on GitHub, then redeploy the desk. Check: desk.jamienisbet.com/work shows the gates of each client repo's pull requests | J | open |
| W3 | Set the desk's roles in the Neon console, project `legible-desk`, database `neondb`: run `desk/app/db/schema.sql` once, then the three upserts at its foot with the real emails. Check: the desk shows Jamie the clients table, not the client placeholder | J | open |
| W4 | Run vinecliff#29 (`triage/declare-node-env-in-env-example`) through the loop with `new-run.sh` and `close-out.sh`. Check: vinecliff#29 is merged and its stub is in `.icm/intake/_done/` on `main` | S | open |
| W5 | Merge site-proof#1 so the proof repo tracks blueprint `v0.5.0`, then run `bash deliver/04-conformance/drift.sh` from the local lane. Check: the newest `desk/estate/drift-*.md` lists site-proof as current | J | open |
| N1 | Write C3's Process in `desk/CONTEXT.md` from the running desk and S2's Process in `sell/02-research/CONTEXT.md` from the MotoArk walk, and set both `status: built`. Check: neither file carries "Defined when the module is built" and `check.yml` is green | S | open |
| N2 | Rewrite `operator/research/intake.md` to use REST reads and writes only: `gh issue list`, `gh pr create` and `gh issue close` use GraphQL and `gh auth status` fails in `legible`, so the routine stops at its step 2. Check: the next 06:00 UTC run ends with "No research issues open." or a PR | S | open |
| N3 | Add the NIF, the registered address and the business email rows to the entity table in `core/identity.md`. Check: the item leaves `core/open-items.md` | J | open |
| N4 | Delete the "Pasted copy status" paragraph in `core/stack.md` (every cloud tool answers `command -v`, so the paste is current) and drop the decided open item "Salesman write-back and the dashboard's commit identity" (`desk/CONTEXT.md`: `DESK_PAT` makes the handoff's branch, commit and PR). Check: `grep -c "Pasted copy status" core/stack.md` prints 0 and the item is gone | S | open |
| N5 | Delete the 30 merged branches on the house and the three `conform/v0.4.0` branches on berceo, agorasim and vinecliff. Check: `gh api repos/legible-consulting/house/branches --paginate --jq '.[].name'` prints `main` only | J | open |

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

## E · The desk as an app

- [ ] **E4** (J) Set the roles in the Neon console, project `legible-desk`, database
  `neondb`: run `desk/app/db/schema.sql` once (it adds `users.client`), then the three upserts
  at its foot with the real emails: Jamie as `jamie`; each salesman as `salesman` with a
  handle; a client as `client` with the folder's slug. Check: the desk shows Jamie the
  clients table, not the client placeholder.
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
