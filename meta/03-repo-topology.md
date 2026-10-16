---
title: "Repo topology — how the system is reached from a cloud session"
kind: research
status: draft
owner: jamie
date: 2026-10-15
source: interview (12 questions, 2026-10-15) · code.claude.com docs read 2026-10-15 · gh inventory 2026-10-15
inputs: 01-goals.md (boundaries, C1–C3, D1–D4) · 02-tool-research.md (copier, mani, multi-gitter, Astro, Actions)
recheck: 2027-01-14 (Projects beta, Routines preview, proxy rules)
---

# Repo topology — how the system is reached from a cloud session

**Verdict: four kinds of repo, not one and not one-per-module.** One private *operating*
repo holds the shared core, every client folder, every module contract and the desk. One
public *method* repo holds the templates and the workshop kit. One private *reference*
repo holds Jake's course. Each client build is its own repo, rendered from the method repo,
standing alone, owned by Jamie for good. A module session attaches **one** repo; only
kickoff attaches two.

## 1. The facts that force the shape (verified 2026-10-15)

From the Claude Code cloud docs, in the order they bite:

| Fact | Consequence for the design |
|---|---|
| A cloud session clones one **or several** GitHub repos, chosen at start (picker, or `claude.ai/code?repositories=o/a,o/b`). Repos sit side by side under `/home/user/`. | "Every module runs from anywhere" is met by attaching the right repo(s) at start, not by reaching across repos later. |
| The GitHub proxy serves **only the repos attached to the session**. Any other repo returns `403 … is not enabled for this session`, including clones from a setup script and source archives. | A module's whole Inputs set must live in the repos attached at start. Submodules, sibling clones and "fetch the core from the other repo" all fail. |
| A **one-repo** session reads the repo's `CLAUDE.md`, `.claude/settings.json` hooks and permissions, `.mcp.json`, rules, skills, agents, commands. A **several-repo** session reads `CLAUDE.md` and skills from every repo but **no hooks, permissions, env or `.mcp.json`** from any of them. | Hooks and permission rules only exist in single-repo sessions. The default session shape must be one repo. |
| Nothing under `~/.claude` reaches the cloud: no user CLAUDE.md, skills, settings or hooks. | The global `block-local-checks.sh` does not run in the cloud; each repo carries its own copy (already the stated rule). |
| Private repos are reachable only where the **Claude GitHub App** is installed (per account or org), or via a `/web-setup` gh token. Projects need the App regardless. | Install the App once on the org with "all repositories"; every new client repo is covered on creation. |
| **Projects** (public beta, Pro/Max): repos + instructions (16k chars) + memory across threads; a thread can add a repo to itself only from an **owner the project already uses**. | One GitHub owner for everything live, or threads cannot pull in a client repo without a manual step. |
| **Routines** (research preview): 1+ repos, schedule ≥ 1 h, GitHub events, API trigger; run as Jamie, all connectors included by default, push `claude/` branches. | A model-driven unattended runner exists but is preview and permissive. Recorded as watch. |
| The proxy blocks GraphQL, so `gh pr` and `gh issue` fail in cloud sessions; REST via `gh api` works. Tags and branch deletes are refused. | Module skills must not script `gh pr create`; use the session's Create PR or `gh api`. release-please (tags) runs in Actions, not sessions. |
| Setup script is cached only if it finishes in ~5 min. Environment variables are visible to anyone using the environment; API keys go in **network secrets**. | One environment "legible" with the tool install (yq, mdq, jq, vale, cspell, lychee…) and network secrets for Google and ntfy. |
| Session sharing on Max is Private or **Public** (any logged-in user). | Sessions on the operating repo are never shared. Attendees get the method repo. |

## 2. The repo set

The org is `legible-consulting`, renamed from `ai-consultancy-workshop` on 2026-10-15 (brand: Legible Consulting). Collaborators get per-repo access on client repos only; see `04-github-organisation.md`.

| Repo | Visibility · owner | Holds | Who reads |
|---|---|---|---|
| `legible-consulting/house` — **operating** | private · org | Layer 0 `CLAUDE.md`; shared core (C1); `clients/<slug>/` one folder per relationship (C2); module stage folders with `CONTEXT.md` contracts (S1–S5, D1–D4, O1–O4); desk incl. the dashboard app (C3); `.claude/` hooks, settings, committed skills; `.github/workflows/` checks, sweeps, dashboard build. | Jamie's sessions only. Clients and salesmen through the dashboard; never git. |
| `legible-consulting/client-starter-kit` → grows into the **method** repo (rename to `blueprint` optional; GitHub redirects) | public · org | One copier template, `tier` question with `_subdirectory: "{{ tier }}"` → `site` · `app` · `platform` · `workspace` (O4); conventions; contract shapes; workshop kit (Marp); public explainers from the concept library. Nothing client-specific, ever. | Attendees, clients, copier, conformance. |
| `legible-consulting/learn-with-jake-van-clief` — **reference** | private · org | Jake's course and the ICM paper. The `jake-van-clief/` folder here merges into it and is deleted from the operating repo (decision 2026-10-15). | Attached only when a module's Inputs name it (O1, O4). |
| `legible-consulting/<client-slug>` — **client build**, one per build | private · org | Rendered from the method repo at kickoff; its own `CLAUDE.md`, contracts, CI, `.claude/settings.json` (with the local-checks hook); the kickoff brief as a committed file. Stands alone: nothing read from the operating repo at build time (Jamie, 2026-10-15). | Jamie's D2 sessions (single repo, hooks on); client as collaborator; dashboard via CI API. |
| `legible-consulting/<client-slug>` dormant, `legible-consulting/icm-board` | private · org (moved from `k0d0minio`) | Every client repo leaves the personal account (Jamie, 2026-10-15); dormant ones are archived in the org, secret-free, named. `icm-board` archived once one real deal has walked the new folders. The personal account keeps personal projects only. | Estate audit only. |

**Why not one repo per module.** Modules hand off through produced artefacts in the client folder; split them and every handoff becomes a second attached repo in a session that then loses its hooks. Why not one repo for everything including client code: client repos are deliverables with their own CI, release and collaborator, and D2 must run on them alone.

## 3. How a client folder, a code repo and a deal connect

- **The deal is the folder.** `clients/<slug>/` is opened at first touch and carries a `stage` field (prospect → research → proposal → quote → agreement → kickoff → build → handover → after). No separate deal object; commission fields live in the same record and the monthly close rolls them up.
- **The folder points, the repo holds.** The folder's record carries `repo:`, `tier:`, `owner:`, `vercel_project:`, `salesman:`. The code repo is never nested, submoduled or vendored into the operating repo.
- **The handoff crosses the repo boundary once, by rendering.** D1 kickoff renders the client repo from the method template and writes the brief and access table into it; the folder keeps the pointer and the copier answers. From then on D2 reads the client repo only.
- **The estate manifest is generated, never edited.** CI runs yq over `clients/*/record` frontmatter to emit `mani.yaml`; conformance (D4) and the dashboard read the same fields. One home per fact.
- **Live status flows back by API, not by clone.** The dashboard build in the operating repo's Actions calls the GitHub REST API (fine-grained token scoped to the org) for each repo in the manifest: latest run, release, open PRs.

## 4. Session recipes — what to attach for each job

| Job | Attach | Hooks? | Start from |
|---|---|---|---|
| Any sell module, core edit, desk, research, content, training (S1–S5, C1–C3, O1–O4) | operating repo only | yes | phone or web: `claude.ai/code?repositories=legible-consulting/house&prompt=…`; desktop Code tab → Cloud; `claude --cloud` from the clone |
| D1 kickoff | operating + the new (empty) client repo | **no** | web picker, two repos. Create the empty repo on GitHub first; whether `gh api POST /orgs/…/repos` passes the proxy is unverified |
| D2 build on a client | client repo only | yes | `claude --cloud` from its clone, or web |
| D4 conformance sweep | none: Actions in the operating repo runs copier update / multi-gitter across the manifest and opens one PR per repo | n/a | schedule; a session only to review or hand-fix (operating + one client repo) |
| Reference-heavy research (O1, O4) | operating + reference repo | no | web picker; keep short, no edits to the reference repo |
| Ongoing stream of work | one **Project** on the operating repo; instructions = the boundaries list from `01-goals.md`; threads self-add a client repo when a task names it (same owner) | per thread | once the Projects rollout reaches the account |

Rule carried from this (why: hooks and permissions exist only in single-repo sessions; proxy
scope is fixed at start · 2026-10-15): **a module session attaches one repo; two is the
exception and is named in the module's contract.**

## 5. Decisions handed to this report

| Question | Decision | Why |
|---|---|---|
| Who reads what (privacy) | Public method repo + private operating repo; clients and salesmen through the dashboard; attendees through the method repo and kit. | Attendees need the method without client data; clients need their slice; a sanitised export is a second home for the method that drifts. |
| Consolidate the estate | Superseded 2026-10-15 by Jamie: move **every** client repo and all ICM material to the org; archive dormant ones there; the personal account keeps personal projects. | One App install, one owner for Projects, one manifest, one place collaborators are invited to. Cost per moved repo: relink its Vercel project (Pro, already paid). Detail in `04-github-organisation.md`. |
| Dashboard home | Inside the operating repo under the desk module, Astro, built in Actions, Vercel root directory set to that folder; salesman write-back commits to the same repo. | Astro content collections read the client frontmatter directly; the write-back lands where the build reads; a separate app repo would need a token to clone a private repo and a cross-repo build trigger on every folder commit. Keep the app out of module context by routing in `CLAUDE.md` and path-scoped `.claude/rules`. |
| Unattended runner | GitHub Actions `schedule:` in the operating repo for the drift check, deadline sweep and research recheck; outputs are lines in the desk folder plus ntfy; Healthchecks as dead-man's switch. Routines: **watch**, recheck 2027-01-14 for phrasing the morning glance. | CI is truth and the sweeps are deterministic (yq, DuckDB, dateutils). Calendar and Drive are reached through the already-adopted service account, so connectors are not needed. Routines are preview, include every connector by default and run as Jamie without approval. |

## 6. Interview answers (2026-10-15)

- Client repo ownership: Jamie keeps ownership always; clients are collaborators.
- Client repo at build time stands alone; inherits from core only through the template at adoption.
- Plan: Max. Expected open relationships in a year: 10–40.
- Surfaces used: desktop Code tab (local, then cloud), phone and claude.ai/code, terminal `--cloud` / `--teleport`.
- Templates live in one public method repo grown from `client-starter-kit`.
- `jake-van-clief/` merges into `learn-with-jake-van-clief` and is deleted here, PDF included.
- Left to the report: privacy split, estate consolidation, dashboard home, unattended runner (decided above).
- Second round (2026-10-15): rename `ai-consultancy-workshop` to the business name (done the same day: `legible-consulting`); general collaborators get per-repo access only; stay on GitHub Free, gates by convention and CI; Vercel is Pro; local-only exceptions are the `projects/` clones with bulk estate ops and anything needing a browser login.

## 7. Order of work (fits Wave 1)

1. Merge `jake-van-clief/` into the reference repo; delete it here.
2. Install the Claude GitHub App on the org, all repositories. Create cloud environment `legible`: setup script installs the adopted CLI tools in under 5 min; network secrets for Google and ntfy.
3. Scaffold the operating repo: Layer 0 routing, core (C1), `clients/` (C2), module folders with contracts; commit `.claude/settings.json` with the local-checks hook.
4. Grow `client-starter-kit` into the method repo: `copier.yml` with the `tier` question; first tier is `site`.
5. Rename the org, then transfer every client repo into it; relink Vercel; archive dormant repos in the org (`04-github-organisation.md` §5).
6. CI: generate `mani.yaml` from client frontmatter; D4 sweep via copier update and multi-gitter PRs.
7. Dashboard under the desk module; Vercel root directory; three roles.
8. Create the Project on the operating repo when the rollout reaches the account.

## 8. Open items

- **Unverified:** whether `gh api POST /orgs/{org}/repos` is allowed through the proxy from a session (org endpoint, not a repository endpoint). Fallback: create the empty repo in the GitHub UI, then attach it.
- Vercel after a repo transfer: confirmed 2026-10-15 that the project needs disconnect and reconnect (`04-github-organisation.md` §3).
- Salesman write-back identity (GitHub App on behalf of a user) remains its own research item, as recorded in `02-tool-research.md`.
- Project memory and the folder are two homes for "what Claude learned"; keep project memory to session habits, never to client facts.

## Sources

- https://code.claude.com/docs/en/claude-code-on-the-web · https://code.claude.com/docs/en/web-quickstart · https://code.claude.com/docs/en/cloud-environments · https://code.claude.com/docs/en/settings · https://code.claude.com/docs/en/claude-projects · https://code.claude.com/docs/en/routines (all read 2026-10-15)
- https://dev.classmethod.jp/en/articles/claude-code-web-twelve-repositories/ (2026-09-27, 12 repos in one session, layout under `/home/user/`)
- https://copier.readthedocs.io/en/stable/configuring/ (`_subdirectory` is templatable)
- `gh repo list` for `ai-consultancy-workshop` (5 repos) and `k0d0minio` (36, 10 private, 3 archived), 2026-10-15
