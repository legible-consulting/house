# Stack — tools and machines

One home for which tools Legible Consulting uses, where each runs, and how a machine gets
them. Why a tool was chosen lives in its research verdict (`library`:
`research/design-trail/02-tool-research.md`, later `operator/research/verdicts/`); this file says what is installed where. A change to the tool
set edits this file and `setup/` in the same commit (why: one home per fact; a script that
drifts from its list installs the wrong toolbox · 2026-10-16).

## Tools

Each machine carries only what a contract, hook, workflow or checklist item calls today; a tool
joins `setup/` in the commit that builds the module that calls it (why: the audit found seven
tools installed in cloud and six locally that nothing called, one of them failing, and mdq's
compile alone took 95 s of cloud setup · 2026-10-16). CI installs its own.

| Tool | Job | Version | Local | Cloud |
|---|---|---|---|---|
| git, gh | repos, GitHub API | as shipped | pre-installed | pre-installed |
| jq | JSON filter | as shipped | `setup/local.sh` | pre-installed |
| yq (mikefarah) | YAML and frontmatter queries | 4.54.1 | `setup/local.sh` | `setup/cloud.sh` |
| gitleaks | secret scan (F1 before the transfers; C1's cloud check) | 8.30.1 local · Ubuntu's 8.16 in cloud | `setup/local.sh` | `setup/cloud.sh` |
| mani | run a command across the estate's clones (D2, the local lane) | 0.32.1 | `setup/local.sh` | — |
| multi-gitter | one PR per repo across the estate (D4) | 0.63.1 | `setup/local.sh` | — |
| copier | render a client repo from the blueprint (D1) | 9.19.1 | `setup/local.sh` | — |
| trafilatura | fetch a web page as text (O1, the research intake) | 2.3.1 | — | `setup/cloud.sh`, by `uv tool` |
| claude, vercel, uv, node, go | Claude Code, deploys, Python tools, runtimes | as installed | by hand, once | pre-installed (claude, uv, node, go) |

## The desk app

Next.js (App Router) on Vercel, with Tailwind CSS, shadcn/ui and Motion for the interface,
and Neon Postgres and Neon Auth behind it: team `kodominio`, project `legible-desk`,
`https://desk.jamienisbet.com`. `desk/CONTEXT.md` names the tables, the roles and the
variables. Next.js was chosen over the Astro scaffold of 2026-10-15 (why: Vercel's own
framework, first-party Neon Auth support for Next.js, and one framework for the house's apps
· 2026-10-19). Tailwind CSS, shadcn/ui and Motion joined it (why: one component and
transition vocabulary for every app the house builds; shadcn's components are source in
`desk/app/components/ui/`, owned here, not a dependency to chase · 2026-10-20).

Adopted but installed nowhere until a module calls them: mdq, duckdb and dateutils. Their verdicts stay in the research file. The cloud image ships
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
| `~/Desktop/legible-consulting/` | `house`, `blueprint`, `library`, `.github`: one folder per org repo (client repos are not here; they are `k0d0minio/<slug>`) |
| `~/Desktop/Apps/projects/<slug>/` | the local lane: clones of client repos for estate work (mani, multi-gitter, copier) |
| `~/.claude/` | global Claude Code layer: `CLAUDE.md`, `settings.json`, `statusline.sh`, the hooks below and one skill, `skills/asd-ste100` |

Global hooks in `~/.claude/hooks/`, registered in `~/.claude/settings.json`. A repo that
commits its own copy of a hook overrides the global one, and cloud sessions see only the
repo's copy. Each guard defers only when the repo copy is a different file, so a verbatim
copy still runs (why: a copy that deferred to itself left the house unguarded · 2026-10-19).
The house and the blueprint's `site` tier carry the same three files. `check.yml`'s `guards`
job fails when a house copy differs from the blueprint's (why: three copies kept equal by
hand drift; the first to drift is the one that stops guarding · 2026-10-19).

| Hook | Event | Does | House copy |
|---|---|---|---|
| `block-local-checks.sh` | PreToolUse (Bash) | refuses local build, lint, typecheck, test, format, dev | yes |
| `confirm-git-writes.sh` | PreToolUse (Bash) | asks before history rewrites, force pushes, pushes to the default branch, `gh pr merge`, `gh release create` and repo or release deletes | yes |
| `guard-plaintext-secrets.sh` | PreToolUse (Write, Edit, Bash) | refuses plaintext secrets in files outside an ignored `.env`; on Bash it reads the whole command, heredoc included | yes |

One global skill, `~/.claude/skills/asd-ste100`: Simplified Technical English for technical
writing (docs, contracts, reports, commits, PR bodies, hook text). A clone of
`danyuchn/asd-ste100-skill`, MIT. `check.yml`'s `writing` job runs its linter at the same
commit as advice, never as a verdict. Update both in one commit: `git -C ~/.claude/skills/asd-ste100 pull`,
then the `STE_SKILL_SHA` in `check.yml` (why: the one skill that shapes every file a session
writes; a linter that drifts from the skill reports rules the writer never saw · 2026-10-19).

`~/.claude/settings.json`, besides the hooks:

| Setting | Value |
|---|---|
| Permission mode | `auto` |
| Allow | version reads (`node`, `npm`, `nvm`), `command -v`, `brew list` and `search`, `gsettings get`; Read on `~/.claude/` and the local lane |
| Ask | `curl`, `sudo tee`, `sudo apt-get`, `brew install`, `link`, `unlink`, `gsettings set` |
| Deny | Read on `.env` files, `*.pem`, `*.key`, `secrets/`, Claude's own credentials; the vercel, neon and resend plugins' MCP servers (the claude.ai connectors of the same name serve them) |
| Additional directory | `~/Desktop/Apps/projects` |
| Plugins | official marketplace: vercel, neon, resend, stripe, sentry, sentry-cli, code-review, code-simplifier, claude-md-management, claude-code-setup, claude-security, hookify, frontend-design, modern-web-guidance, superdesign, playwright, browser-use; own marketplaces: understand-anything, diagram-design, hyperframes. github is off (`gh` covers it) |

Connectors (Gmail, Calendar, Drive, Docs, Sheets, Slides, Slack, Vercel, Neon, Supabase,
Resend, Sentry and the rest) belong to the claude.ai account, not this machine: change them in
claude.ai settings.

## Cloud environment

One environment, `legible`, in claude.ai/code.

| Setting | Value |
|---|---|
| Network access | Trusted |
| Environment variables | none |
| Network secrets | none |
| Setup script | `setup/cloud.sh`, pasted in full |

The pasted copy is not linked to this repo: after editing `setup/cloud.sh`, paste it into the
environment dialog again. That rebuilds the environment cache on the next session. Check: a
session's setup log ends with an `ok` line per tool and no `MISSING` line.

Pasted copy status: behind `setup/cloud.sh` since 2026-10-19, when trafilatura joined for the
research intake. Jamie pastes the file again, then deletes this paragraph (why: the pasted copy
is the one that runs; a routine that needs a tool the paste lacks fails its first run ·
2026-10-19).
