---
tool: Weave Router
kind: service
verdict: watch
tier: deep
use: [build]
tags: [llm, cost, api, self-hosted]
recheck: 2027-05-02
source: https://github.com/weave-os/router
shared: https://www.facebook.com/share/r/14teesuQUTE/
via: GithubSignals
date: 2026-11-02
---

# Weave Router

Weave Router is a proxy that picks a model for each request to the Anthropic, OpenAI or Gemini APIs, with an embedding and a cluster scorer. It supports streaming, tool calls and vision. Weave sells a hosted router; the self-hosted router (Go, Postgres, Docker) runs on your own provider keys, and its learned policy is a frozen, reduced copy. Licence Apache 2.0 from `router-v0.2.24`.

## Verdict: watch

Watch (why: the house runs Claude Code on a subscription (`core/stack.md`, the `claude` row), so a per-request router saves it no money and puts a third party between every session and the model; a client build under AI & non-AI automation that calls a model at per-token prices is where routing pays, and none is signed yet · 2026-11-02).

## What would change it

- A signed build calls a model API at a volume where the bill is a line in the client's costs.
- An independent test confirms the "40 to 70 percent" saving with no loss of quality on a task like the client's.
- The hosted router publishes a data-retention and training policy that a client's GDPR record can name.

## How the house would use it

In a client build under AI & non-AI automation or AI business infrastructure (`core/services.md`): the build's model calls go to a self-hosted router in front of the provider, so simple requests reach a cheaper model. It adds a proxy and a Postgres; it replaces a fixed model choice in the build's config. Self-hosted only, with the client's own provider key.

## To try

`POST /v1/route` on a local router (`make full-setup` in a clone) with twenty requests taken from the build's real traffic. A good result: the simple requests route to a cheaper model, and the hard ones stay on the strong model.

## Source

https://github.com/weave-os/router · fetched 2026-11-02 · "Weave Router". Caption read with yt-dlp 2026.10.26 (uvx); it names `weave-os/router` after "Open source:". README read from raw.githubusercontent.com. The repository page refused the fetch (trafilatura TLS error, gh api HTTP 403). The saving of "forty to seventy percent" is the post's claim, not checked. "Follow for more" in the caption is a call to act, not information.
