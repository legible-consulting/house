# Breakdown: The lane script `ticket` leaves the stack, and a worktree is one git command

- epic-slug: ticket-leaves
- source: Jamie, 2026-10-30, in the session that took `triage/project-register-in-blueprint`: "this ticket system seems to have completely derailed your ability to work and operate. Let's backtrack on this idea and justify its existence or get rid of it to simplify the stack." The session read `core/setup/ticket.sh`, `core/stack.md`, the `goose-worktrees` breakdown, the blueprint's `worktree-setup.sh` and `check.yml`, and the record of the day's three `ticket` runs. Jamie chose removal the same day.

## What I understood

`ticket` came from the `goose-worktrees` epic. It replaced what Emdash did: a worktree per ticket in `~/worktrees/`, a copy of `.env` and `.env.local`, an install from the lockfile, the worktree's skills in the Hermes profile, and a Hermes session started in the worktree. Jamie wants it gone, because it costs more than it gives:

1. The env copy and the install serve only a local run. The rule "CI is truth" forbids a local run. A worktree for an agent needs only `git worktree add`.
2. It joins two jobs. It always starts an interactive Hermes chat, with no way to turn that off. On 2026-10-30 a chat that `ticket` started with no terminal ran a turn by itself and cherry-picked a commit. The chat also fixed the session's model, so `-m` failed on the next resume.
3. `ticket done` refuses after every merge. The estate merges by squash, so the branch's commits are never on `origin`, and the script reads them as unpushed. Worktrees stay in `~/worktrees/` for that reason.
4. It writes each worktree's skills folder into the profile's `skills.external_dirs`, so the profile's `config.yaml` differs from the house copy while a worktree exists.
5. It is a fourth way to make a worktree, beside the scratchpad rule, Claude Code's `EnterWorktree` and the reaper.

What replaces it: a session works on its ticket's branch in the primary clone. A session that needs a separate checkout makes a worktree in its scratchpad and removes it after the push. `new-run.sh` already takes the branch of a worktree, so the loop does not change.

What stays from `goose-worktrees`: Hermes Agent is the agent of the local lane. Only the script and its folder leave.

### Questions for Jamie

1. Where does the epic go in `README.md` § Order? Default: second, after `triage`. It removes files and rows that `google-service-account` also edits in `core/stack.md`, so it goes first.
2. Does `.icm/scripts/worktree-setup.sh` leave the blueprint too? Default: yes. Nothing calls it once `ticket` leaves.
3. Does a session ever install dependencies in a worktree? Default: no. CI is truth, so no local command needs `node_modules`.
4. Who removes the worktrees left in `~/worktrees/`? Default: the session of stub `worktrees-folder-leaves`, after the pull request of each one is merged or closed. A worktree with work that is not on `origin` stays, and the session names it.
5. How do a repo's skills reach a Hermes session after `ticket` leaves? Default: the house copy of `config.yaml` lists each primary clone's `.claude/skills` in `skills.external_dirs`. The other answer: the blueprint renders `.agents/skills` as a link to `.claude/skills`, and Jamie runs `hermes skills trust` once in each repo. That one changes every repo and needs a tag.
6. Does `goose-worktrees` close out in the first stub? Default: yes. It has no open stub, and its decisions about `ticket` get one line that says this epic replaces them.

Classification of the open epics, for question 1 (2026-10-30):

| Epic | Open | P0 | Serves | Links | Files |
|---|---|---|---|---|---|
| triage | 7 | 1 | the estate's env cleanup, the Hermes trials and guards, the stub's Prompt section, the skill review | `hermes-models-trials` names `ticket`; stub `house-ticket-leaves` edits it | Vercel and Neon settings, `core/setup/hermes/` |
| goose-worktrees | 0 | 0 | done; waits on its close-out | its `ticket` decisions are replaced here | none |
| google-service-account | 3 | 0 | Google from any runner, without a connector | none | `core/stack.md`, `core/setup/local.sh`, `.env.example` |
| ticket-leaves | 4 | 0 | a simpler stack: one way to make a worktree | replaces the `ticket` decisions of `goose-worktrees` | `core/stack.md`, `core/setup/`, blueprint `template/.icm/scripts/`, `check.yml`, each live repo |

## Decisions of record

- **`ticket` leaves the stack.** `core/setup/ticket.sh`, `~/.local/bin/ticket` and `~/worktrees/` go (why: its env copy and install serve a run that CI-is-truth forbids, `ticket done` cannot work with squash merges, and it is a fourth way to make a worktree · Jamie, 2026-10-30). This replaces the decisions of `goose-worktrees` about the lane script, its folder and its removal.
- **A session works in the primary clone, on its ticket's branch.** A session that needs a separate checkout makes a worktree in its scratchpad and removes it after the push. `~/.claude/hooks/reap-worktrees.sh` stays the backstop at 24 hours (why: one way to make a worktree, already in `~/.claude/CLAUDE.md` § Worktrees · 2026-10-30).
- **A worktree gets no install and no env copy** (why: CI is truth, and no command a session may run needs `node_modules` or a secret · 2026-10-30).
- **The skills of a repo reach Hermes through a fixed list.** Hermes reads project skills only from `.hermes/skills` and `.agents/skills`, and only in a trusted repo (`agent/skill_utils.py`, Hermes v0.22.5). The estate keeps its skills in `.claude/skills`. The house copy of `config.yaml` lists `~/.claude/skills` and the `.claude/skills` of each primary clone under `~/Desktop/legible-consulting/`, and nothing writes to the list at run time (why: `ticket` was the only thing that gave a session its repo's skills, and a list that a script rewrites drifts from its copy · 2026-10-30).
- **`new-run.sh` does not change.** It cuts a branch on `main` and takes the branch of a worktree (why: the loop already works without the script · 2026-10-30).

## Build order

1. house-ticket-leaves — the house loses the script, its link, its rows and its words, and `goose-worktrees` closes out — depends-on: none
2. blueprint-worktree-setup-leaves — the blueprint loses `worktree-setup.sh`, its row, its check and every word about the lane script, in a new tag — depends-on: house-ticket-leaves
3. estate-conforms — each live repo loses `worktree-setup.sh` by `copier update` to the new tag — depends-on: blueprint-worktree-setup-leaves
4. worktrees-folder-leaves — the machine loses `~/worktrees/`, the link and the folder's lines in the global files — depends-on: house-ticket-leaves

## Out of scope

- Hermes's own `--worktree` flag. It puts a worktree inside the repo, against `~/.claude/CLAUDE.md` § Worktrees. No stub uses it.
- A way to run several sessions on one repo at once. Scratchpad worktrees do it when it is needed.
- The choice of the lane's agent. Hermes stays.
