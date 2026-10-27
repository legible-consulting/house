#!/usr/bin/env bash
# publish.sh
# Every case at ready: true becomes a page on jamienisbet.com. Reads clients/*/case/case.md in
# the house, writes each ready case as content/work/<slug>.md in the local clone of
# k0d0minio/jamienisbet (the path in desk/mani.yaml, or the first argument), commits and pushes
# to the site's main with Jamie's own git login. Vercel deploys the site from that main.
# content/work/ in the site is the house's: the script empties it and writes it again, so a
# case set back to ready: false or deleted leaves the site. It shows the change and asks before
# it pushes. It sends nothing to anyone and moves no stage.
set -euo pipefail

house="$(cd "$(dirname "$0")/.." && pwd)"

yq --version | grep -q mikefarah || { echo "yq is not mikefarah's" >&2; exit 1; }

site="${1:-$(yq -r '.projects.jamienisbet.path' "$house/desk/mani.yaml")}"
site="${site/#\~/$HOME}"
[ -d "$site/.git" ] || { echo "no clone of k0d0minio/jamienisbet at ${site}" >&2; exit 1; }

# Start from the site's main as it is on GitHub, with nothing of Jamie's in the way.
branch="$(git -C "$site" branch --show-current)"
[ "$branch" = main ] || { echo "${site} is on '${branch}', not main. Switch it to main." >&2; exit 1; }
[ -z "$(git -C "$site" status --porcelain)" ] || { echo "${site} has uncommitted changes. Commit or stash them." >&2; exit 1; }
git -C "$site" pull -q --ff-only origin main

work="$site/content/work"
rm -rf "$work"
mkdir -p "$work"
fail=0
count=0
for f in "$house"/clients/*/case/case.md; do
  [ -f "$f" ] || continue
  rel="${f#"$house"/}"
  [ "$(yq --front-matter=extract '.ready == true' "$f")" = true ] || continue
  slug="$(yq --front-matter=extract '.slug // ""' "$f")"
  # The slug is the file name on the site: lower case, digits and hyphens only.
  if ! [[ "$slug" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    echo "${rel}: slug '${slug}' is not lower case, digits and hyphens" >&2; fail=1; continue
  fi
  if [ -e "$work/${slug}.md" ]; then
    echo "${rel}: slug '${slug}' is used by another ready case" >&2; fail=1; continue
  fi
  cp "$f" "$work/${slug}.md"
  echo "${rel} -> content/work/${slug}.md"
  count=$((count + 1))
done
if [ "$fail" != 0 ]; then
  git -C "$site" checkout -q -- content/work 2>/dev/null || true
  git -C "$site" clean -fdq -- content/work
  echo "Nothing written. Fix the cases above, then run again." >&2
  exit 1
fi
echo "${count} ready case(s)."

git -C "$site" add -A -- content/work
if git -C "$site" diff --cached --quiet; then
  echo "content/work did not change. No commit."
  exit 0
fi
git -C "$site" diff --cached --stat
read -r -p "Commit and push this to the main of k0d0minio/jamienisbet? [y/N] " answer || answer=""
if [ "$answer" != y ] && [ "$answer" != Y ]; then
  git -C "$site" reset -q -- content/work
  git -C "$site" checkout -q -- content/work 2>/dev/null || true
  git -C "$site" clean -fdq -- content/work
  echo "Nothing pushed. The clone is as it was."
  exit 0
fi
git -C "$site" commit -q -m "house: cases $(date +%F)"
git -C "$site" push -q origin HEAD:main
echo "Pushed. jamienisbet.com shows the ready cases after Vercel deploys."
