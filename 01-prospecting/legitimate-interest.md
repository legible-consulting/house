---
title: Legitimate interest assessment
kind: assessment
owner: jamie
date: 2026-10-26
law: "GDPR (Reg. (UE) 2016/679) · Lei 41/2004 as amended by Lei 46/2012 · CNPD Diretriz 2022/1"
---
# Legitimate interest assessment — cold outreach to businesses

**Controller:** Jamie Nisbet · Mafra, Portugal · software engineering / AI consulting
**Activity assessed:** contacting businesses in Portugal, Belgium and the United Kingdom that
have not asked to be contacted (`target-profile.md`), to offer the services in
`core/services.md`, from the desk's pool, by Jamie and by commission-only salesmen.
**Written:** 26 October 2026 · **Applies from:** before the next first touch.

> **Purpose.** This is the written record of *why* I believe I may contact a business that
> never asked me to, *how far* that goes, and *where it stops*. GDPR Art 6(1)(f) is only
> available to a controller who has actually done the balancing — this file is that
> balancing, done in advance and dated, so the answer exists before the first message
> rather than after the first complaint.
>
> **This is my own assessment, not legal advice.** Lines are marked **✅ confident** or
> **⚠️ needs confirmation**. The ⚠️s are the ones to put to a lawyer or the CNPD before
> volume goes up. Nothing here licenses anything the rules beside this file do not already
> require: `prospect.md`, `cadence.md`, `target-profile.md`, and the desk (`desk/CONTEXT.md`).

---

## 1. What is processed, and where it comes from

One row per business in the desk's pool: the `prospects` and `touches` tables in the Neon
project `legible-desk`, read and written through the desk at `desk.jamienisbet.com`. The
fields are the ones `prospect.md` names: the company, the contact's name and role, an email
or a phone number, the website, the country, the language, the line, the size, the service,
a deal-size hint, how the prospect was found, what they asked for, the touches (date,
channel, one line), notes, and the reason when a row is lost.

The sourcer adds the row by hand. The sourcer is Jamie or a salesman, from a referral, an
event, a shop front, a company's website or its public listing, or from a `targets/<list>.md`
a session researched from public sources: companies, not persons, one dated list per search,
each row with its source. `source` is required the moment the row is created.

- **No special-category data** (Art 9), no financial data, no data about anyone's private
  life. The deal-size hint is the sourcer's guess about the work, not a fact about the
  company's finances. ✅
- **No profiling with legal or similarly significant effect** (Art 22). `line`, `size`,
  `service` and `deal_size` are the sourcer's own entries. They order the sourcer's week and
  decide nothing about the business. ✅
- **Nothing is bought, scraped at scale, or enriched from a data broker.** A person compiles
  the pool from what the businesses published, or a session reads public pages one search
  at a time. No crawler, no paid list, no reviews API. ✅
- **No model reads a row.** The desk calls none and sends nothing. The draft for each touch
  is `pitch/<touch>.<language>.md` with the first name filled in. The sender adapts it in
  their own mailbox, and the adapted message is not stored. The touch log keeps the date,
  the channel and one line. ✅
- **A row the business created itself** is outside this assessment: the contact form on
  `jamienisbet.com` posts to the pool, and that person wrote to us (Art 6(1)(b), steps at
  the request of the data subject before a contract). ✅
- **Who sees a row.** Sign-in by Neon Auth, three roles. The sourcer and Jamie write a row.
  Every salesman reads the whole pool, so two never approach one company. A client sees no
  pool. Jamie sets each account's role. ✅
- **A salesman is independent, paid on commission, and sends from their own account**
  (`prospect.md`, The salesman's deal). Whether a salesman is my processor under Art 28,
  which needs a written contract, or acts on their own account as a controller, is
  **⚠️ needs confirmation** before a second salesman joins.

## 2. The three-part test

### 2.1 Purpose — is there a legitimate interest?

Yes: finding customers for a one-person consultancy. Recital 47 names direct marketing as a
possible legitimate interest in terms, and B2B prospecting for a professional service is its
least contentious form. The interest is mine, it is real, it is current, and it is lawful. ✅

### 2.2 Necessity — is contacting them necessary for it?

Yes, on this scale. I have no advertising budget and no inbound pipeline beyond word of
mouth and the site's contact form. The alternatives, paid ads or a broker's list, are either
not affordable or worse for the people in them. The data used is the minimum that makes a
message worth reading: who they are, where they are, their language, and the one thing about
their business the message is about. No field is collected because it might be useful later.
✅

### 2.3 Balancing — do their interests override mine?

The rights at stake are those of the **person who reads the message**, not of the company.
Weighing it honestly:

| Points toward me | Points toward them |
|---|---|
| Contact is at a **business, about their business**, through a channel they published for exactly this kind of enquiry | It is unsolicited: they did not ask, and every unsolicited message costs someone a minute |
| The data is **already public** and was published by them | They did not expect me specifically to keep it in a database |
| Volume is **tens, not tens of thousands**. A person writes each message in their own mailbox | An automated-feeling message would be worse than none |
| Every first message says **who I am, where I got their details, and how to stop it** | Without that line the processing would be invisible, which is the real harm |
| **One "no" ends it for the company**, on every channel, for good (§4) | A "no" that did not stick would be the whole objection |
| Cadence is **three touches over three weeks**, then the row is due for `lost` (`cadence.md`) | Repeated contact after silence tips from persistence into nuisance |

**Conclusion: the balance holds**, but it holds *because* of the controls in §3 to §5, not on
its own. If the volume rises, the messages stop being individually written, or the opt-out
stops being honoured, this assessment no longer covers the activity and has to be redone. ✅

## 3. Channels — the split that decides what I may do

GDPR gives the lawful basis for *holding and using* the data. **Lei 41/2004** (as amended by
Lei 46/2012) decides, separately, whether I may send an *unsolicited electronic
communication* at all, and it splits on who is behind the address:

- **A legal person** (an *Lda*, an *SA*) at a **role address** (`geral@`, `info@`), a
  switchboard or the shop's own WhatsApp is the **opt-out** regime: I may send, provided the
  objection route is there and honoured, and provided the recipient is not on the national
  opt-out list. ✅
- **A natural person**, a *trabalhador independente*, a sole trader, a named individual's
  own mailbox or number, needs **prior consent** for unsolicited electronic marketing (CNPD
  Diretriz 2022/1). So for a sole trader the electronic channels are **closed until they
  engage**: the first contact is a phone call or a visit, which is not an electronic
  communication and not covered by that regime. ⚠️ *The boundary between "a role address at
  a small Lda" and "a sole trader's own mailbox" is a judgement call made per row by the
  sourcer, and it is the judgement most worth a second opinion.*

The channels are email, phone, WhatsApp and in person. LinkedIn is not a channel. The rules
the sender follows are in `cadence.md`, Channels, and the seller kit repeats them:

1. **A first touch by email or WhatsApp goes to a role address at a company.** A sole trader,
   or a named person's own mailbox or number, is approached by phone or in person first.
   Email and WhatsApp open after they engage. The desk does not enforce this. The sourcer
   does, row by row.
2. **The first email or WhatsApp carries two lines**, at the end of
   `pitch/1-opener.<language>.md` (Art 14, data not obtained from the data subject: the
   source and the right to object, said in the first message): where I found them, filled in
   by the sender, and that one reply, "stop", ends it.

**Gate, mine, before the first batch of cold emails, and this file does not tick it:** check
the batch's role addresses against the national opt-out list kept by the **Direção-Geral do
Consumidor**. It is listed under Jamie's hand in `.icm/intake/README.md`, and the glance
shows it until it is done.

## 4. Opt-outs — permanent, for the company, on every channel

Art 21(2) makes objection to direct marketing absolute: there is no balancing left to do
once someone says no.

- **One no closes the company.** The sourcer or Jamie presses "They asked not to be
  contacted" on the row's page. The row goes to `lost` with the reason `asked not to be
  contacted` and loses its next action. `lost` is final for the row. That company gets no new
  row, by any salesman, on any channel (`cadence.md`, Channels). ✅
- **The no is kept apart from the row.** The same gesture writes the row's email and phone to
  the desk's no-contact list (the table `suppressions`: the address lower-cased, the number
  with its country code; one number is the phone and WhatsApp). The desk refuses a new row,
  or an edit, that carries an address or a number on the list, and the pool API answers the
  site's contact form with a refusal and stores nothing. No code path deletes an entry. The
  row keeps the reason, and the desk shows it on the row. ✅
- **Before adding a row, the sourcer searches the pool** for the company. A company with that
  reason on a `lost` row is not added. ⚠️ *The desk refuses the address and the number by
  itself. A new address or number at the same company is caught only by the sourcer's search.
  With two or three senders over a pool of tens, a search before each add is a control I can
  stand behind. It stops being one when §6 says so.*
- **An erasure request does not erase the no.** Keeping the minimum needed to *stay* stopped
  is what honouring the objection requires. Jamie answers the request by hand: the no-contact
  list keeps the contact point and the reason, the row keeps the company and the reason, and
  everything else goes. ⚠️ *This is a rule, not yet a thing that happened. The first request
  is handled against this line.*

## 5. Retention

Prospect data earns its keep by being worked. When it is not:

- **Twelve months.** A row at `new`, `contacted` or `lost` whose last touch, or whose
  `added` date when it has no touch, is older than 12 months is cleared of the person's
  data: the contact's name, the email, the phone, the website, the ask and the notes. The
  company, the country, the line, the source and the dates stay. The touches keep their
  dates and lose their notes. `desk/app/scripts/pool-purge.mjs` clears them. Jamie runs it by
  hand from the laptop: it prints what it would clear, and it writes only with `--yes`. The
  no-contact list is not cleared: it is the minimum that keeps a no (§4). The pool's first row
  is from 2026-10-19, so the first clearance is due on 2027-10-19. ⚠️
  *Twelve months is my own line, drawn to be defensible rather than derived from a rule that
  names a number.*
- **The website is on that list deliberately.** A row left reading *café · Ericeira ·
  https://…* names the business as squarely as the name column did, and where the business
  is a sole trader whose site carries their own name it names a person. What stops the same
  list being compiled and worked again is the line, the country and the dates, not the URL. ✅
- **The ask and the notes are cleared too.** They are the prospect's words and the
  sourcer's, and either may name a person. Nobody works a row a year cold from its notes. ✅
- **Rows that were handed off** (`handed off`) leave this assessment entirely: they are a
  business relationship with its own basis and its own accounting retention, recorded in
  `clients/<slug>/`.
- **A list of 117 businesses compiled in July 2026 is held outside the pool**, in a Neon
  project and two archives on Jamie's machine. Nothing reads it, and nothing in this
  assessment relies on it. Whether it enters the pool with a source or is deleted is Jamie's
  hand (`.icm/intake/README.md`). ⚠️

## 6. When this has to be redone

This assessment covers **a few people writing individually to tens of businesses.** Redo it
before any of these becomes true:

- volume rises beyond what the senders can write and read one by one;
- a message goes out without a person writing it (the house rule, *no outbound action
  without review*, and the desk, which sends nothing, are what prevent this today);
- the pool is bought, scraped, or enriched from a broker, a crawler, a paid source or a
  reviews API, rather than compiled by hand or researched one public page at a time;
- outreach extends to individuals rather than businesses;
- a second salesman joins before the Art 28 question in §1 is settled;
- a no is found not to have stuck, or the first clearance of §5 is missed;
- any step sends prospect data to a third party this file has not assessed: a model, an
  enrichment service, a mailing tool.
