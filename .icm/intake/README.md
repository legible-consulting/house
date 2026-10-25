# Intake

The tickets of the house itself: a module the business needs and does not have yet, a change to the desk, a chore. The shape is the blueprint's; the contract is `CONTEXT.md` beside this file. The desk's Work page reads this folder on `main` and copies each stub's `## Prompt` as the words that start it in a session.

The epics, and what each holds:

| Epic | Holds |
|---|---|
| `house-modules/` | the stage renumber, then the eight module contracts the goal interview named and the house does not have yet, each written from a real walk |
| `desk-restyle/` | the desk's design system, its components and patterns, its app shell, the phone app, and every route restyled, in eleven pull requests |
| `render-and-publish/` | a client document becomes a branded PDF on its pull request; a ready case becomes a page on jamienisbet.com |
| `triage/` | one-off chores: a rule, a walk, a stale path, a licence, the tiers leaving the org repo |

The decisions that bind every epic are in `CLAUDE.md` (Boundaries, House rules) and in each breakdown's own list. The order inside an epic is its `sequence`; across epics, `priority` and the deal that waits.

## Milestones

Set by Jamie on 2026-10-22. A line leaves when it is true.

- The factory is done: no contract on the customer path is a stub (client research, the agreement, kickoff, handover, the desk), and the desk shows truth to all three roles. The blueprint's questionnaire is designed and reviewed: done, v0.8.0.
- Then one real deal and one real build run through the house: MotoArk walks `research` → `proposal` → `agreement` in the folders; Vinecliff ships a release through the build; Jamie and one salesman (Cunha) sign in to the desk; every repo is where its owner wants it.
- Client work (MotoArk's send, Vinecliff's kickoff, Berceo's and Agorasim's releases) waits for the factory (why: the estate is the factory; a client run through a half-built factory proves nothing · 2026-10-22).

## Jamie's hand

The steps of the house's own build that no session takes, because each reaches an account, the estate or money. The glance prints the bullets of this section (why: a step Jamie owes is a next action of the house itself · 2026-10-22). A client's own next step lives on its record, not here. A line leaves when it is done.

- Neon, project `legible-desk`: one client account linked to a folder. Check: the client lands on its page.
- Pull `site-proof`, run `conformance/drift.sh`, conform `site-proof` to the latest blueprint tag, run it again. Check: every live and proof row says current against that tag.
- `copier update` on the four live repos with their answers, through conformance, now that the blueprint has one root and a question bank (v0.8.0).
- Berceo #68 merged as changelog and tag, or closed; then the next promotion through `promote.sh`. Agorasim's `go-live` epic through the loop.
- Vinecliff's kickoff, once `house-modules/kickoff` merges: the owner answers the questionnaire, `clients/vinecliff/kickoff/` is written, the first epic is cut in the repo, `next_action` is set on the record.
- GPardas invited as a member once 2FA is on. Check: listed by `gh api orgs/legible-consulting/members`.
- The `gh` login sessions use carries `repo` and `workflow` only; a second login holds `admin:org` for runbook steps. Check: `gh auth status` shows no `admin:org` on the active login.
- Secret scanning and push protection on the public repos that remain: `blueprint`, `.github`, `english-with-jamie`, `garmani`.
- `desk/app/biz-2026-10-22-backup.tar.gz`, untracked in the house: commit it, ignore it, or move it.
