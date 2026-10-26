---
title: Legitimate interest assessment
kind: assessment
owner: jamie
date: 2026-08-30
amended: 2026-10-26
source: "k0d0minio/jamienisbet · .icm/docs/lia-cold-outreach.md · lead-engine epic, sequence 3"
law: "GDPR (Reg. (UE) 2016/679) · Lei 41/2004 as amended by Lei 46/2012 · CNPD Diretriz 2022/1"
---
> **Amended 2026-10-26.** This record came from the `k0d0minio/jamienisbet` repo, path
> `.icm/docs/lia-cold-outreach.md`, written on 2026-08-30 for that repo's lead-engine. The
> lead-engine was retired on 2026-10-25. The desk's pool is the system now. §0 maps each
> control this record relies on to the pool and says which is retired, which has an
> equivalent, and which is still open. The sections after §0 are the record of 2026-08-30
> and are not rewritten. To read the retired code, run `git show e72db92:<path>` in that
> repo; for the lead-engine tickets, `git show 1b10197^:<path>`.

# Legitimate Interest Assessment — cold outreach to local businesses

**Controller:** Jamie Nisbet · Mafra, Portugal · software engineering / AI consulting
**Activity assessed:** contacting small businesses in Mafra, Ericeira and greater Lisbon
who have not asked to be contacted, to offer web and software work.
**Written:** 30 August 2026 · **Applies from:** before the first batch goes out.
**Amended:** 31 August 2026 — §5 adds the website address to what the purge clears.
**Amended:** 26 October 2026 — §0 maps every control to the desk's pool, the system since 2026-10-25.

> **Purpose.** This is the written record of *why* I believe I may contact a business that
> never asked me to, *how far* that goes, and *where it stops*. GDPR Art 6(1)(f) is only
> available to a controller who has actually done the balancing — this file is that
> balancing, done in advance and dated, so the answer exists before the first message
> rather than after the first complaint.
>
> **This is my own assessment, not legal advice.** Lines are marked **✅ confident** or
> **⚠️ needs confirmation**. The ⚠️s are the ones to put to a lawyer or the CNPD before
> volume goes up. Nothing here licenses anything the app does not already enforce.

---

## 0. The system this covers from 2026-10-26: the desk's pool

The lead-engine of 2026-08-30 (the `biz.*` tables in Neon, `packages/services`, the admin
dashboard of the `jamienisbet` repo) was retired on 2026-10-25. The desk's pool replaces it:
`desk/app` in the house, the `prospects` and `touches` tables in Neon project `legible-desk`,
with the rules in `prospect.md`, `cadence.md` and `target-profile.md` beside this file. Jamie
and the salesmen work the pool. The desk sends nothing. This section is the balancing done
again against that system, control by control. The §0.4 conclusion is the one that applies.

### 0.1 What is processed, and where it comes from (§1)

| 2026-08-30 | 2026-10-26 | State |
|---|---|---|
| One row per business in `biz.clients`, from a list a person compiled on 2026-07-23 from public sources | One row per business in `prospects` (`prospect.md`, Fields): the company, the contact's name and role, an email or a phone, the website, the country, the language, the line, the size, the service, a deal-size hint, the source, the ask, the touches, notes. The sourcer adds it by hand. `source` is required at add: who referred, which event, which `targets/` list | Equivalent, with two changes. A named contact, where §1 held role addresses. A salesman, not only Jamie, as the sourcer |
| A/B/C fit tier by arithmetic (`tiering.ts`) | None. `line`, `size`, `service` and `deal_size` are the sourcer's own entries and hints only | Retired |
| Sequences 5 and 7: prospect facts and one page of their site sent to a model to draft and to grade (the ⚠️ processor question) | None. `desk/app` calls no model (checked 2026-10-26: no AI package, no gateway). The draft is `pitch/<touch>.<language>.md`, with the first name filled in by the desk | Retired. The ⚠️ closes |
| The pool compiled by a person from shop fronts and public listings | The same, plus `targets/<list>.md`: a session researches companies that match `target-profile.md` from public sources, one dated list per search, each row with its source. Companies, not persons. No broker, no crawler | Equivalent. §6's line on a bought, scraped or enriched pool stands |
| None | `POST /api/pool`: the portfolio's contact form inserts a row at `new`, `source: portfolio` | New, and outside this assessment: the person wrote to us (Art 6(1)(b), steps before a contract) |

### 0.2 The balance (§2.3) and the channels (§3)

| 2026-08-30 | 2026-10-26 | State |
|---|---|---|
| A person writes each message. Volume is tens | `cadence.md`: the sourcer adapts the draft in their own mailbox and sends from their own account. The desk sends nothing and cannot. Three touches over three weeks, then stop. On day 28 the row is due for `lost` | Equivalent, and stronger |
| Email and Instagram DM for role addresses at companies. Phone and walk-in first for everyone else (Lei 41/2004, CNPD 2022/1) | `cadence.md`, Channels, from 2026-10-26: a first touch by email or WhatsApp goes to a role address at a company only. A sole trader, or a named person's own mailbox or number, is approached by phone or in person first; email and WhatsApp open after they engage | Equivalent, as a rule the sender follows. The desk does not enforce it. The app did not either: §3 marks the judgement per row ⚠️, and it is now the sourcer's |
| Two lines in every first email: where I found you, how to stop (Art 14) | `pitch/1-opener.<language>.md`, from 2026-10-26, ends with the two lines in each language. `cadence.md` Channels carries the rule. The seller kits say it in step 2 | Equivalent |
| Gate, Jamie's own: check the batch's role addresses against the Direção-Geral do Consumidor's opt-out list before the first send | `.icm/intake/README.md`, Jamie's hand, from 2026-10-26. The glance prints it until it is done | Equivalent. Open until Jamie does it |

### 0.3 Opt-outs (§4) and retention (§5)

| 2026-08-30 | 2026-10-26 | State |
|---|---|---|
| `biz.suppressions`: one no closes every channel for the contact point, survives the row, nothing in the app deletes it, the import and the queue refuse a suppressed contact | `lost` with `lost_reason`, final for the row (`cadence.md`). Nothing stops a new row for the same company or the same address: `/pool` adds without a check, and `POST /api/pool` refuses only an open row with that email. `biz.suppressions` held 0 rows on 2026-10-22 and on 2026-10-25: there is nothing to carry over | Gap. The ticket `.icm/intake/triage/pool-opt-outs-and-purge.md` adds a suppression list to the desk. Until it ships, `cadence.md` Channels keeps the no by hand: a no is permanent for the company on every channel, and the pool is searched before a row is added |
| An erasure request does not erase the suppression | Part of the same ticket | Gap, same ticket |
| `leads-purge`: a row at `prospect` or `not_won` not touched for 12 months is anonymised. The suppression stays | None. A row stays as it is. The pool's first row is from 2026-10-19, so no row reaches 12 months before 2027-10-19 | Gap, same ticket, due before 2027-10-19. The line of 12 months stands |
| The 117 rows compiled on 2026-07-23 | They are in Neon project `jamie-nisbet` (`restless-rain-15879798`, schema `biz`; nothing reads it) and in two archives under `desk/app/` on Jamie's machine, untracked. They are not in the pool | Open. Jamie's hand (`.icm/intake/README.md`): import them into the pool as rows with a source, or delete the project and the archives |

### 0.4 Conclusion, 2026-10-26

The purpose and the necessity (§2.1, §2.2) do not change. The balance of §2.3 holds for the
desk's pool on the same terms as before: because of the controls, not on its own. From this
amendment the controls of §3 are in place as words the sender follows. Two controls of §4 and
§5 are open: the suppression list that survives the row, and the purge. Until the ticket
ships, the no is kept by hand by two or three people over a pool of tens, and the purge is
not due before 2027-10-19. On that basis the balance holds today. It stops holding, and this
record is redone, when §6 says so, or when the ticket is not shipped by 2027-10-19, or when a
no is found not to have stuck.

---

## 1. What is processed, and where it came from

One row per business in the Neon `biz.clients` table, seeded from a prospect list I
compiled by hand on 23 July 2026 from public sources — company websites, Google Business
listings, Instagram pages and shop fronts. Per business: the trading name, a sector, a
town, a public contact channel (a role email such as `geral@`/`info@`, a phone number, an
Instagram handle), the language to open in, and a one-line note on what I noticed about
their web presence.

- **No special-category data** (Art 9), no financial data, no data about anyone's private
  life. ✅
- **No profiling with legal or similarly significant effect** (Art 22). The A/B/C fit tier
  is my own triage of who to call first; it decides the order of my week, not anything
  about them. ✅
- **Nothing is bought, scraped at scale, or enriched from a data broker.** The pool is a
  list a person made by looking at shops. ✅
- **Sequence 5 sends prospect facts to a third-party model** (Vercel AI Gateway) to draft a
  message. That is a processor relationship and a transfer question in its own right, and
  it is **⚠️ needs confirmation** — to be settled in that sequence's own ticket, not
  assumed by this file.
- **Sequence 7 sends the same facts, plus one page of the business's own public website**,
  to the same processor to propose facts and grade the site. It adds a recipient of
  nothing and a transfer of nothing that sequence 5 did not already make — the extra
  content is a business's own home page, published by them — so it inherits that
  **⚠️** and does not open a second one. Two things about it stay inside §&nbsp;6's line
  deliberately: it reads **one page of their own site, on demand**, never a crawl and
  never a broker; and the Google review count it might have wanted stays hand-entered
  rather than pulled from an API. Nothing about a fit tier is decided by the model — the
  A/B/C letter is arithmetic over stored facts (`packages/services/src/tiering.ts`),
  which is what keeps the "no profiling with legal effect" line above true and readable.

## 2. The three-part test

### 2.1 Purpose — is there a legitimate interest?

Yes: finding customers for a one-person business. Recital 47 names direct marketing as a
possible legitimate interest in terms, and B2B prospecting for a professional service is
its least contentious form. The interest is mine, it is real, it is current, and it is
lawful. ✅

### 2.2 Necessity — is contacting them necessary for it?

Yes, on this scale. I have no advertising budget, no sales team and no inbound pipeline
beyond word of mouth. The alternatives —
paid ads, a broker's list — are either not affordable or worse for the people in it. The
data used is the minimum that makes a message worth reading: who they are, where they are,
and the one thing about their web presence I would actually be talking about. No field is
collected because it might be useful later. ✅

### 2.3 Balancing — do their interests override mine?

The rights at stake are those of the **person who reads the message**, not of the company.
Weighing it honestly:

| Points toward me | Points toward them |
|---|---|
| Contact is at a **business, about their business**, through a channel they published for exactly this kind of enquiry | It is unsolicited: they did not ask, and every unsolicited message costs someone a minute |
| The data is **already public** and was published by them | They did not expect me specifically to keep it in a database |
| Volume is **tens, not tens of thousands** — a person writes each message | An automated-feeling message would be worse than none |
| Every message says **who I am, where I got their details, and how to stop it** | Without that line the processing would be invisible, which is the real harm |
| **One "no" ends it permanently**, across every channel, forever (§4) | A "no" that did not stick would be the whole objection |
| Cadence is capped at **~5 touches over ~3 weeks**, then the relationship parks or ends | Repeated contact after silence tips from persistence into nuisance |

**Conclusion: the balance holds** — but it holds *because* of the controls in §3–§5, not on
its own. If the volume rises, the messages stop being individually written, or the opt-out
stops being instant and permanent, this assessment no longer covers the activity and has to
be redone. ✅

## 3. Channels — the split that actually decides what I may do

GDPR gives the lawful basis for *holding and using* the data. **Lei 41/2004** (as amended by
Lei 46/2012) decides, separately, whether I may send an *unsolicited electronic
communication* at all — and it splits on who is behind the address:

- **A legal person** (an *Lda*, an *SA*) at a **role address** (`geral@`, `info@`) or a
  company switchboard is the **opt-out** regime: I may send, provided the objection route is
  there and honoured, and provided the recipient is not on the national opt-out list. ✅
- **A natural person** — a *trabalhador independente*, a sole trader, a named individual's
  mailbox (`joana@…`) — needs **prior consent** for unsolicited electronic marketing
  (CNPD Diretriz 2022/1). So for a sole trader the electronic channels are **closed until
  they engage**: the first contact is a phone call or walking into the shop, which is not an
  electronic communication and not covered by that regime. ⚠️ *The boundary between "a role
  address at a small Lda" and "a sole trader's own mailbox" is a judgement call made per row,
  and it is the judgement most worth a second opinion.*

Practical consequence, and the rule the app is built around: **email and Instagram DM are for
role addresses at companies; phone and walk-in are the first door for everyone else.** A
number, once given, covers the call and the WhatsApp alike.

**Every first-touch email carries two lines**, and the drafts are built to include them
(Art 14 — data not obtained from the data subject: identity, purpose, source, and the right
to object):

1. **Where I found you** — "I found your details on your website / your Google listing."
2. **How to stop** — "Reply 'remove' and I won't contact you again."

**Gate — mine, before the first batch, and this file does not tick it:** check the batch's
role addresses against the national opt-out list kept by the **Direção-Geral do Consumidor**
before the first send. It is recorded as an unticked checkbox on the sequence-3 ticket.

## 4. Opt-outs — permanent, and outside the record they came from

Art 21(2) makes objection to direct marketing absolute: there is no balancing left to do
once someone says no. So the app treats an opt-out as a fact about **the contact point**,
not about the lead row:

- **`biz.suppressions`** stores `(kind, value)` — a lowercased address, an E.164 number, a
  bare handle — with the reason and the date. Unique on the pair, so a second opt-out is the
  same opt-out and the original date stands.
- **No foreign key to the lead, on purpose.** The suppression survives archiving the row,
  deleting it, purging it under §5, and re-importing the same business from a fresh list next
  spring. An opt-out keyed to a client id would die with the client, and the next import
  would write them straight back in.
- **Nothing in the application deletes one.** Removing a suppression is a hand-written
  `DELETE` in psql, deliberately far away from a phone.
- **One gesture does the whole thing.** "They asked to be removed" on the lead's profile
  closes every channel on the record, moves the relationship to *not won*, clears whatever
  was planned next, and logs the reason in the touch history —
  `suppressClient` in `packages/services`, which the operator
  scripts call too so nothing can do three of the four.
- **The app honours it everywhere a message could start.** Live today: a closed channel is a
  dead end on the lead's profile — the address still readable and copyable, the send gesture
  gone — and the action discs for it are disabled; `leads-import` checks every contact point
  on a batch before it writes anything and skips the whole business, not just that channel;
  `leads-queue` marks a closed door rather than offering it; and the draft panel on the lead's
  profile disables a closed channel and its server action refuses one — the app cannot *write*
  the message, not merely not send it (sequence 5, done).
- **An erasure request does not erase the suppression.** Keeping the minimum needed to
  *stay* stopped is what honouring the objection requires; deleting it would be the one way
  to guarantee contacting them again. ✅ Only the contact point and the reason are kept.

## 5. Retention

Prospect data earns its keep by being worked. When it is not:

- A row on **`prospect`** or **`not_won`** that has not been touched for **12 months** is
  anonymised by the purge script — name, email, phone, WhatsApp, Instagram, the website
  address and the hook cleared; the sector, town and the fact that a business of that shape
  was once approached kept. Any suppression entry **stays**, per §4.
- **The website address is on that list deliberately.** A row left reading *restaurant ·
  Ericeira · https://…* names the business as squarely as the name column did, and where the
  business is a sole trader whose site carries their own name it names a person — the same
  boundary §3 calls the judgement most worth a second opinion, settled here the safer way
  rather than argued. Nothing was given up by clearing it: what stops the same list being
  compiled and worked again next spring is the sector, the town and the dates, not the URL,
  and a row a year cold is not worked from its website either. ✅
- **`notes` and `intake_message` are not cleared, and the reasoning above does not reach
  them.** They are my own words about a prospect and a form-filler's words about themselves;
  whether either names a person is a question about what was written, which a script cannot
  answer. `leads-purge` reports how many rows carry one so that I read them. ⚠️ *If notes
  routinely turn out to name individuals, they belong on the cleared list too.*
- Rows that engaged (`discussing` and up) leave this assessment entirely: they are a
  business relationship with its own basis and its own accounting retention.
- The purge runs as an operator script, not on a timer — `leads-purge` in
  `packages/services/scripts/`, which reports what it
  would clear and refuses to write without `--yes`. ⚠️ *Twelve months is my own line, drawn
  to be defensible rather than derived from a rule that names a number.*

## 6. When this has to be redone

This assessment covers **a person writing individually to a few hundred local businesses.**
Redo it before any of these becomes true:

- volume rises beyond what one person can write and read;
- messages start going out without a human reading each one first (the standing rule — *no
  outbound action without review* — is what currently prevents this);
- the pool is bought, scraped, or enriched from a broker rather than compiled by hand
  — reading one page of a business's own website on demand (sequence 7) is none of those,
  but a crawler, a paid data source or a reviews API would be;
- outreach extends to individuals rather than businesses;
- the AI steps (drafting in sequence 5, enrichment in sequence 7) send prospect data
  anywhere this file has not assessed.

---

**Related, in the `k0d0minio/jamienisbet` history (see the note at the top):**
`.icm/intake/lead-engine/breakdown.md` ·
`.icm/intake/lead-engine/_done/suppression-and-provenance.md` ·
`packages/services/README.md` §&nbsp;Suppressions
