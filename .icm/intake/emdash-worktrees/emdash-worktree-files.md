# Stub: A new Emdash task worktree of a build installs its dependencies and gets its env files with no hand step

- feature-slug: emdash-worktree-files
- epic: emdash-worktrees
- sequence: 1 of 4
- depends-on: none
- complexity: medium
- priority: P2

## Problem

The blueprint renders no file that Emdash reads. A new task worktree of a build has no `node_modules` and no `.env`, so a person installs by hand before each agent can work.

## Proposed change

The blueprint renders `.emdash.json` and the setup script into each build, and into no workspace. The two files are the blueprint's, so `copier update` keeps them equal to the blueprint.

## Acceptance criteria

- [ ] A render with `workspace` no has `.emdash.json` at the root and `.icm/scripts/worktree-setup.sh`, executable. A render with `workspace` yes has neither.
- [ ] No path of the two files is in `_skip_if_exists` in `copier.yml`. The comment above `_skip_if_exists` names them as blueprint files.
- [ ] `.emdash.json` has `preservePatterns` with `.env` and `.env.local`, one literal path for each entry, with no glob. It has the install under the script key that the breakdown's question 1 settles. It has no `env` key and no `scripts.run` key unless question 2 says otherwise.
- [ ] `.emdash.json` is the same for a single-app render and a `monorepo` render.
- [ ] The setup script selects the install command from the lockfile that it finds at the root: `pnpm install --frozen-lockfile`, `npm ci`, `yarn install --immutable` or `bun install --frozen-lockfile`. It runs no build, lint, typecheck, test, format or dev command.
- [ ] With no lockfile, the script prints one line and exits 0. With two lockfiles, or with the package manager not installed, it names the cause and exits 1.
- [ ] Each entry of `preservePatterns` is a path that the rendered `.gitignore` ignores.

## Out of scope

- The conventions row and the `jq` check (stub `check-emdash-files`).
- The live repos (stub `estate-emdash-files`).

## Notes

- One pull request on `legible-consulting/blueprint`, then the move of this stub to `_done/` in the house.
- Commit type `feat(template):`, as blueprint pull request 37.
- Proposed file names: `template/{% if not workspace %}.emdash.json{% endif %}`, copied as is, and `template/{% if not workspace %}.icm{% endif %}/scripts/worktree-setup.sh`, executable.
- A person's own Emdash settings override the shared scripts and preserve patterns on that machine. The rendered file is the default for everyone who opens the repo in Emdash.
- The reference is https://emdash.sh/docs/project-config. The variables a script can read are there too: `EMDASH_ROOT_PATH`, `EMDASH_TASK_PATH`, `EMDASH_TASK_NAME`, `EMDASH_DEFAULT_BRANCH`, `EMDASH_PORT`.
