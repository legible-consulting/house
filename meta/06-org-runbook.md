---
title: "Org runbook — the move to legible-consulting in one sitting"
kind: runbook
status: draft
owner: jamie
date: 2026-10-15
source: 06-org-design.md · gh 2.101.0, Vercel CLI 61.0.0, gitleaks 8.30.1, git-filter-repo 2.47.0, jq, brew, uv on this machine (read 2026-10-15)
inputs: 06-org-design.md (§3 skeleton, §4 repos, §8 secrets, §10 checks) · 04-github-organisation.md §5 (original order) · estate-k0d0minio-2026-10-15.json (marks)
recheck: 2027-01-14
---

# Org runbook — the move to legible-consulting in one sitting

One step, one command or click, one check. The boxes are Jamie's: a step is done when its
check prints the expected value and the box is ticked by hand. No step drives another; no
script runs the migration end to end (house rule). Run everything **locally** from this
machine (Desktop Code tab, Local, or a terminal): the cloud proxy reaches one repo and
blocks GraphQL. Clones live at `~/Desktop/Apps/projects/<repo>`.

Legend: **⚠** irreversible or hard to reverse, with a rollback line · **today** the step can
run now · **blocked** what it waits for.

**Order and why it differs from `04-github-organisation.md` §5** (2026-10-15):

- Rename is done. Inventory is done (`meta/estate-*.json`). Both stay as phase 0 checks.
- Requiring 2FA moves to the **end of phase 1**, after both members confirm 2FA: enforcing it
  removes every member without 2FA (today: `GPardas`), and their repo grants with them.
- The Claude GitHub App install moves **before** the transfers so the first transfer
  verifies that "all repositories" covers repos transferred in (design §10 item 9).
- Vercel: every project whose repo moved is reconnected to the org repo: berceo, vinecliff,
  courseday, firedough in `kodominio`; the six remi-ai projects in `remi21`. Sustentus's
  projects link to `sustentus/sustentus`, which did not move.
- Rulesets: public repos only; the private-repo 403 was verified today.
- Transfers of the three live client repos are **Jamie's hand** (interview): the step gives
  the command once; there is no loop.
- The reference-repo merge stays last as the brief asks, but nothing depends on it; it can
  run today.

## Phase 0 — Preflight (today)

- [ ] **0.1** Grant the local `gh` token the org-admin scope (a local token change, not an
  org change):
  ```bash
  gh auth refresh -h github.com -s admin:org,delete_repo
  ```
  Check: `gh auth status` lists `admin:org` and `delete_repo` under Token scopes.

- [ ] **0.2** Baseline the org settings before touching them:
  ```bash
  gh api orgs/legible-consulting --jq '{plan:.plan.name,two_factor_requirement_enabled,default_repository_permission,members_can_create_repositories,members_can_fork_private_repositories}'
  ```
  Check: `free · false · read · true · false` (the values read 2026-10-15).

- [ ] **0.3** Vercel identity and the agency team:
  ```bash
  vercel whoami && vercel teams ls
  ```
  Check: `jamienisbet0405`; `kodominio` listed as `pro`.

- [ ] **0.4** Install the estate tools the local lane needs (not needed for the move itself;
  needed for phase 3.6 shortcuts and for D4 later):
  ```bash
  bash ~/Desktop/legible-consulting/house/core/setup/local.sh
  ```
  Check: every line ends `ok <tool>`, none `MISSING` (tool list: `core/stack.md`).

- [ ] **0.5** Fetch every clone so gitleaks scans current history (read-only):
  ```bash
  for d in ~/Desktop/Apps/projects/*/; do git -C "$d" fetch --all --prune -q && echo "ok $(basename "$d")"; done
  ```
  Check: 34 `ok` lines, no `fatal`.

- [ ] **0.7** Read the marks once more and confirm the live split in your head: client
  (move by hand) = berceo, vinecliff, remi-ai; personal (stay) = agorasim, jamienisbet,
  english-with-jamie. If a mark is wrong, edit the JSON now:
  ```bash
  jq -r '.[] | "\(.mark)\t\(.name)\t\(.move)"' meta/estate-k0d0minio-2026-10-15.json | sort
  ```
  Check: 6 live, 21 client-dormant, 6 personal, 1 reference.

## Phase 1 — Org settings

- [ ] **1.1** (today) Who lacks 2FA:
  ```bash
  gh api 'orgs/legible-consulting/members?filter=2fa_disabled' --jq '.[].login'
  ```
  Check: prints `GPardas` (read 2026-10-15). Message them to enable 2FA; step 1.3 waits.

- [ ] **1.2** (today) Promote `mikaelbelmont` to owner (has 2FA today). ⚠ An owner can
  delete repos and change billing. Rollback: same command with `-f role=member`.
  ```bash
  gh api -X PUT orgs/legible-consulting/memberships/mikaelbelmont -f role=admin --jq .role
  ```
  Check: prints `admin`; `gh api 'orgs/legible-consulting/members?role=admin' --jq '.[].login'` lists both owners.

- [ ] **1.3** (blocked on 1.1 empty) Require 2FA. Click: github.com/organizations/legible-consulting/settings/security → **Require two-factor authentication for everyone** → Save. ⚠ Members and outside collaborators without 2FA are removed at once. Rollback: untick; the removed must be re-invited.
  ```bash
  gh api orgs/legible-consulting --jq .two_factor_requirement_enabled
  ```
  Check: `true`; step 1.1's command prints nothing.

- [ ] **1.4** (today) Base permission none:
  ```bash
  gh api -X PATCH orgs/legible-consulting -f default_repository_permission=none --jq .default_repository_permission
  ```
  Check: `none`.

- [ ] **1.5** (today) Repository creation owners only:
  ```bash
  gh api -X PATCH orgs/legible-consulting -F members_can_create_repositories=false -F members_can_create_public_repositories=false -F members_can_create_private_repositories=false --jq '[.members_can_create_repositories,.members_can_create_public_repositories,.members_can_create_private_repositories]'
  ```
  Check: `[false,false,false]`.

- [ ] **1.6** (today) Visibility change, deletion and transfer owners only. Click:
  Settings → **Member privileges** → untick *Allow members to change repository
  visibilities for this organization* and *Allow members to delete or transfer repositories
  for this organization* → Save. Leave *Allow forking of private repositories* unticked.
  Check: reload the page; both boxes unticked; `gh api orgs/legible-consulting --jq .members_can_fork_private_repositories` prints `false`.

- [ ] **1.7** (today) Actions policy: GitHub-authored, verified creators, the org's own:
  ```bash
  gh api -X PUT orgs/legible-consulting/actions/permissions -f enabled_repositories=all -f allowed_actions=selected && gh api -X PUT orgs/legible-consulting/actions/permissions/selected-actions -F github_owned_allowed=true -F verified_allowed=true -f 'patterns_allowed[]=legible-consulting/*'
  ```
  Check: `gh api orgs/legible-consulting/actions/permissions/selected-actions` shows `github_owned_allowed: true`, `verified_allowed: true`, pattern `legible-consulting/*`.

- [ ] **1.8** (today) Default `GITHUB_TOKEN` read-only; Actions may open and approve PRs:
  ```bash
  gh api -X PUT orgs/legible-consulting/actions/permissions/workflow -f default_workflow_permissions=read -F can_approve_pull_request_reviews=true && gh api orgs/legible-consulting/actions/permissions/workflow
  ```
  Check: `{"default_workflow_permissions":"read","can_approve_pull_request_reviews":true}`.

- [ ] **1.9** (today) PAT policy. Click: Settings → **Personal access tokens** →
  *Fine-grained tokens*: **Allow access via fine-grained personal access tokens**, approval
  **not** required → *Tokens (classic)*: **Restrict access via personal access tokens
  (classic)** → Save each.
  Check: both pages show the chosen state (closes design §10 item 8: the pages exist on Free). `gh` keeps working (`gh api user --jq .login` prints `k0d0minio`) because it is an OAuth app, not a PAT.

- [ ] **1.10** (today) Install the Claude GitHub App on the org, all repositories. Click:
  claude.ai/code → Settings → GitHub → **Install** → choose `legible-consulting` → **All
  repositories** → Install.
  Check: `gh api orgs/legible-consulting/installations --jq '.installations[] | "\(.app_slug) \(.repository_selection)"'` includes a line ending in `all`.

- [ ] **1.11** (today) Org front page. In a clone of `legible-consulting/.github`, replace
  `profile/README.md` with: the name Legible Consulting, one line of what the agency does,
  a link to `client-starter-kit` (the method) and to the business site; add `SECURITY.md`
  (how to report a leak) and `CONTRIBUTING.md` (one line pointing to the collaborator
  onboarding note). Open a PR and merge it.
  Check: github.com/legible-consulting shows the new README.

- [ ] **1.12** (today, Jamie's call) Delete the empty `tech-stack-audit-marketing-site`.
  ⚠ Deletion; an org owner can restore it for 90 days from Settings → Deleted repositories.
  ```bash
  gh repo delete legible-consulting/tech-stack-audit-marketing-site --yes
  ```
  Check: `gh repo view legible-consulting/tech-stack-audit-marketing-site` prints "Could not resolve".

- [ ] **1.13** (today) Create the public `workflows` repo (content lands in Wave 1):
  ```bash
  gh repo create legible-consulting/workflows --public --add-readme --description "Reusable GitHub Actions workflows every Legible Consulting client repo calls"
  ```
  Check: `gh repo view legible-consulting/workflows --json visibility --jq .visibility` prints `PUBLIC`.

## Phase 2 — gitleaks per repo (today)

Scope: the 25 repos leaving `k0d0minio` (21 client-dormant, `icm-board`, and the three live
client repos). Personal repos are out of scope. Reports go to the scratch folder, never into
a repo; only the verdict is recorded in the inventory.

- [ ] **2.0** Scratch folder:
  ```bash
  mkdir -p ~/Desktop/Apps/_system/gitleaks-2026-10-15
  ```
  Check: `ls -d ~/Desktop/Apps/_system/gitleaks-2026-10-15`.

- [ ] **2.1** One repo at a time (repeat the step per repo; tick when all 25 are done):
  ```bash
  R=berceo; gitleaks git ~/Desktop/Apps/projects/$R --log-opts=--all --redact --report-path ~/Desktop/Apps/_system/gitleaks-2026-10-15/$R.json; echo "exit=$?"
  ```
  Check: `exit=0` ("no leaks found"). Record it:
  ```bash
  jq --arg r "$R" '(.[] | select(.name==$r)).gitleaks = "clean 2026-10-15"' meta/estate-k0d0minio-2026-10-15.json > /tmp/e.json && mv /tmp/e.json meta/estate-k0d0minio-2026-10-15.json
  ```
  Check: `jq -r '.[] | select(.gitleaks) | .name' meta/estate-k0d0minio-2026-10-15.json | wc -l` grows by one.

- [ ] **2.2** If `exit=1` for a repo, in this order:
  1. **Rotate the credential at its provider first** (why: a history rewrite does not
     un-leak a public repo; the value is already out).
  2. Record it in the inventory as `gitleaks: "leak rotated 2026-10-15"` (same jq as 2.1).
  3. Purge the value from history in a **fresh mirror**, keeping the original mirror as
     rollback. ⚠ History rewrite: every clone of the repo diverges. Rollback: push the
     untouched `$R-before.git` mirror back with `--mirror`.
     ```bash
     R=<repo>; cd ~/Desktop/Apps/_system/gitleaks-2026-10-15 && git clone --mirror https://github.com/k0d0minio/$R.git $R-before.git && cp -r $R-before.git $R-clean.git && printf '%s==>REDACTED\n' '<the leaked value>' > $R.replacements && git -C $R-clean.git filter-repo --replace-text $R.replacements
     ```
     Check: `gitleaks git $R-clean.git --log-opts=--all` exits 0.
  4. Push the rewrite. ⚠ Force push.
     ```bash
     git -C ~/Desktop/Apps/_system/gitleaks-2026-10-15/$R-clean.git push --force --mirror
     ```
     Check: `gh api repos/k0d0minio/$R/commits --jq '.[0].sha'` equals `git -C $R-clean.git rev-parse HEAD`; re-run 2.1 on a fresh clone and get `exit=0`.
  5. Delete the replacements file: `rm ~/Desktop/Apps/_system/gitleaks-2026-10-15/$R.replacements`.
     Check: the scratch folder holds no file containing the value (`grep -rl '<value>' ~/Desktop/Apps/_system/gitleaks-2026-10-15 || echo none` prints `none`).

- [ ] **2.3** All 25 recorded:
  ```bash
  jq -r '.[] | select(.mark!="personal") | "\(.name)\t\(.gitleaks // "MISSING")"' meta/estate-k0d0minio-2026-10-15.json | grep -c MISSING
  ```
  Check: `2`, and the names are the live personal repos that stay (jamienisbet, english-with-jamie):
  ```bash
  jq -r '.[] | select(.mark!="personal") | select(.gitleaks==null) | .name' meta/estate-k0d0minio-2026-10-15.json
  ```

## Phase 3 — Transfers (Jamie's hand)

Each transfer is one command per repo. Git and web redirects from the old URL keep working;
issues, PRs, secrets, deploy keys and webhooks come along; a Pages site would not (none
exist). ⚠ A transfer is reversed only by transferring back, and every transfer breaks the
repo's Vercel Git link until phase 4. Do not transfer a repo whose gitleaks line is missing.

- [ ] **3.1** (today, after phase 2) The first dormant repo, chosen because it holds 5
  secrets and a Vercel project, so it verifies two things at once:
  ```bash
  gh api -X POST repos/k0d0minio/courseday/transfer -f new_owner=legible-consulting --jq .full_name
  ```
  Check: prints `legible-consulting/courseday` (HTTP 202; the transfer between owners you both admin completes within seconds). Then:
  ```bash
  gh repo view legible-consulting/courseday --json owner --jq .owner.login
  ```
  Check: `legible-consulting`.

- [ ] **3.2** (today) Close two verify-once items on that first transfer:
  ```bash
  gh api repos/legible-consulting/courseday/actions/secrets --jq .total_count
  ```
  Check: `5` (design §10 item 12). Then in the GitHub UI: org Settings → GitHub Apps →
  Claude → Repository access.
  Check: "All repositories" and `courseday` is reachable from a cloud session's repo picker (design §10 item 9).

- [ ] **3.3** (today) The other dormant repo that moves, firedough; the rest stay on `k0d0minio`.
  ```bash
  gh api -X POST repos/k0d0minio/firedough/transfer -f new_owner=legible-consulting --jq .full_name
  ```
  Check: prints `legible-consulting/firedough`.

- [ ] **3.6** (Jamie's hand, any time after phase 2) The live repos that move: berceo,
  vinecliff (renamed `vinecliff-vineyard` in the org), remi-ai, agorasim. Nothing here runs
  for you; the command is the same as 3.3, once per repo.
  ```bash
  R=berceo; gh api -X POST repos/k0d0minio/$R/transfer -f new_owner=legible-consulting --jq .full_name
  ```
  Check per repo: `legible-consulting/<repo>`; `gh api repos/legible-consulting/berceo/actions/secrets --jq .total_count` prints `4`. Go straight to phase 4 for berceo and vinecliff-vineyard.

- [ ] **3.7** (today, after each transfer) Point the local clone at the new owner (one
  command per moved repo; `gh` uses HTTPS on this machine):
  ```bash
  R=<repo>; git -C ~/Desktop/Apps/projects/$R remote set-url origin https://github.com/legible-consulting/$R.git && git -C ~/Desktop/Apps/projects/$R ls-remote --heads origin main
  ```
  Check: one line ending in `refs/heads/main`. After all moved repos:
  ```bash
  for d in ~/Desktop/Apps/projects/*/; do git -C $d remote get-url origin 2>/dev/null | grep -q k0d0minio && basename $d; done
  ```
  Check: prints only repos that `gh repo list k0d0minio` still lists, and `sustentus` if its clone points elsewhere.

- [ ] **3.8** (today) The personal account holds what stays:
  ```bash
  gh repo list k0d0minio --limit 100 --json name --jq '.[].name' | sort
  ```
  Check: 22 names: 15 dormant client repos, `icm-board`, and six personal repos.

## Phase 4 — Vercel (after 3.6 for live; after 3.5 for dormant)

Team id for `kodominio`: `team_PCq0jpC3GS1jsyS8OFuHPLqm`. A transferred repo leaves the
project's Git link pointing at `k0d0minio/<repo>`; new commits stop deploying until the
link is remade. The last production deployment keeps serving throughout.

- [ ] **4.1** berceo (after its transfer). Run inside the clone so the CLI knows the project:
  ```bash
  cd ~/Desktop/Apps/projects/berceo && vercel link --scope kodominio --project berceo --yes && vercel git disconnect && vercel git connect https://github.com/legible-consulting/berceo
  ```
  Check:
  ```bash
  vercel api '/v9/projects/berceo?teamId=team_PCq0jpC3GS1jsyS8OFuHPLqm' | jq -c '.link | {org,repo}'
  ```
  Check: `{"org":"legible-consulting","repo":"berceo"}` (design §10 item 13). Then push an empty commit on a branch and confirm a preview deployment appears in the dashboard.

- [ ] **4.2** vinecliff: same as 4.1 with project `vinecliff`, clone `vinecliff`, repo `legible-consulting/vinecliff-vineyard`.
  Check: `{"org":"legible-consulting","repo":"vinecliff-vineyard"}`.

- [ ] **4.3** courseday and firedough: same as 4.1 with each name.
  Check: `{"org":"legible-consulting","repo":"courseday"}` and `{"org":"legible-consulting","repo":"firedough"}`.

- [ ] **4.4** remi-ai: six projects in `remi21` (app, admin, marketing, documentation,
  support, demo), one repo. Once per project:
  ```bash
  P=app; cd ~/Desktop/Apps/projects/remi-ai && vercel link --scope remi21 --project $P --yes && vercel git disconnect && vercel git connect https://github.com/legible-consulting/remi-ai
  ```
  Check after all six:
  ```bash
  vercel api '/v9/projects?teamId=team_4W5cPb8fsRXyJja4yjyXEyMn&limit=100' | jq -c '.projects[] | {name, org: .link.org}'
  ```
  Check: six lines, each `"org":"legible-consulting"`.

- [ ] **4.5** (Wave 1, not today) Private client repos deploy from Actions: the template
  carries `vercel.json` with `"git": {"deploymentEnabled": false}` and `ci.yml` calling
  `deploy-vercel.yml@v1`. First verification is design §10 item 3 on the first private build.

## Phase 5 — Secrets, variables and rulesets

- [ ] **5.1** (today) Vercel token for Actions, scoped to the agency team, one year:
  ```bash
  vercel tokens add gh-actions-legible --scope kodominio
  ```
  Check: `vercel tokens list` shows `gh-actions-legible`. Copy the value once, into 5.2 only; never into chat, a file or a commit.

- [ ] **5.2** (today) Store it on the operating repo (paste at the prompt):
  ```bash
  gh secret set VERCEL_TOKEN --repo legible-consulting/house
  ```
  Check: `gh secret list --repo legible-consulting/house` lists `VERCEL_TOKEN`.

- [ ] **5.3** (today) Dashboard read token. Click: github.com/settings/personal-access-tokens/new →
  name `DASHBOARD_PAT` → Resource owner **legible-consulting** → All repositories →
  Repository permissions: **Actions read, Contents read, Deployments read, Metadata read,
  Pull requests read** → Expiration 366 days → Generate. Then:
  ```bash
  gh secret set DASHBOARD_PAT --repo legible-consulting/house
  ```
  Check: `gh secret list --repo legible-consulting/house` lists it; a quick read works: `GH_TOKEN=<paste> gh api repos/legible-consulting/berceo/actions/runs --jq .total_count` prints a number (run it in a shell you close afterwards).

- [ ] **5.4** (today) Estate write token, same page: name `ESTATE_PAT` → All repositories →
  **Contents write, Pull requests write, Workflows write, Metadata read** → 366 days.
  ```bash
  gh secret set ESTATE_PAT --repo legible-consulting/house
  ```
  Check: listed by `gh secret list`.

- [ ] **5.5** (today, if the key exists) Unattended Google and alerts:
  ```bash
  gh secret set GOOGLE_SA_KEY --repo legible-consulting/house < ~/path/to/service-account.json && gh secret set HEALTHCHECKS_URL --repo legible-consulting/house
  ```
  Check: `gh secret list --repo legible-consulting/house` shows five names. The key file stays outside every repo: `git -C ~/Desktop/icm-workshop check-ignore -q <path> || echo "not under a repo"` prints `not under a repo`.

- [ ] **5.6** (today) Ruleset on `main` for each **public** repo: berceo, vinecliff, remi-ai
  (after 3.6), client-starter-kit, workflows, .github. No bypass actors: Jamie's own pushes
  to `main` are refused too; that is the gate. ⚠ From now on, `main` changes only by PR.
  Rollback: `gh api -X DELETE repos/legible-consulting/<repo>/rulesets/<id>`.
  Write the body once:
  ```bash
  cat > /tmp/ruleset-main.json <<'EOF'
  {"name":"main","target":"branch","enforcement":"active","bypass_actors":[],
   "conditions":{"ref_name":{"include":["~DEFAULT_BRANCH"],"exclude":[]}},
   "rules":[{"type":"deletion"},{"type":"non_fast_forward"},
            {"type":"pull_request","parameters":{"required_approving_review_count":0,"dismiss_stale_reviews_on_push":false,"require_code_owner_review":false,"require_last_push_approval":false,"required_review_thread_resolution":false}}]}
  EOF
  ```
  Then per repo:
  ```bash
  R=berceo; gh api -X POST repos/legible-consulting/$R/rulesets --input /tmp/ruleset-main.json --jq '{id,enforcement}'
  ```
  Check: `enforcement: active`; `gh ruleset list --repo legible-consulting/$R` shows `main`. Add `required_status_checks` (context `check`) to each ruleset once `ci.yml` exists (Wave 1). On berceo also confirm design §10 item 14: Settings → Code security shows push protection enabled.

- [ ] **5.7** (today) Private repos: nothing to set; the 403 is the verified state.
  ```bash
  gh api repos/legible-consulting/house/rulesets 2>&1 | grep -o 'Upgrade to GitHub Pro[^"]*'
  ```
  Check: prints the upgrade message.

- [ ] **5.8** (today) Claude cloud environment `legible`. Click: claude.ai/code → Settings →
  Environments → **New environment** → name `legible` → setup script: paste `core/setup/cloud.sh` (the toolbox in `core/stack.md`, under five
  minutes) → **Network secrets**: none. No Google key here
  (design §8: a service-account key cannot work as a header-injected secret; sessions use
  the Google connectors).
  Check: start a cloud session on `legible-consulting/house` in environment `legible`; `which yq gitleaks` prints two paths.

- [ ] **5.9** (Wave 1) Per-repo secrets and variables on each new private client repo,
  from the template's access table: `VERCEL_TOKEN` (secret), `VERCEL_ORG_ID` and
  `VERCEL_PROJECT_ID` (`gh variable set --repo`), app secrets by name. Not today: no live
  private client repo exists.

## Phase 6 — Reference-repo merge (today)

The course folder's git history is a handful of import commits; one commit with the source
SHA is enough provenance, so the files are copied, not subtree-merged (why: a subtree merge
drags the operating repo's unrelated history into the reference repo · 2026-10-15). The
operating repo's history is **not** rewritten: nothing in the folder is secret, and a
rewrite would break every clone and open cloud session.

- [ ] **6.1** Copy the course into the reference repo on a branch:
  ```bash
  SRC=~/Desktop/icm-workshop; SHA=$(git -C $SRC rev-parse --short main); gh repo clone legible-consulting/learn-with-jake-van-clief /tmp/lwjvc && cd /tmp/lwjvc && git switch -c import-course && cp -r $SRC/jake-van-clief/. . && git add -A && git commit -m "Import the course from icm-workshop@$SHA" && git push -u origin import-course
  ```
  Check: `git ls-files | wc -l` in `/tmp/lwjvc` equals `git -C $SRC ls-files jake-van-clief | wc -l` (176 on 2026-10-15) plus whatever the reference repo already held; `00_reference-material/icm.pdf` is present.

- [ ] **6.2** Open and merge the PR on the reference repo (the gate is yours):
  ```bash
  gh pr create --repo legible-consulting/learn-with-jake-van-clief --head import-course --title "Import the course from icm-workshop" --body "Files copied from legible-consulting/icm-workshop@$SHA jake-van-clief/; the operating repo deletes the folder in its own PR."
  ```
  Check: `gh pr view --repo legible-consulting/learn-with-jake-van-clief import-course --json state --jq .state` prints `MERGED` after you merge.

- [ ] **6.3** Delete the folder from the operating repo by PR. ⚠ The files leave `main`
  (history keeps them). Rollback: `git revert` the merge commit.
  ```bash
  cd ~/Desktop/icm-workshop && git switch -c remove-course main && git rm -r -q jake-van-clief && grep -rl 'jake-van-clief' --include='*.md' . | grep -v '^./meta/' ; git commit -m "Move the course to learn-with-jake-van-clief" && git push -u origin remove-course && gh pr create --fill
  ```
  Check: the `grep` prints nothing outside `meta/` (no dangling links); after merge, `git ls-files jake-van-clief | wc -l` on `main` prints `0`. `meta/02-tool-research.md` and `03-repo-topology.md` keep their historical mentions.

## Phase 7 — Closing checks (today, after the phases above)

- [ ] **7.1** The org holds what the design says:
  ```bash
  gh repo list legible-consulting --limit 100 --json name --jq '.[].name' | sort
  ```
  Check: 10 names: `.github`, agorasim, berceo, blueprint, courseday, firedough, house, library, remi-ai, vinecliff-vineyard.

- [ ] **7.2** Settings read back in one line:
  ```bash
  gh api orgs/legible-consulting --jq '{two_factor_requirement_enabled,default_repository_permission,members_can_create_repositories}'
  ```
  Check: `true · none · false`.

- [ ] **7.3** Every moved repo has a gitleaks line and the inventory says so:
  ```bash
  jq -r '.[] | select(.mark=="client-dormant" or .mark=="reference") | select(.gitleaks==null) | .name' meta/estate-k0d0minio-2026-10-15.json
  ```
  Check: prints nothing.

- [ ] **7.4** Stamp the inventory and commit the research (commit only when you want to):
  ```bash
  jq --arg d 2026-10-15 'map(if .mark=="client-dormant" or .mark=="reference" then . + {moved_on:$d} else . end)' meta/estate-k0d0minio-2026-10-15.json > /tmp/e.json && mv /tmp/e.json meta/estate-k0d0minio-2026-10-15.json
  ```
  Check: `jq '[.[] | select(.moved_on)] | length' meta/estate-k0d0minio-2026-10-15.json` prints `25`.

- [ ] **7.5** A cloud session reaches a moved repo: claude.ai/code → new session → repository
  picker → `legible-consulting/berceo`.
  Check: the session clones it and `git remote -v` shows the org URL.

## Not in this runbook, on purpose

- Wave 1 content: the operating repo's workflows, the method repo's copier template, the
  `workflows` repo's four reusable workflows, `ci.yml` in client repos, the dashboard. The
  org must exist first; those follow `03-repo-topology.md` §7.
- Renaming the Vercel team, re-registering the old org name (declined), Secret Protection
  (not purchasable on Free), GitHub Team (design §9 says when).
