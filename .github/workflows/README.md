# Workflows (Wave 1)

`check.yml`, `sweep-deadlines.yml` and `rhythms.yml` run; the rest are planned (design trail in
`library`: `research/design-trail/06-org-design.md` §4). Actions are pinned to a commit SHA and every
job reads with `contents: read` only. The two exceptions are the `sweep-deadlines.yml` job, which
pushes the glance to `main`, and the `rhythms.yml` job, which pushes the review and the close.

| File | Trigger | Does |
|---|---|---|
| `check.yml` | push, PR | **live.** Eight jobs: `secrets` (gitleaks over the full history, pinned binary), `contracts` (every `CONTEXT.md` keeps Inputs, Process, Outputs; its frontmatter `status` is `stub` or `built`; a `built` contract has no placeholder line), `frontmatter` (every frontmatter block parses with yq; `clients/_template/` skipped), `placement` (every tracked file is held by a contract's `holds:` globs or is repo infrastructure), `writing` (the ASD-STE100 linter over every markdown file, findings in the run summary, never a failure), `guards` (the three hooks are byte-identical to the blueprint's site tier), `scripts` (shellcheck at warning level), `desk` (builds the desk app, then runs `rhythms.mjs` into the runner's temp folder and shows the two files in the run summary) |
| `rhythms.yml` | Fridays and the 1st, 05:30 UTC, manual (review or close, and a month) | **live.** Run `desk/app/scripts/read-house.mjs`, then `desk/app/scripts/rhythms.mjs`. The script writes `desk/review/<ISO week>.md` on Fridays or `desk/close/<YYYY-MM>.md` on the 1st for the month that ended, with the app's own rules (`desk/app/lib/rhythms.ts`). It deletes reviews older than 8 weeks and closes older than 13 months. The job commits the file to `main` as `github-actions[bot]` when it changed, then logs the run on the Healthchecks check (`/log`, not a success ping). Not run on a PR: the `desk` job in `check.yml` runs the script without a commit |
| `manifest.yml` | push to `main` touching `clients/**` | regenerate `desk/mani.yaml` from record frontmatter |
| `sweep-deadlines.yml` | daily 06:00 Lisbon (05:00 UTC; 05:00 in winter), manual | **live.** Write `desk/glance/<date>.md` (deadlines inside seven days at the top, then next actions, then the open items) with `.github/scripts/sweep-deadlines.sh`, commit it to `main` as `github-actions[bot]` when it changed, and delete glances older than 14 days. One of the two jobs with `contents: write`. CI does not run it on a PR: run it once by hand after each change |
| `conformance.yml` | weekly + manual | `copier update` and asset check over the live set; one PR per repo |
| `research-recheck.yml` | weekly | verdicts past their `recheck` date → glance lines |

Reusable workflows that client repos call live in `legible-consulting/.github`.
