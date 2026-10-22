---
status: built
holds: []
---
# Proposal — S3

S3 produces the client-facing offer (problem, approach, scope, timeline) in the client's language, as branded PDF, Google Doc in their Drive folder, and a page in the dashboard, so that a client can say yes to a document they understand without a second call.

## Inputs

- `clients/<slug>/record.md` (`kind`, `language`, `next_action`, `deadline`) and
  `clients/<slug>/research/profile.md`. When a call note in `research/` is newer than the
  profile, S2 updates the profile from it first (why: the proposal reads one file for the
  client's facts; a call note is a source, not a home · 2026-10-21).
- `core/identity.md`, `core/services.md`, `core/voice.md`; `operator/research/concepts/` for reusable explainers.
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
     that holds no number. S4's `quote/quote.md` renders there (why: the price has one home,
     and a client says yes to one document · 2026-10-19).
  4. Frontmatter: `title`, `kind: proposal`, `client`, `language`, `date`, `valid_until` (14
     days after `date`, `terms.md`), `status: draft`. `date` is the day Jamie sends. Jamie
     sets it when he sends.
  5. Internal notes the send needs go in `proposal/`, in English, named in the PR body. They
     leave when the send is done.
  6. Commit on a branch with a message that starts `S3:`. Push. Open a PR against `main`.
- For a retainer the scope is written per month: what month 1 builds, what the months after
  it build, a checkpoint at each month's end, and a decision point at the block's end (why: a
  retainer sells a written monthly scope, never hours · `services.md`).
- The gate: Jamie reads the proposal, sets the date, renders it and sends it. A session drafts
  into the folder. It never sends to the client, never moves `stage`, never ticks a gate
  (boundary).
- Not yet walked: the PDF render in CI, the Google Doc in the client's Drive folder, and the
  dashboard page. Until they exist, Jamie renders and sends by hand.

## Outputs

- `clients/<slug>/proposal/proposal.md` (source) → PDF rendered in CI, Doc placed in Drive from the session, page read by the dashboard.
- `clients/<slug>/proposal/<note>.md`: an internal English note the send needs (a cover note). Only when the send needs one, deleted after it.
- The proposal's scope section is the ticket list. D1 cuts it into the client repo's `.icm/intake/<epic-slug>/` (why: tickets have one home, the client repo's intake; a second list in the house drifts · 2026-10-21).
