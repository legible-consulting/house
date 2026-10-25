# Stub: A visitor asks for a free look on `/start`

- feature-slug: start-route
- epic: desk-forms
- sequence: 4 of 9
- depends-on: notify-by-mail
- complexity: high
- priority: P0

## Problem

The portfolio's five "Get a free look" links open `https://desk.jamienisbet.com/start?lang=<en|fr|pt>` after PR 198 merges. The desk answers with its sign-in page.

## Proposed change

`/start` is public. It reads `?lang` and renders the free look in that language: a name, an email, an optional phone, then the eight questions. On submit the desk validates the answers against the form. It inserts a pool row as `POST /api/pool` does. It writes the answers to the house, mails Jamie, and shows a confirmation in the visitor's language. A honeypot and a rate limit keep the spam out.

## Acceptance criteria

- [ ] `/start` renders without a session. `proxy.ts` leaves it out of the matcher.
- [ ] `?lang=en`, `fr` and `pt` render `free-look.en-GB.md`, `free-look.fr-BE.md` and `free-look.pt-PT.md`. The page's own words (the three identity labels, the button, the errors, the confirmation) are in the same language. No `?lang`, or an unknown one, renders `en` (decision 9).
- [ ] A bad answer returns the form with the error under the field, and the typed values stay. A bad answer is: a required question left empty, a `select` answer that is not an option, a text over its length, or a bad email.
- [ ] A valid submission inserts a pool row at `new`, `source: free look`, `sourced_by: jamie`, by the same code as `/api/pool`. The 422 rule holds: an open row with that email gets no second row, and the answers land under that row's slug.
- [ ] The answers land in `01-prospecting/leads/<slug>/free-look-<date>.md` on `main`, in the shape of decision 1, `source: start`, written with `writeFile`.
- [ ] Jamie gets one mail: subject `Free look: <name>`, the answers as text, reply-to the visitor.
- [ ] The visitor sees the confirmation on the page and gets no mail.
- [ ] A filled honeypot, or a sixth submission from one IP in one hour, shows the confirmation and stores nothing. `db/schema.sql` gains the `throttle` table.
- [ ] The page carries `noindex`.
- [ ] `01-prospecting/CONTEXT.md` holds `leads/*/*.md` and says what a lead's folder is. `desk/CONTEXT.md` names the route and the table.
- [ ] `check.yml` is green. The preview answers `/start?lang=fr` in French.

## Out of scope

- The per-lead link: `send-a-link` and `answer-a-link`.
- The desk's pages showing the answers.

## Notes

The body-to-fields code of `app/api/pool/route.ts` moves to `lib/lead.ts` (`leadFields`, `insertLead`). The route and `/start` call it. The route's behaviour does not change.

The lang map is the route's `LOCALES`: `en` → `en-GB`, `fr` → `fr-BE`, `pt` → `pt-PT`.

The mapping from the answers to the pool row goes by option position, because the language files share positions (`forms-in-the-house`):

- `company`: the name, as the route does.
- `ask`: the second answer (what eats the week), then the first (the business) in brackets, as the old code did.
- `service`, from the fourth question: 1 → `site`, 2 → `app`, 3 → `platform`, 4 → `unknown`.
- `deal_size`, from the seventh question: 1 and 2 → `<2k`, 3 and 4 → `2k-10k`, 5 → `10k-30k`, 6 → empty.
- `language`, from the eighth question: 1 → `en-GB`, 2 → `fr-BE`, 3 → `pt-PT`. Empty → from `?lang`.

The rate limit: `throttle (ip_hash text, hour timestamptz, n int, primary key (ip_hash, hour))`, one upsert per submission. The alternative is a Vercel Firewall rule on the project, with no code (decision 5).

The file name is `free-look-<YYYY-MM-DD>.md`. A second file on the same day gets `-2`, then `-3`.

The page renders outside `_shell.tsx`: no navigation, no session. The old shape: `app/[locale]/start/page.tsx`, `components/intake-form.tsx`, `app/actions/intake.ts` and `lib/intake-schema.ts` at `9d5db8c`.

`01-prospecting/CONTEXT.md` keeps "The pool rows live in the desk, never here". It adds one line: a lead's answers to a form are documents. They live in `leads/<slug>/` until the handoff moves them (why: the row changes many times a day and the answers do not · 2026-10-25).
