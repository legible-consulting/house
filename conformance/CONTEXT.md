---
status: built
holds:
  - "*.sh"
---
# Estate conformance

Conformance produces a report that every live repo matches the blueprint and carries only the Claude assets it uses, and that every dormant repo is archived, secret-free and named, so that the estate is in order and drift is known before it costs anything.

## Inputs

- `desk/mani.yaml`, hand-written: every client build, with its tags.
- `legible-consulting/blueprint` tags (what "conformant" means).

## Process

- Start cold from this folder. Read only what Inputs names.
- Conformant means: the default branch's `.copier-answers.yml` names the latest blueprint tag.
  A repo built before the blueprint has no answers file and is adopted: the PR adds only that
  file, from its client record, so no file of its own changes and later tags reach it by
  `copier update` (why: the live repos predate the blueprint; overwriting them to conform
  would be a rebuild, not a check · 2026-10-16).
- `desk/mani.yaml` tags each repo `live` or `dormant`. A live repo is checked against the
  blueprint tag. A dormant repo is checked for being archived and gets no PR (why: an
  archived repo changes no more, so a template update would only reopen it · 2026-10-19).
- Claude and agent assets (`.claude/`, `CLAUDE.md`, `AGENTS.md`, `.icm/`, `.opencode/` and
  the like) are listed in the report, not removed: whether one is still used is Jamie's call.
- From the local lane, Jamie's own `gh` login: `bash conformance/drift.sh` writes the
  report. Then do these steps for one drifted repo at a time, with `<tag>` the blueprint tag
  and `<branch>` `conformance/blueprint-<tag>`:
  1. `git -C projects/<slug> fetch origin`, then
     `git -C projects/<slug> worktree add -b <branch> <scratchpad>/<slug> origin/main`.
  2. In the worktree: `REPOSITORY=k0d0minio/<repo> bash <house>/conformance/conform.sh`.
     Stop on a conflict marker, and show it to Jamie.
  3. A build (it has `.icm/intake/`) also gets the stub
     `.icm/intake/triage/_done/conform-to-blueprint-<tag>.md`. The PR body's `- ticket:`
     line names its open path, `.icm/intake/triage/conform-to-blueprint-<tag>.md` (why: the
     `gate / contract` check fails a body with no ticket line that names a stub · 2026-10-28).
  4. Stage the changed files by path, commit, `git push -u origin <branch>`, then
     `gh pr create --repo k0d0minio/<repo> --base main --head <branch> --body-file <body>`.
     The body is the repo's `.github/pull_request_template.md`, filled in.
  5. `git -C projects/<slug> worktree remove <scratchpad>/<slug>`.

  (why: a `gh pr create` that the session runs binds the PR to the session, and the app
  watches its CI; a worktree of the local clone needs no new clone, so a large repo is fast ·
  2026-10-28). Opening a PR is remote, so the run is Jamie's hand; the merge is the gate.

## Outputs

- `desk/estate/drift-<date>.md`.
- One PR per drifted repo (`conform.sh` in a worktree, opened with `gh pr create`); the gate stays human.
- Runs from the local lane (`~/Desktop/legible-consulting/projects/<slug>/`), Jamie's hand.
