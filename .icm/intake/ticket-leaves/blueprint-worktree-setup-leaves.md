# Stub: The blueprint renders no worktree setup script and names no lane script

- feature-slug: blueprint-worktree-setup-leaves
- epic: ticket-leaves
- sequence: 2 of 4
- depends-on: house-ticket-leaves
- complexity: low
- priority: P2

## Problem

The blueprint renders `.icm/scripts/worktree-setup.sh` into every build. Only `ticket` calls it. Its comment still names `goose-task`. `conventions/README.md` has a row for it, `check.yml` lints it, and `copier.yml` lists it. The intake contract's step 2 says "The lane script made the worktree on it".

## Proposed change

Remove the script from the template and every line that names it or the lane script. Keep the behaviour of `new-run.sh`: it takes the branch of a worktree, whoever made the worktree. Cut a new minor tag.

## Acceptance criteria

- [ ] `template/{% if not workspace %}.icm{% endif %}/scripts/worktree-setup.sh` does not exist.
- [ ] `conventions/README.md` has no "Worktree setup" row. `copier.yml` does not list the script.
- [ ] `check.yml` has no step for the script, and the `update` proofs show that `copier update` removes it from a build of an older tag.
- [ ] The intake `CONTEXT.md` step 2 says "In a worktree on another branch, that branch is the ticket's branch. The session made the worktree on it." No file names `ticket`, `goose-task` or `~/worktrees/`.
- [ ] A new minor tag is cut after the merge, on Jamie's word.

## Out of scope

- The live repos: stub 3.

## Notes

- One pull request on `legible-consulting/blueprint`, `chore(template):` type. The repo is public: no client names.
