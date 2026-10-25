# Stub: The free-look questions live in the house, in three languages

- feature-slug: forms-in-the-house
- epic: desk-forms
- sequence: 1 of 9
- depends-on: none
- complexity: medium
- priority: P0

## Problem

The eight free-look questions live in `k0d0minio/icm-board`, a retired repo, in English only. The house has no home for a form and no grammar for one.

## Proposed change

Three files carry the eight questions of `intake-diagnostic.md`: `01-prospecting/forms/free-look.en-GB.md`, `free-look.fr-BE.md` and `free-look.pt-PT.md`. The prospecting contract holds them and states the grammar. The lexicon gains **form**.

## Acceptance criteria

- [ ] The three files exist. The en-GB file carries the eight questions of `intake-diagnostic.md` with their keys unchanged. The fr-BE and pt-PT files carry the same keys in the same order, with the options in the same order.
- [ ] Each file's frontmatter has `kind: form`, `title`, `intro`, `language` and `folder: research`.
- [ ] `01-prospecting/CONTEXT.md` holds `forms/*.md`, names the forms in Outputs, and states the grammar.
- [ ] `core/lexicon.md` defines **form**.
- [ ] `check.yml` is green.

## Out of scope

- The parser and the desk's read: `desk-reads-forms`.
- Kickoff's forms.

## Notes

The grammar, kept from the old `forms-parse.ts` and the icm-board `forms/README.md`:

- One form per file, `<form>.<language>.md`. The name before the language tag is the form slug. It never changes once a link was sent.
- Frontmatter: `kind: form`, `title`, `intro`, `language` (`en-GB`, `fr-BE` or `pt-PT`), `folder` (the client subfolder the answers land in).
- Each `##` heading is one question, in the words the visitor reads. Under it, one list of `- key: value` lines: `type:` (`text` by default, `textarea`, `select` or `boolean`), `options:` (`select` only, separated by ` | `), `optional: yes`, `hint:`, `key:`. Prose outside the list is ignored.
- `key:` is required on every question (why: the old grammar slugified the heading, and a heading in three languages gives three slugs. The answers of one form must line up across languages · 2026-10-25).
- Four types. No conditional logic. No uploads. A link to a recording is a `text` question.
- The three language files of one form carry the same keys in the same order. Their options are in the same order too (why: the desk maps an answer to a pool field by the option's position. The words differ per language. The position does not · 2026-10-25).

The fr-BE and pt-PT files are the session's translation of the en-GB file (decision 8). Jamie reviews them on the pull request. The en-GB text comes from this read:

```bash
gh api repos/k0d0minio/icm-board/contents/workspaces/sell/references/forms/intake-diagnostic.md -H "Accept: application/vnd.github.raw"
```
