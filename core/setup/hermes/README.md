# Hermes — the parked local-lane agent

Hermes Agent is the agent of the local lane on the profile `legible`: an agent on Jamie's
machine on the model he chooses, for when the Claude usage runs out or the subscription ends.
The verdict is `watch` (`research/verdicts/hermes-agent.md`, `hermes-models.md`). Parked
since 2026-10-31: no session works on Hermes until a client ticket needs the local lane. The
open Hermes stubs in `.icm/intake/triage/` are parked with it. This file is the one home of
what the profile holds, so that `stack.md` carries one row. The why of each rule is in
`../../why.md`.

## Install

`curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`. It clones the agent into
`~/.hermes/hermes-agent/` and puts `hermes` in `~/.local/bin/`. Approvals are `manual`. The
memory and skill writers stay on with approval, and a new skill lands in the profile's
`scratch-skills/`. The loop walk of 2026-10-29 took one house ticket and one `jamienisbet`
ticket to the merge: `.icm/intake/_done/goose-worktrees/_done/hermes-loop-walk.md`.

## The profile folder

`~/.hermes/profiles/legible/` is the profile. Four of its files have their home here (§ The
profile files). The rest is Hermes's own state: sessions, `state.db`, the hook allowlist,
caches. `config.yaml` reads each provider key from the keyring, and the keyring value wins.
The named exception: `~/.hermes/.env` and the profile's own `.env` stay on this machine with
their plaintext keys.

## Provider keys

The profile reads each provider key from one system keyring item with service `hermes` and
the Hermes provider as username, never from a file. Store each key with
`secret-tool store --label='Hermes <Provider> key' service hermes username <provider>`, which
reads the key from the prompt. The profile uses three providers
(`research/verdicts/hermes-models.md`, 2026-10-29):

| Provider | Keyring username | Variable |
|---|---|---|
| Anthropic | `anthropic` | `ANTHROPIC_API_KEY` |
| OpenCode Zen | `opencode-zen` | `OPENCODE_ZEN_API_KEY` |
| Vercel AI Gateway, the house only | `ai-gateway` | `AI_GATEWAY_API_KEY` |

The profile's `config.yaml` reads all three with `secrets.command`, one `secret-tool lookup`
for each item, printed as one `KEY=VALUE` line each at startup. `override_existing` is `true`,
so the keyring value beats a value in a `.env`. Check: `hermes -p legible doctor` reports
"Command helper: applied 3 secrets", "✓ Anthropic API", "✓ OpenCode Zen" and "✓ Vercel AI
Gateway".

## The hooks under Hermes

Hermes Agent does not read `.claude/settings.json`. The profile runs the same repo hooks from
two files in the profile folder, registered under `hooks:` in its `config.yaml`. Neither file
holds a copy of a hook.

| Profile file | Hermes event | Runs | Claude Code event |
|---|---|---|---|
| `guard-adapter.sh` | `pre_tool_call` (`terminal`, `write_file`, `patch`) | the three guards, the repo copy first. A guard `deny` is `block`, a guard `ask` is `approve` | PreToolUse |
| `board-context.sh` | `pre_llm_call`, first turn | the build's `.claude/hooks/session-start.sh`. Its output reaches the model as context | SessionStart |
| `board-context.sh` | `pre_llm_call`, each turn | the build's `.claude/hooks/route-request.sh` with the prompt. Its `[router]` line reaches the model as context | UserPromptSubmit |

`board-context.sh` prints nothing where the session's folder has no `.claude/hooks/`, or has
neither script.

A new or changed hook command or script is not allowlisted: Hermes asks once per hook at the
next session's prompt, and the hook does not fire until Jamie approves it. `hermes -p legible
hooks doctor` shows the state.

Both scripts read the session's `cwd` from the profile's `state.db` (`sessions.cwd` by
`session_id`), and the payload's `cwd` is the fallback. The upstream issue is
https://github.com/NousResearch/hermes-agent/issues/146570. When a Hermes release fixes it, the
lookup leaves both scripts.

## The profile files

The four files beside this README are the profile's files that no install writes.
`setup/local.sh` copies a missing file into the profile, and all four into a profile that it
creates. It never overwrites a file that is present, and it names a file that differs. Carry a
change made on the machine into the house by hand.

| File | Holds |
|---|---|
| `config.yaml` | the provider and model, `secrets.command` (one keyring item for each provider, with `override_existing: true`), the approvals and their deny list, the command allow list, memory and skill writes behind approval, `skills.external_dirs`, no `plugin_rule:` entry for a guard, no `command_allowlist` key of a Hermes dangerous pattern that force-pushes or rewrites history, the four hooks, the plugins, the MCP servers and the toolsets. No key, and no path but `~/.hermes/profiles/legible`, `~/.claude/skills` and the live repos' `.claude/skills` under `~/Desktop/legible-consulting/projects/`. A hook command starts with `~` |
| `SOUL.md` | the profile's standing prompt: Jamie's global working standards |
| `guard-adapter.sh` | the three guards for Hermes (the hooks table above) |
| `board-context.sh` | the board and the router for Hermes (the hooks table above) |

`skills.external_dirs` lists `~/.claude/skills` and the `.claude/skills` of each live repo's
primary clone under `~/Desktop/legible-consulting/projects/` (`desk/mani.yaml`), and nothing
writes to the list at run time.
