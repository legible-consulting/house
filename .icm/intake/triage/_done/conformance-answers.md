# Stub: Conformance reads each live repo's answers against Vercel and Neon, and names what the platform does not back

- lane: chore
- found-by: the review of the open tickets and the research library · 2026-10-29
- complexity: medium
- priority: P1

## Problem

`conformance/drift.sh` calls a repo conformant when `_commit` in `.copier-answers.yml` is the latest tag. messy-play answers `uat: true` and `database: neon`, is "current" in `desk/estate/drift-2026-10-28.md`, and has no UAT environment, no Neon project of its own and no workflow on `main`. Vinecliff answers `uat: true` and its Preview reads production's database. The report says nothing. D4 in the goals says conformance proves the estate is in order. A tag match does not. Jamie's answer, 2026-10-29: conformant means the tag matches and the answers are true on the platform. The dropped stub `environments-drift` wanted the same comparison in each repo's `promote.sh`; it belongs here, once for the estate, with Jamie's tokens.

## Proposed change

`drift.sh` gains one read per answer that names a platform resource, and one column in the report. It changes nothing on any platform. One pull request on the house.

## Acceptance criteria

- [ ] For a live repo with `uat: true`: each Vercel project linked to the repository has the custom environment `uat`, or the report names the project that has none.
- [ ] For a live repo with `database: neon`: the Neon projects `<slug>` and, with `uat: true`, `uat-<slug>` exist, or the report names the missing one. The names are the convention of `.icm/database/CONTEXT.md`; a repo whose `.icm/environments.md` names other projects is read by that file.
- [ ] For a live repo with `database: neon` and `uat: true`: Preview's `DATABASE_URL` host on each Vercel project is not production's, or the report says "Preview reads production", in bold.
- [ ] For a live repo with `.icm/environments.md`: each `Vercel project` cell is a project linked to the repository, and each project linked to the repository is in the table, or the report names the difference.
- [ ] The report's `Drift` column keeps its words. A new column, `Platform`, says `backed` or lists the lines above. `drifted:` in the frontmatter counts a repo with a `Platform` line.
- [ ] Without the Vercel or Neon token for a repo's team, the cell says which read it could not do, and the run continues.
- [ ] `conformance/CONTEXT.md` says what conformant means, with the why and the date, and names the tokens the run reads from the shell.
- [ ] The desk's `/clients` row shows the `Platform` cell beside the drift.

## Out of scope

- A fix on the platform. The operator acts stay in each repo's `.icm/intake/setup/` and in the `env-cleanup-*` stubs.
- A repo tagged `dormant`.

## Notes

- The reads: Vercel `GET /v9/projects?repoUrl=`, `/v9/projects/{id}/custom-environments`, `/v10/projects/{id}/env`; Neon `GET /projects`. The scripts of the blueprint's `lib/vercel.sh` show the Vercel calls.
- remi-ai's Vercel projects are on the team `remi21`, and its Neon projects are in another organisation. The run reads one token per team and per organisation, by name, from the shell.
