# Stub: A new Orca worktree of a build installs its dependencies and gets its env files with no hand step

- feature-slug: orca-worktree-files
- epic: orca-worktrees
- sequence: 1 of 4
- depends-on: none
- complexity: medium
- priority: P2

## Problem

The blueprint renders no file that Orca reads. A new worktree of a build has no `node_modules` and no `.env`, so a person installs by hand before each agent can work.

## Proposed change

The blueprint renders `orca.yaml`, `.worktreeinclude` and the setup script into each build, and into no workspace. The three files are the blueprint's, so `copier update` keeps them equal to the blueprint.

## Acceptance criteria

- [ ] A render with `workspace` no has `orca.yaml` and `.worktreeinclude` at the root. A render with `workspace` yes has neither.
- [ ] No path of the three files is in `_skip_if_exists` in `copier.yml`. The comment above `_skip_if_exists` names them as blueprint files.
- [ ] `orca.yaml` has `scripts.setup` and `setupAgentStartupPolicy` as breakdown questions 2 and 3 decide. It has `worktree.sharedDirectories` as question 1 decides for a single-app render and for a `monorepo` render. It has no `defaultTabs` unless question 4 says yes.
- [ ] `.worktreeinclude` lists the env files that question 5 decides, one literal path for each line, with no glob.
- [ ] The setup script selects the install command from the lockfile that it finds at the root. It runs no build, lint, typecheck, test, format or dev command.
- [ ] With no lockfile, the script prints one line and exits 0. With two lockfiles, or with the package manager not installed, it names the cause and exits 1.
- [ ] Each path in `sharedDirectories` and `.worktreeinclude` is a path that the rendered `.gitignore` ignores.

## Out of scope

- The conventions row and the `yq` check (stub `check-orca-files`).
- The live repos (stub `estate-orca-files`).

## Notes

- One pull request on `legible-consulting/blueprint`, then the move of this stub to `_done/` in the house.
- Commit type `feat(template):`, as blueprint pull request 37.
- Orca takes literal paths only, and skips a path that is missing, tracked or not ignored. Copier does not know a monorepo's app names, so the render names no `apps/<app>/node_modules`. The install makes them.
- Proposed file names: `template/{% if not workspace %}orca.yaml{% endif %}.jinja`, `template/{% if not workspace %}.worktreeinclude{% endif %}` and `template/{% if not workspace %}.icm{% endif %}/scripts/worktree-setup.sh`, executable.
- Orca keeps a trust record for each repo's setup script, with a hash of its content. A change to the script can make Orca ask Jamie again.
- The schema is in `stablyai/orca` `src/shared/orca-yaml-hook-types.ts`. The page `docs/model/worktrees` describes `sharedDirectories` and `.worktreeinclude`.
