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
  Jamie sends to the prospects he added. `sourced_by` in `prospect.md` says who.
- A salesman sends from their own email, phone or WhatsApp, or in person. The desk sends
  nothing.
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
logged with its channel. LinkedIn is not a channel.

Three rules for a business that did not ask to hear from us, from `legitimate-interest.md`:

- A first touch by email or WhatsApp goes to a role address at a company: `geral@`, `info@`,
  the switchboard, the shop's own WhatsApp. A sole trader, or a named person's own mailbox or
  number, is approached by phone or in person first. Email and WhatsApp open after they engage.
- The first email or WhatsApp carries the two lines at the end of
  `pitch/1-opener.<language>.md`: where we found them, and that one reply stops it. The sender
  fills in where.
- A no is permanent for the company, on every channel. Press "They asked not to be contacted"
  on the row's page: the row goes to `lost` with the reason `asked not to be contacted`, its
  next action is cleared, and its email, phone and WhatsApp number go on the desk's no-contact
  list. One number closes the phone and WhatsApp. The desk and the pool API then refuse a row
  with that email or number, and nothing takes it off the list. Before adding a row, search the
  pool for the company: a company with that reason on a `lost` row is not added again, by any
  salesman.

## When a lead is lost

Either one, and `lost_reason` is required:

- The prospect says no.
- The cadence ran out, and 7 more days passed with no reply. The desk lists the row as due for
  `lost` on day 28. The salesman sets it.

`lost` is final for the row. A new approach is a new row that names the old one in `source`,
except after a row lost as `asked not to be contacted` (Channels): that company gets no new
row.
