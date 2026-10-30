# Stub: The Zen trial, R6 and the verdict of the Hermes models finish

- lane: chore
- found-by: `triage/hermes-cheap-models`, merged with its trials open · 2026-10-30
- complexity: research
- priority: P1

## Problem

`research/verdicts/hermes-models.md` says `watch`. The trials of 2026-10-30 ran one finalist only: Haiku built `triage/tool-why-home` (house#225) for about 0.03 dollars, and the guards blocked `npm test` and a key write. Three things stay open:

1. `/model glm-5.3-flash --provider opencode-zen` failed with `model_resolution_failed`, and a single query said "No usable credentials found for provider 'opencode-zen'", while `hermes -p legible doctor` reports the key. The default profile's gateway (running since 2026-10-29 14:30) may hold the old environment.
2. R6, the switch from Anthropic to a second provider in the middle of a session, did not happen.
3. Deny at the approval prompt did not stop a push (triage stub `hermes-approval-deny`).

## Proposed change

After Jamie restarts the gateway and `hermes-approval-deny` is read, a session runs the Zen trial on one open house stub through `ticket`, switches one session from Anthropic to Zen with `/model`, and writes the verdict.

## Acceptance criteria

- [ ] `glm-5.3-flash` on OpenCode Zen took one house stub through `ticket`. The record says: the guards' block and approve, `AGENTS.md` followed, the skills loaded, the cost from the OpenCode usage page, and where it failed.
- [ ] R6: `/model` switched from Anthropic to OpenCode Zen in the middle of one session, and the ticket continued.
- [ ] The Haiku record of 2026-10-30 has its cost from the Anthropic usage page.
- [ ] `research/verdicts/hermes-models.md` names the default model, the model for the light turns and the fallback provider, each with its why, and its `verdict:` is `adopt` or `decline`.
