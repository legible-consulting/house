---
status: built
holds:
  - access-table.md
  - kickoff-note.md
  # The questions every build asks, one file per language, sent by link from the desk (2026-10-26).
  - "forms/*.md"
---
# Kickoff

Kickoff produces the client repo rendered from the blueprint, the access table, the kickoff note and the first epic of tickets, from the signed agreement, the accepted proposal and the client's answers to the kickoff form, so that every build starts the same way, access is asked once, and the proposal's scope reaches the client repo as tickets.

## Inputs

- `clients/<slug>/record.md`: `slug`, `name`, `language`, `kind`, `stage`, `repo`, `vercel_project`, `agreement_signed`, and the body.
- `clients/<slug>/agreement/agreement.md`, the signed text, and `clients/<slug>/proposal/proposal.md`, the accepted proposal. The proposal's scope section is the ticket list (`03-proposal/CONTEXT.md`, Outputs).
- The client's answers to the kickoff form: `clients/<slug>/kickoff/kickoff-<date>.md`.
- `core/terms.md` (Ownership, Hosting and support): who holds which account.
- The templates in this folder: `access-table.md`, `kickoff-note.md`.
- In `legible-consulting/blueprint`, read only: `README.md`, `copier.yml` (the bank of questions), `template/.icm/intake/CONTEXT.md` (the stub and the breakdown).
- For a client repo that exists before kickoff: its `.copier-answers.yml`, `.env.example`, `.github/workflows/` and `.icm/project.json` when it exists.
- Jamie's answers to the questions in Process.

## Process

- Start cold from this folder. Read only what Inputs names.
- The stage this module serves, and who moves it, are in `clients/CONTEXT.md` (the `kickoff` row). A session never moves `stage` and never sets `repo:`.
- Written from the four kickoffs done by hand before this stage existed: Agorasim, Berceo and Remi AI (builds that started before the house, written back on 2026-10-23) and Euro Register (a training week, 2026-10-22). The first run of this Process is Vinecliff's.
- Kickoff is the one session that writes to two repos: the house and the client repo (`CLAUDE.md`, House rules). It attaches the blueprint read only.
- For `kind: build`, and for a `retainer` or a `role` whose scope holds code, the steps:
  1. Read the record. `stage` is `kickoff` and `agreement_signed` is `true`. If not, stop and ask Jamie. Read the agreement and the proposal: the scope (in and out), the timeline, the hosting pattern (`core/terms.md` § Hosting and support) and the go-live date.
  2. Jamie sends the kickoff form, `forms/kickoff.<language>.md`, in the client's language: `en-GB` for any English, `fr-BE` for French, `pt-PT` for Portuguese. He sends it as a sent link from the Send a form card on `/clients/<slug>` when the desk's page `/f/<token>` exists (`.icm/intake/desk-forms/answer-a-link.md`). Then the desk writes the answers to `kickoff/kickoff-<date>.md`. Until then, Jamie sends the questions by mail, and the session writes the reply to `kickoff/kickoff-<date>.md`: one `##` heading per question, the client's words under it, as written. A session never sends the form (boundary).
  3. Read the answers. Ask Jamie, in one batch, what the answers, the agreement and the proposal do not settle: the answers to the blueprint's bank (step 6), the Vercel team and project, the hosting pattern when the proposal does not name it, the first epic's slug, and each account that the answers leave unknown. Offer a default in each question.
  4. Write `clients/<slug>/kickoff/access-table.md` and `kickoff-note.md` from the templates in this folder, in English (why: both are internal notes · `CLAUDE.md`, Boundaries). The access table holds secret names and who holds each account, never a value. A plaintext credential found in an answer, a mail or a repo is flagged to Jamie in the PR body and never copied (why: a secret in git outlives every rotation · `.claude/rules/clients.md`).
  5. Jamie creates the empty repo `k0d0minio/<slug>` in GitHub, private, under his own account (`core/lexicon.md`, client repo). A session never creates a repo (why: a new repo reaches the estate · 2026-10-26).
  6. Render the repo from the blueprint, with the answers in the command:

     ```bash
     copier copy gh:legible-consulting/blueprint ~/Desktop/legible-consulting/projects/<slug> \
       --data slug=<slug> --data client_name="<name>" --data language=<language> \
       --data monorepo=<true|false> --data release=<true|false> --data uat=<true|false>
     ```

     Each answer has one home:
     - `slug`, `client_name` and `language`: the record's `slug`, `name` and `language`.
     - `monorepo`: yes when the proposal's scope names two or more apps.
     - `release`: yes, unless Jamie says that the merge of a ticket is its release.
     - `uat`: yes when the proposal or the agreement says the client signs off each batch before it reaches production. Otherwise no, and the preview is the UAT.

     Copier renders the latest tag of the blueprint and records the answers in `.copier-answers.yml`.
  7. In the rendered folder: `git init -b main`, one commit `chore: render from the blueprint <tag>`, add the remote `k0d0minio/<slug>`, push `main`. This is the one push to a client repo's `main` that is not a pull request (why: a pull request needs a base branch, and an empty repo has none. Every later change is a pull request, `07-build/CONTEXT.md` · 2026-10-26).
  8. Cut the first epic on a branch of the client repo, `.icm/intake/<epic-slug>/`, in the shape of the repo's `.icm/intake/CONTEXT.md`: a `breakdown.md` and one stub per unit of work. The `source:` line names the proposal (its path in the house and its date) and the kickoff answers. The proposal's In becomes the stubs, and its Out becomes the breakdown's Out of scope. The questions for the client and for Jamie go under `## What I understood`, numbered, each with a default. Commit with a message that starts `chore(intake):`. Push. Open a pull request against `main`.
  9. In the house: commit `kickoff/access-table.md`, `kickoff-note.md`, and the answers file when the session wrote it from a mail, on a branch, with a message that starts `kickoff:`. Push. Open a pull request against `main`. The body names the client repo's pull request, gives the copier command with its answers, lists the questions for Jamie, numbered, each with a default, and flags each credential found.
  10. Jamie merges the two pull requests. He sets `repo: k0d0minio/<slug>` and `vercel_project` in `record.md`. `repo:` set is the done marker (`clients/CONTEXT.md`). Then he moves `stage` to `build`.
- A client repo that exists before kickoff (a build that started before the house: Agorasim, Berceo, Remi AI, Vinecliff). Steps 5 to 7 do not apply, and nothing is rendered. The access table is written from the names the code reads: `.env.example`, the workflows, `.icm/project.json`. A repo whose `.copier-answers.yml` is older than the blueprint's bank goes to conformance for `copier update` (`conformance/CONTEXT.md`), never into a kickoff pull request. When the folder holds no proposal, the record's body and the kickoff answers are the scope, and the breakdown's `source:` line says so. `repo:` is set already, so kickoff ends when Jamie moves `stage` to `build` after the first epic merges (why: a done marker that was true before kickoff started says nothing · Vinecliff, 2026-10-26).
- A `retainer` or a `role` whose scope holds no code: steps 5 to 8 do not apply. Stop and ask Jamie what kickoff writes.
- For `kind: training`, kickoff is the programme and the questions, in the client's language, in the shape of `clients/euro-register/kickoff/`:
  - `kickoff/programme.md`: the days, written from the proposal and the agreement. Frontmatter `title`, `kind: programme`, `client`, `language`, `date`, `status: draft`.
  - `kickoff/questions.md`: the participants, the work, the tools, the data, the cases, the logistics, the goal and the invoice details. Each table has a column for who answers and a column for the answer. The session places it in the client's Drive folder as a Google Doc, so that the client answers in place (`CLAUDE.md`, Boundaries).
  - `kickoff/sources.md`, in English: the course lessons each day follows.
  - The kickoff form is not sent, and no repo is rendered (why: the form asks what a build asks, and a week asks about people, rooms and data · Euro Register, 2026-10-22). Kickoff ends when the week is delivered (`clients/CONTEXT.md`).
- The client-facing words are in the client's language: the form, the questions, the programme. The access table, the kickoff note and `sources.md` are in English. The breakdown and the stubs follow the client repo's writing rules. The questions for the client reach the client in their language, from Jamie.
- The gate: Jamie sends the form, creates the repo, reads the access table, the note and the breakdown, answers the questions, merges both pull requests and sets `repo:`. A session never sends to the client, never creates a repo, never merges, never sets `repo:`, never moves `stage`, never ticks a gate (boundary).

## Outputs

- `access-table.md`, `kickoff-note.md`: the templates, with `{{PLACEHOLDERS}}` like `clients/_template/record.md`.
- `forms/kickoff.<language>.md`: the kickoff form in `en-GB`, `fr-BE` and `pt-PT`, in the form grammar of `01-prospecting/CONTEXT.md` Outputs, `folder: kickoff`. The desk lists it on the Send a form card. It asks for who holds each account, never for a password or a key.
- `clients/<slug>/kickoff/access-table.md`, `kickoff-note.md` and `kickoff-<date>.md` (the answers). For `kind: training`: `programme.md`, `questions.md`, `sources.md`. `clients/CONTEXT.md` holds them.
- The client repo `k0d0minio/<slug>`, rendered, with `main` pushed, and the pull request of its first epic.
- The house pull request, with a message that starts `kickoff:`.
