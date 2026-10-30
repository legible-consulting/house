# Breakdown: Agents tick a passed acceptance box, operate GitHub with gh, and push .icm-only changes to main

- epic-slug: agent-git-rules
- source: Jamie, 2026-10-30, in the session of `triage/hermes-cheap-models`, after the first Hermes trials: "it is okay for an agent to tick an acceptance box provided they are certain the criteria has passed. The usage of REST in the contract for git seems to be causing a lot of trouble, let's allow the usage of gh for operating PRs and github as a whole, also I want my agents to be able to push to main freely when it comes to tickets and content within the .icm folder." Jamie's answers in the same session:
  1. Check first whether a cloud session still gets HTTP 403 on GraphQL.
  2. A push is free when every changed file is under `.icm/`.
  3. The blueprint changes first, then the house and the global copies. The estate takes the tag at the next conformance.

## What I understood

Three rules change. First, an agent may tick an acceptance criterion box when it checked that the criterion passed. A gate box (Spec approved, Ready to merge) stays a human checkbox. Second, `gh` in full, `gh pr` included, is allowed for pull requests and for GitHub as a whole. The REST-only rule exists because a Claude Code cloud session got HTTP 403 on GraphQL on 2026-10-28, so a cloud session is read again first. Third, a push to `main` runs with no ask when every file that the push changes is under `.icm/`: a new stub, a stub move, a breakdown. Any other push to `main` still asks.

The rules live in the blueprint: `template/.icm/intake/CONTEXT.md` (§ The loop), the `pr-conventions` skill and `template/.claude/hooks/confirm-git-writes.sh`. The house and `~/.claude/hooks/` carry copies of the guard, and `check.yml`'s `guards` job fails when the house copy differs from the blueprint's. The scripts in `.icm/scripts/` can stay on REST: they work, and the rule change only lifts the ban.

The first trial of 2026-10-30 found a related fault, parked as triage stub `hermes-approval-deny`: in a Hermes session, Deny at the approval prompt of `git push origin main` did not stop the push. A free `.icm/` push does not depend on that prompt. Every other ask does.

### Questions for Jamie

1. Where does the epic go in `README.md` § Order? Default: second, after `triage` (why: it lifts the friction that every session of the lane meets now).
2. Does a direct push to `main` of `.icm/`-only files replace the pull request for those changes, or only allow it? Default: allow it. A session still opens a pull request when the change belongs to a ticket's branch.
3. May an agent tick an acceptance box in the stub as well as in the pull request body? Default: yes, both, each one only after the check that proves it.

Classification of the open epics, for question 1 (2026-10-30):

| Epic | Open | P0 | Serves | Links | Files |
|---|---|---|---|---|---|
| triage | 8 | 1 | the estate's env cleanup, the Hermes models research, the house's own chores | `hermes-approval-deny` and stub 3 here both touch the push ask | Vercel and Neon settings, `core/setup/hermes/` |
| goose-worktrees | 0 | 0 | no open stub: the folder waits on its close-out | none | none |
| google-service-account | 3 | 0 | Google reads without a connector | none | `core/render/place.sh`, `core/stack.md` |
| agent-git-rules | 5 | 0 | the friction of every session of the lane | stub 3 and `hermes-approval-deny` touch the push ask | blueprint `confirm-git-writes.sh`, `CONTEXT.md`, `pr-conventions`; house guard copy, `check.yml` |

## Build order

1. cloud-graphql-probe — a cloud session runs `gh pr view` and one GraphQL call on the house, and the result is recorded — depends-on: none
2. blueprint-gh-and-ticks — the blueprint's contract and `pr-conventions` allow `gh` in full and the tick of a passed acceptance box — depends-on: cloud-graphql-probe
3. blueprint-icm-push — the blueprint's `confirm-git-writes.sh` lets a push to `main` through with no ask when every changed file is under `.icm/` — depends-on: none
4. house-follows — the house guard copy, the house intake contract and `~/.claude/hooks/` follow the new blueprint tag — depends-on: blueprint-gh-and-ticks
5. estate-takes-the-tag — each live repo takes the tag at the next conformance — depends-on: house-follows

## Out of scope

- The scripts in `.icm/scripts/`. They stay on REST.
- A push to `main` that changes any file outside `.icm/`. It still asks.
- The gates. Spec approved and Ready to merge stay human checkboxes.
- The fault of the Hermes approval prompt: triage stub `hermes-approval-deny`.
