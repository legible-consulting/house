# Stub: The desk reads every form of the house at build

- feature-slug: desk-reads-forms
- epic: desk-forms
- sequence: 2 of 9
- depends-on: forms-in-the-house
- complexity: medium
- priority: P0

## Problem

The desk has no parser for a form, and `read-house.mjs` does not read `forms/`.

## Proposed change

`desk/app/lib/forms.ts` parses one form file into a snapshot. The snapshot holds the form slug, the language, the folder, the title, the intro and the fields. A field has a key, a label, a type, a required flag, a hint and options. `read-house.mjs` reads every `*/forms/*.md` in the house into `house.json`, parsed. A form that does not parse fails the build with the file and the reason.

## Acceptance criteria

- [ ] `lib/forms.ts` parses a form into a snapshot.
- [ ] A file that breaks the grammar fails with the file name and the reason. The breaks: no title, no question, a `select` with no options, a question without `key`, two questions with one key.
- [ ] The parser checks the language files of one form against each other. They carry the same keys in the same order, and the same option count per question. A mismatch fails with both file names.
- [ ] `read-house.mjs` reads every `*/forms/*.md` into `house.json`, grouped by form slug and language. Its header lists the read.
- [ ] A form that does not parse fails `check.yml`'s desk job and the Vercel build.
- [ ] `.claude/rules/desk-app.md` names `lib/forms.ts`.
- [ ] `check.yml` is green.

## Out of scope

- Any page. Nothing renders yet.

## Notes

Port `packages/services/src/forms-parse.ts` from `k0d0minio/jamienisbet` at `9d5db8c`. No zod: the desk checks by hand, as `app/api/pool/route.ts` does. The parser is pure, so `read-house.mjs` imports it the way `rhythms.mjs` imports `lib/rhythms.ts`. The snapshot is plain JSON. `send-a-link` stores it in Neon as it is (why: the frozen questions and the answers' validation use one shape · 2026-10-25).
