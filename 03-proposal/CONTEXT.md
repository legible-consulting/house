---
status: built
holds: []
---
# Proposal

The proposal produces the client-facing offer (problem, approach, scope, timeline) in the client's language, as a branded PDF in their Drive folder and a page in the dashboard, so that a client can say yes to a document they understand without a second call.

## Inputs

- `clients/<slug>/record.md` (`kind`, `language`, `next_action`, `deadline`) and
  `clients/<slug>/research/profile.md`, the profile that client research writes
  (`02-client-research/CONTEXT.md`). When a call note in `research/` is newer than the
  profile, client research updates the profile from it first (why: the proposal reads one file for the
  client's facts; a call note is a source, not a home · 2026-10-21).
- `core/identity.md`, `core/services.md`, `core/voice.md`; `research/concepts/` for reusable explainers.
- `clients/*/case/case.md`: the work a proposal cites. A proposal cites a case as its `public:` allows (`portfolio/CONTEXT.md`), and never a case whose `public:` is empty or `none` (why: proposals cited work from memory, and a client named without their word costs the reference · 2026-10-26).
- Jamie's answers to the questions in Process.

## Process

- Start cold from this folder. Read only what Inputs names.
- First walked for MotoArk (`kind: retainer`, en-GB, 2026-10-21). The steps:
  1. Read the record for `kind`, `language`, and what the client asked for and by when. Read
     the profile. If a call note in `research/` is newer than the profile, update the profile
     from it before anything else.
  2. Ask Jamie, in one batch, what the profile does not settle: the scope he wants to offer
     (what is in, what is out), the shape of the engagement if `kind` is empty, and what the
     call left open (the start date, who decides, who joins the next call). Offer a default in
     each question, computed from the profile and `services.md`.
  3. Write `proposal/proposal.md` in the client's language, in the register of `voice.md`:
     the problem in the client's own words, the approach (the method as it applies to them,
     the cadence, what they get each month), the scope (in, out), the timeline (start,
     checkpoints, the decision point), what happens after, and a last section "What it costs"
     that holds no number. The quote's `quote/quote.md` renders there (why: the price has one home,
     and a client says yes to one document · 2026-10-19).
  4. Frontmatter: `title`, `kind: proposal`, `client`, `language`, `date`, `valid_until` (14
     days after `date`, `terms.md`), `status: draft`. `date` is the day Jamie sends. Jamie
     sets it when he sends.
  5. Internal notes the send needs go in `proposal/`, in English, named in the PR body. They
     leave when the send is done.
  6. Commit on a branch with a message that starts `proposal:`. Push. Open a PR against `main`.
- For a retainer the proposal promises the hours of Jamie's attention a month and writes the
  scope per month: what month 1 builds, what the months after it build, a checkpoint at each
  month's end, and a decision point at the block's end. Progress is measured by scope
  completion, never by hours worked (`services.md` § Retainer pricing).
- The render: the workflow `render.yml` renders the proposal, with `quote/quote.md` as its
  last section, on the pull request and again on `main`. The PDF is the run's artifact `pdf`,
  kept 14 days (`core/CONTEXT.md` § Outputs, `render/`). Jamie copies it into the client's Drive
  folder with `core/render/place.sh <slug> <pdf>`, or a desktop session does after it asked
  Jamie. The PDF is the document; there is no Google Doc copy.
- The gate: Jamie reads the proposal and its PDF, sets the date, places the PDF and sends it.
  A session drafts into the folder. It never sends to the client and never ticks a gate
  (boundary). `stage` moves as `clients/CONTEXT.md` says.
- Not yet walked: the dashboard page.

## Outputs

- `clients/<slug>/proposal/proposal.md` (source) → the PDF, rendered by `render.yml` as the run's artifact `pdf` and placed in Drive by `core/render/place.sh`; the page the dashboard reads.
- `clients/<slug>/proposal/<note>.md`: an internal English note the send needs (a cover note). Only when the send needs one, deleted after it.
- The proposal's scope section is the list of tickets. Kickoff cuts it into the client repo's `.icm/intake/<epic-slug>/` (why: tickets have one home, the client repo's intake; a second list in the house drifts · 2026-10-21).
