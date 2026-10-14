# Hermes: 100 Tips, One Grid, Transcribed

*David's Corner › Hermes Resources · Author: David's Corner (author not stated; tips credited to @witcher, also @HERMESWATCHER) · Source: text lesson*

## Summary

A poster turned an infographic of 100 numbered operating tips for the Hermes personal-agent platform into plain text, grouped under nine headings. The tips are one person's field notes from running the agent daily, each tied to a snag he actually met. The page's own contribution is a short reading guide: the numbers record the order the tips were published in, not their importance, so the useful signal is how many tips each theme received. The learner walks away knowing which themes recur in real agent operation (cost, memory, safety, background work) and how to read a tip list without mistaking sequence for rank. This note summarises the themes and does not reproduce the list.

## Core concepts

- **Numbers are sequence, not priority:** the grid was sorted by theme after the fact, so tip #01 is not the "most important" one. The page backs this with three observations about ascending order inside each card, early tips spanning most themes, and later tips arriving in topic batches.
- **Frequency is the ranking:** model choice and cost control has the most tips (17), followed by background automation (15), maintenance and recovery (12), then memory and skills (11 each). That spread shows where the author found the payoff.
- **Three eras in the numbering:** roughly the first two dozen are setup basics, the long middle is a deep-dive era, and the last stretch is polish for experienced users.
- **Context does not travel by itself:** several tips repeat one lesson. Scheduled jobs, parallel workers and background sessions start without the chat that created them, so each needs its goals, sources, folder and finish criteria written into the prompt.
- **Cost is a configuration problem:** the tips treat spend as something to tune through fallback order, cheaper helper models for summaries and compaction, trimming unused tool definitions, and watching usage reports, rather than as a fixed bill.
- **Guardrails around autonomy:** approval before the agent saves what it learns, limits on repeated denied commands, loop detection, and reviewable allowlists all keep a human deciding what the agent may do.
- **Separate files for separate kinds of instruction:** identity, user facts, memories and project rules live in different places, and a higher-priority file can quietly override another.

## Frameworks and methods

The page offers one reading method:

1. Ignore tip numbers when judging importance.
2. Count tips per theme to see where effort concentrates.
3. Read the numbering as a rough curriculum: set up the basics first, then cost and memory, then refinements.

## Tools, settings and resources

- **Hermes** — personal agent platform covering terminal chat, messaging gateways, profiles, scheduled jobs, skills, memory, local models and computer use — the poster says he runs it; the page does not date versions, and the tips were not checked here.
- **The original infographic and the @witcher posts** — the source of all tips; the page credits them fully and says wording was transcribed from an image, with one uncertain handle in the footer.

## Claims and evidence

- Frequency of tips shows where the payoff lies — the page's inference from category counts; plausible but an interpretation, not a measurement.
- Numbers reflect publication order, not importance — argued from three patterns in the numbering; reasonable, unconfirmed by the author.
- Each tip records a failure the author genuinely hit — poster's characterisation; not verifiable here.

## Apply to icm-workshop

- **O1 tool research:** record Hermes as a dated watch verdict, consistent with the earlier Hermes and Cognee note. This page is a practitioner tip sheet, not an evaluation, so use it as evidence of operating burden (cost tuning, memory upkeep, backups) before any adopt decision.
- **Every module starts cold, and unattended runs:** the "background work gets no chat history" theme supports the stage Inputs rule. Adopt as a check on the three sanctioned unattended sweeps: each prompt must name its own sources, folder and completion criteria.
- **Gates are human:** adapt the approval-gate and denied-command-cap ideas as wording for rules in D4 conformance, noting a gate is only real if the runner enforces it. Reject any tip that lets the agent approve its own saves.
- **C3 and S4 economics:** the usage-review and cost-trimming themes echo the goals' need to record hours and model spend per engagement. Adapt the idea of a periodic usage report as one input to the monthly close.
- Otherwise weak: most tips are Hermes-specific settings with no place in the shared core.

## Open questions

- Do the tips still apply to the current Hermes release, given the page carries no dates?
- Is there a comparable tip list for the tools already in use that would feed an O1 verdict?
