---
title: "Goal questions — what the rebuilt system must produce"
kind: scratch
status: superseded — answered in 00-goal-interview-answers.md, goals in 01-goals.md
owner: jamie
date: 2026-10-13
---

# Goal questions — what the rebuilt system must produce

*Written 2026-10-13 after reading `~/Apps` (icm-board): `AGENTS.md`, `CONTEXT.md`,
`_system/README.md`, `RULES.md`, `AUDIT.md`, the six contracts, the knowledge layer, the
four workspaces and their stage contracts, `deals/README.md`, the seven skills, the template
tree, the register (D1–D63, open questions), the 2026-09-29 brainstorm (Q1–Q77) and the
2026-10-05 restructure brief, plus the ICM paper. Answer inline under each question. ★ marks
the ones that most shape the goals list. Goals are outcomes — what the system produces or
lets you do — never how.*

## A · The frame

1. ★ Is icm-workshop the **successor** to icm-board (Apps retires when it is proven), a
   **parallel** system that migrates piece by piece, or a **clean design** whose goals are
   then applied back into Apps in place?
2. ★ What is the one-sentence job of the rebuilt system — the sentence a stranger reads and
   knows what it is for? (Apps says: "the business's processes and knowledge live here,
   versioned and improvable, so no deal reinvents them; the estate stays conformant.")
3. Who reads it besides you — a future subcontractor, a client walking their own deal, a
   workshop attendee learning ICM from it, nobody? Does a client ever see any folder?
4. ★ What is the horizon the goals are written for — the next 90 days, the next year, "the
   business at twice its size"?
5. Apps carries 63 numbered decisions and 8 rules. Do the Oct-5 rulings (D49–D63: record in
   `DEAL.md` frontmatter, threads + Friday review, `quote.yaml`, one document pipeline,
   manual invoices, no Copier, Claude only, radar, docs lifecycle, Google as the desk) carry
   forward **as a block**, or is each one re-opened by the goals?
6. Which **house rules** are non-negotiable outcomes of the new system (never an
   orchestrator · gates are human · one home per fact · CI is truth · no secrets · adopt
   never fabricate · words straight to main)? Any you would drop or soften?

## B · The shape of a goal

7. ★ Apps' register states its outcome as "a lead can be taken from first contact to a
   running project by walking folders anyone could read; a repo can be adopted, analysed
   and ticketed without anyone remembering how; and both say so when they drift." Is that
   the register you want every goal written in — *someone can do X by walking folders, and
   the system says so when it drifts* — or a different one?
8. Should every goal carry its own "how would I know" line (observable from the folders or
   the desk), or does a goal stand on the outcome sentence alone?
9. How many top-level goals is the right number before the list is a lie — 5, 10, 20?
10. Do goals nest (a goal per workspace, sub-goals per stage) or stay flat?

## C · The client relationship — one story

11. ★ Every one of the 12 deal folders in Apps is `source: adopted`; no deal has yet entered
    at intake and walked to kickoff. What must be true of the rebuilt system for the **next
    real lead** to walk the whole story inside it, and for you to trust it on the first run?
12. ★ List the moments in a relationship where you want a *produced artefact* in hand
    (today: the reply, the look, the quote, the offer, the agreement, the onboarding table,
    the kickoff note, the handover). Which are missing — a check-in note during the build,
    an invoice, a review request, a case study, a renewal offer?
13. Which of today's stages do you want **to keep as-is**, **merge**, **split**, or
    **drop** — 01_intake · 02_look · 03_offer · 04_agreement · 05_onboarding ·
    06_kickoff · 07_handover?
14. ★ What should exist for the relationship **after** handover — support, hosting,
    retainers, follow-on engagements, the "past" client who comes back? Today that span
    has no stage and no artefacts.
15. What does the free look, the diagnostic, and the offer each need to **produce** for
    the client, in one line each? Which of those three formats has actually worked?
16. Negotiation: today it is `private/negotiation.md` with no stage. What do you want to be
    able to see about a negotiation — positions, concessions, what comparable deals
    settled at, a floor you never go below?
17. What should the system be able to tell you about **all** relationships at once — every
    quote expiring, every chase older than a week, everyone waiting on you, money owed?
    Which of those views matter enough to be a goal?
18. Languages: deals run in en/fr/pt/en-pt. Is "every client-facing artefact in the
    client's language, from the same source" a goal, or a per-deal convenience?
19. What may the client's own words and documents (emails, transcripts, forms, media) end
    up as in the system — filed, summarised, or never stored?
20. Inbound vs outbound: is outbound prospecting (target profile, outreach, cadence,
    `prospect`/`nurture` in Neon) something the rebuilt system must *produce* work for, or
    does it stay in the dashboard and out of scope?

## D · Money

21. ★ What do you want to be able to answer about money without opening Revolut —
    what is invoiced, what is paid, what is overdue, what each engagement cost you to run,
    what the month looks like, what the year looks like?
22. Is "every engagement knows its own economics (price, hours, model cost, margin)" a goal?
    `run-economics.sh` exists in Apps; has it ever changed a quote?
23. Barter, equity, free and partnership deals: what must the system record and produce for
    them that a cash deal does not (a term sheet, a revenue-share ledger, a review date)?

## E · Research, decisions and open loops

24. ★ Threads (open loops, WIP 3, Friday review) are "unproven until two reviews have run."
    Has a review happened? What do you want the *outcome* of carrying an open loop to be —
    a decision on record, a stub cut, a thread closed with a reason — and in what rhythm?
25. `.icm/docs/` in Apps holds 23+ directives, verification reports and brainstorms with
    no ritual reading them. Should "every directive produces a verification, and both are
    findable by what they changed" be a goal, or should that genre disappear?
26. The register (`project.md`, D1–D63) is the decision memory. Is "every decision findable
    by the rule it produced, and every rule traceable to its decision" a goal you want
    stated, or is it already good enough?
27. Radar (tools looked at, dated verdicts): what should it produce for you — a shortlist
    you act on, a "could build for a client" catalogue, a reason to decline a tool?
28. Research for a client's industry before a quote — a primer with a teach-back. Is that
    a goal of the business (you learn every client's trade) or an optional thread?
29. Template-improvement ideas (new skills, new rituals): where should they land, and what
    is the outcome — proven on one repo, then everywhere; or decided and recorded first?

## F · The estate — repos, template, delivery

30. ★ 33 repos on disk: 8 pipeline, 1 active without pipeline, 24 dormant. What does
    "the estate is in order" mean as an outcome — every repo conformant, or only the live
    ones, with dormant ones merely safe (no secrets, archived, named)?
31. ★ The per-repo pipeline (4 stages, 6 lanes, ~45 scripts, 3 capability skills, `/setup`,
    `/pipeline`) was extracted from sustentus. Is "a client build runs through one
    repeatable pipeline from ticket to release" still the goal, and what is the smallest
    outcome you would accept for a one-page site versus sustentus?
32. What does the delivery of a build **produce** for the client at the end — a handover
    pack, a walkthrough, access, a status page, a support line? Which exist today and
    which never have?
33. Template drift: today `icm-check.sh` reports and `icm-sync.sh` repairs per repo, by
    hand. What outcome do you want — "every live repo on the current template within a
    week of a change", "drift visible on the phone", or "sync is rare and deliberate"?
34. Tickets: scopes, stubs, triage, positional status, read by the dashboard. Keep that
    whole model? What should "the board" let you see or do that it cannot now?
35. Should the client ever see their own project's status (D31's client status report, a
    UAT environment)? Is "a client can always see where their build stands" a goal?
36. `.claude/` assets per repo: sustentus carries 35 skills. Is "every repo carries exactly
    the assets it needs and nothing stale" a goal, or is per-repo sprawl acceptable?
37. Cloud vs machine: half the estate is invisible to a cloud session. Is "every goal
    achievable from a phone or a cloud session" a requirement, or is the machine fine?

## G · Knowledge — what the business knows

38. ★ The knowledge layer is positioning · services · pricing · voice · terms · stack. Which
    files have actually been read by a real deal, which still carry "not yet established"?
    What knowledge is missing — case studies, a portfolio of past builds, industry
    primers, a glossary, your own CV/bio?
39. Is "no artefact ever restates a fact that lives in knowledge" (one home per fact,
    applied to prose) an outcome you want checked, or an ideal?
40. Should the knowledge layer be **teachable** — the same material that trains a client
    in ICM (D63) and configures your own factory — or are those two different libraries?

## H · The operator's desk — where you look from

41. ★ Where do you actually look at the business day to day — phone, dashboard, terminal,
    Google Calendar, Gmail? Which of those should be able to show the **whole state**
    without opening a repo?
42. The dashboard (jamienisbet) reads deal folders and tickets, and writes `DEAL.md`. Is it
    a goal that the dashboard is a full desk (next actions, deadlines, money, threads), or
    a thin viewer you could lose?
43. Calendar reminders from `deadlines[]`, PDFs to Drive, Gmail read-only, Tasks parked.
    Which Google surfaces are required outcomes, and which were conveniences?
44. ★ Rhythms: `/day` died; `/week` is new. Name the rhythms you will actually keep (a
    morning glance, a Friday review, a monthly close, a quarterly estate audit) and what
    each must put in front of you in under a minute.
45. Notifications: what should reach you unprompted — a deadline within 7 days, an unpaid
    invoice, a drifted repo, a failed release — and by which channel?

## I · Automation boundary and trust

46. ★ Finish the sentences: *A session may, without asking me, …* · *A session may, after
    asking, …* · *A session may never …* (read email · draft a reply · create a calendar
    event · place a file in Drive · commit words · open a PR · merge · send anything).
47. What may run **unattended** (a scheduled read, a nightly report, a drift check), and
    what must that produce for you the next morning?
48. What may never enter git, even in a private repo — client email text, phone numbers,
    negotiation positions, your own admin?
49. Cost: is "the system's own running cost is visible per engagement and per month" a goal?

## J · Consistency and ease — what "easier" means

50. ★ Name three things that are hard today that must be easy in the rebuilt system (e.g.
    "finding where a deal stands", "knowing what to do next", "adopting a repo",
    "changing a template file everywhere").
51. ★ What has been built in Apps that you want to **stop maintaining** — OpenCode twins,
    the render stack, the MongoDB/Neon branching machinery, the economics roll-up, the
    radar, the estate scripts — and what must survive?
52. The AUDIT names the consistent failure: "aspirational docs richer than the running
    system." Is "every contract describes something that has run at least once" a goal
    you want enforced, and what should happen to a contract that has never run?
53. Size budgets (Layer 0 ≤ 90 lines, contracts ≤ 80, references ≤ 200): keep them as
    outcomes, loosen them, or drop them?
54. Vocabulary: rung · engagement · stage · lane · scope · stub · thread · run · radar.
    Which words are right, which have confused you, which are missing?
55. One entry point per workspace (`/client`, `/week`, `/icm-check`, `/radar`, `/setup`):
    is "one command per thing I do, and every command idempotent" a goal, or would you
    rather have fewer or no commands?

## K · Services beyond the build

56. ★ D63 made AI training and coaching a permanent service (workshops on ICM, one-to-one
    coaching). What must the system produce for that line — a course, a workshop kit, a
    client workspace template, a coaching record per client?
57. Does a training client walk the same sell → start story as a build client, or a
    different one? Does a coaching engagement have stages at all?
58. Is building an ICM workspace **for** a client (their own folders, their own factory) a
    deliverable you want the system to produce repeatably?

## L · The training and reference material you will add

59. What is going into `jake-van-clief/` and beside it — the ICM paper, Jake's
    workspaces, the workspace-builder, course material, your own notes? Which of it is
    Layer 3 for the rebuild (rules to internalise) and which is example only?
60. Should the rebuilt system itself be built **by** an ICM workspace (the paper's
    workspace-builder: discovery → stage mapping → scaffolding → questionnaire →
    validation), so the build is one more walk through folders?

## M · Success

61. ★ In 90 days, what would tell you this worked — a deal walked end to end, a repo adopted
    in an hour, a Friday review kept six weeks running, a month closed without opening a
    spreadsheet, a workshop delivered from the material?
62. What would tell you it failed, and should be torn down?
