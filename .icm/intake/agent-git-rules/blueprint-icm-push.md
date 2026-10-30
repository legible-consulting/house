# Stub: The push guard lets a push to main through with no ask when every changed file is under .icm/

- feature-slug: blueprint-icm-push
- epic: agent-git-rules
- sequence: 3 of 5
- depends-on: none
- complexity: medium
- priority: P1

## Problem

`confirm-git-writes.sh` asks before every push to the default branch. A new stub, a stub move or a breakdown is a push of words that a revert undoes, and the ask stops the session for each one.

## Proposed change

The guard compares the commits that the push sends with the remote branch. When every changed path is under `.icm/`, it lets the push through with no ask. Any other path, a force push or a history rewrite asks as before.

## Acceptance criteria

- [ ] `git push origin main` with only `.icm/` changes runs with no ask, in a fixture test that `check.yml` runs.
- [ ] The same push with one file outside `.icm/` asks.
- [ ] A force push of `.icm/`-only changes still asks.
- [ ] The guard's header comment names the rule with its why and the date 2026-10-30.
- [ ] A new blueprint tag carries the change.

## Notes

- The guard reads the range `origin/main..<pushed ref>` with `git diff --name-only`. A remote that the guard cannot read asks (fail closed).
- The house copy and the global copy follow in `house-follows`, because `check.yml` fails on a house copy that differs.
