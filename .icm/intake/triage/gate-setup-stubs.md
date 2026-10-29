# Stub: The gate reads `.icm/intake/setup/` as setup stubs, not as an epic

- lane: chore
- found-by: the conformance to blueprint `v1.3.0`, berceo#124, vinecliff#38, agorasim#242, remi-ai#151 · 2026-10-29
- complexity: low
- priority: P1

## Problem

`gate.yml`'s `contract` job, step 4, reads each folder under `.icm/intake/` as an epic. It skips only `triage/` and `_done/`. Blueprint `v1.3.0` renders `.icm/intake/setup/`, so the job reads each setup stub as an epic stub and fails it: `feature-slug is not the file name`, `no '- sequence: <n> of <m>' line`, `no '- depends-on:' line`, and `§ Order has no line for the open epic setup`. `gate / contract` was red on the four conformance pull requests of the builds with `uat: true` and `database: neon`, and `check-client` was green. Every build on `v1.3.0` with a setup stub fails the job on every pull request until the fix.

The blueprint is correct. Its `template/.icm/intake/CONTEXT.md` § The setup stub gives `setup/` its own shape (`setup-slug`, `needs`, `where`, `## Done when`) and says that a setup stub is not a ticket. The defect is in `legible-consulting/.github`.

## Proposed change

`gate.yml`'s `contract` job treats `setup/` as its own category, beside `triage/`. One pull request on `legible-consulting/.github`.

## Acceptance criteria

- [ ] Step 4 skips `setup/` in its loop over the epics, as it skips `triage/` and `_done/`.
- [ ] A new step checks each stub in `setup/` and `setup/_done/` against § The setup stub: `setup-slug` is the file name, and the stub has a `- needs:` line and a `- where:` line. A stub in `setup/_done/` has the first line `> Done: <who>, <YYYY-MM-DD>` or `> Dropped: <reason>, <date>`.
- [ ] A ticket line that names a stub in `setup/` fails, with one `::error` line that says a setup stub is not a ticket.
- [ ] Step 3 (the branch's stub is not open) finds no stub in `setup/`.
- [ ] The `§ Order` check asks for no line for `setup/`.
- [ ] `gate / contract` is green on a pull request of a `v1.3.0` build with open setup stubs, for example the next pull request on berceo.
- [ ] `.github/.github/workflows/README.md` names the setup category beside the ticket line and the anchors.

## Out of scope

- The setup stubs themselves and `copier.yml`. The blueprint's shape stays.
- The desk's read of setup stubs.

## Notes

- The defect blocks `.icm/scripts/merge.sh`, which refuses a failed check. On 2026-10-29 it refused berceo#125, vinecliff#39, agorasim#243 and remi-ai#153 after Jamie's tick.

- Seen on the run of 2026-10-29: `gate / contract` on berceo#124 named `actions-production-database` and `actions-vercel` first. jamienisbet#211 was green, because a build with `database: none` and no `uat` gets no setup stub.
