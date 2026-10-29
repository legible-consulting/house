# Stub: The stack holds why a tool runs, a verdict holds what was judged, and the four files that disagree are fixed

- lane: chore
- found-by: the review of the research library against the house · 2026-10-29
- complexity: low
- priority: P1

## Problem

`core/stack.md` says "why a tool was chosen lives in its research verdict". Checked on 2026-10-29: no verdict exists for Next.js, Vercel, Neon, Neon Auth, shadcn/ui, Tailwind, Motion, Forme, Resend or Emdash; the why of each is in `stack.md`. 31 of the 46 `adopt` verdicts are not in the stack, in CI or in a contract, and several say the opposite of the stack: Astro against Next.js, cron against Actions, hledger and DuckDB against "money is outside the house", Typst against pdfcn, GAM7 against the GNOME mount. The goose verdict's update note shipped in `goose-worktrees/goose-task-script` (2026-10-29), when goose left the lane. Jamie's answer, 2026-10-29: `stack.md` is the home for why a tool runs, and `adopt` means approved for the moment the verdict names, not in use.

## Proposed change

Two lines of definition and four update notes. One pull request on the house.

## Acceptance criteria

- [ ] `core/stack.md` § Tools: "This file is the one home of why a tool runs. A verdict in `research/verdicts/` says what was judged and for which moment; it does not say what is installed", with the why and the date. The sentence "why a tool was chosen lives in its research verdict" is gone.
- [ ] `research/CONTEXT.md` Process: "`adopt` means approved for the moments in `use`. A tool joins `core/setup/` in the commit that builds the module that calls it (`core/stack.md`). `adopt` does not mean installed", with the date.
- [ ] `research/concepts/github-app-salesman-write-back.md` gets an update note: the house answered it another way, the desk opens the handoff pull request with `DESK_PAT` as Jamie (`01-prospecting/CONTEXT.md`, The handoff), and the epic `salesman-writes-main` decides the identity of a direct commit.
- [ ] `research/concepts/google-service-account-delegation.md` gets an update note: `place.sh` uses the GNOME mount today, and the epic `google-service-account` adopts the concept.
- [ ] `research/verdicts/astro.md`, `cron-systemd-timers.md`, `typst.md` and `gam7.md` each get an update note that names what the house chose instead, with the file that holds the why. Their verdicts stay `adopt` under the new definition, or flip to `watch` where no moment is left; the note says which.

## Out of scope

- A verdict for each row of the stack. The stack is the home.
- The other 27 unused adopts. The definition covers them, and each recheck date stands.
