# Vine Cliff Vineyards: access table

Prepared 2026-10-26 from the kickoff answers of 2026-10-26, the offer of 2026-10-12, the demo
call of 2026-10-22, the client repo's `.env.example`, `.github/workflows/` and `README.md`, and
the go-live epic (`k0d0minio/vinecliff`, `.icm/intake/go-live/`). Secret names only. A value
never enters this file or git. Values live in Vercel project settings (runtime), in the repo's
GitHub Actions secrets (CI), or in Jamie's password manager. "Who holds the account" is the
account owner, not who has a seat. A row that says `not checked` is Jamie's to confirm.

The hosting pattern is Jamie-hosted (`core/terms.md` § Hosting and support, and the offer:
"on my hosting accounts, under the monthly line"). The code, the content, the domain, the data
and any payment account are Billy's. The Vercel project, the database, the mail sender and the
error tracker are Jamie's, and pass to Billy if the engagement ends.

| System | What it holds | Who holds the account | Secret names | Where the value lives |
|---|---|---|---|---|
| GitHub `k0d0minio/vinecliff` (private) | The code, the tickets (`.icm/intake/`), the pull requests and gates, the releases | Jamie (his own account) | `GITHUB_TOKEN` (injected by Actions, never set), `DATABASE_URL` (`db-migrate.yml`) | Actions secrets |
| Vercel team `kodominio`, project `vinecliff` | The site and the admin. Production `vinecliff.vercel.app` today, `vinecliffvineyard.com` from `site-on-the-domain`. UAT `uat.vinecliffvineyard.com` from `uat-environment`. The previews | Jamie | `DATABASE_URL`, `AUTH_SECRET`, `RESEND_API_KEY`, `RESEND_FROM`, `NEXT_PUBLIC_SITE_URL`, `SENTRY_DSN` (from `error-tracking`). The Neon integration also sets `DATABASE_URL_UNPOOLED`, `PG*`, `POSTGRES_*`, `NEON_PROJECT_ID`, `NEON_AUTH_BASE_URL`, `VITE_NEON_AUTH_URL`, which the code does not read | Vercel env. The env list: not checked |
| Neon, project `broad-lake-67509282` | The production database: spaces, guests, bookings, blackouts, enquiries, settings, admin users. One branch, `main`, not protected. Previews read it today | Jamie (org Kodominio) | `DATABASE_URL` (set by the Neon-Vercel integration) | Vercel env, set by the integration. Actions for `db-migrate.yml` |
| Domain `vinecliffvineyard.com` | The future site, UAT and the mail sender. Registered 2019, never used for a site. Expiry: not checked | Billy. Jamie is a GoDaddy delegate (2026-10-22) | none in the repo | GoDaddy |
| Mail on `@vinecliffvineyard.com` | Nothing yet. `info@` is the planned sender. Its forward to Billy's Gmail is open | Billy (the domain) | none | GoDaddy |
| Resend | Every booking email, from `info@vinecliffvineyard.com` once the domain is verified (`email-from-info`). Today from `onboarding@resend.dev` | Jamie (default, not checked) | `RESEND_API_KEY`, `RESEND_FROM` | Vercel env |
| Sentry | Server errors from Production and UAT (`error-tracking`). Not set up yet | Jamie (the organization is open) | `SENTRY_DSN` | Vercel env |
| Payments | Nothing. No payment is taken online at launch | — | none | — |
| Admin console `/admin` | Billy's account, created by `drizzle/0001_seed_admin_user.sql` with a password Jamie chose and sent to Billy. Billy has not changed it (`admin-password-change`) | Billy | `AUTH_SECRET` signs the session | Vercel env |
| Airbnb (the farmhouse), VRBO (a second house) | Billy's listings. Not connected to the site at launch | Billy | none | Airbnb, VRBO |
| Google Drive, folder `vinecliff` | The offer, the logo masters, Billy's history files and photos, the demo call notes | Jamie (contact@jamienisbet.com) | none | Drive |

Rules this table follows: `.env.example` is the catalogue of runtime names. Secrets never go in
git: names only, values in GitHub or Vercel settings (the client repo's `CLAUDE.md`). A
plaintext credential found anywhere is flagged to Jamie, never copied.

A read on 2026-10-26 found three things, flagged to Jamie in the pull request and not copied:

1. The transcript of the demo call of 2026-10-22 (21:00 WEST, Drive) holds Billy's card
   details, read aloud at 00:26:29 while he paid the invoice.
2. The hash of Billy's first admin password is in the repo's history,
   `drizzle/0001_seed_admin_user.sql`. It is a hash, not the password.
3. The password itself went to Billy by mail during the same call.

`.env.example` holds placeholders only.
