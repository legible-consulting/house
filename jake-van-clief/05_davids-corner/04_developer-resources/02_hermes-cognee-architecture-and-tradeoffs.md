# Hermes + Cognee: Architecture and Tradeoffs

*David's Corner › Developer Resources · Author: David's Corner (author not stated; community experiment inspired by ICM) · Source: Skool video plus text · Length: 1:43*

## Summary

A short overview of a self-hosted always-on agent stack: an agent engine with built-in tools, a memory layer combining vector search and a knowledge graph, a cloud server to host it, and a tunnel as the secure entry point. The video presents a self-improvement loop (record, analyse failures, patch a skill, test) and says the agent chats through messaging apps and wants a large context window. The page adds the cautions the video skips: a tunnel alone does not make a hostname private, "self-hosted" can still send prompts to hosted models, and a saved skill does not prove improvement.

## Core concepts

- **Four components:** agent, memory, host, access path.
- **Data-flow map:** list agent, memory store, model and embedding endpoints, logs, backups and messaging; privacy depends on the whole configuration.
- **Test with synthetic notes:** distinctive fact, fresh session, corrected note, unauthorised access check.
- **Operate before relying on it:** document cost, updates and restore.

## Claims and evidence

- The agent "learns and remembers" and improves itself — video claim; the page treats this as something to test, so unverified.
- Over 40 built-in tools and a 64,000-token minimum context — video figures; not checked here.

## Key moments

Captions carry one-minute markers only, so times are coarse.

- [0:00] Framing: an assistant that forgets what you taught it, and the proposed stack as the answer.
- [0:00] Four parts introduced: engine, memory, host, secure entry.
- [0:00] Memory layer described as vector search plus a knowledge graph.
- [1:00] The four-step self-improvement loop.
- [1:00] Context-size needs and chatting with the agent from messaging apps.
- [1:00] Closing question: what would you teach an AI that evolves?

## Apply to icm-workshop

- Mostly reject for now: "every module starts cold" and "one home per fact" prefer files over a memory service, and Hermes would add hosting to maintain. Record an O1 watch verdict with a recheck date.
- Reuse the data-flow map and synthetic-note test as a D3 hosting-record template and D4 estate check.
- The unattended-run boundary (only three sweeps) means a self-modifying skill loop would conflict with the goals.

## Open questions

- Costs and restore steps from the four attached resources, which the page lists but this note did not read.
