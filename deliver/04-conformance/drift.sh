#!/usr/bin/env bash
# drift.sh — D4's report over every repo in desk/mani.yaml. A live or proof repo: does its
# default branch track the latest blueprint tag. A dormant repo: is it archived. Every repo:
# which Claude and agent assets does it carry. Writes desk/estate/drift-<date>.md. Reads the
# local lane (fetch only) and the GitHub API (archived flag); changes no client repo.
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
while IFS=$'\t' read -r name path url tags; do
  path="${path/#\~/$HOME}"
  repo="$(printf '%s' "$url" | sed -E 's#^https://github.com/##; s#\.git$##')"
  tier="$(tier_of "$repo")"
  if [ ! -d "$path/.git" ]; then
    rows+="| \`${repo}\` (${name}, ${tags}) | ${tier} | — | no local clone at \`${path}\` | — |"$'\n'
    drifted=$((drifted + 1))
    continue
  fi
  git -C "$path" fetch -q origin
  ref="$(git -C "$path" symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null || echo origin/main)"
  case ",${tags}," in
    *,dormant,*)
      archived="$(gh api "repos/${repo}" --jq .archived 2>/dev/null || echo unknown)"
      tracks="—"
      if [ "$archived" = "true" ]; then drift="archived"; else drift="not archived: archive it"; drifted=$((drifted + 1)); fi
      ;;
    *)
      if answers="$(git -C "$path" show "${ref}:.copier-answers.yml" 2>/dev/null)"; then
        tracks="$(printf '%s\n' "$answers" | yq '._commit')"
        [ "$tier" = "no record" ] && tier="$(printf '%s\n' "$answers" | yq '.tier') (answers)"
        if [ "$tracks" = "$tag" ]; then drift="current"; else drift="behind: \`copier update\`"; drifted=$((drifted + 1)); fi
      else
        tracks="—"
        drift="not adopted: add \`.copier-answers.yml\`"
        drifted=$((drifted + 1))
      fi
      ;;
  esac
  found=""
  for a in "${assets[@]}"; do
    git -C "$path" cat-file -e "${ref}:${a}" 2>/dev/null && found+="\`${a}\` "
  done
  rows+="| \`${repo}\` (${name}, ${tags}) | ${tier} | ${tracks} | ${drift} | ${found:-none} |"$'\n'
done < <(yq -r '.projects | to_entries[] | [.key, .value.path, .value.url, (.value.tags | join(","))] | @tsv' "$house/desk/mani.yaml")

cat > "$out" <<EOF
---
title: Estate drift ${date}
kind: estate
date: ${date}
blueprint: ${tag}
drifted: ${drifted}
---
# Estate drift — ${date}

Every repo in \`desk/mani.yaml\`. A live or proof repo's default branch is read against
blueprint \`${tag}\`; a dormant repo is read for its archived flag. A drifted repo gets one PR
from \`conform.sh\` through multi-gitter; the merge is Jamie's.
Claude and agent assets are listed for the human check that each one is still used.

| Repo | Tier | Tracks | Drift | Claude and agent assets |
|---|---|---|---|---|
${rows}
EOF
echo "$out"
