# 3.1 Set Up Codex for Browser Work

*AI Animations & Workflows › Module 3: Browser Workflows · Author: Jake Van Clief · Source: Skool video · Length: ~2:30*

## Summary

The first step of the browser module is proving the assistant can read the right page before asking it to change anything. Jake uses Codex for this and offers two routes: its built-in browser (separate profile, so sign in there) or an extension connecting to your signed-in Chrome profile. The test is a read-only check whose answers the learner compares against the actual tab. Claude in Chrome and plain chat are mentioned as alternatives, chat having no live tab access.

## Core concepts

- **Read before write:** start with a visible page, a tightly bounded task and an outcome you are able to verify on your own.
- **Two browser routes:** a built-in browser with its own profile and site-access settings, or a Chrome extension tied to the profile you actually use, with a separate control for which sites it may touch.
- **Read-only first task:** the assistant reports title, address, a heading and three facts with locations, marks what it cannot inspect as unknown, and changes nothing.
- **Debug access before scaling the task:** if it fails, check the selected browser, profile, sign-in and site allowlist; do not add instructions to a page it cannot see.
- **Chat is not a browser:** pasting text lets you practise the reading check, but there is no live tab.

## Tools, settings and resources

- **Codex built-in browser and Chrome extension** — setup checked 29 September 2026 per the page; labels and availability vary by rollout and workspace.
- **Claude in Chrome** — alternative route with its own permissions guide; an earlier walkthrough is kept in 3.5.
- No API key or developer browser connection needed for this exercise.

## Key moments

- [0:00] Goal: get the AI to read one page you can verify.
- [0:30] Built-in browser route and the profile caveat.
- [1:02] Chrome extension route and the read-only prompt.
- [2:03] Troubleshooting, chat alternative, move to 3.2.

## Apply to icm-workshop

- **D2 SDLC (UAT):** the read-only page check is a cheap smoke test pattern for a client UAT environment; adapt as a first step before any browser-driven verification.
- **Boundaries — gates are human; no submitting for the client:** the "do not edit, submit, download or navigate elsewhere" framing matches the never-send rule; adopt it as the default for browser sessions.
- **Weak link:** Jamie's own browser tooling differs; treat Codex specifics as reference only.
