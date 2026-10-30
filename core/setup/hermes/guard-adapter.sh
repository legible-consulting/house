#!/usr/bin/env bash
# guard-adapter.sh <guard-script-name> — Hermes pre_tool_call adapter for Jamie's three guards.
#
# One home per rule: the guards stay in ~/.claude/hooks/ (or in a repo's .claude/hooks/ copy,
# which wins when present, as it does for Claude Code). This adapter reads Hermes's pre_tool_call
# payload from stdin, maps it into the Claude Code PreToolUse shape, runs the guard, and answers
# in Hermes's form:
#   guard exit 2                          → exit 2, stderr passed through (Hermes blocks)
#   guard JSON permissionDecision "deny"  → {"action":"block","message":…}
#   guard JSON permissionDecision "ask"   → {"action":"approve","message":…} (Hermes's human gate)
#   anything else                         → exit 0, empty stdout (silence: Hermes continues)
# The hook is registered with fail_closed: true, so a malformed payload or a missing jq must
# block, not pass: those paths print a block directive.
set -uo pipefail
name="${1:-}"
if [ -z "$name" ]; then printf '{"action":"block","message":"guard-adapter: no guard name given"}\n'; exit 0; fi
if ! command -v jq >/dev/null 2>&1; then printf '{"action":"block","message":"guard-adapter: jq is missing"}\n'; exit 0; fi
payload="$(cat 2>/dev/null || true)"
if [ -z "$payload" ]; then printf '{"action":"block","message":"guard-adapter: empty payload"}\n'; exit 0; fi

tool="$(printf '%s' "$payload" | jq -r '.tool_name // ""' 2>/dev/null || true)"
cwd="$(printf '%s' "$payload" | jq -r '.cwd // ""' 2>/dev/null || true)"
sid="$(printf '%s' "$payload" | jq -r '.session_id // ""' 2>/dev/null || true)"
# Under the gateway (desktop app, or a CLI attached to it), Hermes v0.22.5 sends the gateway
# process's cwd (~/.hermes), not the session's workspace. The session's own cwd is in state.db:
# read it there first, and keep the payload cwd as the fallback.
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

# LEGIBLE_GUARDS_DEBUG=<file>: append each payload, to read a tool's shape. Off by default.
[ -z "${LEGIBLE_GUARDS_DEBUG:-}" ] || printf '%s\n' "$payload" >> "$LEGIBLE_GUARDS_DEBUG" 2>/dev/null || true

# Hermes sends `terminal` {command}, `write_file` {path, content} and `patch` {path, old_string,
# new_string} or {mode: "patch", patch}. The new text is the part a secret can enter by.
case "$tool" in
  terminal)
    claude_payload="$(printf '%s' "$payload" | jq -c --arg cwd "$cwd" \
      '{tool_name:"Bash", cwd:$cwd, tool_input:{command:(.tool_input.command // "")}}')" ;;
  write_file)
    claude_payload="$(printf '%s' "$payload" | jq -c --arg cwd "$cwd" '
      (.tool_input // {}) as $i
      | {tool_name:"Write", cwd:$cwd,
         tool_input:{file_path:($i.path // ""), content:($i.content // "")}}')" ;;
  patch)
    claude_payload="$(printf '%s' "$payload" | jq -c --arg cwd "$cwd" '
      (.tool_input // {}) as $i
      | {tool_name:"Edit", cwd:$cwd,
         tool_input:{file_path:($i.path // ""),
                     new_string:(if ($i.mode // "replace") == "patch" then ($i.patch // "") else ($i.new_string // "") end)}}')" ;;
  *) exit 0 ;;
esac
[ -n "${claude_payload:-}" ] || exit 0

# The repo copy wins when the session's working directory ships one; else the global guard.
script="$HOME/.claude/hooks/$name"
if [ -n "$cwd" ] && [ -f "$cwd/.claude/hooks/$name" ]; then script="$cwd/.claude/hooks/$name"; fi
if [ ! -f "$script" ]; then
  jq -nc --arg m "guard-adapter: guard $name not found in $cwd/.claude/hooks/ or ~/.claude/hooks/" '{action:"block",message:$m}'; exit 0
fi

errfile="$(mktemp)"
out="$(printf '%s' "$claude_payload" | CLAUDE_PROJECT_DIR="$cwd" bash "$script" 2>"$errfile")"
rc=$?
err="$(cat "$errfile" 2>/dev/null)"; rm -f "$errfile"

if [ "$rc" -eq 2 ]; then printf '%s\n' "$err" >&2; exit 2; fi
decision="$(printf '%s' "$out" | jq -r '.hookSpecificOutput.permissionDecision // ""' 2>/dev/null || true)"
reason="$(printf '%s' "$out" | jq -r '.hookSpecificOutput.permissionDecisionReason // ""' 2>/dev/null || true)"
case "$decision" in
  deny) jq -nc --arg m "$reason" '{action:"block", message:$m}' ;;
  ask)  jq -nc --arg m "$reason" --arg k "legible:${name%.sh}" '{action:"approve", message:$m, rule_key:$k}' ;;
  *)    exit 0 ;;
esac
exit 0
