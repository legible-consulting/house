# Stub: `pr-conventions` says what flips a draft to ready

- lane: chore
- found-by: `goose-worktrees/hermes-loop-walk` · 2026-10-29
- complexity: low
- priority: P1

## Problem

The blueprint's `pr-conventions` skill names `POST pulls/<n>/ready_for_review` to flip a draft. In the walk it returned 404. `PATCH pulls/<n>` with `draft=false` returned 200 and changed nothing. Jamie flipped k0d0minio/jamienisbet#212 on GitHub, and `merge.sh` refused until he did.

## Proposed change

`pr-conventions` says that no REST call flips a draft, and the stop report names the flip as an Operator step. Or the blueprint finds a REST route that works.

## Acceptance criteria

- [ ] `pr-conventions` names no call that fails.
- [ ] The stop report's Operator list names the flip when the pull request is still a draft.
