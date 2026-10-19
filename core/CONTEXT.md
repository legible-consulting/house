---
holds:
  - lexicon.md
  - stack.md
  - open-items.md
  - "setup/*.sh"
  - identity.md
  - services.md
  - voice.md
  - terms.md
  - house-rules.md
  - onboarding-collaborator.md
---
# Core — C1 shared core

C1 produces the business's identity and bio, its services and pricing, its voice and document design system, and its terms, stack and house rules, each fact in exactly one place, so that every module and every client artefact speaks with one voice and a change made once lands everywhere.

## Inputs

- Jamie's answers. Nothing else: the core is upstream of everything.

## Process

- Defined when the module is built (Wave 1 for C1, C2, D2, D4; later waves for the rest).
- Start cold from this folder. Read only what Inputs names.

## Outputs

Built (2026-10-16):

- `lexicon.md`: the house words (repo names, tiers, module codes) every artefact uses.
- `stack.md`: which tools Legible Consulting uses, where each runs, and how a machine gets them.
- `open-items.md`: the one flat open-items list the Friday review reads.
- `setup/local.sh` · `setup/cloud.sh`: install the toolbox `stack.md` lists, on this machine (Homebrew) and in the `legible` cloud environment (pasted setup script).

Pending:

- `identity.md` · `services.md` (with pricing) · `voice.md` (voice and document design system) · `terms.md` · `house-rules.md`
- `onboarding-collaborator.md`: the one-page note sent with a collaborator invite.
