---
tool: OpenQodex
kind: skill
verdict: watch
tier: deep
use: [build, house]
tags: [claude, security, scan, ci]
recheck: 2027-04-30
source: https://github.com/openqodex/openqodex
shared: https://www.facebook.com/share/r/1GeyJ8qe9N/
via: Dail Finds Dev - Repos, Tools, Sites
date: 2026-10-30
---

# OpenQodex

A code review for coding agents. It runs scanners such as gitleaks and semgrep on the changed lines, then starts separate Claude Code or Codex sessions that propose findings with a quoted line and verify each one. It installs a push gate hook in Claude Code and Codex, and it has a GitHub Action that runs the full review on a pull request with an Anthropic API key, or the scanners only without one. Licence Apache-2.0; version 0.16.0 on npm; about 1k stars by the post's count.

## Verdict: watch

Watch (why: the house rule "CI is truth" (`CLAUDE.md`, House rules) keeps scanners out of the local session, so the local review and its push gate do not fit, and the gate overlaps `confirm-git-writes.sh` (`core/stack.md`, the guards); the GitHub Action does fit the client CI that `legible-consulting/.github` carries, beside the gitleaks job, but the tool is young, and a full review in CI needs an Anthropic key as a repository secret and costs tokens on every pull request · 2026-10-30).

## What would change it

- The Action in scanners-only mode finds on a client build what gitleaks, zizmor and actionlint do not, with little noise: then it joins the reusable client workflow.
- A 1.0 release, or a version that has kept its interface for three months.
- A client build whose pull requests are written mostly by an agent, where a second reviewer before Jamie's tick earns its cost.

## How the house would use it

- The moment: a client build (`07-build/CONTEXT.md`), on every pull request, before Jamie's gate.
- The step: one job in the reusable client CI workflow in `legible-consulting/.github`, scanners only first, the full review later on a key that Jamie decides on.
- What it adds: semgrep and osv.dev advisories limited to the changed lines, and findings with evidence that Jamie reads at the gate. It replaces nothing; the local push gate stays off.

## To try

The GitHub Action from https://github.com/openqodex/openqodex/blob/main/docs/github-action.md, without a key, on a branch of one client repo. A good result: a report on the pull request with findings on the changed lines only, and no finding that gitleaks already reports twice.

## Source

https://github.com/openqodex/openqodex · fetched 2026-10-30 · "OpenQodex". README and LICENSE from raw.githubusercontent.com; the repository page refused trafilatura (SSL error). Caption read with yt-dlp 2026.10.26. The caption asks for a comment to get the link; that is not information. The README has a section for AI agents that asks them to read an agent guide; it was not followed.
