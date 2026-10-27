# Stub: A case Jamie merges at ready: true appears on jamienisbet.com

- feature-slug: publish-cases
- epic: render-and-publish
- sequence: 2 of 2
- depends-on: none
- complexity: small
- priority: P2

## Problem

The house holds every case at `clients/<slug>/case/case.md` with `ready: true | false`. The site reads `content/work/*.md` on the `main` of `k0d0minio/jamienisbet`. Nothing carries a ready case from one to the other but Jamie's hand.

## Proposed change

A script in the house that Jamie runs from the local lane. It writes every `ready: true` case into the local clone's `content/work/` and pushes it to the site's `main` with Jamie's own git login. Jamie's merge of the case in the house, and his yes to the script's prompt, are the gate. The script sends nothing to anyone.

## Acceptance criteria

- [ ] `portfolio/publish.sh` finds the clone of `k0d0minio/jamienisbet` from `desk/mani.yaml`, or from its first argument. It stops when the clone is not on `main` or has uncommitted changes, then pulls `main` fast-forward only. `content/work/` in the site is the house's: the script empties it, then writes every case whose frontmatter says `ready: true` (mikefarah yq, `--front-matter=extract`) as `content/work/<slug>.md`, the slug from the frontmatter. A bad slug or two ready cases with one slug: nothing is written. No diff: no commit. Else it shows the diff stat, asks, and on `y` commits `house: cases <date>` and pushes to `main`. On any other answer the clone is as it was. No token. shellcheck clean.
- [ ] `portfolio/CONTEXT.md` holds `publish.sh` and says how the site receives a ready case.
- [ ] `check.yml` is green.

## Out of scope

- The site repo's `CLAUDE.md` saying `content/work/` is written by the house: a triage stub in that repo, named in the pull request body, not written here.
- Pages and posts (`content/site/`, `content/posts/`): question 1.

## Notes

Question for Jamie, in the pull request body:

1. Does the same script carry `content/site/*.md` and `content/posts/*.md` to the site once `house-modules/content` exists? Default: no; a second path and a second target folder come with that module.

Read first: `CLAUDE.md` (Boundaries, House rules), `portfolio/CONTEXT.md` (the case shape), `clients/CONTEXT.md` (`public:`, the holds), `desk/mani.yaml` (the jamienisbet row), `conformance/drift.sh` (a local-lane script that reads `desk/mani.yaml`).

What waits on Jamie after the merge, in order: run `bash portfolio/publish.sh` once and read the diff stat before the prompt; flip one case to `ready: true`, merge it, and run the script again, which appears on jamienisbet.com after Vercel deploys.
