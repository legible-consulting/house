---
tool: Jev (TypeSafe)
kind: service
verdict: watch
tier: deep
use: [build]
tags: [llm, api, cost]
recheck: 2027-04-30
source: https://thenewstack.io/typesafe-jev-system-one/
shared: https://www.facebook.com/share/r/1Kkw3pH8Ka/
via: Wassim younes AI
date: 2026-10-30
---

# Jev (TypeSafe)

A text-only model from TypeSafe that returns typed decisions, not prose: a yes/no probability, one option from a list, or a place on a scale, each with its probability. TypeSafe's CEO is Diogo Almeida, ex-OpenAI. TypeSafe trains it with a method it calls Reinforcement Learning for Calibrated Decisions (RLCD) and claims calls of about 100 ms, input at $0.042 per million tokens and free output. It is in early access, and it is on Vercel's AI Gateway and Cloudflare Workers AI.

## Verdict: watch

Watch (why: the line AI & non-AI automation (`core/services.md`) puts "a model where it earns its place, plain code where it does not", and a typed decision with a probability inside ordinary code is that rule as a product; Vercel, where the house deploys (`core/stack.md`), already serves it; but every number is TypeSafe's own, no independent benchmark on text classification exists yet, and a client build would bind one judgement to one young vendor · 2026-10-30). `verdicts/jev-ultrafast.md` is a browser agent built on it.

## What would change it

- An independent benchmark on text classification, or a client step where the house measures it against a small Claude call on the client's own examples.
- General availability with published prices and a data-processing agreement for EU clients.

## How the house would use it

- The moment: a build under AI & non-AI automation, at the ticket where code needs one judgement on text: route a mail, sort a request, flag a form.
- The step: one call through the Vercel AI Gateway, with a threshold below which the item goes to a person.
- What it adds: a cheaper and faster judgement than a chat model, with a probability the code can gate on. It replaces a prompt that asks a chat model for JSON.

## To try

https://vercel.com/ai-gateway with the model Jev, on 50 labelled examples from one client step. A good result: accuracy at or above a small Claude model on the same examples, and the items under the threshold are the ones a person would also hesitate on.

## Source

https://thenewstack.io/typesafe-jev-system-one/ · fetched 2026-10-30 · "TypeSafe launched Jev because sequential LLMs are \"totally useless for computers\"". Found by search: the reel names Jev and RLCD without a link. Caption read with yt-dlp 2026.10.26. The caption says "Comment FREE and I'll send it"; that is not information.
