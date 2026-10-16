---
title: "Goals — what the rebuilt system produces"
kind: goals
status: draft
owner: jamie
date: 2026-10-14
supersedes: 00-goal-questions.md
source: 00-goal-interview-answers.md (14 rounds, 2026-10-14)
---

# Goals — what the rebuilt system produces

Every goal is written as **`<Module> produces <artefact> so that <who> can <do what>`**.
Goals are outcomes. How they are met belongs to each module's own folder, later.

## Frame

- **house is the successor to Apps (icm-board).** Apps is mined for reference and
  retired once one real deal has walked the new folders. Nothing from Apps carries by
  default: the 63 decisions are re-opened, and only what a goal below needs survives.
- **Horizon: 90 days** (to mid-January 2027).
- **Readers:** Jamie; clients, for the parts about them; workshop and coaching attendees,
  for whom the system itself is teaching material. Salesmen use the dashboard, not the folders.
- **Shape:** a shared core that every module reads, plus independent modules in their own
  folders. A module's produced artefact is the only handoff to the next; a downstream module
  declares it as an Input and nothing else couples them.
- **Rules:** the ICM paper and Jake Van Clief's workspaces are Layer 3 for the rebuild; the
  rebuild itself runs as a workspace-builder walk (discovery → stage mapping → scaffolding →
  questionnaire → validation).

## Core (3)

**C1 · Shared core** produces the business's identity and bio, its services and pricing, its
voice and document design system, and its terms, stack and house rules, each fact in exactly
one place, so that every module and every client artefact speaks with one voice and a change
made once lands everywhere.

**C2 · Client folder** produces one folder per relationship, opened at first touch as a
prospect and kept through after-handover, holding the relationship's facts and every
module's artefact for it, so that Jamie, a salesman or the client can see in one look where it
stands, what is next, and who is waiting.

**C3 · Desk** produces the morning glance, the Friday review (every client's next action and
deadline plus one flat open-items list), the monthly close (invoiced, paid and owed per
client; cost to run each engagement; commission due; pipeline and conversion) and the
quarterly estate audit, on phone, dashboard, Google and terminal, through one dashboard with
three roles (Jamie, salesman, client), so that Jamie never opens a repo to know what to do
today, and a deadline inside seven days, a drifted repo or a failed release reaches him
unprompted.

## Sell (5)

**S1 · Prospecting** produces a target profile, researched target lists, outreach drafts in
the prospect's language, and a follow-up cadence, so that salesmen can work the pool from the
dashboard (update status and notes, add prospects, mark one "ready for Jamie", see the pitch
and every prospect, and follow a handed-off deal to signature) and each closed deal records
who sourced it and the commission owed.

**S2 · Client research** produces a prospect profile and an industry primer so that Jamie
enters the first call knowing the client's trade and the proposal speaks their language.

**S3 · Proposal** produces the client-facing offer (problem, approach, scope, timeline) in the
client's language, as branded PDF, Google Doc in their Drive folder, and a page in the
dashboard, so that a client can say yes to a document they understand without a second call.

**S4 · Quote** produces the price, options and payment terms; the engagement's own economics
(hours, model cost, hosting, margin); a private negotiation record (positions, concessions,
a floor); and every invoice the agreement calls for, as branded PDF, so that Jamie quotes
informed by the last deal, never goes below his floor, and sends an invoice he did not write
by hand.

**S5 · Agreement** produces the signable contract from the accepted proposal and quote, in
the client's language, so that signature happens on a document that restates nothing and
the folder holds exactly what was agreed.

## Deliver (4)

**D1 · Onboarding and kickoff** produces the access table, the kickoff note, and the client's
repo adopted at its tier, so that a signed client's build starts within days with nothing
forgotten and nothing asked twice.

**D2 · SDLC pipeline** produces a build from ticket to release, sized by tier (site · app ·
platform), with live status the client can read at any time and a UAT environment they sign
off before release, so that every build runs the same way at the right weight and the client
is never in the dark. The pipeline is defined from what a build must produce, not inherited
from sustentus.

**D3 · Handover and support** produces the handover pack, a walkthrough, the support and
hosting record (who hosts what, what Jamie is on the hook for, monthly cost), a retainer or
follow-on offer at a set point after release, and the review and case-study request, so that
the relationship continues after the build and the portfolio grows from it.

**D4 · Estate conformance** produces a report that every live repo matches its tier's
template and carries only the Claude assets it uses, and that every dormant repo is archived,
secret-free and named, so that the estate is in order and drift is known before it costs
anything.

## Operator (4)

**O1 · Tool and concept research** produces a dated verdict per tool (adopt · watch · decline,
with a recheck date), a "could build for a client" catalogue tied to the services list,
industry primers, and a concept library of reusable explainers, so that Jamie decides on a
tool once, offers gain new ideas, and proposals and training reuse the same explanations.

**O2 · Case studies and portfolio** produces a case study per finished build and a current
portfolio index so that every proposal cites real work and every training example is true.

**O3 · Content** produces site copy and posts drawn from case studies, research verdicts and
the concept library, so that the business is visible for the work it actually did.

**O4 · Training and coaching** produces a workshop kit (deliverable in a day), a client ICM
workspace scaffolded from a template, a coaching record per client, and course material, so
that the training line is delivered from material rather than improvised, and a client can
leave with their own factory.

## Boundaries every goal inherits

- **Without asking,** a session may read email, calendar and Drive; draft any reply or
  document into the folder; commit words straight to main; create calendar events; place
  files in Drive.
- **Never,** even if asked in the moment: send anything to a client; merge or release;
  advance a stage or tick a gate; spend money or sign.
- **Unattended** runs are limited to the estate drift check, the deadline and next-action
  sweep, and the research recheck; each produces lines for the next morning's glance.
- **Never in git:** credentials and identity documents. Client words, negotiation positions
  and contact details may live in the private repo.
- **Every module runs from anywhere.** No module depends on the local disk; repos are
  reached from a cloud session too.
- **Every module starts cold** from its own folder, with no memory of how it works.
- **Client-facing documents** are in the client's language; internal notes stay in English.
- **A rule carries its own why and date.** There is no decision register; a rule without a
  why is deleted.
- **Gates are human. Never build an orchestrator. One home per fact. CI is truth.**

## Not carried from Apps

Dropped: OpenCode twins · DB branch-per-PR machinery · `.icm/docs` directives and
verifications · the D1–D63 register · the free look and paid diagnostic as stages (only
"straight to proposal" has ever landed work) · threads as a module with WIP limits and
ceremony · per-repo asset sprawl · the 45 sustentus-derived pipeline scripts · the 12 adopted
deal folders (the core starts empty).

Mined as reference, not copied: the six contracts, the knowledge layer, the seven skills, the
PDF render stack, the economics roll-up, the dashboard.

## Sequencing

**Wave 1:** C1 shared core · C2 client folder · D2 SDLC · D4 conformance.
Waves 2 and 3 are not yet decided; the 90-day success signals below need the sell chain
(S2–S5) and prospecting with dashboard roles (S1, C3) to land inside the window.

## In 90 days

**Worked if:** one real lead walked research → proposal → quote → agreement → kickoff inside
the new folders with no Apps · a salesman is working prospects from the dashboard and has
handed one over as ready · a build shipped through the new SDLC with the client watching
live status and signing off UAT · a workshop was delivered from the kit.

**Failed if:** a real task is still easier in Apps · a module has a contract but has never
produced its artefact for a real client · a folder is not enough to start a module cold ·
the dashboard or morning glance shows state that does not match the folders.

## Tensions to resolve during the build (not goals)

1. "Every module runs from anywhere" vs. `projects/` gitignored and on disk today: SDLC and
   conformance must reach repos through their remotes.
2. Salesmen write prospect state through the dashboard, and the folder is the record: the
   dashboard commits to git on their behalf. Under whose identity, and how is a conflict
   with a session's commit handled?
3. Wave 1 is delivery-first, but three of four success signals are sell-side. Waves 2 and 3
   have roughly eight weeks.
4. No money module. Invoices are produced by Quote, paid status is recorded by hand in the
   folder, and the monthly close reads folders. The client sees invoices in the dashboard,
   so invoice facts must be structured, not prose.
5. Monthly close shows cost to run each engagement, which needs hours and model spend
   recorded per engagement by something.
