# 🧱Tokens, Deepseek, & Managing Context

*THE LEGENDS › Don Roy – Master Builder · Author: Don Roy · Source: Skool text answer plus video (transcript on disk) · Length: about 12:13 · Link: https://youtu.be/XSqmQ-sLPzU*

## Summary

Don answers a member who spent about $350 in three weeks setting up ICM in Codex with automatic reload on, and who wanted to switch to DeepSeek to save money. His view: the real problem was that auto-reload removed the cost signal that teaches you what expensive feels like, and that a model swap is the wrong first fix. He explains the two billing routes (plan allowance versus API pay-per-token), what "local DeepSeek" realistically means, and how to find expensive sessions from billing dashboards and session logs. The practical takeaways are short single-task sessions, lowest sufficient model, and planning in one session before building in another. The page carries a dated correction note.

## Core concepts

- **Auto top-off hides the signal:** hitting a limit is feedback; reload settings remove it. Turn them off or cap them first.
- **Two billing routes:** subscription with rolling windows and weekly caps versus API billing per input and output with no natural ceiling. Know which you are on before diagnosing.
- **Flagship vs local models:** flagship open models are far too large for personal hardware. The small downloadable versions are different, weaker models, so "local DeepSeek" usually means a capability drop; the hosted DeepSeek API is cheaper but still paid.
- **Cheaper is not always cheaper:** weaker models lose the thread on long tool-using work and need more attempts; good uses for local models are bulk, boring work (summaries, reformatting, transcription).
- **Context is the cost gauge:** every message reloads prior context, so long chats snowball. One task, one session, then fresh start, with handoffs or compaction.
- **Model tiering:** use the lowest model that does the job reliably; you can tell the agent to do so.

## Frameworks and methods

1. Check billing in every place (chat account and API platform) and find the few highest-spend days.
2. Match those days to local session logs, sorted by file size, and skim the largest.
3. Watch context status during work (a status command in Codex, a context command in Claude).
4. Adopt short sessions; plan in one session, hand a written plan to another.

## Tools, settings and resources

- **Session log folders** (.codex or .claude in the user directory) — evidence of what long sessions did.
- **Artificial Analysis** and **LMArena** — model quality versus cost comparison sites — as of the post (September 2026).
- **Reading note on the page (dated 26 Sep 2026):** corrects that context percentage is not a literal price multiplier, that a fresh session is not guaranteed cheaper, that billing records (not transcript size) establish cost, that "makes a repeat impossible" overstates caps, and that DeepSeek has distinct full and distilled models whose local feasibility depends on hardware.

## Claims and evidence

- A session at 80% context costs about eight times a 10% session per message — Don's rule of thumb — page note says this is not established cost; rates, caching and output matter.
- The $350 came mainly from long sessions with retries on a full context — Don's hypothesis, explicitly unconfirmed.
- Small local DeepSeek models are not R1 — consistent with the page's correction on distilled versions.

## Key moments

- [00:00] Framing: the question from the Back to Basics thread and who Don is.
- [01:49] Usage limits versus API billing; why knowing the route matters.
- [03:29] Always turn off or cap auto top-off and extra credits.
- [04:00] What DeepSeek really is and why most people only run cut-down versions.
- [06:04] Diagnosing usage: dashboards, then session logs sorted by size.
- [07:25] Context window as the thing to watch; status and context commands.
- [08:45] Use the lowest model that completes the task reliably.
- [09:22] Treat each chat as one task; start new chats instead of extending long ones.
- [10:24] Summary list: turn off reload, accept limits, autopsy, short sessions, plan separately.
- [11:22] Local models for bulk work, saving frontier usage for hard tasks.

## Apply to icm-workshop

- **C3 tension 5 (cost to run each engagement):** session logs are one plausible source for model spend per engagement; billing dashboards are the authority. Record route, model, usage and task per engagement as structured facts, in line with the page's "trace one expensive day" record.
- **Boundaries:** matches "never spend money" and "unattended runs are limited". No unattended job should run on a route with auto top-off; cap the account instead.
- **Every module starts cold:** one-task-one-session and the written plan handed to a fresh session is the same discipline as a stage that reads only its declared Inputs. See `01_the-foundation/02_build-it-around-your-work/03_one-model-different-jobs.md` for model tiering by job.
- **S4 and D3:** the model-cost line in the engagement's economics should come from billing records, not transcript size.

## Open questions

- Which of Jamie's accounts are on subscription versus API billing, and do any still have auto top-off enabled?
- Is there a stable way to attribute session-log usage to a client folder (C2) without reading transcripts?
