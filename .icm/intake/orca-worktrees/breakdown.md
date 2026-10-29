# Breakdown: A new Orca worktree of a build is ready to work in, with no install by hand

- epic-slug: orca-worktrees
- source: Jamie, 2026-10-29: Goose runs inside Orca on the local lane from 2026-10-29. Orca gives each agent its own git worktree under `~/orca/workspaces/`. A new worktree has no `node_modules` and no `.env`, so each new worktree starts with an install by hand. The research read the blueprint at `origin/main` (`c1ff121`, after `v1.0.3`): `copier.yml`, `conventions/README.md`, `.github/workflows/check.yml`, `template/.gitignore.jinja` and the intake contract. It read the six live repos on `main`, the house `core/stack.md` and the Orca docs. The page `docs/model/orca-yaml` gave HTTP 404 on 2026-10-29. The research read the same facts on `docs/model/worktrees` and in the Orca source, `stablyai/orca` `src/shared/orca-yaml.ts` and `src/shared/orca-yaml-hook-types.ts`.

## What I understood

Orca reads two files at the root of a repo when it makes a worktree. `orca.yaml` holds `worktree.sharedDirectories` (gitignored directories that Orca links from the primary checkout), `scripts.setup` (a command that runs once in the new worktree) and `setupAgentStartupPolicy` (`start-immediately` or `wait-for-setup`). `.worktreeinclude` lists gitignored files that Orca copies into the new worktree, for example `.env`. Both are blueprint files. Every build gets them at the next `copier update`, as `.goosehints` did in blueprint pull request 37. A workspace (`workspace` yes) has no code and gets neither file.

The reading changes two parts of the scope that Jamie gave:

1. **Orca takes literal paths only.** `sharedDirectories` and `.worktreeinclude` skip globs, and skip each path that does not exist in the primary checkout or that git does not ignore. Copier does not know the names of a monorepo's apps. Thus the blueprint cannot render `apps/<app>/node_modules`. The install in the setup script makes the nested `node_modules` directories in each worktree.
2. **A shared `node_modules` and an install in the setup script work against each other.** A shared directory is a link to the primary checkout. An install in the worktree writes through the link into the primary checkout. `npm ci` deletes `node_modules` first, so in berceo, vinecliff and messy-play it deletes the install of the primary checkout. A branch that changes the lockfile changes the install of every worktree. Question 1 asks Jamie to choose. The default shares no `node_modules`.

The live repos use two package managers: npm (`package-lock.json`) in berceo, vinecliff and messy-play, and pnpm (`pnpm-lock.yaml`) in agorasim, remi-ai and jamienisbet. Agorasim and remi-ai answered `monorepo` yes. All six are on `v1.0.3`.

### Questions for Jamie

1. **The shared directories list.** Default: a single-app render shares no directory, and `orca.yaml` has no `worktree` key. A monorepo render shares `.turbo` only, the Turborepo cache at the root. Each worktree installs its own `node_modules` (why: `npm ci` deletes `node_modules` through the link, an install in one worktree changes the install of all worktrees, and pnpm installs from its store in seconds). The other answer: share `node_modules`, and the setup script installs nothing.
2. **The setup script.** Default: `scripts.setup: bash .icm/scripts/worktree-setup.sh`, a blueprint script. It reads the lockfile at the root and runs one command: `pnpm install --frozen-lockfile` for `pnpm-lock.yaml`, `npm ci` for `package-lock.json`, `yarn install --immutable` for `yarn.lock`, `bun install --frozen-lockfile` for `bun.lock` or `bun.lockb`. With no lockfile it prints one line and exits 0. With two lockfiles, or with the tool not installed, it names the cause and exits 1. It runs no build, lint, typecheck or test (why: a script file gets the `shellcheck` pass that `check.yml` gives each rendered script, and a YAML block does not).
3. **The startup policy.** Default: `setupAgentStartupPolicy: wait-for-setup` (why: a commit hook or a script that the agent runs can need `node_modules`, and an install takes less than one minute). The other answer: `start-immediately`, the Orca default, and the agent starts while the install runs.
4. **A default tab that launches Goose.** Default: no. `orca.yaml` has no `defaultTabs` (why: the Orca create dialog already launches the agent that Jamie selects, and a blueprint file that names one agent binds every client repo to that agent).
5. **`.env.local` in `.worktreeinclude`.** Default: yes. The file lists `.env` and `.env.local` (why: `vercel env pull` writes `.env.local` by default, Next.js reads both files, and Orca skips a path that does not exist).
6. **The place of `orca-worktrees` in `README.md` § Order.** Default: fourth, after `blueprint-environments` (why: the two epics touch `check.yml` and `conventions/README.md` in different rows, so the order between them is Jamie's choice only).

Answered by Jamie in the session on 2026-10-29: the six defaults stand, and they are written into the decisions below.

None is open.

## Decisions of record

- **The ticket lives in the house. The change lives in the blueprint**, as for `blueprint-pipeline` and `blueprint-environments`. Each stub is one pull request on the repo it names, then the move of the stub to `_done/` in the house (why: the desk reads tickets from the house, and the blueprint holds no tickets · Jamie, 2026-10-27).
- **Each worktree installs its own `node_modules`.** A single-app render has no `worktree` key in `orca.yaml`. A `monorepo` render shares `.turbo` only (why: `npm ci` deletes `node_modules` through a link, and an install in one worktree changes the install of all worktrees · Jamie, 2026-10-29).
- **The setup script is the blueprint's `.icm/scripts/worktree-setup.sh`.** `orca.yaml` has `scripts.setup: bash .icm/scripts/worktree-setup.sh`. The script runs one install command from the lockfile at the root: `pnpm install --frozen-lockfile`, `npm ci`, `yarn install --immutable` or `bun install --frozen-lockfile`. With no lockfile it prints one line and exits 0. With two lockfiles, or with the tool not installed, it names the cause and exits 1. It runs no build, lint, typecheck, test, format or dev command (why: a script file gets the `shellcheck` pass, and CI is truth · Jamie, 2026-10-29).
- **The agent waits for the setup.** `setupAgentStartupPolicy: wait-for-setup` (why: a hook or a script that the agent runs can need `node_modules` · Jamie, 2026-10-29).
- **No default tab.** `orca.yaml` has no `defaultTabs` (why: the Orca create dialog launches the agent that Jamie selects, and a blueprint file that names one agent binds each client repo to it · Jamie, 2026-10-29).
- **`.worktreeinclude` lists `.env` and `.env.local`**, one literal path for each line (why: `vercel env pull` writes `.env.local`, Next.js reads both files, and Orca skips a missing path · Jamie, 2026-10-29).
- **The epic is fourth in `README.md` § Order**, after `blueprint-environments` (Jamie, 2026-10-29).

## Build order

1. orca-worktree-files — the blueprint renders `orca.yaml`, `.worktreeinclude` and the setup script for a build, never for a workspace — depends-on: none
2. check-orca-files — `conventions/README.md` gets the Orca row, and `check.yml` parses the rendered `orca.yaml` with `yq` in each proof answer set — depends-on: orca-worktree-files
3. stack-goose-orca — the house `core/stack.md` § Local machine gets the rows for Goose and Orca — depends-on: none
4. estate-orca-files — each live repo gets the two files in the conformance to the new blueprint tag — depends-on: check-orca-files

## Out of scope

- `orca.yaml` and `.worktreeinclude` in the house, the blueprint, the library and `.github`. These repos are not blueprint renders. A need found in a session is a triage stub.
- The Orca settings that live on the machine: Worktree Shared Paths, the agent launch defaults, the trust of a repo's setup script. Stub `stack-goose-orca` names where they live, and does not set them.
- The `environmentRecipes`, `issueCommand` and `scripts.archive` keys of `orca.yaml`.
