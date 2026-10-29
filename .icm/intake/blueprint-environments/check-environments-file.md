# Stub: CI fails a build whose environments file is missing or has the wrong columns

- feature-slug: check-environments-file
- epic: blueprint-environments
- sequence: 7 of 9
- depends-on: environments-file
- complexity: low
- priority: P2

## Problem

`.icm/environments.md` is the one home of where a build runs. Without a check, a session that removes it, or a build whose `copier update` was never merged, stays unseen.

## Proposed change

`check-client.yml` checks that a build has `.icm/environments.md` with a table whose header row has the five columns. A workspace has no file and no check. One pull request on `legible-consulting/.github`.

## Acceptance criteria

- [ ] `check-client.yml` fails a build with no `.icm/environments.md`, and names the file.
- [ ] It fails a table whose header row does not have `Environment`, `Address`, `Vercel project`, `Database` and `Moves on`, and names the columns.
- [ ] It does not check a workspace.
- [ ] The check is required from the first tag. The conformance pull request of `estate-environments-file` brings the file, so no live repo goes red on `main` before it has the file.

## Notes

- The check runs in the `secrets` job's checkout, with no new job (why: a private repo pays per job minute).
