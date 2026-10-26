---
kind: coaching-record
client: "{{SLUG}}"
language: en
block_hours: "{{HOURS}}"
date: "{{YYYY-MM-DD}}"
---

# {{CLIENT_NAME}}: coaching record

<!-- The template (training/CONTEXT.md, step 5). Copy it to clients/<slug>/training/record.md.
Fill every {{PLACEHOLDER}} from the agreement and the client's answers. A line nobody said
is "open". Drop this comment. -->

Internal. English. The coaching block as the agreement sells it, and what each hour built.
The plan is `plan.md`. The prices are in `core/services.md`.

## The block

- Sold: {{HOURS}} hours of coaching, {{DATES}}, in `agreement/agreement.md`.
- Used: 0 of {{HOURS}}.
- The client's tool: {{TOOL: an agent over a folder, or a chat tool with projects}}. The
  workspace: {{WORKSPACE: rendered from the blueprint with workspace=true, or the three
  folders on the shared drive}}.

## The people

| Person | Role | Job they bring | Hours planned | Walk test |
|---|---|---|---|---|
| {{NAME}} | {{ROLE}} | {{JOB: the task and what it must produce}} | {{HOURS}} | open |

## The hours

| Date | Person | Hours | Job | Built | Walk test | Next step alone |
|---|---|---|---|---|---|---|

## The attendance

- `attendance.md`: open. The session drafts it from this record. Jamie signs and sends it.
