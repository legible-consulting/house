# Berceo: client profile

Prepared 2026-10-23, seven weeks into the build, from the house record (`clients/berceo/record.md`),
the legacy deal workspace (`~/Desktop/Apps/workspaces/deals/berceo/`: `DEAL.md`, the internal
quote of 2026-08-27, the devis, the agreement draft of 2026-09-23), the client repo
`k0d0minio/berceo` on `main` at 920f735 (`CLAUDE.md`, `README.md`, `.icm/docs/REPORT.md`,
`.icm/docs/QUESTIONS.md`, `.icm/intake/`), the Drive folders `berceo` and `Berceo` and Surya's two
packs (read as listings), and the founders' feedback round 1 of 2026-10-23. The first part is what
the founders said. The second part is the company. The third part is the product and its state.
The fourth part is what this profile cannot tell. Jamie answered the open points on 2026-10-23.

## What the founders said

- **The cahier des charges, annotated, and the 40-page answers (2026-08-27).** The founders
  declared both the source of truth. The answers win where the two disagree. Out of V1: itsme,
  Stripe Connect, escrow, gift cards, professional subscriptions, the price slider (a floor and
  no ceiling instead), a map (zone and radius instead), per-commune SEO pages, Dutch and English,
  written reviews, AI document triage. In: four family subscriptions with prices, a credit ledger,
  a cancellation and no-show rule table, an availability calendar, 2FA, dual-sided star ratings on
  four criteria, an admin action log. Full detail: `quote/negotiation.md` § What the answers changed.
- **Who they are and why (feedback round 1, 2026-10-23).** Two midwives. Berceo exists because
  young parents are well surrounded until night falls. A night of care is a relay, not a medical
  act. Asking for help does not make a worse parent. The text is theirs, in the first person, for
  the « Qui sommes-nous » page.
- **What the site must say (feedback round 1).** « La première plateforme belge à mettre en
  relation des familles avec des professionnel/les de santé diplômées (et en fin de formation),
  pour des nuits de repos à domicile, avec autant de compétence que de douceur. » Two « comment ça
  marche » pages, one per side. The tariff page with the four subscriptions and their prices, plus
  the 3 % fee. A charter of 17 commitments every professional accepts, readable by parents.
- **What the request must carry (feedback round 1).** The night's full address, extra hours
  beyond the 11-hour night, triplets, the children's age, their feeding, one-off or regular
  nights, and an optional reason for the request with a no-medical-data notice.
- **What the professional's file must do (feedback round 1).** Third-year and fourth-year
  midwifery students as two entries. Free-text « formations complémentaires » instead of a list.
  A radius in kilometres around the zone. A floor on the night rate and no ceiling. No experience
  field. The blocking field shown in red. The INAMI number must never block. A new sworn
  declaration on a change of situation.
- **On money (the answers, as read in the quote).** They fund the build from personal savings.
  Their stated ceiling was €14,000, with no separate budget for a lawyer, insurance or running
  costs. They raised equity for Jamie's post-launch involvement themselves.

## The company

| Fact | Value | Source |
|---|---|---|
| Legal name | Berceo SRL | `DEAL.md`, the internal quote |
| Company number | BCE 0801 875 541 | the internal quote, the agreement draft (not checked on the KBO) |
| Founders | Alix Hahusseau and Jordane (surname not on file), two midwives | `DEAL.md`, feedback round 1 |
| Who decides | Both, together, by e-mail | `DEAL.md` |
| Contact | Alix: +32 491 12 25 44. No e-mail address on file | the internal quote, Jamie 2026-10-23 |
| Brand agency | Surya: Chloé Sanfilipo (editorial and SEO guide, kick-off brief of 2026-09-11), Romane (logo pack, brand identity, web art direction, image bank) | Drive listings |
| Domains | berceo.be, berceo.eu. Transfer from the previous developer done. DNS managed by Jamie. Registrar not on file | the devis, Jamie 2026-10-23 |
| Funding | Personal savings. No lawyer, insurance or running-cost budget at quote time | the internal quote [3.1 to 3.3] |
| Revenue | None. The platform is not launched | `record.md` |
| Insurance | No contract exists. The site carries no insurance wording (D-8) | the internal quote, repo `CLAUDE.md` |
| Legal | Chapter 5 of the discovery questionnaire (ONE declaration, platform-work directive, collaborative economy, DAC7, CGU, DSA, P2B, accessibility) unanswered. A written opinion is a launch condition | the internal quote, the agreement § 9 |

## People

| Person | Role | For us |
|---|---|---|
| **Alix Hahusseau** | Co-founder, midwife. Signs for Berceo SRL | Decides with Jordane. The phone contact |
| **Jordane** | Co-founder, midwife. Signs for Berceo SRL. Surname to complete on the agreement | Decides with Alix |
| **Chloé Sanfilipo** (Surya) | Editorial and SEO guide. Ran the kick-off brief of 2026-09-11 | Every word on the site follows her guide (D-19). The `@relecture` tags in `src/content/` are the list to send her |
| **Romane** (Surya) | Brand identity, logo pack, web art direction, image bank | Every pixel follows the art direction (D-9). The Comodo font is not delivered: Fraunces stands in |
| **Jamie Nisbet** | Builds alone. Owns the repo, the Vercel team, the Neon projects, the merge and the promotion to production | 5 h/week, continuous development, revisions not counted |

## The product

Berceo is a two-sided platform. A family of a newborn publishes a request for a night of care at
home. Verified health professionals who serve her commune answer. The family picks one. The two
talk in a private conversation until the garde. Berceo never touches the money for the night. It
charges a 3 % service fee when the family confirms. The founders check every professional's file
by hand before her profile is visible. After the garde both sides leave stars.

What exists on `main` at 920f735 (2026-10-22), from the repo's `README.md` and `.icm/intake/_done/`:

- **The vitrine.** `/`, `/comment-ca-marche`, `/tarifs`, `/faq`, with `/qui-sommes-nous` and the
  two legal pages as `noindex` placeholders. Indexed on production only. Surya's art direction as
  tokens, WCAG AA inks. No contact shown: Berceo has no published address.
- **Accounts** on Neon Auth, e-mail on Resend. Family sign-up, professional sign-up, consent
  ledger. No 2FA. An e-mail address cannot be changed (a Neon Auth limit).
- **The professional's file.** Four steps: account, profile (profession, specialisations from a
  list, communes served, night rate 100 to 300 €, experience, bio, photo), documents (diploma or
  attendance certificate, INAMI number for midwives and nurses), five sworn declarations. Private
  storage on Neon Object Storage. The founders validate, ask for more or refuse. Refused files are
  purged after 30 days.
- **The request.** Date, start time 18:00 to 23:00, one baby or twins, age, the commune from the
  profile. The exact address is never on the request (D-15). Urgent requests e-mail every
  professional of the commune at once. Normal ones go in a daily digest.
- **The answer and the booking.** A professional answers. The family compares and books one. The
  address is revealed after confirmation. A priority request to a known professional. Republishing.
- **The garde's life.** States by the clock. Cancellation by either side with the fee rule.
  Absence reports. The reminder of the day before.
- **The service fee.** Stripe Checkout for the 3 % fee, Bancontact and cards. Refund on the
  professional's cancellation. The founders' list of fees. A test key on UAT. No live account yet.
- **Messaging, availability, ratings, search.** One conversation per answered request. An
  indicative calendar. Dual-sided stars on four criteria. Search by commune. Public teaser pages
  per professional and per commune.
- **The back-office.** Overview, account search, suspend, reactivate, delete, contact, the lists,
  the admin journal.
- **Not built.** The four family subscriptions (D-3 took them out of the first cut), the credit
  ledger and the full cancellation table, 2FA, the radius, extra hours, recurrence.

Stack: Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Drizzle on Neon Postgres,
Neon Auth, Neon Object Storage, Resend, Stripe, Vercel (team `kodominio`, project `berceo`). The
repo follows the blueprint at tag v0.6.0 (tier `app`). Every merge deploys UAT. Production moves
on a promotion Jamie records. One production release so far, 2026-09-24.

### The backlog on 2026-10-23

Six epics shipped (`plateforme-v1`, `finition-accueil`, `comptes-auth-recuperation`,
`onboarding-fichiers-concurrence`, `professionnelle-invalidee-consequences`,
`back-office-admin-dedup`). Two epics had one open stub each and eleven one-off stubs waited in
`triage/`. Jamie decided on 2026-10-23 that feedback round 1 replaces that backlog whole. The new
epics live in `.icm/intake/` in the client repo.

## The engagement as agreed

- **Shape.** `kind: build`: €7,500 fixed, 5 h/week guaranteed, no revision count. It reaches
  `handover` when the last release is merged. Support after go-live is a separate conversation
  before the soft launch: a monthly retainer or equity. Nothing is agreed (Jamie, 2026-10-23).
- **Money.** €4,500 invoiced to date: the €3,750 deposit and a €750 invoice sent early. €3,000
  remains, due at the earlier of 25 active family subscriptions with 25 confirmed bookings, or 120
  days after go-live (`quote/economics.yaml`).
- **Hosting.** Jamie's accounts, rebilled at cost, capped at €50 a month during development.
  Nothing invoiced yet. Stripe in Berceo's name, not created yet. The e-mail sender is on Jamie's
  domain until a berceo.be sender exists.
- **Dates.** Work started in September 2026. Soft launch mid-December 2026, public push January
  2027 (the agreement). The agreement is drafted, rendered in Drive, not sent, not signed.
- **Rhythm.** Continuous development at 5 h/week. The founders test on `uat.berceo.be` and send
  their feedback as a document. The feedback becomes epics in the client repo. A feedback request
  supersedes an earlier requirement, except the insurance wording, which waits for a contract
  (Jamie, 2026-10-23).
- **Who decides what.** The founders decide what the product says and does. Surya owns the words
  and the look. Jamie owns the stack, the repo, the estate, the merge and the promotion.
- **Launch conditions that are not Jamie's.** The written legal opinion on chapter 5. The
  insurance contract. The legal texts (CGU, privacy, cookies). The Stripe account in Berceo's
  name. The Comodo font files.

## What this profile cannot tell

- Jordane's surname and the founders' e-mail addresses.
- Who holds the registrar of berceo.be and berceo.eu.
- Whether a lawyer is engaged on chapter 5, and whether the insurance contract moved.
- Whether the subscription prices of the devis (24,90 · 59,90 · 94,90 · 159,90 €) still stand.
  Feedback round 1 asks for « les abonnements avec le nom des abonnements et les prix » and names
  no number.
- What the founders think of the radius versus the communes served (D-11), and of the 130 €
  floor without a ceiling on the public pages.
