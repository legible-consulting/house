# Stub: Each live repo says where it runs

- feature-slug: estate-environments
- epic: blueprint-environments
- sequence: 3 of 4
- depends-on: check-environments-table
- complexity: low
- priority: P2

## Problem

Berceo and agorasim have a hand-written table with four columns. Vinecliff, remi-ai, messy-play and jamienisbet have none.

## Proposed change

The conformance to the new blueprint tag adds the table to each live repo (`conformance/CONTEXT.md`).

## Acceptance criteria

- [ ] Each repo of `desk/mani.yaml` tagged `live` has `README.md` § Environments with the five columns.
- [ ] Each address and each project in a table is read from Vercel and Neon on the day of the run, not copied from the house record.
- [ ] The `check-client` check is green on each conformance pull request.

## Notes

- One conformance pull request per repo. It can run with the conformance that the `env-cleanup-*` triage stubs wait on.
- Jamie confirms each address that the run cannot read.
