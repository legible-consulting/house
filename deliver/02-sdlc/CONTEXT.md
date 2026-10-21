---
status: built
holds: []
---
# SDLC pipeline — D2

D2 produces a build from ticket to release, sized by tier (site · app · platform), with live status the client can read at any time and a UAT environment they sign off before release, so that every build runs the same way at the right weight and the client is never in the dark.

## Inputs

- The client repo only: its `CLAUDE.md`, `.icm/intake/` (the tickets and the contract `CONTEXT.md`, rendered by the blueprint), `.github/pull_request_template.md` and `ci.yml`. This folder is read once to learn the shape. A build session never attaches the house.
- The reusable workflows in `legible-consulting/.github`: `check-client.yml` and `release.yml`. `ci.yml` calls them. Nothing is copied in.

## Process

- Start cold from the client repo. Read `CLAUDE.md`, then `.icm/intake/CONTEXT.md`. That
  contract is the blueprint's and carries the whole loop. This section says the same loop in
  the house's words, so that the two never disagree (why: one home for the loop is the repo
  where the work is, and the house only routes · 2026-10-21).
- A ticket is a stub at `<epic-slug>/<feature-slug>.md` or `triage/<slug>.md`. Its folder is
  its status: a stub outside `_done/` is open. Take the next open stub by sequence. One ticket
  is one branch and one pull request.
- The loop:
  1. Branch from `main`. Name the branch after the ticket.
  2. Open the pull request first, as a draft, from `.github/pull_request_template.md`. The
     two gates sit at the top of the body, anchored by `<!-- gate:spec-approved -->` and
     `<!-- gate:ready-to-merge -->`. **Spec approved** is required for a `medium`, `high` or
     `research` stub and for a stub that leaves a decision open: the session writes what it
     will build and its questions, numbered, each with a default, and stops until Jamie ticks.
     A `low` stub or a triage stub drops the line.
  3. Build the ticket. Commit in Conventional Commits form. Push. The pull request moves the
     stub into `_done/` with `git mv`. A move is a status mark, not a gate. The merge makes
     it true (why: one pull request carries the ticket and its move, so `.icm/intake/` never
     says more than `main` · 2026-10-21).
  4. CI runs `check-client` and Vercel builds the preview. Read both from the pull request.
     Never run them locally. A red check: fix, commit, push, read again.
  5. A green check and a preview: flip the pull request to ready, put the preview URL in the
     body, and stop. The preview is the UAT environment. The client signs off on it there.
  6. Jamie tests the preview, ticks **Ready to merge** and merges, on GitHub or from the desk.
     A session never merges and never ticks a gate (boundary).
  7. On the merge, release-please opens or updates the release pull request. Jamie merges it.
     That merge is the release. `main` changes by pull request only.
- Sized by tier: `site` runs `check-client` and the preview. `app` adds `release.yml`.
  `platform` runs `check-client` and keeps its own release workflow, named in its `CLAUDE.md`.
- Every question for Jamie and every stub, breakdown and pull request body is written in
  Simplified Technical English, in the shape the contract gives (why: Jamie reads on a phone,
  and a numbered list with defaults is answered in one reply · 2026-10-21).

## Outputs

- Branch → draft pull request with the gates → `check-client` green → preview deploy (the UAT environment) → Jamie ticks and merges → release-please pull request → merge is the release.
- Status reaches the desk by the app reading the repo over the GitHub API per request: the open stubs in `.icm/intake/` on `main`, and each open pull request with its gates, its checks and its preview. Never by a commit here (why: a status commit is a second home that drifts from the repo it describes · 2026-10-15).
