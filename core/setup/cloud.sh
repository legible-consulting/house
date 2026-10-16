#!/bin/bash
# legible: cloud environment setup script. Canonical copy; the environment dialog at
# claude.ai/code holds a pasted copy (see core/stack.md, "Cloud environment").
# Runs as root on Ubuntu 24.04 before Claude starts.
# Must exit 0 and finish in under ~5 minutes, or the environment is not cached.
# Installs only what a session uses; a tool joins in the commit that builds the module
# that calls it (why: the 2026-10-16 audit found seven tools installed that nothing called).
set -u
log()  { echo "[legible-setup] $*"; }
have() { command -v "$1" >/dev/null 2>&1; }

# yq: the image ships kislyuk's Python yq at /usr/bin/yq, a jq wrapper with no
# --front-matter. Put mikefarah's ahead of it in /usr/local/bin. Check the flavour, not
# just the name, or the wrapper passes the check.
if ! yq --version 2>/dev/null | grep -q mikefarah; then
  curl -fsSL -o /usr/local/bin/yq https://github.com/mikefarah/yq/releases/download/v4.54.1/yq_linux_amd64 \
    && chmod 755 /usr/local/bin/yq || log "yq download failed"
fi

for t in jq yq; do have "$t" && log "ok $t" || log "MISSING $t"; done
yq --version 2>/dev/null | grep -q mikefarah || log "MISSING mikefarah yq (found $(yq --version 2>&1 | head -1))"
exit 0
