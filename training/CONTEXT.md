---
status: built
holds:
  - record.md
---
# Training

Training produces the session plan, the coaching record and the attendance record for a workshop or a coaching block, from the workshop kit in the blueprint, the client's answers and the agreement, so that the training line is delivered from material rather than improvised, and a client leaves with their own workspace and a record they can file.

## Inputs

- In `legible-consulting/blueprint`, read only, never copied into the house: `workshop-kit/README.md`, `slides.md`, `exercises.md` and `walk-test.md` (the day, the exercises, the test a workspace passes); `README.md` § The workspace and `copier.yml` (the `workspace` question).
- `core/services.md`: Workshop, Coaching and Training pricing. The day and the hours sold are read there, never restated here.
- `clients/<slug>/record.md`: `slug`, `name`, `language`, `kind: training`, `stage`, and the body.
- `clients/<slug>/proposal/proposal.md` and `agreement/agreement.md`: the days, the hours of coaching, the dates.
- `clients/<slug>/kickoff/questions.md` with the client's answers, and `kickoff/sources.md` (`06-kickoff/CONTEXT.md`, `kind: training`).
- `clients/<slug>/training/plan.md` and `record.md`, when they exist.
- The template in this folder: `record.md`.
- In `legible-consulting/library`, read only: the lessons a session adapts, by the paths the kit cites. Quote at most one line of the course, with its path.
- Jamie's notes after each day, in the session.

## Process

- Start cold from this folder. Read only what Inputs names.
- The stages a training engagement walks, and who moves them, are in `clients/CONTEXT.md` (`kind: training`). A session never moves `stage`.
- Written from the workshop kit and from Euro Register's week as planned on 2026-10-22 (`clients/euro-register/kickoff/`). The first run is that week, 2 to 6 November 2026. What the week teaches goes back into this Process and into the kit.
- The steps:
  1. **Plan the sessions first.** Write `clients/<slug>/training/plan.md`, in English: the outcome for the client, the arc of the days, then per session the goal, the story Jamie tells, the demonstration on a case of the client's, the exercise and its check, and the materials. Then the coaching hours: who, how many hours, which job each person brings. The sessions keep the order of the kit, and the exercises keep the kit's checks. The plan reads the client's answers to `kickoff/questions.md` (why: Jamie teaches through stories and an exercise chain, and an outline written before the plan forces the plan to fit it · Jamie, 2026-10-25).
  2. **Derive the programme from the plan.** `kickoff/programme.md`, in the client's language, in the shape that `06-kickoff/CONTEXT.md` gives. A programme sent before the plan exists says that it is a programme de départ that adjusts (why: Euro Register's programme went out on 2026-10-22, before its plan).
  3. **The workshop day from the kit.** The day runs on the blueprint's slides and exercises, by path, not from a copy. The client's case, examples and names go in the plan, never in the blueprint (why: the blueprint is public · blueprint `CLAUDE.md`). A change to the method itself is a blueprint pull request to `workshop-kit/`.
  4. **The coaching hours against the client's own workspace.** Each person works on a job of their own. A client who works in a folder with an agent (Claude Code, Codex) gets a workspace rendered from the blueprint: `copier copy gh:legible-consulting/blueprint <folder> --data slug=<slug>-<job> --data client_name="<name>" --data language=<language> --data workspace=true`. A client whose tool has no agent over a folder (a chat tool with projects) gets the same three folders on their shared drive, and each stage contract goes in a project's instructions. CI does not apply there. One hour: the outcome, the stages and their files, the contract of the first stage, one real run, and what the person does alone the next week. The last hour of a person runs the kit's `walk-test.md` on their workspace.
  5. **Keep the coaching record.** `clients/<slug>/training/record.md`, in English, from the template in this folder. After each day, the session writes one row per hour from Jamie's notes: the date, the person, the hours, the job, what was built, the walk test result, the next step alone. The hours used are counted against the block that the agreement sells. The block is fixed. More hours are a new block in a new proposal, priced from `core/services.md` (Training pricing).
  6. **Draft the attendance record.** `clients/<slug>/training/attendance.md`, in the client's language: one line per attendee with the name as the client gave it, the dates and the hours, then the attestation text, one per person. The client files it as evidence of AI-literacy measures (`core/services.md`, Workshop). The session drafts it from the record. Jamie signs it and sends it.
  7. **Close.** When the week is delivered, the materials (the kit's paths, the workspace) and the attestations are sent by Jamie, and the record says so. Jamie moves `stage` to `after` (`clients/CONTEXT.md`).
- The plan and the coaching record are in English (why: internal notes · `CLAUDE.md`, Boundaries). The programme, the attendance record and every material the client keeps are in the client's language.
- The gate: Jamie reads the plan before the programme goes out, delivers the day and the hours, signs and sends the attendance record and the materials, and moves `stage`. A session drafts. It never sends to the client, never signs, never moves `stage`, never ticks a gate (boundary).
- A session commits on a branch with a message that starts `training:`, pushes, and opens a pull request. The body lists the questions for Jamie, numbered, each with a default.

## Outputs

- `record.md`: the template of a coaching record, with `{{PLACEHOLDERS}}` like `clients/_template/record.md`.
- `clients/<slug>/training/plan.md`, `record.md` and `attendance.md`. `clients/CONTEXT.md` holds them.
- `clients/<slug>/kickoff/programme.md`, derived from the plan, in the shape of `06-kickoff/CONTEXT.md`.
- A blueprint pull request to `workshop-kit/` when a run changes the method.
- The house pull request, with a message that starts `training:`.
