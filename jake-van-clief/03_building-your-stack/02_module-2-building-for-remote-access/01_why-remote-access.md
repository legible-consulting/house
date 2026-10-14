# 2.1 Why Remote Access

*Building Your Stack › Module 2: Building for Remote Access · Author: Jake Van Clief · Source: text lesson*

## Summary

Decides whether remote access solves a real problem, then shows you can get to the correct machine, issue a single tightly scoped instruction and examine what comes back before trusting the setup with longer tasks. The central fact is that the work still runs on the host machine, which must stay awake, online and running the agent; the phone or browser only steers the session. The lesson also spells out what data travels and gets stored, and names a Codex equivalent.

## Core concepts

- **Host does the work:** commands and file access run on the host computer; sleep interrupts availability, and reconnecting does not mean the work continued while asleep.
- **Session capacity depends on mode:** an interactive process offers one remote session; server mode supports several. Check account eligibility, organisation controls and the official guide first.
- **Data still moves:** prompts and outputs go to the provider, and while connected the vendor stores the conversation transcript including tool activity to sync devices, so review the data policy before using sensitive material.
- **Codex alternative:** Codex has its own remote option: you can launch, steer and check work from the ChatGPT phone app, provided a Mac or Windows host is connected and its desktop app stays open.
- **Prove it with a harmless file:** a practice folder with one file listing three invented tasks; ask for a read-only listing with the path and compare.
- **Scope real tasks:** name the output, permitted files and the decision point; a completion message is the start of review, not the end.

## Frameworks and methods

Decide if it solves a problem, connect, run a read-only check, review the result, then scope real work with permitted files and a decision point.

## Tools, settings and resources

- **Claude Code Remote Control** — official guide and data usage policy linked on the page.
- **Codex Remote** — OpenAI remote connections guide.
- Dates and rollout availability are not stated; check current docs.

## Apply to icm-workshop

- **Boundary — every module runs from anywhere:** this is the core mechanism, but note the caveat that the host must be up. Goals tension 1 (projects gitignored on disk) means a remote session to Jamie's machine is not the same as a cloud session reaching repos through remotes; adapt by preferring cloud sessions for modules and keeping this for steering.
- **C3 desk:** the phone leg of "morning glance on phone, dashboard, Google and terminal" can use a check, decide, capture pattern; see 2.3.
- **Security:** transcript storage affects client material; adopt a rule on which client folders may be steered remotely, with its why and date.
- **Never in git / secrets:** keep credentials out of anything a remote session reads.

## Open questions

- Which modules must be reachable when the home machine is off, forcing cloud sessions instead?
