# Stub: check-client.yml runs a repo's migration-order check

- lane: chore
- found-by: remi-ai pull request 141, question 1 (Jamie took the default) · 2026-10-27
- complexity: medium
- priority: P2

## Problem

Remi-ai removed `.github/workflows/quality.yaml` on 2026-10-27 (retire list of `triage/conformance-v1-0-0.md`). That job ran three checks that `check-client.yml` in `legible-consulting/.github` does not run:

1. The migration-order check: `node packages/services/scripts/check-migration-order.mjs --base <base>`. Drizzle applies a migration only if its journal `when` is after the newest applied migration. A migration generated before one on `main` is recorded as applied and never runs. The check makes such a pull request red.
2. `pnpm format:check` (prettier).
3. Lint with `--max-warnings=0`.

After the merge of remi-ai pull request 141, no CI job runs these checks. A pull request with a migration out of order can then merge with no red check.

## Proposed change

Make `check-client.yml` run a migration-order check on a pull request that changes the repo's migrations folder. The blueprint already asks for `migrations_path`. Decide one of these:

1. One shared script in `legible-consulting/.github` that reads the Drizzle journal under `migrations_path`.
2. A `package.json` script with a fixed name (for example `check:migrations`) that `check-client.yml` runs with `--if-present`, as it runs `lint`, `typecheck` and `test`.

Decide also if `check-client.yml` runs `format:check` with `--if-present`, and if a zero-warning lint limit belongs in each repo's `lint` script.

## Acceptance criteria

- [ ] A pull request in remi-ai with a migration out of order makes a `check` job red.
- [ ] A pull request that does not change the migrations folder does not run the check.
- [ ] The decision on `format:check` and on the zero-warning lint limit is written in `check-client.yml` or in this stub.

## Out of scope

- The Slack secret, the variable and `slack-app-manifest.yaml` in remi-ai. Jamie removes them in the GitHub settings if he wants to (pull request 141, question 2).
