# Stub: Each live repo takes the new blueprint tag at the next conformance

- feature-slug: estate-takes-the-tag
- epic: agent-git-rules
- sequence: 5 of 5
- depends-on: house-follows
- complexity: low
- priority: P2

## Problem

The live repos render their guard, contract and `pr-conventions` from the blueprint. They keep the old rules until each one takes the new tag.

## Proposed change

The next conformance (`conformance/CONTEXT.md`) takes each live repo to the tag. No repo is edited by hand.

## Acceptance criteria

- [ ] Each repo in `desk/mani.yaml` is on the new tag, by its conformance pull request.
- [ ] The drift report of that conformance shows no repo on an older guard.

## Notes

- A repo conforms only through `copier update` (blueprint `CLAUDE.md`).
