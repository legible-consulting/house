# Stub: The scripts open a ready pull request, print a dry run, merge on the tick, release on Jamie's word and dispatch the promotion

- feature-slug: scripts
- epic: blueprint-pipeline
- sequence: 4 of 13
- depends-on: intake-contract
- complexity: medium
- priority: P1

## Problem

`new-run.sh` opens a draft only, and a test of it in a client repo opens a real branch and pull request. No script merges on the tick, merges the release pull request, or dispatches `promote.yml`. The loop's step 7 and `## After the tick` (unit 2) name four script calls that do not exist.

## Proposed change

Two flags on `new-run.sh`. Two new scripts, `merge.sh` and `release.sh`. One new verb on `promote.sh`. Each does the mechanics of one step and decides nothing. The tick and Jamie's word decide.

## Acceptance criteria

- [ ] `new-run.sh --ready`: `gh pr create` without `--draft`. The hotfix lane uses it. Any other use is the user's call.
- [ ] `new-run.sh --dry-run`: prints the branch name, the stub's move and the full pull request body. Creates nothing: no branch, no commit, no push, no pull request. Needs no `gh`. The working tree is unchanged afterwards.
- [ ] `new-run.sh triage/<slug>` with an untracked stub: when the stub is the one untracked file and the tree is otherwise clean, the script carries the stub onto the new branch, moves it into `triage/_done/` and commits it. A tracked stub keeps `git mv`.
- [ ] `.icm/scripts/merge.sh <number>`: reads the pull request with `gh pr view --json body,title,state,isDraft,mergeable,statusCheckRollup`. Refuses, with one line each, when: the body has no line `- [x] **Ready to merge**`, the pull request is a draft, a check is pending or failed, the state is not open. Then `gh pr merge <number> --squash --delete-branch --subject "<the title>"`. Prints the merge commit SHA and the branch deleted. It ticks nothing and reads no file for the tick but the pull request body.
- [ ] `.icm/scripts/release.sh`: finds the open release pull request by its head branch `release-please--branches--main` (release-please's name) or by its title prefix `chore(main): release`. Refuses when there is none, or more than one, or a check is pending or failed. Merges it with `gh pr merge --merge` (release-please needs the commit, not a squash: check release-please's documentation and record the answer in the script's header). Prints the tag it made, read back with `gh release list --limit 1`.
- [ ] `.icm/scripts/promote.sh run --tag <tag>`: refuses when the release pull request for that tag has no approval record from `promote.sh approve` (the comment the script posts), or when `ci` on `main`'s head, the UAT deployment or the staged production build is not READY (the same reads as `status`). Then `gh workflow run promote.yml -f tag=<tag>` and prints the run URL. It waits for nothing.
- [ ] Every script: `set -euo pipefail`, one line per refusal on stderr with exit 1, shellcheck clean at `--severity=warning`, the contract named in the header.
- [ ] `check.yml`: a `--dry-run` in a rendered build with one fixture stub prints a body with the criteria filled in, and `git status --porcelain` is empty afterwards.

## Out of scope

- The `gate` CI check that GitHub enforces: unit 11. The hook `confirm-git-writes.sh` stays as it is: a bare `gh pr merge` still asks.

## Notes

Read first: the breakdown, `template/{% if not workspace %}.icm{% endif %}/scripts/new-run.sh`, `close-out.sh`, `{% if uat %}promote.sh{% endif %}` and `lib/vercel.sh`, the intake contract as unit 2 left it, `.icm/uat/CONTEXT.md` § The batch and the sign-off and § The promotion. `merge.sh` and `release.sh` render in every build. `promote.sh run` renders on `uat` only, in the same file as `status` and `approve`. The legacy `new-run.sh` in `k0d0minio/icm-board` had `--dry-run` and `--ready`: read its header for the shape, not its body.

## Prompt

Repo legible-consulting/blueprint, cloud or desktop. Attach legible-consulting/house read-only. Read CLAUDE.md, README.md and conventions/README.md in the blueprint, then .icm/intake/blueprint-pipeline/breakdown.md in the house whole, then this ticket, .icm/intake/blueprint-pipeline/scripts.md, then the files its Notes name. Do what it says. One branch, one pull request to main in the blueprint, Conventional Commits, technical text in Simplified Technical English. Write what you will change and your questions in the pull request body, numbered, each with a default, and stop for Spec approved. On build: render the proof sets into a scratch folder with copier and run the dry run there. Read check.yml. Do not merge. Then one pull request in the house that moves this stub to .icm/intake/blueprint-pipeline/_done/, the one write to the house. Your last message names both pull requests and what waits on Jamie.
