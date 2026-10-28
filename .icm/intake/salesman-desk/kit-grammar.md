# Stub: The kit is one document with a grammar, in two parts and a reference, that teaches how Jamie works and how a lead reaches him

- feature-slug: kit-grammar
- epic: salesman-desk
- sequence: 2 of 6
- depends-on: language-preference
- complexity: high
- priority: P0

## Problem

`kit.<language>.md` is eight headings that mix procedure, reference and facts. It says little about who Jamie is and how he works, and nothing about what a salesman sees after the handoff. It lists six lines where `core/services.md` has fourteen. The desk renders it as a card grid and cannot tell which section teaches which status. A salesman also reads `target-profile.md` and `cadence.md`, house files in English with why-lines and the law the salesman does not act on.

## Proposed change

The kit becomes the salesman's one document, in a grammar the desk parses, in three parts: who Jamie is and what he sells, the system from the row to the 10%, and the reference. Each `##` is one lesson with a key, a part, and the status or the touch it teaches. The three language files line up by key. The two house files leave the salesman's view (the breakdown, question 1).

## Acceptance criteria

- [ ] `01-prospecting/CONTEXT.md`, Outputs, holds the kit's grammar:
  - One kit per language, `kit.<language>.md`. Frontmatter: `kind: kit`, `title`, `language` (`en-GB`, `fr-BE` or `pt-PT`), `owner`, `date`.
  - The H1 and the paragraphs before the first `##` are the intro: Jamie's words to the salesman, the course's first screen.
  - Each `##` heading is one lesson, in the words the salesman reads. The first thing under the heading is one list of `- key: value` lines. Under the list, the lesson's words: paragraphs, `###` subsections, lists, quotes and tables, as prose.
  - `key:` is required: kebab-case, the lesson's slug in the URL, the same in the three files.
  - `part:` is required: `jamie`, `system` or `reference`. The lessons of one part are contiguous, and the parts come in that order.
  - `status:` is optional: one pool status of `prospect.md` the lesson teaches. At most one lesson per status. A lesson with `status:` also has `next:`, one sentence: the thing the salesman does at that status. The row page shows it.
  - `touch:` is optional: `1`, `2` or `3`, or several separated by ` | `. The lesson page shows the pitch draft of each touch in the reader's language after the words.
  - The three files of the kit have the same keys in the same order, with the same `part`, `status` and `touch` per key. The words change per language. The keys do not.
  - No lesson shows a price, a band or the floor (`core/services.md`, Never public).
- [ ] `desk/app/lib/kit.ts` parses a kit into `{ language, title, intro, lessons: [{ key, part, status, next, touches, title, body }] }` and checks the three files against each other, as `lib/forms.ts` does for a form. A kit that does not parse, or three that do not line up, fails the build and names the file, or both files. `read-house.mjs` imports it and writes the parsed kits to `house.json` in place of the raw bodies. `lib/house.ts` types them.
- [ ] `/sell` renders the kit's lessons through the parser, each lesson's title and prose, so the key lists do not show. Its layout does not change in this stub.
- [ ] `kit.en-GB.md` is rewritten in Jamie's voice (`core/voice.md`) with these lessons, in this order. Jamie changes the words on the pull request.

  | Key | Part | Status · touch | What it says | Written from |
  |---|---|---|---|---|
  | `who-jamie-is` | jamie | | one engineer in Mafra since 2021, builds and teaches, works in three languages, what he does not do | `core/identity.md` |
  | `how-jamie-works` | jamie | | the call, then a fixed price with two options, the scope agreed before the work, a preview before every release, a handover pack, no hours sold, the words are the client's | `core/services.md`, `core/identity.md` |
  | `what-jamie-sells` | jamie | | every line of `core/services.md` by name and by what the client gets, grouped as build, teach, advise, automate and retainer, no price. The three rules: you never quote, fixed price or monthly, the words are theirs. A lead that fits no line is still worth a row | `core/services.md` |
  | `who-we-look-for` | jamie | | the two lines, the three countries and languages, what makes a good lead, what ends one | `target-profile.md` |
  | `add-the-row` | system | `new` | add the row before the first message. Search the pool first. Company and source now, the rest before Jamie. One company, one row. The slug | `prospect.md`, `cadence.md` Channels |
  | `the-first-touch` | system | `contacted` · touch 1 | send from your own account, to a role address when they did not ask, the two lines at the end, log it, the desk sets the next date | `cadence.md`, the kit of 2026-10-22 |
  | `follow-the-cadence` | system | touch 2 \| 3 | day 7 a new angle, day 21 the last note, then stop. When they go quiet, `lost` on day 28 with the reason. Log every touch | `cadence.md` |
  | `when-they-reply` | system | `replied` | ask what they want in their words: the ask. Offer twenty minutes with Jamie, or meet them yourself | the kit of 2026-10-22 |
  | `set-up-the-meeting` | system | `meeting` | how a meeting with Jamie is booked (the breakdown, question 2), what to write on the row, what Jamie does on the call | `meeting-on-the-row` fills the mechanism |
  | `hand-it-to-jamie` | system | `ready for Jamie` | the fields Jamie needs, the button, the pull request Jamie merges, "Check the PR" | `prospect.md`, Fields and Statuses |
  | `after-the-handoff` | system | `handed off` | the row is read-only, the deal's stages in words up to the agreement, what Jamie does with the lead, what the salesman sees | `clients/CONTEXT.md`, `prospect.md` The salesman's deal |
  | `your-10-percent` | system | | the 10% rule, the table, the monthly close, as the client pays | `prospect.md`, the kit of 2026-10-22 |
  | `openers` | reference | | WhatsApp, email, in person: the short ones, for someone you know | the kit of 2026-10-22 |
  | `follow-ups` | reference | | day 7, day 21: the short ones | the kit of 2026-10-22 |
  | `if-they-hesitate` | reference | | the five answers | the kit of 2026-10-22 |

- [ ] `kit.fr-BE.md` and `kit.pt-PT.md` are the translation of `kit.en-GB.md`, with the same keys in the same order. The pull request body lists what Jamie reviews: the three files, and the questions the words raised, numbered, each with a default.
- [ ] `01-prospecting/CONTEXT.md`, Process step 1, and `prospect.md`, The salesman's deal, say that a salesman reads the kit in the desk, and that `target-profile.md` and `cadence.md` are the house's model, read by the kit's author. Where the kit and a model file disagree, the model wins and the kit is fixed, the rule the contract has today.
- [ ] `set-up-the-meeting` names the mechanism Jamie answered in question 2, or says "Jamie tells you how" until `meeting-on-the-row` fills it.
- [ ] `check.yml` is green.

## Out of scope

- The course's pages: `sell-as-a-course`.
- The pitch drafts (`pitch/`): their words and their files do not change.
- A fourth language.

## Notes

Read first: the breakdown, `01-prospecting/CONTEXT.md` (the form grammar, the pattern this one follows), `01-prospecting/kit.en-GB.md`, `kit.fr-BE.md`, `kit.pt-PT.md`, `target-profile.md`, `cadence.md`, `prospect.md`, `core/identity.md`, `core/services.md`, `core/voice.md`, `clients/CONTEXT.md` (the stages), `desk/app/lib/forms.ts` (`parseForm`, `checkLanguages`), `desk/app/scripts/read-house.mjs` (the `sell` object), `desk/app/lib/house.ts`, `desk/app/app/(desk)/sell/page.tsx` (`sections`). The kit is Jamie's voice: first person, sentence case, no emoji, no exclamation mark. The intro and every lesson stay short: a salesman reads on a phone. The commission table keeps the examples of 2026-10-22. The kit says `contacted`, `ready for Jamie` and the other statuses as the model writes them, in every language.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, desk/CONTEXT.md, .claude/rules/desk-app.md, 01-prospecting/CONTEXT.md, .icm/intake/CONTEXT.md, .icm/intake/salesman-desk/breakdown.md whole, then this ticket, .icm/intake/salesman-desk/kit-grammar.md, then the files its Notes name. Do what it says. One branch, one pull request to main, message starts with "prospecting:" and carries one why. Move the stub to .icm/intake/salesman-desk/_done/ in the same pull request. Write kit.en-GB.md first, in Jamie's voice, then translate it. Never run build, lint or dev; read check.yml and the Vercel preview. Tick the acceptance criteria in the pull request body, list the three files for Jamie's review, and put the questions the words raised under "## Questions", numbered, each with a default. Do not merge. Your last message names the pull request and the preview.
