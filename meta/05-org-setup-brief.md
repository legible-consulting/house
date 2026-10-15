---
title: "Brief for a fresh session — design the GitHub organisation as the agency's home"
kind: brief
status: draft
owner: jamie
date: 2026-10-15
inputs: 01-goals.md · 03-repo-topology.md · 04-github-organisation.md · 02-tool-research.md (on demand)
produces: meta/06-org-design.md (report) · meta/06-org-runbook.md (commands Jamie runs)
---

# Brief: set up the GitHub organisation so the agency runs inside it

Paste everything below the line into a fresh session. Run it **locally** (Desktop Code tab, Local): it needs `gh` across two GitHub owners, and a cloud session's GitHub proxy only reaches the repo it has attached and blocks GraphQL (`gh repo list`, `gh pr`).

---

You are working in `icm-workshop`, the operating repo of Jamie Nisbet's solo AI consultancy in Mafra, Portugal, which is becoming a small agency with collaborators. The repo follows the Interpretable Context Methodology (ICM): the folder tree is the orchestration, `CLAUDE.md` is identity and routing only, stage folders carry `CONTEXT.md` contracts, and this `meta/` folder holds goals and research.

## Your job

Research and design, then write. Do not create, rename, transfer or configure anything on GitHub, Vercel or Claude. Produce two files:

1. `meta/06-org-design.md`: how the GitHub organisation becomes the agency's home, with every repo, team, workflow and sync path named, and how the ICM modules map onto it.
2. `meta/06-org-runbook.md`: the ordered commands and clicks Jamie runs to get there, each step with its check, so the whole move can be done in one sitting and verified.

Both files use the frontmatter style of `meta/03-repo-topology.md`. Every rule carries its why and its date. No decision register. Research only: the gate to execute is Jamie's.

## Read first, in this order

1. `meta/01-goals.md`: the modules (C1–C3, S1–S5, D1–D4, O1–O4), the boundaries every goal inherits, and the 90-day success signals. These are fixed.
2. `meta/03-repo-topology.md`: the repo set (operating, method, reference, one repo per client build), the "one repo per session" rule and why, how a client folder links to a code repo.
3. `meta/04-github-organisation.md`: what is already verified about GitHub Free, transfers, renames, Vercel Pro, Remote Control; the org design so far; the migration order; the list of things still to verify on the real org.
4. `meta/02-tool-research.md` only when a step needs a tool (gh, mani, multi-gitter, copier, gitleaks, release-please, Astro).
5. `meta/00-goal-interview-answers.md` if a goal's intent is unclear.

## Decided; do not reopen

- Operating repo stays one private repo: core + client folders + module contracts + desk and dashboard. Client code repos are separate, one per build, rendered from the method repo, standing alone at build time. Jamie keeps ownership of client repos always; clients are collaborators.
- The org is `ai-consultancy-workshop`, to be renamed to the business name. Final name pending; candidates are Legible Consulting (`legibleconsulting`), Mafra AI (`mafraai`), AI by Hand (`ai-by-hand`). Write `<org>` and do not spend time on naming unless Jamie decides in the interview.
- Every client repo and all ICM material moves to the org. The personal account `k0d0minio` keeps personal projects only. Dormant client repos are archived in the org after a gitleaks pass.
- GitHub Free for the org. Private repos get no branch protection; gates there are the `CLAUDE.md` boundary plus a CI check that fails loudly. Vercel is Pro; private client repos deploy from Actions with the Vercel CLI so a collaborator's commit is never blocked by Vercel's author check.
- Collaborators get per-repo access only (outside collaborator for one repo, a team for several), never on the operating or reference repo. Salesmen and clients use the dashboard, not git.
- Unattended runs are GitHub Actions `schedule:` in the operating repo. Claude Routines are watch. Local-only lane: the `projects/` clones with bulk estate ops and anything needing a browser login, reached by Remote Control, writing results back into the operating repo.
- Plans: Claude Max, Vercel Pro, GitHub Free.

## House rules (restated because a session may not load Jamie's global CLAUDE.md)

Never build an orchestrator: folders and contracts are the pipeline. Gates are human checkboxes: read them, never tick them. CI is truth: never run build, lint, typecheck, test or dev locally. One home per fact. Rules carry their why and date. Never put credentials or identity documents in git; flag any plaintext secret you find. Commit only when Jamie asks. Prefer concise output; offload multi-file searches to Explore subagents.

## Interrogate Jamie first

Two or three rounds with AskUserQuestion, four questions a round, before writing. Cover at least:

- The final org name, or confirmation to keep `<org>`.
- Which collaborator roles appear in the first 90 days (developer on a client build, designer, salesman via dashboard, a second ICM practitioner), and whether any of them ever needs to read the operating repo.
- Live versus dormant: run the inventory below, show the list, and have Jamie mark each repo client-live, client-dormant, personal, or reference.
- Whether new client site repos default to public (free Actions and real rulesets) and apps and platforms to private.
- Whether build tickets live as GitHub Issues on each client repo, with the client folder holding the pointer, so collaborators work in the repo and the folder stays the record.
- The recovery owner account for the org, and who pays Vercel seats if a collaborator must be a Vercel member.
- Whether to re-register `ai-consultancy-workshop` as an empty org so course links keep resolving.

## Inventory to run before the interview

```bash
gh repo list k0d0minio --json name,visibility,isArchived,pushedAt,url,description --limit 100 > meta/estate-k0d0minio-2026-10-15.json
gh repo list ai-consultancy-workshop --json name,visibility,isArchived,pushedAt,url,description --limit 100 > meta/estate-org-2026-10-15.json
```

Summarise both as a table in the interview. Do not commit the JSON until Jamie has marked it.

## What the design must answer

1. **Org skeleton.** Owners, 2FA, base permission none, who may create repos, Actions and PAT policy, the Claude GitHub App on all repos, the `.github` profile repo as the agency's front page, a shared `workflows` repo. Say which of these GitHub Free actually supports; mark anything unverified.
2. **Modules onto the org.** For each ICM module in `01-goals.md`, name where its work lives (operating repo folder, client repo, method repo, Actions, dashboard) and who touches it (Jamie, collaborator, salesman, client). One table.
3. **Collaborator lifecycle.** Invite, what they clone and read first (the method repo and the client repo's `CLAUDE.md`), what they may never see, how their work reaches the client folder (PRs on the client repo; status by CI into the dashboard), offboarding at handover. A one-page onboarding note they could be sent.
4. **Sync paths, each with its direction and trigger.** Client folder frontmatter → generated `mani.yaml` → conformance PRs; method repo → copier update PRs on every client repo; client repo CI → dashboard status; dashboard write-back → operating repo commits; Projects threads → client repos (same owner). Say what breaks if a step runs twice or out of order.
5. **Secrets and keys.** Per-repo secrets on GitHub Free, network secrets on the Claude cloud environment, the service account for Google, the Vercel token. Where each lives, who rotates it, how a leak is caught.
6. **Costs and limits.** Actions minutes on private repos against the planned sweeps; Vercel seats; when paying for GitHub Team would be justified.
7. **Verify-once list.** Take the four items from `04-github-organisation.md` §7, add any new ones, and write each as a check with the expected result.

## Runbook rules

- Ordered, numbered, one command or click per step, each followed by the check that proves it worked.
- Rename first, then settings, then gitleaks per repo, then transfers, then Vercel reconnects, then secrets and rulesets, then the reference-repo merge. Follow `04-github-organisation.md` §5 unless the research gives a reason to change the order; say the reason.
- Use `gh api` and the Vercel CLI; no scripts that drive the whole migration in one go. Jamie runs each step and ticks it.
- Anything irreversible (transfer, archive, history rewrite, rename) gets a one-line warning and a rollback note.

## Done when

Both files exist, every rule has a why and a date, nothing has been changed on GitHub, Vercel or Claude, the interview answers are recorded in the design file, and the last message says which steps of the runbook Jamie can run today versus after the org name is chosen.
