---
tool: "Drive, Docs, Calendar and Gmail APIs"
kind: service
verdict: adopt
tier: verdict
use: [build, proposal, house]
tags: [google, api, drive]
recheck: 2027-04-14
source: "https://developers.google.com/workspace/drive/api/guides/manage-uploads"
date: 2026-10-14
---

# Drive, Docs, Calendar and Gmail APIs

Audited on 2026-10-14 for a build, a proposal and the house (the ledger's section "E. Google Workspace"). Licence and latest release at the audit: free (ToS) · docs.

## Verdict: adopt

Adopt (why: `files.create` with `mimeType application/vnd.google-apps.document` converts DOCX, HTML, txt and `text/markdown` to a native Doc; `events.insert`; `messages.list/get/send`. Thirty-line scripts; the primitive every CLI wraps · 2026-10-14).

## What would change it

- Not recorded at the audit. The recheck date stands.

## Source

https://developers.google.com/workspace/drive/api/guides/manage-uploads · audited 2026-10-14 · from the library's ledger, section "E. Google Workspace". The ledger of 188 rows: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj.
