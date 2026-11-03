# Why — 06-kickoff

The why and the date behind each rule of this folder's files. No Inputs name this file.
Read it when you change a rule, not when you follow one. A rule without a why is deleted.

## CONTEXT.md

- The form is one way to collect them, not the only way
  Why: Jamie often knows the answers after a call, and the access table, the note and the first epic read one file, whoever filled it · Jamie, 2026-10-26.
- Write `clients/<slug>/kickoff/access-table.md` and `kickoff-note.md` from the templates in this folder, in English
  Why: both are internal notes · `CLAUDE.md`, Boundaries.
- A plaintext credential found in an answer, a mail or a repo is flagged to Jamie in the PR body and never copied
  Why: a secret in git outlives every rotation · `.claude/rules/clients.md`.
- A session never creates a repo
  Why: a new repo reaches the estate · 2026-10-26.
- A question with no answer in the command makes copier prompt
  Why: a prompt stops a session that runs cold · 2026-10-27.
- Another answer stays in `.copier-answers.yml`, so the blueprint learns what those builds need
  Why: sustentus runs MongoDB and will join the estate · Jamie, 2026-10-27.
- This is the one push to a client repo's `main` that is not a pull request
  Why: a pull request needs a base branch, and an empty repo has none. Every later change is a pull request, `07-build/CONTEXT.md` · 2026-10-26.
- The new repo's `.icm/environments.md` holds the Vercel projects, the addresses and the databases, and the record holds no copy
  Why: one home per fact · Jamie, 2026-10-29.
- `repo:` is set already, so kickoff ends when the first epic merges, and the next session that finds the merge moves `stage` to `build`
  Why: a done marker that was true before kickoff started says nothing · Vinecliff, 2026-10-26.
- The kickoff form is not sent, and no repo is rendered
  Why: the form asks what a build asks, and a week asks about people, rooms and data · Euro Register, 2026-10-22.
- In the client repo's settings, Jamie turns on Dependabot security updates, and adds a ruleset on `main` that requires the `gate` check (`gate / gate`, never `code`)
  Why: both are repository settings that no rendered file can set, and the `gate` check is the guard GitHub enforces on the merge · Jamie, 2026-10-27.
