---
title: "The task assessment and the personal reports"
kind: procedure
client: euro-register
language: en
date: 2026-11-04
---

# The task assessment and the personal reports

Internal. English. A step of Euro Register's own, after the week of 2 to 6 November 2026.
Each person on the team gives Jamie a rough list of their tasks: photos of paper notes and
drawings, or typed documents. This step turns that list into one advisory report per
person, in French, that says how that person can set up their own ICM system in Claude.
When all the reports exist, it writes one team synthesis for Arnaud. The report is part of
the 6,500 € week. It is not a new block. `training/CONTEXT.md` routes here.

## Inputs

- The raw files of one person, in Drive › `arnaud-ruelle` › `taches/<Prénom Nom>/`. Jamie
  puts them there. They never enter git. Read the photos as images.
- Jamie's word in the session: the name of the person to assess.
- `record.md` in this folder: the person's row in "The people" and their rows in "The
  hours" (the job, what the coaching built, the walk test, the next step alone).
- `kickoff/programme.md`: the week's five words (le bureau, l'étape, la consigne, le plan,
  la validation) and Monday's three columns. The report uses these words and no others for
  the method.
- `research/profile.md` § What the week settled and § Data rules: the tool (Claude
  Projects for everyone, a folder with Cowork for the people who are ready), no connector
  for now, and what may enter Claude.
- In `legible-consulting/blueprint`, read only: `workshop-kit/walk-test.md`. The report
  advises a system that can pass these checks.
- `tasks-<person>.md` and `report-<person>.md` in this folder, when they exist.
- For the synthesis only: every `report-*.md` in this folder.

## Process

### For each person

1. **Check the inputs.** The person's raw folder exists in Drive. The person has a row in
   `record.md`. If the row is missing, ask Jamie for the coaching notes, and write the row
   first (`training/CONTEXT.md`, step 5). Default: "no coaching slot".
2. **Transcribe.** Write `tasks-<person>.md`. Copy every item the person wrote, word for
   word, in French. Give each item an id (T1, T2, …) and the name of its source file.
   Describe a drawing as its structure: the boxes, the arrows, the labels. Write
   `[illisible]` where you cannot read a word, and add a question. Do not interpret in this
   section.
3. **Choose the setup.** From Jamie's notes in `record.md`: Claude Projects, or a folder
   with Cowork. Default: Projects. A folder setup follows `training/CONTEXT.md`, step 4.
4. **Assess each task.** In `tasks-<person>.md`, below the transcription, fill one row per
   task with the nine fields of "The lens" below. A field that the inputs do not support
   stays empty and gets a question.
5. **Ask.** At the end of `tasks-<person>.md`, list the questions for Jamie, numbered, each
   with a default. Stop. Continue when Jamie answers or says "use the defaults".
6. **Choose the jobs.** Choose one to three jobs for a staged system, by "The choice" below.
7. **Write the report.** Write `report-<person>.md` in fr-BE, in the shape of "The report"
   below.
8. **Commit.** Commit on a branch with a message that starts `training:`, push, and open a
   pull request. The body lists the open questions for Jamie, numbered, each with a default.
   One pull request can hold several people.
9. **Place.** Jamie reads the transcription and the report, and corrects them in the pull
   request. On Jamie's word in the session, create the report as a Google Doc in Drive ›
   `arnaud-ruelle` › `rapports/`, put its link in the report's `drive:` field, and add a row
   to "The reports" in `record.md`. Do not create the Google Doc before Jamie's word: Arnaud
   can open the Drive folder. A later change goes into `report-<person>.md` first, then
   replaces the Google Doc.
10. **Send.** Jamie shares the Google Doc with the person and with Arnaud, and sends it. On
   Jamie's word, write the date sent in `record.md`.

### The synthesis for Arnaud

1. Start when Jamie says that the reports are complete, or names the reports to use.
2. Read every `report-*.md` in this folder and the `tasks-*.md` beside each one.
3. Write `synthesis.md` in fr-BE, in the shape of "The synthesis" below.
4. Commit, place and send as steps 8 to 10 above say.

## The lens

The nine fields for each task. Each field comes from the person's words, Jamie's notes or
the data rules. Mark each field that you propose yourself as "proposé".

1. **The work.** What the task reads, what it makes, and who receives what it makes.
2. **The effort.** How often the task occurs, and the time for one occurrence, from the
   person's own numbers or from Jamie's notes. Calculate the hours per month. If no number
   exists, write "non estimé" and ask.
3. **The column.** Monday's three columns: a model can do it, a classic tool does it
   better (the spreadsheet, the ERP, the agenda), or it stays with a person. Use the
   person's own column when they gave one.
4. **The shape.** Stable (the same steps each time), partly stable, or different each time.
5. **The judgment.** The points where a person must decide or check. These become the
   validations.
6. **The facts.** The facts the task needs (a price, a technical sheet, a customer's
   history), and where they live today: the ERP, a spreadsheet, the mail, a shared folder,
   a person's memory.
7. **The way in.** How each input reaches Claude by hand, and who does it: a file to
   upload or to put in the folder, an export from the ERP or a spreadsheet, a mail saved as
   a file, or a paste. Name the manual step and how long it takes. A connector appears only
   as a later option, marked "plus tard".
8. **The verdict.** One of four: a job for a staged system, a job for a tool, a job for a
   person, or not yet (a fact or a rule is missing).
9. **The saving.** Only for a job for a staged system. A range of hours per month, with the
   assumption that gives the range. Never one exact figure. Never a range that the effort
   field does not support.

## The choice

A job enters the report as one of the one to three jobs when most of these are true:

- It occurs often, and the effort field shows it.
- Its shape is stable or partly stable.
- The facts it needs exist in files, not only in a person's memory.
- Each input can reach Claude by hand, and the manual step costs less than the saving.
- One clear point needs a person's judgment, and that point can be a validation.
- The person feels the pain of it. Their own words say so.

Prefer the job of the person's coaching slot when it qualifies, so that the report
continues what the person started. A job in the tool column goes to the tool, not to the
model. A job in the person column stays with the person. The report names both kinds and
says why.

## The report

`report-<person>.md`, in fr-BE, advisory. It gives no complete consigne text. For each step
it says what the consigne must say, and the person writes it. Use "vous" (question 1 of the
first pull request). The sections:

1. **En bref.** Three lines: what we read, the jobs to start with, the first step alone.
2. **Qui lit ce rapport.** One line: the person, Arnaud and Jamie read it.
3. **Votre installation.** Claude Projects, or a folder with Cowork, and why.
4. **Ce que vous nous avez donné.** One table: each task in a few words, its column, its
   verdict. One line under it: "Si une ligne est fausse, dites-le."
5. **Où part votre temps.** The effort field, for the tasks that have numbers only.
6. **Ce qu'on laisse à un outil ou à une personne.** The tasks in those two columns, and why.
7. **Les travaux à construire.** For each chosen job:
   - le résultat: for whom, what that person does next, where the information comes from
     today, what breaks and who notices (Wednesday's four questions);
   - les étapes: what each step reads and the one file it makes;
   - la validation: who checks, at which step, and which step waits;
   - ce que dit chaque consigne: the reads, the file it makes, who checks;
   - l'espace Claude: one Project per step and the files that go into it, or for the
     folder setup, the step's folder and its consigne file;
   - comment les données entrent: per step, the manual way in and who does it;
   - l'outil: what must give the same output every time, and which tool does it;
   - ce qu'il ne faut pas construire;
   - le test du collègue: what a colleague must read in the folder to say what it is, where
     it stands and what comes next.
8. **La première semaine seul.** From the next step alone in `record.md`, made concrete.
9. **Ce que nous avons supposé.** Each field marked "proposé", and each default that Jamie
   accepted. One line under it: "Corrigez-nous."

The report assesses the tasks, not the person. It contains no remark on the person's speed,
skill, workload as a fault, or job security. Each person knows before they give their list
that Arnaud reads the report (Jamie tells them). A task that the person marked as private
becomes a question for Jamie before it enters the report.

## The synthesis

`synthesis.md`, in fr-BE, for Arnaud. It compares jobs, not people. It ranks no person. The
sections:

1. **En bref.** Three lines.
2. **Les travaux partagés.** The jobs that several people do. For each, whether one shared
   system is better than several personal ones, and who uses it.
3. **Les faits sans maison.** The facts that several jobs need and that live in more than one
   place or only in a person's memory: prices, technical sheets, customer history. For each,
   the one place it can live.
4. **Ce qui revient aux outils.** The tasks in the tool column, grouped by tool (the ERP, the
   spreadsheets, the agenda).
5. **Les entrées à organiser.** The inputs that several jobs bring in by hand, and the one
   export or shared folder that makes each of them cheap. A connector appears only as a later
   option.
6. **L'ordre proposé.** The jobs to start with, in order, and the reason for each.

## Outputs

- `tasks-<person>.md`, in English with the person's words in French: the transcription, the
  lens table, the questions.
- `report-<person>.md`, in fr-BE: the report. Frontmatter: `title`, `kind: report`,
  `client`, `language: fr-BE`, `person`, `date`, `status`, `drive`.
- `synthesis.md`, in fr-BE: the synthesis for Arnaud. Same frontmatter, `kind: synthesis`,
  without `person`.
- The Google Docs in Drive › `arnaud-ruelle` › `rapports/`, created on Jamie's word.
- The rows of "The reports" in `record.md`.
- The house pull request, with a message that starts `training:`.

`<person>` is the person's first name and last name, in lower case, without accents, joined
by hyphens: `marie-dupont`.
