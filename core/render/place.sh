#!/usr/bin/env bash
# place.sh: copies a rendered PDF into the client's Google Drive folder, Clients/<client name>/,
# over the GNOME Drive mount with /usr/bin/gio. The rules are in core/CONTEXT.md § Outputs,
# render/.
#
# Usage: core/render/place.sh <client> <pdf>
#   <client name> is the `name` in clients/<client>/record.md. The PDF keeps the name
#   render.sh gave it, which starts with the kind in the client's language (kinds.json).
#   A file of the same name in the folder is replaced in place: its Drive link stays.
#   A file whose name starts with the signed kind is never written or replaced.
#   Prints "RESULT: PLACED <name>".
#
# Run by Jamie, or by a desktop session after it asked Jamie. Never in CI: CI holds no Drive
# key (why: a workflow that writes to Drive holds a key that outlives every rotation).
set -euo pipefail

gio=/usr/bin/gio

die() {
  echo "place.sh: $*" >&2
  exit 1
}

[ "$#" -eq 2 ] || { echo "usage: place.sh <client> <pdf>" >&2; exit 2; }
client="$1"
pdf="$2"
[[ "$client" =~ ^[a-z0-9][a-z0-9-]*$ ]] || die "'$client' is not a client slug"
[ -f "$pdf" ] || die "$pdf does not exist"
[[ "$pdf" == *.pdf ]] || die "$pdf is not a PDF"
[ -x "$gio" ] || die "$gio is not installed"
command -v yq >/dev/null || die "yq (mikefarah) is not installed: run core/setup/local.sh"
command -v jq >/dev/null || die "jq is not installed: run core/setup/local.sh"

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root="$(cd "$here/../.." && pwd)"
record="$root/clients/$client/record.md"
[ -f "$record" ] || die "$record does not exist"
name="$(yq --front-matter=extract '.name // ""' "$record")"
lang="$(yq --front-matter=extract '.language // ""' "$record")"
[ -n "$name" ] || die "$record has no 'name'"
[ -n "$lang" ] || die "$record has no 'language'"

base="$(basename "$pdf")"
words="$(jq -c --arg l "${lang:0:2}" '.[$l] // empty' "$here/kinds.json")"
[ -n "$words" ] || die "kinds.json has no words for language $lang"
signed="$(jq -r '.signed' <<< "$words")"
if [[ "$base" == "$signed"* ]]; then
  die "'$base' starts with '$signed': a signed document is never touched"
fi
named=0
while IFS= read -r word; do
  if [[ "$base" == "$word - "* ]]; then named=1; fi
done < <(jq -r '.proposal, .quote, .agreement' <<< "$words")
[ "$named" -eq 1 ] || die "'$base' is not named by render.sh for a client in $lang"

# On a Drive mount a file's URI holds its ID; the name people see is its display name.
child() {
  local parent="$1" want="$2" uri dn
  while IFS=$'\t' read -r uri _ _ dn; do
    if [ "${dn#standard::display-name=}" = "$want" ]; then
      printf '%s\n' "$uri"
      return 0
    fi
  done < <("$gio" list -u -a standard::display-name "$parent")
  return 1
}

# The client's folder is looked for on every Google Drive mount; exactly one must hold it.
folders=()
while IFS= read -r drive; do
  drive="${drive%/}"
  if clients="$(child "$drive" "Clients")" && folder="$(child "$clients" "$name")"; then
    folders+=("$folder")
  fi
done < <("$gio" mount -l | grep -oE 'google-drive://[^ ]+' | sort -u)
[ "${#folders[@]}" -gt 0 ] || die "no Google Drive mount holds 'Clients/$name': open Files, select the Google account, then run again"
[ "${#folders[@]}" -eq 1 ] || die "more than one Google Drive mount holds 'Clients/$name': unmount the others"
folder="${folders[0]}"

if existing="$(child "$folder" "$base")"; then
  "$gio" copy -T "$pdf" "$existing"
else
  "$gio" copy "$pdf" "$folder/"
fi
echo "RESULT: PLACED $base"
