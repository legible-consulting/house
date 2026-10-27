# Stub: Every preview reads its base database, a preview with a migration gets its own Neon branch, and production migrates on the merge or on the promotion

- feature-slug: preview-database
- epic: blueprint-pipeline
- sequence: 8 of 13
- depends-on: scripts
- complexity: high
- priority: P0

## Problem

The UAT contract gives every preview a Neon branch through the Vercel integration, allows a schema-only `uat` branch in one project, and says a session never dispatches `promote.yml`. A `uat: no` build has no database rule at all. Jamie's shape is one mechanism for every build with a database. The base database is UAT's with a UAT environment and production's without one. Every preview reads the base. A preview whose diff carries a migration gets a Neon branch cut from the base. Neon cleanup deletes only such a branch. Production migrates on the merge without UAT, and on the session's promotion with UAT.

## Proposed change

One contract, `.icm/database/CONTEXT.md`, rendered for every build with a database. `preview-db.sh`, `preview-db.yml` and `neon-cleanup.yml` arrive with it. The UAT contract keeps the environments, the batch, the sign-off and the promotion, and points at the database contract for the rest. `uat-db.sh` leaves. One question joins the bank, `migrations_path`, and the `database` question of the earlier plan is not asked.

## Acceptance criteria

- [ ] `copier.yml`: `migrations_path` (str, default empty, asked for every build, not a workspace). Help: the folder the migration files live in, relative to the repo root, for example `migrations` or `drizzle`. Empty means the build has no database, and no database file renders. A validator refuses an absolute path.
- [ ] `template/{% if not workspace %}.icm{% endif %}/{% if migrations_path %}database{% endif %}/CONTEXT.md`, under 90 lines, Inputs, Process, Outputs. It says the two shapes in one table. With UAT: one Neon project for production and one for UAT. The base is the UAT project's default branch. The Vercel Preview and `uat` environments read it. The Neon integration is connected to Production only, or not at all. Without UAT: one Neon project. The base is its default branch, production's database. The Vercel Preview environment reads it. A preview without a migration reads and writes the base's rows, and a tester knows it (why: Jamie's shape, 2026-10-27, and a preview that changes no schema needs no copy).
- [ ] The branch rule, the same in both shapes: a pull request whose diff touches `<migrations_path>/**` gets the Neon branch `preview/<git branch>`, cut from the base with its data, by `preview-db.yml`. The branch and its three variables leave when the pull request closes.
- [ ] The migration rule: `package.json` names `db:migrate` and `db:verify`. The build's `vercel-build` script runs `db:migrate`, then `db:verify`, then the build when `MIGRATE_AT_BUILD` is `1`. Otherwise it only builds. The variable means this deployment owns its database. With UAT: the `uat` environment carries it always and production never, because `promote.yml` migrates production. Without UAT: the Production environment carries it always, so the build of `main` migrates production and then serves it. A preview branch carries it from `preview-db.sh`. A plain preview never carries it (why: a preview without its own branch must not migrate the base, and the first build of a pull request may run before its branch exists, so a build migrates only where the variable says the database is its own · 2026-10-27).
- [ ] `.icm/scripts/preview-db.sh create <git branch>`: creates `preview/<git branch>` from the base when it does not exist, sets `DATABASE_URL`, `DATABASE_URL_UNPOOLED` and `MIGRATE_AT_BUILD=1` on the Vercel Preview environment scoped to that git branch, and redeploys the branch's latest preview deployment. Idempotent. `delete <git branch>`: deletes the branch and the three scoped variables when they exist, and says what it found. `status <git branch>`: prints both. `NEON_PROJECT_ID` names the one project the branches are cut from: the UAT project with UAT, the production project without. The transports are `lib/neon.sh` and `lib/vercel.sh`, rendered when `migrations_path` or `uat` is set. A token never reaches a command line.
- [ ] `.github/workflows/preview-db.yml`, on `pull_request` (opened, synchronize, reopened), `paths: ["<migrations_path>/**"]`, runs `preview-db.sh create "$GITHUB_HEAD_REF"`. `.github/workflows/neon-cleanup.yml`, on `pull_request` closed, runs `preview-db.sh delete "$GITHUB_HEAD_REF"`. A pull request that made no branch: the script says so and exits 0. Both render on `migrations_path`.
- [ ] `.icm/uat/CONTEXT.md`: § The database becomes one paragraph that points at `.icm/database/CONTEXT.md` and names the UAT project as the base. `promote.yml` keeps its three jobs, and its header says `promote.sh run --tag` dispatches it on the client's recorded word. "Nothing starts this workflow but Jamie" becomes "nothing starts this workflow but `promote.sh run`". `uat-db.sh` is deleted, with its lines in the contract, `README.md` and `conventions/README.md`.
- [ ] `.env.example` renders on `migrations_path` or `uat`, and names `MIGRATE_AT_BUILD`, `NEON_API_KEY`, `NEON_PROJECT_ID`, `DATABASE_URL`, `DATABASE_URL_UNPOOLED` with the environments each one reaches.
- [ ] § Setup, once, in the database contract, for each shape: the Neon project or projects, the Preview variables from the base, `MIGRATE_AT_BUILD=1` on `uat` or on Production, the integration on Production only, the Actions secrets and variables, `package.json`'s three scripts. The UAT contract's own setup list keeps only the environments and the promotion.
- [ ] `check.yml`: the `all` set renders with `migrations_path=migrations` and `uat=true`, a new `nouat-db` set with `migrations_path=migrations`, `release=true` and `uat=false`. Both carry the database contract, the script and the two workflows. The sets with an empty `migrations_path` carry none of them. `preview-db.yml`'s `paths` line names the folder.

## Out of scope

- The `gate` and `contract` CI jobs: unit 11.
- A build with no database: it answers nothing and renders nothing here.

## Notes

Read first: the breakdown, `.icm/uat/CONTEXT.md` whole, `{% if uat %}uat-db.sh{% endif %}`, `lib/neon.sh`, `lib/vercel.sh`, `promote.yml`, `neon-cleanup.yml`, `{% if uat %}.env.example{% endif %}`, `README.md` § UAT, `conventions/README.md` the UAT row, and berceo's and agorasim's `.icm/uat/` on Jamie's machine (both run two projects today) and vinecliff's `db-migrate.yml` (a `uat: no` build that migrates on push to `main` today, which `MIGRATE_AT_BUILD=1` on Production replaces). Vercel's REST API sets a Preview variable scoped to a git branch with `gitBranch` on `POST /v10/projects/{id}/env`. A redeploy is `POST /v13/deployments` with the deployment's `gitSource`, or `vercel redeploy <url>`. Neon's `POST /projects/{id}/branches` with `parent_id` copies the data by default. A migration at build runs while the previous deployment still serves, so a migration must be forward-compatible with the code it replaces. The contract says so in one line.

## Prompt

Repo legible-consulting/blueprint, cloud or desktop. Attach legible-consulting/house read-only. Read CLAUDE.md, README.md and conventions/README.md in the blueprint, then .icm/intake/blueprint-pipeline/breakdown.md in the house whole, then this ticket, .icm/intake/blueprint-pipeline/preview-database.md, then the files its Notes name. Do what it says. One branch, one pull request to main in the blueprint, Conventional Commits, technical text in Simplified Technical English. Write what you will change and your questions in the pull request body, numbered, each with a default, and stop for Spec approved. On build: render the proof sets into a scratch folder with copier to check your work. Read check.yml. Do not merge. Then one pull request in the house that moves this stub to .icm/intake/blueprint-pipeline/_done/, the one write to the house. Your last message names both pull requests and what waits on Jamie.
