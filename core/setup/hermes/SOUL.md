# Global working standards — Jamie Nisbet

Solo software engineer & AI consultant, based in Mafra, Portugal. These are standing
conventions that apply across every project. They are working standards only — client,
deal, and brand specifics live in each project's own repo, not here.

## How my repos are organised
- My repos follow the Interpretable Context Methodology: **the folder tree is the
  orchestration.** A repo's `CLAUDE.md` says who we are and routes; each stage folder's
  `CONTEXT.md` is its contract. Read the contract you are routed to, then only what its
  Inputs name.
- **The repo owns its words and rules.** Where a repo and this file disagree, the repo
  wins. Legible Consulting's vocabulary is defined once in `house` `core/lexicon.md`.
- **Never build an orchestrator.** No scripts or frameworks to "drive" a pipeline — the
  folders and contracts are it. Adopt an existing run or stop; never fabricate one.
- **Gates are human checkboxes.** Read them; never tick them.
- This global layer is deliberately thin: no global agents or pipeline tooling, and one
  global skill (the writing skill below). Everything else belongs to each repo so nothing
  loads twice or shadows a repo's tuned version.
  The guards in `~/.claude/hooks/` are listed in `house` `core/stack.md`; a repo that
  commits its own copy of a guard overrides the global one.

## Worktrees
- Make a worktree only in your scratchpad, or with EnterWorktree. Never make a worktree
  beside a repo (no `<repo>-wt-*` folders) or in another folder under `~/Desktop`.
- When your work in a worktree is pushed, remove the worktree with
  `git worktree remove <path>` before you end the session. The branch stays.
- `~/.claude/hooks/reap-worktrees.sh` removes the worktrees that a session leaves behind,
  after 24 hours with no commit.

## CI is the source of truth
- **Never run local checks** — no `build`, `lint`, `typecheck`, `test`, `format`, `tsc`,
  `next build`, or `dev` — unless I explicitly ask for it. This holds even when CI fails
  citing those errors. Your job ends at `git push`; read results from CI, not locally.

## Security posture
- Never store secrets, tokens, or API keys in plaintext in config or committed files. Use
  environment variables.
- If you find a plaintext credential anywhere, **flag it to me** rather than leaving it.

## Writing
- Technical text follows the ASD-STE100 skill at `~/.claude/skills/asd-ste100`: docs,
  contracts, reports, commit messages, PR bodies, hook and error text. Use its STE-flavored
  mode by default. Use Strict mode for procedures, hook messages and tool descriptions. Keep
  every hedge and every condition. Chat that is not technical stays casual and
  straightforward.
- That skill is the one global skill, because it governs how Claude writes to me in every
  repo (2026-10-19).

## Working style
- Each project owns its own brand and conventions — do **not** try to enforce consistency
  across projects.
- Prefer concise output. Offload multi-file searches to Explore subagents. Fix the source,
  not the symptom.

A client's facts are never saved to memory. The folder is the record. Memory holds how Jamie works, nothing about a client, a deal or a repo.
