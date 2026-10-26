# Agorasim: client profile

Prepared 2026-10-23, three months into the build, from the house record, the pre-house deal log
(2026-07-23 to 2026-10-07, outside the house), the client repo
`k0d0minio/agorasim` on `main` at bf9ba77 (`.icm/project.md`, the register of 2026-09-18,
`.icm/docs/launch-runbook.md`, `.icm/docs/data-protection.md`, `.icm/intake/`), three documents
recovered from that repo's git history (the proposal of 2026-07-23, the Commission & Payments
Agreement of 2026-07-27, the ways-of-working guide of 2026-07-27 and the information request of
2026-08-10), the feedback of 2026-10-12 (Drive, `feedback-round-1.pdf`), one email thread of
2026-09-11, the live DNS and the Vercel and Neon consoles, and Jamie's answers of 2026-10-23.
The first part is the business. The second is the people. The third is the engagement as agreed.
The fourth is the product and its state. The fifth is what stays open.

## The business

Agorasim sells guided classic-car tours of the Saloia region, west of Lisbon: Sintra, Mafra and
Ericeira. The signature tour is the private Countryside (Rural Saloia) day with local partners
as add-ons: Tasco Galapito, Manzwine (closed Mondays) and Ramilo Wines. Olaria MZ was a partner
and is retired. A second product is the Óbidos and medieval villages food tour, run in a
non-classic touring vehicle from Lisbon. The third is classic cars for weddings and events:
transport of the couple, photo sessions, floral decoration, personalised boards, quoted per
event. Before this build a third party took the bookings at €40 a booking.

| Fact | Value | Source |
|---|---|---|
| Trading name | Agorasim | proposal, site |
| Legal entity, NIF, address | not recorded in the house. Asked in the information request of 2026-08-10. The answers (an info PDF) are no longer on file | information request, legacy log |
| RNAAT number, insurance, Livro de Reclamações registration | unknown. The privacy page keeps its draft banner until they arrive | `.icm/docs/data-protection.md` |
| Cars | Citroën 2CV, Renault 4L, Fiat 600 (3 guests each), VW T3 (8 guests) | register § Business logic |
| Drivers | 2. Capacity is drivers and cars, not seats | register |
| Departures | 10:00 and 14:00. No fixed days off. Seasons closed through the calendar. Óbidos departure times not confirmed | register, open question 8 |
| Pricing | Public departures per person (adult, child 4 to 12, infant free), with minimums. Private tours in flat group tiers (Countryside €220 to €700 for 1 to 12). Add-ons only on the private Countryside tour. Tiers and minimums count adults only (client, 2026-09-11, D19) | register, prices PDF of 2026-08-18 as the register reads it |
| Money rules | Full payment at booking. Free cancellation up to 48 h before, automatic refund. Weddings: 30 % deposit holds the date, balance 14 days before, deposit non-refundable inside 30 days (a default the client has not confirmed) | register, proposal § 5 |
| Domain | agorasim.pt, registered 2020-08-05, expires 2027-08-05. Transferred from Amen. Nameservers at Vercel DNS. The apex still serves the old WordPress site on purpose | whois and DNS 2026-10-23, Jamie 2026-10-23 |
| Mail and office | Google Workspace on agorasim.pt, info@agorasim.pt, billed by Google directly | runbook § 1 |
| Social | Instagram agorasim.pt, a Facebook page. Admin access not granted to Jamie | open question 4 |
| Language | Portuguese. Most wedding customers are Portuguese (Diogo, 2026-10-12). Guests are mostly international, so the site is PT and EN | feedback, register |

## The people

| Person | Role | For us |
|---|---|---|
| **Diogo Trajano** | Co-owner. Drives. Writes from info@agorasim.pt and WhatsApp. +351 926 210 707 | Decides and owns the account (Jamie, 2026-10-23). Wrote feedback round 1. Holds the registrar, Workspace and Stripe logins |
| **Rita** | Co-owner. Drives. +351 919 272 077. Surname not on file | Operates the admin from her phone. The admin's reference device is her phone. Tests UAT with Diogo |
| **Jamie Nisbet** | Builds and runs the platform. Owns the repo, the Vercel team, the Neon org, Resend and Sentry | Paid €2,000 flat plus the commission. No salesman |

The two speak with one voice: the ways-of-working guide asks them to settle a disagreement
between themselves first. The channel is WhatsApp, in Portuguese. Feedback comes in batches,
one list per round.

## The engagement as agreed

- **Shape.** `kind: build`. Six features for a flat €2,000, plus a commission on bookings that
  continues after the build. The build reaches `handover` when the last release is merged. The
  commission continues after it.
- **Price.** €2,000, paid in full (Jamie, 2026-10-23). The proposal values the six features at
  €5,900 and cuts 66 % in exchange for the commission. `quote/economics.yaml` holds the numbers.
- **Commission.** 4 % of a tour booking total, minimum €10, cap €50. 6 % of a wedding or event,
  taken on each payment. Collected as Stripe Connect application fees on Agorasim's own account.
  Refunds return commission in proportion. Starts with the first live booking. Reviewed at 24
  months. Buy-out by mutual agreement. The instrument is the Commission & Payments Agreement of
  2026-07-27, **unsigned**. Fees run from the first live booking and the agreement is signed
  after go-live (register D17, confirmed by Jamie 2026-10-23).
- **Dates.** Proposal accepted 2026-07-23. Launch plan and information request sent 2026-08-10.
  The client's answers arrived 2026-08-18. The original launch target of 2026-08-24 passed. No
  new date was promised. Go-live happens when Agorasim approves UAT (Jamie, 2026-10-23).
- **Hosting.** Vercel team `kodominio`, Neon org Kodominio, Resend, Sentry: Jamie's accounts,
  paid by Jamie inside the commission. The client owes nothing for them (Jamie, 2026-10-23). The
  agreement says the commission is the only ongoing charge.
- **Support.** No retainer, no SLA. Bugs inside the scope are fixed free. New requests are
  quoted (ways-of-working guide § 6 and § 8, Jamie 2026-10-23).
- **Ownership.** The Stripe account, the domain and the customer data are Agorasim's. The code
  is in Jamie's repo.
- **Dead.** The July proposal "Digital Growth Platform" at €7,900. Gift vouchers, a review wall
  and a referral programme are not in scope (register D2, D13). A connection that loads Google
  reviews on the experience page is in, as the minimum (Jamie, 2026-10-23).

## The product and its state

The site and booking platform at `web/` in the client repo: Next.js App Router, Neon Postgres
through Drizzle, Stripe Checkout embedded in the page, Stripe Connect direct charges, Resend,
Vercel. Public pages are prerendered and revalidated hourly. The admin at `/admin` is
Portuguese only, phone-first, with roles, an audit log, GDPR export and erasure, a nightly
backup to a private EU Blob store, and Sentry. Every merge to `main` deploys UAT at
`uat.agorasim.pt`. Production is built from the same commit and held staged. A promotion
publishes it after the client's yes on UAT (`.icm/_shared/promotion.md`). The last production
release is 2026-09-24.

| Feature in the proposal | State on 2026-10-23 | Where |
|---|---|---|
| 1 Website PT/EN + GEO | Shipped. JSON-LD, hreflang, sitemap, `llms.txt`, old-site redirects | `main` |
| 2 AI automated blog | The studio, drafts table and one-tap publish shipped. The first article batch is parked until after go-live (D22). Owed inside the €2,000 (Jamie, 2026-10-23) | `main`, no stub |
| 3 Instant booking via Stripe | Shipped on sandbox keys. Open-by-default calendar, capacity pools, embedded checkout, confirmation, manual and cash bookings from the admin, self-serve cancellation with automatic refund | `main`, `_done/open-calendar`, `_done/embedded-checkout` |
| 4 Social generator + auto-poster | Parked (D22). The auto-poster waits for Instagram and Facebook admin access. Owed inside the €2,000, after go-live | no stub |
| 5 Email & SMS | Email shipped: confirmation, enquiry acknowledgement, day-before reminder, thank-you with review link, message log. SMS deferred to after go-live (D5). Owed | `_done/lifecycle-messages` |
| 6 Custom payment links | Shipped as the quote flow: admin quote builder, token-gated quote page, deposit, balance at T-14 with one reminder at T-7, refunds, event holds on capacity | `_done/quote-flow`, `_done/quote-refund-hardening` |
| Commission engine | Shipped and sandbox-verified. Switches on with the connected account id in Production | `web/src/lib/commission.ts` |
| Go-live | Registrar transfer done. Client Stripe account exists and is connected (Jamie, 2026-10-23). The sending domain on Resend, the Production env and the nameserver switch: not verified from the house. The runbook is the choreography | `.icm/docs/launch-runbook.md` |

Feedback round 1 (Diogo, WhatsApp, 2026-10-12) holds 24 items: 13 on the admin (holds without
payment, cash bookings, closing one driver, the quote builder, balance wording and timing,
payment links for tour requests, add-ons on Óbidos, the dashboard, the sales board layout,
custom payment links, where to see the commission) and 11 on the public site (copy, photos,
layout, the wedding form, open versus private group tours, add-ons on the homepage, reviews).
The items are cut as tickets in the client repo's `.icm/intake/`. Nothing else is open there.

## What stays open

The twelve questions drafted on 2026-08-24 and amended on 2026-08-29 were never sent as a pack.
They are not sent as a pack now (Jamie, 2026-10-23). A ticket that needs one asks it, numbered,
with a default. The state of each:

1. **Big groups.** 14 guests needs three cars and there are two drivers. The site sends parties
   above 8 to an enquiry until answered. Open.
2. **Sharing a car between bookings.** No seat sharing until answered. Feedback item 22 asks for
   "open group tour" wording, so the answer matters now. Open.
3. **Weddings deposit window.** 30 days, a default. Feedback of 2026-10-12 moved the balance
   deadline to 24 h before the event. Open on the deposit window.
4. **Instagram and Facebook admin access.** Gates the auto-poster. Open.
5. **RNAAT number, insurance, invoicing, 24-month retention sign-off.** Gates the privacy and
   terms draft banners. Open.
6. **The domain.** Transferred (Jamie, 2026-10-23). Closed.
7. **PAX and children.** Adults only (client, 2026-09-11, D19). Closed.
8. **Óbidos departure times.** The site says the exact time follows by email. Open.
9. **Manzwine minimum.** 2 adults, by D19. Closed by the same answer.
10. **Automatic refund on cancellation.** Automatic is the default (D7). The client did not
    object in round 1. Open until confirmed.
11. **Photos.** Landed in the repo by 2026-08-27. Round 1 asks for a photo of the two together,
    the cars, and one replacement picture. Open as feedback item 17 and 24.
12. **Wedding Awards badges and photo-session area.** Open.

Also open: the legal entity and NIF for the record, the deposit regime wording for counsel, and
the accountant's answer on how long paid-booking records are kept.
