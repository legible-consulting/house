# Stub: A rendered PDF lands in the client's Drive folder from the laptop, the cloud or CI

- feature-slug: place-from-anywhere
- epic: google-service-account
- sequence: 2 of 3
- depends-on: service-account-setup
- complexity: medium
- priority: P2

## Problem

`place.sh` copies a PDF into `Clients/<folder>/` with `gio` over the GNOME mount. The mount exists only when Jamie opens the Google account in Files on the laptop. A proposal rendered by `render.yml` in CI waits for Jamie's laptop to reach the client's folder.

## Proposed change

`place.sh` uploads through the Drive API with the service account's key, impersonating Jamie. It finds `Clients/<folder>/` by name, replaces a file of the same name in place so the link stays, and never writes a file whose name starts with the signed kind. The `gio` route leaves. `render.yml` gains a `workflow_dispatch` input `place: true` that places the PDFs of a merged document on `main`, on Jamie's word. One pull request on the house.

## Acceptance criteria

- [ ] `place.sh <client> <pdf>` prints `RESULT: PLACED <name>` from the laptop, from a cloud session and from `render.yml`, with no mount.
- [ ] A file of the same name is replaced in place, and its Drive link is the same before and after.
- [ ] A name that starts with `Signed`, `Signé` or `Assinado` is never written, and the script says so.
- [ ] A client whose `drive_folder` or slug matches no folder under `Clients/` fails in words and writes nothing.
- [ ] `core/CONTEXT.md` Outputs and `core/stack.md` § The renderer say the API route and no longer name `gio` or the mount. The line "CI never places" becomes "CI places on Jamie's word, by `workflow_dispatch`", with the why.
- [ ] `03-proposal/CONTEXT.md`, `04-quote/CONTEXT.md` and `05-agreement/CONTEXT.md` name the new step where they named the mount.

## Out of scope

- A Google Doc from markdown. Stub `house-reads-google` carries the Docs read; a Docs write is a later stub if a contract asks.
