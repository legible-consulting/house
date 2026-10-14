# Open Claw Vibe Coded an App. Real Developers Read Every Line and Tell You What They Found.

*YouTube · Author: Jake Van Clief · Published: 2026-05-17 · Length: 18:32 · Views: 12,530 (as of 2026-10-14) · Link: https://youtu.be/nWbM9Ye2sLw*

## Why it made the top 10

Scores 60.1/100: influence 18.1/40, educational 25/40, fit 17/20. The coursework shows how to build with folders and agents; this is the only video in the set that shows what an expert audit of such a build actually finds. It adds concrete failure modes (a leaked key outside the code, hand-rolled auth, an unchecked token issuer, loose public routes) and traces one of them back to an ambiguous AI-written task file, which makes it a lesson about contract quality as much as security.

## Summary

Jake cuts together excerpts from a roughly three-and-a-half-hour code review his team ran on a client's app before launch. The client, Mike of Urban Pulse, built it largely with OpenClaw while following Jake's folder method, and it works. The review finds a Google Maps API key that Google locked after detecting misuse, an authentication layer the AI wrote itself alongside Supabase's own, a token check that does not confirm which project issued the token, and over-broad public routes. Jake's diagnosis is that the AI was missing guidance: generated task files fed an agent loop, and any ambiguity in them became an architectural decision. The final four minutes are opinion on vibe-coding economics and the future of software work.

## Core concepts

- **Leaks outside the code:** the key was read correctly from environment config; the likely leak happened while an agent set up the AWS infrastructure, which a code review cannot see because the evidence is not in the repository.
- **AI review has a context horizon:** a model asked to security-review a codebase only knows what is in it; meetings, setup sessions and history are invisible unless supplied.
- **Reinventing platform features:** given Supabase, the AI built its own token signing and verification (HS256) instead of using the platform's session handling, creating a second, separate attack surface.
- **Issuer check:** custom verification that skips the issuer accepts a valid token minted by any other Supabase project, so anyone could create one.
- **Route hygiene:** public route prefixes and per-route exceptions left read endpoints open without login, with confusion over which methods (GET vs POST) should be exposed; webhooks are the legitimate POST exception.
- **Task files as agent memory:** AI-written task markdown, executed by another agent in a loop and archived when done, is the build's history; ambiguity in any one of them propagates into code.
- **Audit before launch:** Jake frames the client's choice as the right model: build fast with AI, then hand to engineers for a security pass before real customers.

## Frameworks and methods

1. **Review format:** the team opens the codebase together on a call and walks packages, raising suspicions aloud and confirming them by tracing variables and routes.
2. **Trace a leak by elimination:** find every place the secret is referenced; if the code path is clean, look at the processes that handled it (infrastructure setup, agent sessions, git history), since deleted commits may still hold it.
3. **Root-cause into the contract:** when the code shows a strange choice, look for the task file that asked for it, then rewrite the markdown so future agents and people read the corrected intent (Jake says he is doing this per package).
4. **Fix security now, bugs forever:** the pass targets security issues before launch; ordinary bugs are accepted as permanent maintenance.

## Tools, settings and resources

- **OpenClaw** — the agent used to build the app and, per Jake, to create the AWS setup — no version given.
- **Supabase Auth** — the platform auth the AI should have used; Jake names its get-session call as the intended route.
- **Claude, Codex, "Claude Mythos" (early access)** — mentioned as AI reviewers that would still miss out-of-code leaks.
- **Google Cloud API key alerts** — the only reason the leak was found.

## Claims and evidence

- The key leaked during OpenClaw's AWS setup — Jake says "guarantee" then walks it back — hypothesis; evidence is Google's lock notice plus a clean code path.
- Any Supabase project's token would pass the custom check — reasoned from code on screen — technically sound for JWTs without an issuer check (inferred); exploit not demonstrated.
- The AI read Supabase's docs and chose to build its own auth — Jake's guess about model behaviour — unverified.
- A half-working system like this would once have cost a year and a couple of hundred thousand dollars — opinion, no basis given.
- A capable developer could earn 40–50k a month auditing vibe-coded apps within weeks — speculative, sales-adjacent, no evidence.
- Software will grow in value as more people build it, crediting Marc Andreessen — opinion.

## Key moments

- [0:03] Setup: client audit, client used the folder method, permission to share.
- [2:07] Tracing the Maps API key through the gateway's env config.
- [3:08] Suspicion falls on the AI-driven AWS setup.
- [3:39] Why an AI security review cannot find what is not in the code.
- [4:41] Duplicate authentication: AI-built cryptography beside Supabase.
- [6:43] "Missing guidance" diagnosis; hunting the task file that asked for it.
- [8:14] Task markdown as an agent loop's memory, and the cost of ambiguity.
- [11:47] Public route prefixes and GET vs POST exposure.
- [13:21] JWT issuer not verified.
- [14:22] Audit before launch; bugs never end; opinion section begins.

## Related coursework

- `jake-van-clief/01_the-foundation/05_history-and-concepts/05_openclaw-orchestration-and-ai.md` — extends: the lesson explains what OpenClaw is; this shows what it produced when given infrastructure and a codebase to build.
- `jake-van-clief/03_building-your-stack/01_custom-interfaces/03_build-one-phase-and-review-it.md` — extends and partly contradicts its optimism: the requirements file as persistent memory works, but here AI-written task files with no human review became the defect source.
- `jake-van-clief/02_ai-animations-workflows/04_building-websites/03_pre-build-planning-and-prompt-sequencing.md` — extends: its "observed vs assumed" and capped-questions steps are the missing discipline that would have caught the auth ambiguity.
- `jake-van-clief/05_davids-corner/02_tools/02_git-repo-security-why-it-matters-and.md` — extends: secret protection and reviewed changes listed there are the controls this build lacked.

## Apply to icm-workshop

- **D4 estate conformance, secret-free:** adopt "scan history and setup trails, not just HEAD" as part of the secret-free check; a clean tree proves little if an agent session handled the key. Also matches the global rule to flag plaintext credentials.
- **D2 SDLC, app and platform tiers:** adopt a security pass before release with three named checks from this video: use the platform's auth (no hand-rolled crypto), verify token issuer and audience, and inventory public routes and methods. Lives in the tier template.
- **Boundary, CI is truth:** adapt: put secret scanning and an auth/route lint in CI, but note Jake's point that CI and AI review cannot see out-of-code leaks; provider alerts (Google, AWS) should reach C3's morning glance.
- **Never build an orchestrator / gates are human:** reject AI-generated task files feeding an unattended agent loop; contracts are written or reviewed by a person before any stage reads them.
- **O1 catalogue:** watch "audit of AI-built apps" as a possible service line; Jake's income claim is not evidence.

## Open questions

- Supabase's current docs advise against trusting the session call alone on the server; was get-session the right fix, or should it be the user or claims check? (verify)
- Was the Maps key restricted by referrer or API, and would that alone have contained the misuse?
- HS256 is symmetric, yet the discussion calls the options asymmetric; which algorithms does the project actually sign with?
