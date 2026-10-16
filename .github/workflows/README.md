# Workflows (Wave 1)

`check.yml` and `dashboard.yml` run; the rest are planned, per `meta/06-org-design.md` §4 and
`meta/07-infrastructure-setup.md`. Actions are pinned to a commit SHA and every job reads
with `contents: read` only.

| File | Trigger | Does |
|---|---|---|
| `check.yml` | push, PR | **live.** Four jobs: `secrets` (gitleaks over the full history, pinned binary), `contracts` (every `CONTEXT.md` keeps Inputs, Process, Outputs), `frontmatter` (every frontmatter block parses with yq; `clients/_template/` skipped), `scripts` (shellcheck at warning level) |
| `manifest.yml` | push to `main` touching `clients/**` | regenerate `desk/mani.yaml` from record frontmatter |
| `sweep-deadlines.yml` | daily 06:00 Lisbon | `desk/glance/<date>.md`, deadlines inside seven days at the top |
| `conformance.yml` | weekly + manual | `copier update` and asset check over the live set; one PR per repo |
| `research-recheck.yml` | weekly | verdicts past their `recheck` date → glance lines |
| `dashboard.yml` | push to `main` touching `clients/**` or `desk/app/**`, every 6 h, manual | **live.** Build `desk/app/` and deploy it to Vercel as a preview (behind Vercel Authentication). Needs secret `VERCEL_TOKEN`, variables `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` |

Reusable workflows that client repos call live in `legible-consulting/.github`.
