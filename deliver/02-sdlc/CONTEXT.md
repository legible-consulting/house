---
status: built
holds: []
---
# SDLC pipeline — D2

D2 produces a build from ticket to release, sized by the blueprint's answers, with live status the client can read at any time and a UAT environment they sign off before release, so that every build runs the same way at the right weight and the client is never in the dark.

## Inputs

- The client repo only: its `CLAUDE.md`, `.icm/intake/` (the tickets and the contract `CONTEXT.md`, rendered by the blueprint), `.github/pull_request_template.md` and `ci.yml`. This folder is read once to learn the shape. A build session never attaches the house.
- The reusable workflows in `legible-consulting/.github`: `check-client.yml` and `release.yml`. `ci.yml` calls them. Nothing is copied in.

## Process

- Start cold from the client repo. Read `CLAUDE.md`, then `.icm/intake/CONTEXT.md`. That
  contract is the blueprint's and carries the whole loop. Two scripts beside it,
  `.icm/scripts/new-run.sh` and `close-out.sh`, do the git and GitHub mechanics of one step
  each and decide nothing (why: a script does the same thing every time and costs no model
  turn · 2026-10-21). This section says the same loop in
  the house's words, so that the two never disagree (why: one home for the loop is the repo
  where the work is, and the house only routes · 2026-10-21).
- A ticket is a stub at `<epic-slug>/<feature-slug>.md` or `triage/<slug>.md`. Its folder is
  its status: a stub outside `_done/` is open. Take the next open stub by sequence. One ticket
  is one branch and one pull request.
- The loop:
  1. `.icm/scripts/new-run.sh <epic>/<slug>` cuts the branch from `main`, moves the stub
     into `_done/`, pushes, and opens the draft pull request from
     `.github/pull_request_template.md` with the ticket path and the acceptance criteria
     filled in. The two gates sit at the top of the body, anchored by
     `<!-- gate:spec-approved -->` and `<!-- gate:ready-to-merge -->`. The move is a status
     mark, not a gate. The merge makes it true (why: one pull request carries the ticket and
     its move, so `.icm/intake/` never says more than `main` · 2026-10-21).
  2. **Spec approved** stays in the body for a `medium`, `high` or `research` stub and for a
     stub that leaves a decision open: the session writes what it will build and its
     questions, numbered, each with a default, and stops until Jamie ticks. A `low` stub or a
     triage stub has no such gate.
  3. Build the ticket. Commit in Conventional Commits form. Push.
  4. CI runs `check-client` and Vercel builds the preview. Read both from the pull request.
     Never run them locally. A red check: fix, commit, push, read again.
  5. `.icm/scripts/close-out.sh` moves an epic with no open stub and no sibling pull request
     into `.icm/intake/_done/`, on the branch. Then a green check and a preview: flip the pull
     request to ready, put the preview URL in the body, and stop. For `uat: no`, the preview is
     the UAT environment and the client signs off on it there. For `uat: yes`, the preview is
     Jamie's, and the client signs off at the UAT address after the merge (the bullet below).
  6. Jamie tests the preview, ticks **Ready to merge** and merges, on GitHub or from the desk.
     A session never merges and never ticks a gate (boundary).
  7. On the merge, release-please opens or updates the release pull request. Jamie merges it.
     That merge is the release, and for `uat: yes` the promotion. `main` changes by pull request
     only.
- Sized by the blueprint's answers: every build runs `check-client` and the preview. A build
  that answered no to `uat` signs off on the preview, and production follows `main`. A build
  that answered yes has a Vercel custom environment `uat` that tracks `main`, and production
  does not follow `main`: the client tests each batch at the UAT address, Jamie records their
  word with `.icm/scripts/promote.sh approve --by`, and Jamie's merge of the release pull
  request is the release and the promotion, which `promote.yml` runs (migrate production, then
  promote the staged build of the tagged commit). That loop lives in the repo's
  `.icm/uat/CONTEXT.md`; this line only routes to it (why: one home for the loop is the repo
  where the work is, and a reader of this contract must not take the preview for the yes
  case's UAT · 2026-10-23). A build with its own release workflow names it in its `CLAUDE.md`.
- Every question for Jamie and every stub, breakdown and pull request body is written in
  Simplified Technical English, in the shape the contract gives (why: Jamie reads on a phone,
  and a numbered list with defaults is answered in one reply · 2026-10-21).

## Outputs

- Branch → draft pull request with the gates → `check-client` green → preview deploy (the UAT environment for `uat: no`) → Jamie ticks and merges → for `uat: yes`, the UAT deploy of `main` and the client's recorded sign-off → release-please pull request → merge is the release, and for `uat: yes` the promotion.
- Status reaches the desk by the app reading the repo over the GitHub API per request: the open stubs in `.icm/intake/` on `main`, and each open pull request with its gates, its checks and its preview. Never by a commit here (why: a status commit is a second home that drifts from the repo it describes · 2026-10-15).
