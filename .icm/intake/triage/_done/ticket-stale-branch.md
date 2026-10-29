# Stub: `ticket` starts a worktree from `main` when the ticket's local branch is stale

- lane: chore
- found-by: `goose-worktrees/hermes-loop-walk` · 2026-10-29
- complexity: low
- priority: P1

## Problem

`core/setup/ticket.sh` reuses a local branch when one exists. In the walk the local branch `triage/drop-desk-tailwind-merge-config` came from an earlier session. It was three commits behind `origin/main` and had no `.icm/scripts/worktree-setup.sh`, so the worktree got no `node_modules`.

## Proposed change

When the branch is not on `origin` and has no commit that `origin/main` lacks, `ticket` moves the branch to `origin/main` before it makes the worktree.

## Acceptance criteria

- [ ] A stale local branch with no own commit starts at `origin/main`, and `worktree-setup.sh` runs.
- [ ] A local branch with its own commits is used as it is, with a warning line.
