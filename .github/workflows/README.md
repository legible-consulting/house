# Workflows (Wave 1)

`check.yml`, `dashboard.yml` and `sweep-deadlines.yml` run; the rest are planned (design trail in
`library`: `research/design-trail/06-org-design.md` §4). Actions are pinned to a commit SHA and every
job reads with `contents: read` only. The one exception is the `sweep-deadlines.yml` job, which
pushes the glance to `main`.

| File | Trigger | Does |
|---|---|---|
| `check.yml` | push, PR | **live.** Seven jobs: `secrets` (gitleaks over the full history, pinned binary), `contracts` (every `CONTEXT.md` keeps Inputs, Process, Outputs), `frontmatter` (every frontmatter block parses with yq; `clients/_template/` skipped), `placement` (every tracked file is held by a contract's `holds:` globs or is repo infrastructure), `writing` (the ASD-STE100 linter over every markdown file, findings in the run summary, never a failure), `guards` (the three hooks are byte-identical to the blueprint's site tier), `scripts` (shellcheck at warning level) |
| `manifest.yml` | push to `main` touching `clients/**` | regenerate `desk/mani.yaml` from record frontmatter |
| `sweep-deadlines.yml` | daily 06:00 Lisbon (05:00 UTC; 05:00 in winter), manual | **live.** Write `desk/glance/<date>.md` (deadlines inside seven days at the top, then next actions, then the open items) with `.github/scripts/sweep-deadlines.sh`, commit it to `main` as `github-actions[bot]` when it changed, and delete glances older than 14 days. The only job with `contents: write`. CI does not run it on a PR: run it once by hand after each change |
| `conformance.yml` | weekly + manual | `copier update` and asset check over the live set; one PR per repo |
| `research-recheck.yml` | weekly | verdicts past their `recheck` date → glance lines |
| `dashboard.yml` | push to `main` touching `clients/**` or `desk/app/**`, every 6 h, manual | **live.** Build `desk/app/` and deploy it to Vercel as a preview (behind Vercel Authentication). Needs secret `VERCEL_TOKEN`, variables `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` |

Reusable workflows that client repos call live in `legible-consulting/.github`.
