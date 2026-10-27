# Stub: Every build carries the git and ticket skills and the writing reference, so a cloud session writes tickets Jamie can read

- feature-slug: skills-and-ste
- epic: blueprint-pipeline
- sequence: 5 of 13
- depends-on: lanes
- complexity: medium
- priority: P1

## Problem

The git and CI mechanics (one blocking read, both surfaces, never subscribe, paths staged explicitly) and the judgement of a good stub have no home in a rendered build. The ASD-STE100 skill that Jamie adopted (`research/verdicts/asd-ste100-skill.md`) lives on his machine only, so a cloud session writes tickets without it.

## Proposed change

Three skills under `.claude/skills/`, build only. `pr-conventions` and `ticket-craft`, rewritten from the legacy skills for the blueprint's vocabulary. `asd-ste100`, vendored at the commit the house pins, with its licence and attribution. The contract keeps every shape. The skills add no shape.

## Acceptance criteria

- [ ] `template/.claude/skills/{% if not workspace %}pr-conventions{% endif %}/SKILL.md`, under 120 lines, frontmatter `name` and `description` with its triggers (commit, branch, push, pull request, CI, checks). It opens with: the contract is `.icm/intake/CONTEXT.md`, and this skill adds the mechanics. Sections: branches (`<slug>` and `triage/<slug>`, cut by `new-run.sh` only, `main` by pull request only, no history rewrite, no force push), committing (paths staged explicitly, never `git add -A`, the type from the contract's table, no secrets, a plaintext credential found is flagged first), CI owns verification (never run the checks locally, one blocking read per push with `gh pr checks <n> --watch`, both surfaces, `PENDING` and an empty list on a fresh push are not green, `Skipped - Not affected` built nothing, never subscribe to the pull request, your own pushes come back as events), the pull request body (the template's sections, the title in Conventional Commits form before the flip, the preview line, `Parked`), finishing (the stub rides in `_done/` from the start, an off-ticket finding is a triage stub), the stop report (a pointer to the contract).
- [ ] `template/.claude/skills/{% if not workspace %}ticket-craft{% endif %}/SKILL.md`, under 120 lines, frontmatter with its triggers (ticket, stub, epic, breakdown, triage, plan, backlog). It opens the same way. Sections: a stub a cold session can build (the title is what the user can do after it ships, `Problem` observed not inferred, one observable result per criterion, `Out of scope`, `Notes` with decisions and files, `complexity` honest because it decides the first gate), the cut from a story or a proposal (one epic per story, every criterion in `Criteria → stubs`, shared files first, sequences contiguous, `depends-on` earlier, the order question when another epic is open), the triage stub (park it in a minute with its lane and `found-by`, never widen the pull request), status is positional, a dropped stub, a slug never reused, no `TODO.md`. One section, **The words**: every stub, breakdown and pull request body is written under `.claude/skills/asd-ste100`, STE-flavored mode, so that Jamie reads it on a phone in one pass (why: Jamie's reference for every ticket across the estate · 2026-10-27).
- [ ] `template/.claude/skills/{% if not workspace %}asd-ste100{% endif %}/`: `SKILL.md`, `README.md`, `LICENSE`, `references/writing-rules.md`, `scripts/ste-lint.py`, `examples/*.md`, copied from `danyuchn/asd-ste100-skill` at `3944283c183eea13fe5bd902b572da3b4de8bf44`, the commit the house's `check.yml` pins. No edit to any file. `README.md` of the blueprint names the source, the licence and the commit.
- [ ] Dropped from the legacy skills, by name in the pull request body: ticket commits straight to `main`, `Plan:` and `Wrap:`, the `claude/` prefix, labels, the MCP-only rule, `scope` as the word for an epic, the 60-stub cap as a rule.
- [ ] No sentence in the two skills restates a shape from the contract. The pull request body says so.
- [ ] `check.yml` asserts the three skill folders in a build and none in a workspace. The STE pin check is unit 9.

## Out of scope

- A `ste-lint` run in client CI: dropped (the plan, section 4). The blueprint lints its own files.

## Notes

Read first: the breakdown, the intake contract and the lanes as units 2 and 3 left them, `research/verdicts/asd-ste100-skill.md` in the house, `~/.claude/skills/asd-ste100/` on Jamie's machine or `danyuchn/asd-ste100-skill` on GitHub at the pinned commit, and the legacy skills `~/Desktop/Apps/_system/template/claude/skills/{pr-conventions,ticket-craft}/SKILL.md` or the same in `k0d0minio/icm-board`. Claude Code loads a project skill from `.claude/skills/<name>/SKILL.md` with frontmatter `name` and `description`.

## Prompt

Repo legible-consulting/blueprint, cloud or desktop. Attach legible-consulting/house read-only. Read CLAUDE.md, README.md and conventions/README.md in the blueprint, then .icm/intake/blueprint-pipeline/breakdown.md in the house whole, then this ticket, .icm/intake/blueprint-pipeline/skills-and-ste.md, then the files its Notes name. Do what it says. One branch, one pull request to main in the blueprint, Conventional Commits, technical text in Simplified Technical English. Write what you will change and your questions in the pull request body, numbered, each with a default, and stop for Spec approved. On build: render the proof sets into a scratch folder with copier to check your work. Read check.yml. Do not merge. Then one pull request in the house that moves this stub to .icm/intake/blueprint-pipeline/_done/, the one write to the house. Your last message names both pull requests and what waits on Jamie.
