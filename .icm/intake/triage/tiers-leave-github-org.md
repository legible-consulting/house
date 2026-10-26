# Stub: The tiers leave the org repo: check-client's input and the profile page

- lane: chore
- found-by: the blueprint's v0.8.0, one template root and no tier · 2026-10-25
- complexity: low
- priority: P2

## Problem

The blueprint has one template root and a question bank since v0.8.0, and `tier` left `core/lexicon.md` and the build's contract on 2026-10-25. In `legible-consulting/.github`, `check-client.yml` still takes an input `tier` and tests `inputs.tier == 'workspace'`, and `profile/README.md` says the blueprint renders `site`, `app`, `platform` and `workspace`. Every live repo in `desk/mani.yaml` passes `tier` today: berceo, vinecliff, agorasim and jamienisbet pass `app`, remi-ai `platform`, site-proof `site`. GitHub refuses a `with:` key the called workflow does not declare, so the input cannot leave before the callers stop passing it.

## Proposed change

Two steps. First, in the `.github` repo: `check-client.yml` gains a boolean input `workspace` (default false) that drives the three branches, and keeps `tier` declared and read nowhere, so every caller keeps working; its header comment and the workflows README say so; the profile's blueprint row says one template rendered from its answers. Second, through conformance (`conformance/CONTEXT.md`), the six callers drop `with: tier`; when none passes it, `tier` leaves `check-client.yml` in one more pull request.

## Acceptance criteria

- [ ] `.github/workflows/check-client.yml` has the input `workspace`. A caller passes `with: { workspace: true }` for a client's ICM workspace, and nothing for a build. The three `if:` lines read `inputs.workspace`. `tier` stays declared and read nowhere, with a comment that says it leaves when no caller passes it.
- [ ] The pull request body lists the six callers that pass `tier` (read each with `gh api repos/<owner>/<repo>/contents/.github/workflows/ci.yml`) and names conformance as the step that drops it from each. No caller changes in this pull request.
- [ ] `.github/workflows/README.md` and `profile/README.md` name no tier.
- [ ] The repo's checks are green.

## Notes

One repo, `legible-consulting/.github`, public. Read first: its `README.md`, `.github/workflows/README.md`, `.github/workflows/check-client.yml`, `profile/README.md`; in the house, `desk/mani.yaml` (the live repos). The training module's workspace render (`house-modules/training`) is the first caller of `workspace: true`. Conventional Commits. The stub moves to `_done/` in the next house pull request.

## Prompt

Repo legible-consulting/.github, cloud with that repo attached or desktop at ~/Desktop/legible-consulting/.github. The ticket is .icm/intake/triage/tiers-leave-github-org.md in legible-consulting/house: read it first. Do what it says. One branch, one pull request to main, Conventional Commits. Do not merge. Your last message names the pull request.
