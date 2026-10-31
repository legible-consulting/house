# Stub: The house names no lane script, and a session makes a worktree only in its scratchpad

- feature-slug: house-ticket-leaves
- epic: ticket-leaves
- sequence: 1 of 4
- depends-on: none
- complexity: low
- priority: P2

## Problem

`core/setup/ticket.sh` makes a worktree in `~/worktrees/`, copies the env files, runs an install, edits the Hermes profile's config and starts a Hermes chat. The breakdown says why it leaves. The house still names it in `core/stack.md`, `core/setup/local.sh`, `core/setup/hermes/SOUL.md`, `core/setup/hermes/config.yaml` and the triage stub `hermes-models-trials`.

## Proposed change

Remove the script and every line of the house that names it or `~/worktrees/`. Write the rule that replaces it in `core/stack.md`: a session works on its ticket's branch in the primary clone, and a session that needs a separate checkout makes a worktree in its scratchpad. Close out `goose-worktrees`.

## Acceptance criteria

- [ ] `core/setup/ticket.sh` does not exist.
- [ ] `core/setup/local.sh` makes no link `~/.local/bin/ticket`. It removes the link when the link points at no file.
- [ ] `core/stack.md` has no row for `ticket` and none for `~/worktrees/`. § Local machine states the scratchpad rule with its why and date. The `skills.external_dirs` paragraph no longer says that a script adds and removes lines.
- [ ] `core/setup/hermes/SOUL.md` names no `ticket` and no `~/worktrees/`.
- [ ] `core/setup/hermes/config.yaml` names no `ticket done`. Its `skills.external_dirs` lists `~/.claude/skills` and the `.claude/skills` of each primary clone under `~/Desktop/legible-consulting/` that has one, with a comment that says why.
- [ ] `triage/hermes-models-trials.md` runs its trial "in a Hermes session on the profile `legible`", not "through `ticket`".
- [ ] `goose-worktrees/` is in `.icm/intake/_done/`. Its breakdown has one line at the top that says `ticket-leaves` replaces its decisions about the lane script. `README.md` loses its row text about the script and its line in § Order.
- [ ] `git grep -n -E "\bticket (<|done|list)|~/worktrees|ticket\.sh"` finds nothing outside `.icm/intake/_done/` and this epic.

## Out of scope

- The blueprint and the live repos: stubs 2 and 3.
- The files outside the repo: stub 4.

## Notes

- One pull request on the house. `chore:` type.
- The closed records in `.icm/intake/_done/` keep their words. They are history.
