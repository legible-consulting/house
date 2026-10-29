# Stub: The Hermes profile `legible` runs on the cheapest models that can do the lane's work, with a second provider ready

- lane: chore
- found-by: Jamie, in the session that closed `hermes-profile-files` · 2026-10-29
- complexity: research
- priority: P2

## Problem

The profile `legible` has one provider: Anthropic by API key, on the 200-dollar credit (`goose-worktrees/breakdown.md`, Decisions of record). The lane's agent must replace Claude Code when the weekly usage runs out or the subscription ends, so the lane must not depend on one vendor or one credit. Jamie wants to know which models are the cheapest and the easiest to get for Hermes. Requirement R6 of `goose-worktrees/hermes-loop-walk` (`/model` to a second provider in the middle of a session) moved here on 2026-10-29, because it waits on the same choice.

## Proposed change

A research session reads the providers that Hermes v0.22.5 supports and compares the candidates on the lane's work. Then it tries the finalists on one house triage stub each, and writes the verdict. Candidates to read, at the minimum: OpenRouter (and its free models), the open-weight models from DeepSeek, Qwen, Kimi (Moonshot) and GLM (Z.ai), Google Gemini, Groq and Cerebras, Mistral, and a local model through Ollama on this laptop. Nous Portal is read as a fact only. The session spends no money and makes no account: each sign-up and each key is Jamie's hand.

## Acceptance criteria

- [ ] A table in `research/verdicts/hermes-models.md` (the research contract's shape, `kind: service`, `use: [house]`): for each candidate, the price per million input and output tokens with the date read, the context length, tool calling in Hermes (native or not), the data policy (training on inputs, retention, region), and what Jamie needs to get a key (sign-up, card, waiting list, access from Portugal). Each row cites its source.
- [ ] Each finalist ran one house triage stub in a Hermes session on the profile `legible`, through `goose-task`. The record says, for each one: the guards' `block` and `approve` reached the model and the gate, `AGENTS.md` and the router were followed, the skills loaded, the cost of the run from the provider's usage page, and where it failed.
- [ ] R6: `/model` switched from Anthropic to a second provider in the middle of one of these sessions, and the ticket continued.
- [ ] The verdict names a default model for a ticket, a cheaper model for the light turns if one passed, and a fallback provider, each with the why. A model that fails the guards or the tool calls is declined, whatever its price.
- [ ] `core/stack.md` § The Hermes profile names each provider the profile uses and the key's home. Each key is a keyring item with service `hermes` and the provider as username, read by `secrets.command`, never a `.env` (why: `hermes-profile-files`, 2026-10-29). `core/setup/hermes/config.yaml` gets the same lines, and the profile's copy stays equal to it.

## Questions

1. What is the monthly ceiling for the lane's models? Default: 20 dollars, so a free or very cheap tier is the first look, and Anthropic stays for the work the cheaper models fail.
2. May a provider that trains on its inputs see a client repo? Default: no. A provider that trains on inputs serves the house only, never a client build, because a client's words and code stay inside the business (`CLAUDE.md` Boundaries).
3. Is a local model in scope? Default: yes, one model through Ollama, if the laptop runs it at a usable speed. It costs nothing per token and needs no account.

## Out of scope

- The cloud and phone lane. Claude Code keeps it.
- A paid plan or a top-up. Jamie decides and pays (`CLAUDE.md` Boundaries: never spend money).
- Hermes's smart model routing (`smart_model_routing`). It stays off until the verdict names two models that pass.

## Notes

- The keyring helper today prints one line, `ANTHROPIC_API_KEY=<key>`. A second key needs a second `secret-tool lookup` line in `secrets.command`, or a second helper.
- The writers' approvals, the hooks and the guards are the same on every model. A model that ignores a hook's `context` fails R3 again on that model, so the trial reads it again.
