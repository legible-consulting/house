# MotoArk: prospect profile

Prepared 2026-10-19 for the discovery call. Updated 2026-10-21 from that call (Sam Cherry, COO
and CTO, 26 minutes) and 2026-10-23 from the follow-up call (Sam alone, 48 minutes). The notes,
the transcripts and the recordings are in Drive, under Meet Recordings. The first part is what
the follow-up call settled. The second is what the discovery call settled. The third is the
pre-call read from the overview pack, kept with the corrections the calls made. Sources for the
pre-call part: the overview pack Sam sent (Drive,
`MotoArk Overview Pack.pdf`, dated October 2026), the email thread "Interest in working with
MotoArk" (18–19 Oct), the screen explorer at motoark.tiiny.site, and web searches.

## What the follow-up call settled (2026-10-23)

### The call

- Fri 23 Oct, 10:01 to 10:49 WEST. Sam alone. Mahmoud and John did not join. Jamie's laptop
  lost power at minute 5 and the call resumed at minute 12. Jamie restarted the pitch.
- Jamie pitched the method: the bus test, the AI-first build, folders and files as the
  guardrails, a contract per stage with an input and an output, tickets in the repository,
  token efficiency, a model-agnostic routing file, deterministic scripts. Sam asked for
  examples. Jamie showed the desk, the tickets in his own business repo and a pull request with
  its gates, live. No client repo was shown. Sam: that "gives me the majority of what I
  needed". Neither side mentioned the demo video asked for on 21 Oct.

### What Sam said

- **How he builds today.** All repositories in GitHub, one monorepo ("keeps it clean"). Hosted
  in Azure "at the moment"; the hosting is something Sam works on next week. An agency did the
  first development. Sam threw them out and built version 1 himself in the last three weeks,
  10 to 15 days of build. He wrote a few test scripts, merged his own pull requests and
  released. Version 1 released overnight, 22 to 23 Oct.
- **Next week.** Sam puts in a proper DevOps flow, test scripts and guardrails, and lays the
  groundwork for whoever comes in. Jamie asked him to write down how he decides each piece,
  not only what he did, so that it translates into the method's folder. Sam: "the brain's
  already extracted by that point".
- **His worry, the 2 percent.** An agentic build that goes wrong goes wrong badly, and agents
  do not get you out of it. He wants someone beside him who understands code the old way and
  can troubleshoot end to end, so that he is not the one who has to jump in. Jamie's answer:
  the human reads the problem, the proposed change and the acceptance criteria before the
  build, and the spec gate stops the agent when it is skipped.
- **His worry, tokens and lock-in.** Sam expects Anthropic and the others to raise prices once
  users are hooked. His approach is multi-model: image and video to Gemini, lighter or free
  models where they do the job. Jamie's answer: the method is model-agnostic. The routing file
  at the root is read first by every harness. Jamie runs it on the Claude Max 20x plan and
  gets more from it than peers on the same plan.
- **Requirements.** Both named unclear product requirements as the first bottleneck. Sam owns
  product and operations as COO and CTO, which is why version 1 took 10 to 15 days. The second
  bottleneck, named by Jamie and agreed by Sam: whoever reviews tickets gets bored, gates get
  ticked to make progress, and 15 pull requests later nobody knows what moved.
- **Monorepo.** Agreed by both. Sam would leave it only for a structure like FIFA's 211
  sub-companies, and even then maybe not.
- **Other candidates.** Sam will "go through all the candidates and who we're looking at".
  Jamie is one of several.
- **Decision.** Sam decides over the weekend, on a nine-hour flight, and comes back to
  everybody on Mon 26 Oct.

### What Jamie offered

- **Availability.** 40 to 60 hours a month of his own work over three months from November.
  The sessions do the volume. Sam: "that's fine".
- **Price, as said.** €3,700 a month, the floor for month to month. Or €3,500 for months 1 and
  2 and €3,700 for month 3, with two invoices: half the three-month total at the start and
  half at the end. Jamie's stated reason: his first year as a freelancer in Portugal. Sam: "we
  can look at that". He puts it into his thinking with the other candidates. The quote carries
  both structures (`quote/quote.md`). The positions are in `quote/negotiation.md`.
- **How he works.** His longest client sets objectives and deadlines, not hours. Sam: "that's
  how I work".

### Open after the follow-up call

- Whether version 1 transacts with real buyers. It is released. Sam did not say whether orders
  flow.
- What the two developers own. Not mentioned on this call. Sam described building version 1
  alone.
- The contracting entity, and who signs.
- The start date. Jamie said November. The proposal assumes Mon 2 Nov.
- Where version 1 will be hosted after Sam's rework next week.

## What the discovery call settled (2026-10-21)

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
   25 Oct. The record said 09:00. The call ran at 10:01 WEST on the day. Mahmoud and John did
   not join.
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

### Open after the discovery call

Updated 2026-10-23: the follow-up call answered the repositories (GitHub, one monorepo), the
hosting (Azure, under rework next week), the release cadence (Sam released version 1 himself on
22 Oct) and who joined (Sam alone). What stays open is listed under the follow-up call above.

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
