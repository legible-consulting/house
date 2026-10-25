#!/bin/bash
# legible: cloud environment setup script. Canonical copy; the environment dialog at
# claude.ai/code holds a pasted copy (see core/stack.md, "Cloud environment").
# Runs as root on Ubuntu 24.04 before Claude starts.
# Must exit 0 and finish in under ~5 minutes, or the environment is not cached.
# Installs only what a session uses; a tool joins in the commit that builds the module
# that calls it (why: the 2026-10-16 audit found seven tools installed that nothing called).
# gitleaks stays for checklist item the core's cloud check (`which yq gitleaks`).
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

# gitleaks: Ubuntu's package (8.16) is seconds; the local machine has Homebrew's current one.
if ! have gitleaks; then
  { apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq gitleaks; } \
    >/tmp/setup-apt.log 2>&1 || log "gitleaks install failed, see /tmp/setup-apt.log"
fi

# trafilatura: the research intake (research, research/intake.md) fetches a page as text
# with it. A Python tool with no compile; uv is in the image. The shim lands in /usr/local/bin
# and the tool in /opt/uv-tools, so every user sees them. Without uv, Ubuntu's html2text is
# the fallback; intake.md names both.
if ! have trafilatura && ! have html2text; then
  if have uv; then
    UV_TOOL_DIR=/opt/uv-tools UV_TOOL_BIN_DIR=/usr/local/bin uv tool install -q trafilatura==2.3.1 \
      >/tmp/setup-uv.log 2>&1 || log "trafilatura install failed, see /tmp/setup-uv.log"
  else
    { apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq python3-html2text; } \
      >>/tmp/setup-apt.log 2>&1 || log "html2text install failed, see /tmp/setup-apt.log"
  fi
fi

# yt-dlp: the research intake reads a video's description and captions with it (intake.md,
# step 4c). The same route as trafilatura. Without it, the intake works from the page text.
if ! have yt-dlp && have uv; then
  UV_TOOL_DIR=/opt/uv-tools UV_TOOL_BIN_DIR=/usr/local/bin uv tool install -q yt-dlp==2026.8.19 \
    >>/tmp/setup-uv.log 2>&1 || log "yt-dlp install failed, see /tmp/setup-uv.log"
fi

for t in jq yq gitleaks; do have "$t" && log "ok $t" || log "MISSING $t"; done
if have trafilatura; then log "ok trafilatura"; elif have html2text; then log "ok html2text (trafilatura fallback)"; else log "MISSING trafilatura"; fi
if have yt-dlp; then log "ok yt-dlp"; else log "MISSING yt-dlp (the intake reads a video from its page text)"; fi
yq --version 2>/dev/null | grep -q mikefarah || log "MISSING mikefarah yq (found $(yq --version 2>&1 | head -1))"
exit 0
