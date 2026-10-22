---
status: built
holds:
  - lexicon.md
  - stack.md
  - wave.md
  - "setup/*.sh"
  - identity.md
  - services.md
  - voice.md
  - terms.md
  - onboarding-collaborator.md
---
# Core — C1 shared core

C1 produces the business's identity and bio, its services and pricing, its voice and document design system, and its terms, stack and house rules, each fact in exactly one place, so that every module and every client artefact speaks with one voice and a change made once lands everywhere.

## Inputs

- Jamie's answers. Nothing else: the core is upstream of everything.

## Process

- Start cold from this folder. Read only what Inputs names.
- Jamie answers in one sitting: a session drafts the questions, offers a default in each,
  and asks them in one batch. The answers are written as facts, each in the one file that
  owns it. What Jamie leaves open goes to `wave.md`, under Jamie decides, never into a file as a placeholder
  (why: a placeholder reads as a fact to a module that starts cold · 2026-10-19).
- A fact changes here first, by PR to `main`, then everywhere that cites it. Jamie merges.
- Each file starts with frontmatter (`title`, `kind`, `owner`, `date`). A rule in a file
  carries its why and date.

## Outputs

Built (2026-10-16):

- `lexicon.md`: the house words (repo names, tiers, module codes) every artefact uses.
- `stack.md`: which tools Legible Consulting uses, where each runs, and how a machine gets them.
- `wave.md`: what is open in the system's own build: this week, next, and what Jamie decides. The glance and the Friday review print the last list. Rewritten when a wave ends.
- `setup/local.sh` · `setup/cloud.sh`: install the toolbox `stack.md` lists, on this machine (Homebrew) and in the `legible` cloud environment (pasted setup script).

Built (2026-10-19):

- `identity.md`: the bio, the entity, the languages, what we do and do not do.
- `services.md`: the six lines, what each includes, what is never in a build's price, and the pricing table with the anchor and the floor.
- `voice.md`: the register, the words never used, the three registers, the document design system and the shape of each document.
- `terms.md`: payment, validity and revisions, ownership, hosting and support, ending an engagement, law and language.

Not yet written:

- `onboarding-collaborator.md`: the one-page note sent with a collaborator invite. Written the first time one is sent.
