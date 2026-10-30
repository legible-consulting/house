# Stub: The house and the global guards follow the new blueprint tag

- feature-slug: house-follows
- epic: agent-git-rules
- sequence: 4 of 5
- depends-on: blueprint-gh-and-ticks
- complexity: low
- priority: P1

## Problem

The house carries its own copy of the three guards and its own intake contract. `~/.claude/hooks/` carries the global copy. Each one still has the old rules after the blueprint tag.

## Proposed change

One house pull request copies the blueprint's `confirm-git-writes.sh`, and the house `.icm/intake/CONTEXT.md` names the new rules. After the merge, on Jamie's word, the session copies the guard to `~/.claude/hooks/`.

## Acceptance criteria

- [ ] The house copy of `confirm-git-writes.sh` equals the blueprint's at the new tag, and `check.yml`'s `guards` job is green.
- [ ] The house intake contract and `core/stack.md`'s guard row name the free `.icm/` push and the use of `gh`.
- [ ] `~/.claude/hooks/confirm-git-writes.sh` equals the house copy.
- [ ] In a Hermes session on the profile `legible`, a push of `.icm/`-only changes to `main` runs with no prompt.

## Notes

- `blueprint-icm-push` must be on the same tag.
