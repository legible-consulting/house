---
title: "MotoArk: demo video outline"
kind: note
client: motoark
date: 2026-10-22
---
# MotoArk: demo video outline

Internal, English. For the video Jamie records before the follow-up call on Fri 23 Oct 2026.
Sam asked for: how Jamie goes from design into an agentic build, testing, DevOps, and the
hardening and bug fixes after. "Doesn't need to be anything crazy." Screen recording, 8 to 12
minutes, one ticket from request to release.

## The project to show

Jamie's pick: the project with the development flow he is proud of (a platform with the full
loop: intake, CI, preview, release-please). If it is a client's repository, the client's
consent to show it to a third party comes first (`core/terms.md` § Ownership). If no consent,
use `remi-ai` (Jamie holds the CTO role) or a blueprint render.

## Shape: one ticket, start to finish

| Minute | Show | Say |
|---|---|---|
| 0 to 1 | Jamie, the repo root | Who I am. What Sam asked. One sentence on the method: the folder tree is the plan, each area has a contract, anyone starts cold. |
| 1 to 3 | The request | A business requirement as Sam, John or Mahmoud would state it. It becomes a ticket: the intake folder, the epic, the stub. The contract the ticket routes to: inputs, process, outputs, the human gate. |
| 3 to 5 | The build | Start a session from the ticket. It reads the contract, branches, builds, commits. Show several sessions running in parallel on other tickets. "Fifteen sessions in fifteen minutes." |
| 5 to 7 | The test and the check | The pull request opens. The checks and tests run on the PR. The preview deployment: click through the change. "The preview is where the client signs off. Nothing is checked on a laptop." |
| 7 to 8 | The gate and the release | Merge is a person's click. The release PR opens. Its merge is the release. The release notes. |
| 8 to 9 | Hardening | The error tracker. The fail-safe page. A bug that came back as a ticket and went through the same loop. |
| 9 to 10 | MotoArk | Month 1: your repositories carry this. The bus test, answered in the repo. See you Friday. |

## Rules for the recording

- Show the method. Do not describe it. Each step is visible on the screen.
- Check every screen for secrets before recording: environment files, dashboards, tokens in
  terminal history.
- Use Sam's words: garages, sellers, parts, listings, version one, version two.
- Sam dislikes the word "agentic". Say "the sessions" and "the loop".
- No price in the video. The price is in the proposal.
- No exclamation marks. Short sentences.

## Send with it

- The proposal as PDF (rendered by Jamie until the CI render exists).
- The link to the video.
- The calendar invite for Fri 23 Oct 12:00 UAE. That is 09:00 Lisbon, not 10:00 as said on the
  call. The invite settles it.
