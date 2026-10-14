# Project Instructions, Persona, and Skills

*David's Corner › Learning for Everyone · Author: David's Corner (author not stated) · Source: text lesson*

## Summary

A note on giving repeated instructions a durable home in readable files: a project-instructions file (CLAUDE.md or AGENTS.md), a persona file in some agent systems, and a skill file holding reusable procedures. The page stresses that these shape the context supplied to a model; they do not by themselves create memory, identity or capability, and filenames are conventions of particular tools. Where an agent can edit its own instruction files, those edits are configuration changes to review, not signs of an evolving identity.

## Core concepts

- **Files as context supply:** loading and discovery depend on the host tool.
- **Self-edited instructions are config changes:** inspect diffs, reasons and downstream effects.
- **Prose is not enforcement:** keep important restrictions in permissions and executable checks too.
- **Before/after test:** change one rule, rerun a harmless task, keep the diff, judge.

## Apply to icm-workshop

- Reinforces the layering in the global CLAUDE.md: Layer 0 identity and routing only, stage contracts for detail.
- D4: conformance should verify each live repo carries only the Claude assets it uses, and flag agent-written edits to instruction files as reviewable drift.
- The "prose is not enforcement" point supports hooks over rules for the never-run-local-checks convention.
