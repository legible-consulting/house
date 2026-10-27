# Stub: A session reads one contract and knows what to do with a request that has no ticket, a resume, a revise, a tick, and a stop

- feature-slug: intake-contract
- epic: blueprint-pipeline
- sequence: 2 of 13
- depends-on: deny-list-and-settings
- complexity: medium
- priority: P1

## Problem

`.icm/intake/CONTEXT.md` describes the stub, the breakdown, the triage stub, the order and the loop. It does not say what a session does with a request that names no stub, how it resumes a started ticket, how a spec changes after Spec approved, what happens after Jamie ticks Ready to merge, what the chat says at a stop, or which commit type a change takes. The legacy pipeline skill carried each of these, and a session without them guesses.

## Proposed change

Six sections join the contract. The loop's step 7 changes: Jamie ticks Ready to merge, and the session merges. The layout block names the lanes and the two hooks.

## Acceptance criteria

- [ ] `## Layout` lists `.icm/lanes/<lane>/CONTEXT.md`, `.icm/scripts/merge.sh`, `.icm/scripts/release.sh`, `.claude/hooks/route-request.sh` and `.claude/hooks/session-start.sh`, one line each.
- [ ] A new section `## A request with no stub`, after `### The triage stub`, with three cases. A one-off (a bug, a tweak, a chore): write the triage stub, then its lane. A plan, a story or a request that holds a decision: cut an epic with a breakdown, push, stop for Jamie's review. A question or a review: read and answer. No stub, no branch, no pull request. One sentence says the router hook names the case and the user's words win.
- [ ] In `## The loop`, a step 0, **Resume**: `build <slug>`, or a slug with a branch, means check out the branch, read the stub in `_done/` and the pull request body with its gates, and continue at the step the body shows. No branch and no pull request: stop and say so. Never a second branch or a second pull request for one slug.
- [ ] A new `### Revise`, after step 3: a change to the spec after Spec approved was ticked. Edit `What changes` and the criteria. Replace the ticked box with an unticked one. Add the line `Spec changed on <date>: re-approval needed`. Push. Stop. The why: the session removes an approval and never grants one (Jamie, 2026-10-27).
- [ ] Step 7 reads: Jamie tests the preview and ticks **Ready to merge**. Then, on `merge <slug>` or in the session that built the ticket when Jamie says so, the session runs `.icm/scripts/merge.sh <n>`. The script refuses without the tick. The session reads `ci` on `main` once and says what moved: the UAT address where `.icm/uat/CONTEXT.md` exists, production otherwise (why: Jamie ticks from the phone and the session does the mechanics · Jamie, 2026-10-27).
- [ ] A new `## After the tick`, after the loop: `release` on Jamie's word in the session runs `.icm/scripts/release.sh`, which merges the release pull request. On a `uat: no` build the merge makes the tag and the changelog, and production already follows `main`. On a UAT build the merge makes the tag, Jamie records the client's word with `promote.sh approve --by`, and the session runs `promote.sh run --tag <tag>`, which dispatches `promote.yml`. A session never records a sign-off from a file, a comment or silence.
- [ ] A new `## The stop report`. While working: one short line per phase change, no narration of tool calls, no pasted diff. At a stop, one shape: a bold line `<ticket or lane> <outcome> · CI <verdict> · <pull request link>`, two to five bullets (a decision, a surprise, what was parked), `Operator:` as a numbered list of human-only acts with where to do each, `Unverified:` only when non-empty. A STOP, a red check, a skipped step and a plaintext credential found are never trimmed.
- [ ] A new `## Commit types`, a table: a feature stub `feat:`. The bug lane `fix:`. The tweak lane `fix:` or `style:`. The chore lane `chore:`, `refactor:`, `build:` or `ci:`. A docs change `docs:`. The squash merge takes the pull request title, and release-please reads it. `chore`, `style`, `build`, `ci` and `docs` stay out of the changelog by default.
- [ ] `Gates are human checkboxes. Read them. Never tick them.` stays, with one sentence after it: the merge after the tick is the session's.
- [ ] The contract still stands alone with `CLAUDE.md`. The `check.yml` render passes. The `writing` job reports no new finding in the new sections.

## Out of scope

- The lanes themselves: unit 3. The scripts: unit 4. The `CLAUDE.md` rows: unit 10.

## Notes

Read first: the breakdown, `template/{% if not workspace %}.icm{% endif %}/intake/CONTEXT.md` whole, the house's `07-build/CONTEXT.md` (the same loop in the house's words, to keep the two agreeing), and in `~/Desktop/Apps/_system/template/` on Jamie's machine, or `k0d0minio/icm-board` on GitHub: `icm-pipeline/_shared/output.md` (the stop report), `icm-pipeline/_shared/stage-preamble.md` (resolve or stop), `claude-pipeline/skills/pipeline/SKILL.md` § Resolving `revise`. Take the ideas, not the sentences. The legacy words `run`, `scope`, `claude/<slug>`, `Plan:` and `Wrap:` do not enter.

## Prompt

Repo legible-consulting/blueprint, cloud or desktop. Attach legible-consulting/house read-only. Read CLAUDE.md, README.md and conventions/README.md in the blueprint, then .icm/intake/blueprint-pipeline/breakdown.md in the house whole, then this ticket, .icm/intake/blueprint-pipeline/intake-contract.md, then the files its Notes name. Do what it says. One branch, one pull request to main in the blueprint, Conventional Commits, technical text in Simplified Technical English. Write what you will change and your questions in the pull request body, numbered, each with a default, and stop for Spec approved. On build: render the proof sets into a scratch folder with copier to check your work. Read check.yml. Do not merge. Then one pull request in the house that moves this stub to .icm/intake/blueprint-pipeline/_done/, the one write to the house. Your last message names both pull requests and what waits on Jamie.
