# Breakdown: The house reaches Google through one service account, from any session and any runner

- epic-slug: google-service-account
- source: Jamie, 2026-10-29, in the review of the open tickets: "we need to setup a proper google service account api key so we don't need to rely on MCP servers". The session read `research/concepts/google-service-account-delegation.md` (adopt, 2026-10-14), `research/verdicts/google-workspace-apis.md`, `gam7.md`, `gogcli.md`, `gws.md`, `core/CONTEXT.md` (the renderer and `place.sh`), `core/stack.md` (Cloud environment, Connectors), `CLAUDE.md` Boundaries, and `core/identity.md`.

## What I understood

Today the house reaches Google two ways. A session on the desktop or the phone reads mail, calendar and Drive through the claude.ai connectors, which belong to the account and not to any repo. `place.sh` copies a PDF into the client's Drive folder over the GNOME mount, on the laptop, by Jamie's hand, because no Drive key exists anywhere (`core/CONTEXT.md`). Kickoff for `kind: training` places `questions.md` in Drive as a Google Doc. Neither route works from CI, from the `legible` cloud environment, or from a session of the local lane's agent. "Every module runs from anywhere" is not true for any step that touches Drive.

Jamie wants one service account with its own key, so that a script does the Google step wherever it runs, and a session does not depend on a connector. The concept of 2026-10-14 says how: a service account owns nothing on Drive, so it impersonates `contact@jamienisbet.com` through domain-wide delegation on the Workspace tenant; the files stay Jamie's; one key as a secret works from any runner. It also says the risk: a key is a credential, and the house keeps no credential in git (`CLAUDE.md`).

The epic is three steps. Jamie makes the account and the key and puts the key where secrets live. A house script places a document in Drive through the API, so `place.sh` runs from anywhere and the mount route goes. Then the reads a module names (a client's Drive folder, the calendar, a thread) get one script each, so a module calls the script and not a connector.

### Questions for Jamie

1. Is `jamienisbet.com` a Google Workspace tenant with Jamie as admin? Default: yes (`gam7.md`: "Jamie is his own admin"). If no, domain-wide delegation is not possible, and the account can only own files that are shared to it; this breakdown is then re-cut.
2. Which scopes? Default: Drive (files), Docs, Calendar (events), Gmail read-only. Gmail send is not asked (why: the desk and the sessions send nothing to a client, `CLAUDE.md` Boundaries).
3. Where does the key live? Default: an Actions secret on the house, `GOOGLE_SERVICE_ACCOUNT_KEY`, and a network secret of the `legible` cloud environment under the same name. The laptop reads it from the keyring through one line in `core/setup/local.sh`. Never in a file of any repo. `core/stack.md` Cloud environment then says "Network secrets: one", with the why.
4. Do the connectors stay? Default: yes, for a person's own reading in a session. A module's contract names the script, not the connector, for every step it owns.
5. Which tool wraps the API? Default: none. Thirty-line scripts on the REST API with the key (`google-workspace-apis.md`), in `core/google/`, held by `core/CONTEXT.md`. GAM7 and gogcli stay `adopt` and `watch` for a person at a terminal.

## Decisions of record

- **One service account, impersonating `contact@jamienisbet.com`.** Files it places are Jamie's, with no quota of their own and no expiry (why: the concept of 2026-10-14; a token of an OAuth app in "Testing" expires in seven days · 2026-10-29).
- **The key is a secret, never a file in a repo.** Its name is in `.env.example` at the house root, in the three places it lives (why: `CLAUDE.md` Boundaries, and `core/CONTEXT.md` holds the names · 2026-10-29).
- **A module names a script, not a connector.** `place.sh`, the kickoff's Google Doc, and each read a contract owns go through `core/google/` (why: every module runs from anywhere, and a connector runs only where a person is signed in · Jamie, 2026-10-29).
- **The scripts send nothing.** No Gmail send scope is granted (why: the boundary. A key that can send is a key that can send to a client · 2026-10-29).
- **A placed file keeps its link.** The script replaces a file of the same name in place, as `place.sh` does today, and never writes a file whose name starts with the signed kind (why: `core/CONTEXT.md`, the rule of 2026-10-22 · 2026-10-29).

## Build order

1. service-account-setup — Jamie makes the account, the delegation and the key; the stack, `.env.example` and `local.sh` name it; a smoke read proves it from the cloud and from Actions — depends-on: none
2. place-from-anywhere — `place.sh` places a PDF through the Drive API with the key, from the laptop, the cloud and `render.yml`, and the mount route leaves — depends-on: service-account-setup
3. house-reads-google — one script per read a contract names today: a client's Drive folder listing, a Google Doc's text, the calendar's events for a day, a thread's text; each contract names its script — depends-on: service-account-setup

## Out of scope

- Any send through Gmail or Calendar invites. The boundary.
- The desk app. It reads the house and GitHub; it has no Google step.
- The salesman. The booking link is sent from the salesman's own account.
