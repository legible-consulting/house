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

# The lane script: ~/.local/bin/ticket links to core/setup/ticket.sh, so a pull of the
# house updates the command (why: one home for the script · Jamie, 2026-10-29).
src="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/ticket.sh"
mkdir -p "$HOME/.local/bin"
[ -f "$src" ] && ln -sf "$src" "$HOME/.local/bin/ticket"
[ -x "$HOME/.local/bin/ticket" ] && log "ok ticket" || log "MISSING ticket"
# The old name: remove the link goose-task when it no longer points at a file (why: the script
# was renamed to ticket · Jamie, 2026-10-29).
old="$HOME/.local/bin/goose-task"
if [ -L "$old" ] && [ ! -e "$old" ]; then rm -f "$old" && log "removed the old link goose-task"; fi

# The Hermes profile legible: core/setup/hermes/ is the home of its four files. A missing file is
# copied in. A file that is present is never overwritten, and a file that differs is named
# (why: Hermes writes config.yaml itself, an "always" approval among others, and an overwrite
# drops it; a change made on the machine is carried to the house by hand · 2026-10-29).
# The scripts' mtime changes on a copy: Hermes then asks once again for each hook.
hsrc="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/hermes"
hdst="$HOME/.hermes/profiles/legible"
if have hermes; then
  # A profile this run creates gets the house's four files over the defaults Hermes writes.
  fresh=0
  if [ ! -d "$hdst" ]; then
    hermes profile create legible >/dev/null 2>&1 && fresh=1 || log "hermes profile create legible failed"
  fi
  if [ -d "$hdst" ]; then
    for f in config.yaml SOUL.md guard-adapter.sh board-context.sh; do
      if [ "$fresh" -eq 1 ] || [ ! -e "$hdst/$f" ]; then
        cp "$hsrc/$f" "$hdst/$f" && log "installed $f into $hdst"
      elif ! cmp -s "$hsrc/$f" "$hdst/$f"; then
        log "differs: $hdst/$f from $hsrc/$f"
      fi
    done
    chmod 600 "$hdst/config.yaml" 2>/dev/null
    chmod 755 "$hdst/guard-adapter.sh" "$hdst/board-context.sh" 2>/dev/null
  fi
  ok=1
  for f in config.yaml SOUL.md guard-adapter.sh board-context.sh; do [ -s "$hdst/$f" ] || ok=0; done
  [ -x "$hdst/guard-adapter.sh" ] && [ -x "$hdst/board-context.sh" ] || ok=0
  [ "$ok" -eq 1 ] && log "ok hermes profile legible" || log "MISSING hermes profile legible"
else
  log "MISSING hermes (install it by hand: core/stack.md, Local machine)"
fi
