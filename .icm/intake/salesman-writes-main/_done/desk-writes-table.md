# Stub: One table names every write the desk makes to main, and the app refuses a write outside it

- feature-slug: desk-writes-table
- epic: salesman-writes-main
- sequence: 1 of 2
- depends-on: none
- complexity: medium
- priority: P2

## Problem

The desk writes to `main` in four places (`/start`, `/f/<token>`, `/share`, the handoff pull request), each with its own code and its own why in `desk/CONTEXT.md`. No one place names the set, and nothing in the app refuses a write outside it. Before a salesman's action lands on `main` with no pull request, the set is written down and enforced.

## Proposed change

`desk/CONTEXT.md` Outputs gains the table `The desk's writes to main`: one row per action, with the role that triggers it, the path globs it writes, and the identity. `CLAUDE.md` Boundaries gains one line that points at the table. In the app, every write to the house goes through one function in `lib/`, which reads the table's globs from one typed list and refuses a path outside them. One pull request on the house.

## Acceptance criteria

- [ ] `desk/CONTEXT.md` Outputs has the table with a row for each write that exists today: the free look's answers, a sent link's answers, a shared link, the handoff. Each row names the role, the globs and `DESK_PAT`.
- [ ] `CLAUDE.md` Boundaries has one line: the desk writes to `main` only what the table in `desk/CONTEXT.md` names, with the why and the date.
- [ ] One function in `desk/app/lib/` makes every commit to the house. It takes an action name from the typed list, and it throws, in words, on a path outside that action's globs. Every existing write path calls it.
- [ ] A unit of the typed list and the table agree: `read-house.mjs` or `check.yml` fails the build when the table's rows and the list's entries differ (why: one home, two readers).
- [ ] A conflict (409) retries once from the new `main`, then fails the action in words.

## Out of scope

- The handoff's change from a pull request to a commit (stub `handoff-commits-to-main`).
- The gates, the workflow dispatch and the mail. They do not write to `main`.
