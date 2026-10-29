# Stub: A session reads a YouTube short, a Facebook or Instagram reel or a LinkedIn post as text

- lane: chore
- found-by: the review of the research library against the house · 2026-10-29
- complexity: medium
- priority: P2

## Problem

The research intake fetches with yt-dlp and trafilatura (`research/intake.md` step 4c). Since 2026-10-25, 13 of 160 verdict files are "Facebook reel: decline, no item to judge", and every YouTube short failed on the cloud's bot check. A LinkedIn post has no route at all. Jamie shares from the phone, and a third of the shares end as a file with nothing in it. `research/verdicts/agent-reach.md` (watch, 2026-10-25) names one tool that reads YouTube with no login, and reads X, Reddit and Facebook with a login. Jamie's word, 2026-10-29: a session must read YouTube reels, LinkedIn posts, and Facebook and Instagram reels.

## Proposed change

The intake gets a second fetch route for each social host, and a share that no route can read stays in the queue for Jamie's one word instead of a permanent file. One pull request on the house: `core/setup/cloud.sh`, `research/intake.md`, `research/CONTEXT.md` Inputs, the verdict's update note, and `core/stack.md`.

## Acceptance criteria

- [ ] `core/setup/cloud.sh` installs the chosen tool, pinned, and the setup log ends with its `ok` line. `core/stack.md` has its row.
- [ ] `intake.md` step 4c names the route per host: YouTube, Facebook, Instagram, LinkedIn. Each route runs with no login and no cookie in the cloud environment, or the step says that the host has no such route.
- [ ] An item that no route can read is not written as a verdict. Its queue file stays, with one line `Pointer unresolved: <reason>` under its frontmatter. The desk's `/research` lists it under "Needs a name", and Jamie types the name or deletes the file from the phone.
- [ ] The 13 unresolved reel files in `research/verdicts/` are deleted in the same pull request. The queue holds nothing for them: their links are in the files' Source lines, and Jamie decides which to share again.
- [ ] `research/verdicts/agent-reach.md` gets an update note with the verdict after the test: adopt for the routes that pass with no login, or decline with the reason.

## Questions

1. Which tool? Default: Agent Reach for YouTube (no login) and a test of its Facebook and Instagram routes without a login. If a route needs cookies, the answer for that host is no: a credential in an unattended cloud run is against `CLAUDE.md` Boundaries.
2. LinkedIn has no public read without a login. Default: the share from the phone carries the post's text in the queue file's `text` field, and the intake reads that. The `/share` page asks for it when the host is LinkedIn.
3. Does a session in the cloud (not the intake) use the same route? Default: yes. The tool is in `cloud.sh`, so any session on the house has it.

## Out of scope

- A login channel of any kind. The boundary stands.
- The `/research` page's redesign. One list under one heading.
