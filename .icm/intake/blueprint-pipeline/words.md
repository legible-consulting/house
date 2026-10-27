# Stub: The routing table, the conventions and the README say what a build now carries and what a session may do after the tick

- feature-slug: words
- epic: blueprint-pipeline
- sequence: 10 of 13
- depends-on: check-yml-proofs
- complexity: low
- priority: P1

## Problem

`CLAUDE.md.jinja` routes a ticket, a plan, a CI change, a rendered file and the UAT verbs. It has no row for a one-off, a hotfix, work with no ticket, a question, or the merge after the tick. It says "A session never merges". `conventions/README.md` names three guards and two scripts. `README.md` lists the template as `v0.9.0` rendered it.

## Proposed change

Five rows and one rule change in `CLAUDE.md.jinja`. The conventions rows for Claude assets, lanes, scripts, commits, CI and UAT. The README's template and question tables. The blueprint's own `CLAUDE.md` line about hooks.

## Acceptance criteria

- [ ] `template/CLAUDE.md.jinja`, a build, five rows: a bug, a tweak or a chore, with or without a stub → `.icm/lanes/<lane>/CONTEXT.md`. Production is wrong now → `.icm/lanes/hotfix/CONTEXT.md`. Work with no ticket → `.icm/intake/CONTEXT.md` § A request with no stub. A question about the build, or a review → read and answer, no stub, no branch, no pull request. Merge, release or promote → `.icm/intake/CONTEXT.md` § After the tick, and `.icm/uat/CONTEXT.md` where it exists.
- [ ] The rule "`main` changes by pull request. Gates are human checkboxes: read them, never tick them. The merge is Jamie's." becomes: `main` changes by pull request. Gates are human checkboxes: read them, never tick them. Jamie ticks Ready to merge, and the session merges with `.icm/scripts/merge.sh`. With `release` yes: the release is Jamie's word `release` in the session. The UAT rule says the session dispatches `promote.yml` with `promote.sh run` after the client's word is recorded.
- [ ] A build's `CLAUDE.md` renders under 80 lines for every proof set.
- [ ] `conventions/README.md`: the `Guards` row becomes `Claude assets`: the six hooks, the three skills and `settings.json` are the blueprint's, byte for byte. A `Lanes` row. The `Scripts` row names `merge.sh`, `release.sh`, `--ready` and `--dry-run`. The `Commits` row names the type table. The `Gates` row says the session merges after the tick. The `UAT` row says the two-project shape, `preview-db.sh` and `promote.sh run`. The `CI` row is the shape unit 11 builds.
- [ ] `README.md`: the template table, the question table (`database`, `migrations_path`), the UAT table, the vendored skill's source, licence and commit.
- [ ] The blueprint's `CLAUDE.md`: its sentence on what `check.yml` renders and lints names the router test and the update proof.
- [ ] The `writing` job reports no new finding in the changed files.

## Out of scope

- The house's words: unit 12.

## Notes

Read first: the breakdown, `template/CLAUDE.md.jinja`, `conventions/README.md`, `README.md`, the blueprint's `CLAUDE.md`, and the contracts, lanes, scripts and workflows as units 2 to 9 left them. The `CLAUDE.md` of a build is written once, so a client repo that already has one gets the new rows through conformance, by hand. Say so in the pull request body.

## Prompt

Repo legible-consulting/blueprint, cloud or desktop. Attach legible-consulting/house read-only. Read CLAUDE.md, README.md and conventions/README.md in the blueprint, then .icm/intake/blueprint-pipeline/breakdown.md in the house whole, then this ticket, .icm/intake/blueprint-pipeline/words.md, then the files its Notes name. Do what it says. One branch, one pull request to main in the blueprint, Conventional Commits, technical text in Simplified Technical English. Render the proof sets into a scratch folder with copier and count the lines of CLAUDE.md. Read check.yml. Do not merge. Then one pull request in the house that moves this stub to .icm/intake/blueprint-pipeline/_done/, the one write to the house. Your last message names both pull requests and what waits on Jamie.
