# Workflows

Three workflows run. Actions are pinned to a commit SHA and every job reads with
`contents: read`. The one exception is the job that pushes a file to `main`: the glance and
the close in `rhythms.yml`.

| File | Trigger | Does |
|---|---|---|
| `check.yml` | PR, push to `main` | Eight jobs: `secrets` (gitleaks over the full history, pinned binary), `contracts` (every `CONTEXT.md` keeps Inputs, Process, Outputs; its frontmatter `status` is `stub` or `built`; a built contract has no "Not written yet" line), `frontmatter` (every frontmatter block parses with yq; `clients/_template/` skipped), `placement` (every tracked file is held by a contract's `holds:` globs or is repo infrastructure), `writing` (the ASD-STE100 linter over every markdown file, as advice), `guards` (the three hooks are byte-identical to the blueprint's), `scripts` (shellcheck at warning level), `desk` (builds the desk app, then runs `rhythms.mjs` into the runner's temp folder and shows the glance and the close in the run summary) |
| `rhythms.yml` | daily and the 1st, 05:00 and 05:30 UTC, manual (glance or close, and a month) | Runs `desk/app/scripts/read-house.mjs`, then `desk/app/scripts/rhythms.mjs`: `desk/glance/<date>.md` every morning, `desk/close/<YYYY-MM>.md` on the 1st for the month that ended, with the rules in `desk/app/lib/rhythms.ts`, the rules the desk computes live on every request. Keeps the latest glance and 13 months of closes. Commits to `main` as `github-actions[bot]` when the file changed. Not run on a PR: the `desk` job in `check.yml` runs the script without a commit |
| `render.yml` | PR and push to `main` that change `clients/*/proposal/*.md`, `clients/*/quote/quote.md`, `clients/*/agreement/*.md`, `core/render/`, `core/voice.md` or the workflow | Runs `core/render/render.sh` for each changed document: a quote renders inside its client's proposal, or alone when the client has no proposal. A change to the renderer, the design or the workflow renders every proposal and agreement that has `title`, `date` and `language` in its frontmatter. Keeps the PDFs as the run's artifact `pdf` for 14 days and lists them in the run summary. No Drive step, no secret: Jamie places a PDF with `core/render/place.sh` |

Reusable workflows that client repos call live in `legible-consulting/.github`.
