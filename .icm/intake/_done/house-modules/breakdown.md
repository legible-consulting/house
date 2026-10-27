# Breakdown: The modules the house does not have yet

- epic-slug: house-modules
- source: the goal interview of 2026-10-14 (`library/research/design-trail/01-goals.md`, one goal per module); the flattening of the house on 2026-10-25, which turned seven stub contracts into stubs here; the session prompts Jamie wrote on 2026-10-22, folded into these stubs on 2026-10-25

## What I understood

The goal interview named sixteen modules. Nine exist with a contract: the core, the client folder, prospecting, the proposal, the quote, the build, conformance, research, and the desk, whose contract exists with its Process unwritten. Seven do not exist: client research, the agreement, kickoff, handover, the portfolio, content and training. Each is one stub here until a real deal or a real workshop walks it and a session writes its folder and contract from that walk. The desk's Process is one more stub, and the stage renumber that makes room for the four missing stages is the first.

Each stub carries what the session reads first, the Process the contract must say, the templates it writes, the gate, and the commit prefix. Every source is in the house, in a sibling repo or in an estate repo. A stub whose check needs Jamie's phone, or whose write goes to a sibling repo, says "desktop" in its Prompt (why: a cloud session attaches one repo and reaches no phone · 2026-10-25).

## Decisions of record

- **The stage folders carry their final numbers, in deal order.** `01-prospecting`, `02-client-research`, `03-proposal`, `04-quote`, `05-agreement`, `06-kickoff`, `07-build`, `08-handover`. `portfolio/`, `content/` and `training/` carry no number. The renumber happens once (`stage-numbers`); a number whose module is not built yet stays a gap, and the gap's ticket is here (why: a number promises the sequence a deal walks, and one renumber beats four · `core/lexicon.md`, 2026-10-25).
- **A Process is written from a walk, never from the goal alone.** The stub names the walk: MotoArk for the agreement and client research, Vinecliff for kickoff, Euro Register for training, the first release for handover, the running desk for the desk (why: a contract written before its first run describes work nobody did · 2026-10-25).
- **One stub, one folder, one pull request.** The commit message starts with the module's word: `agreement:`, `desk:`, `client-research:`, `kickoff:`, `training:`, `handover:`, `portfolio:`, `content:`, and `house:` for the renumber. The pull request body lists the questions for Jamie, numbered, each with a default (why: the house speaks in words; the module codes left on 2026-10-25).
- **A session drafts and never acts.** It never sends to a client, signs, places a file in Drive without asking or ticks a gate. It moves `stage` only as `clients/CONTEXT.md` says (`CLAUDE.md`, Boundaries).
- **Nothing is read from `~/Desktop/Apps/` or from its repo, `k0d0minio/icm-board`.** The house holds what a module's shape is written from: the hand-written agreements, kickoffs and profiles in `clients/`, the facts in `core/`, the goals in the library (`core/stack.md`, Layout, the legacy row).
- **A rule carries its why and date. One home per fact.** A contract points at `clients/CONTEXT.md` for the stages and never restates them (`CLAUDE.md`, House rules).

## Build order

Ordered by the deal that needs each module next, not by stage order (why: MotoArk decides on 2026-10-26, Vinecliff is at `kickoff`, Euro Register's week is the first workshop · 2026-10-25).

1. `stage-numbers` — the folders take their final numbers once — depends-on: none
2. `agreement` — MotoArk says yes and has no document to sign — depends-on: stage-numbers
3. `desk-process` — the desk runs on a stub contract, and the client page still lists the quote — depends-on: none
4. `client-research` — written back from MotoArk's profile and primer, so the proposal reads one file — depends-on: stage-numbers
5. `kickoff` — Vinecliff is at `kickoff` with no procedure — depends-on: stage-numbers
6. `training` — Euro Register's week is the first workshop and has no kit — depends-on: none
7. `handover` — Agorasim's and Berceo's releases come next — depends-on: stage-numbers
8. `portfolio` — the four cases on jamienisbet.com become case files — depends-on: none
9. `content` — pages and posts, after the portfolio exists — depends-on: portfolio

## Out of scope

- The desk's restyle and the phone app: `.icm/intake/desk-restyle/`.
- The PDF renderer and the publish script: `.icm/intake/render-and-publish/`.
- Jamie's hand: the Neon client account, the org members, the tokens (`.icm/intake/README.md`, Jamie's hand).
