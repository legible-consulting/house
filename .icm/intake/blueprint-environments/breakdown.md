# Breakdown: Each build says where it runs, in one table that the blueprint shapes

- epic-slug: blueprint-environments
- source: Jamie, 2026-10-29: take the concept of the retired `.icm/project.json` into the blueprint, without a port of its keys. The research read the last manifest in agorasim (`git show a8a7bab^:.icm/project.json`, and its reader `.icm/scripts/lib/project.sh`), the blueprint at `v1.0.3`, the six live repos on `main` and the house desk.

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

Thus the blueprint has the concept already, in three parts: the answers hold the shape, `.env.example` holds the names, and the scripts find the resources. The blueprint's files carry no repo identity. One fact has no home: where the build runs, in a form that a reader with no platform token can read. That reader is a session in the cloud, the stop report ("say what moved: the UAT address"), the desk, kickoff, handover and the client. Today the fact is:

- a hand-written `## Environments` table in `README.md` in berceo and agorasim, with the same four columns: `Environment`, `Address`, `Database`, `Moves on`. Vinecliff, remi-ai, messy-play and jamienisbet have no table.
- the field `vercel_project` in each house `clients/<slug>/record.md`, which the desk shows. It is a second home for a fact of the repo.

The proposal applies the concept to that one fact. It adds no file and no format to the blueprint:

1. `README.md` § Environments is the home of where the build runs. The blueprint renders the table from the answers, one row per environment, with the rows that berceo and agorasim found by hand. The setup stubs fill the addresses as a person does each act.
2. The blueprint's files read the table and never repeat it: the loop's step 7 and the stop report name the address from it.
3. `check-client.yml` checks that the table exists, with its columns. The check is the blueprint's file that the repo's file calls (the blueprint's rule of 2026-10-28). A conformance run then adds the table to the live repos.
4. The desk reads the table from each repo on `main`. The field `vercel_project` leaves the house record.

Rejected:

- **A manifest file** (`.icm/project.json`, or a YAML file). The scripts find the resources, so a declared copy of the same facts drifts from the platform. The last manifest had 88 lines. Most were defaults, names that no script read (Slack, the report e-mail) or keys of the retired pipeline.
- **More copier questions** (the production address, the UAT address). An answer that renders nothing is a fact, not a question. The address changes outside a render, for example at go-live.
- **No change.** The fact stays in prose in two repos of six, and in the house record beside them.

### Questions for Jamie

1. Does the concept go into the blueprint as the `README.md` § Environments table, with no manifest file? Default: yes.
2. Are the columns `Environment`, `Address`, `Vercel project`, `Database`, `Moves on`? Default: yes. The column `Vercel project` is new. It replaces the house field `vercel_project` (question 4).
3. Does `check-client.yml` fail a build whose `README.md` has no § Environments table with those columns? Default: yes.
4. Does the field `vercel_project` leave the house record, so that the desk reads the table from the repo? Default: yes.
5. Does `promote.sh status` compare the table with the Vercel projects that it finds, and name each difference? Default: no, not in this epic.
6. Where does this epic go in `README.md` § Order? Default: 3, after `salesman-desk` and `triage`.

| Epic | Open | P0 | Serves | Links | Files |
|---|---|---|---|---|---|
| `salesman-desk` | 0 | 0 | the salesman's desk. Its close-out is not done | none | the desk |
| `triage` | 8 | 0 | the environment cleanup of each client, the monorepo UAT build | `env-cleanup-*` wait on the conformance to the new blueprint tag. Stub 3 here is a conformance run too | none |
| `blueprint-environments` | 4 | 0 | one home for where each build runs | stub 3 runs with the conformance that `env-cleanup-*` wait on | `README.md.jinja`, `check-client.yml`, the house record and the desk's client page |

## Decisions of record

- **The ticket lives in the house. The change lives in the blueprint**, as for `blueprint-pipeline`. Each stub is one pull request on the repo it names, then the move of the stub to `_done/` in the house (why: the desk reads tickets from the house, and the blueprint holds no tickets · Jamie, 2026-10-27).
- **The blueprint renders no manifest.** The facts of shape stay in the answers, the names in `.env.example`, and the resources are found at run time (why: one home per fact. A declared copy of a found fact drifts · 2026-10-29).

## Build order

1. environments-table — the blueprint renders `README.md` § Environments from the answers, and its files read it — depends-on: none
2. check-environments-table — `check-client.yml` checks the table and its columns — depends-on: environments-table
3. estate-environments — each live repo gets its table in the conformance to the new tag — depends-on: check-environments-table
4. desk-reads-environments — the desk reads the table, and `vercel_project` leaves the house record — depends-on: estate-environments

## Out of scope

- A comparison of the table with the platform (question 5).
- The removal of the stale answer `migrations_path` from five repos' `.copier-answers.yml`. It is the triage stub `blueprint-stale-migrations-path-answer`.
