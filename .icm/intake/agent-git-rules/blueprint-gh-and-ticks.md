# Stub: The blueprint lets an agent use gh in full and tick an acceptance box it checked

- feature-slug: blueprint-gh-and-ticks
- epic: agent-git-rules
- sequence: 2 of 5
- depends-on: cloud-graphql-probe
- complexity: low
- priority: P1

## Problem

The blueprint's loop allows only `gh api`, `gh run` and `gh workflow run`, and the `pr-conventions` skill says "Never `gh pr`". The rule costs a session extra turns on each pull request, and the draft flip has no REST call at all. The contract says nothing about an acceptance box, and sessions read "tick nothing" as covering it.

## Proposed change

A blueprint pull request edits `template/.icm/intake/CONTEXT.md` § The loop and the `pr-conventions` skill: `gh` in full is allowed, `gh pr ready` included. An agent may tick an acceptance criterion box in the stub and the pull request body when it checked that the criterion passed. A gate box stays a human checkbox. The cloud carve-out stays or goes as `cloud-graphql-probe` says.

## Acceptance criteria

- [ ] The contract and `pr-conventions` name `gh` as allowed, with the why and the date 2026-10-30.
- [ ] The contract says: an agent ticks an acceptance box only after the check that proves it, and never a gate box.
- [ ] The draft flip in step 6 uses `gh pr ready <n>`, and the `Operator:` line for the flip goes, unless the probe found a 403.
- [ ] A new blueprint tag carries the change.

## Notes

- The scripts in `.icm/scripts/` keep REST.
- One session, one repo: this is a blueprint session.
