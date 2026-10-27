# Stub: A rendered build can read `.env.example`, and a workspace registers only the guards

- feature-slug: deny-list-and-settings
- epic: blueprint-pipeline
- sequence: 1 of 13
- depends-on: none
- complexity: low
- priority: P0

## Problem

`template/.claude/settings.json` denies `Read(./**/.env.*)`. The glob matches `.env.example`, the one env file the kickoff, the UAT setup and the written-once manifest tell a session to read. vinecliff found this on 2026-09-23 and fixed it with a named list. The `v0.6.0` render put the glob back, and the four live clones carry it again. The same file will have to register two build-only hooks (units 6 and 7) that a workspace must not register.

## Proposed change

`settings.json` becomes `settings.json.jinja`. The deny list names each env file, as `~/.claude/settings.json` does, and leaves `.env.example` readable. The two build-only hook registrations sit inside `{% if not workspace %}`. `check.yml` asserts the list.

## Acceptance criteria

- [ ] `template/.claude/settings.json.jinja` exists and `template/.claude/settings.json` does not.
- [ ] `permissions.deny` is exactly: `Read(./**/.env)`, `Read(./**/.env.local)`, `Read(./**/.env.*.local)`, `Read(./**/.env.development)`, `Read(./**/.env.production)`, `Read(./**/.env.preview)`, `Read(./**/.env.staging)`, `Read(./**/.env.test)`, `Read(./**/.env.vercel)`, `Read(./**/*.pem)`, `Read(./**/*.key)`, `Read(./**/secrets/**)`.
- [ ] `hooks.PreToolUse` is as today. Inside `{% if not workspace %}`: `UserPromptSubmit` runs `bash "$CLAUDE_PROJECT_DIR/.claude/hooks/route-request.sh"` and `SessionStart` runs `bash "$CLAUDE_PROJECT_DIR/.claude/hooks/session-start.sh"`. The two hook files arrive in units 6 and 7. Until then a rendered build registers a hook whose file is absent, so the two registrations are added in this unit but commented in the Jinja source, and units 6 and 7 uncomment each one.
- [ ] `check.yml`, the render job, after the render: `jq -r '.permissions.deny[]' .claude/settings.json` contains `.env.local` and does not contain `.env.*)`. A build's `.claude/settings.json` parses as JSON.
- [ ] The four proof sets render green.

## Out of scope

- The house's own `.claude/settings.json`, which carries the same glob. Unit 12.

## Notes

Read first: the breakdown, `template/.claude/settings.json`, `copier.yml`, `.github/workflows/check.yml` (the render job's `need` block), `~/.claude/settings.json` on Jamie's machine for the named list, and vinecliff's `.icm/intake/triage/_done/settings-deny-blocks-env-example.md` for the history. Copier strips the `.jinja` suffix on render, so the rendered name stays `settings.json`. The house's `guards` job compares the three hook files by name and does not read `settings.json`.

## Prompt

Repo legible-consulting/blueprint, cloud or desktop. Attach legible-consulting/house read-only. Read CLAUDE.md, README.md and conventions/README.md in the blueprint, then .icm/intake/blueprint-pipeline/breakdown.md in the house whole, then this ticket, .icm/intake/blueprint-pipeline/deny-list-and-settings.md, then the files its Notes name. Do what it says. One branch, one pull request to main in the blueprint, Conventional Commits, technical text in Simplified Technical English. Render the proof sets into a scratch folder with copier to check your work. Read check.yml. Do not merge. Then one pull request in the house that moves this stub to .icm/intake/blueprint-pipeline/_done/, the one write to the house. Your last message names both pull requests and what waits on Jamie.
