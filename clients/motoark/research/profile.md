# MotoArk: prospect profile

Prepared 2026-10-19 for the discovery call. Updated 2026-10-21 from the call itself (Sam Cherry,
COO and CTO, 26 minutes; the notes and the recording are in Drive). The first part
is what the call settled. The second part is the pre-call read from the overview pack, kept with
the corrections the call made. Sources for the pre-call part: the overview pack Sam sent (Drive,
`MotoArk Overview Pack.pdf`, dated October 2026), the email thread "Interest in working with
MotoArk" (18–19 Oct), the screen explorer at motoark.tiiny.site, and web searches.

## What the call settled (2026-10-21)

### The business, in Sam's words

- For a parts buyer, MotoArk is Amazon. For a parts seller, it is eBay or Amazon marketplace.
- The regional trade has three tiers: dealerships (Toyota, Lexus), the sub-dealers they own, and
  a large bottom tier of independent garages. MotoArk serves only the bottom tier. In the UAE
  that is 5,000 garages, and Sam says 10 to 15 percent of them each hold over 50 million USD of
  stock. The parts are a small share new and a large share used, in varying condition.
- Sellers buy crash-damaged cars, strip them with cheap local labour, and today resell the
  parts by phone and WhatsApp. MotoArk puts a professional layer on that.
- **Fee:** 25 percent commission on each sale, taken from the seller. Buyers pay no fee. The
  commission covers MotoArk's own costs. (The pack said "a fee built into the price"; the call
  made it a seller commission.)
- **Services for the commission:** MotoArk's field team goes on site, counts and organises the
  seller's stock, uploads it and manages the first listings. After that the seller runs their
  own listings. MotoArk also runs delivery.
- **Buyers:** an Amazon-style basket and checkout. Buy now, pay later covers four months of the
  buyer's cash flow.
- **Delivery:** a courier on a bicycle or motorbike collects the part and delivers it, inside
  the UAE. Cross-border carriage is not live. Agreements with DHL and other major carriers are
  in progress and slow to sign.
- **Where they are:** "just about got us to version one". Sam said the 5,000 garages "are going
  to be on our platform", so whether buyers transact today is not settled. Ask on Friday.
- **Where they are going:** UAE, then Morocco, Oman, Saudi Arabia, the rest of the Gulf and
  South-East Asia. The plan is cross-border triage: read demand and supply on both sides and
  move parts from a cheap market (gearboxes and axles in Morocco) to an expensive one (Libya,
  Syria) at a 25 to 30 percent margin. Sam says they have the cash and the investment for it.

### Numbers from the call

| Figure | Meaning |
|---|---|
| 5,000 | garages in the UAE that MotoArk targets as buyers (the pack said 9,577 garages in the UAE in total) |
| 10 to 15 percent | share of those garages holding over 50 million USD of stock each, Sam's estimate |
| 25 percent | commission on each sale, paid by the seller; no buyer fee |
| 4 months | buyer cash flow covered by buy now, pay later |
| 50 | field workers who count and list sellers' stock on site |
| 3 | people in technology: Sam and two offshore developers in Pakistan |
| under 3,000 USD | the technology team's monthly burn, all three |
| 3 months | the initial programme Sam proposes |

### Team and who decides

| Person | Role, per Sam | For us |
|---|---|---|
| **Sam Cherry** | COO and CTO. Does everything from design through to DevOps. Is also the product's first customer. Runs his own business alongside MotoArk. | Our contact. He decides fit and proposes the hire to John and Mahmoud. He keeps the two developers. He wants someone "on the bench directly alongside me" who could be the CTO if he were not there. |
| **Mahmoud Gaber** | CEO. The network: knows everyone in the trade. | Not on the call. Likely on the follow-up. |
| **John Davy** | Chairman. Funds the programme. Well connected. | The money. Not on the call. |
| **Two developers** | Offshore, in Pakistan. "Pretty good." Stay in place. | Jamie reviews their work and sets the method. They are not his reports. |

Sam's three criteria, in his order: (1) can he work with the person, settled in ten minutes,
Jamie passed; (2) capability, shown by examples and a video; (3) availability and cost.

### What exists, and what version 2 is

- **Version 1:** the catalogue with search indexing over parts. That is the only AI in the
  product today. Sam calls it "very simple".
- **The repositories:** organised repos, structure, context, code packages and design files.
  "Neat as I've gone." No defined agents, no agent interface. Sam builds fast and alone.
- **First job:** AI in the development flow. Sam wants someone who plans, builds, tests and
  ships with agents from the start, "not build a codebase and use AI to test at the end", and
  not "just build it in Claude" either.
- **Version 2:** AI as a large part of the product. A WhatsApp-style message interface for
  buyers and sellers who speak English, Hindi or Arabic, inside MotoArk's own interface
  (WhatsApp is blocked in the UAE). It answers like the trader down the road and pulls the
  intelligence back into MotoArk. Later, cross-border triage on that intelligence.
- **Stack, hosting, launch date, Medusa and Mercur, Azure:** not discussed. The pre-call read
  below stands as the pack's design, unverified.

### What they asked for, and by when

1. **A demo video**, from Jamie, before Friday: how he goes from a business requirement
   (design, not necessarily his) into an agentic build, testing, DevOps, and hardening and bug
   fixes after. Examples of past work alongside it. "Doesn't need to be anything crazy."
2. **The discounted rate for a 3-month block**, to set against their burn rate.
3. **A follow-up call on Fri 23 Oct at 12:00 UAE time.** On the call Sam said that is 10:00
   Lisbon and Jamie agreed. It is 09:00 Lisbon: the UAE is UTC+4 and Lisbon is UTC+1 until
   25 Oct. The record says 09:00. Jamie sends the invite, so the invite settles it. Mahmoud and
   John may join.
4. **The shape:** a 3-month initial programme, version 1 to version 2, as a honeymoon for both
   sides. Sam said both sides can walk away. After it, near full-time.
5. **Availability:** "pretty much full-time or close to full-time". Not nine to five. Sam cares
   about "repos and outputs" and progress, not hours.

### What Jamie said

- Agentic development flow is his area: he edits a codebase so that AI can operate in it
  natively, then stays on as advisor or hands over with onboarding.
- He can do close to full-time for the three months, then close other projects and give more
  time if both sides continue.
- He works with the Interpretable Context Methodology (ICM): it lets him run several projects
  at once, about 15 sessions started in 15 minutes per project. Sam said he works the same way.
- Price: €120 an hour is his standard rate. For retainers he gives "fairly decent discounts"
  because the revenue recurs. A retainer on a similar system is at "the 35 38 mark" a month, in
  euros, meaning €3,500 to €3,800. Sam: "I've not fallen off my chair. We can work around that."
  (Gemini's summary wrote 35,000 to 38,000. The transcript says 35 to 38. The record is right.)

### Open after the call

- Does version 1 transact with real buyers today? Where does it run (the pack says Azure UAE
  North)? Where do the repositories live (GitHub, Azure DevOps)?
- The release cadence. Sam said "tomorrow is release day" (Thu 22 Oct).
- What the two developers own, and what Sam alone touches.
- The contracting entity for MotoArk, and who signs.
- The start date Sam has in mind. The proposal assumes Mon 2 Nov 2026.
- Who joins on Friday.

## Before the call (2026-10-19), with corrections

### How it reached us

- John Davy (chairman) told Sam that Jamie was interested in working with MotoArk. Jamie had seen
  John's post on Facebook as a suggested item, looked at his LinkedIn and emailed his portfolio
  and booking link (Jamie, on the call). Sam wrote on Sun 18 Oct, copying Mahmoud and John: a
  "15min catch up" to give "a better flavour of what we are doing and how we could potentially
  work together before we then go into more details".
- Sam booked from his personal Gmail (samcherry990@gmail.com) and accepted from sam@motoark.com.
  The call ran 26 minutes.
- John wrote from john@rtt.com; the pack gives john@motoark.com.

### The business, from the pack

- **What:** a B2B marketplace where UAE workshops and garages buy genuine used OEM parts straight
  from yards and dismantlers. It starts with Mercedes-Benz and adds other makes later. New
  genuine dealer stock sits behind it as a fallback when no used part is available.
- **Problem they name:** parts are found through phone calls, WhatsApp brokers and swaps between
  garages. Stock is recorded in notebooks or not at all, nobody checks fit before purchase, broker
  mark-ups can double the price, buyers pay cash up front and arrange their own collection, and
  nobody records demand that goes unmet. The call confirmed this picture.
- **Revenue:** corrected by the call: a 25 percent seller commission, no buyer fee.
- **Stage:** "Getting ready to launch in the UAE". 23 of the first 47 Mercedes-Benz specialists
  they visited signed up, and 61 sellers were onboarded in five days. They name inventory
  digitisation as the launch bottleneck. The call added the 50-person field team that does it.
- **Moat they claim:** digitised yards, real prices, failed-search demand data and seller track
  records, all of which compound over time.
- **Next:** more makes, then other Gulf and North African countries, and later selling data to
  insurers, distributors and manufacturers. The call named the countries and the triage play.
- **Base:** SRTI Park, Sharjah, with people on the ground in Sharjah and Dubai.

#### Numbers from the pack (read with care)

The PDF has two versions of the text laid over each other, so several headline figures collide:
the same slot reads both ">600,000 parts in the catalogue" and "5,721 sellers mapped", and both
"$2.3bn" and "61". The numbers that appear in full sentences are reliable:

| Figure | Meaning |
|---|---|
| 600,000+ | Mercedes-Benz catalogue part records they hold |
| 5,721 | seller businesses in their database, across several makes |
| 9,577 | garages in the UAE (their figure for the buyer pool; Sam said 5,000 on the call) |
| 23 of 47 | Mercedes-Benz specialists visited who joined |
| 61 | sellers onboarded in five days |
| 81.6% | share of the Mercedes-Benz OE universe their demand model rates fast or medium demand |
| $13bn | yearly parts and service spend across their 8 priority markets |
| $2.3bn | yearly spend on used genuine parts in those markets |
| AED 185m / $100m+ | stock held by the first 23 sellers (the two layers disagree; ask which is current) |

The overlaid layers also make the team bios conflict (Mahmoud is "finance executive, 18 years"
in one and "leads MotoArk and sets its direction" in the other). This looks like an export
fault, not intent. Whether to mention it is Jamie's call; it is a cheap, useful favour if they
send this pack to investors.

### People, from the pack

| Person | Role (pack) | What matters for us |
|---|---|---|
| **Sam Cherry** | COO & CTO, co-founder | Career: Al-Futtaim, Toyota, Lexus, BYD, VW (data and AI in sales and aftersales); Digital & AI Director at FIFA; led EY-Parthenon's automotive data and AI practice. The call corrected the pre-call guess: he is hands-on, and builds from design to DevOps himself. +971 56 369 7995 |
| **Mahmoud Gaber** | Founder & CEO | Finance background (CFO, capital allocation) plus 6+ years running workshops, garages and vehicle imports. Owns seller relationships. The email calls him "Mahmoud Ibrahim"; confirm the name before writing to him. |
| **John Davy** | Chairman & strategic partner, co-founder | Serial entrepreneur with 16 ventures, including Longbow Motors (luxury and classic dealership); sold a UK hospitality group for an eight-figure sum. Owns investors and expansion. He is our introducer and, per Sam, funds the programme. |

### Product and stack, as designed in the pack (not verified on the call)

- **Three apps:** buyer marketplace, seller portal and admin portal, all in Next.js, English and
  Arabic, mobile first. The screen explorer shows 48 screens across desktop, tablet and mobile,
  each with happy and unhappy paths. It is a design spec. Sam said on the call that repos, code
  packages and design files exist and are organised.
- **Core:** Medusa v2 for basket, checkout, orders and payments; a NestJS API for sellers,
  listings, catalogue and cases; their own pricing engine; and a ledger for seller balances and
  payouts.
- **Data:** Azure UAE North (data residency), PostgreSQL, Redis, Meilisearch for search, Azure
  Blob with a CDN, and Microsoft Entra for sign-in.
- **Partners:** payments through N-Genius, Tabby and Tamara (BNPL) and cash; delivery through
  Carriyo with Jeebly, Aramex and EMX; accounting through Zoho Books, Zoho CRM and ADCB (bank);
  parts data from Partslink24, Vincario (VIN) and MB images; messaging through ZeptoMail,
  Infobip and the WhatsApp API; plus the eBay API and Frankfurter (FX).
- **AI layer, "coming in stages":** plain-language and photo part search, a WhatsApp ordering
  agent, help answers, seller instructions, photo quality checks (eight guided photos per part),
  catalogue tidying and a team assistant. The rule is that the AI suggests and a person decides.
  The call put the message interface, in English, Hindi and Arabic, at the front of version 2.

### Read on the opportunity, before and after the call

- Before: the pack never mentions engineers, and Sam's wording read closer to joining than to
  buying a project. After: confirmed. Sam wants one senior engineer beside him on a 3-month
  retainer, with a path to more. `kind: retainer` is set in the record.
- The scope in the pack is a three-sided marketplace with split payments, payouts, a ledger, VAT
  invoicing and roughly 15 integrations. How much of it runs today is the first thing to learn
  in month 1.
- Technical point, still unraised: Medusa v2 has no built-in multi-vendor marketplace. Mercur,
  an open-source, MIT-licensed Medusa v2 framework from RigbyJS, provides seller onboarding
  with approval, seller-scoped offers on a shared catalogue, split-order checkout, commissions and
  payouts. Their NestJS API and custom ledger may be rebuilding parts of it. Keep it for month 1,
  as a written case for Sam to decide, not a pitch.
- **Competitor:** BuyAnyAutoPart, a UAE B2B used-parts marketplace for garages, raised a $750K
  pre-seed in December 2024. Existing online parts sellers (PartSouq, EXIST.AE and others) mostly
  sell new or aftermarket stock, not yard inventory.

### The pre-call questions, and what happened to them

1. What kind of working together: **answered.** A 3-month retainer as a senior engineer beside
   Sam, with a stand-in CTO expectation.
2. What exists today: **part answered.** Version 1 with catalogue search; organised repos and
   design files. Whether buyers transact today: ask Friday.
3. Who builds now: **answered.** Sam, plus two offshore developers who stay.
4. Launch date and first-launch scope: **open.**
5. Inventory digitisation: **answered.** A field-ops operation of 50 people. Tooling for them is
   out of the proposal's scope unless ticketed.
6. Medusa v2 plus NestJS, Mercur: **open.** Month 1 material.
7. Azure UAE North: **open.** Hosting stays MotoArk's either way (client-owned pattern).
8. Funding and budget: **part answered.** John funds; "we've got the cash". Sam compares the
   rate against a technology burn under 3,000 USD a month.
9. Arabic: **answered.** Version 2's interface speaks English, Hindi and Arabic.
10. Who else in the follow-up: **open.** Likely Mahmoud and John.
