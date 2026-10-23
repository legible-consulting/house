---
slug: agorasim
name: Agorasim
language: pt-PT
stage: build
kind: build
opened: 2026-07-01
next_action: Cut feedback round 1 (12 Oct 2026) into tickets in the client repo, build them, and put each on UAT for Diogo and Rita to test. Go-live follows their approval of UAT.
deadline:
salesman:
commission:
  sourced_by:
  owed:
repo: k0d0minio/agorasim
owner: jamie
vercel_project:
  - kodominio/agorasim
collaborators: []
drive: https://drive.google.com/drive/folders/1A4J_ye0pH6_aQz-m5vYgCDiM-xjn4y2K
---

# Agorasim

Diogo Trajano and Rita run Agorasim: guided classic-car tours of the Saloia region (Sintra,
Mafra, Ericeira), an Óbidos and medieval villages food tour, and classic cars for weddings and
events. Four cars (Citroën 2CV, Renault 4L, Fiat 600, VW T3) and two drivers. Jamie's own
contact, no salesman. The profile is in `research/profile.md`.

**What was agreed.** The proposal of 23 July 2026, "Digital Platform, Booking & Commission
Partnership", was accepted the same day: six features valued €5,900 for a flat €2,000, paid in
full (Jamie, 2026-10-23), plus a commission on bookings. The commission is 4 % of a tour booking
(minimum €10, cap €50) and 6 % of a wedding or event, taken as Stripe Connect application fees
on Agorasim's own Stripe account, from the first live booking. The commission instrument, the
Commission & Payments Agreement of 27 July 2026, is **not signed**. Signing waits until after
go-live (register D17 in the client repo, 2026-09-10). Both documents are adopted in `proposal/`
and `agreement/`, in English as sent. The price is in `quote/economics.yaml`. There is no
support contract: bug fixes are free, new requests are quoted (Jamie, 2026-10-23).

**Where the build stands (2026-10-23).** The code on `main` is launch-complete: the bilingual
site, booking with embedded Stripe Checkout, the commission engine, guest cancellation, the
quote flow for weddings and events with deposit and balance, lifecycle emails, the Portuguese
phone-first admin, nightly backups and Sentry. Every merge deploys UAT at `uat.agorasim.pt`,
where Diogo and Rita test. Production is staged and moves by a promotion. The last production
release is 2026-09-24. `agorasim.pt` still serves the old site on purpose. The registrar
transfer from Amen is done and the zone sits at Vercel DNS (Jamie, 2026-10-23). The client's
Stripe account exists and is connected to the platform (Jamie, 2026-10-23). Go-live happens
when Agorasim approves UAT. No date is set. Feedback round 1 arrived on 12 October 2026 as a
WhatsApp export from Diogo, 24 items ([feedback-round-1.pdf](https://drive.google.com/file/d/1ho3ayC_BSKjFM-pK-9eG-MDGgEJjayu9/view)).
Its tickets are the open backlog in the client repo's `.icm/intake/`. The blog batch, the social
poster and SMS stay owed inside the €2,000, after go-live (Jamie, 2026-10-23). The twelve
questions drafted for the client in August 2026 were never sent as a pack: they are open points
in `research/profile.md`, and a ticket asks the ones it needs.

**Where things are.** Drive: the folder above. Code, tickets, runbook and register:
[k0d0minio/agorasim](https://github.com/k0d0minio/agorasim) (`.icm/intake/`,
`.icm/docs/launch-runbook.md`, `.icm/project.md`). Hosting: Vercel team `kodominio`, Neon org
Kodominio (projects `agorasim` and `uat-agorasim`), Resend and Sentry, all Jamie's, paid by
Jamie inside the commission (Jamie, 2026-10-23). Secret names in `kickoff/access-table.md`.
