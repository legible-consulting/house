# 1.2 Research and Scope Your Build

*Building Your Stack › Module 1: Custom Interfaces · Author: Jake Van Clief · Source: YouTube (recording linked from the lesson page) · Length: 4:57 · Link: https://youtu.be/J2GLzkaUrBc*

## Summary

A short recording where Jake responds to a community member's wish for a front end to monitor and control coding agents. He has the AI survey open-source interfaces around the command-line agent rather than reinventing them, then asks it to produce a requirements document, in markdown, written for the coding agent to read, broken into early and late phases. The page turns this into a research routine: compare two reference projects, record pattern, licence and exclusions, and save a concise PRD with one acceptance check, using three practice files as the first feature.

## Core concepts

- **Don't reinvent the wheel:** survey existing repos, study the pattern, keep what you need.
- **Requirements file as agent input:** written for the coding agent, reviewed by a human, optionally audited by a second AI session.
- **Phases:** an early phase to get something working and a late phase for polish, so the agent does not build everything at once.
- **Working backwards from your own structure:** he feeds the AI his own folder map and asks what an interface around it would look like, including a mind-map style navigation of folders.
- **Cost and entitlement caution (page):** putting a front end around the agent neither removes usage limits nor ensures a subscription covers it, so confirm how it authenticates, plus the current terms and billing guidance, before settling on the design. Reading a repo is not permission to reuse it.
- **Experiment in a separate working copy,** supplying selected examples; folder location alone does not limit access.

## Frameworks and methods

1. Name the user, task and awkward step.
2. Compare two projects: pattern, licence, omissions.
3. Save PRD with purpose, inputs, smallest feature, exclusions, phases and one acceptance check; point to its path explicitly.

## Tools, settings and resources

- **Open-source interface projects** — listed in 1.4.
- **Claude Code usage and cost documentation** — linked from the page.

## Claims and evidence

- Subscription use is cheaper than API calls — Jake's general assertion; page cautions about wrapper terms.
- He mentions controlling the agent from his phone via a remote setup, with a video to come.

## Key moments

- [0:03] The question that prompted the idea.
- [0:49] Subscription versus API cost problem and existing open-source options.
- [1:35] Idea of navigating folders as a map.
- [3:05] Ask for a PRD markdown aimed at the coding agent.
- [4:36] Drop it into the workspace and have the agent build from it.

## Apply to icm-workshop

- **C3 desk:** adopt the research-before-build step for the dashboard with three roles, with licence and cost checks recorded in the PRD.
- **O1 research:** the two-reference comparison with licence and decision fits the dated adopt, watch, decline verdict format.
- **Boundary — gates are human:** the PRD review before any build is a gate to tick by hand.
- **Tension 1 (runs from anywhere):** he hints at phone control; check against Module 2.

## Open questions

- Which of the referenced interfaces supports a multi-role dashboard, if any, versus being a single-user terminal wrapper?
