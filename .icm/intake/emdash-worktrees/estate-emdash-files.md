# Stub: Each live repo is ready for Emdash task worktrees

- feature-slug: estate-emdash-files
- epic: emdash-worktrees
- sequence: 4 of 4
- depends-on: check-emdash-files
- complexity: low
- priority: P2

## Problem

The six live repos are on blueprint `v1.0.3`. None has `.emdash.json`, so each new Emdash task worktree of a client repo starts with an install by hand.

## Proposed change

The conformance to the new blueprint tag adds `.emdash.json` and the setup script to each live repo (`conformance/CONTEXT.md`).

## Acceptance criteria

- [ ] Each repo of `desk/mani.yaml` tagged `live` has `.emdash.json` and the setup script from `copier update` to the new tag, with no hand edit.
- [ ] Each repo's own `.gitignore` ignores each path that `preservePatterns` names. Where it does not, the conformance pull request adds the line.
- [ ] Jamie makes one new Emdash task from each conformance branch, and `node_modules` and the env files are in the worktree. The pull request records the result.
- [ ] The `check-client` check is green on each conformance pull request.

## Out of scope

- The house and the other org repos (the breakdown, Out of scope).

## Notes

- One conformance pull request per repo. It can run with the conformance of stub `estate-environments` and the `env-cleanup-*` triage stubs.
- Lockfiles on 2026-10-29: npm in berceo, vinecliff and messy-play. pnpm in agorasim, remi-ai and jamienisbet. Agorasim and remi-ai are monorepos.
- `.gitignore` is the repo's own file, so `copier update` does not change it.
- The check of a new task is Jamie's hand: Emdash runs the prepare script on his machine, and he reads its log in the terminal drawer.
