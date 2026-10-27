# Stub: The house says the same as the blueprint about the merge, the hooks, the gate and the kickoff

- feature-slug: house-alignment
- epic: blueprint-pipeline
- sequence: 12 of 13
- depends-on: words
- complexity: low
- priority: P1

## Problem

`07-build/CONTEXT.md` says a session never merges. `core/stack.md` names three hooks. `core/lexicon.md`'s `gate` entry says Jamie ticks and nothing about the merge. The house's `.claude/settings.json` denies `Read(./**/.env.*)` and the house has an `.env.example`. `06-kickoff/CONTEXT.md` step 6 omits `--data workspace=false`, so copier prompts, and its checklist does not name Dependabot security updates or the `gate` ruleset.

## Proposed change

Six small edits in the house, one pull request.

## Acceptance criteria

- [ ] `07-build/CONTEXT.md`: step 6 reads: Jamie tests the preview and ticks Ready to merge, on GitHub or from the desk. The session merges with `.icm/scripts/merge.sh`. Step 7 says `release` is Jamie's word in the session and the session runs `release.sh`, and on a UAT build `promote.sh run` after the client's word. The Outputs line follows. One line routes a one-off to the repo's lane.
- [ ] `core/lexicon.md`, `gate`: a session reads a gate and never ticks it. Jamie ticks. After Ready to merge the session merges.
- [ ] `core/stack.md`: the hooks table names the router and the board as build-only hooks the blueprint renders, with their events. The house carries the three guards only.
- [ ] `.claude/settings.json` in the house: the named deny list from unit 1, `desk/app/dist/**/*` and `desk/app/node_modules/**/*` kept.
- [ ] `06-kickoff/CONTEXT.md`: step 6 adds `--data workspace=false` and the `database` answer (`none`, `neon`, `mongodb` or `other`) and, on `neon`, `migrations_path`. The gate paragraph adds two acts of Jamie's: Dependabot security updates on in the repository's settings, and a ruleset on `main` that requires the `gate` check.
- [ ] `CLAUDE.md`'s Boundaries line "Never, even if asked in the moment: ... merge or release" gains one clause: in the house. A client repo's merge after the tick is the blueprint's rule (why: the house's own pull requests carry no gate · 2026-10-27).
- [ ] `check.yml` in the house is green.

## Out of scope

- Conformance of the live repos.

## Notes

Read first: `CLAUDE.md`, `07-build/CONTEXT.md`, `06-kickoff/CONTEXT.md`, `core/lexicon.md`, `core/stack.md`, `.claude/settings.json`, and the blueprint's `CLAUDE.md.jinja`, `conventions/README.md` and `copier.yml` as unit 10 left them. Each rule keeps its why and its date.

## Prompt

Repo legible-consulting/house, cloud or desktop. Attach legible-consulting/blueprint read-only. Read CLAUDE.md, .icm/intake/CONTEXT.md, .icm/intake/blueprint-pipeline/breakdown.md whole, then this ticket, .icm/intake/blueprint-pipeline/house-alignment.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "house:" and carries one why. Move the stub to .icm/intake/blueprint-pipeline/_done/ in the same pull request. Read check.yml. Do not merge. Your last message names the pull request and what waits on Jamie.
