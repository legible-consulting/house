#!/usr/bin/env bash
# sweep-deadlines.sh: write desk/glance/<date>.md from the client records and the Jamie
# decides list in core/wave.md, and delete the previous glances (git holds them). It does not
# touch git: the workflow commits the result. Run from the repo root with mikefarah yq on PATH.
# The script is a file, not inline YAML, so the `scripts` job in check.yml runs shellcheck
# over it (this workflow does not run on a PR).
set -euo pipefail

today="$(TZ=Europe/Lisbon date +%F)"

# The runner clock is UTC, so a day is always 86400 s. Usage: add_days <date> <days>
add_days() {
  date -u -d "@$(( $(date -u -d "$1" +%s) + $2 * 86400 ))" +%F
}

valid_date() {
  [[ "$1" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] && [ "$(date -u -d "$1" +%F 2>/dev/null)" = "$1" ]
}

# The order of the stage table in clients/CONTEXT.md.
stage_rank() {
  case "$1" in
    prospect) echo 1 ;;
    research) echo 2 ;;
    proposal) echo 3 ;;
    agreement) echo 5 ;;
    kickoff) echo 6 ;;
    build) echo 7 ;;
    handover) echo 8 ;;
    after) echo 9 ;;
    lost) echo 10 ;;
    *) echo 99 ;;
  esac
}

# Read one frontmatter field as text. An empty or missing field gives an empty string.
field() {
  yq --front-matter=extract ".$1 // \"\"" "$2"
}

[ -f core/wave.md ] || { echo "::error::core/wave.md is missing"; exit 1; }

horizon="$(add_days "$today" 7)"
tab=$'\t'

inside="$(mktemp)"
actions="$(mktemp)"
ongoing=""

for rec in clients/*/record.md; do
  slug="$(basename "$(dirname "$rec")")"
  if [ "$slug" = "_template" ]; then continue; fi

  name="$(field name "$rec")"
  if [ -z "$name" ]; then name="$slug"; fi
  stage="$(field stage "$rec")"
  kind="$(field kind "$rec")"
  deadline="$(field deadline "$rec")"
  # One line per action: fold line breaks and runs of spaces.
  next="$(field next_action "$rec" | tr '\n\t' '  ' | sed -e 's/  */ /g' -e 's/^ //' -e 's/ $//')"

  link="[${name}](../../${rec})"

  # Retainer and role stay at build and have no end. With no next action they are ongoing,
  # never stalled (desk/CONTEXT.md; why: neither engagement ends, 2026-10-16).
  if [ -z "$next" ] && { [ "$kind" = "retainer" ] || [ "$kind" = "role" ]; }; then
    if [ -n "$ongoing" ]; then ongoing="${ongoing}, "; fi
    ongoing="${ongoing}${name} (${kind})"
  fi

  if [ -n "$deadline" ]; then
    if valid_date "$deadline"; then
      # Overdue deadlines also belong at the top: they sort first.
      if [[ "$deadline" < "$horizon" || "$deadline" == "$horizon" ]]; then
        mark=""
        if [[ "$deadline" < "$today" ]]; then mark=" (overdue)"; fi
        printf '%s\t- %s%s · %s (%s): %s\n' \
          "$deadline" "$deadline" "$mark" "$link" "$stage" "${next:-no next action}" >> "$inside"
      fi
    else
      echo "::warning file=${rec}::deadline '${deadline}' is not YYYY-MM-DD; it is left out of 'Inside seven days'"
    fi
  fi

  if [ -n "$next" ]; then
    line="- ${link} (${stage}): ${next}"
    if [ -n "$deadline" ]; then line="${line} · due ${deadline}"; fi
    printf '%s\t%s\t%s\n' "$(stage_rank "$stage")" "$slug" "$line" >> "$actions"
  fi
done

mkdir -p desk/glance
out="desk/glance/${today}.md"

{
  echo "---"
  echo "title: Morning glance ${today}"
  echo "kind: glance"
  echo "date: ${today}"
  echo "---"
  echo "# Morning glance ${today}"
  echo
  echo "## Inside seven days"
  echo
  if [ -s "$inside" ]; then
    sort -t "$tab" -k1,1 "$inside" | cut -f2-
  else
    echo "None."
  fi
  echo
  echo "## Next actions"
  echo
  if [ -s "$actions" ]; then
    sort -t "$tab" -k1,1n -k2,2 "$actions" | cut -f3-
  else
    echo "None."
  fi
  if [ -n "$ongoing" ]; then
    echo
    echo "## Ongoing"
    echo
    echo "No next action, and none needed: ${ongoing}."
  fi
  echo
  echo "## Jamie decides"
  echo
  # The bullet lines under "## Jamie decides" in core/wave.md, as they are.
  items="$(awk '/^## Jamie decides/ { f = 1; next } /^## / { f = 0 } f && /^- /' core/wave.md || true)"
  if [ -n "$items" ]; then
    printf '%s\n' "$items"
  else
    echo "None."
  fi
} > "$out"

# The latest glance only: delete every other one. Git holds the past glances.
for f in desk/glance/*.md; do
  [ -e "$f" ] || continue
  [ "$f" = "$out" ] || rm -f -- "$f"
done

rm -f -- "$inside" "$actions"

if [ -n "${GITHUB_OUTPUT:-}" ]; then
  echo "date=${today}" >> "$GITHUB_OUTPUT"
fi
echo "Wrote ${out}"
