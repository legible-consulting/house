# Stub: new-run.sh starts a ticket inside its worktree, and the blueprint renders no Emdash file

- feature-slug: blueprint-new-run-in-worktree
- epic: goose-worktrees
- sequence: 3 of 6
- depends-on: goose-task-script
- complexity: medium
- priority: P2

## Problem

The intake contract's loop, step 2, says that the session cuts the branch: `.icm/scripts/new-run.sh <epic>/<slug>` runs `git switch -c <slug> origin/main` and refuses a tree that is not clean. `goose-task` makes the worktree on the branch `<slug>` before goose starts. Inside that worktree the script would cut a second branch or refuse. The blueprint also renders `.emdash.json` (pull requests 38 and 40), `check.yml` proves it, and `conventions/README.md` has an Emdash row. No tool reads the file once Emdash leaves.

## Proposed change

`new-run.sh` keeps the branch of the worktree it runs in when that branch is not `main` and not detached. It moves the stub, commits, pushes that branch and opens the pull request from it. On `main` it cuts the branch as today. The intake contract's step 2 says both cases. `.emdash.json` leaves the template, `check.yml` and the conventions. `worktree-setup.sh` stays, and its comment names `goose-task` as its caller. The conventions get a `Worktree setup` row in place of the Emdash row. One pull request on `legible-consulting/blueprint`, then the move of this stub.

## Acceptance criteria

- [ ] In a worktree on a branch other than `main`, `new-run.sh <epic>/<slug>` makes no new branch. It moves the stub, commits, pushes the current branch and opens the pull request with that branch as head.
- [ ] On `main`, `new-run.sh` cuts `<slug>` (or `triage/<slug>`) from `origin/main` as today.
- [ ] On a detached HEAD, the script stops and names the cause.
- [ ] `--dry-run` prints which case applies and the branch it will use.
- [ ] `.icm/intake/CONTEXT.md` § The loop, step 2, says that a worktree's branch is the ticket's branch, and that the script cuts a branch only from `main`.
- [ ] No render has `.emdash.json`. `copier.yml`'s comment above `_skip_if_exists` does not name it. `check.yml` has no step that parses it, and the `render` job's comment does not name it.
- [ ] `conventions/README.md` has a `Worktree setup` row and no `Emdash` row. The row names `.icm/scripts/worktree-setup.sh` as the blueprint's, says that `goose-task` runs it in a new worktree, and says that a workspace has no script.
- [ ] `worktree-setup.sh`'s header comment names `goose-task` and not Emdash. The script's behaviour does not change.

## Notes

- The branch name `<slug>` and the removal of `.emdash.json` in this stub are the breakdown's decisions of record (Jamie, 2026-10-29).
- `.icm/scripts/merge.sh` and `checks.sh` read the pull request by number, so they do not depend on the branch name.
- After the merge, Jamie cuts the blueprint tag that stub `estate-worktree-files` waits on.
