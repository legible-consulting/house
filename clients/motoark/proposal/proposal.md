---
title: "MotoArk, from version one to version two"
kind: proposal
client: motoark
language: en-GB
date: 2026-10-23
valid_until: 2026-11-05
status: draft
---

<!-- Cover. Full logo. The eyebrow is mono; the rest is Hanken Grotesk (core/voice.md). -->

PROPOSAL

# MotoArk, from version one to version two

A three-month engineering retainer with Jamie Nisbet

Prepared for Sam Cherry, COO and CTO, MotoArk · 23 October 2026 · This proposal holds until 5 November 2026

---

## The problem, in your words

Sam, on Wednesday you described MotoArk in a few sentences. I will keep to them.

You have brought MotoArk to version one with two developers and your own hands, from design
through to DevOps, on a burn of under 3,000 dollars a month. Five thousand garages in the UAE
are the buyers. Fifty people in the heat count and list the sellers' stock. Version one does
what it must: a catalogue, with search over the parts.

Three things are now true at once.

- Everything runs through you. If you were hit by a bus, as you put it, MotoArk would not have
  a technology team. That is the risk you want gone.
- Version two needs AI in the product, not only in the build. A buyer or a seller who messages
  in Hindi, Arabic or English should get an answer like the one the trader down the road would
  give, and MotoArk should learn from every one of those conversations.
- You want the build itself to run AI-first. Someone who plans, builds, tests and ships with
  agents from the start, and not someone who writes the code by hand and asks an AI to test it
  at the end.

On Friday you added one more. When an agentic build goes wrong, it goes wrong badly, and the
agents do not get you out of it. You want someone beside you who reads the code the old way and
can stop, clean and fix, so that you are not the one who has to.

You asked for a senior engineer who works on the bench beside you for three months, takes
MotoArk from version one to version two, and could run the engineering if you were not there.
This is my offer for those three months.

## The approach

I am one engineer, and I work with a method called the Interpretable Context Methodology, ICM
for short. It is how I run several products at once, and how a repository stays readable to
the next person who opens it. In your repositories it means five things.

- **The folder tree is the plan.** Each area of the code carries a short contract: what goes
  in, what the work is, what comes out, and where a person decides. A developer or an AI
  session starts from that contract, reads only what it names, and starts cold. Nothing lives
  only in someone's head. That is the bus test, answered in the repository rather than in a
  person. The routing file at the root is read first by every harness, so the method is not
  tied to one model or one vendor. A model swap is a file change.
- **Tickets live in the repository.** Your version two backlog is cut into epics and tickets,
  in one folder. A ticket's folder is its status. There is no second list to keep in step.
- **One ticket, one branch, one pull request.** Every change runs the same loop: branch, build,
  tests, a preview environment you can click through, your sign-off, merge. The merge is the
  release. The checks that run on the pull request are the only verdict on whether a change is
  good. Nothing is checked only on someone's laptop.
- **Agents do the work. People hold the gates.** I run many sessions in parallel on tickets.
  You and I review what lands. Nothing reaches buyers or sellers without a person's yes. Your
  rule from the pack, the AI suggests and a person decides, is mine too.
- **You stay the designer and the customer.** You know how MotoArk has to work. I turn your
  designs and your decisions into shipped software, and I make the two developers faster
  rather than replacing them.

What you get each month:

- The release cycle, run: tickets planned, built, reviewed, previewed and merged, at your
  cadence.
- A short written scope at the start of the month, and a checkpoint at its end: what landed,
  what did not and why, and what comes next.
- A weekly 30-minute planning call with you. Everything else happens in the repository. You
  said you care about repos and outputs, not nine to five. So do I.
- Review and guidance for the two developers. Their pull requests go through the same loop,
  and they learn the method by working inside it.
- Access to everything I do. No private tooling, no step that only I can run.

## The scope of the three months

### In

**Month 1: the development flow.**

- Read the repositories, the design files and what runs today. Write down what I find. What
  exists decides how much of the rest of this month is new. I will not know until I have read
  the code.
- You said you will put in the DevOps flow, the test scripts and the guardrails yourself next
  week. Write down how you decide each piece, not only what you did. Month 1 starts from that.
- Contracts in the monorepo: a routing file at the root and a contract per area, so that
  anyone, person or session, starts cold.
- The ticket folder, with the version two backlog cut into epics and tickets, with you.
- Checks on every pull request. Tests where the money moves: checkout, commission, payouts.
  A preview environment per change. Release by merge.
- The release cycle running the new way, with you and the two developers, by the end of the
  month.

**Months 2 and 3: toward version two.**

- The assistant: a message-style way to find and order a part, in English, Hindi and Arabic,
  over the catalogue search version one already has. The buyer side first. The seller side,
  listing a part by message and photo, next, once the buyer side has landed.
- Every version two feature through the same loop, from your design to a merged release.
- What buyers ask for and do not find, recorded, so that MotoArk learns demand from the first
  day the assistant runs.
- Hardening as we go: an error tracker, a fail-safe page, and fixes to what the loop surfaces.

### Out

- Field operations, and tooling for your fifty field workers, unless we ticket it together
  inside a month's written scope.
- Contracts and commercial terms with carriers, payment and buy-now-pay-later providers. I
  integrate what you sign.
- Content and translations: product text, and the assistant's wording in Hindi and Arabic.
  You bring them, or we scope them separately.
- Hosting, third-party services and licences. They stay in MotoArk's name and on MotoArk's
  bill.
- Managing the two developers as their employer. You stay their lead. I review their work and
  set the method.
- Cross-border triage and new markets. Version two first.
- A rebuild of the stack. I work in what you have. If I think a part should change, I write
  the case and you decide.

## The timeline

| When | What |
|---|---|
| Fri 23 Oct 2026 | Our follow-up call: the method, the desk and a pull request shown live, your questions. |
| Mon 26 Oct 2026 | Your decision. |
| On your yes | The agreement and the first invoice. I need access to the repositories, the design files and the environments. |
| Mon 9 Nov 2026 | Start, or the Monday after the first invoice is paid and access is in. |
| Fri 4 Dec 2026 | Checkpoint 1. The development flow runs. The month 2 scope is written. |
| Fri 8 Jan 2027 | Checkpoint 2, after the holidays. The month 3 scope is written. |
| Fri 5 Feb 2027 | Checkpoint 3, and the decision point. |

If the start moves, every date after it moves by the same number of days.

## What happens after

At the end of month 3 we both decide, as you put it, whether the relationship works. There are
three outcomes.

- **Continue.** The retainer carries on month by month, at the standard rate, against a
  written monthly scope. By then I will have closed off other work and can give MotoArk more
  of my time.
- **Change the shape.** If you want the stand-in CTO to be a position rather than a retainer,
  we agree that on its own terms.
- **Stop.** Either side gives 30 days' written notice. The repositories carry the method, so
  your developers carry on without me. That is the point of the method.

Whatever we decide, what I build is in your repositories and is yours.

## What it costs

The price and the terms are the last section of this document.

<!-- the quote renders clients/motoark/quote/quote.md here. The number has one home: that file. -->
