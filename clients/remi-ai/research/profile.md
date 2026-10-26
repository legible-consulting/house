# Remi AI: client profile

Prepared 2026-10-23, three months into the role, from the house record
(`clients/remi-ai/record.md`), the pre-house deal workspace
(outside the house, 2026-09-22 to 2026-10-07), the client repo
`k0d0minio/remi-ai` on `main` at 5d60225 (`.icm/intake/README.md`, `.icm/docs/README.md`,
`.icm/docs/RETENTION.md`, `apps/docs/app/business/*`), Morgane's feedback document of
2026-09-10 (`docs/Feedback Jamie.docx` in the repo), the Drive folder `remi-ai` (the minutes
of the extraordinary general meeting of 2026-09-28, read as a listing, not opened), the Fagron
email thread of September 2026, and the Euro Register profile for the lines on Arnaud. The
first part is what the founders said. The second part is the company. The third part is the
product and its state. The fourth part is what this profile cannot tell: those points are
questions for Morgane and Arnaud.

## What the founders said

- **Morgane, 2026-09-10, on the first console.** The data structure is right. The interaction
  layer is not usable: a long patient page built around encoding, field by field. She cannot
  accompany several people with it. The console must follow her consultation work: understand,
  decide, act, follow. A practitioner must never encode the same information twice. An update
  after a consultation must take minutes.
- **Morgane, 2026-09-10, on the patient page.** It is where REMI keeps its main promise: help
  the person apply the recommendations between two consultations. For the pilot she wants to
  test one thing: does REMI help people apply their recommendations? The page must carry
  today / this week, the recommendations, the recipes, the essentials, and « Je vais manger »
  / « J'ai mangé ».
- **Morgane, 2026-09-10, on AI.** The system must work without AI first. AI then accelerates:
  free text to structured rows, recipe generation with a check before display, meal
  suggestions as the central workflow. Recipes and « Je vais manger → suggestions » are part
  of the product's value, so she wants them tested now.
- **Morgane, 2026-09-14, « Ce que les consultants doivent voir ».** Three objectives always
  visible, a weekly 0 to 5 score as a question, personalised challenges with « Challenge
  acquis » / « Prêt(e) pour le prochain », her recipe PDFs and personal documents, one general
  feedback box. « Mes ressources » struck: WhatsApp is enough.
- **Morgane and Arnaud, 2026-09-11 call.** « Rémi ne peut jamais donner des recommandations,
  elle aide à appliquer les recommandations. » The cheapest AI first, EU sovereignty later.
  Tokenised links, no accounts before December.
- **Morgane and Arnaud, direction letter of 2026-08-24, adopted 2026-08-27.** Terrain first.
  The patient experience before a full practitioner space. FunMedDev's team tests on
  1 December 2026. The open day is 19 December 2026.

## The company

| Fact | Value | Source |
|---|---|---|
| Legal name | REMI AI SRL | EGM minutes of 2026-09-28, Drive listing |
| Company and VAT number | BE 1033.328.429 | EGM minutes, Drive listing (not checked on VIES) |
| Registered address | Avenue du Tonnelier 24, 1428 Braine-l'Alleud, Belgium | EGM minutes. The v1 legal pages said 1428 Lillois-Witterzée, the same commune (not checked) |
| Shareholders before 2026-09-28 | Arnaud Ruelle 50 %, Morgane Paquet 50 % | EGM minutes |
| What the EGM did | A transfer of shares to Jamie, named as future CTO | EGM minutes. The terms stay in the signed document and are not restated here |
| Website | remiai.be | repo `README.md` |
| Other accounts | an Odoo instance (remiai1.odoo.com), a Manus pitch deck | repo `README.md` (not checked: what Odoo holds) |
| Funding | Self-funded, capped. A Startup Boost application for 100 000 € was prepared in September 2026 (not checked: whether it was granted) | `apps/docs` initiatives page, `.icm/docs/README.md` |
| Revenue | None. No signed pilot, no price, no billing date | `.icm/intake/README.md` § Four facts |
| Business partner | Fagron Genomics (Jolien, genomics@fagron.be): NutriGen tests as the starting point, prices received 2026-09-03, a call on 2026-09-23 | Gmail thread « REMI & Fagron » |
| Clinical partner | FunMedDev: its team tests on 1 December 2026, its open day is 19 December 2026 | direction letter, `.icm/intake/README.md` |

## People

| Person | Role | For us |
|---|---|---|
| **Morgane Paquet** | Co-founder, 50 % before the EGM. A nutrition practitioner. She accompanies 10 to 15 of her own patients and uses the console as the one operator. Writes from morgane@remiai.be. | The product owner. Her written documents rank first in the repo's precedence order. She writes the user stories. |
| **Arnaud Ruelle** | Co-founder, 50 % before the EGM. Writes from arnaud@arabell.be. Also délégué à la gestion journalière of Euro Register SA since 2026-03-07, a separate client of Jamie's. | Business, money and the Fagron relationship. The two client folders stand on their own: nothing here cites that one. |
| **Jamie Nisbet** | CTO, by the EGM of 2026-09-28. Owns part of the company. Owns the repo `k0d0minio/remi-ai` and the Vercel team `remi21`. | `kind: role` in the record. No handover. The build is ongoing. |
| Jolien (Fagron Genomics) | Contact for the NutriGen tests | Genotype work is parked until the rights to the source table are settled |

Who decides what (Jamie, 2026-10-23): Morgane decides what is built. Arnaud is business and
money. Jamie builds alone. Nobody else touches the product.

## The product

REMI helps a patient apply the nutrition recommendations their practitioner gave them, between
two consultations. The practitioner stays the clinical reference. REMI applies and never
prescribes. V2 replaces a Lovable v1 (Vite, React, Supabase) that Morgane built and that was
analysed and retired in August 2026. The 7-day food diary, the psychological questionnaire,
the nutrigenomics engine and rigid weekly plans are out of V2's scope.

What exists on 2026-10-23, from the repo and its changelog (`apps/docs/app/changelog/`):

- **The console (`apps/admin`).** Morgane's tool. A patient record with profile, anamnesis,
  goals, a living summary, a standing instruction, recommendations, supplements, essentials,
  recipes and consultation notes. An « en un coup d'œil » first screen. Bulk entry, templates,
  copy from another patient, duplicate. A « copy context » button that exports a patient's
  pseudonymous context as a prompt for the model she already uses. Shipped September 2026.
- **The patient link (`apps/web`, `/p/[token]`).** The token is the whole credential. It reads
  and writes. The page opens on today / this week: the running challenge, the goals, the week's
  consigne, « Je vais manger » / « J'ai mangé », the main recommendations, recipes, documents,
  essentials, one feedback box, the living summary. « Mon profil » with seven editable fields.
  A weekly 0 to 5 check-in per goal and « Ma progression ». Rate limits, audit trail, a
  privacy note in the patient's language. Shipped 17 to 25 September 2026.
- **The knowledge layer.** CIQUAL (the French food composition table) imported. Morgane's own
  nutrition rules as text. Shipped 17 September 2026.
- **No model call yet.** The AI seam exists in `@remi/services`. No adapter is wired.
- **The other apps.** `marketing` (public site, fr-BE and en), `docs` (Nextra), `support`,
  `demo` (mock data). All six deploy as one Vercel project each in team `remi21`.

Stack: Turborepo 2, pnpm 10, Node 22, Next.js 16, React 19, TypeScript 5 strict, Tailwind CSS
4, shadcn/ui, Nextra 4, Drizzle on Neon Postgres (one database, previews never migrate,
decision D-25), Resend for email, a private EU-region Vercel Blob store for files (decision
D-18). The repo is at blueprint tag v0.6.0 (platform tier) since 2026-10-22.

Data posture: `RETENTION.md` describes what the code holds about a patient, what deleting
removes, and what the audit trail keeps. No consent-management vendor, no automated
deletion, no legal review behind it. No processor agreement is on file in the repo (not
checked outside it). The v1 CGV and privacy policy were « awaiting legal validation » in
November 2025 (not checked since).

### The user stories of October 2026

Morgane wrote thirty numbered story documents, 1 to 32 with 10 and 27 absent from the
folder, in French, dated 12 and 15 October 2026. Jamie placed them in Drive on 23 October, in
the folder https://drive.google.com/drive/folders/1Dsa6QvCLwBTn5jnI7ubrccnY0HUn4D-7. Jamie
decided on 23 October that they replace the open backlog whole and win over anything the
platform contradicts. Each story goes through a scope and becomes one epic in the client repo:
one folder under `.icm/intake/` with a `breakdown.md` and several stubs. The stories
themselves stay in Drive. They are never committed to the repo.

### The backlog before the stories

The state on `main` at 5d60225, before the re-cut. The milestone dates were set on 2026-09-11
(decision D-15) at one stub a day. The last product commit is 2026-09-25. The three commits
since are the blueprint adoption of 2026-10-21 and 2026-10-22.

| Epic | Open stubs | Milestone | On 2026-10-23 |
|---|---|---|---|
| `patient-loop` | `recipe-feedback-and-favourites` (P2) | 15 October: the patient writes into the link | **Met.** Eight of nine stubs shipped by 2026-09-25. |
| `ai-assist` | `ai-gateway-adapter`, `meal-suggestions`, `recipe-generation`, `summary-draft` (P1), `free-text-to-rows` (P2) | 31 October: REMI answers a meal. 15 November: REMI proposes recipes | **At risk.** No stub started. Eight days to the first date. |
| `beyond-december` | Eight stubs, all P2, one blocked (`genotype-layer`) | None. Not for the open day | Parked by design. |
| `triage/` | 24 open stubs: 8 bugs, 8 tweaks, 8 chores. Two carry P1: `console-save-overwrites-patient-profile-edit` (allergies, safety-critical) and `previews-migrate-the-shared-database` (settled by D-25, not built) | 30 November: freeze, fixes only | Backlog. Jamie prunes it. |
| — | — | 1 December: FunMedDev's team tests | 39 days away |
| — | — | 19 December: open day | 57 days away |

Five epics are shipped and archived under `_done/`: `patient-record`, `patient-surface`,
`nutrition-knowledge`, `practitioner-workflow`, `patient-workspace` (dropped whole). The
open stubs still carry the old pipeline's shape (`scope:`, `size:`, `Notes for Define`,
`Prompt`), not the blueprint's (`epic:`, `complexity:`, `Notes`).

## The engagement as agreed

- **Shape.** `kind: role`: Jamie is the company's CTO and owns part of it. The build is
  ongoing. No handover pack, no retainer offer (`clients/CONTEXT.md`, handover, a ticket in `.icm/intake/`).
  The role started where the ownership started (`core/services.md`, 2026-10-22).
- **Dates.** The relationship opened 2026-07-31 (a Teams call, recorded, in the Drive folder
  `REMI-AI`). Work started 2026-08-26 per Jamie. The shares were transferred at the EGM of
  2026-09-28. The terms live in the signed minutes in Drive. Nothing about them is restated in
  the house. The horizon stays 19 December 2026 (Jamie, 2026-10-23).
- **Rhythm.** A weekly call on Fridays, agreed 2026-08-25. The call of 2026-10-23 is « Remi AI
  sync-up @ slack », 16:00 to 17:00 Europe/Lisbon, Morgane and Jamie. Slack is the working
  channel: the release workflow posts each merge to a channel there.
- **Who decides what.** Morgane owns the product and the vocabulary. Jamie owns the stack, the
  repo, the estate and the merge. Arnaud owns the business side. Every stub's open points are
  asked, numbered with a default, before a build (`.icm/intake/CONTEXT.md`).
- **Money.** No invoice. The monthly close reads a role as no income line (not checked:
  whether `quote/economics.yaml` should exist for a role).

## What this profile cannot tell

- Whether the Startup Boost application was granted, and what it commits REMI to.
- Whether the v1 Supabase project still holds real patients' data, and whether the Python
  meal-plan API's source was recovered (`.icm/docs/history/info-gathering.md`, REQ-09, REQ-12).
- Whether any processor agreement (Vercel, Neon, Resend) is signed, and whether the CGV and
  privacy policy were validated by counsel.
- Which decisions of record (D-1 to D-25) the October stories contradict. The breakdowns in
  the repo say so, story by story.
- Who holds the Vercel, Neon, Resend, Slack, domain and Odoo accounts: `kickoff/access-table.md`
  lists each as unknown until Jamie fills it.
