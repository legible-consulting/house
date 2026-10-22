# Workflows

Three workflows run. Actions are pinned to a commit SHA and every job reads with
`contents: read`. The two exceptions are the jobs that push a file to `main`: the glance in
`sweep-deadlines.yml`, the review and the close in `rhythms.yml`.

| File | Trigger | Does |
|---|---|---|
| `check.yml` | push, PR | Eight jobs: `secrets` (gitleaks over the full history, pinned binary), `contracts` (every `CONTEXT.md` keeps Inputs, Process, Outputs; its frontmatter `status` is `stub` or `built`; a built contract has no "Not written yet" line), `frontmatter` (every frontmatter block parses with yq; `clients/_template/` skipped), `placement` (every tracked file is held by a contract's `holds:` globs or is repo infrastructure), `writing` (the ASD-STE100 linter over every markdown file, as advice), `guards` (the three hooks are byte-identical to the blueprint's), `scripts` (shellcheck at warning level), `desk` (builds the desk app, then runs `rhythms.mjs` into the runner's temp folder and shows the two files in the run summary) |
| `sweep-deadlines.yml` | daily 05:00 UTC, manual | Writes `desk/glance/<date>.md` with `.github/scripts/sweep-deadlines.sh`: the deadlines inside seven days, the next actions, what Jamie decides from `core/wave.md`. Deletes the previous glance. Commits to `main` as `github-actions[bot]` when it changed. Not run on a PR |
| `rhythms.yml` | Fridays and the 1st, 05:30 UTC, manual (review or close, and a month) | Runs `desk/app/scripts/read-house.mjs`, then `desk/app/scripts/rhythms.mjs`: `desk/review/<ISO week>.md` on Fridays, `desk/close/<YYYY-MM>.md` on the 1st for the month that ended, with the rules in `desk/app/lib/rhythms.ts`. Keeps the latest review and 13 months of closes. Commits to `main` when the file changed. Not run on a PR: the `desk` job in `check.yml` runs the script without a commit |

Reusable workflows that client repos call live in `legible-consulting/.github`.
