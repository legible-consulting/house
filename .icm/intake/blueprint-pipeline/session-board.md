# Stub: A session in a build opens knowing the open tickets, their order and what is started

- feature-slug: session-board
- epic: blueprint-pipeline
- sequence: 7 of 13
- depends-on: none
- complexity: low
- priority: P1

## Problem

A cold session does not see the board. The loop's step 1 sends it to `README.md § Order`, but nothing says how many stubs are open, which one is next in each epic, or which ticket already has a branch. The legacy `session-start.sh` printed this in a few lines, read-only, and it passed the walk test's fresh-session check.

## Proposed change

A read-only `SessionStart` hook, build only. No network. Exit 0 always. Silent when `.icm/intake/` holds no open stub.

## Acceptance criteria

- [ ] `template/.claude/hooks/{% if not workspace %}session-start.sh{% endif %}` exists, mode 755, shellcheck clean, under 60 lines. Unit 1's commented `SessionStart` registration is uncommented.
- [ ] It prints one line per open epic: the epic, the count of open stubs, the next stub by the lowest `sequence` that has no `blocked:` line. Then one line for triage: the count by lane. Then the `## Order` list from `.icm/intake/README.md`, when present, as it is. Then one line per started ticket: a stub in a `_done/` folder whose branch `<slug>` or `triage/<slug>` exists in `refs/heads` or `refs/remotes/origin`, with the branch name. Then one closing line: the total, and that planning lives in `.icm/intake/` and never in a loose `TODO.md`.
- [ ] It reads files and `git for-each-ref` only. No `gh`, no fetch, no `curl`.
- [ ] A missing `README.md`, a stub with no `sequence` line, or no `.git` folder never makes it fail or print an error.
- [ ] `check.yml`: in a rendered build with a fixture of two epics and one triage stub it prints the expected lines, and the file is absent in a workspace.

## Out of scope

- The house's own board: Jamie said no.

## Notes

Read first: the breakdown, the intake contract (§ The order of the epics, § The loop step 1), and the legacy `session-start.sh` in `~/Desktop/Apps/_system/template/claude/hooks/` or `k0d0minio/icm-board`. The legacy's rsync install, the Vercel hydrate call, the skills registry and the legacy-ticket count leave. The epic loop and the triage count stay.

## Prompt

Repo legible-consulting/blueprint, cloud or desktop. Attach legible-consulting/house read-only. Read CLAUDE.md, README.md and conventions/README.md in the blueprint, then .icm/intake/blueprint-pipeline/breakdown.md in the house whole, then this ticket, .icm/intake/blueprint-pipeline/session-board.md, then the files its Notes name. Do what it says. One branch, one pull request to main in the blueprint, Conventional Commits, technical text in Simplified Technical English. Render the proof sets into a scratch folder with copier and run the hook there with a fixture. Read check.yml. Do not merge. Then one pull request in the house that moves this stub to .icm/intake/blueprint-pipeline/_done/, the one write to the house. Your last message names both pull requests and what waits on Jamie.
