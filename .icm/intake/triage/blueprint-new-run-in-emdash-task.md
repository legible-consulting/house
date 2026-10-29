# Stub: new-run.sh starts a ticket inside an Emdash task worktree

- lane: chore
- found-by: the alignment read of the open stubs against goose and Emdash · 2026-10-29
- complexity: medium
- priority: P2

## Problem

The intake contract's loop, step 2, says that the session cuts the branch: `.icm/scripts/new-run.sh <epic>/<slug>` runs `git switch -c <slug> origin/main` and refuses a tree that is not clean. An Emdash task makes its worktree before goose starts, on the branch `emdash/<task-name>`. Inside that worktree the script switches the worktree to a second branch, `<slug>`. Emdash's documents do not say which branch the task then follows, or which branch its pull request button uses. The house's pull requests 179 to 181 came from `emdash/*` branches, with no script. The blueprint's pull requests 38 and 40 came from slug branches, cut by hand.

## Proposed change

`new-run.sh` keeps the branch of the worktree it runs in when that branch is not `main` and not detached. It moves the stub, commits, pushes that branch and opens the pull request from it. On `main` it cuts the branch as today. The intake contract's step 2 says both cases. One pull request on `legible-consulting/blueprint`, then the move of this stub.

## Acceptance criteria

- [ ] In a worktree on a branch other than `main`, `new-run.sh <epic>/<slug>` makes no new branch. It moves the stub, commits, pushes the current branch and opens the pull request with that branch as head.
- [ ] On `main`, `new-run.sh` cuts `<slug>` (or `triage/<slug>`) from `origin/main` as today.
- [ ] On a detached HEAD, the script stops and names the cause.
- [ ] `--dry-run` prints which case applies and the branch it will use.
- [ ] `.icm/intake/CONTEXT.md` § The loop, step 2, says that an Emdash task's branch is the ticket's branch, and that the script cuts a branch only from `main`.
- [ ] Jamie runs one ticket of a live repo as an Emdash task with goose, through `new-run.sh`. The pull request records which branch Emdash followed and which branch its pull request button offered.

## Notes

- Questions for Jamie. 1. Which branch is the ticket's branch in an Emdash task? Default: the branch Emdash made, `emdash/<task-name>`. The other answer: Jamie types the slug as the task name, so that the branch is `emdash/<slug>`, and the script still makes no branch.
- The `EMDASH_TASK_NAME` variable is set in a task's shell. The script can read it to say, in its output, that it runs inside an Emdash task.
- Related: `.icm/scripts/merge.sh` and `checks.sh` read the pull request by number, so they do not depend on the branch name.
