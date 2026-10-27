# Stub: A changed proposal, quote or agreement renders to a branded PDF on its pull request

- feature-slug: render-stack
- epic: render-and-publish
- sequence: 1 of 2
- depends-on: none
- complexity: high
- priority: P1

## Problem

The proposal's contract says the PDF render in CI and the Drive copy are not yet walked. Jamie renders by hand outside the house. MotoArk's proposal and quote wait to be sent.

## Proposed change

A renderer under `core/render/` that reads a client document and writes the PDF in the house's design; `render.yml`, which renders every changed document on a pull request and on a push to `main` as a run artifact; `place.sh`, which copies a PDF into the client's Drive folder from the desktop when Jamie asks.

## Acceptance criteria

- [ ] `core/render/` holds the renderer as a Node package: `package.json`, `package-lock.json`, `render-pdf.tsx`, `lib/`, `types/`, `components/pdf/` as pdfcn installs them, `components.json`. The house theme reads the values of `core/voice.md` § Document design: paper, ink, hairline, lifted sheet, meta, the three state colours, Hanken Grotesk and IBM Plex Mono at the sizes given, A4 with the margins given. The fonts are fetched at render and embedded as subsets. The logo is `logo-full.svg` and `logo-mark.svg`, copied from the brand's home, never redrawn.
- [ ] `core/render/render.sh <client> <proposal|quote|agreement> [--out <dir>]` reads `clients/<client>/<stage>/<file>.md`, inlines `quote/quote.md` as the proposal's last section when it renders a proposal, drops the frontmatter, names the PDF from the kind, the title, "Jamie Nisbet" and the date, in the client's language, by one rule `core/CONTEXT.md` states beside the renderer, and prints `RESULT: RENDERED <path>`.
- [ ] `.github/workflows/render.yml` runs on `pull_request` and on `push` to `main` for `clients/*/proposal/*.md`, `clients/*/quote/quote.md` and `clients/*/agreement/*.md`. One job renders each changed document and uploads the PDFs as a run artifact kept 14 days. No Drive step, no secret. Actions pinned to a SHA, `contents: read`, `persist-credentials: false`.
- [ ] `core/render/place.sh <client> <pdf>` copies the PDF over the GNOME Drive mount with `/usr/bin/gio` into `Clients/<client name>/`, named for the client in the client's language, replaces a same-name file, never touches a file whose name starts with the signed kind, and prints `RESULT: PLACED <name>`. Run by Jamie, or by a desktop session after asking.
- [ ] `core/CONTEXT.md` `holds:` gains `render/**`, and its Outputs name `render/` and the workflow. The proposal's and the quote's contracts name the workflow and the artifact in their render step and lose "not yet walked" for the PDF and the Drive copy. `.github/workflows/README.md` gains the row for `render.yml`. `core/stack.md` gains a heading "The renderer" with its why.
- [ ] On the pull request, the `render` run produces the MotoArk proposal PDF as an artifact, and `check.yml` is green (`scripts` runs shellcheck over the two scripts).

## Out of scope

- Placing any PDF in Drive in this pull request.
- An agreement to render: the template is `house-modules/agreement`; its path is in `render.yml` from day one.
- The Google Doc copy. The PDF is the document.

## Notes

Read first in the house: `CLAUDE.md`, `core/CONTEXT.md`, `core/voice.md` (Document design, The documents), the proposal's and the quote's contracts (`03-proposal/`, `04-quote/` after `house-modules/stage-numbers`; `02-proposal/`, `03-quote/` before it), `clients/motoark/proposal/proposal.md`, `clients/motoark/quote/quote.md`, `.github/workflows/check.yml` (the `desk` job is the pattern for a Node job), `.github/workflows/README.md`, `core/stack.md`. The brand's home for the logo: `assets/logo/` at the root of `k0d0minio/jamienisbet`, by `gh api` or at `~/Desktop/legible-consulting/projects/jamienisbet`. The renderer never runs locally: read the result in the pull request's `render` run.

## Prompt

Repo legible-consulting/house, cloud with the house attached or desktop at ~/Desktop/legible-consulting/house. Read CLAUDE.md, .icm/intake/CONTEXT.md, .icm/intake/render-and-publish/breakdown.md, then this ticket, .icm/intake/render-and-publish/render-stack.md, then the files its Notes name, in order. Do what it says. One branch, one pull request to main, message starts with "render:". Move the stub to .icm/intake/render-and-publish/_done/ in the same pull request. Never run the renderer, npm, build, lint or dev locally; read the render run on the pull request. No secret value anywhere. Do not merge. Your last message names the pull request, the artifact, and what waits on Jamie.
