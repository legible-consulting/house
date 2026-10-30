---
concept: Custom GitHub App for salesman write-back
kind: concept
verdict: watch
tier: verdict
use: [build, prospecting, house]
tags: [github-app, oauth, write-back]
recheck: 2027-01-14
source: "https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-with-a-github-app-on-behalf-of-a-user"
date: 2026-10-14
---

# Custom GitHub App for salesman write-back

Audited on 2026-10-14 for a build, prospecting and the house (the ledger's section "C. Estate, templates, secrets, CI, write-back"). Licence and latest release at the audit: docs.

## Verdict: watch

Watch (why: GitHub attributes a commit to whoever's token made it: a user access token (8 h, 6-month refresh) plus `PUT /repos/{o}/{r}/contents/{path}` lands the salesman's edit as his own commit. About 150 lines, but Jamie owns OAuth, refresh and sha conflicts. The off-the-shelf CMS routes were dropped at audit; salesman write-back is a separate research project (decision 2026-10-14) · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-with-a-github-app-on-behalf-of-a-user · audited 2026-10-14 · from the library's ledger, section "C. Estate, templates, secrets, CI, write-back". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.

## Update 2026-10-30

The house answered this question another way. The desk writes the handoff as one commit to `main`, with `DESK_PAT`, and opens no pull request (`01-prospecting/CONTEXT.md`, The handoff). The commit carries the account that owns `DESK_PAT`, Jamie, and its message names the salesman. The epic `salesman-writes-main` decided that identity (`.icm/intake/_done/salesman-writes-main/breakdown.md`, Decisions of record, 2026-10-29). This App stays `watch`. A second salesman who asks for his own name in the history reopens it.
