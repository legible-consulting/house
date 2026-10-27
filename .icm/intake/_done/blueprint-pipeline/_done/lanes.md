# Stub: A bug, a tweak, a chore or a hotfix has its own contract, and a session takes it in one invocation

- feature-slug: lanes
- epic: blueprint-pipeline
- sequence: 3 of 13
- depends-on: intake-contract
- complexity: medium
- priority: P1

## Problem

A one-off has no contract. The intake contract describes the triage stub from inside a ticket only. The legacy lanes (`bug`, `tweak`, `chore`, `hotfix`) worked well: one invocation, one pull request, the merge button as the gate. Their contracts carried a run folder, usage lines, a retrospective and a changelog page that the blueprint does not have.

## Proposed change

Four lane folders under `.icm/lanes/`, one `CONTEXT.md` each, in the Inputs, Process, Outputs shape, under 60 lines each. Each says only what differs from the loop and points at the loop's steps.

## Acceptance criteria

- [ ] `template/{% if not workspace %}.icm{% endif %}/lanes/{bug,tweak,chore,hotfix}/CONTEXT.md` exist. Each has `## Inputs`, `## Process` and `## Outputs`. Each is under 60 lines.
- [ ] Common to the four, written once in each in the same words: the ticket is a triage stub. From a report, the session writes the stub first in the triage shape, with `lane:` and `found-by:`. Then `.icm/scripts/new-run.sh triage/<slug>`. No Spec approved gate: the script drops it. Build, commit with the lane's type, push, read CI once, park every off-ticket finding as a triage stub, flip ready with the preview line, stop with the stop report. Ready to merge stays. Jamie ticks and the session merges, as the loop's step 7 says. A lane never edits a file the blueprint renders: that request goes to the blueprint.
- [ ] `bug`: reproduce first. One line observed, one line expected. No reproduction: stop and say what was tried. Fix the cause with the smallest diff. A test where the repo has a test runner. A fix that needs a product decision: stop and cut an epic instead. Type `fix:`.
- [ ] `tweak`: the request is fully specified, or the session stops. The smallest diff. Never data, auth or payments. Type `fix:` or `style:`.
- [ ] `chore`: the session states the invariant: behaviour unchanged, only X differs. One purpose per pull request. A dependency bump names the version delta. Migrations are forward-only, and reverted code tolerates the newer schema (the UAT contract's rule, 2026-10-23). Type `chore:`, `refactor:`, `build:` or `ci:`.
- [ ] `hotfix`: Jamie invokes it, never a hook or an alert. The stub carries `priority: P0`. `new-run.sh triage/<slug> --ready` opens the pull request ready, not draft. Fix forward by default. Where `.icm/uat/CONTEXT.md` exists: the merge reaches UAT, Jamie's `release` and the client's word follow at once, `promote.sh status` says what rides with the fix, and `rollback.sh` is the stop-gap. Without UAT: the merge is the release. Type `fix:`.
- [ ] Each lane names its Inputs as files: the stub or the report, `CLAUDE.md`, the files the fault or the request implicates. Nothing else.
- [ ] `check.yml` asserts the four files in a build and none in a workspace. The render passes.

## Out of scope

- `new-run.sh --ready`: unit 4. The router's lane forms: unit 6.
- The `knowledge` and `handover` lanes: not ported (the breakdown).

## Notes

Read first: the breakdown, the intake contract as unit 2 left it, the UAT contract (`.icm/uat/CONTEXT.md`, § A hotfix and § The rollback), and the legacy lanes in `~/Desktop/Apps/_system/template/icm-pipeline/lanes/{bug,tweak,chore,hotfix}/CONTEXT.md` or in `k0d0minio/icm-board`. Take the lane's judgement rules. Leave the run pack, the usage lines, the security script, the retrospective, the changelog page and the labels: release-please makes the changelog from the commit type.

## Prompt

Repo legible-consulting/blueprint, cloud or desktop. Attach legible-consulting/house read-only. Read CLAUDE.md, README.md and conventions/README.md in the blueprint, then .icm/intake/blueprint-pipeline/breakdown.md in the house whole, then this ticket, .icm/intake/blueprint-pipeline/lanes.md, then the files its Notes name. Do what it says. One branch, one pull request to main in the blueprint, Conventional Commits, technical text in Simplified Technical English. Write what you will change and your questions in the pull request body, numbered, each with a default, and stop for Spec approved. On build: render the proof sets into a scratch folder with copier to check your work. Read check.yml. Do not merge. Then one pull request in the house that moves this stub to .icm/intake/blueprint-pipeline/_done/, the one write to the house. Your last message names both pull requests and what waits on Jamie.
