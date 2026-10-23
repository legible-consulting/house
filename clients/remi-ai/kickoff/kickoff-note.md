# Remi AI: kickoff note

The working agreement as it stands on 2026-10-23. The relationship predates the house: work
started 2026-08-26 and the shares were transferred on 2026-09-28. This note records the
rhythm, not the terms. The terms are in the signed minutes in Drive (`record.md`).

## Roles

- **Morgane Paquet** decides what is built. She is the product owner and writes the user
  stories. She does not read GitHub.
- **Arnaud Ruelle** is business and money.
- **Jamie Nisbet** is CTO. He builds alone, owns the repo `k0d0minio/remi-ai`, the Vercel team
  `remi21` and the merge.

## Rhythm

- One sync with Morgane a week, on Slack, on Fridays. The 25 August 2026 call set the rhythm.
  The 23 October 2026 call is at 16:00 Europe/Lisbon.
- Two fixed dates: FunMedDev's team tests on 1 December 2026. The open day is 19 December
  2026. The horizon stays 19 December (Jamie, 2026-10-23).

## How work flows

1. Morgane writes a story. It lives in the Drive folder `remi-ai/user-stories/`. It is never
   committed to the repo.
2. Jamie scopes the story. One story becomes one epic: a folder under `.icm/intake/<epic-slug>/`
   in the client repo, with a `breakdown.md` and one stub per unit of work. The breakdown's
   `source:` line links the story in Drive.
3. One stub is one branch and one pull request. `.icm/scripts/new-run.sh` starts it.
4. Jamie ticks the two gates, **Spec approved** and **Ready to merge**, and merges. A session
   never ticks a gate and never merges.
5. The merge is the release. The release workflow posts it to Slack.

## Questions for Morgane

- A session writes them numbered, one per line, each with a default answer, in the breakdown
  under « What I understood ».
- They reach Morgane in French, as a Google Doc in the Drive folder `remi-ai/`, because she
  does not read GitHub. Jamie carries her answers back into the breakdown.

## The estate

- Repo: `k0d0minio/remi-ai`, blueprint tier `platform`, tag v0.6.0 since 2026-10-22.
- Vercel team `remi21`: six projects, one per app (`record.md`).
- One Neon database serves preview and production. Previews never run migrations (decision
  D-25, 2026-09-26).
- Secret names only, in `kickoff/access-table.md`. Values live in Vercel and GitHub settings.
