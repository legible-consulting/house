# Breakdown: The desk as one design, one phone app and one desktop view

- epic-slug: desk-restyle
- source: the design brief Jamie commissioned on 2026-10-21 for the desk, folded into these stubs on 2026-10-25 against the desk as it runs that day

## What I understood

The desk (`desk/app`) is the operating tool of a one-person consultancy, read on a phone as often as at a desk. It runs on shadcn's default greys, Geist and a plain header. This epic gives it one visual identity, Jamie Nisbet's brand (paper and ink, Hanken Grotesk for words, IBM Plex Mono for figures), one complete design system in `app/globals.css`, restyled components, a small set of patterns, an app shell with a sidebar at the desk and a tab bar on the phone, the files that make it install as a phone app, and every route restyled against written acceptance criteria. Eleven pull requests, in order, each reviewable on a phone.

The brief predates four changes of 2026-10-25, and these stubs carry it reconciled with them. The desk has `/research` and `/research/<slug>`. A link shared to the installed desk opens `/share` (GET, the manifest's `share_target`) and lands in `research/queue/`. The manifest is the route `app/desk.webmanifest/route.ts`, not `app/manifest.ts`, so `share_target` needs no type from Next. The icons are drawn at build by `app/_mark.tsx` through `app/icon-192/route.tsx` and `app/icon-512/route.tsx`, so no image file lives in git (`desk/CONTEXT.md`). Where the brief and the running desk disagree, the desk and `desk/CONTEXT.md` win.

The brand's home is the `jamienisbet` repo: today `packages/ui/` (`BRAND.md`, `tokens/colors.css`, `typography.css`, `desk.css`, `assets/logo/`, `src/components/brand/logo-artwork.ts`); after that repo's `one-app-at-root` stub merges, `tokens/`, `assets/logo/` and `BRAND.md` at its root (`core/voice.md`, Document design). A stub reads whichever exists and never imports from that repo. The one thing copied is the traced JN path constants, for the in-app mark and the icons.

## Decisions of record

Fixed for the whole epic:

- **The stack does not change.** Next.js App Router, Tailwind CSS 4, shadcn/ui on Base UI with the components vendored in `components/ui/`, Motion, Lucide, Vercel, at the versions in `package.json`.
- **The data flow, the server actions, the role checks and the schema do not change.** The house is read once at build, the pool and the repos per request. Server actions post plain HTML forms and redirect with `?error=` or `?note=`. Three roles, the links per role in the shell. Restyle what shows them.
- **Every token lives in `app/globals.css`.** No token in a component, a page or a second CSS file. The file's header states the three rules: paper and ink are the tints; mono is metadata; colour is for state only (why: one home for the design system, read by every component · 2026-10-21).
- **Every new file goes under `desk/app/`.** `desk/CONTEXT.md` holds `app/**`. One exception: stub 11 edits `core/voice.md`, as `core/CONTEXT.md` allows.
- **Checking is on the Vercel preview**, at 390 × 844 (a phone) and 1440 × 900 (a desk), in light and in dark. "No horizontal scroll" means the document never scrolls sideways; a table scrolls inside its container only. Every pull request body carries the accessibility checklist below, ticked by the session for what it checked, with the preview URL.
- **One pull request at a time, under 600 lines where the step allows.** Wait for CI and read the preview before the next.
- **Technical text in Simplified Technical English.** Commit messages start with `desk:` and carry one why. No emoji. Sentence case.

The identity:

- **Positioning.** The desk is a ledger on paper. It shows facts: a deadline, an amount, a stage, a name. It does not sell and it does not decorate. A client who opens their page sees the same paper their proposal was printed on. The desk differs from a document in one way: density. A document breathes; the desk packs rows.
- **Type.** Hanken Grotesk for every word, IBM Plex Mono for every figure, date, slug, key and eyebrow. Two faces, no third. Hierarchy from weight, size and tracking (why: `core/voice.md` fixes the two faces; a third face breaks the brand's one home).
- **Colour.** Paper and ink are the only tints. Ink is the interaction colour in light; paper is in dark. Green, amber and red appear only for state and only beside a word (why: the brand has no second hue; colour that means nothing teaches the eye to ignore colour that does).
- **State is a mark plus its name.** A dot, a ring or a check, and the state's name as text. Never a colour field alone.
- **Mono is metadata.** Slugs, dates, figures and keys in IBM Plex Mono with tabular numerals.
- **Spacing.** A 4 px grid. 16 px gutter on the phone, 24 px from `md`, 32 px from `lg`. Rows at 32 px, 44 px under a coarse pointer, set once in a `@media (pointer: coarse)` block in the tokens and never in a component (why: density makes a desk a desk; the touch floor makes it usable one-handed).
- **Radius.** 4 px for keys and tags, 6 px for controls and rows, 8 px for cards and floating panels (why: tight corners read as precision; the brand's documents have none).
- **Elevation.** None at rest. A hairline separates. One shadow, on what floats: a drawer, a menu, a popover (why: a shadow on a resting card is noise; on a floating panel it is information).
- **Dark mode** follows the system through `prefers-color-scheme`, with the ink as canvas and the paper as text. No toggle (why: an installed app follows the OS like every native app; a toggle is one more control and one more flash).
- **Motion.** One content fade on arrival, colour changes on press, drawers that follow the finger. Nothing bounces (why: a tool that moves draws the eye from the fact to the movement).
- **Taken from the admin dashboard in the `jamienisbet` repo:** the brand tokens, the desk tier's density rules, the shell model (a fixed left navigation from `md`, a flat bottom tab bar below it), the sticky one-line page header, the four designed states per view (loading, empty, error, populated), the PWA posture. **Left behind:** the icon-only rail (the desk's destinations are words), the command palette (six destinations need no palette), the swipe rows, pull-to-refresh and haptics, the multi-pane Work screen (every desk page is one column), the `@jamie-nisbet/ui` dependency, and the weak points (hierarchy on size alone, hover-only affordances, type below 13 px, a monochrome that hides state).

Do not, each with its why:

- Do not add a UI framework or a component library that replaces shadcn. Not `cmdk` (six destinations need no palette). Not TanStack Table (the tables are small and server-rendered; the data-table pattern is CSS). Not `next-themes` (the desk follows the system). Not Serwist or `next-pwa` (the desk renders per request; there is nothing safe to cache). Not Vaul (the bottom sheet is Base UI's Drawer, stable since 1.3.0).
- Do not define a token outside `app/globals.css`.
- Do not import from the `jamienisbet` repo or add `@jamie-nisbet/*` as a dependency.
- Do not run build, lint, typecheck, test, format or dev locally. CI is truth.
- Do not add a theme toggle, a second hue or a third typeface.
- Do not put a shadow on a resting surface.
- Do not hide an action behind hover or a gesture only.
- Do not cache a page or data in the service worker.
- Do not enable Next's experimental view transitions or `useOffline`.
- Do not change the data flow, the server actions, the role checks or the schema.
- Do not commit a file outside `desk/app/` except the one edit stub 11 names.

Motion rules, binding every stub from the app shell on:

1. The app is wrapped in `MotionConfig reducedMotion="user"` inside a client component in the root layout.
2. One content fade: 180 ms, ease-out, 6 px rise, on the content wrapper, keyed by the pathname. Nothing else animates on arrival.
3. A control changes colour on hover and press in 120 ms or less. Nothing translates or scales on press.
4. A Drawer follows the finger and settles at once on release. Under reduced motion it appears and disappears with no slide.
5. A Tooltip and a popover fade in 120 ms or less.
6. The skeleton has no shimmer. It is the `--muted` fill.
7. No spring, no bounce, no stagger, no parallax, no auto-playing loop.

The accessibility checklist, run on every pull request's preview, once at 390 on a phone and once at 1440 by keyboard, and written in the body:

1. Tab through the page. Every control is reached in reading order and shows the inset focus outline.
2. Every form control has a visible label. Every hint or error is read with the control (`aria-describedby`).
3. Every status, deadline and state is readable with colour removed: the name or the word is present as text.
4. Every tap target measures 44 × 44 px or more at 390.
5. Text and its canvas pass 4.5:1 in light and in dark. The ratios are in the `globals.css` comments; check any new pair.
6. Zoom to 200% at 1440. No text is clipped and nothing scrolls sideways.
7. With TalkBack or VoiceOver on the phone: one `h1` and the section headings are listed; the tab bar reads as a navigation landmark with the current page spoken; a table reads by row with its column headers.
8. With reduced motion on: no fade, no slide; the page works the same.
9. Lighthouse on the preview in Chrome: the Accessibility and the installability sections report no failure.
10. Install the preview on the phone's Home Screen. It launches standalone, in the right theme colour, with no bar under the notch or the home indicator, and the offline page appears with the network off.

## Build order

Strict. Each stub depends on the one before it: the shared files (the tokens, the vendored components, the patterns, the layouts) land first, and every later stub merges over them.

1. `tokens-and-fonts` — `globals.css` and the two faces; no component changes — depends-on: none
2. `primitives` — the ten vendored components restyled, six added — depends-on: tokens-and-fonts
3. `patterns` — `components/desk/`: stat tile, status tag, stage track, data table, field group, flash, empty, document, prose, logo — depends-on: primitives
4. `app-shell` — the sidebar, the tab bar, the page header, loading, error and not-found, the auth route group, `MotionConfig` — depends-on: patterns
5. `pwa` — the manifest, the drawn icons, metadata and viewport, the service worker, the offline page, the headers — depends-on: app-shell
6. `desk-and-work` — `/` and `/work` — depends-on: pwa
7. `close` — `/close` — depends-on: desk-and-work
8. `pool-list` — `/pool` — depends-on: close
9. `pool-row` — `/pool/<id>` — depends-on: pool-list
10. `client-sell-research` — `/clients/<slug>`, `/sell`, `/research` and `/research/<slug>` — depends-on: pool-row
11. `auth-and-close-out` — the three auth pages, the accessibility pass on every route, the paragraph in `core/voice.md` — depends-on: client-sell-research

The first stub is blocked until `house-modules/desk-process` merges (why: the client page loses the quote there, and a restyle of a page that is about to change is work done twice · 2026-10-22).

## Out of scope

- The data flow, the server actions, the roles, the schema, the pool API.
- The portfolio's restyle: the brand's home is that repo.
- New pages or new facts on a page.
