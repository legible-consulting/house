# Stub: Check how the Neon integration serves Preview when it makes a branch for each preview

- lane: chore
- found-by: the environment variable inventory for the blueprint Neon redesign (`legible-consulting/blueprint` pull request 34) · 2026-10-28
- complexity: low
- priority: P1

## Problem

The new blueprint design lets the Neon integration make a branch `preview/<git branch>` for each preview. Its database contract says that Preview has no `DATABASE_URL` for all branches. The inventory of 2026-10-28 shows that the integration itself sets `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `PG*`, `POSTGRES_*`, `NEON_PROJECT_ID` and `NEON_AUTH_BASE_URL` on Preview for all branches, on each project where it is connected to Preview. A person cannot delete a variable that the integration owns. So the rule may be wrong, and the cleanup stubs of each client wait on this check.

The inventory also shows that the integration already serves the custom environment `uat` (agorasim, berceo and the remi-ai project `app` list the integration's variables on `Preview, uat`).

## Proposed change

Jamie checks the integration on agorasim, one time, before any cleanup:

1. Vercel → kodominio → Storage → the store of `uat-agorasim` → Settings. Read which environments it serves. Read whether it makes a branch for each preview deployment.
2. Turn on the branch for each preview deployment, and the deletion of the branch with its git branch.
3. Open a small pull request in agorasim. Read the Neon project `uat-agorasim`: a branch `preview/<git branch>` must exist before the build ends.
4. Read the preview's build log and its variables: is `DATABASE_URL` the branch's, or the base's?
5. Close the pull request and delete the branch. Read that the Neon branch is gone.

## Acceptance criteria

- [ ] The answer is recorded in this stub's Notes: the integration does, or does not, keep a `DATABASE_URL` on Preview for all branches when it makes a branch for each preview.
- [ ] The answer is recorded: the branch exists before the build starts, or it does not.
- [ ] The answer is recorded: the Neon branch is deleted with the git branch, or it is not.
- [ ] When the integration keeps the Preview variable for all branches, a blueprint triage stub asks to change the rule "No `DATABASE_URL` on Preview for all branches" and the setup stub `neon-vercel-integration`.

## Notes

- Never read or copy a value. Names only.
- The cleanup stubs `env-cleanup-<repo>` follow this answer.
- The Neon organisations are on the free plan. A free project has a limit on the count of branches. Read the limit in the Neon console during the check.
