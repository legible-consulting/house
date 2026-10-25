# Stub: A case Jamie merges at ready: true appears on jamienisbet.com

- feature-slug: publish-cases
- epic: render-and-publish
- sequence: 2 of 2
- depends-on: none
- complexity: medium
- priority: P2
- blocked: `house-modules/portfolio` is not merged, and the site repo's `one-app-at-root` stub is not merged (`content/work/` is not at its root yet). Remove this line when both are.

## Problem

The house holds every case at `clients/<slug>/case/case.md` with `ready: true | false`. The site reads `content/work/*.md` on the `main` of `k0d0minio/jamienisbet`. Nothing carries a ready case from one to the other but Jamie's hand.

## Proposed change

A workflow that, on a push to `main` that touches a case, writes every `ready: true` case into the site's `content/work/` and pushes it to the site's `main`. Jamie's merge of the case in the house is the gate. The run sends nothing to anyone.

## Acceptance criteria

- [ ] `.github/workflows/publish.yml` runs on `push` to `main` with paths `clients/*/case/case.md`, and on `workflow_dispatch`. It checks out the house, then `k0d0minio/jamienisbet` with the secret `SITE_PAT` into a second folder. `content/work/` in the site is the house's: the run empties it, then writes every case whose frontmatter says `ready: true` (mikefarah yq, `--front-matter=extract`) as `content/work/<slug>.md`, the slug from the frontmatter. No diff: no commit. Else it commits as `github-actions[bot]` with the message `house: cases <date>`, pushes to `main`, and rebases and retries three times like `rhythms.yml`. Actions pinned to a SHA. `permissions: contents: read`; the token does the write. No token in a command line. shellcheck clean.
- [ ] `.github/workflows/README.md` gains the row for `publish.yml`.
- [ ] `CLAUDE.md` Boundaries, the "Unattended runs only" line, names the publish run: it copies a case Jamie merged to the site's `main` and sends nothing to anyone; the merge in the house is the gate. With its why and date.
- [ ] The root `.env.example`, GitHub Actions secrets, gains `SITE_PAT` with its note: a fine-grained token on `k0d0minio/jamienisbet`, Contents read and write, set on the house. Name only.
- [ ] `check.yml` is green.

## Out of scope

- The site repo's `CLAUDE.md` saying `content/work/` is written by the house: a triage stub in that repo, named in the pull request body, not written here.
- Pages and posts (`content/site/`, `content/posts/`): question 1.

## Notes

Question for Jamie, in the pull request body:

1. Does the same run carry `content/site/*.md` and `content/posts/*.md` to the site once `house-modules/content` exists? Default: no; a second path and a second target folder come with that module.

Read first: `CLAUDE.md` (Boundaries, House rules), `.github/workflows/README.md`, `.github/workflows/rhythms.yml` (the pinned actions, the commit to `main` with three retries), `.github/workflows/check.yml` (the `scripts` job), `portfolio/CONTEXT.md` (the case shape), `clients/CONTEXT.md` (`public:`, the holds), `desk/mani.yaml` (the jamienisbet row), `.env.example` at the root (the Actions secrets section).

What waits on Jamie after the merge, in order: create the fine-grained token on `k0d0minio/jamienisbet` with Contents read and write and set it as the house Actions secret `SITE_PAT`; run `publish.yml` once by `workflow_dispatch` with no ready case, which makes no commit; flip one case to `ready: true` and merge it, which appears on jamienisbet.com after Vercel deploys.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, .icm/intake/CONTEXT.md, .icm/intake/render-and-publish/breakdown.md, then this ticket, .icm/intake/render-and-publish/publish-cases.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "publish:". Move the stub to .icm/intake/render-and-publish/_done/ in the same pull request. Never run the workflow's steps locally. No secret value, no token in a command line. Do not merge. Your last message names the pull request and the three things that wait on Jamie.
