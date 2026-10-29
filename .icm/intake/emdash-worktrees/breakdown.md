# Breakdown: A new Emdash task worktree of a build is ready to work in, with no install by hand

- epic-slug: emdash-worktrees
- source: Jamie, 2026-10-29: Goose runs inside Emdash on the local lane from 2026-10-29. Emdash gives each task its own git worktree under `~/emdash/worktrees/`. A new worktree has no `node_modules` and no `.env`, so each new worktree starts with an install by hand.

## What I understood

Emdash reads one file at the root of a repo when it makes a task worktree: `.emdash.json`, the project's shareable settings. Three of its keys matter here. `preservePatterns` lists untracked or gitignored files that Emdash copies from the primary checkout into the new worktree, such as `.env`. `scripts.prepare` is a command that runs in the new worktree before Emdash activates it, so the agent does not start before it ends. `scripts.setup`, `scripts.run` and `scripts.teardown` follow the project's auto-run settings and are for the environment, the app and the cleanup. A person's own settings in the Emdash UI override the shared file for scripts and preserve patterns. The reference is https://emdash.sh/docs/project-config.

Three facts shape the scope:

1. **Emdash copies, it does not link.** `preservePatterns` makes a private copy of each match. There is no shared directory. Each worktree installs its own `node_modules`, and a monorepo's Turborepo cache is not shared. The install is one command from the lockfile.
2. **`.emdash.json` is JSON and takes no Jinja.** The same file serves a single-app render and a `monorepo` render, so the template copies it as is. CI parses it with `jq`.
3. **`.emdash.json` is committed, so it holds no secret.** The `env` key is for a person's own settings, not for the shared file.

The live repos use two package managers: npm (`package-lock.json`) in berceo, vinecliff and messy-play, and pnpm (`pnpm-lock.yaml`) in agorasim, remi-ai and jamienisbet. Agorasim and remi-ai answered `monorepo` yes. All six are on `v1.0.3`.

### Questions for Jamie

1. **Which script runs the install.** Default: `scripts.prepare: bash .icm/scripts/worktree-setup.sh` (why: prepare blocks the activation, so the agent finds `node_modules` on its first command; `setup` runs only when auto-run is on, which is a person's setting). The other answer: `scripts.setup`, and the agent can start before the install ends.
2. **A `scripts.run` line for the dev server.** Default: no (why: a dev server is not the agent's job, and the guard `block-local-checks.sh` refuses it; Jamie starts one himself when he needs one).

Both are open. A session builds stub 1 only after Jamie answers here.

## Decisions of record

- **The ticket lives in the house. The change lives in the blueprint**, as for `blueprint-pipeline` and `blueprint-environments`. Each stub is one pull request on the repo it names, then the move of the stub to `_done/` in the house (why: the desk reads the house, and the blueprint is the one home of a rendered file · Jamie, 2026-10-29).
- **Each worktree installs its own `node_modules`.** Nothing is shared between worktrees (why: Emdash copies and does not link, and an install in one worktree must not change another · 2026-10-29).
- **The setup script is the blueprint's `.icm/scripts/worktree-setup.sh`.** It runs one install command from the lockfile at the root: `pnpm install --frozen-lockfile` for `pnpm-lock.yaml`, `npm ci` for `package-lock.json`, `yarn install --immutable` for `yarn.lock`, `bun install --frozen-lockfile` for `bun.lock` or `bun.lockb`. It runs no build, lint, typecheck, test, format or dev command (why: CI is the source of truth, `~/.claude/CLAUDE.md` · Jamie, 2026-10-29).
- **`preservePatterns` lists `.env` and `.env.local`** (why: `vercel env pull` writes `.env.local`, Next.js reads both files, and Emdash skips a missing match · Jamie, 2026-10-29).
- **A workspace has no `.emdash.json`** (why: a workspace holds no code and no lockfile · 2026-10-29).
- **The epic is fourth in `README.md` § Order**, after `blueprint-environments` (Jamie, 2026-10-29).

## Build order

1. emdash-worktree-files — the blueprint renders `.emdash.json` and the setup script for a build, never for a workspace — depends-on: none
2. check-emdash-files — `conventions/README.md` gets the Emdash row, and `check.yml` parses the rendered `.emdash.json` with `jq` in each proof answer set — depends-on: emdash-worktree-files
3. stack-goose-emdash — the house `core/stack.md` § Local machine gets the rows for Goose and Emdash — depends-on: none
4. estate-emdash-files — each live repo gets the file and the script in the conformance to the new blueprint tag — depends-on: check-emdash-files

## Out of scope

- `.emdash.json` in the house, the blueprint, the library and `.github`. These repos are not blueprint renders. A need found in a session is a triage stub.
- The Emdash settings that live on the machine: the worktree directory, the default branch, telemetry, a person's own scripts and preserve patterns. Stub `stack-goose-emdash` names where they live, and does not set them.
- The `scripts.run`, `scripts.teardown`, `shellSetup` and `env` keys of `.emdash.json`, beyond question 2.
