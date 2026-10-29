# Stub: Each live repo is ready for Orca worktrees

- feature-slug: estate-orca-files
- epic: orca-worktrees
- sequence: 4 of 4
- depends-on: check-orca-files
- complexity: low
- priority: P2

## Problem

The six live repos are on blueprint `v1.0.3`. None has `orca.yaml` or `.worktreeinclude`, so each new Orca worktree of a client repo starts with an install by hand.

## Proposed change

The conformance to the new blueprint tag adds the two files and the setup script to each live repo (`conformance/CONTEXT.md`).

## Acceptance criteria

- [ ] Each repo of `desk/mani.yaml` tagged `live` has `orca.yaml`, `.worktreeinclude` and the setup script from `copier update` to the new tag, with no hand edit.
- [ ] Each repo's own `.gitignore` ignores each path that `orca.yaml` and `.worktreeinclude` name. Where it does not, the conformance pull request adds the line.
- [ ] Jamie makes one new Orca worktree from each conformance branch, and `node_modules` and the env files are in it. The pull request records the result.
- [ ] The `check-client` check is green on each conformance pull request.

## Out of scope

- The house and the other org repos (the breakdown, Out of scope).

## Notes

- One conformance pull request per repo. It can run with the conformance of stub `estate-environments` and the `env-cleanup-*` triage stubs.
- Lockfiles on 2026-10-29: npm in berceo, vinecliff and messy-play. pnpm in agorasim, remi-ai and jamienisbet. Agorasim and remi-ai are monorepos.
- `.gitignore` is the repo's own file, so `copier update` does not change it.
- The check of a new worktree is Jamie's hand, because Orca asks him to trust the setup script.
