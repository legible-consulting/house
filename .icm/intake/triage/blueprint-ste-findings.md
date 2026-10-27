# Stub: Every markdown file in the blueprint passes the STE linter, or carries a reason to keep the text

- lane: chore
- found-by: the `writing` job of `check` run 40504908968 on legible-consulting/blueprint#22 · 2026-10-27
- complexity: medium
- priority: P2

## Problem

The `writing` job in the blueprint's `check.yml` reports 113 findings on `skills-and-ste` (`52815fe`): 69 hard. `main` before that pull request had 100: 62 hard. The job is advice and never fails, so the count grows with each unit. The job prints only the last 40 lines to the log. The full list is only in the run summary, which a session cannot read with `gh`. The findings seen in the log are semicolons, sentences over 25 words, passive voice and synonym pairs (`fix` and `correct`, `delete` and `remove`) in `workshop-kit/`. The other findings are in the rendered contracts, `conventions/README.md`, `README.md` and the two new skills.

## Proposed change

Print the full list in the job log. Then fix each real finding, and keep the text where the linter is wrong, with a reason.

## Acceptance criteria

- [ ] `check.yml`'s `writing` job prints every finding to the log, not the last 40 lines only. The run summary keeps its list.
- [ ] Each finding on the blueprint's `main` is fixed, or it is in a table in the pull request body with the file, the line, the rule and a one-line reason to keep the text.
- [ ] A fix keeps every hedge and every condition. A fix changes the words, not the meaning or the shape of a contract.
- [ ] `template/.claude/skills/{% if not workspace %}asd-ste100{% endif %}/` stays untouched. The job keeps skipping it.
- [ ] The pull request body gives the count before and after, hard and total.
- [ ] `check.yml` is green. No tag.

## Notes

- Repo `legible-consulting/blueprint`. Commits: `ci:` for the log change, `docs:` for the text.
- Run it after `blueprint-pipeline/words` (unit 10) merges. That unit rewrites `CLAUDE.md.jinja`, `conventions/README.md` and `README.md`, and a fix before it is done twice.
- The linter reports passive voice as "possible". A passive with no actor to name stays, with a reason.
- A finding in a rendered file reaches every build on the next `copier update`. Keep the contract's words where `.icm/intake/CONTEXT.md` or a lane uses them as a term.
- The stub moves to `_done/` in the next house pull request.

## Prompt

Repo legible-consulting/blueprint, cloud or desktop. Attach legible-consulting/house read-only. The ticket is .icm/intake/triage/blueprint-ste-findings.md in the house: read it first, then the blueprint's CLAUDE.md and check.yml. Do what it says. One branch, one pull request to main in the blueprint, Conventional Commits, technical text in Simplified Technical English. Read the finding list from the `writing` job log after the first push. Do not run the linter locally. Do not merge. Then one pull request in the house that moves this stub to .icm/intake/triage/_done/. Your last message names both pull requests.
