---
holds: []
---
# SDLC pipeline — D2

D2 produces a build from ticket to release, sized by tier (site · app · platform), with live status the client can read at any time and a UAT environment they sign off before release, so that every build runs the same way at the right weight and the client is never in the dark.

## Inputs

- The client repo only: its `CLAUDE.md`, `BUILD.md`, tier contracts and `ci.yml`. This folder is read once to learn the shape; a build session never attaches the house.

## Process

- Defined when the module is built (Wave 1 for C1, C2, D2, D4; later waves for the rest).
- Start cold from this folder. Read only what Inputs names.

## Outputs

- Branch → PR → `check-client` green → preview deploy (the UAT environment) → Jamie merges → release-please PR → merge is the release.
- Status reaches `desk/` by the dashboard build reading the repo over the GitHub API, never by a commit here (why: a status commit is a second home that drifts from the repo it describes · 2026-10-15).
