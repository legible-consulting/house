# Stub: The free-look questions live in the house, in three languages

- feature-slug: forms-in-the-house
- epic: desk-forms
- sequence: 1 of 9
- depends-on: none
- complexity: medium
- priority: P0

## Problem

The eight free-look questions were last served by the portfolio, in English, and live nowhere in the house. The house has no home for a form and no grammar for one.

## Proposed change

Three files carry the eight questions of Notes: `01-prospecting/forms/free-look.en-GB.md`, `free-look.fr-BE.md` and `free-look.pt-PT.md`. The prospecting contract holds them and states the grammar. The lexicon gains **form**.

## Acceptance criteria

- [ ] The three files exist. The en-GB file carries the eight questions of Notes with their keys unchanged. The fr-BE and pt-PT files carry the same keys in the same order, with the options in the same order.
- [ ] Each file's frontmatter has `kind: form`, `title`, `intro`, `language` and `folder: research`.
- [ ] `01-prospecting/CONTEXT.md` holds `forms/*.md`, names the forms in Outputs, and states the grammar.
- [ ] `core/lexicon.md` defines **form**.
- [ ] `check.yml` is green.

## Out of scope

- The parser and the desk's read: `desk-reads-forms`.
- Kickoff's forms.

## Notes

The grammar, kept from the old `forms-parse.ts` (`k0d0minio/jamienisbet` at `9d5db8c`, `packages/services/src/forms-parse.ts`):

- One form per file, `<form>.<language>.md`. The name before the language tag is the form slug. It never changes once a link was sent.
- Frontmatter: `kind: form`, `title`, `intro`, `language` (`en-GB`, `fr-BE` or `pt-PT`), `folder` (the client subfolder the answers land in).
- Each `##` heading is one question, in the words the visitor reads. Under it, one list of `- key: value` lines: `type:` (`text` by default, `textarea`, `select` or `boolean`), `options:` (`select` only, separated by ` | `), `optional: yes`, `hint:`, `key:`. Prose outside the list is ignored.
- `key:` is required on every question (why: the old grammar slugified the heading, and a heading in three languages gives three slugs. The answers of one form must line up across languages · 2026-10-25).
- Four types. No conditional logic. No uploads. A link to a recording is a `text` question.
- The three language files of one form carry the same keys in the same order. Their options are in the same order too (why: the desk maps an answer to a pool field by the option's position. The words differ per language. The position does not · 2026-10-25).

The fr-BE and pt-PT files are the session's translation of the en-GB file (decision 8). Jamie reviews them on the pull request. The en-GB text is here, so the stub needs no outside read. Title: "A free look at how you work". Intro: "Eight short questions so the first call starts where you are. Nothing here is a commitment, and nothing has a price yet. The look is free, and it comes after we talk." The eight questions, in order:

| # | `key` | `type` | Question | Options, or hint |
|---|---|---|---|---|
| 1 | `business` | textarea | What does your business do, and for whom? | hint: Two or three sentences, the way you'd tell a friend. |
| 2 | `eats_the_week` | textarea | What eats your week? | hint: The task, the chasing, the copying between tools: whatever you'd most like to stop doing by hand. |
| 3 | `tools_today` | textarea | Which tools do you use today? | hint: Spreadsheets, WhatsApp, a booking system, an accounting app, paper: all of it counts. |
| 4 | `done_looks_like` | select | If this went well, what would "done" look like six months from now? | A page or site people find and act on \| A tool my team and I use every day \| A process that runs itself and tells me when it needs me \| Not sure, that's what I want the look to tell me |
| 5 | `links` | textarea, optional | Where can I see what you have today? | hint: Your site, your socials, a listing: links, one per line. |
| 6 | `walkthrough_link` | text, optional | A five-minute walkthrough (optional, but the best thing you can send) | hint: A screen recording of you doing the thing that eats the week, narrated. A link (Loom, Drive, WeTransfer). I watch it once, locally; it goes nowhere else. |
| 7 | `budget` | select | What sort of budget did you have in mind? | Under €500, a small fix \| ~€500, a landing page \| €1,000 to €2,500, a site or a first tool \| €2,500 to €7,500, a real build \| €7,500+, a platform \| I don't know yet |
| 8 | `language` | select | Which language should we work in? | English \| Français \| Português |

The option positions are what `start-route` maps to the pool row (questions 4, 7 and 8).
