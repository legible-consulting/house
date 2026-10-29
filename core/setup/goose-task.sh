#!/usr/bin/env bash
# goose-task: one ticket, one worktree, one session of the local lane's agent
# (core/stack.md, "Local machine"). Installed as ~/.local/bin/goose-task by local.sh.
#
#   goose-task <repo-path> <slug>          make or reuse the ticket's worktree, then start the agent in it
#   goose-task <repo-path> triage/<slug>   the same for a triage stub
#   goose-task done <repo-path> <slug>     remove the worktree when it is clean and pushed. The branch stays
#   goose-task list                        each worktree under ~/goose/worktrees/: repo, branch, state
#
# The worktree is ~/goose/worktrees/<repo>/<slug>/ (triage: triage-<slug>/) on the branch <slug>
# (triage: triage/<slug>), from origin/<branch> when it exists on origin, else from origin/main.
# The script copies .env and .env.local from the primary clone, runs
# .icm/scripts/worktree-setup.sh when the repo has it, and runs no build, lint, typecheck, test,
# format or dev command (CI is truth). It makes nothing on GitHub and decides nothing about the
# ticket. The name stays goose-task (Jamie, 2026-10-29).
set -euo pipefail

# The agent of the lane. This is the one place to change it (why: the script is agent-agnostic,
# goose-worktrees breakdown · 2026-10-29). agent_start runs in the worktree with the session
# name <repo>/<branch>, and replaces this process.
agent_start() {
  exec hermes -p legible chat --continue "$1" --create-if-missing
}

ROOT="${GOOSE_TASK_ROOT:-$HOME/goose/worktrees}"

die()  { echo "goose-task: $*" >&2; exit 1; }
usage() {
  sed -n '5,8s/^# \{0,1\}//p' "$0" >&2
  exit 2
}

# The primary clone of a repo path, and the repo's name: the folder name of that clone.
primary_of() {
  local common
  common="$(git -C "$1" rev-parse --path-format=absolute --git-common-dir 2>/dev/null)" \
    || die "not a git repo: $1"
  dirname "$common"
}

# <slug> or triage/<slug> -> $branch and $folder. It runs in this shell, so die stops the script.
names_of() {
  case "$1" in
    triage/*/*|*/*/*) die "a slug is <slug> or triage/<slug>: $1" ;;
    triage/?*) branch="$1"; folder="triage-${1#triage/}" ;;
    */*) die "a slug is <slug> or triage/<slug>: $1" ;;
    ?*) branch="$1"; folder="$1" ;;
    *) die "the slug is empty" ;;
  esac
}

cmd_start() {
  local main repo branch folder wt f
  main="$(primary_of "$1")"
  repo="$(basename "$main")"
  names_of "$2"
  wt="$ROOT/$repo/$folder"

  if [ -d "$wt" ]; then
    echo "goose-task: reuse $wt ($branch)"
  else
    git -C "$main" fetch --quiet origin
    mkdir -p "$ROOT/$repo"
    if git -C "$main" show-ref --verify --quiet "refs/heads/$branch"; then
      git -C "$main" worktree add "$wt" "$branch"
    elif git -C "$main" show-ref --verify --quiet "refs/remotes/origin/$branch"; then
      git -C "$main" worktree add --track -b "$branch" "$wt" "origin/$branch"
    else
      git -C "$main" worktree add --no-track -b "$branch" "$wt" origin/main
    fi
    for f in .env .env.local; do
      if [ -f "$main/$f" ]; then
        cp -p "$main/$f" "$wt/$f"
        echo "goose-task: copied $f"
      fi
    done
    if [ -f "$wt/.icm/scripts/worktree-setup.sh" ]; then
      (cd "$wt" && bash .icm/scripts/worktree-setup.sh)
    fi
  fi

  cd "$wt"
  agent_start "$repo/$branch"
}

cmd_done() {
  local main repo branch folder wt dirty ahead
  main="$(primary_of "$1")"
  repo="$(basename "$main")"
  names_of "$2"
  wt="$ROOT/$repo/$folder"
  [ -d "$wt" ] || die "no worktree: $wt"

  git -C "$main" fetch --quiet origin
  dirty="$(git -C "$wt" status --porcelain | wc -l)"
  [ "$dirty" -eq 0 ] || die "dirty: $dirty changed files in $wt. Nothing removed"
  ahead="$(git -C "$wt" rev-list --count HEAD --not --remotes=origin)"
  [ "$ahead" -eq 0 ] || die "unpushed: $ahead commits of $branch are not on origin. Nothing removed"

  git -C "$main" worktree remove "$wt"
  rmdir "$ROOT/$repo" 2>/dev/null || true
  echo "goose-task: removed $wt. The branch $branch stays"
}

cmd_list() {
  local wt repo branch state ahead n=0
  [ -d "$ROOT" ] || { echo "goose-task: no worktrees ($ROOT does not exist)"; return 0; }
  while IFS= read -r -d '' wt; do
    wt="$(dirname "$wt")"
    repo="$(basename "$(dirname "$wt")")"
    n=$((n + 1))
    [ "$n" -gt 1 ] || printf '%-14s %-44s %s\n' REPO BRANCH STATE
    if ! branch="$(git -C "$wt" branch --show-current 2>/dev/null)"; then
      printf '%-14s %-44s %s\n' "$repo" "$(basename "$wt")" missing
      continue
    fi
    if [ -n "$(git -C "$wt" status --porcelain 2>/dev/null)" ]; then
      state=dirty
    else
      ahead="$(git -C "$wt" rev-list --count HEAD --not --remotes=origin 2>/dev/null || echo '?')"
      if [ "$ahead" = 0 ]; then state=clean; else state="unpushed $ahead"; fi
    fi
    printf '%-14s %-44s %s\n' "$repo" "${branch:-detached}" "$state"
  done < <(find "$ROOT" -mindepth 3 -maxdepth 3 -name .git -print0 | sort -z)
  [ "$n" -gt 0 ] || echo "goose-task: no worktrees under $ROOT"
}

case "${1:-}" in
  done) [ $# -eq 3 ] || usage; cmd_done "$2" "$3" ;;
  list) [ $# -eq 1 ] || usage; cmd_list ;;
  ""|-h|--help) usage ;;
  *) [ $# -eq 2 ] || usage; cmd_start "$1" "$2" ;;
esac
