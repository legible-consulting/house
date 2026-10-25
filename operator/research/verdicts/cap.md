---
tool: Cap
kind: repo
verdict: watch
tier: deep
modules: [D2]
tags: [captcha, forms, security]
recheck: 2027-04-25
source: https://github.com/tiagozip/cap
shared: https://www.facebook.com/share/r/1FQgD5YeEJ/
via: RammCodes
date: 2026-10-25
---

# Cap

Cap is a self-hosted CAPTCHA. The browser solves small proof-of-work and instrumentation challenges in the background, so the user sees one checkbox and no puzzle. It runs as one Docker container or on Workers, and it sends no telemetry. Licence Apache-2.0.

## Verdict: watch

Watch (why: every build carries "a contact route that fit[s] the data collected" (`core/services.md`, In every build); Cap protects that route with no third party, so the privacy page does not have to name Google or hCaptcha; but no client form has a spam problem today, and proof-of-work only slows a bot, it does not stop one · 2026-10-25).

## What would change it

- A client form in a Site or App build receives bot spam.
- A client asks for a contact or booking form with no third-party tracking.
- Independent tests show that current bots solve Cap's challenges in bulk.

## How the house would use it

D2, the contact or booking form of a Site or App build. Cap adds a bot check that keeps the visitor's data inside the client's own hosting. It replaces reCAPTCHA or hCaptcha, and the privacy page loses one third-party processor. The siteverify API is compatible with reCAPTCHA, so the server change is one URL.

## To try

https://trycap.dev/guide/demo. A good result: the widget passes in under two seconds on a phone, with no puzzle.

## Source

https://github.com/tiagozip/cap · fetched 2026-10-25 · "cap: a privacy-first and self-hosted CAPTCHA". Found by search: the post names "Cap" with no link. gh api refused (HTTP 403: repository not enabled for this session); README and licence read from raw.githubusercontent.com.
