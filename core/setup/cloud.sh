#!/bin/bash
# legible: cloud environment setup script. Canonical copy; the environment dialog at
# claude.ai/code holds a pasted copy (see core/stack.md, "Cloud environment").
# Runs as root on Ubuntu 24.04 before Claude starts. Skips any tool already on PATH.
# Must exit 0 and finish in under ~5 minutes, or the environment is not cached.
set -u
log()  { echo "[legible-setup] $*"; }
have() { command -v "$1" >/dev/null 2>&1; }
run()  { local name=$1; shift; "$@" >"/tmp/setup-$name.log" 2>&1 || log "$name failed, see /tmp/setup-$name.log"; }

# apt: gitleaks, dateutils. Ubuntu names dateutils' commands dateutils.dX; alias them to
# dateX so commands read the same here and on the Homebrew machine.
apt_pkgs=()
have gitleaks || apt_pkgs+=(gitleaks)
have dateadd  || apt_pkgs+=(dateutils)
[ ${#apt_pkgs[@]} -gt 0 ] && run apt bash -c "apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq ${apt_pkgs[*]} && for f in /usr/bin/dateutils.d*; do ln -sf \"\$f\" \"/usr/local/bin/date\${f##*/dateutils.d}\"; done" &

have cspell || run cspell npm install -g --silent cspell@10.4.0 &
have vale   || run vale env GOBIN=/usr/local/bin go install github.com/errata-ai/vale/v3/cmd/vale@v3.24.0 &
have mdq    || run mdq cargo install --locked --root /usr/local mdq@0.10.0 &
have duckdb || run duckdb bash -c 'UV_TOOL_BIN_DIR=/usr/local/bin uv tool install duckdb-cli==1.5.6 || pip install --break-system-packages duckdb-cli==1.5.6' &
# lychee from its GitHub release: compiling it from crates.io would blow the 5-minute budget.
have lychee || run lychee bash -c 'mkdir -p /tmp/lychee && curl -fsSL https://github.com/lycheeverse/lychee/releases/download/lychee-v0.24.2/lychee-x86_64-unknown-linux-gnu.tar.gz | tar -xz -C /tmp/lychee && install -m 755 "$(find /tmp/lychee -type f -name lychee | head -1)" /usr/local/bin/lychee' &

wait
for t in jq yq gitleaks dateadd cspell vale mdq duckdb lychee; do have "$t" && log "ok $t" || log "MISSING $t"; done
exit 0
