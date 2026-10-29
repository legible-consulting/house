# Stub: Each live repo keeps the setup script and loses the Emdash file

- feature-slug: estate-worktree-files
- epic: goose-worktrees
- sequence: 5 of 7
- depends-on: blueprint-new-run-in-worktree
- complexity: low
- priority: P2

## Problem

The six live repos are on blueprint `v1.0.3` and have no `worktree-setup.sh`, so `goose-task` installs nothing in their worktrees. A conformance to a tag between `v1.0.3` and stub `blueprint-new-run-in-worktree` would also give them `.emdash.json`, a file no tool reads afterwards.

## Proposed change

The conformance to the tag after `blueprint-new-run-in-worktree` adds `.icm/scripts/worktree-setup.sh` and the new `new-run.sh` to each live repo, and renders no `.emdash.json` (`conformance/CONTEXT.md`).

## Acceptance criteria

- [ ] Each repo of `desk/mani.yaml` tagged `live` has `.icm/scripts/worktree-setup.sh` and the `new-run.sh` of the new tag from `copier update`, with no hand edit, and no `.emdash.json`.
- [ ] Each repo's own `.gitignore` ignores `.env` and `.env.local`. Where it does not, the conformance pull request adds the line.
- [ ] Jamie runs `goose-task` on one ticket of one live repo: `node_modules` and the env files are in the worktree, `new-run.sh` makes no branch, and the pull request opens from the worktree's branch. The pull request records the result.
- [ ] The `check-client` check is green on each conformance pull request.

## Notes

- One conformance pull request per repo. It can run with the conformance of stub `estate-environments` and the `env-cleanup-*` triage stubs.
- Lockfiles on 2026-10-29: npm in berceo, vinecliff and messy-play. pnpm in agorasim, remi-ai and jamienisbet. Agorasim and remi-ai are monorepos.
