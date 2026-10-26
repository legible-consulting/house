# {{CLIENT_NAME}}: access table

<!-- The template (06-kickoff/CONTEXT.md, step 4). Fill every {{PLACEHOLDER}}. Keep a row for
each system the build uses. Delete a row the build does not use. A row Jamie must confirm says
`not checked`, never a guess. Drop this comment. -->

Prepared {{YYYY-MM-DD}} from {{SOURCES: the kickoff answers of <date>, the agreement, the
proposal, the client repo's `.env.example` and `.github/workflows/`, the consoles, and Jamie's
answers of <date>}}. Secret names only. A value never enters this file or git. Values live in
Vercel project settings (runtime), in the repo's GitHub Actions secrets and variables (CI), or
in Jamie's password manager. "Who holds the account" is the account owner, not who has a seat.
A row that says `not checked` is Jamie's to confirm.

The hosting pattern is {{HOSTING_PATTERN: client-owned or Jamie-hosted}} (`core/terms.md` §
Hosting and support, named in the proposal). {{HOSTING_RULE: what that pattern puts in whose
name, for example "every technical account is Jamie's, except Stripe, which is the client's"}}.

| System | What it holds | Who holds the account | Secret names | Where the value lives |
|---|---|---|---|---|
| GitHub `k0d0minio/{{SLUG}}` (private) | The code, the tickets (`.icm/intake/`), the pull requests and gates, the releases | Jamie (his own account) | `GITHUB_TOKEN` (injected by Actions, never set), {{CI_SECRET_NAMES}} | Actions secrets and variables |
| Vercel team `{{VERCEL_TEAM}}`, project `{{VERCEL_PROJECT}}` | {{VERCEL_HOLDS: production domain, UAT domain when `uat` is yes, the previews, the crons}} | {{VERCEL_OWNER}} | {{RUNTIME_SECRET_NAMES}} | Vercel env, per environment |
| Neon, project `{{NEON_PROJECT}}` | {{DATABASE_HOLDS: the production database, and the UAT branch or project}} | {{NEON_OWNER}} | `DATABASE_URL` (set by the Neon-Vercel integration), {{NEON_SECRET_NAMES}} | Vercel env, set by the integration. `NEON_API_KEY` in Actions |
| Domain `{{DOMAIN}}` | The public site, the mail domain. Registrar {{REGISTRAR}}, expires {{EXPIRY}}. DNS at {{DNS_HOST}} | {{DOMAIN_OWNER}} | none in the repo | The registrar panel |
| Mail on `@{{DOMAIN}}` | {{MAILBOXES: the client's inboxes, from the kickoff answers}} | {{MAIL_OWNER}} | none | {{MAIL_PROVIDER}} |
| Resend | Transactional mail from {{SENDING_ADDRESS}}. Sending domain {{SENDING_DOMAIN}}, verified: {{VERIFIED}} | {{RESEND_OWNER}} | `RESEND_API_KEY`, `EMAIL_FROM` | Vercel env |
| Stripe | {{PAYMENTS_HOLDS: what the site charges, the webhook}}. Sandbox keys on the previews and UAT | {{STRIPE_OWNER: the client's company, the merchant of record}} | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, {{STRIPE_OTHER_NAMES}} | Vercel env. Live keys in Production only |
| Error tracking | {{ERROR_TRACKING: Sentry and its org, or "Nothing"}} | {{SENTRY_OWNER}} | {{SENTRY_NAMES}} | Vercel env |
| {{OTHER_SYSTEM: from the kickoff answer `other_accounts`}} | {{OTHER_HOLDS}} | {{OTHER_OWNER}} | {{OTHER_NAMES or "none"}} | {{OTHER_WHERE}} |

Rules this table follows: `.env.example` is the catalogue of runtime names. Secrets never go in
git: names only, values in GitHub or Vercel settings (the client repo's `CLAUDE.md`). A
plaintext credential found anywhere is flagged to Jamie, never copied.

{{SCAN: a read of the kickoff answers and the client repo on <date> found no plaintext
credential. Nothing to flag. Or: what was found, where, and that it was flagged in the pull
request, never copied.}}
