# Breakdown: One ticket, one worktree, one goose session, with no second app

> Closed 2026-10-31. `ticket-leaves` (2026-10-30) replaces this epic's decisions about the lane script, its folder and its removal. Hermes Agent stays the lane's agent.

- epic-slug: goose-worktrees
- source: Jamie, 2026-10-29: "I'm still not liking the concept of having two different applications. What would need to happen for me to be able to work as I usually do in Claude but only within goose? We would remove Emdash entirely." The research of the same day read goose 1.57 (its CLI help, its hooks guide, its logs on this machine), the Emdash documents, the blueprint at `origin/main` after pull requests 38 and 40, the house `core/stack.md` and the three guards. Re-cut on 2026-10-29 after the review of the open tickets: the why of goose, the loop walk, and the blueprint's local-agent files.

## What I understood

Jamie wants one application per lane. Goose owns the local lane. Claude Code keeps the cloud and phone lane, because goose has no hosted session and the house boundary says every module runs from anywhere. Goose Desktop stays installed and Jamie does not open it. Emdash leaves.

Why goose, in Jamie's words of 2026-10-29: an agent that runs on his own machine on a wide choice of models. Anthropic credited his API account with 200 dollars, so the test runs on Claude through the API. Whatever agent the lane settles on is the replacement for Claude Code when the weekly usage runs out, or if Jamie ends the subscription. Claude Code desktop and one other desktop agent are both needed. This why goes into `core/stack.md` and into `research/verdicts/goose.md`, which still says `watch` for the workshop only (triage stub `tool-why-home`).

Emdash did four things that the local lane keeps: a worktree per ticket, so that several goose sessions run on one repo at once; the copy of `.env` and `.env.local` into the worktree; the install from the lockfile before the agent's first command; the removal of the worktree when the ticket is done. Goose does none of these. Its maintainers closed the request for native worktrees on 2026-03-06 and said that a skill or a script must do it. The blueprint already has the install as `.icm/scripts/worktree-setup.sh`. What is missing is one script that makes the worktree, copies the env files, runs the install and starts goose in it, and that removes the worktree afterwards.

Two more gaps come from goose, not from Emdash. The router and the board are Claude Code hooks, so a goose session on a build gets neither. And `new-run.sh` cuts the ticket's branch from `main`, which is wrong inside a worktree that is already on that branch. Both were triage stubs in pull request 182. They move into this epic.

The three guards run in goose since 2026-10-29 through the plugin `legible-guards`. The guard's ask becomes a block in goose, so a direct `gh api` write that asks stops the session and Jamie runs it himself. `merge.sh` and `release.sh` are not blocked: the guard reads the typed command line, and the scripts' own path matches no REST pattern. Goose reads `~/.claude/skills`, so the skills need no change. Nobody has walked the whole loop in goose yet. The review of 2026-10-29 asked whether a lane that cannot complete the loop is acceptable. Jamie: no. If goose stays, the lane completes the loop, or the house finds an agent that does. Stub `goose-loop-walk` is that proof, and `emdash-leaves` waits on it.

The review also asked whether the blueprint should carry files for the agent Jamie runs locally. Jamie: yes. `.goosehints` and `worktree-setup.sh` stay in the template. `.emdash.json` leaves with Emdash.

Re-cut the same evening. Jamie did not enjoy the interface of goose or of OpenCode. A spike read twenty-one open-source agents against the lane's eight requirements: the `CLAUDE.md` map, the three guards with block and ask, the board and router whose output reaches the model, the two skills folders, the allow list, any provider, CLI plus desktop plus worktrees, and open source with a steward and no account. Hermes Agent (Nous Research, MIT) meets the most of them together: shell hooks with an `approve` that escalates to the human gate, `command_allowlist` globs and `approvals.deny`, `CLAUDE.md` read per folder, every provider including local models, a Linux desktop built from the same repository, and telemetry that is off by default and opt-in in source. Its costs: the memory and skill writers run freely by default, worktrees land inside the repo, keys live in a plaintext `~/.hermes/.env`, and the project is very large with one dominant author. Jamie leans to Hermes and asked for two things first: assurance that it is open source in full, and whether its writers could serve the house if left on. The assessment of 2026-10-29 answers both: the licence, the code and the telemetry are open and clean, with paid services beside them that the lane does not use; the writers stay on with approval, with a scratch target for skills and one line in the system prompt that names the folder as the record. The trial is stub `hermes-loop-walk`. Goose stays until it passes.

The spike also found that nine of eleven agents read `AGENTS.md` by default. Jamie: the blueprint renders a one-line `AGENTS.md` that points at `CLAUDE.md`, beside `.goosehints` (triage stub `agents-md-pointer`).

Re-cut again on 2026-10-29, in the spec of `goose-task-script`. Jamie: remove every reference to Emdash and to goose, keep the names `goose-task` and `~/goose/worktrees/`. Goose and Emdash leave the stack, the blueprint and the machine now. Hermes Agent is the lane's agent, and its trial still proves the loop. The decisions below are rewritten in place.

### Questions for Jamie

Answered by Jamie in the session on 2026-10-29: the seven defaults stand, and they are written into the decisions below. Answered again on 2026-10-29 in the review (Q4 to Q6): the why of goose, the loop as the condition, the blueprint carries local-agent files. Answered a third time the same evening, after the spike: the dislike was the feel of the interface, not a feature; the trial is Hermes Agent alone; the writers stay on with approval; the blueprint renders `AGENTS.md`. None is open.

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

- **One application per lane.** Hermes Agent is the agent of the local lane. Claude Code keeps the cloud and phone lane (why: the local agent has no hosted session, and every module runs from anywhere · Jamie, 2026-10-29).
- **The lane's agent is provider-independent.** It runs on Jamie's machine on the model he chooses, today Claude through the API on a 200-dollar credit. It is the replacement for Claude Code when the weekly usage runs out or the subscription ends (why: Jamie's words, 2026-10-29. One agent bound to one vendor's subscription is one point of failure for the whole lane).
- **The lane completes the loop, or the agent changes.** A loop walk proves step 0 to step 7 of `.icm/intake/CONTEXT.md` in the lane's agent, on a live repo and on the house. A gap with no fix names the next agent to test, and Emdash stays until then (why: Jamie's answer to Q5, 2026-10-29. A lane that stops one step short is two lanes).
- **Goose and Emdash leave the lane now, and Hermes Agent takes it.** Every reference to goose and Emdash leaves `~/.claude/CLAUDE.md`, the lane script, `core/stack.md` and the blueprint. The trial `hermes-loop-walk` still proves the loop. Qwen Code is the next to try if Hermes fails a requirement with no shim (why: Jamie's answer in the spec of `goose-task-script`, 2026-10-29. Jamie did not enjoy goose's or OpenCode's interface, and the spike of 2026-10-29 put Hermes first on the eight requirements). This replaces "goose holds the lane until the trial passes".
- **Hermes's writers stay on, with approval.** `memory.write_approval` and `skills.write_approval` are true, new skills land in a scratch folder outside every repo, and the system prompt says that a client's facts are never saved to memory (why: `USER.md` is the same gain as Claude Code's auto-memory, and an unreviewed note or skill is a second home that drifts, against one home per fact · Jamie, 2026-10-29).
- **The lane's worktrees are the lane script's, never the agent's.** Hermes's `.worktrees/` inside the repo is not used (why: a worktree never sits beside or inside a repo, `~/.claude/CLAUDE.md` § Worktrees · 2026-10-29).
- **The lane script is agent-agnostic.** One function at the top names the agent (why: one script for the folder, whatever runs in it · Jamie, 2026-10-29).
- **The lane script is `ticket`, and its folder is `~/worktrees/`.** This replaces "its name `goose-task` and its folder `~/goose/worktrees/` stay" (why: goose left the machine, and a name that says what it does needs no explanation · Jamie, 2026-10-29, triage stub `ticket-command`).
- **The blueprint carries the local agent's files.** `.icm/scripts/worktree-setup.sh` stays in the template. `.goosehints` and `.emdash.json` leave in stub `blueprint-new-run-in-worktree`, and `AGENTS.md` is the agent map (triage stub `agents-md-pointer`) (why: Jamie's answer to Q6 and to the spec of `goose-task-script`, 2026-10-29. A client's build opens in the agent Jamie runs, and the file that maps it travels with the build).
- **Emdash leaves.** The worktree per ticket stays (why: Jamie runs tickets on one repo in parallel, and two applications for one lane is what he does not want · Jamie, 2026-10-29).
- **Goose and Goose Desktop leave the machine** with Emdash, by Jamie's hand (`README.md` § Jamie's hand) (why: Jamie's answer in the spec of `goose-task-script`, 2026-10-29).
- **One script does what Emdash did**, deterministic and in a repo: the worktree, the env copy, the install, the agent session, the removal. It decides nothing about the ticket (why: the agents put worktrees inside the repo or outside themselves, and a script in the house is reviewed and reverted like any file · 2026-10-29).
- **The worktree's branch is the ticket's branch.** `new-run.sh` makes no branch inside a worktree (why: one ticket is one branch, and the branch exists before the session · 2026-10-29).
- **CI is truth is unchanged.** The script runs the install from the lockfile and nothing else.
- **The epic is fourth in `README.md` § Order**, after `blueprint-environments` (Jamie, 2026-10-29).
- **The worktrees live in `~/worktrees/<repo>/<slug>/`**, one folder per repo, one worktree per ticket (why: one folder that the script and the reaper both know, outside every repo and outside `~/Desktop` · Jamie, 2026-10-29).
- **The script is `core/setup/ticket.sh`**, installed to `~/.local/bin/ticket` by `core/setup/local.sh` (why: a repo holds it, reviews it and reverts it, and a fresh machine gets it from the stack · Jamie, 2026-10-29).
- **The worktree's branch is `<slug>` or `triage/<slug>`**, the names `new-run.sh` uses. The script reuses the branch when it exists on `origin` (why: the worktree's branch and the ticket's branch are one name · Jamie, 2026-10-29).
- **`ticket done <repo-path> <slug>` removes a worktree** when it is clean and pushed, after the pull request merges. `~/.claude/hooks/reap-worktrees.sh` is the backstop at 24 hours (why: the person who finished the ticket removes its folder, and the reaper catches what was forgotten · Jamie, 2026-10-29).
- **`.emdash.json` leaves the blueprint in stub `blueprint-new-run-in-worktree`.** `worktree-setup.sh` stays (why: no tool reads the file once Emdash leaves, and `goose-task` calls the script · Jamie, 2026-10-29).
- **Emdash leaves the machine now**, with goose, by Jamie's hand. This replaces "after `goose-loop-walk` is green" (why: Jamie's answer in the spec of `goose-task-script`, 2026-10-29).

## Build order

1. goose-task-script — the house gets `core/setup/goose-task.sh`, `local.sh` installs it, and `core/stack.md` names the script and the worktree folder — depends-on: none
2. plugin-router-and-board — the board and the router reach the model in a Hermes session on a build, or the stub says what Hermes cannot do — depends-on: none
3. blueprint-new-run-in-worktree — done: `new-run.sh` keeps the worktree's branch, and `.emdash.json` and `.goosehints` leave the blueprint (blueprint#43, in `v1.3.0`) — depends-on: goose-task-script
4. emdash-leaves — dropped 2026-10-29: `goose-task-script` removed goose and Emdash from the stack, and the machine acts are in `README.md` § Jamie's hand — depends-on: none
5. estate-worktree-files — done: each live repo loses `.emdash.json` and keeps the setup script, in the conformance to the new tag — depends-on: blueprint-new-run-in-worktree
7. hermes-loop-walk — a Hermes session takes one live repo ticket and one house ticket to the merge, scored on the eight requirements, with the writers' pass mark — depends-on: blueprint-new-run-in-worktree

Stub 4, `emdash-leaves`, and stub 6, `goose-loop-walk`, are dropped in `_done/`. A dropped or re-cut stub keeps its number (`.icm/intake/CONTEXT.md`).

## Out of scope

- Hermes's own desktop app. The lane opens it or the CLI, as Jamie likes.
- The cloud and phone lane. Claude Code keeps it as today.
- A view of several sessions at once. Terminal tabs and `ticket list` are the view.
- A recipe or skill of the agent that starts a ticket. The script is enough this round.
- `AGENTS.md` in `library` and `.github`: the triage stub `goosehints-library-and-github`. `AGENTS.md` in the blueprint and the house: the triage stub `agents-md-pointer`.
- Hermes's gateway, cron, dashboard, Cloud and Portal. The lane uses none.
- The stack row's why for the other tools: the triage stub `tool-why-home`.
