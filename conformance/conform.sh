#!/usr/bin/env bash
# conform.sh
# is owner/name). A repo rendered from the blueprint gets `copier update` to the latest tag. A
# repo built before the blueprint is adopted: only `.copier-answers.yml` is added, from its
# client record, so later tags reach it by `copier update` and none of its own files changes.
set -euo pipefail

: "${REPOSITORY:?run through multi-gitter, which sets REPOSITORY}"
house="$(cd "$(dirname "$0")/.." && pwd)"
src="gh:legible-consulting/blueprint"

if [ -f .copier-answers.yml ]; then
  copier update --defaults --conflict inline
  exit 0
fi

rec=""
for f in "$house"/clients/*/record.md; do
  case "$f" in */_template/*) continue ;; esac
  [ "$(yq --front-matter=extract '.repo' "$f")" = "$REPOSITORY" ] && rec="$f"
done
[ -n "$rec" ] || { echo "no client record has repo: ${REPOSITORY}" >&2; exit 1; }

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
copier copy --defaults \
  -d slug="${REPOSITORY#*/}" \
  -d client_name="$(yq --front-matter=extract '.name' "$rec")" \
  -d language="$(yq --front-matter=extract '.language' "$rec")" \
  "$src" "$tmp"
cp "$tmp/.copier-answers.yml" .
