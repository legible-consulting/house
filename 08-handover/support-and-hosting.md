---
title: "{{TITLE: Who hosts what, and what it costs, in {{LANGUAGE}}}}"
kind: support-and-hosting
client: "{{SLUG}}"
language: "{{LANGUAGE}}"
date: "{{YYYY-MM-DD}}"
pattern: "{{PATTERN: client-owned or Jamie-hosted}}"
status: draft
---

<!-- The template (08-handover/CONTEXT.md, step 4). Client-facing: the client reads it on
their page in the desk and in the pack, so write every line, the headings too, in
{{LANGUAGE}}. It restates core/terms.md § Hosting and support for this client and adds
nothing to the terms. Fill it from the access table, economics.yaml costs_monthly and Jamie's
answers. Secret names only: a value never enters this file or git. A row Jamie must confirm
says `not checked`, never a guess. Keep a row for each system the build uses. Delete a row the
build does not use. Drop this comment. -->

## 05 Who hosts what, and what it costs

{{PATTERN_LINE: the pattern the proposal names, and what it puts in whose name, in one
sentence. For example: everything is in your name, or the hosting is in my team and the code
and the content are yours.}}

| System | What it holds | Held by, from today | Monthly cost | Paid by | Secret names |
|---|---|---|---|---|---|
| GitHub `{{REPO}}` | The code, the history, the releases | {{REPO_HOLDER}} | none | none | {{CI_SECRET_NAMES or "none"}} |
| Vercel, project `{{VERCEL_PROJECT}}` | {{VERCEL_HOLDS: the site, the domains, the crons}} | {{VERCEL_HOLDER}} | {{VERCEL_COST}} | {{VERCEL_PAYER}} | {{RUNTIME_SECRET_NAMES}} |
| Neon, project `{{NEON_PROJECT}}` | {{DATABASE_HOLDS}} | {{NEON_HOLDER}} | {{NEON_COST}} | {{NEON_PAYER}} | `DATABASE_URL` |
| Domain `{{DOMAIN}}` | {{DOMAIN_HOLDS: the address, the mail domain}}. Registrar {{REGISTRAR}}, renews {{EXPIRY}} | {{DOMAIN_HOLDER}} | {{DOMAIN_COST: per year, shown per month}} | {{DOMAIN_PAYER}} | none |
| Resend | {{MAIL_HOLDS: the mail the site sends}} | {{RESEND_HOLDER}} | {{RESEND_COST}} | {{RESEND_PAYER}} | `RESEND_API_KEY`, `EMAIL_FROM` |
| Stripe | {{PAYMENTS_HOLDS}} | {{STRIPE_HOLDER: the client's company, the merchant of record}} | {{STRIPE_COST: Stripe's fees}} | {{STRIPE_PAYER}} | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` |
| Error tracking | {{ERROR_TRACKING_HOLDS}} | {{SENTRY_HOLDER}} | {{SENTRY_COST}} | {{SENTRY_PAYER}} | {{SENTRY_NAMES}} |
| {{OTHER_SYSTEM}} | {{OTHER_HOLDS}} | {{OTHER_HOLDER}} | {{OTHER_COST}} | {{OTHER_PAYER}} | {{OTHER_NAMES or "none"}} |

{{TOTAL: the monthly total the client pays, ex VAT, and the line: the values of the secrets
are in the Vercel and GitHub settings, never in a document.}}

### Support

{{SUPPORT: from core/terms.md § Hosting and support, for this pattern. Client-owned: none;
ongoing work is a retainer or nothing. Jamie-hosted: basic support inside the retainer, a
crash fix on call when the site is down or a flow is broken, nothing else. A site with no
state: no support line. Then: there is no warranty period after handover (core/terms.md §
Validity and revisions).}}

### What moves to you

| Account | From | To | The step | Done |
|---|---|---|---|---|
| {{ACCOUNT}} | {{FROM}} | {{TO}} | {{STEP: the repository transfer, the Vercel project transfer, the domain transfer}} | {{DONE: open; Jamie writes the date}} |

### The access that ends today

{{ACCESS_LINE: on {{PACK_DATE}}, every collaborator's seat is removed. For the client-owned
pattern, Jamie's own access ends too, unless a retainer runs.}}

| Person | Role | System | Seat | Removed |
|---|---|---|---|---|
| {{PERSON: from record.md collaborators and the access table}} | {{ROLE}} | {{SYSTEM}} | {{SEAT}} | {{REMOVED: open; Jamie writes the date}} |
