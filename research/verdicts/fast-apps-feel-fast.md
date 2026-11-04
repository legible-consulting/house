---
tool: Fast apps feel fast
kind: article
verdict: adopt
tier: deep
use: [build]
tags: [video, react, mobile]
recheck: 2027-05-04
source: https://www.facebook.com/share/r/1FEYsnMwkW/
via: Motion Ui Interface
date: 2026-11-04
---

# Fast apps feel fast

A reel by Motion Ui Interface. It says most of the speed a user notices is design, not servers, and it gives six tricks: an optimistic update shows the result before the server replies; a skeleton screen shows the shape before the content; a blurred preview of about 1 KB fills an image box first; a progress bar starts slow and finishes fast; an upload starts before the user submits; a search shows its work instead of a spinner.

## Verdict: adopt

Adopt for `build`, as the default checklist for a loading state (why: the house's apps run on Next.js with shadcn/ui and Motion (`core/stack.md`, the desk app row), where a skeleton, an optimistic update and a blurred image placeholder are standard parts; the six tricks are common practice, not a claim to test, and the cost is nothing · 2026-11-04).

## What would change it

- The blueprint's conventions get their own loading-state rules. Then those are the one home, and this file only points at them.
- An optimistic update shows a result that the server then refuses, and the build has no clear undo for it. Then that trick applies only where the server rarely refuses.
- An early upload sends a file the user did not submit. Then it needs the privacy page's consent first (`core/services.md`, "In every build").

## How the house would use it

Build, at a ticket that adds a screen that waits for data, in an App or Platform build (`07-build/CONTEXT.md`): a skeleton in place of a spinner, an optimistic update for a like, a toggle or a reorder, and a blurred placeholder for each image. It adds a shared checklist; it replaces a spinner chosen per screen.

## To try

In a build's list screen, replace the spinner with shadcn/ui's `Skeleton` in the shape of the rows, then load the preview on a throttled phone connection. A good result: the screen never shows an empty box, and the content replaces the skeleton with no layout shift.

## Source

https://www.facebook.com/share/r/1FEYsnMwkW/ · fetched 2026-11-04 · "Fast apps aren't always fast. They feel fast." Caption read with yt-dlp 2026.10.26 (uvx). No captions on the route. "Which one have you noticed before?" and "Save this for your next loading state" are calls to act.
