# Stub: The desk has a sidebar at the desk, a tab bar on the phone, and one page header everywhere

- feature-slug: app-shell
- epic: desk-restyle
- sequence: 4 of 11
- depends-on: patterns
- complexity: high
- priority: P1

## Problem

`app/_shell.tsx` is one wrapping header with text links, the same at every width. There is no bottom tab bar, no page header, no loading, error or not-found view, and the auth pages share the shell's layout. The 15-second refresh while something is in flight lives in the shell and takes per-page promises.

## Proposed change

An app shell in `components/desk/shell.tsx` and a page header in `page-header.tsx`, used by a route group `app/(desk)/`; the auth routes under `app/(auth)/`; `loading.tsx`, `error.tsx` and `not-found.tsx`; `next/link` for in-app links; `MotionConfig reducedMotion="user"`. The refresh keeps working per page.

## Acceptance criteria

- [ ] From `md`: a fixed sidebar of `--sidebar-width` on `--sidebar` with a right hairline. At the top the JN mark on a 32 px tile and the word "Desk" in `text-heading`. Then one link per destination the role has, icon plus label, 32 px rows, the current one on `--muted` with `aria-current="page"`. At the foot the user's name, the role as a mono tag, and sign out.
- [ ] Below `md`: a fixed bottom tab bar of `--tab-bar` plus `env(safe-area-inset-bottom)`, on `--sidebar` with a top hairline, at most five tabs, each a full-height target of equal width with an icon and a `text-micro` sans label. The fifth tab, "More", opens a Drawer with the remaining links, the user's name and role, and sign out. Jamie's tabs: Desk, Work, Pool, Close, More (Sell, Research, sign out). The salesman's: Pool, Sell, More (sign out). A client has no tab bar; the page header carries sign out. Tapping the current tab calls `router.refresh()`.
- [ ] Content has `padding-bottom` of the bar's clearance below `md` and `padding-left` of the sidebar from `md`. In-app links use `next/link`; external links stay `<a>`. There is no build footer; the build's commit is named in the sync pill's panel.
- [ ] The page header (`page-header.tsx`) is sticky at the top, `--page-header` tall plus `env(safe-area-inset-top)`, on `--background` with a bottom hairline: a back link on the leading edge when the page is a detail, the title in `text-title` on one line and truncated when long, one quiet line in `text-meta` mono under it, actions on the trailing edge. The sync pill (`app/_sync.tsx`) sits on the trailing edge for Jamie at every width; its panel becomes a Drawer below `md`.
- [ ] The 15-second `<meta http-equiv="refresh">` while a run, a deploy or what the page shows is in flight still renders, per page, with the same promises as today.
- [ ] `loading.tsx` beside each route with a skeleton that matches that page's layout (a header line, rows); one `error.tsx` in `app/(desk)/` that names the page and offers "Try again"; `app/not-found.tsx` in the shell with one sentence.
- [ ] The auth routes (`sign-in`, `forgot-password`, `reset-password`) live under `app/(auth)/` outside the shell, with the same paths as today. `proxy.ts`'s matcher is unchanged.
- [ ] `MotionConfig reducedMotion="user"` wraps the app from a client component in the root layout. The one content fade (`app/_fade.tsx`) stays, keyed by the pathname.
- [ ] On the preview: the sidebar at 1440, the tab bar and the More drawer at 390, the safe areas, the current-page marks, for the three roles. `check.yml` is green.

## Out of scope

- The manifest, the icons and the service worker: stub 5.
- The per-page content: stubs 6 to 11.

## Notes

Decide before building, in the pull request body (this stub keeps the spec gate): how the per-page `live` and `start` promises reach the refresh once the shell is a layout. Two shapes fit. The layout renders the chrome and the page renders its own header content and the refresh tag through a slot. Or the shell stays a per-page component and the layout holds the chrome only. Name the one you build and why. `app/layout.tsx` stays static; `app/(desk)/layout.tsx` may read the session.

Read first: the breakdown (Motion rules), `desk/app/app/layout.tsx`, `desk/app/app/_shell.tsx`, `desk/app/app/_sync.tsx`, `desk/app/app/_fade.tsx`, `desk/app/lib/github.ts` (the in-flight reads the shell uses), `desk/app/lib/user.ts`, `desk/app/proxy.ts`, `desk/app/next.config.ts` (the build commit), every `app/**/page.tsx` for how each passes `live` and `current`.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, .icm/intake/CONTEXT.md, .icm/intake/desk-restyle/breakdown.md whole, then this ticket, .icm/intake/desk-restyle/app-shell.md, then the files its Notes name. Open the pull request with the decision its Notes ask for and stop until Jamie answers. Then build. One branch, one pull request to main, message starts with "desk:" and carries one why. Move the stub to .icm/intake/desk-restyle/_done/ in the same pull request. Never run build, lint or dev; read check.yml and the Vercel preview. Write the breakdown's accessibility checklist in the pull request body with the preview URL. Do not merge. Your last message names the pull request and the preview.
