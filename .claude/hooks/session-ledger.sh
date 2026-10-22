#!/usr/bin/env bash
# session-ledger.sh — Stop and SessionEnd hook: the session's ledger line to the desk.
# Runs from ~/.claude/hooks/ as the machine-wide default, or from a repo's .claude/hooks/,
# registered in that repo's .claude/settings.json, so a cloud or phone session reports too.
# When the current project ships its own copy, the global one defers to it, so nothing posts
# twice.
#
# At the end of every turn it reads the session's own transcript (the hook input names it)
# and posts one line to the desk: the session id, the repo (the origin remote) and the cwd,
# the host, the first and last timestamps, the active time (the gaps between turns, each
# capped at 30 minutes), the tokens (input, cache and output) and the turns. The desk keeps
# one row per session, updated on every post, and the monthly close reads the month's rows
# (house: desk/CONTEXT.md). No content leaves the session: counts and names only.
#
# Needs DESK_SESSIONS_TOKEN in the environment (the same value as the Vercel project's
# SESSIONS_TOKEN; set in the cloud environment's variables and in ~/.claude/settings.json
# env). Without it, or without jq or curl, it exits 0 and posts nothing. DESK_URL overrides
# the desk (default https://desk.jamienisbet.com). DESK_LEDGER_DRY=1 prints the line instead
# of posting it. Contract: exit 0 always; a failed post never stops a session.
set -u

# Defer to a repo-owned copy of this hook: the repo registers it itself. The same file may
# run as that repo copy: defer only when the repo copy is another file.
repo_copy="${CLAUDE_PROJECT_DIR:-}/.claude/hooks/session-ledger.sh"
if [ -n "${CLAUDE_PROJECT_DIR:-}" ] && [ -f "$repo_copy" ] \
  && [ "$(realpath "$repo_copy" 2>/dev/null)" != "$(realpath "$0" 2>/dev/null)" ]; then
  exit 0
fi

[ -n "${DESK_SESSIONS_TOKEN:-}" ] || [ -n "${DESK_LEDGER_DRY:-}" ] || exit 0
command -v jq >/dev/null 2>&1 || exit 0
command -v curl >/dev/null 2>&1 || [ -n "${DESK_LEDGER_DRY:-}" ] || exit 0

input="$(cat 2>/dev/null || true)"
sid="$(printf '%s' "$input" | jq -r '.session_id // empty' 2>/dev/null || true)"
transcript="$(printf '%s' "$input" | jq -r '.transcript_path // empty' 2>/dev/null || true)"
cwd="$(printf '%s' "$input" | jq -r '.cwd // empty' 2>/dev/null || true)"
[ -n "$sid" ] && [ -n "$transcript" ] && [ -f "$transcript" ] || exit 0

# The repo as owner/name, from the origin remote of the cwd; empty outside a clone.
repo="$(git -C "${cwd:-.}" remote get-url origin 2>/dev/null \
  | sed -E 's#^(https://github\.com/|git@github\.com:)##; s#\.git$##' || true)"
host="$(hostname 2>/dev/null || echo unknown)"

# One JSON line from the transcript. A timestamp carries milliseconds, which jq's parser
# does not take: they are cut first. An empty transcript gives no line.
line="$(jq -c -s --arg id "$sid" --arg repo "$repo" --arg cwd "$cwd" --arg host "$host" '
  def t: .timestamp | sub("\\.[0-9]+Z$"; "Z") | fromdateiso8601;
  [.[] | select(type == "object" and (.timestamp | type) == "string")] as $all
  | ([$all[] | t] | sort) as $t
  | ($t | length) as $n
  | if $n == 0 then empty else {
      id: $id, repo: $repo, cwd: $cwd, host: $host,
      started: ($t[0] | todate), ended: ($t[-1] | todate),
      active_ms: (([range(1; $n) | ([$t[.] - $t[. - 1], 1800] | min)] | add // 0) * 1000),
      tokens: ([$all[] | select(.type == "assistant") | (.message.usage // {})
        | ((.input_tokens // 0) + (.cache_creation_input_tokens // 0)
          + (.cache_read_input_tokens // 0) + (.output_tokens // 0))] | add // 0),
      turns: ([$all[] | select(.type == "assistant")] | length)
    } end' "$transcript" 2>/dev/null || true)"
[ -n "$line" ] || exit 0

if [ -n "${DESK_LEDGER_DRY:-}" ]; then
  printf '%s\n' "$line"
  exit 0
fi
curl -fsS -m 5 -X POST "${DESK_URL:-https://desk.jamienisbet.com}/api/sessions" \
  -H "Authorization: Bearer ${DESK_SESSIONS_TOKEN}" -H "Content-Type: application/json" \
  --data "$line" >/dev/null 2>&1 || true
exit 0
