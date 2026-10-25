# Stub: Agreement: the signable contract from the accepted proposal and quote

- feature-slug: agreement
- epic: house-modules
- sequence: 2 of 8
- depends-on: none
- complexity: medium
- priority: P1

## Problem

A deal that says yes has no agreement to sign that restates nothing and holds exactly what was agreed.

## Proposed change

A module that produces the signable contract from the accepted proposal and quote, in the client's language, with the templates in en-GB, fr-BE and pt-PT against `core/terms.md`. Its folder is `04-agreement/`, after the quote; the build renumbers.

## Acceptance criteria

- [ ] `04-agreement/CONTEXT.md`, `status: built`, written from the first deal that reaches signature.
- [ ] The three templates, numbered clauses from `core/terms.md`, the accepted proposal attached, the signature block last (`core/voice.md`).
- [ ] `clients/CONTEXT.md` names where the signed agreement lands.

## Out of scope

- Any other module. One stub, one folder.

## Notes

Signature goes through Google Workspace (the library's audit decision of 2026-10-14).
