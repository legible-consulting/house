# Built always-on AI Chief of Staff that texts me.

*David's Corner › David and Jake's Picks V2 · Author: Justin (member; post summarised by David's Corner) · Source: text lesson (links to original post)*

## Summary

Justin's assistant, called Emma, runs on a MacBook and connects to messages, calendar, email and project tools. The page presents it as an architecture example, not proof of reliability or independence from cloud services. The exercise has you draw the path of one morning briefing (source, host, model or script, draft, review), naming which parts need a network, account or permission, and asking what stops if the host stops and what state is saved. Keep first runs read-only and review drafts before enabling messages or calendar changes.

## Core concepts

- **Separate host from services:** a local process can still call remote ones.
- **Failure question:** what stops with the host, what is saved.
- **Read-only first,** then drafts, then any write permission.

## Apply to icm-workshop

- **C3 morning glance:** the source, host, script, draft, review path is a template for documenting how the glance is produced. The goals require it to run from anywhere, so a laptop host is the thing to reject; use a cloud or scheduled run.
- Boundaries fit: a session may read email, calendar and Drive and create calendar events; it never sends to a client. Texting a client from an assistant is out.
- Original post not read.
