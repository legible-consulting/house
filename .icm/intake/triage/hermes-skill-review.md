# Stub: Decide whether the Hermes background skill review stays on

- lane: chore
- found-by: `goose-worktrees/hermes-loop-walk` · 2026-10-29
- complexity: low
- priority: P2
- parked: 2026-10-31, Jamie: Hermes is frozen until a client ticket needs the local lane (`core/stack.md` § Tools, the hermes row). The review stays on with approval until then; Jamie may turn it off in `core/setup/hermes/config.yaml` on his own word

## Problem

On 2026-10-29 the background skill review of the profile `legible` staged 42 batches in one day. Jamie rejected all of them. Twenty restated the loop of `.icm/intake/CONTEXT.md` as Hermes skills. Jamie kept the review on with approval for one week (2026-10-29).

## Proposed change

On or after 2026-11-05, count the batches staged since 2026-10-29 and the ones approved. Jamie decides: keep the review on with approval, or turn it off in `core/setup/hermes/config.yaml`.

## Acceptance criteria

- [ ] The count of staged and approved batches since 2026-10-29 is in this stub's `_done/` copy.
- [ ] `core/stack.md` names the decision with its why and date.
