---
tool: Capacitor
kind: repo
verdict: watch
tier: deep
modules: [S3, D2]
tags: [mobile, react, app]
recheck: 2027-04-25
source: https://github.com/ionic-team/capacitor
shared: https://www.facebook.com/share/r/19f7Ampta5/
via: Marco Kazandjieff
date: 2026-10-25
---

# Capacitor

Capacitor runs one web app as a native iOS and Android app and as a PWA. It gives cross-platform APIs for device features and a plugin API for custom Swift and Kotlin code. It keeps the native projects as source. The Ionic team maintains it. Licence MIT.

## Verdict: watch

Watch (why: the App line sells "a working tool with state" and the house builds it in Next.js on Vercel (`core/stack.md`, The desk app); Capacitor is the route to a store app from that same code, but no client has asked for an app in the App Store or Google Play, and a store release adds review cycles and support that `core/services.md` does not price · 2026-10-25).

## What would change it

- A client in S3 asks for an app in the App Store or Google Play.
- A PWA fails a client need: push notifications on iOS, or a device API the browser does not give.

## How the house would use it

S3 and D2, an App build that needs a store presence. The proposal names the store release as its own scope. D2 wraps the built Next.js app with Capacitor and ships the native projects from the client repo. It adds a mobile surface; it replaces nothing in the stack.

## To try

`npx cap init && npx cap add android` in a statically exported Next.js app. A good result: the app opens in the Android emulator and calls one device API.

## Source

https://github.com/ionic-team/capacitor · fetched 2026-10-25 · "Capacitor: cross-platform apps with JavaScript and the Web". gh api refused (HTTP 403: repository not enabled for this session); README and licence read from raw.githubusercontent.com.
