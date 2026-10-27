# Stub: The desk installs on the phone with the brand's mark, launches standalone and shows an offline page

- feature-slug: pwa
- epic: desk-restyle
- sequence: 5 of 11
- depends-on: app-shell
- complexity: medium
- priority: P1

## Problem

The desk installs from Chrome's menu and is the share target for the research queue (`app/desk.webmanifest/route.ts`), but its icon is a letter D on a dark tile, its theme colour is `#0a0a0a` in every scheme, there is no service worker and no offline page, and the response carries no security headers.

## Proposed change

The manifest gains the brand's values and three drawn icons; `_mark.tsx` draws the JN mark instead of the letter; the metadata and the viewport follow the system; a hand-written service worker caches one offline page and nothing else; the headers are set in `next.config.ts`. The `share_target` and `/share` stay as they are.

## Acceptance criteria

- [ ] `app/desk.webmanifest/route.ts` serves `id: "/"`, `name: "Legible Consulting desk"`, `short_name: "Desk"`, `start_url: "/"`, `scope: "/"`, `display: "standalone"`, `orientation: "any"`, `background_color: "#FFFEFA"`, `theme_color: "#FFFEFA"`, the icons below, and the `share_target` it has today (GET, `/share`, `title`, `text`, `url`).
- [ ] The icons are drawn at build, no image file in git: `/icon-192` and `/icon-512` (`purpose: any`) and `/icon-maskable-512` (`purpose: maskable`) from `app/_mark.tsx`, which draws the traced JN path (the constants `logo.tsx` copied in stub 3) in paper on the ink tile, the mark at 95.5% of the tile for `any` and at 70% for `maskable`; `app/apple-icon.tsx` at 180 px and `app/icon.tsx` at 64 px (the favicon) from the same function. Nothing is redrawn by hand.
- [ ] `app/layout.tsx` `metadata`: `applicationName: "Desk"`, `title: { default: "Desk", template: "%s · Desk" }`, `robots: { index: false, follow: false }`, `appleWebApp: { capable: true, statusBarStyle: "default", title: "Desk" }`, `manifest: "/desk.webmanifest"`. `viewport`: `themeColor: [{ media: "(prefers-color-scheme: light)", color: "#FFFEFA" }, { media: "(prefers-color-scheme: dark)", color: "#1E1E1E" }]`, `width: "device-width"`, `initialScale: 1`, `viewportFit: "cover"`, `interactiveWidget: "resizes-content"`.
- [ ] Safe areas: the tab bar pads `env(safe-area-inset-bottom)`, the page header `env(safe-area-inset-top)`, the sidebar `env(safe-area-inset-left)`, the auth pages top and bottom. Nothing sits under the home indicator.
- [ ] The sign-in page footer carries one line: "On a phone, add this page to the Home Screen." No `beforeinstallprompt`.
- [ ] `public/sw.js`, hand-written, under 60 lines: on install, cache `/offline.html`; on activate, delete older caches; on a `navigate` fetch, try the network and fall back to the offline page; touch nothing else. Its header comment says what offline means: every page renders per request behind a session, the desk caches no page and no data, and offline the user sees the offline page and a Retry button. Registered from a client island in the root layout after `load`, with `{ scope: "/", updateViaCache: "none" }`. The cache name changes when `offline.html` changes.
- [ ] `public/offline.html`: the mark, "You are offline", one sentence, a Retry button; literal colours for both schemes in a `<style>` block; the system font stack.
- [ ] `next.config.ts` `headers()`: for `/(.*)`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`; for `/sw.js`, `Cache-Control: no-cache, no-store, must-revalidate` and `Content-Type: application/javascript; charset=utf-8`.
- [ ] `proxy.ts`'s matcher leaves `/desk.webmanifest`, `/sw.js`, `/offline.html` and the icon routes outside, as today.
- [ ] On the preview, installed on Jamie's Android phone from Chrome's menu: it launches standalone in the right theme colour, a link shared to Desk still lands on `/research` with a note, Lighthouse installability passes, and the offline page appears with the network off. `check.yml` is green.

## Out of scope

- Caching any page or data. The offline page is the whole offline design.
- Push notifications.

## Notes

Read first: the breakdown, `desk/CONTEXT.md` (The phone), `desk/app/app/desk.webmanifest/route.ts`, `desk/app/app/_mark.tsx`, `desk/app/app/icon-192/route.tsx`, `desk/app/app/icon-512/route.tsx`, `desk/app/app/share/route.ts`, `desk/app/app/layout.tsx`, `desk/app/next.config.ts`, `desk/app/proxy.ts`, `desk/app/components/desk/logo.tsx` (the path constants). The brand's reference icon, for the crop: `assets/logo/reference/icon-dark.png` at the root of `k0d0minio/jamienisbet` (the ink tile with paper letters). `desk/CONTEXT.md` keeps its sentence that no image file lives in git.

## Prompt

Repo legible-consulting/house, desktop at ~/Desktop/legible-consulting/house (the brand's reference icon is on this machine, and the install check is on Jamie's phone). Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-restyle/breakdown.md whole, then this ticket, .icm/intake/desk-restyle/pwa.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-restyle/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Write the breakdown's accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request, the preview, and the install check that waits on Jamie's phone.
