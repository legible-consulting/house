---
status: built
holds:
  - "*.sh"
---
# Estate conformance

Conformance produces a report that every live repo matches the blueprint, has its answers backed by the platform, and carries only the Claude assets it uses, and that every dormant repo is archived, secret-free and named, so that the estate is in order and drift is known before it costs anything.

## Inputs

- `desk/mani.yaml`, hand-written: every client build, with its tags, its Vercel team
  (`vercel:`) and its Neon organisation (`neon:`).
- `legible-consulting/blueprint` tags, and the blueprint's `.icm/database/CONTEXT.md` for the
  names of the Neon projects.
- Each live repo's `.copier-answers.yml` and `.icm/environments.md` on its default branch.
- The Vercel and Neon APIs, read only, with the tokens below.

## Process

- Start cold from this folder. Read only what Inputs names.
- Conformant means two things. First, the default branch's `.copier-answers.yml` names the
  latest blueprint tag: the `Drift` column says `current`. Second, each answer that names a
  platform resource is true on the platform: the `Platform` column says `backed` (why: a tag
  match proves the files and not the estate. messy-play and vinecliff were `current` with a UAT
  answer that Vercel and Neon did not back, and goal D4 asks that conformance prove the estate
  is in order · Jamie, 2026-10-29). The reads, for a live repo with answers:
  - `uat: true`: each Vercel project linked to the repository has the custom environment `uat`.
  - `database: neon`: the Neon projects `<slug>`, and with `uat: true` `uat-<slug>`, exist.
    A repo whose `.icm/environments.md` names Neon projects is read by that file.
  - `database: neon` and `uat: true`: Preview's `DATABASE_URL` on each linked project is on no
    host of the production Neon project and on no host of the Production `DATABASE_URL`. Else
    the cell says **Preview reads production**.
  - `.icm/environments.md`: its `Vercel project` cells and the projects linked to the repository
    are one set.

  A cell that a read could not fill names the read and why, and the run goes on to the next
  read (why: a missing token for one team must not hide the rest of the estate · 2026-10-29).
  The run changes nothing on a platform. A `Platform` line is fixed by the repo's setup stubs
  or an `env-cleanup-*` triage stub of the intake, never by conformance (why: an operator act on
  a client's platform is Jamie's hand · 2026-10-29). `drifted:` counts each repo with a `Drift`
  other than `current` or `archived`, or a `Platform` other than `backed`.
- The tokens, read from the shell and never from a file of this repo: one per Vercel team,
  `VERCEL_TOKEN_<TEAM>`, and one per Neon organisation, `NEON_API_KEY_<ORG>`. `<TEAM>` and
  `<ORG>` are the repo's `vercel:` and `neon:` values in `desk/mani.yaml`, in capitals, with each
  other character as `_`: today `VERCEL_TOKEN_KODOMINIO`, `VERCEL_TOKEN_REMI21`,
  `NEON_API_KEY_KODOMINIO` and `NEON_API_KEY_REMI21`. A Vercel token reads its team. A Neon key
  is the organisation's API key, or a personal key when `neon:` is the `org-…` id (why: remi-ai's
  projects are on another team and in another organisation, and one token cannot span them ·
  2026-10-29).
- A repo built before the blueprint has no answers file and is adopted: the PR adds only that
  file, from its client record, so no file of its own changes and later tags reach it by
  `copier update` (why: the live repos predate the blueprint; overwriting them to conform
  would be a rebuild, not a check · 2026-10-16).
- `desk/mani.yaml` tags each repo `live` or `dormant`. A live repo is checked against the
  blueprint tag. A dormant repo is checked for being archived and gets no PR (why: an
  archived repo changes no more, so a template update would only reopen it · 2026-10-19).
- A repo conforms only through `copier update`. A conformance PR holds what `conform.sh`
  writes and the triage stub, nothing more. A repo file that does not follow a blueprint
  contract is a blueprint defect: open a pull request on `legible-consulting/blueprint`, so the
  fix reaches every repo with the next tag, never an edit by hand in each repo (why: a copied
  line changes only by hand in each repo, so a new tag does not reach it · Jamie, 2026-10-28).
- Claude and agent assets (`.claude/`, `CLAUDE.md`, `AGENTS.md`, `.icm/`, `.opencode/` and
  the like) are listed in the report, not removed: whether one is still used is Jamie's call.
- From the local lane, Jamie's own `gh` login and the tokens in the shell:
  `bash conformance/drift.sh` writes the report. Then do these steps for one repo whose
  `Drift` is not `current` at a time, with `<tag>` the blueprint tag and `<branch>`
  `conformance/blueprint-<tag>`:
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

- `desk/estate/drift-<date>.md`: one row per repo, with the columns `Tracks`, `Drift`,
  `Platform` and the Claude and agent assets.
- `.github/schemas/estate.schema.json` checks `title`, `kind`, `date`, `blueprint` and
  `drifted` (`check.yml`'s `frontmatter` job).
- One PR per repo behind the tag (`conform.sh` in a worktree, opened with `gh pr create`); the gate stays human.
- Runs from the local lane (`~/Desktop/legible-consulting/projects/<slug>/`), Jamie's hand.
