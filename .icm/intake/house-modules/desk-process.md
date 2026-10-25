# Stub: Desk: the contract's Process written from the running desk, and the quote leaves the client page

- feature-slug: desk-process
- epic: house-modules
- sequence: 3 of 9
- depends-on: none
- complexity: medium
- priority: P1

## Problem

`desk/CONTEXT.md` describes the app in full, but its Process reads "Not written yet" and its `status` is `stub` while the desk runs. The client page still lists `quote/quote.md` among the documents a client reads, and the price has been the proposal's last section since 2026-10-22 (`clients/CONTEXT.md`).

## Proposed change

Write the Process from what the desk does today, in the order a session walks it. Set `status: built`. Remove `quote/quote.md` from the documents a client reads, in the contract and in the app.

## Acceptance criteria

- [ ] `desk/CONTEXT.md` Process says, in order: how a page gets its facts (the house at build by `read-house.mjs`, the pool and the repos per request); what each role sees; how the glance and the close are computed on every request and written as files by `rhythms.yml`; how a ticket starts from the Work page (the house's own and each client repo's, the Prompt copied); how a gate is ticked from the desk; how a shared link reaches `research/queue/` through `/share` and the paste form on `/research`; how a lead reaches the pool through `/api/pool`; what the sync pill says; what a session never does (merge, tick, move a stage). Inputs and Outputs keep their facts. `status: built`. The line "Not written yet" is gone.
- [ ] `quote/quote.md` is not among the documents a client reads, in `desk/CONTEXT.md`, `desk/app/app/clients/[slug]/page.tsx`, `desk/app/lib/house.ts` and `desk/app/scripts/read-house.mjs`.
- [ ] On the pull request's Vercel preview, `/clients/motoark` shows the proposal only.
- [ ] One home per fact: the Process points at `clients/CONTEXT.md` for the stages and the pool statuses and does not restate them. Every rule carries its why and date.
- [ ] `check.yml` is green.

## Out of scope

- Any restyle: `.icm/intake/desk-restyle/`.
- A change to the data flow, the roles or the schema.

## Notes

Read first: `CLAUDE.md`, `desk/CONTEXT.md`, `clients/CONTEXT.md`, `.claude/rules/desk-app.md`, `research/CONTEXT.md` (the queue), `desk/app/app/page.tsx`, `desk/app/app/clients/[slug]/page.tsx`, `desk/app/app/work/page.tsx`, `desk/app/app/share/route.ts`, `desk/app/app/api/pool/route.ts`, `desk/app/lib/house.ts`, `desk/app/lib/rhythms.ts`, `desk/app/lib/work.ts` (its header), `desk/app/scripts/read-house.mjs` (its header). The Outputs section already describes every route; the Process says what a session does with them.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, .icm/intake/CONTEXT.md, .icm/intake/house-modules/breakdown.md, then this ticket, .icm/intake/house-modules/desk-process.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:". Move the stub to .icm/intake/house-modules/_done/ in the same pull request. Never run build, lint or dev. Do not merge. Your last message names the pull request, the preview URL and what waits on Jamie.
