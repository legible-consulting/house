# Workflows

Two workflows run. Actions are pinned to a commit SHA and every job reads with
`contents: read`. The one exception is the job that pushes a file to `main`: the glance and
the close in `rhythms.yml`.

| File | Trigger | Does |
|---|---|---|
| `check.yml` | push, PR | Eight jobs: `secrets` (gitleaks over the full history, pinned binary), `contracts` (every `CONTEXT.md` keeps Inputs, Process, Outputs; its frontmatter `status` is `stub` or `built`; a built contract has no "Not written yet" line), `frontmatter` (every frontmatter block parses with yq; `clients/_template/` skipped), `placement` (every tracked file is held by a contract's `holds:` globs or is repo infrastructure), `writing` (the ASD-STE100 linter over every markdown file, as advice), `guards` (the three hooks are byte-identical to the blueprint's), `scripts` (shellcheck at warning level), `desk` (builds the desk app, then runs `rhythms.mjs` into the runner's temp folder and shows the glance and the close in the run summary) |
| `rhythms.yml` | daily and the 1st, 05:00 and 05:30 UTC, manual (glance or close, and a month) | Runs `desk/app/scripts/read-house.mjs`, then `desk/app/scripts/rhythms.mjs`: `desk/glance/<date>.md` every morning, `desk/close/<YYYY-MM>.md` on the 1st for the month that ended, with the rules in `desk/app/lib/rhythms.ts`, the rules the desk computes live on every request. Each run also measures the month's sessions from the desk's ledger into `desk/sessions/<YYYY-MM>.yaml` with `desk/app/scripts/sessions.mjs --ledger`, when the `DESK_SESSIONS_TOKEN` secret is set. Keeps the latest glance, 13 months of closes and of sessions. Commits to `main` as `github-actions[bot]` when a file changed. Not run on a PR: the `desk` job in `check.yml` runs the script without a commit |

Reusable workflows that client repos call live in `legible-consulting/.github`.
