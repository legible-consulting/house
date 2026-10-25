# Stub: The pool handoff agrees with prospect.md, and the walk Jamie and Cunha run is written

- lane: chore
- found-by: `core/wave.md`, Next week · 2026-10-22
- complexity: medium
- priority: P1

## Problem

Cunha is the first salesman. Jamie set the role in Neon. The handoff from `ready for Jamie` to the pull request on the house has never run. The code path (`desk/app/lib/github.ts`, `desk/app/app/pool/`) and the handoff mapping in `01-prospecting/prospect.md` were written apart and may disagree.

## Proposed change

Read the code path from `ready for Jamie` to the pull request line by line against the mapping. List every disagreement. Fix each in the app, or in `prospect.md` when the schema is wrong, and say which. Write the walk Jamie and Cunha run by hand in the pull request body.

## Acceptance criteria

- [ ] The pull request body lists every disagreement between the code path and `prospect.md` § Handoff mapping, and for each says where it was fixed.
- [ ] The pull request body carries the walk as numbered steps, one per line, each with the expected screen after it: Cunha adds a test row "Zz Test Lda", logs one touch, sets `ready for Jamie`; Jamie reads the pull request the desk opens, merges it, confirms the row reads `handed off`; Jamie deletes `clients/zz-test-lda/` by one commit.
- [ ] No handoff pull request is opened by the session, and nothing is merged.
- [ ] `check.yml` is green and the Vercel preview builds.

## Notes

Read first: `CLAUDE.md`, `01-prospecting/CONTEXT.md` (The handoff), `01-prospecting/prospect.md` (Fields, Statuses, Handoff mapping), `clients/_template/record.md`, `desk/CONTEXT.md`, `desk/app/lib/github.ts`, `desk/app/lib/pool.ts`, `desk/app/app/pool/actions.ts`, `desk/app/app/pool/[id]/actions.ts`, `desk/app/db/schema.sql`. The walk itself is Jamie's hand with Cunha, after the merge.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, .icm/intake/CONTEXT.md, then this ticket, .icm/intake/triage/handoff-walk.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "prospecting:". Move the stub to .icm/intake/triage/_done/ in the same pull request. Never open the handoff pull request yourself and never merge. Never run build, lint or dev. Your last message names the pull request and what waits on Jamie and Cunha.
