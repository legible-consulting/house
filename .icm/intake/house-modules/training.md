# Stub: Training: the workshop kit, the client workspace render and the coaching record

- feature-slug: training
- epic: house-modules
- sequence: 6 of 9
- depends-on: none
- complexity: high
- priority: P1

## Problem

The training line is improvised: no kit deliverable in a day, no template a client leaves with, no coaching record. Euro Register's week is the first workshop (`clients/euro-register/kickoff/programme.md`), planned by hand. On the blueprint's `main`, `workshop-kit/` holds a README. The pushed branch `course-material`, with no pull request, holds a five-session course: five session files, 23 activity sheets, a facilitator guide, a concepts map and `course/walk-test.md`; its README says "O4 produces into this folder", a module code the house dropped on 2026-10-25. Since v0.8.0 the blueprint has one template root and renders no workspace.

## Proposed change

Two pull requests, the blueprint's first. In the blueprint: the kit, in the shape question 1 settles, and the client workspace render. In the house: the module `training/` with a built Process that reads the kit from the blueprint and keeps a coaching record per client.

## Acceptance criteria

- [ ] Blueprint: the kit exists on `main` in the shape of question 1, with the walk test an attendee's workspace must pass. Each file cites the library path it rests on. At most one line of the course is quoted per file. Nothing client-specific. `workshop-kit/README.md` names the kit's files and no module code.
- [ ] Blueprint: a client workspace renders from the blueprint: `CLAUDE.md` with identity and routing, three stage folders with a `CONTEXT.md` each (Inputs, Process, Outputs, `status: stub`), one example gate, and a `ci.yml` that asks `check-client` for the contract check. How it is chosen is question 2. `check.yml` renders it as one more proof set.
- [ ] House: `training/CONTEXT.md` exists with Inputs, Process and Outputs, `status: built`, no placeholder line. Inputs name the kit in the blueprint, not a copy, and `core/services.md` (Workshop, Coaching, Training pricing). The Process says: plan the sessions first, then derive the client's programme from the plan; the workshop day from the kit; the coaching hours against the client's own workspace; the attendance record the client files (`core/services.md`, Workshop); the gate: Jamie delivers, a session drafts.
- [ ] House: a coaching record exists for Euro Register where question 3 puts it, and `clients/CONTEXT.md` holds that path. `clients/euro-register/kickoff/sources.md` names it.
- [ ] `CLAUDE.md` Routing gains the row. `core/lexicon.md`'s folder table shows `training/`.
- [ ] Both repos' `check.yml` runs are green.

## Out of scope

- Delivering Euro Register's week. Jamie's hand.
- The `tier` input of `check-client.yml`: `.icm/intake/triage/tiers-leave-github-org.md`. This stub uses the input that workflow offers on the day.

## Notes

Questions for Jamie, in the blueprint pull request body, before anything is built:

1. Which kit is the blueprint's? Default: the five-session course on the branch `course-material`, merged as it stands with the module code removed from its README; the one-day workshop (Marp slides, the exercises) is then cut from the course, not written apart (the sessions are designed first, and a client's programme derives from them).
2. How is a workspace chosen in `copier.yml`? Default: a question `workspace` (bool, default no) in the bank; yes renders the workspace files and no build file; `_subdirectory` stays one root.
3. Where does a coaching record live? Default: `clients/<slug>/training/record.md`, held by `clients/CONTEXT.md` as `*/training/*.md`.

Two checkouts on the desktop: `~/Desktop/legible-consulting/blueprint` (write) and `~/Desktop/legible-consulting/library` (read only, never edit). Read first in the blueprint: `CLAUDE.md`, `README.md`, `workshop-kit/README.md`, `conventions/README.md`, `copier.yml`, `.github/workflows/check.yml`. In the library: `CLAUDE.md`, `course/jake-van-clief/01_the-foundation/` (the start-here, the three layers, build-it-around-your-work), `research/design-trail/01-goals.md` (training's goal). In the house: `clients/euro-register/kickoff/programme.md`, `questions.md`, `sources.md` (the first week's plan; the kit and the week say the same thing), `core/services.md`. In the `.github` checkout: `.github/workflows/check-client.yml` (the workspace check). Public repo: STE in every `.md` and `.jinja`, Conventional Commits, do not tag.

## Prompt

Two repos, desktop. First legible-consulting/blueprint at ~/Desktop/legible-consulting/blueprint (write), with ~/Desktop/legible-consulting/library read only; then legible-consulting/house at ~/Desktop/legible-consulting/house. Read house CLAUDE.md, .icm/intake/CONTEXT.md, .icm/intake/house-modules/breakdown.md, then this ticket, .icm/intake/house-modules/training.md, then the files its Notes name. Open the blueprint pull request with what you will build and the three numbered questions, and stop until Jamie answers. Then build: the blueprint pull request (Conventional Commits, do not tag), then the house pull request (message starts with "training:", the stub moved to .icm/intake/house-modules/_done/). Never run build, lint or dev. Do not merge. Your last message names both pull requests and what waits on Jamie.
