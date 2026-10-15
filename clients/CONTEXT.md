# Clients — C2 client folder

C2 produces one folder per relationship, opened at first touch as a prospect and kept through after-handover, holding the relationship's facts and every module's artefact for it, so that Jamie, a salesman or the client can see in one look where it stands, what is next, and who is waiting.

## Inputs

- `_template/record.md` for a new folder.
- A module's produced artefact, written by that module into `<slug>/<stage>/`.

## Process

- Defined when the module is built (Wave 1 for C1, C2, D2, D4; later waves for the rest).
- Start cold from this folder. Read only what Inputs names.

## Outputs

- `<slug>/record.md`: frontmatter `stage` (prospect → research → proposal → quote → agreement → kickoff → build → handover → after), `repo`, `tier`, `owner`, `vercel_project`, `salesman`, `collaborators`, commission fields.
- `<slug>/research/` · `proposal/` · `quote/` · `agreement/` · `kickoff/` · `handover/`: one subfolder per module that has produced for this client.
- `<slug>/tickets.md`: the build ticket list that D1 renders into the client repo's `BUILD.md`.
- The deal is the folder. The folder points (`repo:`), the client repo holds. Nothing is submoduled or vendored (why: a cloud session reaches only the repo it attached · 2026-10-15).
