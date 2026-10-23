---
title: "Commission & Payments Agreement"
kind: agreement
client: agorasim
language: en
date: 2026-07-27
status: unsigned
---

<!-- The commission instrument as written on 27 July 2026, transcribed on 2026-10-23 from
Commission-and-Payments-Agreement.docx at commit 8f3b477 of k0d0minio/agorasim (added to the
repo 2026-07-27, removed from the tree 2026-09-26, register D27). NOT SIGNED by either party.
Signing is deferred: fees run from the first live booking and the agreement is signed after
go-live (register D17, 2026-09-10, confirmed by Jamie 2026-10-23). Written in English: adopted as
written, no translation (Jamie, 2026-10-23). The signature state is recorded in record.md. -->

AGORASIM

# Commission & Payments Agreement

*How booking commissions are calculated, collected and paid through Stripe.*

| | |
|---|---|
| **Between** | **Agorasim** — Diogo & Rita ("the Operator") |
| **And** | **Jamie Nisbet** — booking platform provider ("the Platform") |
| **Covers** | The ongoing commission on bookings taken through the Agorasim website. |

## 1. Purpose

This document sets out, in plain terms, how commission on bookings taken through the Agorasim
website is calculated, collected and paid. It covers only the ongoing commercial arrangement on
bookings — nothing else. It is intended to be simple, transparent, and easy for both sides to
check against the Stripe dashboard at any time.

## 2. The parties and what stays yours

- **The Operator — Agorasim (Diogo & Rita).** Runs the tours and events, sets all guest prices,
  and holds the Stripe account, the domain and all customer data.
- **The Platform — Jamie Nisbet.** Provides and runs the booking system on which the commission
  is earned.

> **Your accounts, your data.** The Stripe account, the domain and all customer data belong to
> Agorasim throughout. The commission is a fee for the service — not a claim on the business.

## 3. How the money flows — Stripe Connect

All bookings are paid by the guest directly into Agorasim's own Stripe account. The Platform is
linked to that account through Stripe Connect. At the moment a guest pays, Stripe automatically
splits the payment:

- **the Platform's commission** (technically, an "application fee") is routed to the Platform;
  and
- **the remainder stays with Agorasim.**

There is no invoicing, no manual transfer, and neither side ever handles the other's money by
hand. Agorasim remains the account holder and merchant of record at all times. Stripe's own
card-processing fee (roughly 1.5% + €0.25 per transaction) is separate from the commission and
is borne by Agorasim, exactly as set out in the accepted proposal.

## 4. Commission on tour bookings

| Rate | Minimum | Maximum (cap) |
|---|---|---|
| **4% of the total the guest pays** | **€10 per booking** | **€50 per booking** |

The 4% follows the **final booking total** — whatever the price, group size or added activities.
Because it's a percentage, the model never needs renegotiating when Agorasim changes its prices.
The €10 floor keeps very small bookings viable; the €50 cap ensures a large private group is
never over-charged.

**Worked examples**

| Booking | Guest pays | Commission |
|---|---|---|
| Couple · one tasting add-on | €150 | €10 (floor) |
| Small-group day · 2 guests | €470 | ≈ €19 |
| Private full day · family of 4 | €900 | €36 |
| Private day + add-ons · group of 6 | €1,400 | €50 (cap) |

## 5. Commission on car hire & events

| Rate | Collected via |
|---|---|
| **6% of the total booking value** | **Custom Stripe payment links** |

Car hire for weddings and events is higher-value and booked further ahead, so it's collected in
two steps:

- **Deposit to reserve the date — 30% of the total**, via a custom Stripe payment link,
  non-refundable inside an agreed window.
- **Balance due 14 days before the event**, collected by a second automatic payment link.

The 6% commission applies to the **total booking value**. It is taken proportionally on each
payment — 6% of the deposit when the deposit is paid, and 6% of the balance when the balance is
paid — so it always nets to exactly 6% of the whole booking. Stripe's processing fee is passed
through as in section 3.

**Worked examples**

| Wedding car hire | Guest pays | Commission (6%) |
|---|---|---|
| Smaller event | €800 | €48 |
| Larger event | €1,500 | €90 |

## 6. When and how the Platform is paid

- **Automatically, at payment.** Because the commission is taken as a Stripe application fee,
  it's collected the moment each payment succeeds. There is no invoice and nothing for Agorasim
  to pay out by hand.
- **Then paid out by Stripe.** The collected commission sits in the Platform's Stripe balance and
  is paid to the Platform's bank on Stripe's standard payout schedule.
- **Refunds return commission.** If a booking is refunded, the matching commission is refunded
  in proportion, so commission is only ever kept on money Agorasim actually keeps.

## 7. No other charges

Commission on bookings is the only ongoing charge from the Platform. There is no monthly fee, no
subscription, no set-up or platform charge, and no lock-in. Stripe's card-processing fee is
Stripe's own cost, not a Platform charge.

## 8. Your safeguards

- **Full transparency.** Every commission taken is visible to both parties in the Stripe
  dashboard, in real time.
- **You set the prices.** Agorasim sets all guest prices freely; the commission simply follows
  the final total, so price changes never require changing this agreement.
- **Buy-out option.** Agorasim may end the commission at any time by mutual agreement on a
  one-off settlement figure, after which bookings run commission-free.
- **Reviewed at 24 months.** The rates are reviewed together 24 months after the first live
  booking, and adjusted by mutual agreement to fit the business as it then stands.

## 9. Term & changes

- **Start.** This arrangement begins with the first live booking taken through the site.
- **Duration.** It continues until ended through the buy-out option or by mutual agreement.
- **Amendments.** Any change to the rates or structure is by written agreement of both parties.

## 10. Summary

| Item | Terms |
|---|---|
| Tour bookings | 4% of the booking total · minimum €10 · capped at €50 |
| Car hire & events | 6% of the booking value · 30% deposit + balance 14 days before the event |
| How it's collected | Automatically via Stripe Connect at the moment of payment (application fee) |
| Stripe processing | ≈1.5% + €0.25 per transaction — Stripe's own fee, borne by Agorasim |
| Ongoing platform fees | None — no monthly fee, no subscription, no lock-in |
| Your control | Your Stripe account, domain & data · buy-out any time · reviewed at 24 months |

**Agreed by both parties:**

| Diogo & Rita, for Agorasim | Jamie Nisbet, Platform provider |
|---|---|
| Signature: not signed | Signature: not signed |
| Date: — | Date: — |
