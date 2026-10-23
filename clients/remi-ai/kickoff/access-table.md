# Remi AI: access table

Prepared 2026-10-23 from the repo's `.icm/docs/ENV.md`, the six `apps/*/.env.example` files,
the three workflows in `.github/workflows/`, `.icm/docs/slack-app-manifest.yaml`, and the house
record. Secret names only. A value never enters this file or git. Values live in Vercel
project settings (runtime), in the repo's GitHub Actions secrets and variables (CI), or in
Jamie's own shell (`local`). "Who holds the account" is the account owner, not who has a seat.
A row that says `unknown` is Jamie's to fill.

| System | What it holds | Who holds the account | Secret names | Where the value lives |
|---|---|---|---|---|
| GitHub `k0d0minio/remi-ai` | The code, the tickets (`.icm/intake/`), the pull requests and gates, the releases | Jamie (his own account) | `GITHUB_TOKEN` (injected by Actions, never set), `GH_TOKEN` (local only, for `gh`), `TURBO_TOKEN`, `TURBO_TEAM` (a variable) | Actions secrets and variables; `GH_TOKEN` in Jamie's shell |
| Vercel team `remi21`, project `app` | `apps/web`: the patient link | Jamie (not checked: team owner) | `APP_URL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_MARKETING_URL`, `NEXT_PUBLIC_DOCS_URL`, `NEXT_PUBLIC_SUPPORT_URL`, `NEXT_PUBLIC_DEMO_URL`, `AUTH_SECRET`, `OPERATOR_EMAIL`, `DATABASE_URL`, `EMAIL_FROM`, `RESEND_API_KEY`, `BLOB_READ_WRITE_TOKEN` | Vercel env |
| Vercel team `remi21`, project `admin` | `apps/admin`: the console, the migrations | Jamie (not checked) | `APP_URL`, `NEXT_PUBLIC_ADMIN_URL`, `NEXT_PUBLIC_APP_URL`, `AUTH_SECRET`, `OPERATOR_EMAIL`, `DATABASE_URL`, `ALLOW_NON_PRODUCTION_MIGRATIONS` (unset by D-25), `EMAIL_FROM`, `RESEND_API_KEY`, `BLOB_READ_WRITE_TOKEN` | Vercel env |
| Vercel team `remi21`, project `marketing` | `apps/marketing`: the public site, the contact form | Jamie (not checked) | `APP_URL`, `NEXT_PUBLIC_MARKETING_URL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SUPPORT_URL`, `EMAIL_FROM`, `RESEND_API_KEY` | Vercel env |
| Vercel team `remi21`, project `documentation` | `apps/docs`: the reference site | Jamie (not checked) | `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_MARKETING_URL`, `NEXT_PUBLIC_SUPPORT_URL` | Vercel env |
| Vercel team `remi21`, project `support` | `apps/support`: the help centre | Jamie (not checked) | `APP_URL`, `NEXT_PUBLIC_SUPPORT_URL`, `NEXT_PUBLIC_MARKETING_URL`, `NEXT_PUBLIC_APP_URL` | Vercel env |
| Vercel team `remi21`, project `demo` | `apps/demo`: mock data, no backend | Jamie (not checked) | none by design | — |
| Vercel API, team `remi21` | Scripted access to the team | Jamie | `VERCEL_TOKEN_REMI21` (nothing reads it today) | Jamie's shell |
| Neon Postgres | The one database: patients, protocols, journal, challenges, documents, messages, audit trail. Production and previews read the same database (D-25) | unknown (not checked: whose Neon org; the Neon–Vercel integration sets `DATABASE_URL`) | `DATABASE_URL`; the integration also sets `DATABASE_URL_UNPOOLED`, `PG*`, `POSTGRES_*`, `NEON_PROJECT_ID`, `NEON_AUTH_BASE_URL`, `VITE_NEON_AUTH_URL`, which the code does not read | Vercel env, set by the integration |
| Resend | Outbound email from the console and the contact form. The sending domain must be verified in Resend | unknown | `RESEND_API_KEY`, `EMAIL_FROM` | Vercel env |
| Vercel Blob, private store, EU region | The patients' files: recipe PDFs, images (D-18). Five-minute signed links | Jamie (not checked: the store sits in team `remi21`) | `BLOB_READ_WRITE_TOKEN` | Vercel env |
| Vercel AI Gateway | The first model adapter (D-16). Not wired yet | Jamie (not checked) | `AI_GATEWAY_API_KEY`; `ANTHROPIC_API_KEY` is catalogued for direct access and nothing reads it today | Vercel env |
| Slack workspace REMI, app « REMI pipeline » | The release announcement after each merge (`release.yaml`). The weekly call runs on Slack | unknown (the workspace); the app is installed from the manifest in the repo | `SLACK_BOT_TOKEN`, `SLACK_ANNOUNCE_CHANNEL_ID` (a variable), `SLACK_ALERTS_CHANNEL_ID` (a variable, unread today) | Actions secrets and variables |
| Domain `remiai.be` | The public site, the mail domain, the product URLs | unknown (the August 2026 inventory named GoDaddy for the registrar, not checked) | none in the repo | the registrar |
| Mail on `@remiai.be` | morgane@remiai.be, arnaud@remiai.be: the contact route the public site names | unknown (not checked: Google Workspace or other) | none in the repo | the mail host |
| Odoo (`remiai1.odoo.com`) | Not checked: what REMI runs in it | unknown | none in the repo | Odoo |
| Fagron Genomics | A business contact, not a system: Jolien, genomics@fagron.be, the NutriGen tests and prices | Arnaud and Morgane hold the relationship | none | — |
| Error tracking | Nothing. `SENTRY_DSN` and `NEXT_PUBLIC_SENTRY_DSN` are reserved names, unread | — | none yet | — |
| Payments | Nothing. No Stripe key is read | — | none yet | — |

Rules this table follows: `.icm/docs/ENV.md` is the one catalogue of names, bound to the zod
schema in `packages/services` and `globalEnv` in `turbo.json` by the three-list rule in
`CONVENTIONS.md`. `pnpm env:pull` is the only way a value reaches a machine. A plaintext
credential found anywhere is flagged, never copied.

A pattern scan of the repo on 2026-10-23 found no live credential. The one hit,
`packages/services/src/db/adapters/neon.test.ts` line 15, is a test placeholder for a host that
is never connected. Nothing to flag.
