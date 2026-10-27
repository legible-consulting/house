# Stub: Content: site copy and posts drawn from the cases, the verdicts and the concepts

- feature-slug: content
- epic: house-modules
- sequence: 9 of 9
- depends-on: portfolio
- complexity: medium
- priority: P2

## Problem

The business is not visible for the work it did. The site's copy and any post are written ad hoc, with no source named and no review step.

## Proposed change

The module `content/` with a built Process: a page or a post is drawn from a case, a verdict or a concept, reviewed by Jamie, and reaches the site by a named route. Two pages written through it: the home and the services page.

## Acceptance criteria

- [ ] `content/CONTEXT.md` exists with Inputs, Process and Outputs, `status: built`, no placeholder line. Its `holds:` names `site/*.md` and `posts/*.md`.
- [ ] The Process says: what a page or a post is drawn from (a case at `clients/*/case/case.md`, a verdict or a concept in `research/`); the shape of `site/<page>.md` and `posts/<date>-<slug>.md`; the review by Jamie; how a file reaches the site, naming the repo (`k0d0minio/jamienisbet`) and the path, or Jamie's hand until the publish script carries pages (`portfolio/publish.sh`; question 1 of `.icm/intake/render-and-publish/_done/publish-cases.md`).
- [ ] `content/site/home.md` and `content/site/services.md` exist, written from `core/identity.md` and `core/services.md` in the register of `core/voice.md`, first person. No number from the pricing table (`core/services.md`: never public).
- [ ] `CLAUDE.md` Routing gains the row. `core/lexicon.md`'s folder table shows `content/`.
- [ ] `check.yml` is green.

## Out of scope

- Publishing: the script is `portfolio/publish.sh`.
- Any post about a client without a `ready: true` case.

## Notes

Read first: `CLAUDE.md`, `core/identity.md`, `core/services.md`, `core/voice.md`, `portfolio/CONTEXT.md` (the case shape), `research/CONTEXT.md` (the verdicts and concepts), and `.github/profile/README.md` in the `.github` checkout (the org's public words, which say "we"; the site says "I").

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, .icm/intake/CONTEXT.md, .icm/intake/house-modules/breakdown.md, then this ticket, .icm/intake/house-modules/content.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "content:". Move the stub to .icm/intake/house-modules/_done/ in the same pull request. Never run build, lint or dev. No price on a page. Do not merge. Your last message names the pull request and what waits on Jamie.
