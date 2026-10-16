---
title: "GitHub organisation — one home for client work, collaborators and ICM material"
kind: research
status: draft
owner: jamie
date: 2026-10-15
source: interview (4 questions, 2026-10-15) · docs.github.com, vercel.com, code.claude.com read 2026-10-15
inputs: 03-repo-topology.md (repo set, session rules) · 01-goals.md (boundaries, D4) · 02-tool-research.md (gh, mani, multi-gitter, gitleaks)
recheck: 2027-01-14
---

# GitHub organisation — one home for client work, collaborators and ICM material

**Verdict: the org is `legible-consulting` (renamed from `ai-consultancy-workshop` on 2026-10-15); move every client repo and
all ICM material into it, keep the personal account for personal projects, stay on GitHub
Free, and give collaborators per-repo access as outside collaborators.** The one real cost
of Free is that private repos get no branch protection, so the "never merge or release"
gate on private repos is a rule in `CLAUDE.md` plus a CI check that fails loudly, not a
GitHub setting. Vercel Pro (already paid) covers org repos; deploy private client repos
from Actions so a collaborator's commit is never blocked by Vercel's author check.

## 1. Facts that shape the org (verified 2026-10-15)

| Fact | Source | Consequence |
|---|---|---|
| Renaming an org keeps web links and git remotes to its **repositories** working; the org profile URL and API calls on the old name return 404; the old name becomes claimable. | docs.github.com, renaming an organization | Rename once, before any transfer. Update remotes anyway. Re-register the old name as an empty org if anything public links to it (the course). |
| Transferring a repo from a personal account to an org keeps issues, PRs, stars, watchers, webhooks, secrets and deploy keys; git redirects from the old URL; GitHub Pages is **not** redirected. Needs admin on the repo and create rights in the org. | docs.github.com, transferring a repository | Transfers are safe and instant. Pages sites (if any) need a new deploy. |
| GitHub Free for organizations: unlimited private repos and collaborators, 2,000 Actions minutes/month on private repos, Actions free on public repos, 500 MB artifacts. **Team** adds, on private repos: protected branches, required and code-owner reviewers, wikis, Pages, insights; 3,000 minutes; per-user billing. | docs.github.com, GitHub's plans; about billing for Actions | Jamie's choice: Free. Private repos cannot require a PR or block a force-push. Public repos can. |
| Branch restrictions "can be enabled in public repositories owned by a GitHub Free organization and in all repositories owned by an organization using GitHub Team or Enterprise Cloud." | docs.github.com, about protected branches | Same for rulesets in practice (expected; confirm once in a private repo's Settings → Rules). |
| **Organization-level Actions secrets are not readable by private repositories on GitHub Free.** | docs.github.com, using secrets | Secrets go per repo (`gh secret set --repo`), scripted from the manifest; org secrets only for public repos. |
| Actions and reusable workflows in a private repo can be shared with other repos in the same org via Settings → Actions → General → Access. No plan limit stated. | docs.github.com, Actions settings; changelog 2022-12-14 | One private `workflows` repo (or the existing `.github` repo) holds the shared conformance and release workflows every client repo calls. Confirm the Access setting appears on Free. |
| The Claude GitHub App is installed per account or org; "all repositories" covers repos created later. A Project's threads can self-add a repo only from an owner the Project already uses. | code.claude.com, web quickstart; projects | One owner for everything live means one App install and Projects that can reach any client repo. |
| Cloud sessions' GitHub calls run as **Jamie's** identity through the proxy. Branch rules that Jamie can bypass don't block a session's push. | code.claude.com, routines; cloud environments | GitHub cannot tell Claude from Jamie. Gates are human by rule; a ruleset without a bypass actor is the only hard stop, and only on public repos while on Free. |
| Vercel Hobby cannot connect repos owned by a GitHub org; **Pro** can. After a repo transfer the project shows a Git connection error until disconnected and reconnected. | community.vercel.com (several threads) | Jamie is on Pro. Each moved project needs `vercel git disconnect` then `vercel git connect` (scriptable). |
| On a Pro team with a **private** repo, the Git integration deploys only when the commit author is a Vercel team member and the git email matches their verified email; otherwise the Vercel bot comments and nothing deploys. | vercel.com/kb, commits not triggering deployments | A collaborator's push to a private client repo deploys nothing unless they hold a Vercel seat. Avoid: deploy from Actions with `vercel pull` / `vercel build` / `vercel deploy --prebuilt` and `"git": {"deploymentEnabled": false}` in `vercel.json`. Token-based deploys carry no author check (expected; verify on the first private repo). |
| Remote Control runs a local session that phone or browser can steer; it reconnects after sleep; needs the `claude` process alive; one remote session per process unless `claude remote-control --spawn worktree`. Desktop scheduled tasks run locally, minimum 1 minute, only while the app is open and the machine awake; one catch-up run after a missed window. | code.claude.com, remote control; desktop scheduled tasks | The local-only lane is reachable from the phone when the machine is on. It is a runner, never a home for facts. |

## 2. Org design

**Name.** `legible-consulting`, Legible Consulting. Renamed 2026-10-15; the old name is claimable again, so re-register it as an empty org if course links must keep resolving.

**Owners.** Jamie plus one recovery account (GitHub recommends no fewer than two). 2FA required for all members.

**Base permission: none.** A member or collaborator sees only repos they are granted. Repository creation, visibility changes and deletion: owners only. Forking of private repos: off.

**Collaborators.** Jamie's answer: general collaborators, per repo. Rule (why: fewest moving parts, no seat cost, no org visibility · 2026-10-15):
- one repo → **outside collaborator** on that repo, write permission, removed at handover or end of engagement;
- more than one repo at once → a **team** named for the engagement, repos added to the team;
- never on the operating repo, never on the reference repo. The operating repo stays Jamie-only; the dashboard is the client's and salesman's window.

**Repos in the org after the move**

| Repo | Visibility | Why |
|---|---|---|
| `legible-consulting/house` operating | private | Client folders, floors, contacts. No branch protection on Free: gate by rule and CI. |
| `legible-consulting/client-starter-kit` → method | public | Attendees and copier read it; rulesets available for free. |
| `legible-consulting/learn-with-jake-van-clief` reference | private | Third-party course. |
| `legible-consulting/.github` (exists) | public | Org profile README, default community files, workflow templates. |
| `legible-consulting/workflows` (new, or reuse `.github`) | private | Reusable conformance, check and release workflows; Access = org. |
| `legible-consulting/<client-slug>` × live builds | as today (22 public, 10 private on `k0d0minio`) | Public ones keep free Actions and real rulesets. Default new client sites to public unless the client asks; apps and platforms private. |
| `legible-consulting/<client-slug>` × dormant | archived in the org | Jamie's call 2026-10-15: all client work leaves the personal account. Archive after gitleaks passes. |
| `legible-consulting/icm-board` | private, archived after the first real deal | Mined, then retired. |

**Gates on Free, per repo kind** (why: protected branches are public-only on Free · 2026-10-15)

| Repo kind | Hard stop available | What stands in for it |
|---|---|---|
| public client repo, method repo | ruleset on `main`: require PR, block force-push and deletion, require the check workflow; **no bypass actors** | nothing needed |
| private client repo, operating repo | none | `CLAUDE.md` boundary ("never merge or release"); release-please makes the release a PR merge; the check workflow fails on any direct push to `main` by anyone (Actions `push` on `main` from a non-PR commit) |

If a private client repo ever carries real money or compliance, that is the moment to pay for Team, not before.

**Secrets.** Per repo, set from the manifest by script (`gh secret set VERCEL_TOKEN --repo legible-consulting/<r>`), because org secrets don't reach private repos on Free. Cloud sessions never see them: Vercel and Google keys live as **network secrets** on the `legible` cloud environment, and gitleaks runs in pre-commit and in the shared check workflow.

**Actions policy.** Default workflow permissions read-only; "Allow GitHub Actions to create and approve pull requests" on (release-please, copier-update PRs); allowed actions: GitHub-authored, verified creators and the org's own. Fine-grained PATs allowed; one PAT scoped to the org, read-only on Actions and contents, used by the operating repo's dashboard build to read every client repo's status.

**Claude.** Install the Claude GitHub App on the org with all repositories. One cloud environment `legible`: setup script under five minutes, no network secrets. One Project on the operating repo once the rollout reaches the account. Collaborators who use Claude use their own plan and their own GitHub connection; never share a session from the operating repo (Max sharing is public).

## 3. Vercel (Pro, already paid)

- After each transfer: `vercel git disconnect` then `vercel git connect` in the project, or disconnect and reconnect in Settings → Git. Script it over the manifest.
- **Private client repos deploy from Actions**, not from the Git integration: `vercel pull --yes --environment=preview|production`, `vercel build`, `vercel deploy --prebuilt`, with `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` as repo secrets and `"git": {"deploymentEnabled": false}` in `vercel.json`. Why: a collaborator's commit is otherwise blocked by Vercel's team-membership check, and the build then runs where the checks run (CI is truth). Public client repos may keep the Git integration.
- The UAT environment D2 promises the client is a preview deployment from the Actions workflow; the release is the production deploy from the release-please merge.

## 4. The local-only lane (Jamie's exceptions, 2026-10-15)

Allowed to stay on this machine: the ~30 client clones under `projects/` with bulk estate operations (mani, multi-gitter, copier update by hand), and anything needing a browser login (Google OAuth client, Vercel login). Everything else is cloud-reachable.

Rules (why: a local runner is cheap, a local home for facts is a lie the desk will tell · 2026-10-15):
- A local job **writes its result into the operating repo** (commit) or opens PRs; cloud sessions and the dashboard read the result, never the machine.
- Reach it from the phone with Remote Control: `/rc` in the Desktop Code tab, or `claude remote-control --spawn worktree` for several sessions from one process. Keep the app open and "Keep computer awake" on.
- Schedule local estate ops as **Desktop scheduled tasks** only when they need the clones; everything else schedules in Actions.
- Unattended Google access from Actions stays on the service account already adopted; the OAuth client is for interactive local work only.

## 5. Migration, in order (one afternoon; transfers are instant)

1. Inventory: `gh repo list k0d0minio --json name,visibility,isArchived,pushedAt,url --limit 100 > meta/estate-2026-10-15.json`; mark each repo client / personal / reference. Personal ones stay.
2. Rename done (2026-10-15). Optionally create an empty org named `ai-consultancy-workshop` so course links don't go to a stranger; update local remotes to `legible-consulting`.
3. Org settings: two owners, 2FA, base permission none, creation owners-only, Actions policy, PAT policy, install the Claude GitHub App on all repos.
4. Secrets scan each client repo (`gitleaks git --redact`); fix history with `git-filter-repo` where needed, before it changes owner.
5. Transfer: `gh api -X POST repos/k0d0minio/<r>/transfer -f new_owner=legible-consulting` per client repo; `gh repo archive legible-consulting/<r>` for dormant ones. Update local remotes (`mani exec -a 'git remote set-url origin …'`).
6. Vercel: disconnect and reconnect each moved project; switch private repos to Actions deploys.
7. Shared workflows repo; per-repo secrets from the manifest; rulesets on public repos.
8. Merge `jake-van-clief/` into the reference repo and delete it from the operating repo.

## 6. Costs

| Item | Monthly | Status |
|---|---|---|
| GitHub Free for organizations | 0 | chosen |
| GitHub Team (if a private repo ever needs enforced gates) | per user, price not verified here (see github.com/pricing) | declined for now |
| Vercel Pro | per member, already paid | in place; collaborators need no seat if private repos deploy from Actions |
| Claude Max | already paid | collaborators bring their own |

## 7. To verify once, on the real org

- Rulesets tab on a **private** repo in a Free org: expected unavailable.
- Settings → Actions → General → Access on a private repo: expected present on Free.
- Actions-driven `vercel deploy --prebuilt` from a collaborator's commit on a private repo: expected to deploy without an author check.
- `gh api POST /orgs/legible-consulting/repos` from a cloud session (org endpoint through the GitHub proxy): unknown; fallback is the GitHub UI.

## Sources

- https://docs.github.com/en/organizations/managing-organization-settings/renaming-an-organization
- https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository
- https://docs.github.com/en/get-started/learning-about-github/githubs-plans
- https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-actions/about-billing-for-github-actions
- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
- https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions
- https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository
- https://github.blog/changelog/2022-12-14-github-actions-sharing-actions-and-reusable-workflows-from-private-repositories-is-now-ga/
- https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization
- https://vercel.com/kb/guide/commits-not-triggering-deployments · https://vercel.com/guides/how-can-i-use-github-actions-with-vercel · https://community.vercel.com/t/why-cant-hobby-accounts-deploy-from-organizations/10015 · https://dev.classmethod.jp/articles/vercel-connected-git-repo-move-from-user-to-org/
- https://code.claude.com/docs/en/remote-control · https://code.claude.com/docs/en/desktop-scheduled-tasks · https://code.claude.com/docs/en/claude-projects
