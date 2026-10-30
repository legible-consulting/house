# Stub: The machine has no `~/worktrees/` and no `ticket` link

- feature-slug: worktrees-folder-leaves
- epic: ticket-leaves
- sequence: 4 of 4
- depends-on: house-ticket-leaves
- complexity: low
- priority: P2

## Problem

On 2026-10-30, `~/worktrees/` held worktrees of agorasim, blueprint and house, and an empty `jamienisbet/`. `ticket done` refuses each one after a squash merge. Two files outside every repo name the folder: `~/.claude/CLAUDE.md` § Worktrees and `~/.claude/hooks/reap-worktrees.sh`. The Hermes profile's `skills.external_dirs` may still hold a line for a worktree.

## Proposed change

After stub 1 merges, a session on the machine removes each worktree under `~/worktrees/` whose pull request is merged or closed, with `git worktree remove`. A worktree with commits or changes that are not on `origin` stays, and the session names it to Jamie. Then it removes the folder, the link and the lines that name them.

## Acceptance criteria

- [ ] `~/worktrees/` does not exist, or the stop report names each worktree that stays and why.
- [ ] `~/.local/bin/ticket` does not exist.
- [ ] `~/.claude/CLAUDE.md` § Worktrees has no bullet for `~/worktrees/`.
- [ ] `~/.claude/hooks/reap-worktrees.sh` does not read `~/worktrees/`.
- [ ] The profile's `skills.external_dirs` is equal to the house copy of stub 1, with no line for a worktree. `hermes -p legible doctor` reports no issue.
- [ ] `git worktree prune` leaves no stale entry in the primary clones of the live repos, the blueprint and the house.

## Notes

- This stub changes files outside the repo. Its pull request on the house moves the stub only, and the body lists each act with its result.
- A worktree is removed with `git worktree remove`, never with `rm -rf` (why: git keeps a record of each worktree, and `rm` leaves it stale · 2026-10-30).
