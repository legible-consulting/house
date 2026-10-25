---
concept: Custom GitHub App for salesman write-back
kind: concept
verdict: watch
tier: verdict
modules: [D2, D4, S1, C2]
tags: [github-app, oauth, write-back]
recheck: 2027-01-14
source: "https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-with-a-github-app-on-behalf-of-a-user"
date: 2026-10-14
---

# Custom GitHub App for salesman write-back

Audited on 2026-10-14 for D2, D4, S1, C2 (the ledger's section "C. Estate, templates, secrets, CI, write-back"). Licence and latest release at the audit: docs.

## Verdict: watch

Watch (why: GitHub attributes a commit to whoever's token made it: a user access token (8 h, 6-month refresh) plus `PUT /repos/{o}/{r}/contents/{path}` lands the salesman's edit as his own commit. About 150 lines, but Jamie owns OAuth, refresh and sha conflicts. The off-the-shelf CMS routes were dropped at audit; salesman write-back is a separate research project (decision 2026-10-14) · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-with-a-github-app-on-behalf-of-a-user · audited 2026-10-14 · from the library's ledger, section "C. Estate, templates, secrets, CI, write-back". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.
