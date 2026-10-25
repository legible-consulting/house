# Stub: Handover: the pack, the walkthrough, the support and hosting record and the retainer offer

- feature-slug: handover
- epic: house-modules
- sequence: 4 of 8
- depends-on: none
- complexity: medium
- priority: P1

## Problem

A finished build has no handover pack, no record of who hosts what and what Jamie is on the hook for, and no set moment for the retainer offer or the case-study request.

## Proposed change

A module that produces the handover pack, a walkthrough, the support and hosting record, a retainer or follow-on offer at a set point after release, and the review and case-study request. A retainer or a role gets no pack (`clients/CONTEXT.md`). Its folder sits after the build.

## Acceptance criteria

- [ ] A handover contract, `status: built`, written from the first release.
- [ ] Its five templates; `core/voice.md` names the pack's shape.
- [ ] `core/services.md` and `core/terms.md` point at it for hosting and support.

## Out of scope

- Any other module. One stub, one folder.

## Notes

`core/terms.md` § Hosting and support holds the terms the record restates.
