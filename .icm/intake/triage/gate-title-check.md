# Stub: The gate fails a pull request whose title is not a Conventional Commit

- lane: chore
- found-by: the review of the research library against the house · 2026-10-29
- complexity: low
- priority: P2

## Problem

The squash merge makes the pull request title the commit on `main`, and release-please reads that commit (`.icm/intake/CONTEXT.md` § Commit types). A title outside the form is dropped from the changelog with no error, and a `feat` written as `Feat:` or `feature:` makes no release. `research/verdicts/commitlint.md` (adopt, 2026-10-14) names the job. Nothing checks the title.

## Proposed change

`gate.yml`'s `contract` job checks the title against the types of § Commit types, in bash, with no Node. One pull request on `legible-consulting/.github`.

## Acceptance criteria

- [ ] `contract` fails a title that does not match `^(feat|fix|chore|docs|refactor|style|build|ci|perf|test|revert)(\([^)]+\))?!?: .+`, and names the form in one `::error` line.
- [ ] It passes release-please's and Dependabot's pull requests, as the job does today.
- [ ] It runs on `edited`, so a fixed title turns the check green with no push.
- [ ] `.github/.github/workflows/README.md` names the check beside the ticket line and the anchors.
- [ ] `conventions/README.md` row Commits in the blueprint says the gate checks the title.

## Out of scope

- The commits on the branch. The squash makes the title the one commit that matters.
