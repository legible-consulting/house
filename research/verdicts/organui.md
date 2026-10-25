---
tool: OrganUI
kind: repo
verdict: watch
tier: deep
use: [build]
tags: [shadcn, react, health]
recheck: 2027-04-25
source: https://github.com/organui/organui
date: 2026-10-25
---

# OrganUI

OrganUI is a set of components, blocks and charts for healthcare and life sciences, such as an anatomical heart. It installs as source through the shadcn CLI from shadcn's registry directory. It needs React 19, shadcn and Tailwind CSS 4. Licence MIT.

## Verdict: watch

Watch (why: it installs the shadcn way, as source owned by the repo, which is the house's one component vocabulary (`core/stack.md`, The desk app); it adds nothing until a client in health or life sciences commissions an App or Platform build · 2026-10-25).

## What would change it

- A client in health, care or life sciences reaches the proposal.
- OrganUI stops tracking current shadcn or Tailwind versions.

## How the house would use it

The build, an App or Platform build for a health client. The build adds OrganUI items with `shadcn add`, beside the house's shadcn components. It adds domain components; it replaces nothing.

## To try

`bunx shadcn@4.22.1 add @organui/heart` in a test Next.js app with shadcn. A good result: the component renders and follows the app's theme.

## Source

https://github.com/organui/organui · fetched 2026-10-25 · "OrganUI: the interfaces healthcare deserves". gh api refused (HTTP 403: repository not enabled for this session); README and licence read from raw.githubusercontent.com.
