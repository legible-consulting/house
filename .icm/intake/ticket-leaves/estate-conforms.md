# Stub: Each live repo loses the worktree setup script by copier update

- feature-slug: estate-conforms
- epic: ticket-leaves
- sequence: 3 of 4
- depends-on: blueprint-worktree-setup-leaves
- complexity: low
- priority: P2

## Problem

The six live repos of `desk/mani.yaml` have `.icm/scripts/worktree-setup.sh` since the conformance to `v1.3.0`. After stub 2 no tool calls it.

## Proposed change

The conformance to the tag of stub 2 removes the script from each live repo (`conformance/CONTEXT.md`). It can run with any other conformance to the same tag.

## Acceptance criteria

- [ ] Each repo of `desk/mani.yaml` tagged `live` is on the new tag through `copier update`, with no hand edit, and has no `.icm/scripts/worktree-setup.sh`.
- [ ] The `check-client` check is green on each conformance pull request. Messy-play has no CI: its pull request says so.

## Notes

- One conformance pull request per repo, one session per repo.
- The `.gitignore` lines for `.env` and `.env.local` stay. They protect the primary clone too.
