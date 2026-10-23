---
slug: remi-ai
name: Remi AI
language: fr-BE
stage: build
kind: role
opened: 2026-07-31
next_action: Paste the privacy-policy answers into Morgane's document, after Anthropic's retention terms and Resend's region are confirmed. Open the pull request for `user-stories-2026-10`. Then start the first epic.
deadline: 2026-10-30
salesman:
commission:
  sourced_by:
  owed:
repo: k0d0minio/remi-ai
owner: jamie
vercel_project:
  - remi21/app
  - remi21/admin
  - remi21/marketing
  - remi21/documentation
  - remi21/support
  - remi21/demo
collaborators: []
drive: https://drive.google.com/drive/folders/1dp1iNJ70ZuSwdrwyQMYGQUq-RVhF1vcT
---

# Remi AI

An AI product built as a Turborepo monorepo: the signed-in product, a bilingual (English, French) marketing site, admin, docs, support and a demo sandbox over shared UI and services packages. Jamie is the company's CTO, so the build is ongoing with no handover.

The shares agreement is the minutes of the extraordinary general meeting of 28 September 2026,
filed in Drive at https://drive.google.com/file/d/1dSka52lIfcIiNQ9e2bU63FcTd_WZsd8E/view. This
is a link only. No term is restated here. Morgane Paquet is the product owner. Arnaud Ruelle is
business and money. Jamie is CTO and the only builder. Morgane's user stories of October 2026
replace the backlog whole (`research/profile.md`).

On 2026-10-23, after the story cut, Jamie decided that REMI's recipes start from a verified base
of template recipes, more than twenty (D-34 in the client repo's `.icm/intake/README.md`; it
closes the September question of a ~20-recipe seed base). Morgane asked Jamie to fill the
technical blanks of the pilot privacy policy (Drive,
`01_Politique_de_confidentialite_REMI_AI_Pilote.docx`). The proposed texts and the facts behind
them are in `research/privacy-policy-review-2026-10-23.md`. The review opened two stubs in the
client repo (in-app consent withdrawal, deletion after 12 months of inactivity) and two triage
findings (the Blob store is public, no Vercel function region is pinned to the EU). The re-cut
backlog is pushed on branch `user-stories-2026-10` of `k0d0minio/remi-ai`, commit 0446bc4. No
pull request yet.
