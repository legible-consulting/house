---
title: "Org design — legible-consulting as the agency's home"
kind: research
status: draft
owner: jamie
date: 2026-10-15
source: interview (4 rounds, 16 questions, 2026-10-15) · gh api and Vercel CLI read against the real org, account and teams 2026-10-15 · docs.github.com, vercel.com/docs, code.claude.com read 2026-10-15
inputs: 01-goals.md (modules, boundaries) · 03-repo-topology.md (repo set, one-repo sessions) · 04-github-organisation.md (verified facts, migration order) · 02-tool-research.md (gh, mani, multi-gitter, copier, gitleaks, release-please, Astro)
produces: 06-org-runbook.md · estate-k0d0minio-2026-10-15.json · estate-org-2026-10-15.json
recheck: 2027-01-14
---

# Org design — legible-consulting as the agency's home

**Verdict: the org is already the home; what is missing is settings, two repos and a small
move.** `legible-consulting` holds the operating repo, the method repo, the reference repo,
the profile repo and (new) a public `workflows` repo, plus one repo per client build. Four live
repos leave the personal account (Jamie moves them by hand); two dormant client repos,
courseday and firedough, move and are archived after a gitleaks pass; every other repo stays
on `k0d0minio`. Collaborators touch client repos only. Everyone else
(salesman, client, attendee) reaches the agency through the dashboard, a rendered file in
the client repo, or the public method repo. Nothing in this design costs money beyond what
is already paid. Nothing here has been executed: the runbook is `06-org-runbook.md` and the
gate is Jamie's.

## 1. Interview answers (2026-10-15, four rounds)

| Question | Answer |
|---|---|
| Collaborator roles in the first 90 days | Developer on a client build · salesman via dashboard · second ICM practitioner. No designer. |
| Does anyone but Jamie read the operating repo | **Never.** The second practitioner works from the method repo and client repos. |
| `GPardas` and `mikaelbelmont` (current org members) | Keep as members; not active yet, membership is a placeholder. `mikaelbelmont` becomes the second owner (recovery). |
| Live repos | Only **berceo, sustentus, agorasim, vinecliff, remi-ai, jamienisbet, english-with-jamie**. Everything else is dormant or personal. |
| Which live repos are client builds | Jamie decides and **transfers them by hand**; nothing in this session or the runbook moves a repo for him. Proposed default: client = berceo, vinecliff, remi-ai; personal = agorasim, jamienisbet, english-with-jamie. |
| Sustentus | Its own GitHub org (`sustentus/sustentus`, private) and its own Vercel team; stays there; the client folder points to it. |
| Dormant vs personal among the others | Personal = sell-my-stuff, the-library, dungeons-dragons, messy-play (stay). Dormant client: courseday and firedough move and are archived; the rest stay. `icm-board` stays. |
| New client repo visibility | Sites public; apps and platforms private. |
| Build tickets | Files in the client folder only. A developer receives them because **kickoff renders the brief and ticket list into the client repo as a file**; the folder keeps the pointer. |
| Second org owner | `mikaelbelmont` (has 2FA today; `GPardas` does not). |
| Vercel seat if a collaborator ever needs one | Jamie pays, case by case. Default path needs no seat. |
| Re-register `ai-consultancy-workshop` | No; let it go. |

Full marks per repo: `meta/estate-k0d0minio-2026-10-15.json` (34 repos: 6 live, 21
client-dormant, 6 personal, 1 reference) and `meta/estate-org-2026-10-15.json` (5 repos).

## 2. The real org and account today (read 2026-10-15)

| Item | Today | Target | How read |
|---|---|---|---|
| Plan | Free | Free | `gh api orgs/legible-consulting` |
| Members | `k0d0minio` owner · `GPardas`, `mikaelbelmont` members | + `mikaelbelmont` owner | `members?role=admin` |
| 2FA required | **false** | true | `two_factor_requirement_enabled` |
| Members without 2FA | `GPardas` | none | `members?filter=2fa_disabled` |
| Base permission | **read** | none | `default_repository_permission` |
| Members can create repos | **true** (public and private) | false | `members_can_create_repositories` |
| Fork private repos | false | false | `members_can_fork_private_repositories` |
| Teams · outside collaborators | none · none | none until needed | `teams`, `outside_collaborators` |
| Rulesets on a private repo | 403 "Upgrade to GitHub Pro or make this repository public" | accepted | `repos/…/icm-workshop/rulesets` |
| Actions access setting on a private repo | `access_level: none` (endpoint works on Free) | `organization` on the workflows repo only if it were private; it will be public | `actions/permissions/access` |
| Claude GitHub App on the org | not readable with the current token (needs `admin:org`) | installed, all repositories | runbook step 1.10 |
| Old name `ai-consultancy-workshop` | 404, claimable | left | `gh api orgs/…` |
| Org repos | `icm-workshop` private · `client-starter-kit` public (README + `.claude/settings.json` + `icm.pdf`) · `.github` public (profile README says "Hello") · `learn-with-jake-van-clief` private · `tech-stack-audit-marketing-site` private, **empty** | see §4 | `gh repo list`, `contents` |
| Personal repos | 37 (27 public, 10 private, 3 archived); 30 bulk-pushed 2026-09-29, so `pushedAt` says nothing about liveness | 9 remain | `gh repo list k0d0minio` |
| Actions secrets on personal repos | courseday 5 · berceo 4 · agorasim 3 · icm-board 2 · jamienisbet, vinecliff, remi-ai, kau-american-bbq, dungeons-dragons 1 · others 0; webhooks 0 everywhere | carried by transfer | `actions/secrets`, `hooks` |
| Vercel | three Pro teams: `kodominio` (27 projects, 1 member: Jamie, GitHub `k0d0minio`) · `remi21` (6, all linked to `sustentus/sustentus` or unlinked) · `sustentus` (8) | `kodominio` stays the agency team | `vercel teams ls`, `vercel api /v9/projects` |
| Vercel projects linked to repos that move | live: `berceo`, `vinecliff` · dormant: courseday, firedough · **no project links to `remi-ai`** in any team | reconnect 2, disconnect 2 | `.link.org/.link.repo` |
| Local | clones of 34 repos at `~/Desktop/Apps/projects/` (the local lane) · gh 2.101.0, Vercel CLI 61.0.0, gitleaks 8.30.1, git-filter-repo, jq, brew, uv present · mani, multi-gitter, copier, yq **missing** | tools installed | `command -v` |

## 3. Org skeleton

Every row: what, whether GitHub Free supports it, how it was verified, why. "Expected" means
the docs state no plan restriction but the setting has not been seen on this org yet; the
runbook check closes it.

| Item | Setting | Free? | Verified | Why (2026-10-15) |
|---|---|---|---|---|
| Owners | `k0d0minio` + `mikaelbelmont` | yes | roles read today | GitHub recommends two; one lost phone must not lock the agency out. An owner can delete repos and change billing, so the second owner is the one trusted member who already has 2FA. |
| 2FA | required for all members and outside collaborators | expected (docs state no plan limit) | after click: `two_factor_requirement_enabled: true` | Collaborators get write on client code; a stolen password must not reach a client's site. **Enforcing removes every member without 2FA** (`GPardas` today), so it is switched on only after they confirm 2FA. |
| Base permission | none | expected | after PATCH: `default_repository_permission: none` | A member sees nothing by default; the operating and reference repos are visible to Jamie only (interview: never). |
| Repo creation | owners only (public and private) | yes (only "private only" needs Enterprise) | after PATCH: `members_can_create_repositories: false` | Every repo in the org is in the manifest or it does not exist; a member-created repo would be drift from day one. |
| Visibility change · delete · transfer | owners only | yes (docs) | UI shows unticked | Same reason; also a client repo must never be made public by a collaborator. |
| Forking private repos | off | yes (already off) | read today | A fork of a client repo is a copy outside the manifest. |
| Actions policy | allowed: GitHub-authored, verified creators, `legible-consulting/*`; default `GITHUB_TOKEN` permissions read; "allow Actions to create and approve PRs" on | expected | `actions/permissions` GET after PUT | Supply-chain floor at zero cost; release-please and copier-update PRs need the PR permission; everything else is read-only unless a job asks. |
| PAT policy | fine-grained PATs allowed without approval; classic PATs restricted | expected (docs state no plan limit) | settings page shows both policies | Only Jamie holds tokens; the dashboard and estate jobs use two fine-grained PATs (§8). `gh` is an OAuth app, not a PAT, and is unaffected. |
| Claude GitHub App | installed on the org, **all repositories** | yes | org Settings → GitHub Apps shows Claude · a cloud session attaches a transferred repo | One install covers every repo created later; whether it covers repos **transferred in** is expected but unverified until the first transfer (§10 item 9). |
| `.github` repo | public; `profile/README.md` is the agency's front page; `SECURITY.md` (how to report a leak) and `CONTRIBUTING.md` (points at the onboarding note, §6) as default community files | yes (profile README documented for all plans) | github.com/legible-consulting shows it | The org page is the first thing a collaborator or client sees after an invite; today it says "Hello". |
| `workflows` repo | **public**, new; holds the reusable workflows every client repo calls (§4); tagged `v1`, `v1.x` independently of the method repo | yes | a public client repo's CI run using `legible-consulting/workflows/.github/workflows/check-client.yml@v1` is green | Reusable workflow YAML carries no secrets (callers pass them). Public removes the unverified private-to-public call and the Access setting altogether. Separate from the method repo because copier update compares **template tags**: a workflow fix inside the template would open a spurious update PR on every client. Separate from `.github` so the front page stays a front page. |
| Rulesets | public repos: ruleset on the default branch, no bypass actors (§4). Private repos: **none possible** | verified today (403 on the private repo) | `gh ruleset list` per public repo | On Free the hard stop exists only where the repo is public. Private repos are gated by the `CLAUDE.md` boundary plus a `guard-main` check that fails and pings. |
| Secrets | per repo (`gh secret set --repo`), never org-level | verified (docs: org secrets and variables are not accessible to private repos on Free) | `gh secret list --repo` | One home per secret per repo; the manifest names which repo needs which secret name. |
| Secret scanning · push protection | public repos: on by default, free. Private repos: not purchasable on Free (Secret Protection needs Team, $19 per active committer) | verified (docs) | berceo Settings → Code security shows push protection enabled | gitleaks in pre-commit and in every check workflow is the private-repo guard. |
| Dependabot | alerts on all plans; version updates via `dependabot.yml` per tier | yes | first alert or PR appears | Zero infrastructure; one file rendered by the template. |
| Teams | none on day one; a team `build-<slug>` only when one collaborator spans more than one repo | yes | `gh api orgs/…/teams` empty | Fewest moving parts; an outside collaborator on one repo needs no team. |
| Custom repository roles · org rulesets · custom properties | not used | Enterprise only (roles, verified) · Team and up (org rulesets, verified) · unverified (properties) | — | Nothing in the modules needs them. |

## 4. Repos, teams and workflows after the move, by name

**Repos in `legible-consulting`**

| Repo | Visibility | Kind | State after the runbook |
|---|---|---|---|
| `house` | private | operating | unchanged; gains `.github/workflows/` (below) during Wave 1 |
| `client-starter-kit` | public | method (rename to `blueprint` optional later; GitHub redirects) | ruleset on `main`; grows the copier template |
| `learn-with-jake-van-clief` | private | reference | receives `jake-van-clief/` from the operating repo (runbook phase 6) |
| `.github` | public | org profile | real `profile/README.md`, `SECURITY.md`, `CONTRIBUTING.md`; ruleset on `main` |
| `workflows` | public | shared reusable workflows (new) | created empty today; content in Wave 1; ruleset on `main` |
| `berceo`, `vinecliff-vineyard`, `remi-ai`, `agorasim` | public (as today) | live builds | transferred by Jamie's hand; Vercel reconnected (berceo, vinecliff); ruleset on `main` |
| `courseday`, `firedough` | as today | client, dormant | transferred after gitleaks; **archived**; Vercel link disconnected where one exists |
| `tech-stack-audit-marketing-site` | private, empty (size 0) | unknown | Jamie's call: delete (restorable for 90 days) or repurpose; the design assumes delete |
| `<client-slug>` × future builds | site public · app and platform private | client build | rendered from the method repo at kickoff |

**Repos that stay on `k0d0minio`:** `jamienisbet`, `english-with-jamie` (live, personal),
`sell-my-stuff`, `the-library`, `dungeons-dragons`, `messy-play`, the 15 other dormant
client repos and `icm-board` (list in the inventory JSON). **Elsewhere:** `sustentus/sustentus`
(client's own org; the client folder carries `repo: sustentus/sustentus`, `owner: client`).

**Teams:** none. Rule (why: an outside collaborator on one repo needs no team, and a team
is one more thing to offboard · 2026-10-15): a team is created only when one collaborator
must reach two or more client repos at once; it is named `build-<slug>` and deleted at
handover.

**Workflows in the operating repo** (`house/.github/workflows/`, Wave 1; private
minutes):

| File | Trigger | Does | Why |
|---|---|---|---|
| `check.yml` | push, PR | `pre-commit run --all-files`: check-jsonschema on frontmatter, yamllint, gitleaks, actionlint, zizmor | CI is truth; the folder tree is validated where it is pushed, never locally. |
| `manifest.yml` | push to `main` touching `clients/**` | yq extracts record frontmatter → `desk/mani.yaml`; commits it with `chore(manifest): regenerate [skip ci]` | The manifest is generated, never edited; one home per fact. |
| `sweep-deadlines.yml` | `schedule` daily 06:00 Lisbon | DuckDB over the extracted frontmatter → `desk/glance/<date>.md`; Healthchecks ping | The unattended runs the boundaries allow; lines for the morning glance. |
| `conformance.yml` | `schedule` weekly Monday 06:30 + manual | for each live repo in `mani.yaml`: `copier update --defaults --conflict rej` and the asset check via multi-gitter → one PR per repo; `desk/estate/drift-<date>.md` | D4; PRs keep the gate human. |
| `research-recheck.yml` | `schedule` weekly | lists verdicts whose `recheck` date has passed → glance lines | O1 recheck without a model. |
| `dashboard.yml` | push to `main`, `schedule` every 6 h | Astro build of the desk from `clients/` and the GitHub REST API (`DASHBOARD_PAT`) → `vercel deploy --prebuilt --prod` | The dashboard reads the folders where they live; token deploys carry no author check; status is stamped with build time. |

No `guard-main` on the operating repo (why: the boundaries allow a session to commit words
straight to `main`; the gated acts are merge and release of **client code** · 2026-10-15).

**Workflows in the `workflows` repo** (reusable; called by every client repo's rendered
`ci.yml` as `legible-consulting/workflows/.github/workflows/<file>@v1`):

| File | Does | Secrets (passed by the caller) |
|---|---|---|
| `check-client.yml` | per-tier lint, typecheck, test, gitleaks, actionlint; inputs: `tier` | none |
| `deploy-vercel.yml` | `vercel pull --environment=preview|production`, `vercel build`, `vercel deploy --prebuilt`; preview on PR (the UAT environment D2 promises), production on the release merge | `VERCEL_TOKEN` (secret), `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (variables) |
| `release.yml` | release-please: opens the release PR; merging it is the release | `GITHUB_TOKEN` with PR permission |
| `guard-main.yml` | on `push` to `main`: fails when the commit is not a PR merge | none |

Private client repos carry `"git": {"deploymentEnabled": false}` in `vercel.json` and deploy
only through `deploy-vercel.yml` (why: Vercel's Git integration deploys a private repo's
commit only when the author is a Vercel team member; a token deploy from Actions has no
such check, expected and listed in §10 · 2026-10-15). Public client repos may keep the Git
integration or use the same workflow; the template defaults to the workflow so every tier
runs the same way.

## 5. Modules onto the org

Folder names under the operating repo are the ones the Wave 1 scaffold will fix
(`03-repo-topology.md` §7 step 3); the table uses `core/`, `clients/<slug>/`, `sell/`,
`deliver/`, `operator/`, `desk/` as those names.

| Module | Work lives | Who touches it |
|---|---|---|
| **C1** shared core | operating `core/`; the public subset (conventions, explainers) in the method repo | Jamie |
| **C2** client folder | operating `clients/<slug>/` (record frontmatter: `stage`, `repo`, `tier`, `owner`, `vercel_project`, `salesman`, `collaborators`, tickets file) | Jamie's sessions write; salesman writes prospect fields through the dashboard (write-back, §7 path 5); client reads through the dashboard; collaborator never |
| **C3** desk | operating `desk/` (glance, Friday review, monthly close, estate audit) · Actions sweeps · the dashboard app under `desk/` deployed to Vercel (`kodominio` team) with three roles | Jamie (all), salesman (prospects), client (own slice) |
| **S1** prospecting | operating `sell/prospecting/` (target profile, cadence) + prospect records in `clients/<slug>/` · dashboard salesman role · commission fields in the record | Jamie in sessions; salesman in the dashboard (status, notes, add, "ready for Jamie") |
| **S2** client research | operating `clients/<slug>/research/`; reference repo attached only when an Input names it | Jamie |
| **S3** proposal | operating `clients/<slug>/proposal/` → branded PDF (pdfcn) in CI, Google Doc via the Drive connector in a session, page in the dashboard | Jamie; client reads |
| **S4** quote | operating `clients/<slug>/quote/` incl. the private negotiation record and invoices (structured, not prose) | Jamie; client sees invoices in the dashboard |
| **S5** agreement | operating `clients/<slug>/agreement/`; signature through Google Docs eSignature | Jamie; client signs |
| **D1** onboarding and kickoff | operating folder (access table, kickoff note) + the **new client repo** rendered from the method repo in a two-repo session; kickoff writes `BUILD.md` (brief + ticket list) into the client repo; the record gets `repo:` | Jamie; the empty repo is created in the GitHub UI or by `gh api` if the proxy allows (§10 item 4) |
| **D2** SDLC pipeline | **client repo** only: `BUILD.md`, PRs, `ci.yml` calling the four reusable workflows, preview deploy = UAT, release-please PR = release | Jamie (single-repo session, hooks on) and the developer collaborator (PRs); client reads status and UAT in the dashboard and signs off UAT in the folder via Jamie |
| **D3** handover and support | operating `clients/<slug>/handover/` (pack, support and hosting record, retainer offer, review request); the pack also to Drive | Jamie; client reads; collaborator is offboarded here |
| **D4** estate conformance | Actions `conformance.yml` in the operating repo for the live set · the local lane (`~/Desktop/Apps/projects/` clones with mani and multi-gitter) for bulk work, reached by Remote Control · results in `desk/estate/` · PRs on client repos | Jamie |
| **O1** tool and concept research | operating `operator/research/` (verdicts, catalogue, primers, concept library); `research-recheck.yml` | Jamie |
| **O2** case studies and portfolio | operating `operator/portfolio/`; the public index feeds O3 | Jamie; client approves their case study (by email, outside git) |
| **O3** content | operating `operator/content/`; published to the business site, whose repo (`jamienisbet`, personal today) is an open item (§11) | Jamie |
| **O4** training and coaching | method repo (public): the `workspace` tier template and the workshop kit (Marp) · operating `operator/training/` (coaching record per client, private) · reference repo (Jake's course, read only) | Jamie; attendees read the method repo; a coached client gets their own workspace repo under **their** account |

## 6. Collaborator lifecycle

Rules (why in each line · 2026-10-15):

1. **A collaborator exists because a client record says so.** The record's `collaborators:`
   list carries login, role (developer · practitioner), repos, start, end. Why: the folder is
   the record; an access grant with no line in a folder is drift the estate audit flags.
2. **Invite = per-repo write.** `gh api -X PUT repos/legible-consulting/<slug>/collaborators/<login> -f permission=push`.
   Members (`GPardas`, `mikaelbelmont`) get the same grant; base permission none means
   membership alone shows them nothing. Outside collaborators on private repos cost nothing
   on Free (verified). 2FA is required by the org, so an invite to someone without it fails
   until they enable it. Why: fewest rights that let them open a PR.
3. **They clone one repo.** The client repo. They read, in order: the client repo's
   `CLAUDE.md` (routes to `BUILD.md`, the tier contracts and `CONTRIBUTING.md`), then the
   method repo's conventions (public, no clone needed). Why: the client repo stands alone at
   build time, so everything a build needs is already in it.
4. **They never see:** the operating repo, the reference repo, any other client repo, the
   Vercel dashboard, Actions secrets (not readable through the UI or API), the client's
   folder, floors, contacts, or the salesman's notes. Why: interview answer "never"; the
   folder holds negotiation positions and contact details.
5. **Their work reaches the folder by status, not by write.** Branch → PR → `check-client`
   green → preview URL from `deploy-vercel` in the PR → Jamie reviews and merges (the human
   gate; enforced by the ruleset on public repos, caught by `guard-main` on private ones) →
   the dashboard build reads the repo's latest run, PRs and release by API → Jamie's Friday
   review updates the folder's status line. Why: one direction per fact; a collaborator
   commit never lands in the operating repo.
6. **Tickets flow one way.** Jamie's session re-renders `BUILD.md` from the folder's tickets
   file when tickets change; a developer who wants a ticket changed asks in the PR or by
   message; the folder is edited by Jamie. Why: interview answer; two editable homes drift.
7. **Claude is theirs.** A collaborator who uses Claude Code uses their own plan and their
   own GitHub connection on the client repo; no session from the operating repo is ever
   shared (Max sharing is public). Why: `03-repo-topology.md` §1.
8. **Offboarding at handover**, same day as the handover pack: remove the grant
   (`gh api -X DELETE repos/legible-consulting/<slug>/collaborators/<login>`), close or
   reassign their open PRs, rotate `VERCEL_TOKEN` on that repo and any app secret named in
   the access table, set `end:` in the record, delete the `build-<slug>` team if one existed.
   Why: a grant that outlives the engagement is the most common estate leak.
9. **The client at handover** may receive `pull` on their repo if they ask for the code;
   ownership stays with Jamie (decided). Normally they use the dashboard. Why: decided
   2026-10-15; most clients want the site, not the git.

**Onboarding note** (sent as-is, in English; one page; lives at
`core/onboarding-collaborator.md` and is linked from `.github/CONTRIBUTING.md`):

> **Welcome to the `<client>` build.**
> You have write access to one repository: `github.com/legible-consulting/<slug>`. That repo
> is the whole job: the brief and ticket list are in `BUILD.md`, the conventions in
> `CLAUDE.md` and the files it points to. There is nothing to fetch from anywhere else.
>
> **How work lands.** Make a branch, open a pull request, keep it small. CI runs the
> checks and posts a preview URL on the PR; that preview is what the client will sign off.
> Jamie merges; nobody pushes to `main`. Merging the release PR is the release; you will
> never do that. Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`)
> because the release notes are generated from them.
>
> **Secrets.** Never commit a key, token, password or `.env`. A pre-commit hook and CI both
> run gitleaks; a leak fails the build and is rotated the same day. If you need a value,
> ask; it will be set as a repository secret, not sent to you.
>
> **What you will not have.** Access to Legible Consulting's operating repository, other
> clients' repositories, the Vercel dashboard or the client's contact details. Status
> reaches the client through our dashboard; you do not need to report it anywhere.
>
> **Tickets.** `BUILD.md` is regenerated by Jamie when the ticket list changes. Ask for a
> change in the PR or by message; do not edit `BUILD.md` directly.
>
> **Two-factor authentication** must be on for your GitHub account or the invite will not
> work. **When the build is handed over** your access is removed the same day; that is the
> normal end, not a signal.
>
> Questions: the contact address named in the core's identity record.

## 7. Sync paths

Each path has one direction and one trigger. "Twice" says what happens if the step runs
twice; "out of order" what happens if it runs before its input is ready.

| # | Path | Direction | Trigger | Twice | Out of order · what breaks |
|---|---|---|---|---|---|
| 1 | Client record frontmatter → `desk/mani.yaml` | operating → operating | push to `main` touching `clients/**` (`manifest.yml`) | same output, no diff, no commit | Always a full regeneration from the current tree, so order cannot matter. A hand edit to `mani.yaml` is overwritten on the next run (by design). The workflow must ignore its own commit (`[skip ci]` and a path filter excluding `desk/mani.yaml`) or it loops. |
| 2 | `mani.yaml` → conformance PRs | operating Actions (or the local lane) → client repos | weekly `schedule` or manual dispatch (`conformance.yml`); local: `mani run conformance -t live` | multi-gitter refuses to create a branch that exists: the second run skips repos with an open conformance PR | If it runs before path 1 has regenerated, a new client is missed until next week (harmless). If it runs while a developer's PR touches the same template files, the conformance PR conflicts: close it, merge the developer, rerun. Needs `ESTATE_PAT` (§8) because `GITHUB_TOKEN` cannot write other repos. |
| 3 | Method repo → copier update PRs | method repo tag → every client repo | a release tag on the method repo (release-please) via `repository_dispatch` to the operating repo, or the weekly run of path 2 | `copier update` to the same tag yields no diff; the PR already exists, so skip | Pin to the latest tag, always: copier "updates" to whatever ref it is given, so an older tag would downgrade a repo. A hand-edited `.copier-answers.yml` makes copier error; a committed `.rej` file fails `check-client`. Dormant (archived) repos are excluded by the `tag: live` filter. |
| 4 | Client repo CI → dashboard status | client repo (REST, read) → operating Actions → Vercel | `dashboard.yml` on push to `main` and every 6 h | read-only; safe | Status is "as of build time" and the page says so. No `repository_dispatch` from client repos to the operating repo (it would need a token in every client repo; polling needs one token in one place). |
| 5 | Dashboard write-back → operating repo commits | dashboard (salesman) → `clients/<slug>/` record fields | salesman saves | contents API with the file's `sha`: a second identical write is a no-op; a stale `sha` returns 409 and the dashboard re-reads and retries | Mechanism is the open research item (custom GitHub App on behalf of the user, `02-tool-research.md`). Rule reserved now: the commit carries the salesman's name; a session commit that lands first wins and the dashboard shows the folder's value. Until the item is closed, salesmen write nothing and the dashboard is read-only for them. |
| 6 | Projects threads → client repos | Claude Project on the operating repo → a thread self-adds `legible-consulting/<slug>` (same owner) | Jamie, per thread | n/a | A two-repo thread has no hooks or permissions: such threads read and plan; a build runs in a single-repo session on the client repo. |
| 7 | Local lane → operating repo | `~/Desktop/Apps/projects/` clones (mani, multi-gitter, gitleaks) → `desk/estate/<job>-<date>.md` commits or PRs | Remote Control from the phone, or a Desktop scheduled task | the output file is named by date and overwritten; one commit per day at most | A local job that runs before the clones are fetched reports stale drift: every local job starts with `mani sync`. The machine is a runner, never a home: nothing reads the clones except the job. |
| 8 | D1 kickoff: folder → new client repo (render) and repo → folder (pointer) | both, once | the kickoff session (operating + empty client repo) | copier would re-render over an existing tree: the step runs only when the record has no `repo:`; setting `repo:` is the done marker | If the repo is created but the record not updated, the next kickoff attempt renders again; the marker is set in the same commit as the first push. |
| 9 | Tickets: folder tickets file → client repo `BUILD.md` | operating → client repo | Jamie's session, when tickets change | same content, no diff | Never the other way; a developer's edit to `BUILD.md` is reverted by the next render and the PR comment says so. |

## 8. Secrets and keys

Correction to `03-repo-topology.md` §1 and `04-github-organisation.md` §2 (2026-10-15): a
**network secret** on the Claude cloud environment injects a static key into requests to
listed hosts after they leave the VM. It does **not** fit
the Google service account, whose JSON key must sign a JWT inside the process to obtain an
access token. So: sessions reach Google through the Claude Google connectors (already
decided in `02-tool-research.md`); unattended Actions jobs use the service-account key as a
repository secret; no Google key goes on the cloud environment.

| Secret | Lives | Used by | Rotated by | Leak caught by |
|---|---|---|---|---|
| `VERCEL_TOKEN` (one per team scope, 1-year expiry; `vercel tokens add`) | repo secret on the operating repo and on every private client repo; never org-level (Free) | `dashboard.yml`, `deploy-vercel.yml` | Jamie, yearly and at every offboarding | gitleaks (Vercel token rule) in pre-commit and CI; `vercel tokens list` at the quarterly audit |
| `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` | repository **variables** (`gh variable set`), copied by the template | `deploy-vercel.yml` | n/a (identifiers) | n/a |
| `DASHBOARD_PAT` (fine-grained, owner `legible-consulting`, all repos; Actions, Contents, Deployments, Metadata, Pull requests: read; 366 days) | operating repo secret | `dashboard.yml` | Jamie, yearly (GitHub's max lifetime forces it) | gitleaks (`github_pat_` rule); GitHub emails on expiry |
| `ESTATE_PAT` (fine-grained, all repos; Contents, Pull requests, Workflows: write; 366 days) | operating repo secret | `conformance.yml` | Jamie, yearly | same; separate from `DASHBOARD_PAT` so the read-only job never holds write |
| `GOOGLE_SA_KEY` (service account with domain-wide delegation) | operating repo secret; the key file on this machine outside any repo | unattended Drive and Calendar jobs in Actions (GAM7 or the API) | Jamie, yearly; Google Cloud console shows key age | gitleaks (private-key rule); Google's leaked-key detector disables the key |
| Google OAuth client | this machine only (local lane) | interactive gog or shot-scraper runs | Jamie | never in git; `.gitignore` plus gitleaks |
| `HEALTHCHECKS_URL` | operating repo secret | sweeps | Jamie | low value; rotate on suspicion |
| Client app secrets (database URL, API keys) | the client repo's secrets; **names only** in the folder's access table | `deploy-vercel.yml` via `vercel pull` (Vercel env) and `check-client` | Jamie at offboarding and at handover (the client then holds their own) | gitleaks in the client repo's pre-commit and CI; push protection on public repos |
| Cloud environment plain variables | none that are secret | — | — | the docs say anyone using the environment can read them |

Never in git, anywhere: credentials and identity documents (boundary). The local
`block-local-checks.sh` hook and each repo's committed `.claude/settings.json` are not
secrets. If a plaintext secret is found during the gitleaks pass it is **rotated first,
then purged** (runbook phase 2): a rewrite does not un-leak a public repo's history.

## 9. Costs and limits

**Actions minutes (private repos count; public repos are free on standard runners).** Free
org: 2,000 minutes a month, 500 MB artifacts, overage $0.006 per Linux minute, billed to the
repo owner (verified 2026-10-15).

| Job (private) | Minutes each | Runs a month | Minutes |
|---|---|---|---|
| operating `check.yml` | 3 | ~130 (6 pushes a day) | 390 |
| operating `dashboard.yml` | 3 | ~130 pushes + 120 scheduled | 750 |
| `sweep-deadlines.yml` | 1 | 30 | 30 |
| `conformance.yml` (3 live repos) | 2 per repo | 4 | 24 |
| `research-recheck.yml` | 2 | 4 | 8 |
| `manifest.yml` | 1 | ~40 | 40 |
| **operating repo total** | | | **~1,240** |
| one private app build (`check-client` + `deploy-vercel`) | 5 | 10 pushes a day × 22 | 1,100 |

One busy private app build pushes the org over quota. Mitigations, in order: `concurrency:
cancel-in-progress` on every workflow; the dashboard build on a 6-hour schedule only, not on
push, when a private build is live; a spending limit of **$10** (≈1,650 extra minutes) set
in org billing so a runaway job stops rather than bills. If the dashboard alone is the
problem, its build can move to the Vercel Git integration (Jamie is a team member, so the
author check passes) at the cost of the PAT moving into Vercel env.

**Vercel.** Pro is a $20 platform fee a month with one deploying seat (Jamie) and $20 usage
credit; extra seats $20 each; viewer seats free (vercel.com/docs/plans/pro-plan, read
2026-10-15). Collaborators need no seat because private repos deploy from Actions; if one
ever needs the dashboard itself, Jamie adds a seat case by case (interview). The agency pays
for `kodominio`; whether `remi21` and `sustentus` are client-paid is an open item (§11).

**GitHub Team** ($4 per user a month; 3 members = $12) is justified when **any** of these
holds, and not before (why: Free covers every rule the modules need except enforced gates on
private repos · 2026-10-15):

- a private client repo has an outside collaborator with write **and** the build carries
  money or compliance, so a ruleset with no bypass actor must stand between them and `main`
  (on Team each such collaborator also costs a seat);
- Actions overage exceeds about $8 a month for two consecutive months (Team's 3,000
  minutes then cost the same);
- a second practitioner needs org-level rulesets to run client repos without Jamie
  reviewing every merge.

Secret Protection ($19 per active committer) is not purchasable on Free and not justified
on Team either while gitleaks runs in every repo.

## 10. Verify-once list

Each check is a command or click with its expected result. Items 1 and 2 were closed
today; the rest close during the runbook.

| # | Check | Expected | Status |
|---|---|---|---|
| 1 | `gh api repos/legible-consulting/icm-workshop/rulesets` | HTTP 403 "Upgrade to GitHub Pro or make this repository public to enable this feature" | **verified 2026-10-15** |
| 2 | `gh api repos/legible-consulting/icm-workshop/actions/permissions/access` | `{"access_level":"none"}`: the Access setting exists on a Free private repo (not needed now that `workflows` is public) | **verified 2026-10-15** |
| 3 | On the first private client repo, a collaborator's PR runs `deploy-vercel.yml` | a preview URL in the PR, no "commit author is not a member" comment from the Vercel bot | pending (first private build) |
| 4 | From a cloud session attached to the operating repo: `gh api -X POST orgs/legible-consulting/repos -f name=zz-proxy-test -F private=true` | either 201 (then delete the repo) or 403 "not enabled for this session" (then kickoff creates repos in the UI) | pending |
| 5 | After enabling: `gh api orgs/legible-consulting --jq .two_factor_requirement_enabled` | `true`; `members?filter=2fa_disabled` empty | runbook 1.3 |
| 6 | After PATCH: `gh api orgs/legible-consulting --jq .default_repository_permission` | `"none"` | runbook 1.4 |
| 7 | After PATCH: `--jq .members_can_create_repositories` | `false` | runbook 1.5 |
| 8 | Org Settings → Personal access tokens | both the fine-grained and the classic policy pages exist on Free | runbook 1.9 |
| 9 | After the first transfer: org Settings → GitHub Apps → Claude → Repository access; then attach `legible-consulting/<r>` in a cloud session | "All repositories"; the session clones it | runbook 3.2 |
| 10 | After rendering `ci.yml` on berceo (public): `gh run list --repo legible-consulting/berceo -L 1` | the run calling `workflows/.github/workflows/check-client.yml@v1` is green | Wave 1 |
| 11 | Same on the first private client repo | green (public reusable workflow called from a private repo) | first private build |
| 12 | After transferring courseday: `gh api repos/legible-consulting/courseday/actions/secrets --jq .total_count` | `5` (secrets survive transfer) | runbook 3.2 |
| 13 | After reconnect: `vercel api '/v9/projects/berceo?teamId=team_PCq0jpC3GS1jsyS8OFuHPLqm' \| jq .link` | `org: legible-consulting, repo: berceo` | runbook 4.1 |
| 14 | After archiving a dormant repo with a Vercel project (firedough): `curl -s -o /dev/null -w '%{http_code}' https://firedough.vercel.app` | `200`; archiving and disconnecting do not take a deployment down | runbook 4.3 |
| 15 | berceo → Settings → Code security | secret scanning and push protection enabled (public default) | runbook 5.6 |
| 16 | Month 3: `gh run list --repo legible-consulting/house --workflow conformance.yml -L 1` | a run in the last 8 days (scheduled workflows in private repos are not auto-disabled; only public ones are, after 60 idle days) | 2027-01-14 |
| 17 | Remote Control from the phone reaches a local `mani run` and its commit appears in `desk/estate/` | one commit, dated | Wave 1 |

## 11. Open items

- Jamie confirms the live split (client: berceo, vinecliff, remi-ai; personal: agorasim,
  jamienisbet, english-with-jamie) and transfers the client ones by hand.
- `remi-ai`: no Vercel project in any of the three teams links to it; where `remiai.be` is
  served is unknown. Nothing to reconnect until that is known.
- `tech-stack-audit-marketing-site`: empty; delete or repurpose.
- `GPardas` has no 2FA; the 2FA requirement waits for them (or for Jamie to accept their
  removal and re-invite).
- The Vercel team slug `kodominio` could become `legible-consulting`; changing it changes
  every `<project>-kodominio.vercel.app` default URL (custom domains unaffected). Not in the
  runbook; Jamie's call.
- Whether `remi21` and `sustentus` Pro fees are client-paid.
- Home of the business site for O3 output (`jamienisbet` is personal today).
- Salesman write-back identity: research item stands (`02-tool-research.md`).
- The operating repo's folder names are fixed by the Wave 1 scaffold; §5 uses placeholders.

## Sources

- Read against the real org and account 2026-10-15: `gh api orgs/legible-consulting`,
  `members`, `rulesets`, `actions/permissions/access`, `repos/k0d0minio/*` (secrets, hooks,
  pages); `vercel teams ls`, `vercel api /v9/projects`, `vercel git --help`,
  `vercel tokens --help`; `gitleaks git --help`.
- https://docs.github.com/en/get-started/learning-about-github/githubs-plans · https://github.com/pricing
- https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-actions/about-billing-for-github-actions
- https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-two-factor-authentication-for-your-organization/requiring-two-factor-authentication-in-your-organization
- https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/setting-base-permissions-for-an-organization
- https://docs.github.com/en/organizations/managing-organization-settings/restricting-repository-creation-in-your-organization · …/restricting-repository-visibility-changes-in-your-organization · …/setting-permissions-for-deleting-or-transferring-repositories · …/managing-the-forking-policy-for-your-organization
- https://docs.github.com/en/organizations/managing-organization-settings/disabling-or-limiting-github-actions-for-your-organization
- https://docs.github.com/en/organizations/managing-programmatic-access-to-your-organization/setting-a-personal-access-token-policy-for-your-organization
- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets · …/creating-rulesets-for-a-repository
- https://github.blog/changelog/2022-12-14-github-actions-sharing-actions-and-reusable-workflows-from-private-repositories-is-now-ga/
- https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions
- https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/customizing-your-organizations-profile · https://docs.github.com/en/actions/sharing-automations/creating-workflow-templates-for-your-organization
- https://docs.github.com/en/rest/repos/repos#transfer-a-repository · https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository · https://docs.github.com/en/repositories/archiving-a-github-repository/archiving-repositories
- https://docs.github.com/en/organizations/managing-organization-settings/renaming-an-organization
- https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-outside-collaborators/adding-outside-collaborators-to-repositories-in-your-organization
- https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/about-custom-repository-roles
- https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security · https://github.blog/changelog/2025-03-04-introducing-github-secret-protection-and-github-code-security/
- https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows
- https://vercel.com/docs/plans/pro-plan · https://vercel.com/docs/deployments/troubleshoot-project-collaboration · https://vercel.com/guides/how-can-i-use-github-actions-with-vercel · https://vercel.com/docs/cli/git · https://vercel.com/docs/project-configuration/git-configuration · https://vercel.com/docs/rest-api/authentication/create-an-auth-token
- https://code.claude.com/docs/en/github-actions · https://code.claude.com/docs/en/cloud-environments · https://code.claude.com/docs/en/remote-control · https://code.claude.com/docs/en/claude-code-on-the-web
