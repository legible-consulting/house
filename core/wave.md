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
decides" list (why: a decision he owes is a next action of the house itself · 2026-10-22). Every
session step is a ticket in `.icm/intake/`, named below by its path under that folder. The
desk's Work page lists the tickets with the prompt that starts each one (why: the prompt lives
with the ticket, reviewed in git and retired by the pull request that ships it · 2026-10-25).

Done when: the factory is done, then MotoArk has walked `research` → `proposal` → `agreement`
in the folders, Vinecliff ships a release through the build, Jamie and one salesman (Cunha) sign in
to the desk, and every repo is where its owner wants it. The factory is done when (Jamie,
2026-10-22): no contract on the customer path is a stub (client research, the agreement, kickoff, handover, the desk), "This week"
below is empty, the desk shows truth to all three roles, and the blueprint's functionality
questionnaire is designed and reviewed.

J is Jamie's hand. S is a session.

## This week

Client work (MotoArk's send, Vinecliff's kickoff, Berceo's and Agorasim's releases) waits
until this list is empty (why: the estate is the factory; a client run through a half-built
factory proves nothing · 2026-10-22).

- The stage folders take their final numbers once, with a gap per stage not built yet. S:
  `house-modules/stage-numbers`.
- The agreement: the Process, the agreement templates in en-GB, fr-BE and pt-PT against
  `core/terms.md`, MotoArk's draft on the branch, `status: built`. S:
  `house-modules/agreement`. Check: a yes on Monday has a document to render.
- The desk's Process written from the running desk, `status: built`, `quote/quote.md` leaves the
  client page. S: `house-modules/desk-process`. Check: `/clients/motoark` shows the proposal only.
- Client research's Process from the MotoArk walk, `status: built`. S:
  `house-modules/client-research`.
- The render stack in `core/render/` and `render.yml`: a changed proposal, quote or agreement
  renders to a branded PDF as a run artifact. The Drive copy is placed from the desktop by
  `core/render/place.sh` over the Drive mount, the route the legacy script proved. No key, no
  secret. S: `render-and-publish/render-stack`. Check: the MotoArk proposal PDF is a run
  artifact on the PR.
- Kickoff's Process, the access-table, kickoff-note and client questionnaire templates,
  `status: built`. S: `house-modules/kickoff`.
- Handover's Process and its five templates, `status: built`. S: `house-modules/handover`.
- Neon, project `legible-desk`: one client account linked to a folder. J. Check: the client
  lands on its page.
- The blueprint's functionality questionnaire landed as v0.8.0 (one template root, the bank,
  the UAT files behind `uat`, the proof renders). Left: the MIT `LICENSE` (S:
  `triage/blueprint-license`) and the tiers leaving `check-client.yml` and the org's profile
  (S: `triage/tiers-leave-github-org`).
- Pull `site-proof`, run `drift.sh`, conform `site-proof` to the latest blueprint tag, run it
  again. J. Check: every live and proof row says current against that tag.
- The "One session, one repo" rule in `CLAUDE.md` gains its read-only line, after a `legible`
  session with the siblings attached proves the read. S: `triage/read-only-siblings-rule`.
  Check: `gh api repos/legible-consulting/blueprint --jq .full_name` answers from that session.
- The desk as a phone app and the design restyle, after the desk's Process merges. S: the epic
  `desk-restyle/`, eleven tickets in its build order. Check: the desk installs on the phone and
  every route passes its ticket's criteria.

## Next week

- The handoff walked once with a test row as Cunha, after Jamie meets him: the desk opens
  the PR, Jamie merges, the row reads `handed off`, the test folder is deleted. S writes the
  walk and fixes the code path (`triage/handoff-walk`); J and Cunha run it.
- The blueprint build: `copier update` on the four live repos with their answers, through
  conformance. J.
- MotoArk after the call: `next_action` and `deadline` set, the PDF sent, on a yes the
  agreement rendered and sent for signature, `stage: agreement`. J, then S.
- Vinecliff kickoff: the owner answers the questionnaire, `clients/vinecliff/kickoff/`, the
  first epic in the repo, `next_action` set. J and S, through `house-modules/kickoff`.
- Training: the workshop kit in the blueprint, the client workspace render, the coaching
  record, `status: built`, before Euro Register's week. S: `house-modules/training`.
- Berceo #68 merged as changelog and tag or closed, then the next promotion through
  `promote.sh`. Agorasim's `go-live` epic through the loop. J.
- The tool ledger leaves the library, and the library's pointers name `research/`. S:
  `triage/library-ledger-leaves`, from the desktop.
- GPardas invited as a member once 2FA is on. J. Check: listed by
  `gh api orgs/legible-consulting/members`.
- The `gh` login sessions use carries `repo` and `workflow` only. A second login holds
  `admin:org` for runbook steps. J. Check: `gh auth status` shows no `admin:org` on the
  active login.
- Secret scanning and push protection on the public repos that remain: `blueprint`,
  `.github`, `english-with-jamie`, `garmani`. J.
- The portfolio: `public: named | anonymous | none` on every record, the Process at
  `status: built`, the case at `clients/<slug>/case/case.md` with `ready: true | false`, seeded
  with the four case studies on `jamienisbet.com`. S: `house-modules/portfolio`. J sets
  `public:` and `ready:` per client by commit.
- The publish workflow: on a push to `main`, every `ready: true` case is committed to
  `content/work/<slug>.md` on the `main` of `k0d0minio/jamienisbet`, and Vercel deploys it.
  S: `render-and-publish/publish-cases`, after the portfolio and that repo's `one-app-at-root`.
  J sets the secret. Check: a case merged here is on `jamienisbet.com`.
- Content's Process, and the site's home and services pages through it, after the portfolio.
  S: `house-modules/content`.
- The local lane's old path leaves every sentence that states it as today's fact. S:
  `triage/stale-paths-after-the-move`.

## Jamie decides

