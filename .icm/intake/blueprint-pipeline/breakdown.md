# Breakdown: The ticket pipeline in the blueprint, from the legacy template, ready for v1.0.0

- epic-slug: blueprint-pipeline
- source: Jamie's six requirements and his notes of 2026-10-27, after the readiness review of the blueprint `v0.9.0` against the legacy template in `k0d0minio/icm-board` (`_system/template/`) and the four live clones. The reading copy of the plan is in that session's scratchpad. These tickets are the record.

## What I understood

The blueprint renders every client build. Its `v0.9.0` carries one ticket contract, two scripts, three guards and the UAT contract. The legacy template carried a prompt router, a pipeline skill with four stages and six lanes, two working-knowledge skills, a board at session start and a Stop hook. Jamie wants six things from the legacy brought in: the router, the lanes and the useful concepts of the pipeline skill, the two skills, a fix to the deny list that blocks `.env.example`, a thought-through client CI, and a read-only board at session start. His notes add four decisions. Jamie ticks Ready to merge and the session merges and does what follows. A UAT build has a production database and a UAT database, every preview reads the UAT database, a preview with database changes gets a Neon branch cut from UAT, and a promotion by a session migrates production. Neon cleanup deletes only a branch a preview with database changes made. The reference for every ticket's words is the ASD-STE100 skill (`research/verdicts/asd-ste100-skill.md`, adopt), so that Jamie reads tickets with less effort.

The result is thirteen units. Twelve change the blueprint or `legible-consulting/.github`. One aligns the house. The last tags `v1.0.0`. Conformance of the four live repos is `conformance/CONTEXT.md`'s and is not in this epic.

### Questions for Jamie

Answered on 2026-10-27, and written into the decisions below: the order (`desk-restyle`, `triage`, `blueprint-pipeline`, in `README.md § Order`), a preview's Neon branch carries UAT's data, the session merges the release pull request on Jamie's word `release` on a `uat: no` build, and `merge.sh` and `release.sh` are the merge path with `confirm-git-writes.sh` unchanged.

One question is open:

1. Does a UAT build always have the two databases, so that no `database` question is asked and the UAT answer alone renders `preview-db.sh`, `preview-db.yml` and `neon-cleanup.yml`? Default: yes. Jamie's note of 2026-10-27 says a UAT build has a production database and a UAT database. Then `migrations_path` is the one question left, asked when `uat` is yes, default `migrations`. A `uat: no` build renders no database tooling and keeps its own migration workflow, as vinecliff does. Unit 8 carries the answer.

## Decisions of record

Fixed for the whole epic:

- **The ticket lives in the house. The change lives in the blueprint.** Each unit is one pull request on the blueprint (unit 11 on `legible-consulting/.github`, unit 12 on the house), then one pull request in the house that moves the stub to `_done/`. A session attaches the house read-only for the ticket and writes to it once, for the move (why: the desk reads tickets from the house, and the blueprint holds no tickets · Jamie, 2026-10-27).
- **The vocabulary is the house's.** Epic, stub, triage stub, lane, gate, as `core/lexicon.md` and the blueprint's `intake/CONTEXT.md` define them. Never `scope` for an epic, never `run`, never `claude/<slug>` for a branch.
- **Every rendered file is the blueprint's, byte for byte**, except the written-once list in `copier.yml`. A contract carries no repo's name and no placeholder. What a file needs to know about one repo it reads at run time (why: a copy that is exact makes `copier update` and the conformance report honest · the legacy's one rule that held).
- **Sessions merge after the tick, in client repos, from `v1.0.0`.** The house and the blueprint keep "Jamie merges" until then. The human gates in a client repo are four: Spec approved (a tick), Ready to merge (a tick), the client's sign-off (`promote.sh approve --by`, on Jamie's word in the session), `release` (Jamie's word in the session) (why: Jamie ticks from the phone and the session does the mechanics · Jamie, 2026-10-27).
- **A preview's Neon branch carries UAT's data**, not the schema only. UAT holds test data only (why: a tester continues on the rows they made · Jamie, 2026-10-27).
- **On a `uat: no` build the session merges the release pull request on Jamie's word `release`.** The merge makes the tag and the changelog and moves nothing (Jamie, 2026-10-27).
- **`merge.sh` and `release.sh` are the merge path.** `confirm-git-writes.sh` stays as it is, and a bare `gh pr merge` still asks. The `gate` check is the guard GitHub enforces (Jamie, 2026-10-27).
- **The three guards stay byte-identical with the house.** `check.yml`'s `guards` job in the house compares them. New hooks are build-only, rendered behind `{% if not workspace %}`.
- **Technical text in Simplified Technical English**, under the vendored `asd-ste100` skill, STE-flavored mode. A sentence of 20 words or fewer. Active voice. One instruction per sentence. No semicolons.
- **`check.yml` in the blueprint is the proof.** A unit that adds a rendered file adds its `need` and `never` lines. A unit that adds a hook adds it to the shellcheck set. The update proof (unit 9) gates the tag.
- **Line limits.** A build's `CLAUDE.md` under 80 lines. A lane contract under 60. A skill under 120. The intake contract stands alone with `CLAUDE.md`.
- **No `.icm/` in the blueprint repo.** Its tickets are here.

Do not, each with its why:

- Do not build an orchestrator. A script does the mechanics of one step and decides nothing. The tick and Jamie's word decide (why: a script that drives the stages hides the contracts it replaces · `CLAUDE.md`).
- Do not subscribe a session to pull request events. One blocking read, `gh pr checks --watch` (why: a dozen wake-ups per push, none a verdict · the legacy's measurement).
- Do not add a copier question without a default and a help line. `check.yml`'s `questions` job fails on it.
- Do not change a written-once file's content for a repo that already has it. That is conformance's.
- Do not run a client repo's build, lint, typecheck, test, format or dev. Rendering the proof sets into a scratch folder with `copier copy --vcs-ref HEAD . /tmp/zz` is allowed and is the way to check a template change.
- Do not add a client name, a contact or a secret to the blueprint. It is public.

## Build order

1. deny-list-and-settings — the named deny list and `settings.json.jinja` — depends-on: none
2. intake-contract — six sections into `.icm/intake/CONTEXT.md` — depends-on: deny-list-and-settings
3. lanes — `bug`, `tweak`, `chore`, `hotfix` — depends-on: intake-contract
4. scripts — `new-run.sh --ready --dry-run`, `merge.sh`, `release.sh`, `promote.sh run` — depends-on: intake-contract
5. skills-and-ste — `pr-conventions`, `ticket-craft`, the vendored `asd-ste100` — depends-on: lanes
6. router — `route-request.sh` and its test — depends-on: scripts
7. session-board — `session-start.sh` — depends-on: none
8. uat-database — two Neon projects, previews on UAT, branches on migrations — depends-on: scripts
9. check-yml-proofs — the assertions, the router test, the update proof, the STE pin — depends-on: uat-database
10. words — `CLAUDE.md.jinja`, the conventions, the README — depends-on: check-yml-proofs
11. client-ci-shape — `check-client.yml` and `dependabot.yml` — depends-on: uat-database
12. house-alignment — `07-build`, `core/stack.md`, `core/lexicon.md`, the house's deny list, `06-kickoff` — depends-on: words
13. tag-v1 — `v1.0.0` — depends-on: house-alignment

## Out of scope

- Conformance of the four live repos to `v1.0.0`: `conformance/CONTEXT.md`.
- The retire list for the legacy files in the live repos (`.icm/CONTEXT.md`, `.icm/project.md`, `release.yaml`, `quality.yaml`, `.opencode/`): a conformance ticket.
- The house's own board hook, and `.icm/intake/` in the blueprint repo: Jamie said no.
- The `knowledge` and `handover` lanes: a docs change is a chore with `docs:`. Handover is `08-handover/CONTEXT.md`.
- A run folder, model selection, usage lines, a retrospective script, labels: not ported. The pull request body and the stub carry the state.
