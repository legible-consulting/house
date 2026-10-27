# Stub: The blueprint's own CI proves every rendered file, the router, the update from older tags and the writing skill's pin

- feature-slug: check-yml-proofs
- epic: blueprint-pipeline
- sequence: 9 of 13
- depends-on: preview-database
- complexity: medium
- priority: P1

## Problem

`check.yml` proves `copier copy` from `HEAD` for four answer sets. It never runs `copier update` from an older tag, so a failed merge, a deleted file or a leftover conflict marker shows first in a client repo. Three live repos sit on `v0.6.0`, which rendered from `templates/{{ tier }}`. The new hooks, skills, lanes and workflows need their `need` and `never` lines, the router needs its test run, and the vendored writing skill needs its pin compared.

## Proposed change

The render job gains the assertions and the router test. A new `update` job proves the update path. A new `ste` job compares the vendored skill with the pinned commit.

## Acceptance criteria

- [ ] The render job, builds: `need` the six hooks, the three skill folders, the four lanes, `merge.sh`, `release.sh`, `dependabot.yml`. With `database=neon`: `need` `.icm/database/CONTEXT.md`, `preview-db.sh`, `preview-db.yml`, `neon-cleanup.yml`. With any other answer: `never` the four. Workspaces: `never` the three build hooks, the skills, the lanes, the scripts. The matrix gains `database` and `migrations_path`, the `neon-nouat` set and the `mongodb-uat` set.
- [ ] The render job runs `bash .claude/hooks/route-request.test.sh` in a rendered build, and the `session-start.sh` fixture check from unit 7, and the `new-run.sh --dry-run` check from unit 4.
- [ ] The deny assertion from unit 1 holds.
- [ ] A new `update` job, two cases. From `v0.6.0`: `copier copy --vcs-ref v0.6.0 --defaults -d tier=app -d slug=zz -d client_name=Zz -d language=en . <dir>`, `git init -b main`, one commit, then `copier update --vcs-ref HEAD --defaults --conflict inline -d workspace=false -d monorepo=false -d release=true -d uat=false`. From `v0.8.0`: the same with the bank's answers and `uat=true`. After each update assert: no `<<<<<<<` or `>>>>>>>` marker in any file, `.copier-answers.yml` `_commit` names `HEAD`'s ref, every file the blueprint owns equals a fresh `HEAD` render with the same answers (`diff -r` with the written-once list excluded), the written-once files are untouched, and no file of the old render remains that `HEAD` does not render. A failure names the file.
- [ ] A new `ste` job: clones `danyuchn/asd-ste100-skill` at `STE_SKILL_SHA` and `diff -r` the vendored `template/.claude/skills/{% if not workspace %}asd-ste100{% endif %}/` against it, `.git` excluded. The `writing` job keeps running the linter from the same pin.
- [ ] shellcheck covers `.claude/hooks` and `.icm/scripts` in the render, as today. actionlint covers the new workflows.
- [ ] `check.yml` is green on the pull request.

## Out of scope

- The client repos' CI: unit 11.

## Notes

Read first: the breakdown, `.github/workflows/check.yml` whole, `copier.yml`, the history of the question bank (`git show v0.6.0:copier.yml`, `git show v0.8.0:copier.yml`), and copier's documentation on `copier update` (it renders the old version with the old answers and the new version with the new answers, diffs, and applies the diff, so a file the old render had and the new does not is deleted). The `update` job is the proof the test week needs, and unit 13 waits on it.

## Prompt

Repo legible-consulting/blueprint, cloud or desktop. Attach legible-consulting/house read-only. Read CLAUDE.md, README.md and conventions/README.md in the blueprint, then .icm/intake/blueprint-pipeline/breakdown.md in the house whole, then this ticket, .icm/intake/blueprint-pipeline/check-yml-proofs.md, then the files its Notes name. Do what it says. One branch, one pull request to main in the blueprint, Conventional Commits, technical text in Simplified Technical English. Write what you will change and your questions in the pull request body, numbered, each with a default, and stop for Spec approved. On build: push and read check.yml. Do not merge. Then one pull request in the house that moves this stub to .icm/intake/blueprint-pipeline/_done/, the one write to the house. Your last message names both pull requests and what waits on Jamie.
