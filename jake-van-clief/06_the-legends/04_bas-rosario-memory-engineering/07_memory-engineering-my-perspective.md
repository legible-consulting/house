# MEMORY ENGINEERING: My perspective

*THE LEGENDS › 4. Bas Rosario – Memory Engineering · Author: Bas Rosario · Source: text lesson*

## Summary

Bas describes what happens when the by-hand memory discipline is built into a machine, using his own memory system as the case. He explains how it keeps a small core always loaded with the rest in reference, how entries carry weight and strength so important items surface more, and how a buffer-then-consolidate step makes selection happen after writing. He is candid about a data-loss incident that the three classes never addressed, and ends with what he thinks is overrated (saving everything) and underrated (weighting memories).

## Core concepts

- **Continuity as the point:** he treats memory as what makes an AI a domain-specific collaborator. His system is named DREAMS with an observability layer called Deja Vu; at the time of writing it held 762 long-term memories, of which 12 were core.
- **Typed, weighted memories:** each entry carries a type, weight, strength, pin status and reach count; recall returns the closest items ranked by a score, and a "reinforce" action raises strength when a memory proves right. What survives is what kept being true.
- **Selection after writing:** new items land in a buffer, and a consolidation pass promotes them with their assigned weight, so trivial one-offs stay light and heavy facts resurface unprompted.
- **Rarely delete:** weight does the discarding rather than deletion.
- **Protection is part of design:** Bas lost 82 memories and 45 session files in an incident he attributes to no separation between test and production memory; backups allowed recovery, and he added a hook that points at a test database.
- **Overrated:** the log, where saving every conversation turns retrieval into a keyword lottery.
- **Underrated:** weight, since unequal importance turns recall from search into recognition.

## Claims and evidence

- Ten thousand low-signal memories recall worse than the right few with honest weights — author's experience — unverified.
- Figures about his system (counts, the April incident) — self-reported, not independently checked.

## Apply to icm-workshop

- **Adopt** the production-versus-test separation as a lesson for C2: client folders and any dashboard writes should never be touched by experiments, and the rebuild's "never in git" boundary for credentials and identity documents sits alongside it.
- **Adapt** the small-core-plus-reference pattern, which already matches the always-read status file plus drawer design; weights and consolidation passes are a tooling layer and should be **rejected** for now, in line with never building an orchestrator.
- The overrated-log point supports keeping C2 records to decisions and facts, not transcripts.
- Otherwise the specific DREAMS design is only loosely relevant to the 90-day plan.

## Open questions

- Is there a lightweight way to mark some C2 lines as more important than others (a "pinned" convention) without adding tooling?
