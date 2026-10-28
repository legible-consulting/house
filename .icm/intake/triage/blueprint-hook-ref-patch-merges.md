# Stub: The git-writes guard asks before a REST force update of a ref and a REST branch merge

- lane: chore
- found-by: legible-consulting/blueprint pull request 33 (`hook-rest-merge`), question 1 · 2026-10-28
- complexity: low
- priority: P2

## Problem

After pull request 33, `template/.claude/hooks/confirm-git-writes.sh` asks before a `gh api` `PUT` on a path that ends in `/merge` and before a `gh api` `DELETE` on a `git/refs/` path. Two other REST calls change refs, and the guard does not ask before them:

1. `gh api -X PATCH repos/<owner>/<repo>/git/refs/heads/<branch> -F sha=<sha> -F force=true` moves a branch to a commit that is not a descendant. This is a force push.
2. `gh api -X POST repos/<owner>/<repo>/merges -f base=<branch> -f head=<branch>` merges one branch into another with no pull request and no gate.

The guard asks before `git push --force` and before `gh pr merge`. A session that types one of these REST calls skips the same gate.

## Proposed change

The hook asks before a `gh api` call whose method is `PATCH` on a `git/refs/` path, and before a `gh api` call whose method is `POST` on a path that ends in `/merges`. The method and the path come in either order, as for the two rules of pull request 33. A `PATCH` with no `force=true` also asks, because the hook cannot read the body of every form (`-F`, `-f`, `--input`).

## Acceptance criteria

- [ ] `confirm-git-writes.sh` returns "ask" for `gh api -X PATCH repos/o/r/git/refs/heads/x -F sha=abc -F force=true` and for `gh api -X POST repos/o/r/merges -f base=main -f head=x`.
- [ ] `confirm-git-writes.sh` stays silent for `gh api repos/o/r/git/refs/heads/x`, `gh api -X GET repos/o/r/merges` and `.icm/scripts/merge.sh 7`.
- [ ] The step "The git-writes guard asks before a REST merge or ref delete" in the blueprint's `check.yml` proves each new ask and each new silence.
- [ ] The house copy and the global copy in `~/.claude/hooks/` get the same bytes after the blueprint merges.

## Notes

- Repo `legible-consulting/blueprint`. Commits: `fix(hooks):`.
- Out of scope: a `gh` call with a variable before it, such as `GH_TOKEN=x gh api …`. The guard does not see it, and the `gh pr merge` rule has the same gap. Jamie kept it as is (pull request 33, question 2 · 2026-10-28).
- The house copy changes in a second pull request after the blueprint merges, because the house's `guards` job compares the house copy with the blueprint's `main`.

## Prompt

Repo legible-consulting/blueprint, desktop or cloud. Attach legible-consulting/house read-only. The ticket is .icm/intake/triage/blueprint-hook-ref-patch-merges.md in the house: read it first, then the blueprint's CLAUDE.md. Conventional Commits, technical text in Simplified Technical English. Do not run checks locally. Do not merge.
