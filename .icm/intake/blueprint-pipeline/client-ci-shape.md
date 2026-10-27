# Stub: A client repo's CI checks the contract and the gate, runs the code checks on pull requests only, and costs a minute only where it buys one

- feature-slug: client-ci-shape
- epic: blueprint-pipeline
- sequence: 11 of 13
- depends-on: preview-database
- complexity: medium
- priority: P1

## Problem

`check-client.yml` in `legible-consulting/.github` runs three jobs on every push and every pull request, including drafts, `main` after a merge and diffs that touch only `.icm/**`. Every client repo is private, and GitHub bills a private repository per job, rounded up to a minute. Nothing checks the pull request body against the contract, nothing stops a merge before Ready to merge is ticked, and no Dependabot security updates run.

## Proposed change

In `legible-consulting/.github`: the `code` job on pull requests only and path-filtered, the `workflows` job when workflows changed, a new `contract` job, a new `gate` job that the ruleset requires. In the blueprint: `dependabot.yml` for a build. The principles, each with its why, in the workflows `README.md`.

## Acceptance criteria

- [ ] The principles in `.github/workflows/README.md`: the deploy is the verdict and costs no minute. A check must be fixable without a local run, so formatting is never a verdict. A private repository is billed per job, rounded up. One shape for every repo. Nothing fires to be safe: a new job needs a sentence that says what it costs and what it buys.
- [ ] `secrets`: unchanged, push to `main` and pull request.
- [ ] `workflows`: runs when `.github/workflows/**` changed, read with one `changed-files` step (`git diff --name-only origin/main...HEAD` on a pull request, `HEAD~1` on a push).
- [ ] `code`: `if: github.event_name == 'pull_request'`, skipped when the changed files are all under `.icm/**`, `**/*.md` or `.github/**`. Never required in a ruleset. The README says why: a required check that skips hangs the pull request.
- [ ] `contract`, bash only, on `pull_request`, when `.icm/intake/CONTEXT.md` exists in the checkout: the body has a line `- ticket:` whose path, or the same path with `_done/` before the file name, exists on the branch. The body carries the Ready to merge anchor. When the stub's `complexity` is `medium`, `high` or `research` and the stub is not a triage stub, the body carries the Spec approved anchor. No stub outside `_done/` has the branch's name as its slug. `.icm/intake/` validates: every `sequence` of an epic runs `1..m` with no gap, every `depends-on` names a stub of the same epic, `feature-slug` equals the file name, and `README.md § Order` lists every open epic when two or more are open. Each failure is one `::error` line with the file.
- [ ] `gate`, bash only, on `pull_request` (opened, edited, synchronize, ready_for_review, reopened): green when the body has `- [x] **Ready to merge**`, or when the pull request is release-please's (head `release-please--branches--main`). Red otherwise, with one line that says what waits. The README says the repository's ruleset requires `gate` on `main`, and the kickoff sets it (unit 12).
- [ ] The house's own `ci.yml`, which calls `check-client` with no `.icm/intake/CONTEXT.md` of the blueprint's shape, stays green. The `contract` job skips there.
- [ ] In the blueprint: `template/.github/{% if not workspace %}dependabot.yml{% endif %}`, `version: 2`, npm and github-actions, `directory: "/"`, `schedule.interval: monthly`, `open-pull-requests-limit: 0`. Its header says security updates are switched on in the repository's settings and version updates stay off.
- [ ] `conventions/README.md`, the `CI` row, names the four jobs and the two rules a repo must keep.

## Out of scope

- A format check, an STE lint, a smoke run, Lighthouse or e2e in client CI: dropped.
- The ruleset itself on each client repo: Jamie's hand, named in the kickoff (unit 12).

## Notes

Read first: the breakdown, `legible-consulting/.github`'s `.github/workflows/check-client.yml`, `release.yml`, `README.md` and `ci.yml`, the intake contract as unit 2 left it (the `ticket:` line's three places, the gates), the pull request template, and the legacy `_shared/ci.md` and `quality.yaml` in `k0d0minio/icm-board` for the cost reasoning. This unit's pull request is on `legible-consulting/.github`, and `dependabot.yml` is a second pull request on the blueprint.

## Prompt

Repo legible-consulting/.github, cloud or desktop. Attach legible-consulting/house and legible-consulting/blueprint read-only. Read README.md and .github/workflows/README.md in .github, then .icm/intake/blueprint-pipeline/breakdown.md in the house whole, then this ticket, .icm/intake/blueprint-pipeline/client-ci-shape.md, then the files its Notes name. Do what it says. One branch, one pull request to main in .github, Conventional Commits, technical text in Simplified Technical English. Write what you will change and your questions in the pull request body, numbered, each with a default, and stop for Spec approved. On build: push and read ci.yml. For dependabot.yml, one more pull request on the blueprint. Do not merge. Then one pull request in the house that moves this stub to .icm/intake/blueprint-pipeline/_done/, the one write to the house. Your last message names the pull requests and what waits on Jamie.
