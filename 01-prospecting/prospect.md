---
title: Prospect
kind: schema
owner: jamie
date: 2026-10-19
---
# Prospect — the pool row

One home for the fields of a prospect, the pool statuses, the handoff mapping into
`clients/<slug>/record.md`, and the salesman's deal. The desk implements this schema.
A prospect lives in the desk's pool until Jamie merges its handoff PR. From then on the client
folder is the record (`clients/CONTEXT.md`). From Jamie's answers of 2026-10-19 (wave step E1).

## Fields

`required` says when the field must be filled: `add` at the moment the row is created, `ready`
before the salesman may set `ready for Jamie`, `lost` when the status is set to `lost`, or `no`.

| Field | Type | Required | Set by |
|---|---|---|---|
| `slug` | kebab-case text, unique in the pool and against `clients/*/record.md` | add | the desk, from `company`. The sourcer may edit it until handoff. |
| `company` | text | add | the sourcer |
| `contact` | text, the person's name | ready | the sourcer |
| `role` | text | no | the sourcer |
| `email` | text | ready, this or `phone` | the sourcer |
| `phone` | text, with country code | ready, this or `email` | the sourcer |
| `website` | URL | no | the sourcer |
| `country` | `PT`, `BE`, `GB`, or another ISO 3166-1 alpha-2 code | ready | the sourcer |
| `language` | `pt-PT`, `fr-BE`, `en-GB` | ready | the sourcer |
| `line` | `local`, `sme` (`target-profile.md`) | no | the sourcer |
| `size` | `1`, `2-9`, `10-49`, `50+` (headcount) | no | the sourcer |
| `service` | `site`, `app`, `platform`, `workshop`, `coaching`, `unknown` | no | the sourcer |
| `deal_size` | `<2k`, `2k-10k`, `10k-30k`, `>30k` (EUR, a hint only, Jamie quotes) | no | the sourcer |
| `source` | text, how the prospect was found: who referred, which event, which `targets/` list | add | the sourcer |
| `sourced_by` | `jamie` or a salesman's handle (`users.handle`) | add | the desk, from the signed-in user. A salesman without a handle cannot set `ready for Jamie` (why: the record names the salesman by handle, and the monthly close reads it · 2026-10-26). |
| `ask` | text, one paragraph in the sourcer's words: what they asked for | ready | the sourcer |
| `status` | one of the statuses below | add, as `new` | the sourcer. The desk sets `handed off`. |
| `touches` | list of `{date, channel, note}`. `channel` is `email`, `phone`, `whatsapp`, `in person` | ready, at least one | the sourcer |
| `next_action` | date | no | the desk, from `cadence.md`. The sourcer may edit it. |
| `notes` | text | no | the sourcer |
| `lost_reason` | text | lost | the sourcer |
| `record` | path, `clients/<slug>/record.md` | no | the desk, at "Check the PR" on the row's page after Jamie merges the handoff PR |
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
| `meeting` | A meeting with the sourcer is booked or held. | the sourcer |
| `ready for Jamie` | Every `ready` field is filled. The handoff PR is open. | the sourcer, from `replied` or `meeting` only |
| `handed off` | Jamie merged the handoff PR. The row is read-only. `record` is set. | the desk, at "Check the PR" on the row's page. The sourcer, Jamie or another salesman clicks it. The desk does not watch the PR (why: one read at a click, and no webhook to keep · 2026-10-26). |
| `lost` | The prospect said no, or went silent past the cadence. `lost_reason` is set. | the sourcer, from any status except `handed off` |

A no is set with "They asked not to be contacted" on the row's page, by the sourcer or Jamie:
`lost` with `lost_reason` `asked not to be contacted`, `next_action` empty, and the row's
`email` and `phone` on the desk's no-contact list for good. A row is not added, and a row's
`email` or `phone` is not changed, to an address or a number on that list (`cadence.md`,
Channels).

A row at `new`, `contacted` or `lost` whose last touch, or its `added` date when it has no
touch, is older than 12 months is cleared by `desk/app/scripts/pool-purge.mjs`, which Jamie
runs by hand: `contact`, `email`, `phone`, `website`, `ask` and `notes` are emptied, and the
touches lose their notes. `company`, `country`, `line`, `source`, `lost_reason` and the dates
stay (why: the data of a row nobody works is the data the row no longer needs ·
`legitimate-interest.md` §5 · 2026-10-26).

A row at `ready for Jamie` whose PR Jamie closes without a merge returns to its previous
status at "Check the PR". Jamie writes his reason in `notes` by hand: the desk does not copy it
from the PR.

## Handoff mapping

`ready for Jamie` opens one PR that creates `clients/<slug>/record.md` from
`clients/_template/record.md`. The PR fills the template as follows. Every field not named
here keeps the template's value.

| `record.md` | From the row |
|---|---|
| `slug` | `slug` |
| `name` | `company` |
| `language` | `language` |
| `stage` | `prospect` |
| `opened` | the date the PR is opened |
| `next_action` | `next_action` |
| `salesman` | `sourced_by`, or empty when it is `jamie` |
| `commission.sourced_by` | `sourced_by` |
| `commission.owed` | empty. Jamie sets it from the first agreement. |
| body, heading | `company` |
| body, paragraph 1 | `ask` |
| body, paragraph 2 | one line: `Sourced by <sourced_by> via <source>. <n> touches, last on <date>. Contact: <contact>, <role>, <email or phone>, <country>.` |

In paragraph 2, one touch reads `1 touch`. `<date>` is the date of the latest touch. `<email or
phone>` is the email, or the phone when the row has no email. An empty part of `Contact:` is left
out with its comma (why: `role` is optional, and the record must not read `, ,` · 2026-10-26).

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
- In the desk a salesman sees: this folder's `target-profile.md`, `cadence.md`, `pitch/` and
  `kit.<language>.md`, read-only. Every row of the pool, others' rows read-only. For a deal they sourced, the
  `stage` of the client folder up to `agreement`, and nothing after it, no documents. Their
  own commission only, never another salesman's (why: Jamie's answer, from interview round
  R11 · 2026-10-19).
