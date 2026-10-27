# {{CLIENT_NAME}}: kickoff note

<!-- The template (06-kickoff/CONTEXT.md, step 4). Fill every {{PLACEHOLDER}} from the kickoff
answers, the agreement and the proposal. A line nobody said is not written: ask Jamie. Drop
this comment. -->

The working agreement as it stands on {{YYYY-MM-DD}}, from the kickoff answers of
{{ANSWERS_DATE}} and Jamie's answers of {{JAMIE_DATE}}. This note records the rhythm, not the
terms. The terms are in `proposal/proposal.md` and `agreement/agreement.md`.

## Roles

- **{{DECIDES}}** decides what the product says and does. {{HOW_THEY_DECIDE: alone, or
  together and by which channel}}.
- **{{TESTS}}** tests the work and says yes before it reaches production.
- **{{CONTENT_OWNER}}** owns the words and the look: {{BRAND_AND_WORDS: the brand files, the
  photos, who writes the text}}.
- **Jamie Nisbet** builds alone. He owns the repo `k0d0minio/{{SLUG}}`, the Vercel team
  `{{VERCEL_TEAM}}`, the merge and the release.

## Rhythm

- The channel is {{CHANNEL}}, in {{CLIENT_LANGUAGE_NAME}}.
- {{CADENCE: a weekly call, or feedback in rounds, one list per round}}.
- Go-live: {{GO_LIVE: the date and why that date, or "no fixed date; go-live happens when the
  client says yes on UAT"}}.

## How work flows

1. {{SOURCE_OF_WORK: a feedback round, a user story, the proposal's scope}} becomes epics
   under `.icm/intake/` in the client repo: one folder per epic with a `breakdown.md`, one
   stub per unit of work, `triage/` for one-offs. The breakdown's `source:` line names where
   the work came from. The client's documents stay in Drive and never enter the repo.
2. One stub is one branch and one pull request. `.icm/scripts/new-run.sh` starts it. A
   `medium`, `high` or `research` stub, or a stub that leaves a decision open, carries the
   **Spec approved** gate.
3. CI runs `check-client` and Vercel builds a preview. Nothing runs locally.
4. Jamie tests the preview and ticks **Ready to merge**. The session merges with
   `.icm/scripts/merge.sh`. A session never ticks a gate.
5. {{RELEASE: for `uat: yes`, every merge deploys UAT at <address>, and the client tests
   there. On Jamie's word, the session records the yes with
   `.icm/scripts/promote.sh approve --by "<who>"`. On Jamie's word `release`, the session
   merges the release pull request with `.icm/scripts/release.sh`. On Jamie's word `promote`,
   the session runs `.icm/scripts/promote.sh run --tag <tag>`, which dispatches `promote.yml`.
   For `uat: no`, the client signs off on the preview, and the merge of the release pull
   request, on Jamie's word `release`, is the release.}}

## Questions for the client

- A session writes them numbered, one per line, each with a default answer, in the breakdown
  under « What I understood » or in the pull request under « Questions ».
- They reach {{DECIDES}} in {{CLIENT_LANGUAGE_NAME}}, by {{CHANNEL}}, from Jamie. Jamie carries
  the answers back into the stub or the breakdown.

## Scope rules

- A defect inside the written scope is fixed before handover. A change outside it is a new
  proposal (`core/terms.md` § Validity and revisions).
- {{SCOPE_LINES: what the proposal puts in and out, and what waits until after go-live}}.
- Client-facing text in {{SITE_LANGUAGES}}. Code, commits and notes in English.

## What the client owes before launch

- {{OWED: the texts, the photos, the legal texts, the payment account in the client's name,
  an account to open. One line each, from the kickoff answer `before_launch`.}}

## The estate

- Repo: `k0d0minio/{{SLUG}}`, rendered from the blueprint {{BLUEPRINT_TAG}} with `monorepo`
  {{MONOREPO}}, `release` {{RELEASE_ANSWER}}, `uat` {{UAT}}.
- Vercel team `{{VERCEL_TEAM}}`, project `{{VERCEL_PROJECT}}`: {{DOMAINS}}.
- {{DATABASE: the Neon project, and the UAT branch or project}}.
- Secret names only, in `kickoff/access-table.md`. Values live in Vercel and GitHub settings.
