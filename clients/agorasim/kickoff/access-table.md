# Agorasim: access table

Prepared 2026-10-23 from the client repo's `web/.env.example`, the names the code reads
(`process.env.*` in `web/src`), the four workflows in `.github/workflows/`, `.icm/project.json`,
`.icm/docs/launch-runbook.md`, the Vercel and Neon consoles, and Jamie's answers of 2026-10-23.
Secret names only. A value never enters this file or git. Values live in Vercel project settings
(runtime), in the repo's GitHub Actions secrets and variables (CI), or in Jamie's password
manager. "Who holds the account" is the account owner, not who has a seat. A row that says
`not checked` is Jamie's to confirm.

| System | What it holds | Who holds the account | Secret names | Where the value lives |
|---|---|---|---|---|
| GitHub `k0d0minio/agorasim` (private) | The code, the tickets (`.icm/intake/`), the pull requests and gates, the releases | Jamie (his own account) | `GITHUB_TOKEN` (injected by Actions, never set), `DATABASE_URL`, `ADMIN_SEED_EMAIL`, `ADMIN_SEED_NAME`, `ADMIN_SEED_PASSWORD` (db-migrate), `RESEND_API_KEY`, `SLACK_BOT_TOKEN` (release, unused channel), variables `REPORT_EMAIL_FROM`, `REPORT_EMAIL_TO`, `SLACK_ANNOUNCE_CHANNEL_ID` | Actions secrets and variables |
| Vercel team `kodominio`, project `agorasim` | The site and the admin. Domains `uat.agorasim.pt` (custom environment `uat`) and `agorasim.jamienisbet.com`. `agorasim.pt` is not attached today. SSO protection on previews, off on custom domains | Jamie | `DATABASE_URL`, `ADMIN_SESSION_SECRET`, `CRON_SECRET`, `BOOKING_TOKEN_SECRET`, `EMAIL_OPT_OUT_SECRET` (never rotated), `NEXT_PUBLIC_SITE_URL`, `ENQUIRY_RETENTION_DAYS`, `AUDIT_IP_RETENTION_DAYS`, `BLOB_READ_WRITE_TOKEN`, `BACKUP_BLOB_READ_WRITE_TOKEN`, `RESEND_API_KEY`, `BOOKING_EMAIL_FROM`, `BOOKING_NOTIFICATION_EMAILS`, `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`, the Stripe names below | Vercel env. Production scope for live values, preview scope for sandbox values. The env list is not readable from the house (403) |
| Vercel API, team `kodominio` | Scripted access for `promote.sh`, `deploy-status.sh` and `release.yaml` | Jamie | `VERCEL_TOKEN_KODOMINIO` (`project.json`) | Jamie's shell and Actions |
| Neon org Kodominio, project `agorasim` (eu-central-1) | The production database: enquiries, bookings, quotes, payments, message log, audit log, admin users | Jamie (the org is Vercel-managed) | `DATABASE_URL`. The integration also sets `DATABASE_URL_UNPOOLED`, `PG*`, `POSTGRES_*`, `NEON_PROJECT_ID`, which the code does not read. `NEON_API_KEY` for the Neon workflows | Vercel env, set by the integration. Actions |
| Neon org Kodominio, project `uat-agorasim` (eu-central-1) | UAT's own database, migrated as a preview's | Jamie | the same names, UAT scope | Vercel custom environment `uat` |
| Stripe, Jamie's platform account | The platform. Live-activated 2026-09-11. The Connect platform profile. The webhook `/api/stripe/webhook` with six events. Sandbox keys for previews | Jamie | `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` | Vercel env. Sandbox on previews and UAT, live in Production only (runbook § 6) |
| Stripe, Agorasim's own Standard account | Merchant of record. Receives every guest payment. Connected to the platform through Connect (Jamie, 2026-10-23) | Diogo and Rita | `STRIPE_CONNECTED_ACCOUNT_ID` (an `acct_` id, Production only). Setting it switches the commission on | Vercel env Production. The id in Jamie's password manager |
| Resend | Transactional email: confirmation, acknowledgement, reminder, thank-you, quote mails, balance requests, team copies. Sending domain `mail.jamienisbet.com` on 2026-09-10. `agorasim.pt` as a sending domain: not checked | Jamie | `RESEND_API_KEY`, `BOOKING_EMAIL_FROM`, `BOOKING_NOTIFICATION_EMAILS` | Vercel env. Actions for the release announcement |
| Vercel Blob, public store | Experience photos uploaded from the admin | Jamie | `BLOB_READ_WRITE_TOKEN` | Vercel env, set by the store |
| Vercel Blob, private EU store | The nightly database backup, pruned after 30 days | Jamie | `BACKUP_BLOB_READ_WRITE_TOKEN` | Vercel env |
| Sentry | Server-side error tracking. No browser SDK | Jamie (not checked: which org) | `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN` (fallback only) | Vercel env |
| Admin console `/admin` | Two owner accounts, Diogo and Rita. Passwords are theirs. Seeded once with `pnpm db:seed-owner`, reset with `pnpm db:reset-password` | Diogo and Rita | `ADMIN_SEED_*` and `ADMIN_RESET_*` on the command line only | Nowhere persistent, by design |
| Domain `agorasim.pt` | The public site, the mail domain, UAT. Registered 2020-08-05, expires 2027-08-05. Transferred from Amen (Jamie, 2026-10-23). Nameservers `ns1/ns2.vercel-dns.com`. The apex still serves the old WordPress host on purpose | Diogo and Rita (registrant the company, per the plan of 2026-09-11, not checked) | none in the repo | The registrar panel and Vercel DNS |
| Google Workspace on `agorasim.pt` | info@agorasim.pt, Calendar, Drive, the Business Profile. Billed by Google directly. The `reservas@` alias is planned (runbook Track D) | Diogo (super-admin) | none | Google |
| Meta: Facebook page, Instagram `agorasim.pt` | The social accounts the auto-poster would post to | Diogo and Rita | none yet. Admin access not granted | Meta |
| Old WordPress host (`130.185.83.150`) | The old site, still served at the apex | The client, through Amen (not checked) | none | Amen |

Rules this table follows: `web/.env.example` is the catalogue of names. Secrets never go in git:
names only, values in GitHub or Vercel settings (client repo `CLAUDE.md`). A plaintext credential
found anywhere is flagged, never copied.

The gitleaks scan of the repo on 2026-10-16 found nothing. The credential-bearing info PDF named
in the legacy log (a registrar password, rotated by Diogo on 2026-08-31, and an IBAN) is in no
reachable commit of the repo today, under any ref. Nothing to flag.
