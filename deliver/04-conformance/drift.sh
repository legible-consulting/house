#!/usr/bin/env bash
# drift.sh — D4's report: for every live repo in desk/mani.yaml, does its default branch track
# the latest blueprint tag, and which Claude and agent assets does it carry. Writes
# desk/estate/drift-<date>.md. Reads the local lane (fetch only); changes no client repo.
set -euo pipefail

house="$(cd "$(dirname "$0")/../.." && pwd)"
blueprint="https://github.com/legible-consulting/blueprint.git"
assets=(.claude CLAUDE.md AGENTS.md .mcp.json .icm .opencode opencode.jsonc .cursor .github/copilot-instructions.md)

tag="$(git ls-remote --tags --refs "$blueprint" 'v*' | sed 's#.*refs/tags/##' | sort -V | tail -n1)"
[ -n "$tag" ] || { echo "blueprint has no v* tag yet; nothing to conform to" >&2; exit 1; }

# The client record whose repo: field names this repo gives the tier.
tier_of() {
  local f
  for f in "$house"/clients/*/record.md; do
    case "$f" in */_template/*) continue ;; esac
    if [ "$(yq --front-matter=extract '.repo' "$f")" = "$1" ]; then
      yq --front-matter=extract '.tier' "$f"
      return
    fi
  done
  echo "no record"
}

date="$(date +%F)"
out="$house/desk/estate/drift-${date}.md"
mkdir -p "$(dirname "$out")"

rows=""
drifted=0
while IFS=$'\t' read -r name path url; do
  path="${path/#\~/$HOME}"
  repo="$(printf '%s' "$url" | sed -E 's#^https://github.com/##; s#\.git$##')"
  tier="$(tier_of "$repo")"
  if [ ! -d "$path/.git" ]; then
    rows+="| \`${repo}\` | ${tier} | — | no local clone at \`${path}\` | — |"$'\n'
    drifted=$((drifted + 1))
    continue
  fi
  git -C "$path" fetch -q origin
  ref="$(git -C "$path" symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null || echo origin/main)"
  if answers="$(git -C "$path" show "${ref}:.copier-answers.yml" 2>/dev/null)"; then
    tracks="$(printf '%s\n' "$answers" | yq '._commit')"
    if [ "$tracks" = "$tag" ]; then drift="current"; else drift="behind: \`copier update\`"; drifted=$((drifted + 1)); fi
  else
    tracks="—"
    drift="not adopted: add \`.copier-answers.yml\`"
    drifted=$((drifted + 1))
  fi
  found=""
  for a in "${assets[@]}"; do
    git -C "$path" cat-file -e "${ref}:${a}" 2>/dev/null && found+="\`${a}\` "
  done
  rows+="| \`${repo}\` (${name}) | ${tier} | ${tracks} | ${drift} | ${found:-none} |"$'\n'
done < <(yq -r '.projects | to_entries[] | select(.value.tags[] == "live") | [.key, .value.path, .value.url] | @tsv' "$house/desk/mani.yaml")

cat > "$out" <<EOF
---
title: Estate drift ${date}
kind: estate
date: ${date}
blueprint: ${tag}
drifted: ${drifted}
---
# Estate drift — ${date}

Live set from \`desk/mani.yaml\`, each repo's default branch against blueprint \`${tag}\`.
A drifted repo gets one PR from \`conform.sh\` through multi-gitter; the merge is Jamie's.
Claude and agent assets are listed for the human check that each one is still used.

| Repo | Tier | Tracks | Drift | Claude and agent assets |
|---|---|---|---|---|
${rows}
EOF
echo "$out"
