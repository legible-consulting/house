---
status: built
holds: []
---
# SDLC pipeline — D2

D2 produces a build from ticket to release, sized by tier (site · app · platform), with live status the client can read at any time and a UAT environment they sign off before release, so that every build runs the same way at the right weight and the client is never in the dark.

## Inputs

- The client repo only: its `CLAUDE.md`, `.icm/` (the intake and the pipeline), tier contracts and `ci.yml`. This folder is read once to learn the shape; a build session never attaches the house.
- The reusable workflows in `legible-consulting/.github`: `check-client.yml` and `release.yml`. `ci.yml` calls them; nothing is copied in.

## Process

- Start cold from the client repo. Read `CLAUDE.md`, then `.icm/intake/`. A ticket is a
  stub at `<epic-slug>/<feature-slug>.md`, and its folder is its status: a stub outside
  `_done/` is open. Take the next open stub. One ticket is one branch and one PR.
- The loop:
  1. Branch from `main`. Name the branch after the ticket.
  2. Build the ticket. Commit in Conventional Commits form. Push.
  3. Open the PR with `gh pr create`. The body names the ticket's path. The PR moves the
     stub into `_done/` with `git mv`. A move is a status mark, not a gate. The merge makes
     it true, and the merge is Jamie's (why: one PR carries the ticket and its move, so
     `.icm/intake/` never says more than `main` · 2026-10-21).
  4. CI runs `check-client` and Vercel builds the preview. Read both from the PR. Never run
     them locally.
  5. A red check: fix, commit, push, read again.
  6. A green check and a preview: give Jamie the preview URL. The preview is the UAT
     environment. The client signs off on it there.
  7. Jamie merges. A session never merges (boundary).
  8. On the merge, release-please opens or updates the release PR. Jamie merges it. That
     merge is the release. `main` changes by PR only: a ruleset where the plan allows one,
     the boundary everywhere.
- Sized by tier: `site` runs `check-client` and the preview. `app` adds `release.yml`.
  `platform` adds the repo's own monorepo checks, named in its `CLAUDE.md`.
- Until the desk app shows it (wave step E2), the client reads status from the PR list and
  the preview URL Jamie sends.

## Outputs

- Branch → PR → `check-client` green → preview deploy (the UAT environment) → Jamie merges → release-please PR → merge is the release.
- Status reaches `desk/` by the dashboard build reading the repo over the GitHub API, never by a commit here (why: a status commit is a second home that drifts from the repo it describes · 2026-10-15).
