# Workflows (Wave 1)

Planned, per `meta/06-org-design.md` §4 and `meta/07-infrastructure-setup.md`:

| File | Trigger | Does |
|---|---|---|
| `check.yml` | push, PR | `pre-commit run --all-files`: frontmatter schema, yamllint, markdownlint, cspell, lychee `--offline`, gitleaks, actionlint |
| `manifest.yml` | push to `main` touching `clients/**` | regenerate `desk/mani.yaml` from record frontmatter |
| `sweep-deadlines.yml` | daily 06:00 Lisbon | `desk/glance/<date>.md`; ntfy for deadlines inside seven days |
| `conformance.yml` | weekly + manual | `copier update` and asset check over the live set; one PR per repo |
| `research-recheck.yml` | weekly | verdicts past their `recheck` date → glance lines |
| `dashboard.yml` | push to `main`, every 6 h | build `desk/app/` and deploy to Vercel |

Reusable workflows that client repos call live in `legible-consulting/.github`.
