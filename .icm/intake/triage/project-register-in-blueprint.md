# Stub: The blueprint decides where a repo keeps its project register

- lane: chore
- found-by: the v1.0.0 retire list (`triage/_done/conformance-v1-0-0.md`); Jamie's decision on agorasim `.icm/project.md` · 2026-10-27
- complexity: medium
- priority: P2

## Problem

Agorasim kept a project register at `.icm/project.md`: 194 lines of intent, business logic, features, constraints, decisions D1 to D47, open questions and a run log. The retired `/project` skill in icm-board wrote it. No other file holds these facts. The blueprint `v1.0.0` has no place for a register, so the file was on the retire list.

On 2026-10-27 Jamie decided to remove the file from agorasim now (pull request `k0d0minio/agorasim`, branch `chore/retire-legacy-files`). The last version stays in the git history of agorasim. Some files in agorasim still name it: `web/src/content/terms.ts` (decision D9 and the open questions) and `workspaces/geo-content/stages/01_research/output/research.md`.

## Proposed change

Find out whether a later blueprint version must give each repo a place for the project's purpose, business rules and decisions. Read how agorasim used the register. Compare it with what the blueprint has now: `CLAUDE.md`, `.icm/docs/` and the stubs under `.icm/intake/`. Then propose one of these:

1. A blueprint file or folder for the register, with its contract and the one writer that keeps it.
2. No register. The facts go to `.icm/docs/` and the stubs, and the proposal says which fact goes where.

## Acceptance criteria

- [ ] The proposal says which of the two the blueprint does, and why.
- [ ] If the blueprint adds a register: its path, its sections and its writer are in a blueprint pull request.
- [ ] Agorasim's decisions D1 to D47 and its open questions have a decided place. The decision says if a session restores them from the git history.
- [ ] The files in agorasim that name `.icm/project.md` point at a file that exists.
