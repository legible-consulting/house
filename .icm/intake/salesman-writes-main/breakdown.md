# Breakdown: A salesman's structured action reaches main without a pull request

- epic-slug: salesman-writes-main
- source: Jamie, 2026-10-29, in the review of the open tickets: "we need to allow salesman to push straight to main from constrained and structured actions". The session read `01-prospecting/CONTEXT.md` (The handoff), `01-prospecting/prospect.md`, `desk/CONTEXT.md`, `CLAUDE.md` Boundaries, and `research/concepts/github-app-salesman-write-back.md`.

## What I understood

Today a salesman writes pool rows in Neon and never touches git. One act crosses into the house: `ready for Jamie` opens a pull request that creates `clients/<slug>/record.md` and moves the lead's folder, under the identity of `DESK_PAT`'s owner, Jamie. Jamie merges it, and the merge is the handoff. The desk also writes to `main` on its own for a visitor's answers (`/start`, `/f/<token>`) and for a shared link (`/share`), each with `DESK_PAT`.

Jamie wants a salesman's action to land on `main` with no pull request, when the action is constrained (the desk decides what it may write) and structured (the files and fields are fixed by a contract). The pull request step stays for nothing a salesman does by the rules.

The constraint is the point, and it is new. The house has no list of what the desk may write to `main`. Each write path was added where it was needed, with its why in `desk/CONTEXT.md`. Before a salesman's action commits to `main`, that list exists in one place, and the desk refuses a write outside it. The review's question 9 was this: the desk writes to `main`, opens pull requests, ticks gates, dispatches workflows and sends mail, and no contract names the set. This epic writes the set.

The identity of the commit is the second decision. The concept `github-app-salesman-write-back` (watch, 2026-10-14) gives each salesman their own commit through a GitHub App and a user token, at the cost of OAuth, refresh and conflict code Jamie owns. The desk today commits as Jamie. The commit message can name the salesman by handle. The monthly close reads `commission.sourced_by` from the record, not from git.

### Questions for Jamie

1. Which actions commit to `main`? Default: the handoff only, at `ready for Jamie`. The record and the lead's folder move land as one commit, and the row goes to `handed off` at once. The other writes (`/start`, `/f`, `/share`) already land on `main` and stay as they are.
2. Under whose identity? Default: the desk's, `DESK_PAT`, as today. The commit message names the salesman: `prospecting: <slug> handed off by <handle>`. The GitHub App route stays a concept until a second salesman asks for their own name in the history.
3. Does Jamie still read the handoff before it lands? Default: no. He reads the folder on the desk afterwards, and `stage` stays `prospect` until he decides to research (`clients/CONTEXT.md`). A bad handoff is a revert, and `lost` is his call.
4. Where is the list of what the desk may write to `main`? Default: `desk/CONTEXT.md` Outputs, one table, `The desk's writes to main`: the action, the role that triggers it, the files, the identity. `CLAUDE.md` Boundaries gains one line that points at the table (why: the boundary names the set, the contract holds the rows).
5. What happens on a conflict? Default: the desk writes each file with the contents API and the file's `sha`. A 409 retries once from the new `main`. A second 409 fails the action in words, and the row stays at `ready for Jamie`.

## Decisions of record

- **A desk write to `main` exists only in the table.** `desk/CONTEXT.md` Outputs lists each write path: the action, the role, the files, the identity. `lib/db.ts` and the route handlers write through one function that refuses a path outside the table's globs (why: a constraint that lives in prose is no constraint; the review of 2026-10-29 found no one place that names what the desk may write · Jamie, 2026-10-29).
- **A structured action is one the model fixes.** `prospect.md` names the fields and the handoff mapping. The desk writes those files and no other, from those fields and no other (why: "constrained and structured" are the two words of Jamie's ask · 2026-10-29).
- **The merge is no longer the handoff.** The commit is. `01-prospecting/CONTEXT.md`, `prospect.md` Statuses and `clients/CONTEXT.md` say so. "Check the PR" leaves the row page (why: Jamie's ask. The pull request gated nothing that a revert does not undo · 2026-10-29).
- **The desk sends nothing and the boundary stands.** A commit to `main` reaches no client (`CLAUDE.md` Boundaries, "commit words to `main`" without asking).
- **No new dependency, no GitHub App this round** (why: question 2's default).

## Build order

1. desk-writes-table — `desk/CONTEXT.md` lists every write to `main`, `CLAUDE.md` points at it, and one function in the app refuses a write outside it — depends-on: none
2. handoff-commits-to-main — `ready for Jamie` commits the record and the lead's folder to `main` as one commit that names the salesman, and the row goes to `handed off` — depends-on: desk-writes-table

## Out of scope

- A salesman's own commit identity. The concept stays `watch`.
- Any other salesman action in git. The pool stays in Neon.
- The removal of `DESK_PAT`. It is the identity.
