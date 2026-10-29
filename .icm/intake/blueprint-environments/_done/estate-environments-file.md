# Stub: Each live repo gets its environments file from copier update, and the two hand-written tables leave

- feature-slug: estate-environments-file
- epic: blueprint-environments
- sequence: 8 of 9
- depends-on: check-environments-file
- complexity: low
- priority: P2

## Problem

Berceo and agorasim have a hand-written four-column table in `README.md`. Vinecliff, remi-ai, messy-play and jamienisbet have none. No live repo has `.icm/environments.md`.

## Proposed change

The conformance to the tag after `environments-file` adds `.icm/environments.md` to each live repo through `copier update` (`conformance/CONTEXT.md`). The same pull request removes the hand-written table from berceo's and agorasim's `README.md` and leaves the one line that points at the file. A session fills the cells from Vercel and Neon on the day, and Jamie confirms each cell it cannot read.

## Acceptance criteria

- [ ] Each repo of `desk/mani.yaml` tagged `live` has `.icm/environments.md` from `copier update`, with the five columns and every cell filled or marked `<…>`.
- [ ] Each address and each project in a table is read from Vercel and Neon on the day of the run, not copied from the house record.
- [ ] Berceo's and agorasim's `README.md` have no `## Environments` table and one line that points at the file.
- [ ] The `check-client` check is green on each conformance pull request.

## Notes

- One conformance pull request per repo. It runs with the conformance of `estate-worktree-files` when the tags align.
- The README edit is the one hand edit, and it removes a copy. A conformance pull request holds what `conform.sh` writes and the triage stub, so the removal is named in the pull request body as the exception (why: two homes for one table drift, and the file is now the home · 2026-10-29).
- Shipped 2026-10-29. The conformance pull requests to `v1.3.0` brought the file: berceo#124, vinecliff#38, agorasim#242, remi-ai#151, jamienisbet#211, messy-play#10. berceo#124 and agorasim#242 carry the README edit. The cells were read from Vercel and Neon on the day and filled in berceo#125, vinecliff#39, agorasim#243, remi-ai#153, jamienisbet#213 and messy-play#10. Jamie confirmed the marked cells in the session the same day.
- The exception: messy-play has no CI, so `check-client` did not run on messy-play#10. Jamie: not a priority, later (2026-10-29).
