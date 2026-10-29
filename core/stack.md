# Stack — tools and machines

One home for which tools Legible Consulting uses, where each runs, and how a machine gets
them. Why a tool was chosen lives in its research verdict (`research/verdicts/`); this file
says what is installed where. A change to the tool set edits this file and `setup/` in the
same commit (why: one home per fact; a script that drifts from its list installs the wrong
toolbox · 2026-10-16).

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
| gitleaks | secret scan (F1 before the transfers; the core's cloud check) | 8.30.1 local · Ubuntu's 8.16 in cloud | `setup/local.sh` | `setup/cloud.sh` |
| mani | run a command across the estate's clones (the build, from the local lane) | 0.32.1 | `setup/local.sh` | — |
| copier | render a client repo from the blueprint (kickoff) | 9.19.1 | `setup/local.sh` | — |
| trafilatura | fetch a web page as text (the research intake) | 2.3.1 | — | `setup/cloud.sh`, by `uv tool` |
| yt-dlp | a video's description and captions as text (the research intake) | 2026.8.19 | — | `setup/cloud.sh`, by `uv tool` |
| claude, vercel, uv, node, go | Claude Code, deploys, Python tools, runtimes | as installed | by hand, once | pre-installed (claude, uv, node, go) |
| goose, Emdash | the agent of the local lane, and the app that gives each of its tasks a git worktree (from 2026-10-29) | as installed | by hand, once (§ Local machine) | — |

## The desk app

Next.js (App Router) on Vercel, with Tailwind CSS, shadcn/ui and Motion for the interface,
and Neon Postgres and Neon Auth behind it: team `kodominio`, project `legible-desk`,
`https://desk.jamienisbet.com`. `desk/CONTEXT.md` names the tables, the roles and the
variables. Next.js was chosen over the Astro scaffold of 2026-10-15 (why: Vercel's own
framework, first-party Neon Auth support for Next.js, and one framework for the house's apps
· 2026-10-19). Tailwind CSS, shadcn/ui and Motion joined it (why: one component and
transition vocabulary for every app the house builds; shadcn's components are source in
`desk/app/components/ui/`, owned here, not a dependency to chase · 2026-10-20).

The cloud image ships
kislyuk's Python yq, a jq wrapper without `--front-matter`; `setup/cloud.sh` puts mikefarah's
ahead of it on PATH (why: frontmatter extraction is the hinge for the folder's checks ·
2026-10-16). Homebrew installs the current stable formula, so local versions are read, not
pinned; `setup/cloud.sh` pins its own.

## The renderer

A client document becomes a PDF with pdfcn's components on Forme, under `core/render/`: React
components for PDF from the pdfcn registry (`components.json`), rendered by Forme's layout
engine, which runs as WASM in Node with no browser. Forme was chosen over pdfcn's other base,
Takumi, because it lays out pages: A4 pages that break where the text breaks, a footer on every
page with its page number, and table rows that break across pages (why: a proposal is 4 to 8
pages of running text, and a client reads it as a document, not a picture · 2026-10-26). The
packages are pinned in `core/render/package-lock.json`. `render.yml` installs them in CI. The
fonts come from Google Fonts at render and the logo from `core/render/assets/`. `place.sh` uses
`/usr/bin/gio`, which Ubuntu ships, and `yq` and `jq` from `setup/local.sh` (why: the Drive copy
is Jamie's hand over the GNOME mount, so no Drive key exists anywhere · 2026-10-22).

## Local machine

Ubuntu 24.04 with Homebrew. A fresh machine, in order:

1. Install Homebrew, Claude Code, the Vercel CLI and uv by their own installers. Then install
   Goose and Emdash:
   - Goose CLI: `curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | CONFIGURE=false bash`.
     It puts `goose` in `~/.local/bin/`. Step 2 configures it.
   - Goose desktop: download the `.deb` from the Linux tab of
     https://goose-docs.ai/docs/getting-started/installation, then `sudo dpkg -i <file>.deb`.
     The package is `goose`.
   - Emdash: download the `.deb` from https://emdash.com/download, then `sudo dpkg -i <file>.deb`. The
     package is `emdash`. It installs in `/opt/Emdash/`.
2. Sign in: `gh auth login`, then `gh auth refresh -h github.com -s admin:org,delete_repo`
   (org settings need both); `vercel login` (team `kodominio`); `claude` to sign in.
   - Goose: `goose configure`, then Configure Providers, then Anthropic. Paste the Anthropic key
     and keep it in the system keyring. The CLI and the desktop use the same config and the same
     key. The key is never in a file: not in `~/.config/goose/secrets.yaml`, not in
     `config.yaml`, not in a shell profile. Check: `~/.config/goose/secrets.yaml` does not
     exist. (Why: a key in a file is plain text that every process can read and a commit can
     copy, and Goose writes `secrets.yaml` only when it cannot use the keyring · 2026-10-29.)
   - Emdash: open Emdash, sign in to the Emdash account, and connect GitHub. Emdash keeps both
     tokens in its own store (`~/.config/emdash/`, below).
   - Copy `~/.config/goose/.goosehints` and `~/.agents/plugins/legible-guards/` from the old
     machine, as for `~/.claude/`. No repo holds them.
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
| `~/Desktop/legible-consulting/projects/<slug>/` | the local lane from 2026-10-22: clones of the repos the blueprint governs, for estate work (mani, copier, gh). Every clone `desk/mani.yaml` names is here (2026-10-27). |
| `~/Desktop/Apps/` | not estate: Jamie's other projects. Nothing in the house reads from it, and nothing reads from its repo, `k0d0minio/icm-board`: a module's sources are the house, the siblings and the estate's repos on GitHub (why: the house is self-contained in the legible-consulting repos and the estate; a source on one machine or in a retired repo binds the work to it · 2026-10-26). |
| `~/.claude/` | global Claude Code layer: `CLAUDE.md`, `settings.json`, `statusline.sh`, the hooks below and one skill, `skills/asd-ste100` |
| `~/.config/goose/` | Goose's settings, for the CLI and the desktop. `config.yaml`: provider `anthropic`, `GOOSE_MODE: auto`, telemetry off, the extensions developer, skills and scheduler on, and `plugins:` turns on `emdash` and `legible-guards`. `.goosehints`: the global hints. They send Goose to `~/.claude/CLAUDE.md` first, then to the `.goosehints`, `AGENTS.md` and `CLAUDE.md` of the repo, and the repo wins. `AGENTS.md` is the house's own pointer for agents that read it by default (nine of eleven the open-source agent spike read, 2026-10-29); it says the same thing as `.goosehints`, in the same words. No key is here: the Anthropic key is in the keyring (step 2), and `secrets.yaml` must not exist. Goose writes the other folders (`*_oauth`, `tls`, `mcp-apps-cache`). Do not copy or commit them. |
| `~/.config/emdash/` | Emdash's store: an Electron profile and SQLite files. It holds the projects, the tasks, the worktree records and the settings that a person sets in the Emdash UI: the worktree directory, the default branch (`origin/main` for house), telemetry, and a person's own scripts and preserve patterns. `emdash4.db` also holds the Emdash account token and the GitHub token. Do not read the store into a session, copy it or commit it. Change a setting in the Emdash UI only. The shared settings of a build are its `.emdash.json` (the blueprint), not this store. |
| `~/.agents/plugins/legible-guards/` | the three guards for Goose: `block-local-checks.sh`, `confirm-git-writes.sh` and `guard-plaintext-secrets.sh`. It holds no copy of them. `hooks/hooks.json` registers one adapter, `scripts/guard.sh`, on Goose's `PreToolUse`. The adapter runs the same three scripts as Claude Code: the repo's `.claude/hooks/` copy when the working directory has one (the repo copy wins), else `~/.claude/hooks/`. Shell calls get the three guards. File writes get `guard-plaintext-secrets.sh`. It does not carry `reap-worktrees.sh`. The Goose paragraph after the hooks table gives the rules. |
| `~/.agents/plugins/emdash/` | Emdash's hooks for Goose. They post each session event to Emdash's local port, only when Emdash started the session (the `EMDASH_HOOK_*` variables are set). They guard nothing. |
| `~/emdash/worktrees/` | Emdash's task worktrees: one folder per project (`house-<id>/`), and in it one worktree per task, on the branch `emdash/<task-name>`. This is Emdash's default worktree directory, and no project changes it. Emdash makes and removes the worktrees here. To remove one, delete its task in Emdash: delete removes a worktree that Emdash made, and archive keeps it so that Restore can resume the task. Delete the task when its pull request merges. No person and no hook makes, moves or removes one by hand (why: Emdash tracks them in its own store, and a worktree removed behind it shows as an orphan · 2026-10-29). |

The three guards are global hooks in `~/.claude/hooks/`, registered in
`~/.claude/settings.json`. A repo that commits its own copy of a hook overrides the global
one, and cloud sessions see only the
repo's copy. Each guard defers only when the repo copy is a different file, so a verbatim
copy still runs (why: a copy that deferred to itself left the house unguarded · 2026-10-19).
The house and the blueprint's `template/` carry the same three files. `check.yml`'s `guards`
job fails when a house copy differs from the blueprint's (why: three copies kept equal by
hand drift; the first to drift is the one that stops guarding · 2026-10-19).

| Hook | Event | Does | House copy |
|---|---|---|---|
| `block-local-checks.sh` | PreToolUse (Bash) | refuses local build, lint, typecheck, test, format, dev | yes |
| `confirm-git-writes.sh` | PreToolUse (Bash) | asks before history rewrites, force pushes, pushes to the default branch, `gh pr merge`, `gh release create` and repo or release deletes | yes |
| `guard-plaintext-secrets.sh` | PreToolUse (Write, Edit, Bash) | refuses plaintext secrets in files outside an ignored `.env`; on Bash it reads the whole command, heredoc included | yes |
| `reap-worktrees.sh` | SessionStart, SessionEnd | removes the worktrees that earlier sessions left in the repo of the session. It removes a worktree only when it is clean, all its commits are on a remote, it had no commit or checkout for 24 h, no process uses it and the app does not own it. The branch stays. Log: `~/.cache/claude-reap-worktrees.log` | no |
| `route-request.sh` | UserPromptSubmit | the router: names the contract or the lane for each prompt. Build-only, with its test `route-request.test.sh` | no |
| `session-start.sh` | SessionStart | the board: prints the open tickets at session start, read-only. Build-only | no |

The house carries the three guards only. The blueprint renders the router and the board into
a build, never into a workspace, and registers them in the build's `.claude/settings.json`
(why: both read a build's `.icm/`, and the house's own board is out of the epic · Jamie,
2026-10-27). The router and the board are repo copies only, never global hooks.

Goose runs the three guards through the plugin `~/.agents/plugins/legible-guards/`: one
adapter, the same three scripts, and the repo copy wins (why: one home per guard; a second copy
for Goose drifts from the copy Claude Code runs · 2026-10-29). The adapter turns a guard's deny
into a Goose block. It turns an ask into a block too, because Goose has no ask step: Jamie runs
the command himself or says yes in the chat. The matchers in `hooks.json` name the tools as
Goose sends them: `shell`, `write` and `edit`, with no `developer__` prefix (why: Goose does not
run a hook whose matcher names a different tool, and that guard then guards nothing ·
2026-10-29).

`reap-worktrees.sh` is a global hook only, with no repo copy. Agents make worktrees in their scratchpad, beside the repo (`house-wt-*`) and in `.claude/worktrees/`, and no session removes them. The app removes only its own session worktrees (why: house had 46 worktrees and blueprint 11 · 2026-10-27).

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
| Additional directories | `~/Desktop/legible-consulting/projects` and, until every clone moves, `~/Desktop/Apps/projects` |
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
| Repositories | house, plus the siblings read-only |

The pasted copy is not linked to this repo: after editing `setup/cloud.sh`, paste it into the
environment dialog again. That rebuilds the environment cache on the next session. Check: a
session's setup log ends with an `ok` line per tool and no `MISSING` line.
