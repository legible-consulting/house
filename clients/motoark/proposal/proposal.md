---
title: "MotoArk, from version one to version two"
kind: proposal
client: motoark
language: en-GB
date: 2026-10-30
valid_until: 2026-11-13
status: draft
---

<!-- Cover. Full logo. The eyebrow is mono; the rest is Hanken Grotesk (core/voice.md). -->

PROPOSAL

# MotoArk, from version one to version two

A three-month engineering retainer with Jamie Nisbet

Prepared for Sam Cherry, COO and CTO, MotoArk · 30 October 2026 · This proposal holds until 13 November 2026

---

## The problem

Everything in MotoArk's technology runs through you. If you were hit by a bus, as you put it,
MotoArk would not have a technology team. That is the risk you want gone.

Three things make it harder to fix than hiring another developer.

- **The build should run AI-first.** Someone who plans, builds, tests and ships with agents
  from the start, not someone who writes the code by hand and asks an AI to test it at the end.
- **When an agentic build goes wrong, it goes wrong badly.** You called it the 2 percent. The
  agents do not get you out of it. You want someone beside you who reads the code the old way
  and can stop, clean and fix, so that you are not the one who has to.
- **Version two needs AI in the product.** A buyer or a seller who messages in English, Hindi
  or Arabic should get an answer like the one the trader down the road would give, and MotoArk
  should learn from every one of those conversations.

You asked for a senior engineer on the bench beside you for three months, who takes MotoArk
from version one to version two and could run the engineering if you were not there. This is
my offer for those three months.

## The approach

I work with a method called the Interpretable Context Methodology, ICM for short. You saw it
run on our call on 23 October: the desk, the tickets and a pull request with its gates. In your
monorepo it means five things.

- **The repository holds the brain, not a person.** Each area of the code carries a short
  contract: what goes in, what the work is, what comes out, and where a person decides. A
  developer or an AI session starts from that contract and nothing else. That is the bus test,
  answered in the repository.
- **No lock-in to one model.** The routing file at the root is read first by every harness. A
  model swap is a file change, so you can keep sending images to Gemini and light work to
  cheaper models.
- **Tickets live in the repository.** Your version two backlog is cut into epics and tickets
  in one folder. A ticket's folder is its status. There is no second list to keep in step.
- **One ticket, one branch, one pull request.** Branch, build, tests, a preview you can click
  through, your sign-off, merge. The merge is the release. The checks on the pull request are
  the only verdict. Nothing is checked only on someone's laptop.
- **Agents do the work. People hold the gates.** A person reads the problem, the proposed
  change and the acceptance criteria before an agent builds. That is where the 2 percent is
  caught: at the spec, not 15 pull requests later. When something still breaks, I am the one
  who stops, cleans and fixes. Your rule from the pack, the AI suggests and a person decides,
  is mine too.

You stay the designer and the customer. I turn your designs and your decisions into shipped
software, and I make the two developers faster rather than replacing them.

What you get each month:

- The release cycle, run: tickets planned, built, reviewed, previewed and merged.
- A short written scope at the start of the month, and a checkpoint at its end: what landed,
  what did not and why, and what comes next. Progress is measured against that scope, not in
  hours.
- A weekly 30-minute planning call with you. Everything else happens in the repository. You
  care about repos and outputs, not nine to five. So do I.
- Review and guidance for the two developers. Their pull requests go through the same loop,
  and they learn the method by working inside it.
- Access to everything I do. No private tooling, no step that only I can run.

## The scope of the three months

### In

**Month 1: the development flow.**

- Read the monorepo, the design files and what runs today. Write down what I find. What
  exists decides how much of the month is new. I will not know until I have read the code.
- Start from the DevOps flow, the test scripts and the guardrails you put in the week of 26 October,
  and from your notes on how you decided each piece.
- Contracts in the monorepo: a routing file at the root and a contract per area.
- The ticket folder, with the version two backlog cut into epics and tickets, with you.
- Checks on every pull request. Tests where the money moves: checkout, commission, payouts.
  A preview per change. Release by merge.
- By the end of the month, the release cycle runs this way for you, me and the two developers.

**Months 2 and 3: toward version two.**

- The assistant: a message-style way to find and order a part, in English, Hindi and Arabic,
  over the catalogue search version one already has. The buyer side first. The seller side,
  listing a part by message and photo, once the buyer side has landed.
- Every version two feature through the same loop, from your design to a merged release.
- What buyers ask for and do not find, recorded from the first day the assistant runs.
- Hardening as we go: an error tracker, a fail-safe page, and fixes to what the loop surfaces.

### Out

- Field operations, and tooling for the field team, unless we ticket it inside a month's
  written scope.
- Contracts with carriers, payment and buy-now-pay-later providers. I integrate what you sign.
- Content and translations: product text, and the assistant's wording in Hindi and Arabic.
- Hosting, third-party services and licences. They stay in MotoArk's name and on its bill.
- Managing the two developers as their employer. You stay their lead.
- Cross-border triage and new markets. Version two first.
- A rebuild of the stack. I work in what you have. If I think a part should change, I write
  the case and you decide.

## The timeline

| When | What |
|---|---|
| By Fri 13 Nov 2026 | Your decision. This proposal holds until then. |
| On your yes | The agreement and the first invoice. I need access to the monorepo, the design files and the environments. |
| Mon 16 Nov 2026 | Start, or the Monday after the first invoice is paid and access is in. |
| Fri 11 Dec 2026 | Checkpoint 1. The development flow runs. The month 2 scope is written. |
| Fri 15 Jan 2027 | Checkpoint 2, after the holidays. The month 3 scope is written. |
| Fri 12 Feb 2027 | Checkpoint 3, and the decision point. |

If the start moves, every date after it moves by the same number of days.

## What happens after

At the end of month 3 we both decide, as you put it, whether the relationship works.

- **Continue.** The retainer carries on month by month against a written monthly scope. By then
  I will have closed off other work and can give MotoArk more of my time.
- **Change the shape.** If you want the stand-in CTO to be a position rather than a retainer,
  we agree that on its own terms.
- **Stop.** Either side gives 30 days' written notice. The method is in the repository, so your
  developers carry on without me. That is the point of it.

Whatever we decide, what I build is in your repositories and is yours.

## What it costs

There are two ways to pay for the same three months. Both are in the last section of this
document.

<!-- the quote renders clients/motoark/quote/quote.md here. The number has one home: that file. -->
