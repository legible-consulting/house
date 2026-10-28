# Stub: The git-writes guard asks before a raw REST merge or branch delete

- lane: chore
- found-by: legible-consulting/blueprint pull request 30 (`rest-merge`), question 5 · 2026-10-28
- complexity: low
- priority: P2

## Problem

`template/.claude/hooks/confirm-git-writes.sh` asks before `gh pr merge` and `gh release create`. It does not ask before the same acts through the REST API: `gh api -X PUT repos/<owner>/<repo>/pulls/<n>/merge` and `gh api -X DELETE repos/<owner>/<repo>/git/refs/heads/<branch>`. After pull request 30, the scripts use only these REST calls. A session that types such a call by hand skips the gate that `merge.sh` carries. The scripts are not affected, because the hook reads only the command line that the session types.

## Proposed change

The hook asks before a `gh api` call whose method is `PUT` on a path that ends in `/merge`, and before a `gh api` call whose method is `DELETE` on a `git/refs/` path. `.icm/scripts/merge.sh` and `.icm/scripts/release.sh` stay allowed.

## Acceptance criteria

- [ ] `confirm-git-writes.sh` returns "ask" for `gh api -X PUT repos/o/r/pulls/7/merge` and for `gh api -X DELETE repos/o/r/git/refs/heads/x`.
- [ ] `confirm-git-writes.sh` stays silent for `.icm/scripts/merge.sh 7` and for `gh api repos/o/r/pulls/7`.
- [ ] The global copy in `~/.claude/hooks/` gets the same change, or the stub says why not.
