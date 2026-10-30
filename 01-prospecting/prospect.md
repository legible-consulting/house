---
title: Prospect
kind: schema
owner: jamie
date: 2026-10-29
---
# Prospect — the pool row

One home for the fields of a prospect, the pool statuses, the handoff mapping into
`clients/<slug>/record.md`, and the salesman's deal. The desk implements this schema.
A prospect lives in the desk's pool until its handoff commit lands on `main`. From then on the
client folder is the record (`clients/CONTEXT.md`). From Jamie's answers of 2026-10-19 (wave step E1).

## Fields

`required` says when the field must be filled: `add` at the moment the row is created, `ready`
before the salesman may set `ready for Jamie`, `meeting` when the status is set to `meeting`, `lost`
when the status is set to `lost`, or `no`.

| Field | Type | Required | Set by |
|---|---|---|---|
| `slug` | kebab-case text, unique in the pool and against `clients/*/record.md` | add | the desk, from `company`. The sourcer may edit it until handoff. |
| `company` | text | add | the sourcer |
| `contact` | text, the person's name | ready | the sourcer |
| `role` | text | no | the sourcer |
| `email` | text | ready, this or `phone` | the sourcer |
| `phone` | text, with country code | ready, this or `email` | the sourcer |
| `whatsapp` | text, a number with country code. The row's page links it to `wa.me` | no | the sourcer |
| `instagram` | text, the handle in lower case, without `@`. The row's page links it to `instagram.com` | no | the sourcer |
| `website` | URL | no | the sourcer |
| `country` | `PT`, `BE`, `GB`, or another ISO 3166-1 alpha-2 code | ready | the sourcer |
| `language` | `pt-PT`, `fr-BE`, `en-GB` | ready | the sourcer |
| `line` | `local`, `sme` (`target-profile.md`) | no | the sourcer |
| `size` | `1`, `2-9`, `10-49`, `50+` (headcount) | no | the sourcer |
| `service` | a line of `core/services.md`: `site`, `app`, `platform`, `workshop`, `coaching`, `retainer`, `geo`, `landing-page`, `automation`, `ai-infrastructure`, `ai-consultancy`, `project-management`, `software`, `lead-gen`; or `unknown` | no | the sourcer |
| `deal_size` | `<2k`, `2k-10k`, `10k-30k`, `>30k` (EUR, a hint only, Jamie quotes) | no | the sourcer |
| `source` | text, how the prospect was found: who referred, which event, which `targets/` list | add | the sourcer |
| `sourced_by` | `jamie` or a salesman's handle (`users.handle`) | add | the desk, from the signed-in user. A salesman without a handle cannot set `ready for Jamie` (why: the record names the salesman by handle, and the monthly close reads it · 2026-10-26). |
| `ask` | text, one paragraph in the sourcer's words: what they asked for | ready | the sourcer |
| `status` | one of the statuses below | add, as `new` | the sourcer. The desk sets `handed off`. |
| `touches` | list of `{date, channel, note}`. `channel` is `email`, `phone`, `whatsapp`, `in person` | ready, at least one | the sourcer |
| `next_action` | date | no | the desk, from `cadence.md`. The sourcer may edit it. |
| `notes` | text | no | the sourcer |
| `meeting_at` | a date and a time, stored with its zone and shown in Jamie's time zone, Europe/Lisbon | meeting | the sourcer, at the move to `meeting` or in the row's Meeting fields |
| `meeting_with` | `sourcer` or `jamie`: who takes the meeting | meeting | the sourcer |
| `meeting_where` | text: a place, a phone number or a link | no | the sourcer |
| `lost_reason` | text | lost | the sourcer |
| `record` | path, `clients/<slug>/record.md` | no | the desk, in the request that commits the handoff to `main` |
| `added` | date | add | the desk |
| `updated` | date | no | the desk, on every write |

The sourcer is the user named in `sourced_by`. Only the sourcer and Jamie write a row. Every
other salesman reads it (why: a row has one owner, and a salesman sees the whole pool so two
salesmen never approach one company · 2026-10-19).

## Statuses

The list is defined in `clients/CONTEXT.md` and copied here unchanged:
`new` → `contacted` → `replied` → `meeting` → `ready for Jamie` → `handed off` or `lost`.

| Status | True at this status | Who sets it |
|---|---|---|
| `new` | The row exists. No touch is logged. | the desk, at add |
| `contacted` | At least one touch is logged. No reply yet. | the sourcer |
| `replied` | The prospect answered. | the sourcer |
| `meeting` | A meeting is booked or held, with the sourcer or with Jamie. `meeting_at` and `meeting_with` are set. | the sourcer, with `meeting_at` and `meeting_with` |
| `ready for Jamie` | Every `ready` field is filled. The handoff is being committed, or its commit failed and nothing is on `main`. | the sourcer, from `replied` or `meeting`, and again from `ready for Jamie` after a failed commit |
| `handed off` | The handoff commit is on `main`. The commit is the handoff. The row is read-only. `record` is set. | the desk, in the same request as the commit (why: Jamie's word, a constrained and structured salesman action goes straight to `main`; the commit proves the handoff, so no click waits on it · Jamie, 2026-10-29). |
| `lost` | The prospect said no, or went silent past the cadence. `lost_reason` is set. | the sourcer, from any status except `handed off` |

A no is set with "They asked not to be contacted" on the row's page, by the sourcer or Jamie:
`lost` with `lost_reason` `asked not to be contacted`, `next_action` empty, and the row's
`email`, `phone` and `whatsapp` on the desk's no-contact list for good. A row is not added, and
a row's `email`, `phone` or `whatsapp` is not changed, to an address or a number on that list
(`cadence.md`, Channels). The `instagram` handle is not on the list: Instagram is not a channel.

A row at `new`, `contacted` or `lost` whose last touch, or its `added` date when it has no
touch, is older than 12 months is cleared by `desk/app/scripts/pool-purge.mjs`, which Jamie
runs by hand: `contact`, `email`, `phone`, `whatsapp`, `instagram`, `website`, `ask` and
`notes` are emptied, and the touches lose their notes. `company`, `country`, `line`, `source`, `lost_reason` and the dates
stay (why: the data of a row nobody works is the data the row no longer needs ·
`legitimate-interest.md` §5 · 2026-10-26).

A handoff Jamie does not take stays `handed off` in the pool: he reverts the commit, or moves
the folder to `lost`, and writes his reason in the record (`01-prospecting/CONTEXT.md`, The
handoff) (why: the folder is the record from the commit on · 2026-10-29).

## Handoff mapping

`ready for Jamie` makes one commit on `main` that creates `clients/<slug>/record.md` from
`clients/_template/record.md` (`01-prospecting/CONTEXT.md`, The handoff). The commit fills the
template as follows. Every field not named
here keeps the template's value.

| `record.md` | From the row |
|---|---|
| `slug` | `slug` |
| `name` | `company` |
| `language` | `language` |
| `stage` | `prospect` |
| `opened` | the date of the handoff commit |
| `next_action` | `meeting_at`'s date when `meeting_with` is `jamie` and the date is ahead, else `next_action` |
| `salesman` | `sourced_by`, or empty when it is `jamie` |
| `commission.sourced_by` | `sourced_by` |
| `commission.owed` | empty. Jamie sets it from the first agreement. |
| body, heading | `company` |
| body, paragraph 1 | `ask` |
| body, paragraph 2 | one line: `Sourced by <sourced_by> via <source>. <n> touches, last on <date>. Contact: <contact>, <role>, <email or phone>, <country>.` |

In paragraph 2, one touch reads `1 touch`. `<date>` is the date of the latest touch. `<email or
phone>` is the email, or the phone when the row has no email. An empty part of `Contact:` is left
out with its comma (why: `role` is optional, and the record must not read `, ,` · 2026-10-26).

When `meeting_at` is set, paragraph 2 ends with `Meeting with Jamie on <date> at <time>, <where>.`
when `meeting_with` is `jamie`, or `Meeting with <sourced_by> on <date> at <time>, <where>.` when
it is `sourcer`. `<date>` and `<time>` are in Jamie's time zone. An empty `<where>` is left out
with its comma. When the meeting with Jamie is ahead, `next_action` is its date, so the glance
shows it from the handoff on (why: a meeting a salesman booked for Jamie is the client's first next
action · 2026-10-28).

## The salesman's deal

- A salesman is independent and paid on commission only. No salary, no retainer. One at
  first, more later. Each has a short handle, used in `sourced_by` and in `record.md`
  `salesman:` (why: Jamie's answer · 2026-10-19).
- The commission is 10% of the amount invoiced under the first signed agreement of a deal
  the salesman sourced, net of VAT, hosting and third-party costs. Follow-on work and retainer
  months after the first agreement pay nothing (why: Jamie's answer · 2026-10-19).
- Jamie writes the total into `record.md` `commission.owed` when the first agreement is
  signed (the agreement). It is owed as the client pays, in proportion to each paid invoice. Nothing is
  owed on an unpaid invoice. The monthly close lists the commission owed per deal, and Jamie
  settles it against the payments, which are handled outside the house (why: Jamie's answer ·
  2026-10-19; invoices left the house · 2026-10-22).
- In the desk a salesman sees: this folder's `kit.<language>.md` and `pitch/`, read-only.
  `target-profile.md`, `cadence.md` and this file are the house's model, read by the kit's
  author; the kit carries what a salesman needs from them, in their language. Where the kit
  and a model file disagree, the model wins and the kit is fixed (why: one document in one
  language · 2026-10-28). Every row of the pool, others' rows read-only. For a deal they sourced, the
  `stage` of the client folder up to `agreement`, and nothing after it, no documents. Their
  own commission only, never another salesman's (why: Jamie's answer, from interview round
  R11 · 2026-10-19).
