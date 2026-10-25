---
title: Cadence
kind: cadence
owner: jamie
date: 2026-10-19
---
# Cadence — the touches, the channels, and when a lead is lost

One home for how a prospect is approached. The desk computes `next_action` from it. From
Jamie's answers of 2026-10-19 (wave step E1).

## Who sends

- The person who added the prospect sends to it. A salesman sends to the prospects they added.
  Jamie sends to the prospects he added. `sourced_by` in `prospect.md` says who (why: the
  sender owns the thread, and a thread with two senders confuses the prospect · 2026-10-19).
- A salesman sends from their own email, phone or WhatsApp, or in person. The desk sends
  nothing (why: the boundary. Nothing reaches a client from the house. A salesman's own account
  is their own · 2026-10-19).
- The sender adapts the draft for the touch from `pitch/<touch>.<language>.md` in their own
  mailbox. The adapted message is not stored. The touch log records that it was sent.

## Three touches over three weeks

Each touch is a different angle, not a repeat. The day counts from the first touch.

| Touch | Day | Angle |
|---|---|---|
| 1 · opener | 0 | Why them. One thing seen in their business. One question. |
| 2 · follow-up | 7 | New angle. One example of similar work, or one concrete suggestion. |
| 3 · last note | 21 | Say that it is the last note. Leave the door open. |

The desk sets `next_action` to the next touch's date after each logged touch. The salesman may
move it. A reply stops the cadence. From `replied` on, the salesman sets `next_action` by hand.

## Channels

Email, phone, WhatsApp, and in person (the Mafra network, events, a visit). Each touch is
logged with its channel. LinkedIn is not a channel (why: Jamie's answer · 2026-10-19).

## When a lead is lost

Either one, and `lost_reason` is required:

- The prospect says no.
- The cadence ran out, and 7 more days passed with no reply. The desk lists the row as due
  for `lost` on day 28. The salesman sets it (why: a status is a salesman's call, never the
  desk's · 2026-10-19).

`lost` is final for the row (why: the reason is the record, and a reopened row loses it).
A new approach is a new row that names the old one in `source`.
