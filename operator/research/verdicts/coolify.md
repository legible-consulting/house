---
tool: Coolify
kind: repo
verdict: decline
tier: deep
modules: [D2, D3]
tags: [self-hosted, deploy, hosting]
recheck: 2027-04-25
source: https://github.com/coollabsio/coolify
shared: https://www.facebook.com/share/r/1Hu3K3EDaA/
via: Dail Finds Dev - Repos, Tools, Sites
date: 2026-10-25
---

# Coolify

Coolify is a self-hosted alternative to Heroku, Netlify and Vercel. It deploys apps, databases and more than 360 one-click services to any server reached over SSH, with domains, HTTPS, previews and backups. Coolify Cloud is the paid hosted version. Licence Apache-2.0.

## Verdict: decline

Decline (why: the house deploys on Vercel with Neon behind it (`core/stack.md`, The desk app), and hosting rides inside the retainer (`core/services.md`, Retainer); Coolify moves the servers to Jamie, so every patch, backup and outage becomes support the retainer does not price · 2026-10-25).

## What would change it

- A client must host in its own data centre or on a named EU server, and Vercel cannot meet it.
- Vercel's price for a client's traffic passes the cost of a managed server plus Jamie's hours to run it.

## How the house would use it

D2 and D3, only for a client that must self-host. D2 would deploy the client repo to the client's own server through Coolify. D3 would hand the Coolify dashboard over with the server. It would replace Vercel for that one client.

## To try

https://coolify.io/docs/installation. A good result: a preview deploy per pull request on a test server, as Vercel gives today.

## Source

https://github.com/coollabsio/coolify · fetched 2026-10-25 · "Coolify: an open-source platform to deploy applications, databases, and services on your own servers". gh api refused (HTTP 403: repository not enabled for this session); README and licence read from raw.githubusercontent.com.
