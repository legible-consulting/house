# Stub: A cloud session reports whether GraphQL and `gh pr` work on the house

- feature-slug: cloud-graphql-probe
- epic: agent-git-rules
- sequence: 1 of 5
- depends-on: none
- complexity: research
- priority: P1

## Problem

The contract bans `gh pr` because a Claude Code cloud session got HTTP 403 on GraphQL on 2026-10-28 (blueprint `template/.icm/intake/CONTEXT.md` § The loop). Nobody read it again since.

## Proposed change

Jamie starts one session in the `legible` cloud environment with the house attached. The session runs `gh pr view <n> --json state`, `gh pr list --limit 1` and `gh api graphql -f query='{viewer{login}}'` against an open house pull request, and records each result. It writes nothing else.

## Acceptance criteria

- [ ] The three results, with the date and the HTTP status of each, are in this stub's `_done/` copy.
- [ ] The stub says one of two things: `gh` works in full from the cloud, or the cloud lane keeps REST and why.

## Notes

- The session is Jamie's to start: a cloud session starts from claude.ai/code, not from the local lane.
- A 403 keeps a cloud carve-out in stub `blueprint-gh-and-ticks`. A pass drops it.
