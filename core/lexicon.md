# Lexicon — the words Legible Consulting uses

One home for our jargon. Everything we build is ICM, so no name carries `icm`. When a term
here and a word in another file disagree, this file wins and the other file is fixed
(why: one home per fact; a brand speaks one vocabulary · 2026-10-16).

## The repos

| Term | Is | Was | Visibility |
|---|---|---|---|
| **house** | the operating repo: core, client folders, module contracts, desk. Where the business runs. | `icm-workshop` | private, Jamie only |
| **blueprint** | the public method: the copier template per tier, conventions, workshop kit. Every client build is rendered from it. | — | public |
| **library** | read-only reference: Jake Van Clief's course, the ICM paper, research ledgers, and later the design trail (`meta/`). | — | private |
| **.github** | the org's front page and reusable CI. Name fixed by GitHub. | — | public |
| **client repo** | one per build, `legible-consulting/<slug>`, rendered from the blueprint. | — | per tier |

Said aloud: "edit the core in the house", "render it from the blueprint", "that's library
material, not house".

## Tiers (the blueprint's `tier` question)

`site` · `app` · `platform` · **workspace** (a coached client's own ICM workspace, rendered
into their account; was `icm-workspace`).

## Modules

| Family | Codes |
|---|---|
| **C** core | C1 shared core · C2 client folder · C3 desk |
| **S** sell | S1 prospecting · S2 client research · S3 proposal · S4 quote · S5 agreement |
| **D** deliver | D1 onboarding and kickoff · D2 SDLC pipeline · D3 handover and support · D4 estate conformance |
| **O** operator | O1 tool and concept research · O2 case studies and portfolio · O3 content · O4 training and coaching |

## Other house words

- **client folder** — `clients/<slug>/` in the house; the deal is the folder. Its `record.md`
  carries the `stage`.
- **desk** — the morning glance, Friday review, monthly close, estate audit and the dashboard.
- **estate** — every repo in the org; D4 checks it conforms to its tier.
- **local lane** — `~/Desktop/Apps/projects/` clones on Jamie's machine for bulk estate work.
- **gate** — a human checkbox. Read it, never tick it.
- **wave** — a build phase of the system itself (Wave 1: C1, C2, D2, D4).
- **legible** — the cloud environment every session runs in (was `icm`).
