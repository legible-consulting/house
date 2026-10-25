---
tool: Storefront UI
kind: repo
verdict: decline
tier: deep
modules: [D2]
tags: [shop, tailwind, components]
recheck: 2027-04-25
source: https://github.com/vuestorefront/storefront-ui
shared: https://www.facebook.com/share/r/1aFzy7Hhoy/
via: GitHub Projects
date: 2026-10-25
---

# Storefront UI

Storefront UI is an eCommerce UI library and design system on Tailwind CSS, with Figma files, base components, blocks such as a product card and checkout steps, and composables. Alokai (formerly Vue Storefront) makes it. Licence MIT.

## Verdict: decline

Decline (why: the house has one component vocabulary, shadcn/ui owned as source in each repo (`core/stack.md`, The desk app); a second library for shop pages splits that vocabulary, and no client build sells a shop today · 2026-10-25).

## What would change it

- A client commissions a shop, and shadcn blocks cannot cover product, cart and checkout pages in time.
- Storefront UI ships its blocks as a shadcn registry.

## How the house would use it

D2, the shop pages of a Site or App build. It would add product, cart and checkout blocks. It would sit beside shadcn, not replace it.

## To try

https://docs.storefrontui.io. A good result: a product page with the client's Tailwind theme and a mobile speed score above 95.

## Source

https://github.com/vuestorefront/storefront-ui · fetched 2026-10-25 · "Storefront UI". The post gives osp.fyi/storefront-ui; it lands on opensourceprojects.dev/post/storefront-ui, which links the repository. gh api refused (HTTP 403: repository not enabled for this session); README and licence read from raw.githubusercontent.com.
