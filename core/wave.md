---
title: Wave 2
kind: wave
owner: jamie
date: 2026-10-22
---
# Wave 2 — one real deal and one real build run through the house

One home for what is open in the system's own build: this week, next, and what Jamie decides.
A step leaves this file when it is done and its result lives in the file that owns it. When
the wave ends, this file is rewritten for the next one (why: a plan with two homes drifts, and
a finished step kept here is a decision trail · 2026-10-19). The glance prints the "Jamie
decides" list (why: a decision he owes is a next action of the house itself · 2026-10-22). The prompt for each session step is in `~/Desktop/legible-consulting/prompts-2026-10-22.md`,
not in git.

Done when: the factory is done, then MotoArk has walked `research` → `proposal` → `agreement`
in the folders, Vinecliff ships a release through the build, Jamie and one salesman (Cunha) sign in
to the desk, and every repo is where its owner wants it. The factory is done when (Jamie,
2026-10-22): no contract on the customer path is a stub (client research, the agreement, kickoff, handover, the desk), "This week"
below is empty, the desk shows truth to all three roles, and the blueprint's functionality
questionnaire is designed and reviewed.

J is Jamie's hand. S is a session.

## This week (by Fri 24 Oct)

Client work (MotoArk's send, Vinecliff's kickoff, Berceo's and Agorasim's releases) waits
until this list is empty (why: the estate is the factory; a client run through a half-built
factory proves nothing · 2026-10-22).

- The research inbox from the phone: the desk becomes installable with a `share_target`, a
  shared link lands in a Neon `inbox` table, `research/intake.md` reads that table
  with `gh api` only. S. Check: a link shared from the phone is in the desk's inbox and the
  next 06:00 UTC run opens a PR with its draft.
- The desk's Process written from the running desk, `status: built`, `quote/quote.md` leaves the
  client page. S. Check: `/clients/motoark` shows the proposal only.
- Client research's Process from the MotoArk walk, `status: built`. S.
- The agreement: the Process, the agreement templates in en-GB, fr-BE and pt-PT against
  `core/terms.md`, MotoArk's draft on the branch, `status: built`. S. Check: a yes on Friday
  has a document to render on Monday.
- The render stack in `core/render/` and `render.yml`: a changed proposal, quote or agreement
  renders to a branded PDF as a run artifact. The Drive copy is placed from the desktop by
  `core/render/place.sh` over the Drive mount, the route the legacy script proved. No key, no
  secret. S. Check: the MotoArk proposal PDF is a run artifact on the PR.
- Kickoff's Process, the access-table, kickoff-note and client questionnaire templates,
  `status: built`. S.
- Handover's Process and its five templates, `status: built`. S.
- Neon, project `legible-desk`: one client account linked to a folder. J. Check: the client
  lands on its page.
- The blueprint's functionality questionnaire designed and reviewed: the question bank in
  `copier.yml`, one template root, the legacy UAT and promotion files behind `uat`, two proof
  renders in `check.yml`, the MIT `LICENSE`. S, J reviews. Check: `check.yml` green on the
  PR, every question has a default and a help line.
- Pull `site-proof`, run `drift.sh`, conform `site-proof` to v0.6.0, run it again. J. Check:
  every live and proof row says current against v0.6.0.
- The "One session, one repo" rule in `CLAUDE.md` gains its read-only line, after a `legible`
  session with the siblings attached proves the read. S. Check:
  `gh api repos/legible-consulting/blueprint --jq .full_name` answers from that session.
- The desk as a phone app and the design restyle, from
  `~/Desktop/legible-consulting/desk-design-prompt.md` in its § 11 order, after the inbox
  and the desk's Process merge. S. Check: the desk installs on the phone and every route passes
  the file's § 7.

## Next week

- The handoff walked once with a test row as Cunha, after Jamie meets him: the desk opens
  the PR, Jamie merges, the row reads `handed off`, the test folder is deleted. J and S.
- The blueprint build: every question group's files, `copier update` on the four repos with
  their answers, `tier` leaves `core/lexicon.md`, `conform.sh` and `check-client.yml`,
  `04-build/CONTEXT.md` reads flags. S.
- MotoArk after the call: `next_action` and `deadline` set, the PDF sent, on a yes the
  agreement rendered and sent for signature, `stage: agreement`. J, then S.
- Vinecliff kickoff: the owner answers the questionnaire, `clients/vinecliff/kickoff/`, the
  first epic in the repo, `next_action` set. J and S.
- Berceo #68 merged as changelog and tag or closed, then the next promotion through
  `promote.sh`. Agorasim's `go-live` epic through the loop. J.
- Research's verdicts seeded from the library's `02-tool-research.md`, then that file leaves the
  library. The dormant `k0d0minio` repos enter `mani.yaml` or its header says why not. S.
- GPardas invited as a member once 2FA is on. J. Check: listed by
  `gh api orgs/legible-consulting/members`.
- The `gh` login sessions use carries `repo` and `workflow` only. A second login holds
  `admin:org` for runbook steps. J. Check: `gh auth status` shows no `admin:org` on the
  active login.
- Secret scanning and push protection on the public repos that remain: `blueprint`,
  `.github`, `english-with-jamie`, `garmani`. J.
- `clients/CONTEXT.md` and `_template/record.md` gain `public: named | anonymous | none`:
  what the client allowed for a case study, by email, outside git. `named` is the name, the
  logo and a link. `anonymous` is the trade and no link. `none` is no case. S.
- The portfolio's Process, `status: built`: the case is `clients/<slug>/case/case.md`, written from the
  handover pack, with `ready: true | false` in its frontmatter. The writer names the client
  as `public:` allows. `clients/CONTEXT.md` holds `*/case/*.md`; `cases/` and `index.md`
  leave the portfolio's Outputs. Seeded with the four case studies on `jamienisbet.com`: Agorasim,
  Vinecliff, Collabimmo and Boys To Men, the last two with a folder each at `stage: after`.
  S, J approves each case. Check: `check.yml` green and no placeholder line in
  the portfolio's ticket in `.icm/intake/`.
- The publish workflow in `.github/workflows/`: on a push to `main`, every `ready: true`
  case is committed to `content/work/<slug>.md` on the `main` of `k0d0minio/jamienisbet`,
  and Vercel deploys it. Jamie's merge of the case here is the gate. One house Actions
  secret, Contents write on that repo, name only. After that repo's stub `one-app-at-root`
  merges. S, J sets the secret. Check: a case merged here is on `jamienisbet.com`.

## Jamie decides

