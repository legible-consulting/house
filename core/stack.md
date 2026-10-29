# Stack — tools and machines

One home for which tools Legible Consulting uses, where each runs, and how a machine gets
them. Why a tool was chosen lives in its research verdict (`research/verdicts/`); this file
says what is installed where. A change to the tool set edits this file and `setup/` in the
same commit (why: one home per fact; a script that drifts from its list installs the wrong
toolbox · 2026-10-16).

## Agent map

Every repo carries `AGENTS.md` at the root, one line that sends any agent to `CLAUDE.md`
first, then to the contract it routes to. Hermes Agent, Claude Code and most of the other
agents the open-source agent spike read default to `AGENTS.md`; `CLAUDE.md` is a fallback
name in some and absent in others (`.icm/intake/triage/agents-md-pointer.md`). The house
carries its own, hand-written; the blueprint renders one into every build and workspace
(why: `.goosehints` carried this job until Goose left the stack, 2026-10-29).

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
| yt-dlp | a video's description and captions, and a reel's caption, as text (the research intake) | 2026.10.26 | — | `setup/cloud.sh`, by `uv tool` |
| claude, vercel, uv, node, go | Claude Code, deploys, Python tools, runtimes | as installed | by hand, once | pre-installed (claude, uv, node, go) |
| hermes | Hermes Agent, the agent of the local lane, on the profile `legible` (why: an agent on Jamie's machine on the model he chooses, the replacement for Claude Code when the weekly usage runs out or the subscription ends · Jamie, 2026-10-29) | as installed | by hand, once (§ Local machine); the profile's four files by `setup/local.sh` from `setup/hermes/` | — |
| goose-task | the lane script: one ticket, one worktree, one agent session (from 2026-10-29) | the house's | `setup/local.sh` links `setup/goose-task.sh` | — |

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
   Hermes Agent: `curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`. It clones
   the agent into `~/.hermes/hermes-agent/` and puts `hermes` in `~/.local/bin/`.
2. Sign in: `gh auth login`, then `gh auth refresh -h github.com -s admin:org,delete_repo`
   (org settings need both); `vercel login` (team `kodominio`); `claude` to sign in.
   - Hermes: the profile `legible` reads the Anthropic key from the system keyring item with
     service `hermes` and username `anthropic`, never from a file. Store it with
     `secret-tool store --label='Hermes Anthropic key' service hermes username anthropic`, which
     reads the key from the prompt (why: a key in a file is plain text that every process can read
     and a commit can copy · 2026-10-29). The item holds the Anthropic key alone. The profile's
     `config.yaml` reads it with `secrets.command`: `secret-tool lookup service hermes username
     anthropic`, printed as the one line `ANTHROPIC_API_KEY=<key>` at startup. Check:
     `hermes -p legible doctor` reports "Command helper: applied 1 secret" and "✓ Anthropic API".
3. Clone the org's working repos side by side:
   ```bash
   mkdir -p ~/Desktop/legible-consulting && cd ~/Desktop/legible-consulting && for r in house blueprint library .github; do gh repo clone legible-consulting/$r; done
   ```
4. Install the toolbox: `bash ~/Desktop/legible-consulting/house/core/setup/local.sh`.
   Re-run it any time; it installs only what is missing and prints `ok` or `MISSING` per tool,
   and `ok` or `MISSING` for the Hermes profile `legible` (§ The Hermes profile).

Layout:

| Path | Holds |
|---|---|
| `~/Desktop/legible-consulting/` | `house`, `blueprint`, `library`, `.github`: one folder per org repo (client repos are not here; they are `k0d0minio/<slug>`) |
| `~/Desktop/legible-consulting/projects/<slug>/` | the local lane from 2026-10-22: clones of the repos the blueprint governs, for estate work (mani, copier, gh). Every clone `desk/mani.yaml` names is here (2026-10-27). |
| `~/Desktop/Apps/` | not estate: Jamie's other projects. Nothing in the house reads from it, and nothing reads from its repo, `k0d0minio/icm-board`: a module's sources are the house, the siblings and the estate's repos on GitHub (why: the house is self-contained in the legible-consulting repos and the estate; a source on one machine or in a retired repo binds the work to it · 2026-10-26). |
| `~/.claude/` | global Claude Code layer: `CLAUDE.md`, `settings.json`, `statusline.sh`, the hooks below and one skill, `skills/asd-ste100` |
| `~/goose/worktrees/` | the local lane's worktrees: `<repo>/<slug>/` on the branch `<slug>`, and `<repo>/triage-<slug>/` on `triage/<slug>`, one per ticket. `goose-task` makes them and removes them with `goose-task done`, and `reap-worktrees.sh` removes the ones left behind at 24 hours. No person and no agent makes a worktree here by hand, and the agent's own worktree option is not used (why: one folder that the script and the reaper both know, outside every repo and outside `~/Desktop` · Jamie, 2026-10-29). |
| `~/.hermes/profiles/legible/` | the Hermes profile `legible`. Four of its files have their home in `core/setup/hermes/` (§ The Hermes profile). The rest is Hermes's own state: sessions, `state.db`, the hook allowlist, caches. No `.env` (why: the key is in the keyring · 2026-10-29). |
| `~/.local/bin/goose-task` | a link to `core/setup/goose-task.sh`, made by `setup/local.sh`. `goose-task <repo-path> <slug>` makes or reuses the ticket's worktree, copies `.env` and `.env.local` from the primary clone, runs `.icm/scripts/worktree-setup.sh` when the repo has it, writes the worktree's `.claude/skills` into the profile's `skills.external_dirs` when the folder exists, and starts the lane's agent in the worktree. `goose-task done <repo-path> <slug>` removes that line, then removes a clean, pushed worktree and keeps the branch. `goose-task list` shows each worktree and its state. It runs no build, lint, typecheck, test, format or dev command (why: it does the four steps a person did by hand for each parallel ticket, deterministic and reviewed in the house · Jamie, 2026-10-29). |

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
| `reap-worktrees.sh` | SessionStart, SessionEnd | removes the worktrees that earlier sessions left in the repo of the session, `~/goose/worktrees/<repo>/` included. It removes a worktree only when it is clean, all its commits are on a remote, it had no commit or checkout for 24 h, no process uses it and the app does not own it. The branch stays. Log: `~/.cache/claude-reap-worktrees.log` | no |
| `route-request.sh` | UserPromptSubmit | the router: names the contract or the lane for each prompt. Build-only, with its test `route-request.test.sh` | no |
| `session-start.sh` | SessionStart | the board: prints the open tickets at session start, read-only. Build-only | no |

The house carries the three guards only. The blueprint renders the router and the board into
a build, never into a workspace, and registers them in the build's `.claude/settings.json`
(why: both read a build's `.icm/`, and the house's own board is out of the epic · Jamie,
2026-10-27). The router and the board are repo copies only, never global hooks.

Hermes Agent does not read `.claude/settings.json`. The profile `legible` runs the same repo
hooks from two files in `~/.hermes/profiles/legible/`, registered under `hooks:` in its
`config.yaml`. Neither file holds a copy of a hook (why: the blueprint's script is the one
home, and a Hermes session on a build gets the same board, router and guards as Claude Code ·
`goose-worktrees/_done/plugin-router-and-board.md`, 2026-10-29). Both files have their home in
`core/setup/hermes/` (§ The Hermes profile).

| Profile file | Hermes event | Runs | Claude Code event |
|---|---|---|---|
| `guard-adapter.sh` | `pre_tool_call` (`terminal`, `write_file`, `patch`) | the three guards, the repo copy first. A guard `deny` is `block`, a guard `ask` is `approve` | PreToolUse |
| `board-context.sh` | `pre_llm_call`, first turn | the build's `.claude/hooks/session-start.sh`. Its output reaches the model as context | SessionStart |
| `board-context.sh` | `pre_llm_call`, each turn | the build's `.claude/hooks/route-request.sh` with the prompt. Its `[router]` line reaches the model as context | UserPromptSubmit |

`board-context.sh` prints nothing where the session's folder has no `.claude/hooks/`, or has
neither script.

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

### The Hermes profile

`core/setup/hermes/` is the home of the four files of `~/.hermes/profiles/legible/` that no
install writes. `setup/local.sh` copies a missing file into the profile, and all four into a
profile that it creates. It never overwrites a file that is present, and it names a file that
differs (why: Hermes writes `config.yaml` itself, an "always" approval among others, and an
overwrite drops it · 2026-10-29). Carry a change made on the machine into the house by hand.

| File | Holds |
|---|---|
| `config.yaml` | the provider and model, `secrets.command` (the keyring helper above), the approvals and their deny list, the command allow list, memory and skill writes behind approval, `skills.external_dirs`, the four hooks, the plugins, the MCP servers and the toolsets. No key, and no path but `~/.hermes/profiles/legible` and `~/.claude/skills`. A hook command starts with `~` (why: Hermes expands only a leading `~` and runs the script with no shell · 2026-10-29) |
| `SOUL.md` | the profile's standing prompt: Jamie's global working standards |
| `guard-adapter.sh` | the three guards for Hermes (the profile file table above) |
| `board-context.sh` | the board and the router for Hermes (the profile file table above) |

`skills.external_dirs` in the house copy holds `~/.claude/skills` only. `goose-task` adds and
removes each worktree's line on the machine, so the profile's copy differs while a worktree
lives (why: Hermes reads `.agents/skills` and `.hermes/skills` by itself, and the estate keeps
its skills in `.claude/skills` · 2026-10-29).

A new or changed hook command or script is not allowlisted: Hermes asks once per hook at the
next session's prompt, and the hook does not fire until Jamie approves it. `hermes -p legible
hooks doctor` shows the state.

Both scripts read the session's `cwd` from the profile's `state.db` (`sessions.cwd` by
`session_id`), and the payload's `cwd` is the fallback (why: under the gateway, Hermes v0.22.5
sends the gateway process's own folder, `~/.hermes`, as the payload's `cwd` · 2026-10-29). The
upstream issue is https://github.com/NousResearch/hermes-agent/issues/146570. When a Hermes release fixes it, the lookup leaves both scripts.

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
