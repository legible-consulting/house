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

## Now (as of 2026-10-22, after Jamie's answers to the stocktake)

Client work (MotoArk's next action, the three build records, the client repos' branches) waits
until Jamie is satisfied with the house and the blueprint. The records and the glance carry it
meanwhile (why: the estate is the factory; a client run through a half-built factory proves
nothing · 2026-10-22). W is this week, N is next.

| Order | What | Whose hand | State |
|---|---|---|---|
| W1 | The research inbox from the phone: the desk becomes a PWA with a `share_target`, so a link shared from the phone's share sheet (a repo, a reel, an article) lands in a Neon `inbox` table with Jamie's note; `operator/research/intake.md` reads that table instead of issues, with `gh api` only, and drafts one verdict per link. Check: a link shared from the phone is in the desk's inbox and the next 06:00 UTC run opens a PR with its draft | S | open |
| W2 | Run `bash deliver/04-conformance/drift.sh` from the local lane now that site-proof#1 is merged. Check: the newest `desk/estate/drift-*.md` lists site-proof as current | J | open |
| W3 | Delete the 30 merged branches on the house and switch on "Automatically delete head branches" in the repo's settings. Check: `gh api repos/legible-consulting/house/branches --paginate --jq '.[].name'` prints `main` only | J | open |
| W4 | Cloud sessions read the whole estate, read-only: the Claude GitHub App covers `blueprint`, `library`, `.github` and `site-proof`, a session attaches them with read access only, and the "One session, one repo" rule in `CLAUDE.md` gains that line with its why. Check: `gh api repos/legible-consulting/blueprint --jq .full_name` answers from a `legible` session | J+S | open |
| W5 | Commit an MIT `LICENSE` to the blueprint, in a blueprint session. Check: `gh api repos/legible-consulting/blueprint/contents --jq '.[].name'` lists `LICENSE` | S | open |
| N1 | Write C3's Process in `desk/CONTEXT.md` from the running desk and S2's Process in `sell/02-research/CONTEXT.md` from the MotoArk research, and set both `status: built`. Check: neither file carries "Defined when the module is built" and `check.yml` is green | S | open |
| N2 | The desk's client page and `desk/CONTEXT.md` list `quote/quote.md` as a document the client reads. The price is the proposal's last section now, so the client sees the proposal only. Check: `/clients/<slug>` shows no separate quote document | S | open |
| N3 | Confirm the desk after 1e, E4 and E6: desk.jamienisbet.com shows Jamie the clients table with each repo's last release, and `/work` shows the gates. Check: Jamie's eyes | J | open |

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

## F · Writing and hygiene

- [ ] **F3** (J) `library`: commit the ticked boxes in `07-infrastructure-setup.md`; delete
  `00-goal-questions.md` (superseded) and the two estate JSON snapshots once A2 is done.
  Check: `git status` clean in `library`.
