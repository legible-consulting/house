#!/usr/bin/env bash
# ticket: one ticket, one worktree, one session of the local lane's agent
# (core/stack.md, "Local machine"). Installed as ~/.local/bin/ticket by local.sh.
#
#   ticket <repo-path> <slug>          make or reuse the ticket's worktree, then start the agent in it
#   ticket <repo-path> triage/<slug>   the same for a triage stub
#   ticket done <repo-path> <slug>     remove the worktree when it is clean and pushed. The branch stays
#   ticket list                        each worktree under ~/worktrees/: repo, branch, state
#
# The worktree is ~/worktrees/<repo>/<slug>/ (triage: triage-<slug>/) on the branch <slug>
# (triage: triage/<slug>), from origin/<branch> when it exists on origin, else from origin/main.
# The script copies .env and .env.local from the primary clone, runs
# .icm/scripts/worktree-setup.sh when the repo has it, writes the worktree's .claude/skills into
# the Hermes profile's skills.external_dirs (done removes it), and runs no build, lint, typecheck, test,
# format or dev command (CI is truth). It makes nothing on GitHub and decides nothing about the
# ticket. It was goose-task until 2026-10-29 (Jamie: a name that says what it does).
set -euo pipefail

# The agent of the lane. This is the one place to change it (why: the script is agent-agnostic,
# goose-worktrees breakdown · 2026-10-29). agent_start runs in the worktree with the session
# name <repo>/<branch>, and replaces this process.
agent_start() {
  exec hermes -p legible chat --continue "$1" --create-if-missing
}

ROOT="${TICKET_ROOT:-$HOME/worktrees}"
# The Hermes profile's config: its skills.external_dirs gets each worktree's .claude/skills
# (why: Hermes reads .agents/skills and .hermes/skills by itself, and the estate keeps its skills
# in .claude/skills · triage/hermes-profile-files, 2026-10-29).
HERMES_CONFIG="${TICKET_HERMES_CONFIG:-$HOME/.hermes/profiles/legible/config.yaml}"

die()  { echo "ticket: $*" >&2; exit 1; }
usage() {
  sed -n '5,8s/^# \{0,1\}//p' "$0" >&2
  exit 2
}

# skills_dir add|remove <worktree>: write or remove the worktree's .claude/skills line in
# skills.external_dirs. A missing yq or config is a warning, never a stop: the agent still runs,
# without the repo's skills.
skills_dir() {
  local dir="$2/.claude/skills"
  if ! command -v yq >/dev/null 2>&1 || [ ! -f "$HERMES_CONFIG" ]; then
    echo "ticket: warning: no yq or no $HERMES_CONFIG; skills.external_dirs not changed" >&2
    return 0
  fi
  case "$1" in
    add)
      [ -d "$dir" ] || return 0
      DIR="$dir" yq -i '.skills.external_dirs = ((.skills.external_dirs // []) + [strenv(DIR)] | unique)' "$HERMES_CONFIG" \
        && echo "ticket: skills.external_dirs + $dir" ;;
    remove)
      DIR="$dir" yq -e '(.skills.external_dirs // []) | contains([strenv(DIR)])' "$HERMES_CONFIG" >/dev/null 2>&1 || return 0
      DIR="$dir" yq -i 'del(.skills.external_dirs[] | select(. == strenv(DIR)))' "$HERMES_CONFIG" \
        && echo "ticket: skills.external_dirs - $dir" ;;
  esac
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
    echo "ticket: reuse $wt ($branch)"
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
        echo "ticket: copied $f"
      fi
    done
    if [ -f "$wt/.icm/scripts/worktree-setup.sh" ]; then
      (cd "$wt" && bash .icm/scripts/worktree-setup.sh)
    fi
  fi

  skills_dir add "$wt"
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

  skills_dir remove "$wt"
  git -C "$main" worktree remove "$wt"
  rmdir "$ROOT/$repo" 2>/dev/null || true
  echo "ticket: removed $wt. The branch $branch stays"
}

cmd_list() {
  local wt repo branch state ahead n=0
  [ -d "$ROOT" ] || { echo "ticket: no worktrees ($ROOT does not exist)"; return 0; }
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
  [ "$n" -gt 0 ] || echo "ticket: no worktrees under $ROOT"
}

case "${1:-}" in
  done) [ $# -eq 3 ] || usage; cmd_done "$2" "$3" ;;
  list) [ $# -eq 1 ] || usage; cmd_list ;;
  ""|-h|--help) usage ;;
  *) [ $# -eq 2 ] || usage; cmd_start "$1" "$2" ;;
esac
