# Stub: Portfolio: a case study per finished build, in the client's folder, as the client allowed

- feature-slug: portfolio
- epic: house-modules
- sequence: 8 of 9
- depends-on: none
- complexity: medium
- priority: P2

## Problem

Proposals cite work from memory. Four case studies live on jamienisbet.com and nowhere in the house. No record says what a client allowed in public, so a case that names a client without their word costs the reference.

## Proposed change

A `public:` field on every record, the module `portfolio/` with a built Process, one case file per client at `clients/<slug>/case/case.md` in the shape the site reads, and the four cases on the site seeded as case files at `ready: false`.

## Acceptance criteria

- [ ] `clients/_template/record.md` gains `public:` with no value. The record table in `clients/CONTEXT.md` defines it: `named` (the name, the logo and a link), `anonymous` (the trade; no name, no logo, no link), `none` (no case). Empty reads as `none`. Jamie sets it by a commit, from the client's email, which stays outside git. The rule carries its why and date.
- [ ] `portfolio/CONTEXT.md` exists with Inputs, Process and Outputs, `status: built`, no placeholder line. Inputs: the client's `handover/pack.md`, `record.md`'s `public:`, `core/voice.md`, `core/services.md`. Output: `clients/<slug>/case/case.md`, one per client, held by `clients/CONTEXT.md` as `*/case/*.md`. No `cases/` folder and no `index.md`.
- [ ] The case shape is the site's frontmatter (`slug`, `title`, `summary`, `client`, `year`, `services`, `stack`, `outcome`, `featured`, `order`, `cover`, `url`) plus `ready: true | false`. The body: the client in one line, the problem in their words, what was built, what changed for them, one figure when the client agrees, the stack in one line. Services use the six lines of `core/services.md`. English, first person, the register of `core/voice.md`. With `public: anonymous`, `client` and `url` are absent and the text names no one. With `public: none`, no case file. `ready` flips to `true` by Jamie's commit only.
- [ ] Four case files exist at `ready: false`: Agorasim and Vinecliff in their folders; the two other cases on the site in a folder each, opened from `_template/record.md` at `stage: after`, `kind: build`, `public:` empty. A next action in the site's frontmatter comments goes to that client's `next_action`; every other comment is dropped.
- [ ] `03-proposal/CONTEXT.md` Inputs name `clients/*/case/case.md` as the work a proposal cites. `CLAUDE.md` Routing gains the row. `core/lexicon.md`'s folder table shows `portfolio/`.
- [ ] No `public:` value and no `ready: true` is set for any client in this pull request. The pull request body lists, per client, what Jamie must set in `public:` and whether an email already says it.
- [ ] `check.yml` is green.

## Out of scope

- The script that puts a ready case on the site: `portfolio/publish.sh`.
- Any price in a case.

## Notes

Read only, never edit: `k0d0minio/jamienisbet` on `main`, `lib/work.ts` (the frontmatter fields the site reads) and `content/work/*.md` (the four cases), by `gh api` or at `~/Desktop/legible-consulting/projects/jamienisbet`. The case files and the client folders hold every fact a case file takes. A fact in neither is a numbered question for Jamie in the pull request body.

Read first in the house: `CLAUDE.md`, `clients/CONTEXT.md`, `clients/_template/record.md`, `clients/agorasim/record.md`, `clients/vinecliff/record.md`, `core/voice.md`, `core/identity.md`, `core/services.md`. The site is jamienisbet.com, `k0d0minio/jamienisbet`. A case is public text in English, first person. The stage folders carry their final numbers after `stage-numbers`; before it, the proposal's contract is `02-proposal/CONTEXT.md`.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, .icm/intake/CONTEXT.md, .icm/intake/house-modules/breakdown.md, then this ticket, .icm/intake/house-modules/portfolio.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "portfolio:". Move the stub to .icm/intake/house-modules/_done/ in the same pull request. Never run build, lint or dev. Set no public: value and no ready: true. Do not merge. Your last message names the pull request and, per client, what waits on Jamie.
