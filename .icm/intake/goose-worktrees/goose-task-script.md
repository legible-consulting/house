# Stub: One command makes a ticket's worktree and starts goose in it

- feature-slug: goose-task-script
- epic: goose-worktrees
- sequence: 1 of 6
- depends-on: none
- complexity: medium
- priority: P2

## Problem

A goose session runs in the folder it starts in. To run two tickets of one repo at once, a person makes a worktree by hand, copies `.env` and `.env.local`, runs the install, and starts goose. Emdash did these four steps. Without it nothing does, and the house had 46 orphan worktrees before the reaper.

## Proposed change

`core/setup/goose-task.sh`, installed as `~/.local/bin/goose-task` by `core/setup/local.sh`. `core/stack.md` names the script, the worktree folder and the rules of the folder. `~/.claude/CLAUDE.md` § Worktrees names the folder in place of the Emdash exception.

## Acceptance criteria

- [ ] `goose-task <repo-path> <slug>` makes the worktree `~/goose/worktrees/<repo>/<slug>/` on the branch `<slug>`, from `origin/main` when the branch is new, from `origin/<slug>` when it exists. With `triage/<slug>` the branch is `triage/<slug>` and the folder is `~/goose/worktrees/<repo>/triage-<slug>/`.
- [ ] It copies `.env` and `.env.local` from the primary clone into the worktree when they exist there. It copies nothing else.
- [ ] It runs `bash .icm/scripts/worktree-setup.sh` in the worktree when the file exists. It runs no build, lint, typecheck, test, format or dev command.
- [ ] It then runs `goose session -n <repo>/<slug>` in the worktree, and resumes that session when it exists.
- [ ] `goose-task done <repo-path> <slug>` removes the worktree when it is clean and every commit is on `origin`. Otherwise it names the cause and removes nothing. The branch stays.
- [ ] `goose-task list` prints each worktree under `~/goose/worktrees/` with its repo, its branch and its state.
- [ ] `~/.claude/hooks/reap-worktrees.sh` removes a worktree under `~/goose/worktrees/` by its existing rules: clean, pushed, no commit for 24 hours, no process in it.
- [ ] `core/setup/local.sh` installs the script and prints `ok goose-task` or `MISSING goose-task`.
- [ ] `core/stack.md` § Local machine has a row for `~/goose/worktrees/` and a row for `goose-task`, each with its why and the date.
- [ ] `shellcheck` passes on the script in `check.yml`, as for the other scripts of `core/setup/`.

## Out of scope

- A goose recipe or skill that calls the script.
- The router and the board (stub `plugin-router-and-board`).

## Notes

- The script is the blueprint's `new-run.sh` for the folder, not for the ticket: it makes the worktree and nothing on GitHub. `new-run.sh` runs inside the worktree afterwards (stub `blueprint-new-run-in-worktree`).
- The house, the blueprint, the library and `.github` have no `worktree-setup.sh` and no lockfile at the root. The script skips the install there.
- The folder, the home, the branch and the removal are the breakdown's decisions of record (Jamie, 2026-10-29).
