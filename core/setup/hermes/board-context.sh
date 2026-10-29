#!/usr/bin/env bash
# board-context.sh — Hermes pre_llm_call hook: the Hermes side of a repo's Claude Code
# SessionStart and UserPromptSubmit hooks. It reads files and git only, never the network.
#   First turn, where the repo has .claude/hooks/session-start.sh: the board, as context.
#   Every turn, where the repo has .claude/hooks/route-request.sh: the router's one line for
#   the user's prompt ([router] Route: … or Suggest: …), as context. Silent when it is silent.
set -uo pipefail
command -v jq >/dev/null 2>&1 || exit 0
payload="$(cat 2>/dev/null || true)"; [ -n "$payload" ] || exit 0
cwd="$(printf '%s' "$payload" | jq -r '.cwd // ""' 2>/dev/null || true)"
sid="$(printf '%s' "$payload" | jq -r '.session_id // ""' 2>/dev/null || true)"
# Under the gateway (desktop app, or a CLI attached to it), Hermes v0.22.5 sends the gateway
# process's cwd (~/.hermes), not the session's workspace. The session's own cwd is in state.db:
# read it there first, and keep the payload cwd as the fallback (2026-10-29).
# Upstream: https://github.com/NousResearch/hermes-agent/issues/146570. When a release fixes it, remove this lookup.
db="${HERMES_HOME:-$HOME/.hermes/profiles/legible}/state.db"
if [ -n "$sid" ] && [ -f "$db" ]; then
  py="$(command -v python3 || echo /usr/bin/python3)"
  scwd="$("$py" -c 'import sqlite3,sys
c=sqlite3.connect("file:"+sys.argv[1]+"?mode=ro",uri=True,timeout=2)
r=c.execute("select cwd from sessions where id=?",(sys.argv[2],)).fetchone()
print(r[0] if r and r[0] else "")' "$db" "$sid" 2>/dev/null || true)"
  [ -n "$scwd" ] && [ -d "$scwd" ] && cwd="$scwd"
fi
[ -n "$cwd" ] && [ -d "$cwd/.claude/hooks" ] || exit 0
board="$cwd/.claude/hooks/session-start.sh"
router="$cwd/.claude/hooks/route-request.sh"

# First turn: Hermes sends extra.is_first_turn (agent/turn_context.py). Without it, fall back to
# a per-session marker so the board prints once.
first="$(printf '%s' "$payload" | jq -r 'if .extra.is_first_turn == true then "true" elif .extra.is_first_turn == false then "false" else "" end' 2>/dev/null || true)"
if [ -z "$first" ]; then
  first=false
  seen="${XDG_RUNTIME_DIR:-/tmp}/hermes-legible-board"
  mkdir -p "$seen" 2>/dev/null || true
  if [ -n "$sid" ] && [ ! -e "$seen/$sid" ]; then first=true; : > "$seen/$sid" 2>/dev/null || true; fi
fi

parts=()
if [ "$first" = true ] && [ -f "$board" ]; then
  out="$(CLAUDE_PROJECT_DIR="$cwd" bash "$board" 2>/dev/null)"
  # "The board" in Jamie's words is the repo's .icm/intake/, never the Hermes kanban: the model
  # reaches for kanban_list on the word alone, so the context says so (2026-10-29).
  [ -z "$out" ] || parts+=("Session start, repo $cwd. \"The board\" means this repo's .icm/intake/ (below), not the Hermes kanban: do not call kanban tools for it."$'\n\n'"$out")
fi
prompt="$(printf '%s' "$payload" | jq -r '.extra.user_message | if type == "string" then . else "" end' 2>/dev/null || true)"
if [ -n "$prompt" ] && [ -f "$router" ]; then
  line="$(jq -nc --arg p "$prompt" --arg c "$cwd" '{prompt:$p, cwd:$c, hook_event_name:"UserPromptSubmit"}' \
    | CLAUDE_PROJECT_DIR="$cwd" bash "$router" 2>/dev/null \
    | jq -r '.hookSpecificOutput.additionalContext // ""' 2>/dev/null || true)"
  [ -z "$line" ] || parts+=("$line")
fi
[ "${#parts[@]}" -gt 0 ] || exit 0
ctx="$(printf '%s\n\n' "${parts[@]}")"
jq -nc --arg c "${ctx%$'\n\n'}" '{context:$c}'
exit 0
