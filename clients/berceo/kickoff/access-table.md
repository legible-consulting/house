# Berceo: access table

Prepared 2026-10-23 from the client repo's `.env.example`, `.icm/project.json`, the seven
workflows in `.github/workflows/`, `README.md`, the devis and Jamie's answers of 2026-10-23.
Secret names only. A value never enters this file or git. Values live in Vercel project settings
(runtime), in the repo's GitHub Actions secrets (CI), or in Jamie's own shell (`local`). "Who
holds the account" is the account owner, not who has a seat. A row that says `unknown` is Jamie's
to fill. The devis sets the rule: every technical account is Jamie's and is rebilled at cost, except
Stripe, which is Berceo's.

| System | What it holds | Who holds the account | Secret names | Where the value lives |
|---|---|---|---|---|
| GitHub `k0d0minio/berceo` | The code, the tickets (`.icm/intake/`), the pull requests and gates, the releases (`release/` tags), the scheduled jobs' workflows | Jamie (his own account) | `GITHUB_TOKEN` (injected by Actions, never set), `CRON_SECRET`, `NEON_API_KEY`, `VERCEL_TOKEN_KODOMINIO` | Actions secrets. `VERCEL_TOKEN_KODOMINIO` also in Jamie's shell for `.icm/scripts/` |
| Vercel team `kodominio`, project `berceo` | Production `www.berceo.be`, UAT `uat.berceo.be`, the PR previews. The daily purge cron (`vercel.json`) | Jamie | every runtime name below, per environment | Vercel env |
| Neon Postgres, production project `tiny-cell-08223046` | The production database (branch `main`) and its Neon Auth and Object Storage | Jamie (org Kodominio) | `DATABASE_URL` (injected by the Neon-Vercel integration), `NEON_AUTH_BASE_URL` (injected) | Vercel env, set by the integration |
| Neon Postgres, non-production project `dawn-scene-70949411` | UAT's database and one branch per preview, deleted by `neon-cleanup.yaml` | Jamie (org Kodominio) | `DATABASE_URL`, `NEON_AUTH_BASE_URL` (injected), `NEON_API_KEY` (CI only, never in Vercel) | Vercel env (preview), Actions secrets (CI) |
| Neon Auth (Managed Better Auth) | Accounts, sessions, the magic-link webhook. Verification required, Google off, the site's domains trusted | Jamie, through the Neon projects | `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET` | Vercel env |
| Neon Object Storage, bucket `documents` | The professionals' documents and photos, private, eu-central-1. UAT and previews share the non-production store, production its own | Jamie, through the Neon projects | `DOCUMENTS_S3_ENDPOINT`, `DOCUMENTS_S3_REGION`, `DOCUMENTS_BUCKET`, `DOCUMENTS_S3_ACCESS_KEY_ID`, `DOCUMENTS_S3_SECRET_ACCESS_KEY` | Vercel env |
| Resend | Every transactional e-mail. The sender is on Jamie's domain, verified on Resend, SPF and DKIM at Infomaniak (D-28). A berceo.be sender is an open item before launch (Jamie, 2026-10-23) | Jamie | `RESEND_API_KEY`, `EMAIL_FROM` | Vercel env |
| Stripe | The 3 % service fee: Checkout, refunds, one webhook endpoint per environment. A test key on UAT and the previews. Berceo's own account does not exist yet (Jamie, 2026-10-23). The devis puts the account in Berceo's name | Berceo, once created. Jamie's sandbox until then | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Vercel env |
| Scheduled jobs | The purge of refused files (Vercel cron, production only), the daily digest of requests, the reminder of the day before, the rating invitations (GitHub Actions, UAT and production). One bearer for every environment (D-68) | Jamie | `CRON_SECRET` | Vercel env and Actions secrets, the same value |
| Domains `berceo.be`, `berceo.eu` | The production site, UAT, the future mail domain. Transfer from the previous developer done. DNS managed by Jamie | Jamie manages the DNS. The registrar is unknown (not checked) | none in the repo | the registrar |
| Google Drive, folder `berceo` | The client's documents: feedback rounds, the rendered agreement (in the older folder `Berceo` under 01-Clients) | Jamie (contact@jamienisbet.com) | none | Drive |
| Google Drive, Surya's packs | The logo pack, the brand identity, the web art direction, the editorial and SEO guide, the image bank. Brand masters never enter git | Surya (romane@agencesurya.com, chloe@agencesurya.com), shared with Jamie | none | Drive |
| Google eSignature | The agreement's signature, when sent | Jamie | none | Drive |
| Error tracking | Nothing. `SENTRY_DSN` is a reserved name in `project.json`, unread | — | none yet | — |
| Slack, report e-mail | Nothing. `SLACK_BOT_TOKEN`, `SLACK_ANNOUNCE_CHANNEL_ID`, `SLACK_ALERTS_CHANNEL_ID`, `REPORT_EMAIL_FROM`, `REPORT_EMAIL_TO` are reserved names in `project.json`. The release announces on GitHub only | — | none yet | — |

Rules this table follows: `.env.example` is the one catalogue of runtime names, each with its
environments in brackets. Vercel reserves the `AWS_*` names, so the storage names are
`DOCUMENTS_S3_*`. A plaintext credential found anywhere is flagged, never copied.

A read of the repo's `.env.example`, `project.json`, workflows and `README.md` on 2026-10-23
found no plaintext credential. Nothing to flag.
