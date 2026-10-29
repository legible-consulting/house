# Stub: The desk shows where a build runs from the build's own README

- feature-slug: desk-reads-environments
- epic: blueprint-environments
- sequence: 4 of 4
- depends-on: estate-environments
- complexity: medium
- priority: P2

## Problem

Each house `clients/<slug>/record.md` has the field `vercel_project`, and the desk's client page shows it. The build's `README.md` § Environments holds the same fact. Two homes drift.

## Proposed change

The desk's client page reads the table from the repo on `main`. The field `vercel_project` leaves the house.

## Acceptance criteria

- [ ] The client page of a client with `repo:` set shows each row of the repo's § Environments table, with the address as a link.
- [ ] A repo with no table shows one line that says so.
- [ ] `vercel_project` is in no record, in no contract of the house (`clients/CONTEXT.md`, `06-kickoff/CONTEXT.md`, `08-handover/CONTEXT.md`), in `clients/_template/record.md` and in `desk/app/lib/house.ts`.
- [ ] Kickoff's step 10 says that the new repo's table holds the projects.

## Notes

- One pull request on the house.
