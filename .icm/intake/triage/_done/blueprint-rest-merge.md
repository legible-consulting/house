# Stub: A cloud session merges a pull request after the Ready to merge tick

- lane: bug
- found-by: Jamie, `k0d0minio/agorasim` pull request 211 · 2026-10-28
- complexity: medium
- priority: P1

## Problem

In a client repo from the blueprint, a Claude Code cloud session cannot merge after Jamie ticks Ready to merge. There are two causes:

1. `.icm/scripts/merge.sh` reads the pull request with `gh pr view --json` and merges with `gh pr merge`. Both commands use the GitHub GraphQL API. A cloud session gets `HTTP 403: GitHub GraphQL is not available from Claude Code sessions; use the REST API`.
2. Auto mode blocks a direct squash merge as "Merge Without Review". No allow rule in the rendered `.claude/settings.json` covers the merge.

Other scripts in `.icm/scripts/` also use GraphQL: `gh pr create` (`new-run.sh`), `gh pr list` (`close-out.sh`, `release.sh`, `promote.sh`), `gh pr comment` (`promote.sh`), `gh pr merge` and `gh pr view` (`release.sh`). `gh release list` (`release.sh`) also uses GraphQL. The `pr-conventions` skill, the four lanes and the router hook tell a session to use `gh pr checks`, `gh pr view` and `gh pr edit`.

## Proposed change

The scripts use only the REST API, through `gh api`. `merge.sh` keeps every refusal and every message. The rendered `.claude/settings.json` allows `merge.sh` and `release.sh`. The contract and the skill name the same commands as the scripts.

## Acceptance criteria

- [ ] A rendered repo's `merge.sh <n>` refuses an unticked pull request with "Ready to merge has no tick. Jamie ticks it".
- [ ] A rendered repo's `merge.sh <n>` squash-merges a ticked, green, clean pull request and deletes its branch, in a Claude Code cloud session, with no GraphQL call.
- [ ] `grep -rn "gh pr " .icm/scripts/` in a rendered repo returns nothing.
- [ ] The rendered `.claude/settings.json` holds the new allow rules and every rule it held before.

## Notes

- Repo `legible-consulting/blueprint`. Commits: `fix:`.
- `merge.sh` reads the pull request with `GET repos/{owner}/{repo}/pulls/{n}`. It reads the checks on the head SHA from two surfaces: `commits/{sha}/check-runs` (the latest run per name) and `commits/{sha}/status`. Success, neutral and skipped are ok. A conflict is `.mergeable == false` or `.mergeable_state == "dirty"`. The script reads again once when `.mergeable` is null.
- The merge is `PUT pulls/{n}/merge` with `merge_method=squash`, `sha=<head sha>` and `commit_title="<title> (#<n>)"`. The branch delete is `DELETE git/refs/heads/<branch>`.
- `gh repo view` uses GraphQL. The scripts get owner and repo from `git remote get-url origin`.
- The allow rules: `Bash(.icm/scripts/merge.sh *)`, `Bash(.icm/scripts/release.sh)` and `Bash(.icm/scripts/release.sh *)`. No allow rule for a raw `gh api` merge or a ref delete. The scripts carry the gate. The deny rules and the hooks do not change.
- Out of scope: a change in a client repo. Each client gets the change through `copier update`.
- The stub moves to `_done/` in the next house pull request.

## Prompt

Repo legible-consulting/blueprint, desktop or cloud. Attach legible-consulting/house read-only. The ticket is .icm/intake/triage/blueprint-rest-merge.md in the house: read it first, then the blueprint's CLAUDE.md. The blueprint pull request is on the branch `rest-merge`. Read its body and its gates, and continue at the step the body shows. Conventional Commits, technical text in Simplified Technical English. Do not run checks locally. Do not merge.
