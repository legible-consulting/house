# Stub: A UAT build has a production database and a UAT database, every preview reads UAT, a preview with migrations gets its own branch, and the session's promotion migrates production

- feature-slug: uat-database
- epic: blueprint-pipeline
- sequence: 8 of 13
- depends-on: scripts
- complexity: high
- priority: P0

## Problem

The UAT contract allows one Neon project with a schema-only `uat` branch, or two projects. It gives every preview a Neon branch through the Vercel integration, and it says a session never dispatches `promote.yml`. Jamie's shape is different. One production database and one UAT database. Every preview reads the UAT database. A preview whose diff holds a migration gets a Neon branch cut from UAT. Neon cleanup deletes only such a branch. A promotion by a session runs the migrations on production.

## Proposed change

The database section of `.icm/uat/CONTEXT.md` is rewritten for two Neon projects only. `uat-db.sh` leaves. `preview-db.sh` and `preview-db.yml` arrive. `neon-cleanup.yml` calls `preview-db.sh delete`. `promote.yml` stays and the session dispatches it. Two questions join the bank: `database` and `migrations_path`.

## Acceptance criteria

- [ ] `copier.yml`: `database` (bool, default false, asked when `uat` is yes, help: does the build have a Neon database with migrations) and `migrations_path` (str, default `migrations`, asked when `database` is yes, help: the folder the migration files live in, relative to the repo root). Both with a default and a help line.
- [ ] `.icm/uat/CONTEXT.md` § The database says: one Neon project for production and one for UAT. The production project's default branch is production's database, reached by `promote.yml` alone through the secret `DATABASE_URL`. The UAT project's default branch is the UAT database. The Vercel Preview environment and the `uat` custom environment read it. The Neon integration is connected to Production only, or not at all. A preview whose pull request changes `<migrations_path>/**` gets the Neon branch `preview/<git branch>`, cut from the UAT default branch with its data, by `preview-db.yml`. Every other preview reads the UAT database as it is. A reset of UAT is Jamie's hand in the Neon console (why: Jamie's shape, 2026-10-27, and a preview without migrations changes no schema).
- [ ] The migration rule: the build's `vercel-build` script runs `db:migrate`, then `db:verify`, then the build when `MIGRATE_AT_BUILD` is `1`. Otherwise it only builds. The `uat` environment carries `MIGRATE_AT_BUILD=1` always, set once in setup. A preview branch carries it from `preview-db.sh`. Production never carries it: `promote.yml` migrates (why: a preview without its own branch must not migrate UAT, and the first build of a pull request may run before its branch exists, so a build migrates only where the variable says the database is its own · 2026-10-27).
- [ ] `.icm/scripts/preview-db.sh create <git branch>`: creates the Neon branch `preview/<git branch>` from the UAT project's default branch when it does not exist, sets `DATABASE_URL`, `DATABASE_URL_UNPOOLED` and `MIGRATE_AT_BUILD=1` on the Vercel Preview environment scoped to that git branch, and triggers a redeploy of the branch's latest preview deployment. Idempotent. `delete <git branch>`: deletes the branch when it exists and the three scoped variables when they exist, and says what it found. `status <git branch>`: prints both. The transports are `lib/neon.sh` and `lib/vercel.sh`. A token never reaches a command line.
- [ ] `.github/workflows/preview-db.yml`, on `pull_request` (opened, synchronize, reopened) with `paths: ["<migrations_path>/**"]`, runs `preview-db.sh create "$GITHUB_HEAD_REF"`. Rendered on `database`.
- [ ] `.github/workflows/neon-cleanup.yml`, on `pull_request` closed, runs `preview-db.sh delete "$GITHUB_HEAD_REF"`. A pull request that made no branch: the script says so and exits 0. Rendered on `database`.
- [ ] `promote.yml` keeps its three jobs. Its header says the session dispatches it with `promote.sh run --tag` after the client's word is recorded. "Nothing starts this workflow but Jamie" becomes "nothing starts this workflow but `promote.sh run`, on the client's recorded word".
- [ ] `uat-db.sh` is deleted, with its lines in the contract, `README.md` and `conventions/README.md`. `.env.example` names `MIGRATE_AT_BUILD` with the environments it reaches.
- [ ] § Setup, once: the two Neon projects, the Preview and `uat` variables from the UAT project, `MIGRATE_AT_BUILD=1` on `uat`, the integration on Production only, the Actions secrets and variables, `package.json`'s three scripts.
- [ ] The whole UAT contract still stands alone with the intake contract. The `check.yml` render passes for the `all` set with `database` yes and `uat` yes, and `preview-db.yml` is absent for the sets without `database`.

## Out of scope

- A `uat: no` build with a database: it keeps its own migration workflow (question 1 of the breakdown).
- The `gate` and `contract` CI jobs: unit 11.

## Notes

Read first: the breakdown, `.icm/uat/CONTEXT.md` whole, `{% if uat %}uat-db.sh{% endif %}`, `lib/neon.sh`, `lib/vercel.sh`, `promote.yml`, `neon-cleanup.yml`, `{% if uat %}.env.example{% endif %}`, `README.md` § UAT, `conventions/README.md` the UAT row, and berceo's and agorasim's `.icm/uat/` on Jamie's machine (both run the two-project shape today). Vercel's REST API sets a Preview variable scoped to a git branch with `gitBranch` on `POST /v10/projects/{id}/env`. A redeploy is `POST /v13/deployments` with the deployment's `gitSource`, or `vercel redeploy <url>`. Neon's `POST /projects/{id}/branches` with `parent_id` copies the data by default.

## Prompt

Repo legible-consulting/blueprint, cloud or desktop. Attach legible-consulting/house read-only. Read CLAUDE.md, README.md and conventions/README.md in the blueprint, then .icm/intake/blueprint-pipeline/breakdown.md in the house whole, then this ticket, .icm/intake/blueprint-pipeline/uat-database.md, then the files its Notes name. Do what it says. One branch, one pull request to main in the blueprint, Conventional Commits, technical text in Simplified Technical English. Write what you will change and your questions in the pull request body, numbered, each with a default, and stop for Spec approved. On build: render the proof sets into a scratch folder with copier to check your work. Read check.yml. Do not merge. Then one pull request in the house that moves this stub to .icm/intake/blueprint-pipeline/_done/, the one write to the house. Your last message names both pull requests and what waits on Jamie.
