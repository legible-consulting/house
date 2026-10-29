> Dropped: the table leaves `README.md`, a file copier writes once, for a copier-owned file. Jamie's answer of 2026-10-29: no hand edit across pull requests. The stub `check-environments-file` carries the same work for the new file · 2026-10-29

# Stub: CI fails a build whose README does not say where it runs

- feature-slug: check-environments-table
- epic: blueprint-environments
- sequence: 3 of 9
- depends-on: environments-table
- complexity: low
- priority: P2

## Problem

`README.md` is the build's own file. Without a check, a table that a session removes or a build that never had one stays unseen.

## Proposed change

`check-client.yml` checks that a build's `README.md` has `## Environments` with the five columns. A workspace has no table and no check.

## Acceptance criteria

- [ ] `check-client.yml` fails a build with no `## Environments` heading in `README.md`, and names the missing heading.
- [ ] It fails a table whose header row does not have the five columns, and names the columns.
- [ ] It does not check a workspace.
- [ ] The check is advisory for one release tag, then required. The blueprint's `CLAUDE.md` names the tag.

## Notes

- One pull request on `legible-consulting/.github`.
- The advisory step lets the live repos get the table (stub `estate-environments`) before a red check stops their tickets.
