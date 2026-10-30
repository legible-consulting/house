# Stub: The desk shows where a build runs from the build's own environments file

- feature-slug: desk-environments-file
- epic: blueprint-environments
- sequence: 9 of 9
- depends-on: estate-environments-file
- complexity: medium
- priority: P2

## Problem

Each house `clients/<slug>/record.md` has the field `vercel_project`, and the desk's client page shows it. The build's `.icm/environments.md` holds the same fact. Two homes drift.

## Proposed change

The desk's client page reads `.icm/environments.md` from the repo on `main`, as it reads `.icm/intake/`. The field `vercel_project` leaves the house. One pull request on the house.

## Acceptance criteria

- [ ] The client page of a client with `repo:` set shows each row of the repo's table, with the address as a link.
- [ ] A repo with no file shows one line that says so.
- [ ] `vercel_project` is in no record, in no contract of the house (`clients/CONTEXT.md`, `06-kickoff/CONTEXT.md`, `08-handover/CONTEXT.md`), not in `clients/_template/record.md` and not in `desk/app/lib/house.ts`.
- [ ] Kickoff's step 10 says that the new repo's `.icm/environments.md` holds the projects.

## Notes

- The parser of the table is one function in `desk/app/lib/` beside the ticket reader. The blueprint's `promote.sh` reads the same shape in bash. Two readers of one grammar, as for the forms and the kit.
