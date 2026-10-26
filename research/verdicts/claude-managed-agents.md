---
tool: Claude Managed Agents
kind: service
verdict: watch
tier: verdict
use: [build, proposal]
tags: [claude, agents, api]
recheck: 2027-04-26
source: https://platform.claude.com/docs/en/managed-agents/overview
shared: https://www.facebook.com/share/v/1CAjc248dS/
via: Taki Wong
date: 2026-10-26
---

# Claude Managed Agents

Claude Managed Agents is Anthropic's hosted agent harness on the Claude Platform. You define an agent (model, system prompt, tools, MCP servers, skills) once, and start sessions of it in an environment. The environment is an Anthropic cloud sandbox or a sandbox on your own infrastructure. The application sends events and streams the results. It is in beta since 2026-04-01. The overview page does not give a price.

## Verdict: watch

Watch (why: the App and Platform lines (`core/services.md`) may soon include a client feature that runs a long agent task in the background, and this service gives that feature without a home-built agent loop; but no client build asks for it today, the house's own unattended runs already work as claude.ai routines, and the service is a beta API with a separate bill per session · 2026-10-26).

## What would change it

- A client proposal names a feature that is an agent task: a long research, a document run, a background job with tools.
- The service leaves beta, with a public price per session.

## Source

https://platform.claude.com/docs/en/managed-agents/overview · fetched 2026-10-26 · "Claude Managed Agents overview". The reel (yt-dlp) names "Managed Agents" and gives no link. Found by search. The post's claim "without touching a single line of code" does not match the page: the page is an API for developers. The post asks for a comment to get a guide; that is not information.
