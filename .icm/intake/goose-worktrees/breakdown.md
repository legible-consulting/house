# Breakdown: One ticket, one worktree, one goose session, with no second app

- epic-slug: goose-worktrees
- source: Jamie, 2026-10-29: "I'm still not liking the concept of having two different applications. What would need to happen for me to be able to work as I usually do in Claude but only within goose? We would remove Emdash entirely." The research of the same day read goose 1.57 (its CLI help, its hooks guide, its logs on this machine), the Emdash documents, the blueprint at `origin/main` after pull requests 38 and 40, the house `core/stack.md` and the three guards. Re-cut on 2026-10-29 after the review of the open tickets: the why of goose, the loop walk, and the blueprint's local-agent files.

## What I understood

Jamie wants one application per lane. Goose owns the local lane. Claude Code keeps the cloud and phone lane, because goose has no hosted session and the house boundary says every module runs from anywhere. Goose Desktop stays installed and Jamie does not open it. Emdash leaves.

Why goose, in Jamie's words of 2026-10-29: an agent that runs on his own machine on a wide choice of models. Anthropic credited his API account with 200 dollars, so the test runs on Claude through the API. Whatever agent the lane settles on is the replacement for Claude Code when the weekly usage runs out, or if Jamie ends the subscription. Claude Code desktop and one other desktop agent are both needed. This why goes into `core/stack.md` and into `research/verdicts/goose.md`, which still says `watch` for the workshop only (triage stub `tool-why-home`).

Emdash did four things that the local lane keeps: a worktree per ticket, so that several goose sessions run on one repo at once; the copy of `.env` and `.env.local` into the worktree; the install from the lockfile before the agent's first command; the removal of the worktree when the ticket is done. Goose does none of these. Its maintainers closed the request for native worktrees on 2026-03-06 and said that a skill or a script must do it. The blueprint already has the install as `.icm/scripts/worktree-setup.sh`. What is missing is one script that makes the worktree, copies the env files, runs the install and starts goose in it, and that removes the worktree afterwards.

Two more gaps come from goose, not from Emdash. The router and the board are Claude Code hooks, so a goose session on a build gets neither. And `new-run.sh` cuts the ticket's branch from `main`, which is wrong inside a worktree that is already on that branch. Both were triage stubs in pull request 182. They move into this epic.

The three guards run in goose since 2026-10-29 through the plugin `legible-guards`. The guard's ask becomes a block in goose, so a direct `gh api` write that asks stops the session and Jamie runs it himself. `merge.sh` and `release.sh` are not blocked: the guard reads the typed command line, and the scripts' own path matches no REST pattern. Goose reads `~/.claude/skills`, so the skills need no change. Nobody has walked the whole loop in goose yet. The review of 2026-10-29 asked whether a lane that cannot complete the loop is acceptable. Jamie: no. If goose stays, the lane completes the loop, or the house finds an agent that does. Stub `goose-loop-walk` is that proof, and `emdash-leaves` waits on it.

The review also asked whether the blueprint should carry files for the agent Jamie runs locally. Jamie: yes. `.goosehints` and `worktree-setup.sh` stay in the template. `.emdash.json` leaves with Emdash.

### Questions for Jamie

Answered by Jamie in the session on 2026-10-29: the seven defaults stand, and they are written into the decisions below. Answered again on 2026-10-29 in the review (Q4 to Q6): the why of goose, the loop as the condition, the blueprint carries local-agent files. None is open.

1. Where does the epic go in `README.md` § Order? Default: fourth, after `blueprint-environments`, where `emdash-worktrees` was.
2. Where do the worktrees live? Default: `~/goose/worktrees/<repo>/<slug>/`, one folder per repo, one worktree per ticket.
3. Where does the script live? Default: `core/setup/goose-task.sh` in the house, installed to `~/.local/bin/goose-task` by `core/setup/local.sh`. The other answer: a goose recipe in `~/.config/goose/recipes/`, which no repo holds.
4. What is the worktree's branch? Default: the ticket's branch, `<slug>` or `triage/<slug>`, the names `new-run.sh` uses. The script reuses the branch when it exists on `origin`.
5. Who removes a worktree? Default: `goose-task done <slug>` removes it when it is clean and pushed, after the pull request merges. `~/.claude/hooks/reap-worktrees.sh` learns the folder as the backstop at 24 hours.
6. Does `.emdash.json` leave the blueprint now? Default: yes. `worktree-setup.sh` stays, because `goose-task` calls it.
7. When does Emdash leave the machine? Default: after `goose-task` has run one house ticket and one live repo ticket to a merged pull request.

Classification of the open epics, for question 1 (2026-10-29, first cut):

| Epic | Open | P0 | Serves | Links | Files |
|---|---|---|---|---|---|
| triage | 7 | 0 | the estate's env cleanup, two blueprint chores, one research | `env-cleanup-*` wait on the next conformance | Vercel and Neon settings, `.copier-answers.yml` |
| blueprint-environments | 4 | 0 | where each build runs, read by the desk and the stop report | `estate-environments` runs in the same conformance as `estate-worktree-files` | `.github` `check-client.yml`, blueprint `promote.sh`, the desk |
| goose-worktrees | 5 | 0 | the local lane with one application | `estate-worktree-files` runs in the same conformance as `estate-environments` | blueprint `copier.yml`, `check.yml`, `conventions/README.md`; house `core/stack.md`, `core/setup/` |

## Decisions of record

- **One application per lane.** Goose is the agent of the local lane. Claude Code keeps the cloud and phone lane (why: goose has no hosted session, and every module runs from anywhere · Jamie, 2026-10-29).
- **Goose is the provider-independent agent.** It runs on Jamie's machine on the model he chooses, today Claude through the API on a 200-dollar credit. It is the replacement for Claude Code when the weekly usage runs out or the subscription ends (why: Jamie's words, 2026-10-29. One agent bound to one vendor's subscription is one point of failure for the whole lane).
- **The lane completes the loop, or the agent changes.** Stub `goose-loop-walk` proves step 0 to step 7 of `.icm/intake/CONTEXT.md` in goose, on a live repo and on the house. A gap with no fix names the next agent to test, and Emdash stays until then (why: Jamie's answer to Q5, 2026-10-29. A lane that stops one step short is two lanes).
- **The blueprint carries the local agent's files.** `.goosehints` and `.icm/scripts/worktree-setup.sh` stay in the template. `.emdash.json` leaves with Emdash (why: Jamie's answer to Q6, 2026-10-29. A client's build opens in the agent Jamie runs, and the file that maps it travels with the build).
- **Emdash leaves.** The worktree per ticket stays (why: Jamie runs tickets on one repo in parallel, and two applications for one lane is what he does not want · Jamie, 2026-10-29).
- **Goose Desktop stays installed and closed** (why: Jamie's word, 2026-10-29. The stack row stays until he removes it).
- **One script does what Emdash did**, deterministic and in a repo: the worktree, the env copy, the install, the goose session, the removal. It decides nothing about the ticket (why: the goose maintainers put worktrees outside goose, and a script in the house is reviewed and reverted like any file · 2026-10-29).
- **The worktree's branch is the ticket's branch.** `new-run.sh` makes no branch inside a worktree (why: one ticket is one branch, and the branch exists before the session · 2026-10-29).
- **CI is truth is unchanged.** The script runs the install from the lockfile and nothing else.
- **The epic is fourth in `README.md` § Order**, after `blueprint-environments` (Jamie, 2026-10-29).
- **The worktrees live in `~/goose/worktrees/<repo>/<slug>/`**, one folder per repo, one worktree per ticket (why: one folder that the script and the reaper both know, outside every repo and outside `~/Desktop` · Jamie, 2026-10-29).
- **The script is `core/setup/goose-task.sh`**, installed to `~/.local/bin/goose-task` by `core/setup/local.sh` (why: a repo holds it, reviews it and reverts it, and a fresh machine gets it from the stack · Jamie, 2026-10-29).
- **The worktree's branch is `<slug>` or `triage/<slug>`**, the names `new-run.sh` uses. The script reuses the branch when it exists on `origin` (why: the worktree's branch and the ticket's branch are one name · Jamie, 2026-10-29).
- **`goose-task done <slug>` removes a worktree** when it is clean and pushed, after the pull request merges. `~/.claude/hooks/reap-worktrees.sh` is the backstop at 24 hours (why: the person who finished the ticket removes its folder, and the reaper catches what was forgotten · Jamie, 2026-10-29).
- **`.emdash.json` leaves the blueprint in stub `blueprint-new-run-in-worktree`.** `worktree-setup.sh` stays (why: no tool reads the file once Emdash leaves, and `goose-task` calls the script · Jamie, 2026-10-29).
- **Emdash leaves the machine after `goose-loop-walk` is green** (why: the replacement is proved before the old tool goes · Jamie, 2026-10-29).

## Build order

1. goose-task-script — the house gets `core/setup/goose-task.sh`, `local.sh` installs it, and `core/stack.md` names the script and the worktree folder — depends-on: none
2. plugin-router-and-board — the plugin `legible-guards` runs the repo's router and board in a goose session, or says what goose cannot do — depends-on: none
3. blueprint-new-run-in-worktree — `new-run.sh` keeps the worktree's branch, and `.emdash.json` leaves the blueprint — depends-on: goose-task-script
4. emdash-leaves — the stack drops Emdash, and Jamie removes it from the machine — depends-on: goose-loop-walk
5. estate-worktree-files — each live repo loses `.emdash.json` and keeps the setup script, in the conformance to the new tag — depends-on: blueprint-new-run-in-worktree
6. goose-loop-walk — a goose session takes one live repo ticket and one house ticket to the merge, and each gap gets a fix or a stub — depends-on: plugin-router-and-board, blueprint-new-run-in-worktree

Stub 6 was cut on the re-cut and runs before stub 4. A dropped or re-cut stub keeps its number (`.icm/intake/CONTEXT.md`).

## Out of scope

- Goose Desktop. It stays installed. No stub opens it or removes it.
- The cloud and phone lane. Claude Code keeps it as today.
- A view of several sessions at once. Terminal tabs and `goose session list` are the view.
- A goose recipe or skill that starts a ticket. The script is enough this round.
- `.goosehints` in `library` and `.github`: the triage stub `goosehints-library-and-github`.
- The goose verdict and the stack row's why: the triage stub `tool-why-home`.
