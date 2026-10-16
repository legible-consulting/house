# Stack — tools and machines

One home for which tools Legible Consulting uses, where each runs, and how a machine gets
them. Why a tool was chosen lives in its research verdict (`meta/02-tool-research.md`, later
`operator/research/verdicts/`); this file says what is installed where. A change to the tool
set edits this file and `setup/` in the same commit (why: one home per fact; a script that
drifts from its list installs the wrong toolbox · 2026-10-16).

## Tools

The local machine carries the full toolbox. The cloud environment carries only what a session
calls today; a tool joins `setup/cloud.sh` in the commit that builds the module that calls it
(why: the audit found seven tools installed in cloud that no contract, hook or workflow called,
one of them failing, and mdq's compile alone took 95 s of setup · 2026-10-16). CI installs its own.

| Tool | Job | Version | Local | Cloud |
|---|---|---|---|---|
| git, gh | repos, GitHub API | as shipped | pre-installed | pre-installed |
| jq | JSON filter | as shipped | `setup/local.sh` | pre-installed |
| yq (mikefarah) | YAML and frontmatter queries | 4.54.1 | `setup/local.sh` | `setup/cloud.sh` |
| mdq | read one Markdown section, task list or table | 0.10.0 | `setup/local.sh` | — |
| duckdb | SQL over the client folders (Friday review, pipeline) | 1.5.6 | `setup/local.sh` | — |
| dateutils (`dateadd`, `datediff`, …) | date arithmetic in shell | 0.4.12 | `setup/local.sh` | — |
| gitleaks | secret scan | 8.30.1 | `setup/local.sh` | — |
| vale | house voice and terminology | 3.24.0 | `setup/local.sh` | — |
| cspell | spelling, five languages | 10.4.0 | `setup/local.sh` | — |
| lychee | link check | 0.24.2 | `setup/local.sh` | — |
| mani | run a command across the estate's clones | 0.32.1 | `setup/local.sh` | — |
| multi-gitter | one PR per repo across the estate | 0.63.1 | `setup/local.sh` | — |
| copier | render a client repo from the blueprint | 9.19.1 | `setup/local.sh` | — |
| claude, vercel, uv, node, go | Claude Code, deploys, Python tools, runtimes | as installed | by hand, once | pre-installed (claude, uv, node, go) |

vale, cspell, lychee and gitleaks give their verdict in CI, never in a session (why: CI is
truth · 2026-10-15), so the cloud environment does not carry them. The cloud image ships
kislyuk's Python yq, a jq wrapper without `--front-matter`; `setup/cloud.sh` puts mikefarah's
ahead of it on PATH (why: frontmatter extraction is the hinge for the folder's checks ·
2026-10-16). Homebrew installs the current stable formula, so local versions are read, not
pinned; `setup/cloud.sh` pins its own.

## Local machine

Ubuntu 24.04 with Homebrew. A fresh machine, in order:

1. Install Homebrew, Claude Code, the Vercel CLI and uv by their own installers.
2. Sign in: `gh auth login`, then `gh auth refresh -h github.com -s admin:org,delete_repo`
   (org settings need both); `vercel login` (team `kodominio`); `claude` to sign in.
3. Clone the org's working repos side by side:
   ```bash
   mkdir -p ~/Desktop/legible-consulting && cd ~/Desktop/legible-consulting && for r in house blueprint library .github; do gh repo clone legible-consulting/$r; done
   ```
4. Install the toolbox: `bash ~/Desktop/legible-consulting/house/core/setup/local.sh`.
   Re-run it any time; it installs only what is missing and prints `ok` or `MISSING` per tool.

Layout:

| Path | Holds |
|---|---|
| `~/Desktop/legible-consulting/` | `house`, `blueprint`, `library`, `.github`: one folder per org repo |
| `~/Desktop/Apps/projects/<slug>/` | the local lane: clones of client repos for estate work (mani, multi-gitter, copier) |
| `~/.claude/` | global Claude Code layer: `CLAUDE.md` and the hooks below |

Global hooks in `~/.claude/hooks/`, registered in `~/.claude/settings.json`. A repo that
commits its own copy of a hook overrides the global one, and cloud sessions see only the
repo's copy.

| Hook | Event | Does |
|---|---|---|
| `icm-session-start.sh` | SessionStart | injects the repo's routing map (paths only) when it finds ICM structure |
| `block-local-checks.sh` | PreToolUse (Bash) | refuses local build, lint, typecheck, test, format, dev |
| `confirm-git-writes.sh` | PreToolUse (Bash) | asks before history rewrites, force pushes and pushes to the default branch |
| `guard-plaintext-secrets.sh` | PreToolUse (Write, Edit) | refuses plaintext secrets in files |

## Cloud environment

One environment, `legible`, in claude.ai/code.

| Setting | Value |
|---|---|
| Network access | Trusted |
| Environment variables | none |
| Network secrets | none (why: ntfy dropped · Jamie, 2026-10-16) |
| Setup script | `setup/cloud.sh`, pasted in full |

The pasted copy is not linked to this repo: after editing `setup/cloud.sh`, paste it into the
environment dialog again. That rebuilds the environment cache on the next session. Check: a
session's setup log ends with an `ok` line per tool and no `MISSING` line.
