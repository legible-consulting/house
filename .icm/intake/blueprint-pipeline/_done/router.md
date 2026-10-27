# Stub: Every prompt in a build is read by a deterministic router that names the contract to follow

- feature-slug: router
- epic: blueprint-pipeline
- sequence: 6 of 13
- depends-on: scripts
- complexity: medium
- priority: P1

## Problem

A build has no prompt hook. The model routes from the `CLAUDE.md` table alone, and a bare form such as `bug login-button` or `new` is read by judgement. The legacy `route-request.sh` routed every prompt in under 100 ms with no model, and it worked. It routed to a `/pipeline` skill and resolved slugs against run folders that the blueprint does not have.

## Proposed change

Port the hook with its three layers. Its targets are the contracts: the loop, the lanes, the UAT contract. Slugs resolve against `.icm/intake/`. Its fixture test is ported with it and runs in `check.yml`.

## Acceptance criteria

- [ ] `template/.claude/hooks/{% if not workspace %}route-request.sh{% endif %}` and `{% if not workspace %}route-request.test.sh{% endif %}` exist, mode 755, shellcheck clean. Unit 1's commented `UserPromptSubmit` registration is uncommented.
- [ ] The contract from the legacy hook holds: exit 0 always, never a block, stdout one JSON line with `hookSpecificOutput.additionalContext` or nothing, fail-open on any malformed input, `jq` only, under 100 ms.
- [ ] Silent on: a slash command, a skill body (`---` then `name:`), a webhook or task payload, a prompt under 15 characters, a question opener (`what`, `why`, `how`, `where`, `when`, `who`, `which`, `is`, `are`, `can`, `could`, `does`, `do`, `should`, `would`, `will`, `explain`, `tell`), an analysis word (`analyse`, `analyze`, `audit`, `review`, `investigate`, `compare`, `assess`, `evaluate`, `inspect`, `summarise`, `summarize`, `understand`), and a prompt that contains `.icm/intake/` or `new-run.sh` (the desk's start prompt is already routed).
- [ ] The gate is `.icm/intake/CONTEXT.md`. Absent, the hook exits silently.
- [ ] The prefix is `[router]`. A `Route:` line names the contract to read and the command to run. Its tail says: this line comes from `.claude/hooks/route-request.sh`, a `Route:` line names the contract to read before anything else, and the user's own prompt overrides it. A `Suggest:` line is advisory.
- [ ] The forms and their routes: `new` → the loop step 1. `new <slug>` → the open stub, `new-run.sh <epic>/<slug>`; in `_done/` with a branch → resume; not found → list the open stubs and ask. `build <slug>` → resume, or stop. `revise <slug> "<change>"` → the loop § Revise. `merge <slug>` → `merge.sh`, then one read of `ci` on `main`. `release` → `release.sh`, and the UAT contract where it exists. `bug|tweak|chore <slug>` → the open triage stub, the lane, `new-run.sh triage/<slug>`; not found → ask: a fresh report, or a mistyped name. `bug|tweak|chore <free text>` → the lane with a fresh report, the triage stub first. `hotfix <text>` → the hotfix lane. `plan <text>` and `scope <text>` → cut an epic, then stop for Jamie's review. `promote <verb>` → the UAT contract where it exists, else say there is none.
- [ ] `resolve_slug` looks in `.icm/intake/*/<slug>.md` (not `triage/`), `.icm/intake/triage/<slug>.md`, then every `_done/<slug>.md`, then `.icm/intake/_done/<epic>/`. A `_done/` hit says started, resume on branch `<slug>` or `triage/<slug>`. A closed-epic hit says shipped.
- [ ] The classifiers (bug, tweak, chore words), the mentioned-slug rule, the six-bullet or 800-character dump (→ cut an epic) and the work-verb rule (→ write the stub first, the contract § A request with no stub) hold as in the legacy hook.
- [ ] `route-request.test.sh` builds a fixture tree in the new shape (one open epic stub, one `_done/` stub, one open triage stub, one `_done/` triage stub, one closed epic, `intake/CONTEXT.md`) and asserts one case per form above, each silence, each classifier, the desk's start prompt (silent), a question (silent), an audit request (silent), a six-bullet dump (cut an epic). Exit 0 when every case passes.
- [ ] `check.yml` runs `bash .claude/hooks/route-request.test.sh` in the rendered build and asserts the two files absent in a workspace.

## Out of scope

- The `CLAUDE.md` rows the router points at: unit 10.

## Notes

Read first: the breakdown, the intake contract and the lanes as units 2 and 3 left them, unit 4's scripts, the desk's `startPrompt` in `desk/app/lib/work.ts` of the house (the prompt the hook must leave alone), and the legacy `route-request.sh` and `route-request.test.sh` in `~/Desktop/Apps/_system/template/claude/hooks/` or in `k0d0minio/icm-board`. Keep the legacy's structure and its comments where they still hold. The `[pipeline-router]` prefix, `/pipeline`, `runs_archive`, `project.json`, `triage report|batch|prune` and `knowledge` leave.

## Prompt

Repo legible-consulting/blueprint, cloud or desktop. Attach legible-consulting/house read-only. Read CLAUDE.md, README.md and conventions/README.md in the blueprint, then .icm/intake/blueprint-pipeline/breakdown.md in the house whole, then this ticket, .icm/intake/blueprint-pipeline/router.md, then the files its Notes name. Do what it says. One branch, one pull request to main in the blueprint, Conventional Commits, technical text in Simplified Technical English. Write what you will change and your questions in the pull request body, numbered, each with a default, and stop for Spec approved. On build: render the proof sets into a scratch folder with copier and run the fixture test there. Read check.yml. Do not merge. Then one pull request in the house that moves this stub to .icm/intake/blueprint-pipeline/_done/, the one write to the house. Your last message names both pull requests and what waits on Jamie.
