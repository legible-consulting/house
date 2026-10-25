---
tool: React Big Schedule
kind: repo
verdict: watch
tier: deep
modules: [D2]
tags: [react, calendar, booking]
recheck: 2027-04-25
source: https://github.com/react-scheduler/react-big-schedule
shared: https://www.facebook.com/share/r/1HKp87io2t/
via: Dail Finds Dev - Repos, Tools, Sites
date: 2026-10-25
---

# React Big Schedule

React Big Schedule is a React calendar and resource scheduler: month, week, day, list and year views, a resource timeline, drag and drop, recurring events and time zones. Version 9 dropped Ant Design and is ESM only. Ansul Agrawal maintains it. Licence MIT.

## Verdict: watch

Watch (why: a Site build can include a "booking or menu flow" (`core/services.md`, The lines), and a resource timeline is real work to build; but it ships its own stylesheet and themes, outside the house's Tailwind and shadcn vocabulary (`core/stack.md`), and no current build needs a resource calendar · 2026-10-25).

## What would change it

- An App or Platform build needs staff or room scheduling on a timeline.
- It gains a headless mode that takes Tailwind classes.

## How the house would use it

D2, the booking or scheduling view of an App build. It would replace a hand-built timeline. The build would restyle it to the client's shadcn theme.

## To try

https://react-big-schedule.ansulagrawal.com. A good result: the resource timeline handles drag and drop on a phone.

## Source

https://github.com/react-scheduler/react-big-schedule · fetched 2026-10-25 · "React Big Schedule". Found by search: the post names the tool with no link. The npm page links the same project under ansulagrawal. gh api refused (HTTP 403: repository not enabled for this session); README and licence read from raw.githubusercontent.com.
