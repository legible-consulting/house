# 1.4 Study Existing Projects

*Building Your Stack › Module 1: Custom Interfaces · Author: Jake Van Clief · Source: text lesson*

## Summary

A curated, dated reference list of open-source projects to study when building an interface around an AI agent, grouped into agent interfaces and sessions, and chat and workflow design. The lesson insists on studying one pattern, not installing everything, and on checking licence, activity and authentication before reuse. It ends with a five-line research note format that ends in an adopt, adapt or skip decision with the smallest check.

## Core concepts

- **One pattern, then decide:** pick the problem first and read projects for an approach you can explain.
- **Licences differ:** source availability is not one shared licence; check permissions and obligations before copying or redistributing.
- **A wrapper does not create entitlements:** authentication, model access and cost need their own review.
- **Evidence for notes:** point to the actual source or documentation; if you cannot say how a pattern solves your task, keep researching.

## Frameworks and methods

The research note covers problem, reference with version or commit, specific pattern, reuse conditions, and decision with reason and smallest check. This matches the adopt, adapt or reject framing in Jamie's own conventions.

## Tools, settings and resources

Links checked 26 September 2026 per the page:

- **Claude Code Web, Opcode, CloudCLI / Claude Code UI** — browser or mobile interfaces around the CLI; study streaming, session handling, authentication and the client-host boundary.
- **Open WebUI, LobeHub** — provider connections and conversation management.
- **n8n, Langflow** — visual workflow structure.
- **UI UX Pro Max** — a design skill, judged by effect on a real interface.

## Apply to icm-workshop

- **O1 research:** use the five-line note as the dated verdict record, adding a recheck date; the listed projects are candidate entries.
- **C3 desk / runs from anywhere:** CloudCLI's web and mobile reach is the most relevant for a phone and dashboard view; check its host/client boundary against the "never in git" rules.
- **Boundary — never build an orchestrator:** n8n and Langflow are orchestrator tools; decline for pipelines, though they may inform the dashboard's look.

## Open questions

- Do any of these support multiple users with role-based views, or only a single owner?
