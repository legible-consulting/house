# Stub: Each Google read a contract owns is one script, so a module runs it from anywhere

- feature-slug: house-reads-google
- epic: google-service-account
- sequence: 3 of 3
- depends-on: service-account-setup
- complexity: medium
- priority: P2

## Problem

The contracts that read Google do it through a connector a person is signed in to: client research reads a thread and a Drive folder, kickoff reads the answers from a Google Doc for a training client, the desk's Inputs name the business email. A module that runs in the cloud routine, in CI or in a goose session has no connector.

## Proposed change

`core/google/` gets one script per read that a contract names today, each on the REST API with the key: `drive-list.sh <folder>` (the files of a client's folder, as a table), `doc-text.sh <id>` (a Google Doc as markdown), `calendar-day.sh <date>` (the day's events), `mail-thread.sh <id>` (one thread as text, headers and bodies). Each contract that owns such a read names its script in Inputs. The connectors stay for a person's own reading. One pull request on the house.

## Acceptance criteria

- [ ] The four scripts exist, each under 60 lines, each prints text or a markdown table to stdout and nothing else, and each fails in words with no key or no access.
- [ ] `02-client-research/CONTEXT.md`, `06-kickoff/CONTEXT.md` (training) and `desk/CONTEXT.md` name the script for each read they own, and say that a connector is a person's route, not the module's.
- [ ] Each script runs from a cloud session with the environment's secret and prints the same as from the laptop.
- [ ] `core/stack.md` Connectors paragraph says what a connector is for after this stub, with the date.
- [ ] A read of a client's thread or document by a script is listed in the contract's Inputs with the date, so the boundary "read email, calendar and Drive without asking" names its readers.

## Out of scope

- A write of any kind. `place.sh` is the one write (stub `place-from-anywhere`).
- A search across mail. A thread is read by its id, which a person gives.
