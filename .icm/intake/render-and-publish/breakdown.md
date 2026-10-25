# Breakdown: Render and publish: a client document becomes a PDF, a ready case becomes a page

- epic-slug: render-and-publish
- source: `core/voice.md` (every client document is rendered to PDF in the design and placed in Drive); the proposal's contract ("Not yet walked: the PDF render in CI"); the two session prompts Jamie wrote on 2026-10-22 for the render stack and the publish workflow, folded here on 2026-10-25

## What I understood

Every client document is markdown in the client folder, in the client's language. `core/voice.md` says it is rendered to a branded PDF and placed in the client's Drive folder. Today Jamie renders and places by hand: the proposal's contract says the PDF render in CI and the Drive copy are not yet walked. The legacy renderer in `~/Desktop/Apps/_system/render/` and the scripts `render-deal.sh` and `place-deal.sh` did this for the pre-house deals and proved the Drive route over the GNOME mount. The house gets its own renderer under `core/render/`, a workflow that renders every changed document on a pull request as a run artifact, and a desktop script that places the PDF in Drive when Jamie asks.

A case study (`.icm/intake/house-modules/portfolio.md`) is public text that belongs to its client's folder. The site jamienisbet.com is served by Vercel from the `main` of `k0d0minio/jamienisbet` and reads `content/work/*.md`. A workflow in the house copies every `ready: true` case there on a push to `main`. Jamie's merge of the case into the house is the gate; nothing else gates the site.

## Decisions of record

- **No secret in the render path.** `render.yml` reads the repo and uploads an artifact. It has no Drive step and no token (why: a workflow that writes to Drive holds a key that outlives every rotation, and the desktop already has the mount · 2026-10-22).
- **The Drive copy is Jamie's hand, or a desktop session that asked first.** `core/render/place.sh` writes over the GNOME Drive mount with `/usr/bin/gio`, the route `place-deal.sh` proved: `Clients/<client name>/`, named for the client in the client's language, a same-name file replaced, a file whose name starts with the signed kind never touched.
- **The renderer reads the design from `core/voice.md` § Document design** and the logo from the brand's home, copied once (why: one home for the design; the renderer is its reader, not a second home · 2026-10-22).
- **The publish run is unattended and sends nothing to anyone.** It copies a case Jamie merged to the site's `main`. The one secret is `SITE_PAT`, a fine-grained token on `k0d0minio/jamienisbet` with Contents read and write, set by Jamie as a house Actions secret, named in the root `.env.example` and never in a command line.
- **Actions pinned to a commit SHA, `contents: read`, `persist-credentials: false`**, like `rhythms.yml` and `check.yml`. shellcheck clean.

## Build order

1. `render-stack` — the renderer, `render.yml`, `place.sh`, the contracts that name them — depends-on: none
2. `publish-cases` — `publish.yml`, the README row, the Boundaries line, `SITE_PAT` in `.env.example` — depends-on: none. Blocked until `house-modules/portfolio` merges and the site repo's `one-app-at-root` stub merges.

## Out of scope

- The agreement template and the case shape: `house-modules`.
- A Google Doc in the client's Drive folder as a second format. The PDF is the document.
- Pages and posts on the site: a question in `publish-cases`.
