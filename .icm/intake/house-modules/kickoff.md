# Stub: Kickoff: the access table, the kickoff note, the questionnaire, and the client repo rendered from the blueprint

- feature-slug: kickoff
- epic: house-modules
- sequence: 5 of 9
- depends-on: stage-numbers
- complexity: medium
- priority: P1

## Problem

A signed build starts by hand: access is asked twice, the repo is rendered from memory, the proposal's scope is cut into tickets without a procedure. Vinecliff is at `kickoff` today with `repo:` set and no kickoff folder. Three build kickoffs were done by hand (Agorasim, Berceo, Remi AI) and one training kickoff (Euro Register).

## Proposed change

The module `06-kickoff/`: a contract with a built Process, two templates and the kickoff form in three languages. The Process renders the client repo from the blueprint with the bank's answers, writes the access table and the kickoff note from the questionnaire's answers, cuts the proposal's scope into the client repo's `.icm/intake/`, and ends when `repo:` is set in `record.md`. It is the one session that writes to two repos (`CLAUDE.md`, House rules).

## Acceptance criteria

- [ ] `06-kickoff/CONTEXT.md` exists with Inputs, Process and Outputs, `status: built`, no placeholder line. Its `holds:` names the two templates and `forms/*.md`.
- [ ] `06-kickoff/access-table.md` and `kickoff-note.md` exist as templates with `{{PLACEHOLDERS}}` like `clients/_template/record.md`. `06-kickoff/forms/kickoff.en-GB.md`, `kickoff.fr-BE.md` and `kickoff.pt-PT.md` exist in the form grammar of `.icm/intake/desk-forms/forms-in-the-house.md` (in `01-prospecting/CONTEXT.md` once that stub merges), `folder: kickoff`, and ask what every build asks: the business, access (domain, hosting, payments, email), content and brand, how the thing must work, go-live. The four kickoffs done by hand hold the questions. The access table holds secret names and who owns each account, never a value.
- [ ] The Process says, in order: read the agreement and the proposal; Jamie sends the kickoff form (a sent link from the client page once `.icm/intake/desk-forms/send-a-link.md` ships; by mail until then); write `kickoff/access-table.md` and `kickoff-note.md` from the answers; create the client repo by hand in GitHub; render it with `copier copy` from the blueprint, answering the bank from the record and the proposal (`blueprint/copier.yml`: `slug`, `client_name`, `language`, `monorepo`, `release`, `uat`); cut the first epic from the proposal's scope into `.icm/intake/<epic>/` with a breakdown and stubs (the blueprint's `template/.icm/intake/CONTEXT.md`); push; Jamie sets `repo:` in `record.md`, the done marker. For `kind: training`, kickoff is the programme and the questions (`clients/euro-register/kickoff/`) and ends when the week is delivered (`clients/CONTEXT.md`).
- [ ] `07-build/CONTEXT.md` Inputs say the tickets come from kickoff. `CLAUDE.md` Routing gains the row, and its "One session, one repo" rule names `06-kickoff`. `core/lexicon.md`'s folder table shows `06-kickoff/` as built.
- [ ] Nothing is rendered for Vinecliff in this pull request. The pull request body lists, numbered, the three steps Jamie does next for Vinecliff.
- [ ] `check.yml` is green.

## Out of scope

- Vinecliff's kickoff itself: the module's first run, after the merge.
- The blueprint's questions: `legible-consulting/blueprint`.

## Notes

Read first in the house: `CLAUDE.md`, `clients/CONTEXT.md` (kickoff and build), `07-build/CONTEXT.md`, `03-proposal/CONTEXT.md` (Outputs: the scope is the ticket list), `core/terms.md` (Ownership, Hosting and support), `clients/vinecliff/record.md`, and what was done by hand: `clients/agorasim/kickoff/`, `clients/berceo/kickoff/`, `clients/remi-ai/kickoff/`, `clients/euro-register/kickoff/`. In `legible-consulting/blueprint`, attached read-only or at `~/Desktop/legible-consulting/blueprint`: `README.md`, `copier.yml`, `template/.icm/intake/CONTEXT.md`. Secret names only (`.claude/rules/clients.md`).

## Prompt

Repo legible-consulting/house, cloud with the house attached and legible-consulting/blueprint attached read-only, or desktop at ~/Desktop/legible-consulting/house with the blueprint at ~/Desktop/legible-consulting/blueprint. Read CLAUDE.md, .icm/intake/CONTEXT.md, .icm/intake/house-modules/breakdown.md, then this ticket, .icm/intake/house-modules/kickoff.md, then the files its Notes name, in order. Do what it says. One branch, one pull request to main, message starts with "kickoff:". Move the stub to .icm/intake/house-modules/_done/ in the same pull request. Never run build, lint or dev. Render nothing for a client. Do not merge. Your last message names the pull request and the three steps that wait on Jamie.
