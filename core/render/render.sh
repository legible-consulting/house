#!/usr/bin/env bash
# render.sh: one client document to one PDF in the house's design (core/voice.md § Document
# design). The rules it follows are in core/CONTEXT.md § Outputs, render/.
#
# Usage: core/render/render.sh <client> <proposal|quote|agreement> [--out <dir>]
#   Reads clients/<client>/<kind>/<kind>.md. A proposal takes quote/quote.md as its last
#   section. Without --out, the PDF goes to a new temporary folder.
#   Prints "RESULT: RENDERED <path>".
#
# .github/workflows/render.yml runs it on a pull request and on main. A session never runs it
# locally: it reads the PDF from the run's artifact (CI is truth).
set -euo pipefail

usage() {
  echo "usage: render.sh <client> <proposal|quote|agreement> [--out <dir>]" >&2
  exit 2
}

[ "$#" -ge 2 ] || usage
client="$1"
kind="$2"
shift 2
out=""
while [ "$#" -gt 0 ]; do
  case "$1" in
    --out)
      [ "$#" -ge 2 ] || usage
      out="$2"
      shift 2
      ;;
    *) usage ;;
  esac
done

[[ "$client" =~ ^[a-z0-9][a-z0-9-]*$ ]] || { echo "render.sh: '$client' is not a client slug" >&2; exit 2; }
case "$kind" in
  proposal | quote | agreement) ;;
  *) usage ;;
esac

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root="$(cd "$here/../.." && pwd)"
doc="$root/clients/$client/$kind/$kind.md"
[ -f "$doc" ] || { echo "render.sh: $doc does not exist" >&2; exit 1; }
[ -n "$out" ] || out="$(mktemp -d)"
mkdir -p "$out"
out="$(cd "$out" && pwd)"

# The packages are pinned by package-lock.json; install them once, as the lock says.
[ -d "$here/node_modules" ] || npm ci --prefix "$here" --no-audit --no-fund >&2

cd "$here"
exec "$here/node_modules/.bin/tsx" --tsconfig "$here/tsconfig.json" "$here/render-pdf.tsx" \
  --root "$root" --client "$client" --kind "$kind" --out "$out"
