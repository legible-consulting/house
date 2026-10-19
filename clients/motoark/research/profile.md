# MotoArk: prospect profile

Prepared 2026-10-19 for the discovery call on Wed 21 Oct, 10:30–11:00 Lisbon (13:30–14:00 GST).
Sources: the overview pack Sam sent (Drive, `MotoArk Overview Pack.pdf`, dated October 2026), the
email thread "Interest in working with MotoArk" (18–19 Oct), the screen explorer at
motoark.tiiny.site, and web searches. MotoArk has no web presence yet beyond the screen explorer.

## How it reached us

- John Davy (chairman) told Sam that Jamie was interested in working with MotoArk. Sam wrote on
  Sun 18 Oct, copying Mahmoud and John: a "15min catch up" to give "a better flavour of what we
  are doing and how we could potentially work together before we then go into more details".
- Jamie replied with the Discovery Call booking link. Sam booked from his personal Gmail
  (samcherry990@gmail.com) and accepted from sam@motoark.com.
- Sam expects 15 minutes; the slot is 30.
- John wrote from john@rtt.com; the pack gives john@motoark.com.

## The business

- **What:** a B2B marketplace where UAE workshops and garages buy genuine used OEM parts straight
  from yards and dismantlers. It starts with Mercedes-Benz and adds other makes later. New
  genuine dealer stock sits behind it as a fallback when no used part is available.
- **Problem they name:** parts are found through phone calls, WhatsApp brokers and swaps between
  garages. Stock is recorded in notebooks or not at all, nobody checks fit before purchase, broker
  mark-ups can double the price, buyers pay cash up front and arrange their own collection, and
  nobody records demand that goes unmet.
- **Revenue:** a fee on each sale, built into the price the buyer sees. The pitch is that the fee
  replaces the broker chain.
- **Stage:** "Getting ready to launch in the UAE". 23 of the first 47 Mercedes-Benz specialists
  they visited signed up, and 61 sellers were onboarded in five days. They name inventory
  digitisation as the launch bottleneck.
- **Moat they claim:** digitised yards, real prices, failed-search demand data and seller track
  records, all of which compound over time.
- **Next:** more makes, then other Gulf and North African countries, and later selling data to
  insurers, distributors and manufacturers.
- **Base:** SRTI Park, Sharjah, with people on the ground in Sharjah and Dubai.

### Numbers (read with care)

The PDF has two versions of the text laid over each other, so several headline figures collide:
the same slot reads both ">600,000 parts in the catalogue" and "5,721 sellers mapped", and both
"$2.3bn" and "61". The numbers that appear in full sentences are reliable:

| Figure | Meaning |
|---|---|
| 600,000+ | Mercedes-Benz catalogue part records they hold |
| 5,721 | seller businesses in their database, across several makes |
| 9,577 | garages in the UAE (their figure for the buyer pool) |
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

## People

| Person | Role (pack) | What matters for us |
|---|---|---|
| **Sam Cherry** | COO & CTO, co-founder | Our contact; booked the call. He owns operations and technology: search, catalogue, seller tools. Career: Al-Futtaim, Toyota, Lexus, BYD, VW (data and AI in sales and aftersales); Digital & AI Director at FIFA; led EY-Parthenon's automotive data and AI practice. A senior data and AI strategist, not necessarily a hands-on engineer. +971 56 369 7995 |
| **Mahmoud Gaber** | Founder & CEO | Finance background (CFO, capital allocation) plus 6+ years running workshops, garages and vehicle imports. Owns seller relationships. The email calls him "Mahmoud Ibrahim"; confirm the name before writing to him. |
| **John Davy** | Chairman & strategic partner, co-founder | Serial entrepreneur with 16 ventures, including Longbow Motors (luxury and classic dealership); sold a UK hospitality group for an eight-figure sum. Owns investors and expansion. He is our introducer. |

## Product and stack (as designed)

- **Three apps:** buyer marketplace, seller portal and admin portal, all in Next.js, English and
  Arabic, mobile first. The screen explorer shows 48 screens across desktop, tablet and mobile,
  each with happy and unhappy paths. It is a design spec, not a running app; whether any code
  exists is unknown.
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

## Read on the opportunity

- They have a detailed product and system design and a working sales motion with sellers. What
  the pack never mentions is engineers. A COO & CTO from strategy and consulting, a stack this
  wide, and "how we could work together" together suggest they need people to build it.
- The scope is a three-sided marketplace with split payments, payouts, a ledger, VAT invoicing
  and roughly 15 integrations. That is a large build, bigger than our app tier, so it would be
  phased or ongoing work.
- The other possible shape is a role, like remi-ai where Jamie is CTO, or a retainer, like
  sustentus. Sam's wording ("working with us", "getting involved") reads closer to joining than
  to buying a project. **The call should settle which.**
- Technical point worth raising: Medusa v2 has no built-in multi-vendor marketplace. Mercur, an
  open-source, MIT-licensed Medusa v2 framework from RigbyJS, already provides seller onboarding
  with approval, seller-scoped offers on a shared catalogue, split-order checkout, commissions and
  payouts. Their NestJS API and custom ledger may be rebuilding parts of it. This is a useful,
  concrete point to show competence, not a recommendation yet.
- **Competitor:** BuyAnyAutoPart, a UAE B2B used-parts marketplace for garages, raised a $750K
  pre-seed in December 2024. Existing online parts sellers (PartSouq, EXIST.AE and others) mostly
  sell new or aftermarket stock, not yard inventory.

## Questions for the call

1. What did John pass on about Jamie, and what kind of working together do you have in mind:
   building the platform, a technical role, or advisory?
2. What exists today: code, a team, an agency? Which of the 48 screens run, and which are designs?
3. Who builds now, and who would Jamie work with or report to?
4. What is the launch date and the scope for the first launch? Which apps and integrations must
   be live on day one, and which can wait?
5. Inventory digitisation is the bottleneck: is that a field-ops problem or a tooling problem
   (the seller app, the photo flow, bulk upload)?
6. Is Medusa v2 plus NestJS a decision or a starting point? Have they looked at Mercur?
7. Hosting: why Azure UAE North (a regulation, a client requirement, or credits)? Our builds ship
   on Vercel; check what Azure-only hosting changes for us.
8. Funding and budget: raised, raising, or bootstrapped? Is there a budget for build, and over
   what horizon?
9. Language: is Arabic required at launch or later?
10. Next step: who else needs to be in the follow-up (Mahmoud, John)?
