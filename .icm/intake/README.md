# Intake

The tickets of the house itself: a module the business needs and does not have yet, a change to the desk, a chore. The shape is the blueprint's; the contract is `CONTEXT.md` beside this file. The desk's Work page reads this folder on `main` and copies each stub's `## Prompt` as the words that start it in a session.

The epics, and what each holds. A finished epic sits whole in `_done/`:

| Epic | Holds |
|---|---|
| `triage/` | one-off chores: a rule, a walk, a stale path, a licence, the tiers leaving the org repo, the pool's no and purge |
| `salesman-desk/` | the salesman's desk: one language set in preferences, the kit as one document with a grammar in two parts and a reference, `/sell` as a course of lessons on a track, the pool row that draws its track and names the next step, the meeting as facts on the row, and every word of the salesman's pages in their language, in six pull requests |
| `_done/house-modules/` | the stage renumber, then the eight module contracts the goal interview named and the house does not have yet, each written from a real walk |
| `_done/render-and-publish/` | a client document becomes a branded PDF on its pull request; a ready case becomes a page on jamienisbet.com |
| `_done/desk-restyle/` | the desk's design system, its components and patterns, its app shell, the phone app, and every route restyled, in eleven pull requests |
| `_done/desk-forms/` | the free look on `/start`, the questionnaire Jamie sends by link on `/f/<token>`, the mail to Jamie, the client's sign-up and magic-link sign-in, in nine pull requests |
| `_done/blueprint-pipeline/` | the legacy ticket pipeline brought into the blueprint: the router, the lanes, the two skills and the writing reference, the board, the gated merge, the Neon database rule, the client CI shape, then `v1.0.0`, in thirteen pull requests |
| `_done/desk-ux/` | the desk read at a glance: the information rules in `DESIGN.md`, one ticket card and one track, a ticket page at its intake path, a project board in full screen, the Work page around its question, and the home and the other pages quieter, in six pull requests |

The decisions that bind every epic are in `CLAUDE.md` (Boundaries, House rules) and in each breakdown's own list. The order inside an epic is its `sequence`. The order across epics is `## Order` below, set by Jamie.

## Order

Set by Jamie on 2026-10-28. A finished epic carries no line.

1. salesman-desk
2. triage

## Milestones

Set by Jamie on 2026-10-22. A line leaves when it is true.

- The factory is done: no contract on the customer path is a stub (client research, the agreement, kickoff, handover, the desk), and the desk shows truth to all three roles. The blueprint's questionnaire is designed and reviewed: done, v0.8.0.
- Then one real deal and one real build run through the house: MotoArk walks `research` → `proposal` → `agreement` in the folders; Vinecliff ships a release through the build; Jamie and one salesman (Cunha) sign in to the desk; every repo is where its owner wants it.
- Client work (MotoArk's send, Vinecliff's kickoff, Berceo's and Agorasim's releases) waits for the factory (why: the estate is the factory; a client run through a half-built factory proves nothing · 2026-10-22).

## Jamie's hand

The steps of the house's own build that no session takes, because each reaches an account, the estate or money. The glance prints the bullets of this section (why: a step Jamie owes is a next action of the house itself · 2026-10-22). Each bullet opens with a short title in bold, the act in a few words: the desk shows the title as the row and keeps the rest until the row opens (why: a step's full line is detail · Jamie, 2026-10-27). A client's own next step lives on its record, not here. A line leaves when it is done.

- **Add the meeting columns to the pool.** Neon, project `legible-desk`, SQL editor: run
  `desk/app/db/schema.sql` once more, for the three meeting columns on `prospects`. Until then
  the move to `meeting` answers with an error. Check: `select meeting_at, meeting_with,
  meeting_where from prospects limit 1` runs.
- **Activate a client user.** Neon, project `legible-desk`: one client user activated from its folder's Users card. Check: the person opens the mailed link and lands on the folder's page.
- **Close Berceo #68, promote, and walk Agorasim's go-live.** Berceo #68 merged as changelog and tag, or closed; then the next promotion through `promote.sh`. Agorasim's `go-live` epic through the loop.
- **Set THROTTLE_SALT on legible-desk.** `THROTTLE_SALT` on the Vercel project `legible-desk`, production and preview: the output of
  `openssl rand -hex 32`. Until it is set, `/start` answers every submission with an error.
  Check: `vercel env ls --scope kodominio` on `legible-desk` lists it for both.
- **Invite GPardas to the org.** GPardas invited as a member once 2FA is on. Check: listed by `gh api orgs/legible-consulting/members`.
- **Confirm the tax calendar with the contabilista.** The contabilista confirms the calendar in `core/accountant/02-trabalhador-independente-obligations.md`
  §5. Each confirmed date is written into §5 in place. Check: no ⚠️ remains in §5.
- **Check the first cold batch against the opt-out list.** Before the first batch of cold emails: check its role addresses against the Direção-Geral
  do Consumidor's opt-out list (`01-prospecting/legitimate-interest.md` §3). Check:
  the batch's rows carry a touch note that says so.
- **Import or delete the 117 old prospect rows.** The 117 prospect rows compiled on 2026-07-23 are in three places nothing reads: Neon
  project `jamie-nisbet` (`restless-rain-15879798`, schema `biz`) and the two archives
  `desk/app/biz-2026-10-22-backup.tar.gz` and `desk/app/biz-backup-2026-10-25.tar.gz`,
  untracked in the house. Import them into the pool as rows with a source, or delete the
  project and the two files (`legitimate-interest.md` §5; the archives hold personal data
  and stay out of git). Check: the rows are in the pool, or the project is gone from the Neon
  console and the two files from `desk/app/`.
