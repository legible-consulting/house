---
slug: berceo
name: Berceo
language: fr-BE
stage: build
kind: build
opened: 2026-08-10
next_action: Implement the changes the founders asked for in feedback round 1 (the epics cut in the client repo on 2026-10-23). Send the agreement for eSignature.
deadline:
salesman:
commission:
  sourced_by:
  owed:
repo: k0d0minio/berceo
owner: jamie
vercel_project:
  - kodominio/berceo
collaborators: []
drive: https://drive.google.com/drive/folders/1HsJzJbG0QlAfYn_22a5m0Nbke5Sprlid
agreement_drive: https://drive.google.com/file/d/1t651NjXy7c_Pfa5SsgUDF5hl9YzwpMzZ/view
agreement_signed: false
---

# Berceo

A Belgian marketplace connecting parents of newborns with professionals who take overnight
post-partum care shifts. We are building the French-language public site and the signed-in
spaces for families, professionals and the founders, with bookings, messaging, ratings and a
Stripe service fee.

## Who they are

Berceo SRL, BCE 0801 875 541. Two midwives, Alix Hahusseau (+32 491 12 25 44) and Jordane
(surname not on file), decide together, by e-mail. Their brand, art direction and editorial
guide come from the agency Surya (Chloé Sanfilipo, Romane), shared in Drive (`research/profile.md`).
Jamie's own contact: no salesman, no commission.

## What was agreed

- The devis of 27 August 2026 (`quote/quote.md`), accepted the same day: €7,500 fixed for the
  full V1, 5 h/week guaranteed over 16 weeks, start 7 September 2026. The cahier des charges and
  the founders' 40-page answers are the source of truth for the scope.
- Payment: €3,750 at the start, paid. €3,750 at the earlier of two events: the platform is online
  with 25 active family subscriptions and 25 confirmed bookings, or 120 days after go-live. A
  second invoice of €750 went out early, on top of the deposit (Jamie, 2026-10-23). The balance at
  the trigger is therefore €3,000 (`quote/economics.yaml`).
- Hosting: Jamie's accounts (Vercel, Neon, Resend, the domains), rebilled at cost, capped at
  €50 a month during development. Nothing invoiced yet. Stripe is to be in Berceo's name. The
  account does not exist yet.
- Support after go-live is not in the price. It is renegotiated before the soft launch, as a
  monthly retainer or as equity. Nothing is agreed (Jamie, 2026-10-23).
- The agreement (`agreement/agreement.md`, drafted 2026-09-23, rendered in Drive) restates the
  devis and sets the dates: a soft launch in mid-December 2026, the public push in January 2027.
  It is not sent and not signed. The work began in September 2026 without it.
- A written legal opinion on chapter 5 of the discovery questionnaire is a launch condition, not
  a build condition. It is still unanswered. The criminal-record extract 596.2 is not stored
  until that opinion exists.

## Where the build stands

- The client repo `k0d0minio/berceo` (Next.js, Neon, Vercel) follows the blueprint at tag v0.6.0
  since 2026-10-22. UAT is `uat.berceo.be`, production `www.berceo.be`. One production release,
  2026-09-24.
- The V1 epic (15 stubs) and five follow-up epics shipped between September and October 2026
  (`kickoff/kickoff-note.md`).
- The founders' feedback round 1 (Drive, `feedback-round-1.pdf`, 2026-10-23) replaces the open
  backlog whole: the new epics live in `.icm/intake/` in the client repo. A feedback request
  supersedes an earlier requirement, except the insurance wording (Jamie, 2026-10-23).

## Links

- Client folder in Drive: https://drive.google.com/drive/folders/1HsJzJbG0QlAfYn_22a5m0Nbke5Sprlid
- Feedback round 1: https://drive.google.com/file/d/17E9u2wpXQnE1sBZmLuC6TMlrGie1ddv8/view
- The rendered agreement: https://drive.google.com/file/d/1t651NjXy7c_Pfa5SsgUDF5hl9YzwpMzZ/view
- Surya's packs: https://drive.google.com/drive/folders/1zodClGUQPb6uLrbDHD_sZXzV3xmAmFFS (logos),
  https://drive.google.com/drive/folders/1_vfYH9Ln-9qQ_EY0h1nx1opwNxW80nE8 (web pack)
- The client repo: https://github.com/k0d0minio/berceo
