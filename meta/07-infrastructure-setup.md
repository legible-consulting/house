---
title: "Infrastructure setup — the simplest shape the ICM system can live in"
kind: plan
status: draft
owner: jamie
date: 2026-10-15
source: gh read against the real org 2026-10-15 (two repos left) · code.claude.com large-codebases, cloud-environments, memory docs read 2026-10-15 · copier configuring/updating docs · docs.github.com reusable workflows, workflow templates, community health files · RinDig ICM conventions and icm-architect forms · Jamie's decisions in session 2026-10-15 (reference repo yes; create every repo now; nothing remote from a session)
inputs: 01-goals.md (modules, boundaries) · 03-repo-topology.md (session facts) · 06-org-design.md (settings, secrets, verify list) · 06-org-runbook.md (commands, reused by step number)
produces: ~/Desktop/legible-consulting/ (one folder per repo, each a local git repo on main with its remote set and nothing pushed)
supersedes: the repo set in 03-repo-topology.md §2 and 06-org-design.md §4
recheck: 2027-01-14
---
# Infrastructure setup — the simplest shape the ICM system can live in

**Verdict: one operating repo holds every module; three small sibling repos hold what
other people or no session must edit; one repo per client build, added only when a build
starts.** The four non-client repos exist today as folders under
`~/Desktop/legible-consulting/`, each a git repo on `main` with its remote set. Jamie
creates the two missing GitHub repos by hand and pushes. Nothing was created, changed or
pushed remotely by a session.

## 1. Single repo or split modules

The question was: keep all operations and modules in one repo, or one repo per module and
connect them. The facts that decide it, verified 2026-10-15:

| Fact                                                                                                                                                                                                                                                                                                       | Where                                                                         | What it means for a split                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A cloud session loads a repo's hooks and permission rules**only when one repository is attached**. With several, no repo's hooks, permissions or `.mcp.json` load.                                                                                                                                 | code.claude.com/docs/en/cloud-environments, "What carries over"               | Every job that reads two modules becomes a session with no`block-local-checks` hook and no permission rules. The gates that make the boundaries real disappear exactly when a handoff happens.                                                                  |
| Plugins and marketplaces named in a repo's`settings.json` **never install in a cloud session**.                                                                                                                                                                                                    | same table                                                                    | The one mechanism Claude Code offers for sharing skills, hooks and rules across repos does not reach the phone or claude.ai/code. A split would need every shared asset copied into every repo.                                                                   |
| In one repo, Claude loads the root`CLAUDE.md` at launch and a subfolder's `CLAUDE.md` only when it touches that folder; `.claude/rules/` entries with `paths:` load only on matching files; a subfolder's `.claude/skills/` load only when that folder is touched.                               | code.claude.com/docs/en/large-codebases                                       | A monorepo costs no context for the modules a session does not enter. The ICM rule "read contracts on demand" is what the tool already does.                                                                                                                      |
| `--add-dir` and `additionalDirectories` give file access to a sibling checkout locally; CLAUDE.md and rules from it load only with an env var, skills only with the flag, never with the setting.                                                                                                      | same page                                                                     | A local-only split would work, but every module session would start with a flag and lose the "every module runs from anywhere" boundary.                                                                                                                          |
| ICM's own forms: a**pipeline** is numbered stages under one root; an **umbrella** is "a portfolio of pipelines" as peers under one root with catalog files routing between them; a **knowledge bundle** is a navigable reference system. The conventions say nothing about repositories. | RinDig/icm-architect README;`_core/CONVENTIONS.md`                          | The operating repo is an umbrella:`sell/`, `deliver/` are pipelines, `operator/` a set of peers, `clients/` a record library, `core/` a knowledge bundle. The course and paper are a knowledge bundle that no stage produces into, so they stand apart. |
| copier: "1 template = 1 Git repository";`_subdirectory` can be templated (`"templates/{{ tier }}"`); `copier update` needs the template repo to have git **tags**.                                                                                                                             | copier.readthedocs.io configuring, updating                                   | Templates need their own tagged repo. Parking them in the operating repo would mean tagging the operating repo for template versions.                                                                                                                             |
| A reusable workflow in a**public** repo can be called by any repo as `owner/repo/.github/workflows/file@ref`; the `.github` repo must be public and already serves the profile README, `SECURITY.md`, `CONTRIBUTING.md` and `workflow-templates/`.                                         | docs.github.com reusing-workflows, community health files, workflow templates | The shared client CI lives in`.github`, not in a separate `workflows` repo.                                                                                                                                                                                   |

Rule (why: hooks and permissions exist only in single-repo sessions, plugins never reach the
cloud, and ICM composes forms under one root · 2026-10-15): **modules are folders in the
operating repo, never repos. A thing gets its own repo only when (a) a different person must
clone it without seeing the rest, or (b) sessions only ever read it and no module produces
into it.** (a) gives the client repos, `blueprint` and `.github`; (b) gives `library`.

What the first draft of this file got wrong (corrected 2026-10-15 on Jamie's push-back):
it parked the course under `reference/` in the operating repo and then had to deny-read it.
A folder you must hide from Claude inside its own repo belongs elsewhere; it also made every
check run, grep and clone pay for 176 third-party files no client artefact reads.

## 2. The repos

| Repo                                    | Local folder                                                                                     | Visibility                              | Holds                                                                                                                                                                                                                                                                                                                                | GitHub state                                                           |
| --------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `house` · operating                  | `legible-consulting/house/` (a clone of the existing checkout, scaffold committed on `main`) | private                                 | Layer 0`CLAUDE.md`; `core/`; `clients/` with `_template/record.md`; `sell/01…05`, `deliver/01…04`, `operator/{research,portfolio,content,training}`, `desk/`, each with a `CONTEXT.md`; `.claude/` hook, settings, two path-scoped rules; `.github/workflows/` (sweeps, Wave 1); `meta/` until Wave 1 ends | exists; push`main`                                                   |
| `.github` · front page and shared CI | `legible-consulting/.github/`                                                                  | public                                  | `profile/README.md`, `SECURITY.md`, `CONTRIBUTING.md`, `workflow-templates/`, `.github/workflows/` for the four reusable client workflows                                                                                                                                                                                  | exists with two "Hello" files; force-push or merge unrelated histories |
| `library` · read-only                | `legible-consulting/library/`                                                                  | private                                 | `course/jake-van-clief/` (176 files incl. the ICM paper PDF), `research/` (ledger pointer; `meta/` lands here after Wave 1), a ten-line `CLAUDE.md` that says read-only                                                                                                                                                      | **create**, then push                                            |
| `blueprint` · the method             | `legible-consulting/blueprint/`                                                                | public                                  | `copier.yml` with the `tier` question and `_subdirectory: "templates/{{ tier }}"`; `templates/{site,app,platform,workspace}/` each rendering an answers file and a README; `conventions/`; `workshop-kit/`                                                                                                               | **create**, then push; tag `v0.1.0` at the first kickoff       |
| `<client-slug>` · one per build      | `~/Desktop/Apps/projects/<slug>/` (the local lane)                                             | site public · app and platform private | rendered from`blueprint`; `CLAUDE.md`, `BUILD.md`, `ci.yml` calling `.github`'s workflows                                                                                                                                                                                                                                  | none yet; transfers in phase F                                         |

Rules carried (why · 2026-10-15):

- **One session, one repo.** Default is the operating repo alone; a build session is the
  client repo alone; kickoff attaches the new client repo too; O1 and O4 attach
  `library` too. The two-repo sessions accept no hooks and are read-mostly. Why: §1.
- **Reference is read, never produced into.** O1 distills the course and ledger into
  `operator/research/`; every other module reads the distillation and never attaches the
  reference. Why: a single-repo session cannot reach a second repo at all, so what a sell
  session needs must already be in the operating repo.
- **The client folder points, the client repo holds.** `clients/<slug>/record.md` carries
  `repo:`, `tier:`, `vercel_project:`; nothing is submoduled or vendored. Why: the proxy
  serves only attached repos.
- **The local lane is a runner.** `~/Desktop/legible-consulting/*` and
  `~/Desktop/Apps/projects/*` with mani, multi-gitter, copier; reached by Remote Control;
  every result is a commit or a PR. Why: a machine is where bulk estate work is cheap and
  where a browser login lives; it is never where a fact lives.
- **Nothing remote from a session.** Repos are created, transferred and pushed by
  Jamie's hand. Why: Jamie, 2026-10-15; the gate on the estate is his.

## 3. Task list

Ordered. One line per step, with the check that proves it. Steps that already have their
exact command in `06-org-runbook.md` cite the step number. Boxes are Jamie's.

### A · Push the four folders (today)

Commands per folder are in `~/Desktop/legible-consulting/README.md`.

- [X] **A1** Read the two public placeholders before anything public goes up:
  `.github/SECURITY.md` carries `{{SECURITY_CONTACT}}`; `.github/profile/README.md` carries
  `{{SITE_URL}}`. Fill or delete.
  Check: `grep -rn '{{' ~/Desktop/legible-consulting/.github` prints nothing.
- [X] **A2** Push `house` `main`. Check: github.com/legible-consulting/house
  shows `CLAUDE.md` and no `jake-van-clief/`.
- [X] **A3** Create `library` (private, empty: no README, licence or gitignore) in the
  GitHub UI; push. Check: the repo shows `course/` and `CLAUDE.md`.
- [X] **A4** Create `blueprint` (public, empty); push. Check: the repo shows `copier.yml`.
- [X] **A5** Push `.github` over the two "Hello" files. Check: github.com/legible-consulting
  shows the new front page.
- [X] **A6** Retire the old checkout: once A2 is pushed, `~/Desktop/icm-workshop` and its
  worktrees are stale; delete the folder when no session is open in it. Check:
  `ls ~/Desktop` shows `legible-consulting`, `Apps`, `clief-notes-raw`.

### B · Org settings (today, 30 minutes, from this machine, Jamie's hand)

- [X] **B1** `gh auth refresh -h github.com -s admin:org,delete_repo` (runbook 0.1).
  Check: `gh auth status` lists `admin:org`.
- [X] **B2** Second owner `mikaelbelmont` (runbook 1.2). Check: two logins under `role=admin`.
- [X] **B3** Base permission none (runbook 1.4). Check: `default_repository_permission: none`.
- [X] **B4** Repo creation owners only (runbook 1.5). Check: `[false,false,false]`.
- [X] **B5** Visibility, delete, transfer owners only (runbook 1.6, UI). Check: both boxes unticked.
- [X] **B6** Actions policy and read-only `GITHUB_TOKEN` with PR creation allowed (runbook
  1.7, 1.8). Check: `default_workflow_permissions: read`, `can_approve_pull_request_reviews: true`.
- [X] **B7** PAT policy: fine-grained allowed, classic restricted (runbook 1.9, UI).
- [X] **B8** Install the Claude GitHub App on the org, **all repositories** (runbook 1.10).
  Check: `gh api orgs/legible-consulting/installations` shows a line ending in `all`.
- [ ] **B9** Require 2FA **after** `GPardas` confirms it is on (runbook 1.1, 1.3).
- [X] **B10** Ruleset on `main` of `.github` and `blueprint`, no bypass actors (runbook 5.6
  body). Check: `gh ruleset list --repo …` shows `main` on both.

### C · Prove the operating repo from anywhere (this week)

- [X] **C1** Cloud environment `legible` (runbook 5.8): setup script pasted from `core/setup/cloud.sh`
  (settings in `core/stack.md`); no network secrets.
  Check: a cloud session on `house` prints two paths for
  `which yq gitleaks` and `/context` lists the repo's hook.
- [X] **C2** From the phone, open a session on `house`, edit `core/CONTEXT.md`, push.
  Check: the commit is on `main`. First "every module runs from anywhere" proof.
- [X] **C3** Add `.github/workflows/check.yml` (the table in `.github/workflows/README.md`). Check: the next push shows a green `check` run. Never run
  it locally.
- [x] **C4** A two-repo session (operating + `library`) reads one course file and
  writes a verdict under `operator/research/verdicts/`. Check: the commit lands in
  `house` only; `library` has no new commit.

### D · Local lane (this week)

- [X] **D1** Install the toolbox (runbook 0.4): `bash core/setup/local.sh`. Check: no `MISSING` line.
- [X] **D2** Hand-write `desk/mani.yaml` with the three live client repos and `sustentus`,
  tagged `live`, paths under `~/Desktop/Apps/projects/`. Check: `mani exec -t live 'git status -sb'` prints four lines.
- [x] **D3** Remote Control: `/rc` in the Desktop Code tab, "Keep computer awake" on; from
  the phone run `mani exec -t live 'git log -1 --format=%h'`. Check: four hashes on the phone.
- [X] **D4** Render a `site` tier from `blueprint` into a scratch folder with
  `copier copy --vcs-ref HEAD ~/Desktop/legible-consulting/blueprint /tmp/zz-site`.
  Check: `/tmp/zz-site/.copier-answers.yml` names `tier: site`. Delete the scratch folder.

### E · Secrets, only when a workflow needs them

- [ ] **E1** `VERCEL_TOKEN` (runbook 5.1, 5.2) when `dashboard.yml` or the first
  `deploy-vercel` call exists.
- [ ] **E2** `DASHBOARD_PAT` read-only (runbook 5.3) when the dashboard build is written.
- [ ] **E3** `ESTATE_PAT` write (runbook 5.4) when `conformance.yml` is written; until then
  conformance runs from the local lane under Jamie's own `gh` login.
- [ ] **E4** `GOOGLE_SA_KEY`, `HEALTHCHECKS_URL` (runbook 5.5) when the first scheduled sweep
  exists.

### F · Bring the client repos in (one afternoon, Jamie's hand)

- [X] **F1** gitleaks the 25 repos leaving `k0d0minio`; rotate before purging on any hit
  (runbook phase 2). Check: every non-personal repo has a `gitleaks:` line in the inventory.
- [X] **F2** Transfer `courseday` first and close the two verify-once items (runbook 3.1, 3.2).
- [X] **F3** Transfer firedough (runbook 3.3). The other dormant repos and `icm-board` stay
  on `k0d0minio`. Check: `gh repo view legible-consulting/firedough` succeeds.
- [X] **F4** Transfer berceo, vinecliff (as `vinecliff-vineyard`), remi-ai, agorasim (runbook
  3.6); repoint local clones (3.7). Check: `k0d0minio` lists 22 repos.
- [] **F5** Vercel: reconnect berceo, vinecliff, courseday, firedough and the six remi21
  projects to the org repos (runbook 4.1 to 4.4).
- [X] **F6** One folder per live client from `clients/_template/record.md`: berceo,
  vinecliff, remi-ai, sustentus, each at `stage: after` with `repo:` set. Check: `yq --front-matter=extract` over `clients/*/record.md` returns four rows with a `repo` field.
- [ ] **F7** Rulesets on `main` of the three public client repos (runbook 5.6).

### G · Wave 1 proofs (the infrastructure is done when)

- [ ] **G1** C2 repeated on a file under `clients/` with `check` green.
- [ ] **G2** `blueprint` tagged `v0.1.0`; a `site` tier rendered from the local lane into an
  empty org repo created in the UI; its `ci.yml` calls
  `legible-consulting/.github/.github/workflows/check-client.yml@main` and runs green.
- [ ] **G3** A conformance run from the local lane opens one PR on berceo and writes
  `desk/estate/drift-<date>.md`.
- [ ] **G4** The dashboard builds from `clients/` in Actions and deploys; the page shows four
  clients with a build timestamp.
- [ ] **G5** `meta/` moves to `library/research/design-trail/` once every contract
  carries its own whys; `CLAUDE.md`'s last routing row is deleted in the same PR.

### H · After this runbook: audit the global Claude layer

Starts once A–G are done (Jamie, 2026-10-16). The global `~/.claude/` predates the
`legible-consulting` org and the house words; bring it in tune with them.

- [ ] **H1** Audit `~/.claude/CLAUDE.md`: the ICM wording against `core/lexicon.md`; the
  "one global hook" line against the four hooks `core/stack.md` lists; what belongs
  globally versus in `house`.
- [ ] **H2** Audit the four global hooks (`icm-session-start`, `block-local-checks`,
  `confirm-git-writes`, `guard-plaintext-secrets`): keep, change, or move into the repos
  so cloud sessions get them too.
- [ ] **H3** Audit `~/.claude/settings.json`: permissions, permission mode, plugins, MCP
  servers and connectors this machine loads.
- [ ] **H4** Record the outcome in `core/stack.md` ("Local machine"). Check: `stack.md` and
  `~/.claude/` describe the same hooks, permissions and tools.

## 4. What this changes against 06-org-design.md, and why

| Item                         | Was                                                             | Now                                                                                       | Why (2026-10-15)                                                                                                                            |
| ---------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `workflows` repo           | separate public repo                                            | `.github/.github/workflows/`                                                            | One public repo already exists and may hold any content; a second is a second place to tag and watch.                                       |
| Reference repo               | `learn-with-jake-van-clief`, merged into by PR                | `library`, created fresh from the folder                                                | Jamie deleted the old one; the course has a handful of import commits and one commit with the source SHA is enough provenance.              |
| Method repo                  | `client-starter-kit` grown later                              | `blueprint`, created now, tagged at first kickoff                                       | Jamie creates every repo in one sitting; copier needs a tagged repo of its own and the operating repo must not carry template tags.         |
| Course in the operating repo | `jake-van-clief/` here                                        | removed in the scaffold commit                                                            | §1, last paragraph.                                                                                                                        |
| Local layout                 | clones scattered on the desktop                                 | `~/Desktop/legible-consulting/<repo>/`                                                  | One folder mirrors the org; `core/stack.md` is the only instruction a fresh machine needs (moved there from the unversioned root README, 2026-10-16).                                       |
| Remote actions               | runbook steps run by a session where safe                       | **none from a session**                                                             | Jamie, 2026-10-15.                                                                                                                          |
| Phase order                  | settings → gitleaks → transfers → Vercel → secrets → merge | push → settings → cloud proof → local lane → secrets on demand → transfers → proofs | The operating repo must have`clients/` before a client repo has a folder to point from; secrets have no consumer until a workflow exists. |

Everything else in `06-org-design.md` stands: §3 settings and their whys, §6 collaborator
lifecycle, §7 sync paths, §8 secrets table, §9 costs, §10 verify-once list.

## 5. Open items

- `GPardas` without 2FA blocks B9; Jamie decides whether to wait or remove and re-invite.
- Whether `gh api POST orgs/legible-consulting/repos` passes the cloud proxy (design §10
  item 4); moot while every repo is created by hand.
- Where the business site is served (O3 output; `jamienisbet` is personal today).
- Salesman write-back and the dashboard's commit identity: unchanged research item.
- A licence for `blueprint` (public): Jamie's call; none committed.

## Sources

- https://code.claude.com/docs/en/cloud-environments (What carries over from your setup; setup scripts; time limits)
- https://code.claude.com/docs/en/large-codebases (per-directory CLAUDE.md, `.claude/rules/` paths, `claudeMdExcludes`, `--add-dir`, per-directory skills, plugins)
- https://code.claude.com/docs/en/memory · https://code.claude.com/docs/en/worktrees
- https://copier.readthedocs.io/en/stable/configuring/ (`_subdirectory` templatable; "1 template = 1 Git repository") · https://copier.readthedocs.io/en/stable/updating/ (tags required) · https://copier.readthedocs.io/en/stable/generating/ (`--vcs-ref HEAD`)
- https://docs.github.com/en/actions/sharing-automations/reusing-workflows · https://docs.github.com/en/actions/sharing-automations/creating-workflow-templates-for-your-organization · https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file
- https://github.com/RinDig/icm-architect (six forms) · https://github.com/RinDig/Interpretable-Context-Methodology/blob/main/_core/CONVENTIONS.md (Patterns 2, 3, 4; trigger words)
- https://startdebugging.net/2026/05/how-to-structure-a-monorepo-so-claude-codes-context-stays-small/ (2026-05-13)
- `gh repo list legible-consulting`, `gh api orgs/legible-consulting`, `members`, read 2026-10-15
