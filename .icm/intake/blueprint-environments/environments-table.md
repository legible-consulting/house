# Stub: A new build's README says where the build runs, and the blueprint's files read it there

- feature-slug: environments-table
- epic: blueprint-environments
- sequence: 1 of 4
- depends-on: none
- complexity: medium
- priority: P2

## Problem

The blueprint renders no place for where a build runs. Two live repos wrote a `## Environments` table by hand. The loop's step 7 tells the session to say the UAT address, but no file of the build holds it.

## Proposed change

`README.md.jinja` renders a `## Environments` table from the answers. The setup stubs fill it. The blueprint's files read it.

## Acceptance criteria

- [ ] A render with `uat` yes has three rows: `Production`, `UAT`, `Preview`. A render with `uat` no has two: `Production`, `Preview`.
- [ ] The columns are `Environment`, `Address`, `Vercel project`, `Database`, `Moves on`. A `monorepo` render has one row per environment and Vercel project.
- [ ] `Database` says the Neon project on `database: neon` and `none` on `database: none`. `Moves on` says what moves the environment, from `release` and `uat`.
- [ ] Each setup stub that makes an address or a project has a `Done when` line that names the cell it fills.
- [ ] `.icm/intake/CONTEXT.md` § The loop, step 7, and `.icm/uat/CONTEXT.md` name the address from `README.md` § Environments.
- [ ] `check.yml` renders the proof answer sets with the table.

## Out of scope

- The live repos. `README.md` is written once, so `copier update` does not add the table (stub `estate-environments`).

## Notes

- One pull request on `legible-consulting/blueprint`, then the move of this stub in the house.
- The rows of berceo's and agorasim's tables are the model.
