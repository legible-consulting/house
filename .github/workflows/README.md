# Workflows

Three workflows run. Actions are pinned to a commit SHA and every job reads with
`contents: read`. The one exception is the job that pushes a file to `main`: the glance and
the close in `rhythms.yml`. `publish.yml` reads the house with `contents: read` and writes to
the site with the secret `SITE_PAT`.

| File | Trigger | Does |
|---|---|---|
| `check.yml` | push, PR | Eight jobs: `secrets` (gitleaks over the full history, pinned binary), `contracts` (every `CONTEXT.md` keeps Inputs, Process, Outputs; its frontmatter `status` is `stub` or `built`; a built contract has no "Not written yet" line), `frontmatter` (every frontmatter block parses with yq; `clients/_template/` skipped), `placement` (every tracked file is held by a contract's `holds:` globs or is repo infrastructure), `writing` (the ASD-STE100 linter over every markdown file, as advice), `guards` (the three hooks are byte-identical to the blueprint's), `scripts` (shellcheck at warning level), `desk` (builds the desk app, then runs `rhythms.mjs` into the runner's temp folder and shows the glance and the close in the run summary) |
| `rhythms.yml` | daily and the 1st, 05:00 and 05:30 UTC, manual (glance or close, and a month) | Runs `desk/app/scripts/read-house.mjs`, then `desk/app/scripts/rhythms.mjs`: `desk/glance/<date>.md` every morning, `desk/close/<YYYY-MM>.md` on the 1st for the month that ended, with the rules in `desk/app/lib/rhythms.ts`, the rules the desk computes live on every request. Keeps the latest glance and 13 months of closes. Commits to `main` as `github-actions[bot]` when the file changed. Not run on a PR: the `desk` job in `check.yml` runs the script without a commit |
| `publish.yml` | push to `main` that touches `clients/*/case/case.md`, manual | Empties `content/work/` on the `main` of `k0d0minio/jamienisbet`, then writes every case whose frontmatter says `ready: true` as `content/work/<slug>.md`, the slug from the frontmatter. Fails on a slug that is not lower case, digits and hyphens, and on two ready cases with one slug. Commits to the site's `main` as `github-actions[bot]` with `house: cases <date>` when `content/work/` changed, with three retries. Checks out and pushes the site with `SITE_PAT`. Vercel deploys the site from that `main`. Jamie's merge of the case in the house is the gate. Not run on a PR |

Reusable workflows that client repos call live in `legible-consulting/.github`.
