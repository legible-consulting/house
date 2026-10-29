# Stub: The UAT status names each difference between the README's table and Vercel

- feature-slug: environments-drift
- epic: blueprint-environments
- sequence: 2 of 5
- depends-on: environments-table
- complexity: medium
- priority: P2

## Problem

`README.md` § Environments declares where the build runs. `lib/vercel.sh` finds the same facts on Vercel. A domain added at go-live, or a project renamed, makes the two disagree, and nothing shows it.

## Proposed change

`promote.sh status` reads the table and compares it with the Vercel projects and the domains that `lib/vercel.sh` finds. It names each difference. It changes no file.

## Acceptance criteria

- [ ] `promote.sh status` prints one line per difference: a project linked to the repository that the table does not name, a project the table names that Vercel does not link, a production domain that the table does not name, and a UAT address that the custom environment does not serve.
- [ ] With no difference, it prints one line that says so.
- [ ] With no `## Environments` table, it prints one line that says so and continues.
- [ ] Without `VERCEL_TOKEN`, it prints that it cannot compare, as it does for the other Vercel reads.
- [ ] A difference does not change the exit code of `status`, and `approve` and `run` do not refuse on it.
- [ ] `check.yml`'s fixture for `promote.sh` covers a table with no difference and a table with one of each.

## Out of scope

- A build with `uat` no. It renders no `promote.sh` and reads no Vercel token.
- A comparison of the `Database` column with Neon.

## Notes

- One pull request on `legible-consulting/blueprint`, then the move of this stub in the house.
- The parser of the table is one function in `lib/vercel.sh` or a new `lib/environments.sh`. Stub `desk-reads-environments` reads the same shape in TypeScript.
