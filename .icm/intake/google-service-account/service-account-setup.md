# Stub: One Google service account with a key that every runner of the house can read

- feature-slug: service-account-setup
- epic: google-service-account
- sequence: 1 of 3
- depends-on: none
- complexity: medium
- priority: P2

## Problem

No key for Google exists anywhere in the house. A session reaches Drive, Calendar and Gmail through the claude.ai connectors only, and `place.sh` reaches Drive through the GNOME mount on the laptop only. No script of the house can touch Google from CI or from the cloud.

## Proposed change

Jamie makes a Google Cloud project, a service account, and domain-wide delegation on the `jamienisbet.com` tenant for the scopes of the breakdown's question 2, and downloads one JSON key. He puts the key in the three places the breakdown names and nowhere else. The session writes the words: `core/stack.md`, the root `.env.example`, `core/setup/local.sh`, and a smoke read `core/google/whoami.sh` that lists one Drive folder with the key. One pull request on the house, and Jamie's hand for each act, asked in the session.

## Acceptance criteria

- [ ] A service account exists, with domain-wide delegation for Drive, Docs, Calendar (events) and Gmail read-only, impersonating `contact@jamienisbet.com`. The scopes are listed in `core/stack.md` with the date.
- [ ] `GOOGLE_SERVICE_ACCOUNT_KEY` is an Actions secret on the house and a network secret of the `legible` environment. The laptop reads it from the keyring. The name, and the three places, are in the root `.env.example`. No file in any repo holds the value, and `gitleaks` is green.
- [ ] `core/google/whoami.sh` prints the name of the `Clients/` Drive folder and nothing else, with the key, from the laptop, from a cloud session and from a `workflow_dispatch` run of a house workflow.
- [ ] `core/stack.md` Cloud environment says "Network secrets: `GOOGLE_SERVICE_ACCOUNT_KEY`", with the why, and `core/CONTEXT.md` holds `google/**`.
- [ ] `core/setup/local.sh` prints `ok google key` or `MISSING google key`.

## Out of scope

- Any write to Drive. Stub `place-from-anywhere`.
- A Gmail send scope. Never granted.

## Notes

- Jamie's hand, in order: the Cloud project, the service account, the key, the delegation in the Workspace admin console (the client ID and the scopes), then the secret in GitHub, in the cloud environment dialog and in the keyring. The session names each act and waits.
- The key is a JSON file at download. It is deleted from the laptop once the three places hold it.
