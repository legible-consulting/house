# Breakdown: Each build says where it runs, in one file that the blueprint owns

- epic-slug: blueprint-environments
- source: Jamie, 2026-10-29: take the concept of the retired `.icm/project.json` into the blueprint, without a port of its keys. The research read the last manifest in agorasim (`git show a8a7bab^:.icm/project.json`, and its reader `.icm/scripts/lib/project.sh`), the blueprint at `v1.0.3`, the six live repos on `main` and the house desk. Re-cut on 2026-10-29 after the review of the open tickets: the table moves from `README.md` to a copier-owned file.

## What I understood

The concept of the manifest: a repo owns the facts that make it itself, in one place and one shape. The template's files carry no repo identity and read those facts from that one place. Jamie wants that concept in the blueprint. He does not want the manifest's keys, and he does not want a new feature that the blueprint does not need.

The research mapped each key of the last manifest to the blueprint of today:

| Facts of the manifest | In the blueprint today |
|---|---|
| `name`, `complexity` | `.copier-answers.yml`: `slug`, `workspace`, `release`, `uat`, `database` |
| `required_env`, the `*_env` names | `.env.example`: names only |
| `deploy` (team, projects), `uat`, `health_endpoint`, `production_url` | found at run time. `lib/vercel.sh` lists the Vercel projects whose git link is this repository. No variable names a project. `VERCEL_TEAM` and `UAT_ENVIRONMENT` come from the environment |
| `database.neon`, `migrations` | the Neon integration and the setup stubs. The projects are `<slug>` and `uat-<slug>` by convention |
| `security`, `required_checks` | `legible-consulting/.github` `check-client.yml` |
| `docs_path`, `personas`, `runs_archive`, `reporting`, `models`, `smoke_check`, `support` | the retired pipeline. No reader is left |

Thus the blueprint has the concept already, in three parts: the answers hold the shape, `.env.example` holds the names, and the scripts find the resources. One fact has no home: where the build runs, in a form that a reader with no platform token can read. That reader is a session in the cloud, the stop report, the desk, kickoff, handover and the client.

The first cut put the table in `README.md` (stub `environments-table`, done, blueprint#39 at `57d9e94`, after `v1.1.0` and in no tag). The review of 2026-10-29 found the flaw: `README.md` is written once, so `copier update` never gives the table to a repo rendered before it. The six live repos would get it by a hand edit each, against `conformance/CONTEXT.md` ("a repo conforms only through `copier update`"). Jamie's answer: no hand edit across pull requests, the table goes into a copier-owned file. The second cut does that.

The first cut also compared the table with Vercel in `promote.sh status` (stub `environments-drift`). The review asked what decision changes when that line prints. Jamie's answer: none that the conformance report does not give. The comparison moves to conformance, which runs once for the estate with Jamie's tokens (triage stub `conformance-answers`).

Rejected:

- **A manifest file** (`.icm/project.json`, or a YAML file of keys). The scripts find the resources, so a declared copy of the same facts drifts from the platform. The last manifest had 88 lines. Most were defaults, names that no script read, or keys of the retired pipeline. `.icm/environments.md` is one table of one fact, not a manifest.
- **More copier questions** (the production address, the UAT address). An answer that renders nothing is a fact, not a question. The address changes outside a render, for example at go-live.
- **The table in `README.md`** (the first cut). Written once, so unreachable by `copier update`.

### Questions for Jamie

Answered on 2026-10-29, first cut: the table with no manifest file, the five columns, the check in `check-client.yml`, `vercel_project` out of the house record, and the epic third in `README.md` § Order.

Answered on 2026-10-29, second cut: no hand edit across pull requests, so the table goes into a copier-owned file (Q2 of the review). The drift comparison leaves `promote.sh` (Q3).

None is open.

## Decisions of record

- **The ticket lives in the house. The change lives in the blueprint**, as for `blueprint-pipeline`. Each stub is one pull request on the repo it names, then the move of the stub to `_done/` in the house (why: the desk reads tickets from the house, and the blueprint holds no tickets · Jamie, 2026-10-27).
- **Where the build runs is `.icm/environments.md`**, a file the blueprint owns. One table, five columns: `Environment`, `Address`, `Vercel project`, `Database`, `Moves on`. Copier writes it and merges it three ways on update. `check-client.yml` checks it, the blueprint's files and the desk read it, and `README.md` keeps one line that points at it. No other file repeats it (why: a reader with no platform token needs the fact, and a copier-owned file reaches every build with the next tag, a written-once file does not · Jamie, 2026-10-29).
- **The house record has no `vercel_project`.** The desk reads the repo's file (why: one home per fact · Jamie, 2026-10-29).
- **The comparison with the platform is conformance's**, not `promote.sh`'s (why: conformance runs once for the estate with Jamie's tokens, and a drift line in a repo's status changes no decision that the conformance report does not · Jamie, 2026-10-29).
- **The blueprint renders no manifest.** The facts of shape stay in the answers, the names in `.env.example`, and the resources are found at run time (why: one home per fact. A declared copy of a found fact drifts · 2026-10-29).
- **A dropped stub keeps its number.** The re-cut stubs are 6 to 9. Stubs 2 to 5 are in `_done/` with a `> Dropped:` line that names the stub that carries the work (why: the path is the identity and the sequences run 1 to m with no gap, `.icm/intake/CONTEXT.md` · 2026-10-29).

## Build order

1. environments-table — done: the blueprint renders the table from the answers, into `README.md` — depends-on: none
2. environments-file — done: the table moves to `.icm/environments.md`, and the blueprint's files read it there (blueprint#41) — depends-on: environments-table
3. check-environments-file — done: `check-client.yml` checks the file and its columns, on a build from blueprint `v1.2.0` or later (.github#12) — depends-on: environments-file
4. estate-environments-file — done: each live repo gets the file by `copier update`, and the two hand-written tables leave — depends-on: check-environments-file
5. desk-environments-file — done: the desk reads the file, and `vercel_project` leaves the house record — depends-on: estate-environments-file

Dropped, in `_done/`: environments-drift (2), check-environments-table (3), estate-environments (4), desk-reads-environments (5).

## Out of scope

- The removal of the stale answer `migrations_path` from five repos' `.copier-answers.yml`. It is the triage stub `blueprint-stale-migrations-path-answer`.
- The comparison of the file with Vercel and Neon. It is the triage stub `conformance-answers`.
