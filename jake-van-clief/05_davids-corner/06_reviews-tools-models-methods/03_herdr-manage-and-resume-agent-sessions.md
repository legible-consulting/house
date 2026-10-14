# Herdr: Manage and Resume Agent Sessions

*David's Corner › Reviews - Tools, Models, Methods · Author: David · Source: text lesson*

## Summary

David's example uses Herdr to manage several coding-agent terminals: which is running, waiting for input or ready to resume. The page separates three kinds of continuity: connection, process, and saved work, and corrects an earlier claim that tmux loses context whenever SSH drops (it supports detach and reattach). It updates the earlier note about platform support, and recommends a harmless recovery check on a practice project before installing anything.

## Core concepts

- **Connection, process, saved work:** attach state, whether the program still runs, and files another session can read.
- **A multiplexer does not save state** by itself.
- **Remote model dependencies** remain even if a session survives.
- **Install only after naming a gap** your current setup fails on.

## Tools, settings and resources

- **Herdr** — server-based runtime with agent state and session management — herdr.dev; platform support described as current by the page, check its docs.
- **tmux** — detach and reattach — cited as the baseline.
- **Pi** — original reference kept on the page.

## Claims and evidence

- Earlier tmux/SSH claim — page corrects it as incorrect.

## Apply to icm-workshop

- **Every module runs from anywhere:** the three-way split clarifies what must be in the folder (saved work) rather than in a terminal. Reject a local-only runtime as a dependency; O1 can record Herdr as watch.
- C3: unattended runs each leave lines for the next morning's glance, which is the "saved work" layer.
