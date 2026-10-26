# Stub: The tiers leave the org repo: check-client's input and the profile page

- lane: chore
- found-by: the blueprint's v0.8.0, one template root and no tier · 2026-10-25
- complexity: low
- priority: P2

## Problem

The blueprint has one template root and a question bank since v0.8.0, and `tier` left `core/lexicon.md` and the build's contract on 2026-10-25. In `legible-consulting/.github`, `check-client.yml` still takes an input `tier` and tests `inputs.tier == 'workspace'`, and `profile/README.md` says the blueprint renders `site`, `app`, `platform` and `workspace`. Every live repo in `desk/mani.yaml` passes `tier` today: berceo, vinecliff, agorasim and jamienisbet pass `app`, and remi-ai `platform`. GitHub refuses a `with:` key the called workflow does not declare, so the input cannot leave before the callers stop passing it.

## Proposed change

`tier` leaves entirely, in one wave, callers first. Through conformance (`conformance/CONTEXT.md`), the five callers drop `with: tier` from their `ci.yml`, one pull request per repo; a build passes nothing, which the workflow accepts today. Then, in the `.github` repo, `check-client.yml` takes a boolean input `workspace` (default false) in place of `tier`, with the same three branches; its header comment and the workflows README say so; the profile's blueprint row says one template rendered from its answers. No input is kept for compatibility (Jamie, 2026-10-26).

## Acceptance criteria

- [ ] The five callers' `ci.yml` pass no `tier` (read each with `gh api repos/<owner>/<repo>/contents/.github/workflows/ci.yml`), by one conformance pull request per repo, merged before the `.github` pull request.
- [ ] `.github/workflows/check-client.yml` has no `tier` input. A caller passes `with: { workspace: true }` for a client's ICM workspace, and nothing for a build. The three `if:` lines read `inputs.workspace`. The `.github` pull request body lists the five caller pull requests.
- [ ] `.github/workflows/README.md` and `profile/README.md` name no tier.
- [ ] The repo's checks are green.

## Notes

Six repos: the five callers through conformance, then `legible-consulting/.github`, public. Read first: `conformance/CONTEXT.md`; its `README.md`, `.github/workflows/README.md`, `.github/workflows/check-client.yml`, `profile/README.md`; in the house, `desk/mani.yaml` (the live repos). The training module's workspace render (`house-modules/training`) is the first caller of `workspace: true`. Conventional Commits. The stub moves to `_done/` in the next house pull request.

## Prompt

Desktop. The ticket is .icm/intake/triage/tiers-leave-github-org.md in legible-consulting/house at ~/Desktop/legible-consulting/house: read it first, then conformance/CONTEXT.md. First the five callers, through conformance: one pull request per repo that drops `with: tier`, Conventional Commits. Then legible-consulting/.github at ~/Desktop/legible-consulting/.github: one branch, one pull request to main, Conventional Commits. Do not merge. Your last message names every pull request and the order they merge in.
