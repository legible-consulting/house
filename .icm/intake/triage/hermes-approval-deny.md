# Stub: Deny at the Hermes approval prompt stops the command

- lane: bug
- found-by: the trials of `triage/hermes-cheap-models` · 2026-10-30
- complexity: medium
- priority: P0
- note: 2026-10-31, Jamie: Hermes is frozen, and this test is the one Hermes act that stays. It is in `README.md` § Jamie's hand with the force-push test of `_done/hermes-force-push-allow.md`

## Problem

On 2026-10-30 a Hermes session on the profile `legible` ran `git push origin main`. The guard `confirm-git-writes.sh` returned `approve`, and the prompt "Dangerous Command, plugin approval rule" showed four choices. The session that drove the prompt selected "4. Deny" and pressed Enter. The push ran. In the house the push failed on its own (non-fast-forward), and in a scratch repo it reached the remote. `approvals.mode` is `manual`, and `command_allowlist` holds no `plugin_rule:` entry. The keys came through a pseudo-terminal, so the selection may not have reached Hermes as a person's keys do.

## Proposed change

Jamie repeats the test by hand in a terminal, on a scratch repo with a bare remote. When Deny lets the push run, the session reads `tools/approval.py` and the CLI prompt, writes an upstream issue, and the lane sets `approvals.deny` patterns for the pushes that must never run until a fix lands.

## Acceptance criteria

- [ ] Jamie's hand test is recorded in this stub's `_done/` copy: Deny stopped the push, or it did not.
- [ ] When it did not: the upstream issue link is in the stub, and `core/stack.md` § The Hermes profile names the interim rule.
- [ ] A Hermes session that gets Deny at the prompt does not run the command, and reports it as denied.
