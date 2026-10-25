---
tool: Tel-Agent
kind: repo
verdict: watch
tier: verdict
use: [build, proposal]
tags: [phone, agents, self-hosted]
recheck: 2027-04-25
source: https://github.com/dpro-at/tel-agent
shared: https://www.facebook.com/share/r/1CNcuZGkBJ/
via: GithubSignals
date: 2026-10-25
---

# Tel-Agent

Tel-Agent is a self-hosted gateway between a SIP phone line and an AI model. It routes each call to a person, a block or an agent, records and transcribes it, and serves the same agent on chat, SMS, email and WhatsApp. Dpro GmbH in Vienna maintains it. Licence AGPL-3.0; status alpha.

## Verdict: watch

Watch (why: no line in `core/services.md` sells a phone agent, and an alpha with recordings of callers is a GDPR load the privacy page of a build must carry; but small businesses in Mafra answer the phone, and a client may ask · 2026-10-25).

## What would change it

- A client in the proposal asks for calls or messages answered by an agent.
- Tel-Agent leaves alpha.

## Source

https://github.com/dpro-at/tel-agent · fetched 2026-10-25 · "Tel-Agent: AI phone assistant". gh api refused (HTTP 403: repository not enabled for this session); README and licence read from raw.githubusercontent.com.
