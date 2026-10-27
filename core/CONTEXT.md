---
status: built
holds:
  - lexicon.md
  - stack.md
  - "setup/*.sh"
  - identity.md
  - services.md
  - voice.md
  - terms.md
  - onboarding-collaborator.md
  # The pack for the accountant: the entity's tax status, its obligations and its compliance
  # calendar, beside the status identity.md names (why: one home per fact · 2026-10-26).
  - "accountant/*.md"
  # The renderer: a Node package that turns a client document into the PDF in the design of
  # voice.md, and the script that places a PDF in Drive (why: voice.md is the design's one
  # home, so its reader lives beside it · 2026-10-26).
  - "render/**"
  # The repo root's .env.example: every environment variable of the estate, by name and place. The
  # stack owns where a value lives, so the core holds the list (why: one audit file instead of a
  # read of Vercel, Actions, the shell and the cloud dialog each time · 2026-10-23).
  - "../.env.example"
---
# Core

The core produces the business's identity and bio, its services and pricing, its voice and document design system, and its terms, stack and house rules, each fact in exactly one place, so that every module and every client artefact speaks with one voice and a change made once lands everywhere.

## Inputs

- Jamie's answers. Nothing else: the core is upstream of everything.

## Process

- Start cold from this folder. Read only what Inputs names.
- Jamie answers in one sitting: a session drafts the questions, offers a default in each,
  and asks them in one batch. The answers are written as facts, each in the one file that
  owns it. What Jamie leaves open goes to the ticket it blocks in `.icm/intake/`, as a numbered
  question with a default, never into a file as a placeholder (why: a placeholder reads as a fact
  to a module that starts cold, and a question beside its ticket is answered where the work is ·
  2026-10-19).
- A fact changes here first, by PR to `main`, then everywhere that cites it. Jamie merges.
- Each file starts with frontmatter (`title`, `kind`, `owner`, `date`). A rule in a file
  carries its why and date.

## Outputs

Built (2026-10-16):

- `lexicon.md`: the house words (repo names, module codes) every artefact uses.
- `stack.md`: which tools Legible Consulting uses, where each runs, and how a machine gets them.
- `setup/local.sh` · `setup/cloud.sh`: install the toolbox `stack.md` lists, on this machine (Homebrew) and in the `legible` cloud environment (pasted setup script).

Built (2026-10-19):

- `identity.md`: the bio, the entity, the languages, what we do and do not do.
- `services.md`: the six lines, what each includes, what is never in a build's price, and the pricing table with the anchor and the floor.
- `voice.md`: the register, the words never used, the three registers, the document design system and the shape of each document.
- `terms.md`: payment, validity and revisions, ownership, hosting and support, ending an engagement (with the workshop's cancellation scale), confidentiality and liability, law and language.

Built (2026-10-23):

- `../.env.example`, at the repo root: every environment variable of the estate by name, one
  section per place a value lives (Vercel production, preview, uat, development; Actions secrets
  and variables; the local shell; the cloud session). Names only, never a value. Re-read the
  sources and rewrite it when a name is added, renamed or removed.

Built (2026-10-26):

- `accountant/`: the pack for the accountant, written 2026-08-17. `README.md` is the cover
  note, `01-contabilista-brief.md` the questions, `02-trabalhador-independente-obligations.md`
  the status, the obligations and the due dates. Its §5 is the compliance calendar. A date the
  contabilista confirms is written into §5 in place. The core holds the pack because the
  entity's tax status, its obligations and its calendar are facts about the entity, and
  `identity.md` names the status (why: one home per fact · 2026-10-26).
- `render/`: the renderer. `render.sh <client> <proposal|quote|agreement> [--out <dir>]`
  reads `clients/<client>/<kind>/<kind>.md` and writes one PDF in the design of `voice.md`
  § Document design. It prints `RESULT: RENDERED <path>`. `place.sh <client> <pdf>` copies
  a PDF into the client's Drive folder and prints `RESULT: PLACED <name>`. The workflow
  `.github/workflows/render.yml` runs `render.sh` on a pull request and on `main` and keeps
  the PDFs as the run's artifact `pdf` for 14 days. `stack.md` § The renderer says why.
  The rules the renderer follows:
  - The design is read from the table in `voice.md` § Document design on every run. A value
    the table does not give stops the render (why: one home for the design; the renderer is
    its reader, not a second home · 2026-10-22).
  - The fonts are fetched from Google Fonts at render and embedded as subsets. The logo is
    `render/assets/logo-full.svg` and `logo-mark.svg`, copied byte for byte from
    `assets/logo/` in `k0d0minio/jamienisbet`, never redrawn. When the brand changes the
    logo, copy the two files again.
  - The frontmatter and every HTML comment are dropped. A proposal takes the body of
    `quote/quote.md` in place of its own last `## ` section (why: the price has one home, and
    the client says yes to one document · 2026-10-19).
  - The text before the first rule (`---`) is the cover when it holds the `#` title. A
    paragraph in capitals only is an eyebrow.
  - A table fills the text width and never passes the margin. Hairlines separate its rows.
    A column of figures (prices, rates, counts, dates) is set in IBM Plex Mono and, after
    the first column, right-aligned. An empty header row is not drawn. A row with a label and
    empty cells is a row to sign in and gets room for a signature. A table that fits on a
    page is kept whole, with the heading or the label line before it (why: a price table
    split across two pages, or one that runs off the page, is the part of a document a
    client reads twice · Jamie, 2026-10-27).
  - The name of a PDF is `<Kind> - <client> - Jamie Nisbet - <date>.pdf`: the kind in the
    document's `language` from `render/kinds.json`, the `name` in the client's `record.md`, and
    the `date` in the document's frontmatter. The document's title is not in the name
    (why: the kind already says what the document is, and a title often repeats it ·
    Jamie, 2026-10-27). The characters `/ \ : * ? " < > |` are dropped. A signed
    copy is named by Jamie and starts with the signed kind (`Signed`, `Signé`, `Assinado`);
    `place.sh` never writes or replaces a file whose name starts with it (why: the signed
    copy is the record of the deal; a render must never overwrite it · 2026-10-22).
  - `place.sh` writes with `/usr/bin/gio` into `Clients/<folder>/`: the `drive_folder` in the
    client's `record.md`, or the slug when that field is empty, on the one Google Drive mount
    that holds that folder. The Drive mounts when Jamie opens the Google account in Files;
    `gio` cannot mount it from a script. A file of the same
    name is replaced in place, so its Drive link stays. Jamie runs it, or a desktop session
    after it asked Jamie. CI never places (why: no secret in the render path · 2026-10-22).

Not yet written:

- `onboarding-collaborator.md`: the one-page note sent with a collaborator invite. Written the first time one is sent.
