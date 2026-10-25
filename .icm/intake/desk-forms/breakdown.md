# Breakdown: The free look and the per-lead questionnaires move to the desk

- epic-slug: desk-forms
- source: Jamie's prompt "Cut tickets for the house" of 2026-10-25, and his answers of the same day. The portfolio drops both forms in `k0d0minio/jamienisbet` PR 198 (`portfolio-only/drop-questionnaires`). The old code is at `k0d0minio/jamienisbet` commit `9d5db8c`, under `websites/portfolio/`. The eight questions are in `k0d0minio/icm-board`, `workspaces/sell/references/forms/intake-diagnostic.md`.

## What I understood

The desk gains two public routes. `/start?lang=en|fr|pt` is the free look: a name, an email, an optional phone, then eight questions about how the visitor works today. `/f/<token>` is a questionnaire Jamie sends to one lead or client. The token in the URL is the credential. The questions are frozen when Jamie makes the link. Both routes write the answers to the house as markdown, over the GitHub API with `DESK_PAT`, the way the research queue writes. A free look also inserts a pool row, as `POST /api/pool` does. Each submission mails Jamie and shows the visitor a confirmation on the page. The desk sends the visitor no mail. The questions are content: markdown files in the house, one per language, read by the desk at build. The desk is private behind Neon Auth, so `proxy.ts` leaves the two routes out of its matcher. The root layout already sets `noindex` on every desk page. `robots.txt` disallows `/f/`.

The per-lead form is also the client's sign-up (Jamie, question 4). A lead fills the free look. Jamie takes the lead, and the client folder opens. Jamie sends a follow-up form from the client page. The person answers it, and the desk saves them as a user at role `client`, linked to `clients/<slug>`, not yet active. When Jamie activates them, the desk asks Neon Auth to mail them a magic link. From then on they sign in by magic link only, and read their page: where it stands, the documents, the work in words. The sent links live in a Neon table beside the users (question 6). The answers still live in git.

What exists and is reused. `lib/github.ts` writes one file to `main` (`writeFile`). It also opens the handoff PR (`openHandoffPr`). `app/api/pool/route.ts` turns a public body into a pool row. `scripts/read-house.mjs` reads the house at build into `house.json`. `lib/auth.ts` wraps Neon Auth, and `ensureUser` opens a `users` row at first sign-in. `01-prospecting/` holds stage material per language (`kit.<language>.md`). The old form grammar (`forms-parse.ts`) is ported, not imported: one `##` heading per question, a `- key: value` list under it, four field types.

What the house does not have. A home for a lead's documents before the handoff: the pool is Neon, and the client folder opens at the handoff. A mailer. A table for a sent link. A client sign-up, and a magic-link sign-in. The decisions below settle all of them.

### Decisions (Jamie, 2026-10-25)

1. Where the answers land. For a client, `clients/<slug>/<folder>/<form>-<date>.md`, where `<folder>` is the form's `folder:` frontmatter. The free look lands in `research/`. For a lead with no folder yet, `01-prospecting/leads/<slug>/<form>-<date>.md`. The handoff PR moves that folder into `clients/<slug>/`. The file's frontmatter: `kind: answers`, `form`, `language`, `folder`, `name`, `email`, `phone`, `answered`, `source` (`start` or `link`). The body: one `## question` per question, with the answer under it, in the frozen words.
2. Where the forms live. `01-prospecting/forms/<form>.<language>.md`, three files per form (`en-GB`, `fr-BE`, `pt-PT`). The grammar is in that contract's Outputs. A later module (kickoff) adds its own `forms/`. The desk reads every `*/forms/*.md` at build.
3. How the desk writes to git. A commit straight to `main` with `DESK_PAT`, committer `desk`, as the research queue does. No PR. No new token.
4. The per-lead link is the client's sign-up. Jamie creates it from a "Send a form" card on `/clients/<slug>` and on `/pool/<id>`, for the `jamie` role only. He picks the form and the language. The desk shows the link with a Copy button. He sends it from his own mail or WhatsApp. The desk sends nothing to the lead. The answer saves the person as a user at role `client`, linked to the folder (decision 10). Jamie can then give them progress updates and content.
5. Spam on `/start`: both. A honeypot field, and five submissions per IP per hour, counted in a Neon table `throttle` (a hashed IP and the hour). A filled honeypot or a sixth submission is thanked and dropped.
6. A sent link lives in a Neon table, `links`, until it is answered. The row's id is the token, a v4 uuid, as the old model had it. The row holds the slug, the form, the language, the folder, the name and the email. It also holds the frozen questions as JSON, the date sent and the date answered. The card shows the link again until it is answered (why: the link, the user and the folder stay together · 2026-10-25).
7. The mailer is Resend, `RESEND_API_KEY` on the Vercel project, from `Desk <desk@mail.jamienisbet.com>`, to the business email in `core/identity.md` (`contact@jamienisbet.com`), reply-to the visitor.
8. The fr-BE and pt-PT forms start as the session's translation of the en-GB file. Jamie reviews them on the PR.
9. `/start` with no `?lang`, or an unknown one, renders `en`.

10. How the client gets in. The answer to a sent form saves the person as a user: `role: client`, `client: <slug>`, not active. No password. When Jamie activates them from the client page, the desk asks Neon Auth to mail them a magic link. That is how it asks for the reset mail today. From then on a client signs in by magic link only. Jamie and the salesmen keep email and password (why: Jamie decides who gets in and when. A client keeps no password · 2026-10-25).
11. A form sent from a client page saves the user. A form sent from a pool row collects answers only (why: the user links to a folder. A pool row has none yet · 2026-10-25).
12. Walkthroughs and demos on the client page are a later epic. This epic gives the client the page as it is today.

## Build order

1. forms-in-the-house — the three free-look files, the grammar, the holds, the lexicon — depends-on: none
2. desk-reads-forms — the parser, and read-house reads every form into house.json — depends-on: forms-in-the-house
3. notify-by-mail — lib/mail.ts and the key, names only — depends-on: none
4. start-route — /start: the public free look, the pool row, the answers file, the mail, the spam guard — depends-on: notify-by-mail
5. send-a-link — the links table, the Send a form card, the token — depends-on: desk-reads-forms
6. answer-a-link — /f/<token>: the frozen questions, the answers file, the mail, robots — depends-on: send-a-link
7. client-signs-up — the answer saves the person as an inactive client user — depends-on: answer-a-link
8. magic-link-sign-in — Jamie activates a client, and a client signs in by magic link — depends-on: client-signs-up
9. handoff-carries-answers — the handoff PR moves a lead's folder into the client folder — depends-on: start-route

Stubs 1 to 4 are P0. The portfolio's links open `/start` as soon as PR 198 merges. Until stub 4 ships, they show the sign-in page. Stubs 5 to 9 are P1. Stubs 5 and 7 touch `db/schema.sql`, so each goes before the stub that reads its column.

## Out of scope

- The portfolio. Its side ships in `k0d0minio/jamienisbet` PR 198.
- The pool API. The free look shares its code, not its route. The route's behaviour does not change.
- A restyle of the desk. The two public pages use the desk's components as they are.
- Showing the answers on the desk's pages. Jamie reads them in the mail and in the house.
- New content on the client page: walkthroughs, demos. A later epic (decision 12).
- Kickoff's forms (onboarding, content and brand). They arrive with the `kickoff` stub in `house-modules`, in this grammar.
- Withdrawing a sent link from the desk. Jamie deletes the row in the Neon console.
- Reminders to a lead who has not answered.
