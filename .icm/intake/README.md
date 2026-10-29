# Intake

The tickets of the house itself: a module the business needs and does not have yet, a change to the desk, a chore. The shape is the blueprint's; the contract is `CONTEXT.md` beside this file. The desk's Work page reads this folder on `main` and copies each stub's `## Prompt` as the words that start it in a session.

The epics, and what each holds. A finished epic sits whole in `_done/`:

| Epic | Holds |
|---|---|
| `triage/` | one-off chores: the estate's env cleanup, the blueprint's stale answer and its monorepo preview rule, the agent map for the two repos without one, the project register, and the adoptions of 2026-10-29: frontmatter schemas, the title check, the social fetch, conformance against the platform, the conventions' validation row, the home of a tool's why, kickoff's stale lines, the stub's Prompt section, the `AGENTS.md` pointer every agent reads |
| `blueprint-environments/` | the concept of a repo's own manifest, applied to the one fact the blueprint has no home for: where each build runs, as a table in a copier-owned file that the blueprint renders, CI checks and the desk reads, in five pull requests (re-cut 2026-10-29: the table left `README.md`) |
| `goose-worktrees/` | one ticket, one worktree, one session of the lane's agent, with no second application: a house script makes the worktree, copies the env files, runs the install and starts the agent; `new-run.sh` keeps the worktree's branch; goose and Emdash leave the stack, the blueprint and the machine, and Hermes Agent takes the lane and walks the whole loop once as its trial; each live repo gets the setup script, in seven pull requests |
| `salesman-writes-main/` | a salesman's structured action lands on `main` with no pull request: one table names every write the desk makes to `main` and the app refuses a write outside it, then the handoff is one commit, in two pull requests |
| `google-service-account/` | one Google service account with a key every runner reads, so `place.sh` and each Google read a contract owns run from the laptop, the cloud and CI without a connector, in three pull requests |
| `_done/salesman-desk/` | the salesman's desk: one language set in preferences, the kit as one document with a grammar in two parts and a reference, `/sell` as a course of lessons on a track, the pool row that draws its track and names the next step, the meeting as facts on the row, and every word of the salesman's pages in their language, in six pull requests. Closed 2026-10-29, before a salesman wrote a row |
| `_done/emdash-worktrees/` | the blueprint rendered `.emdash.json` and the setup script, CI parsed them, and the stack named Goose and Emdash. Emdash left on 2026-10-29, and `goose-worktrees` keeps the script |
| `_done/house-modules/` | the stage renumber, then the eight module contracts the goal interview named and the house does not have yet, each written from a real walk |
| `_done/render-and-publish/` | a client document becomes a branded PDF on its pull request; a ready case becomes a page on jamienisbet.com |
| `_done/desk-restyle/` | the desk's design system, its components and patterns, its app shell, the phone app, and every route restyled, in eleven pull requests |
| `_done/desk-forms/` | the free look on `/start`, the questionnaire Jamie sends by link on `/f/<token>`, the mail to Jamie, the client's sign-up and magic-link sign-in, in nine pull requests |
| `_done/blueprint-pipeline/` | the legacy ticket pipeline brought into the blueprint: the router, the lanes, the two skills and the writing reference, the board, the gated merge, the Neon database rule, the client CI shape, then `v1.0.0`, in thirteen pull requests |
| `_done/desk-ux/` | the desk read at a glance: the information rules in `DESIGN.md`, one ticket card and one track, a ticket page at its intake path, a project board in full screen, the Work page around its question, and the home and the other pages quieter, in six pull requests |

The decisions that bind every epic are in `CLAUDE.md` (Boundaries, House rules) and in each breakdown's own list. The order inside an epic is its `sequence`. The order across epics is `## Order` below, set by Jamie.

## Order

Set by Jamie on 2026-10-29. Lines 4 and 5 were the session's default from the classification in the pull request that cut them, and Jamie kept them in the session the same day. A finished epic carries no line.

1. triage
2. blueprint-environments
3. goose-worktrees
4. google-service-account
5. salesman-writes-main

## Jamie's hand

The steps of the house's own build that no session takes, because each reaches an account, the estate or money. The glance prints the bullets of this section (why: a step Jamie owes is a next action of the house itself · 2026-10-22). Each bullet opens with a short title in bold, the act in a few words: the desk shows the title as the row and keeps the rest until the row opens (why: a step's full line is detail · Jamie, 2026-10-27). A client's own next step lives on its record, not here. A line leaves when it is done.

- **Take vinecliff's and messy-play's Preview off production.** Vercel: `kodominio/vinecliff` Preview reads a UAT Neon project, never `vinecliff`; `kodominio/happymessmakers` Preview and Development read no production project. Both wait on no tag (`triage/env-cleanup-vinecliff.md`, `triage/env-cleanup-messy-play.md`). Check: Preview's `DATABASE_URL` host differs from Production's on both projects.
- **Activate a client user.** Neon, project `legible-desk`: one client user activated from its folder's Users card. Check: the person opens the mailed link and lands on the folder's page.
- **Close Berceo #68, promote, and walk Agorasim's go-live.** Berceo #68 merged as changelog and tag, or closed; then the next promotion through `promote.sh`. Agorasim's `go-live` epic through the loop.
- **Invite GPardas to the org.** GPardas invited as a member once 2FA is on. Check: listed by `gh api orgs/legible-consulting/members`.
- **Confirm the tax calendar with the contabilista.** The contabilista confirms the calendar in `core/accountant/02-trabalhador-independente-obligations.md`
  §5. Each confirmed date is written into §5 in place. Check: no ⚠️ remains in §5.
- **Check the first cold batch against the opt-out list.** Before the first batch of cold emails: check its role addresses against the Direção-Geral
  do Consumidor's opt-out list (`01-prospecting/legitimate-interest.md` §3). Check:
  the batch's rows carry a touch note that says so.
