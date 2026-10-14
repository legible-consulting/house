# Prompts, Skills, Connectors, and Scripts

*David's Corner › Learning for Everyone · Author: David's Corner (author not stated) · Source: text lesson*

## Summary

A map of seven reusable workflow parts (prompt, skill, connector, MCP, hook, script, plugin) with the advice to use the smallest piece that solves the problem. Each is described with its limits: skills must be loaded by a compatible tool, connectors are bounded by permissions, MCP does not make connected actions safe, hooks only check what they check, scripts can encode wrong rules. A community-event example chains prompt, writing skill, connector, validation script and a human approval, with a warning that "present" is not "verified".

## Core concepts

- **Smallest sufficient part:** omit any part without a clear job.
- **Permissions define capability:** for connectors and MCP, authentication and review still matter.
- **Present versus verified:** a script that checks a field exists cannot prove it is correct.
- **Automate after the simple version works.**

## Frameworks and methods

The event example is a five-step pattern: supply approved facts, draft, optionally retrieve from a permitted source, validate with a script, human confirms before publishing.

## Apply to icm-workshop

- Adopt the vocabulary as an O4 workshop-kit explainer and for O1's concept library.
- Fits the boundary list: a session may draft, but never send to a client or advance a gate. Hooks and scripts check; a human approves.
- Reject adding connectors to C3 morning-glance sources until each has a stated permission scope.
