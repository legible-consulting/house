# 2.2 Connect and Verify a Remote Session

*Building Your Stack › Module 2: Building for Remote Access · Author: Jake Van Clief · Source: text lesson*

## Summary

A practical connection lesson: start from the intended project, choose one of three launch methods for a remote session (turn it on in an existing session, start a new session with it on, or run it in server mode), open the session on a phone, and prove which workspace was reached by reading a marker file. A Codex route is given in parallel. The verification is deliberately read-only and checked against the desktop, then repeated after closing and reopening the phone view.

## Core concepts

- **Prove the workspace:** a practice folder holds one marker file; the first remote task is to read it, quote it and identify the project.
- **Interactive vs server mode differ** in session behaviour, so pick deliberately.
- **Remote access is steering, not a full terminal:** not every terminal interaction is available on the phone.
- **Reconnect test:** close and reopen the mobile view while the host stays running and confirm you land in the intended session.
- **When access stops:** check account, host power and network, the running application and session status; use the documented reconnect route and avoid starting the same job twice without checking state.

## Frameworks and methods

1. Create practice folder and marker file.
2. Start remote session from the right project.
3. Open on phone with the same account.
4. Read-only check; compare path and text.
5. Close, reopen, confirm same session.

## Tools, settings and resources

- **Claude Code on the web and the Claude app** — where named sessions appear.
- **Codex Remote** — desktop and mobile apps on the same account and workspace.

## Apply to icm-workshop

- **Boundary — every module starts cold and runs from anywhere:** the marker-file check is a cheap smoke test; adopt a "where am I" file at each module root that a remote or cold session can quote.
- **D4:** include remote reachability in the estate report as a yes/no per live repo.
- **Boundary — gates are human:** the read-only first task keeps a remote session from advancing anything; keep that as the default scope.

## Open questions

- Can the same check run from a cloud session against a repo remote, avoiding the home host entirely?
