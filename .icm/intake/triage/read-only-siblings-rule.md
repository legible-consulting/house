# Stub: A session may attach the sibling repos read-only, and the rule says so

- lane: chore
- found-by: Jamie's plan of the week · 2026-10-22
- complexity: low
- priority: P2

## Problem

`CLAUDE.md`'s rule "One session, one repo" names kickoff as the one exception. A cloud session can attach `blueprint`, `library` and `.github` read-only beside the house, and no rule says it may. `core/stack.md` § Cloud environment lists no repositories.

## Proposed change

Prove the read from a cloud session with the siblings attached, then write the sentence.

## Acceptance criteria

- [ ] From a `legible` cloud session with the house attached and the three siblings attached read-only, `gh api repos/legible-consulting/blueprint --jq .full_name` answers, and `cat ../blueprint/README.md` prints the file. The pull request body quotes both.
- [ ] `CLAUDE.md` § House rules, "One session, one repo", gains one sentence: a session may attach the sibling repos read-only, and kickoff is still the one session that writes to two (why: a cloud session loads hooks from one repo only, and a read needs no hook · 2026-10-22).
- [ ] `core/stack.md` § Cloud environment gains the row "Repositories: house, plus the siblings read-only".
- [ ] The library's `CLAUDE.md` rule "never edit" is named as the guard and stays unchanged.
- [ ] `check.yml` is green.

## Notes

Read first: `CLAUDE.md`, `core/lexicon.md` (The repos), `core/stack.md` § Cloud environment. One pull request, message starts with "house:".

## Prompt

Repo legible-consulting/house, cloud session with the house attached and legible-consulting/blueprint, library and .github attached read-only. Read CLAUDE.md, .icm/intake/CONTEXT.md, then this ticket, .icm/intake/triage/read-only-siblings-rule.md. Prove the read as the ticket says, then do the rest. One branch, one pull request to main, message starts with "house:". Move the stub to .icm/intake/triage/_done/ in the same pull request. Do not merge. Your last message names the pull request.
