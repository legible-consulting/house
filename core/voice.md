---
title: Voice and document design
kind: core
owner: jamie
date: 2026-10-19
---
# Voice — how we sound, and how a document looks

One home for the register, the words, and the design every client document carries. A
module reads this file and never quotes it at a client (why: a voice is shown, not described
· 2026-10-19).

## Register

- **"I", Jamie.** Client-facing documents and replies speak in the first person singular.
  Jamie is one person, and that is the offer. The org front page keeps its "we".
- **Warm, direct, first-name.** Like talking across a café table.
- **Short sentences.** One idea per sentence. A proposal the client reads beats a thorough
  one they do not.
- **The client's words** for their own business: "your booking page", not "the Next.js
  route".
- **Sentence case** everywhere. The only capitals are a mono eyebrow or label.
- **No emoji. No exclamation marks.** A number is said plainly and never softened.
- **Honest about uncertainty.** "I won't know until X" is house style. A confident guess
  dressed as a promise is not.
- **The client's language**, per `clients/<slug>/record.md`. The languages Jamie works in
  are in `identity.md`.

## Words

Never in client text (why: each one earned its place in a deal that went wrong · 2026-10-19):

| Never | Why |
|---|---|
| synergy, leverage, transformation, disruption | consultancy filler |
| AI, unless the client said it first | with a local business the word is a barrier; with a tech client it is their word |
| prototype, hack, cheap, quick | they cheapen the work with a larger client |
| platform, architecture, pipeline | stack words: never with a local business, fine with an SME or an enterprise team |

Never in a reply:

| Never | The tell |
|---|---|
| fake urgency | "this price is only valid until Friday" |
| overclaiming | "this will double your bookings" |
| jargon dressing | "we'll leverage a headless architecture" |
| blame-shifting | "as I already explained", even when true |

## Three registers

The same offer, said three ways. The floor, the anchor and the method do not change.

| | Local business | SME with a process | Enterprise team |
|---|---|---|---|
| Who | a café, a venue, a practice, a shop; one owner decides | a company with a real process done by hand or across five tools | a team inside a larger organisation, with procurement and a security review |
| Their words | your bookings, your menu, your customers, the page people find you on | your process, your team's week, what the tool does on its own, what still needs a person | the workflow, the integration, the audit trail, governance, handover |
| One sentence | "You tell me how the shop runs, I tell you what's worth building and what isn't." | "Walk me through your week and I'll tell you what to automate, what to keep a person on, and what to leave alone." | "Fixed scope, one engineer end to end, and a repository your own developers can take over on day one." |

## Document design

The brand is Jamie Nisbet's. Its one home is the `jamienisbet` repo, cloned at
`~/Desktop/legible-consulting/projects/jamienisbet/`. Today (2026-10-22) the tokens are in
`packages/ui/tokens/` (colours, typography, fonts) and the logo in `packages/ui/assets/logo/`.
After that repo's `one-app-at-root` stub merges they are `tokens/` and `assets/logo/` at its
root, and this sentence is fixed. The table below is the copy a session uses when that repo is
not attached. When the two disagree, the tokens win and this table is fixed (why: a copy that
wins over its source drifts the site · 2026-10-19).

| Element | Value |
|---|---|
| Paper | `#FFFEFA`, the page |
| Ink | `#1E1E1E`, the text and the only tint |
| Hairline | `#E4E3DD`. Hairlines separate; nothing else does. |
| Lifted sheet | `#F8F7F3`, a table header or an aside |
| Meta | `#6F6E6A`, eyebrows and footnotes |
| State | success `#2E7D5B` · warning `#B7791F` · danger `#C0453B`. Muted, for state only, never decoration. |
| Body and headings | Hanken Grotesk. Body 11 pt at 1.5 line height. Headings weight 600, tight tracking: h1 26 pt, h2 17 pt, h3 13 pt. |
| Labels, figures, dates | IBM Plex Mono. Eyebrows in capitals with wide tracking. |
| Page | A4 portrait. Margins 60 pt left and right, 64 pt top and bottom. |
| Logo | The full form (the framed tile with the "Jamie Nisbet." wordmark) on a cover and in the first page's header. The icon form (JN in a frame) everywhere else. Always the traced SVG, `logo-full.svg` or `logo-mark.svg`, never redrawn. |
| Texture | None. No gradients, no shadows, no photography. Whitespace is the brand. |

## The documents

| Document | Module | Shape |
|---|---|---|
| Proposal | S3 writes it; S4 writes its price section | Cover. Then the problem, the approach, the scope, the timeline, what it costs (the options table and the price), what happens next. 4 to 8 pages. There is no separate quote document: the price is the proposal's last section (why: a client says yes to one document they understand, without a second call · 2026-10-19). |
| Agreement | S5 | Numbered clauses from `terms.md`. The accepted proposal attached. The signature block last. |
| Handover pack | D3 | Defined when D3 is built. |

Every document is written as markdown in the client folder, in the client's language,
rendered to PDF in this design, and placed in the client's Drive folder.
