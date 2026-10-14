# 2.4 Save State and Resume Work

*Building Your Stack › Module 2: Building for Remote Access · Author: Jake Van Clief · Source: text lesson*

## Summary

Separates three things people conflate: connection, process and saved state. A reconnect says nothing about completed work, a running job needs its real status checked, and only files, decisions and available history reliably let a fresh session continue. The fix is a single short progress note (result, evidence, decision, next step, blockers) and a test that a fresh session can recover from it by checking claims against the files.

## Core concepts

- **Three layers of persistence:** connection (phone reaches host), process (a job still running; a terminal multiplexer can survive a client disconnect but not a host shutdown) and saved state (files and decisions).
- **One progress note:** fields for date, project and path, completed with link, checked with outcome, in progress with task ID, decision with reason and what would change it, next bounded step, and open items. It is a chosen reference, not an automatically loaded filename.
- **Update at meaningful moments:** a result, a decision or before leaving; keep useful facts rather than copying the conversation; keep backups or version history.
- **Fresh-session recovery test:** a new session reads the requirements and progress files, inspects cited files, separates confirmed state from claims, reports discrepancies and proposes one next step without editing.
- **Correct the note when it disagrees with reality.**

## Frameworks and methods

Save, then recover cold, then reconcile. The module check is that you can reach the host, make a bounded mobile handoff and recover work from saved evidence.

## Tools, settings and resources

- **tmux** — keeps a terminal alive through client disconnection.
- **Claude reconnect and resume guidance, Codex Remote guidance** — product-specific behaviour.

## Apply to icm-workshop

- **Boundary — every module starts cold:** the fresh-session recovery test is a ready-made acceptance test for each module's folder; adopt it in module validation (the last step of the workspace-builder walk).
- **Boundary — one home per fact:** progress state belongs in one file per module, not in chat; decision fields mirror "a rule carries its own why and date".
- **C2 client folder:** adapt the note into the client folder's next-action line that the Friday review reads.
- **Open items list:** matches the flat open-items list in C3; reuse the Open field.

## Open questions

- Should the progress note live per module run or per client, given C2's "one look" requirement?
