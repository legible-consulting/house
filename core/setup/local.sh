#!/usr/bin/env bash
# Local machine setup (core/stack.md, "Local machine"). Ubuntu 24.04 with Homebrew.
# Installs only the tools missing from PATH; safe to re-run. Run by Jamie, never by a session.
set -u
log()  { echo "[legible-local] $*"; }
have() { command -v "$1" >/dev/null 2>&1; }
have brew || { log "Homebrew is missing: install it first (https://brew.sh), then re-run"; exit 1; }

# command on PATH → Homebrew formula
declare -A formula=(
  [gh]=gh [jq]=jq [yq]=yq [gitleaks]=gitleaks
  [mani]=mani [copier]=copier
)

missing=()
for cmd in "${!formula[@]}"; do have "$cmd" || missing+=("${formula[$cmd]}"); done
if [ ${#missing[@]} -gt 0 ]; then
  log "installing: ${missing[*]}"
  brew install "${missing[@]}" || log "brew reported an error; see above"
else
  log "nothing to install"
fi

for cmd in $(printf '%s\n' "${!formula[@]}" | sort); do
  have "$cmd" && log "ok $cmd" || log "MISSING $cmd"
done

# The lane script: ~/.local/bin/goose-task links to core/setup/goose-task.sh, so a pull of the
# house updates the command (why: one home for the script · Jamie, 2026-10-29).
src="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/goose-task.sh"
mkdir -p "$HOME/.local/bin"
[ -f "$src" ] && ln -sf "$src" "$HOME/.local/bin/goose-task"
[ -x "$HOME/.local/bin/goose-task" ] && log "ok goose-task" || log "MISSING goose-task"
