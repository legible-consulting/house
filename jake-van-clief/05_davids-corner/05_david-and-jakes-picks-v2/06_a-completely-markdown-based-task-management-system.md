# A completely markdown based task management system

*David's Corner › David and Jake's Picks V2 · Author: Roc (member; post summarised by David's Corner) · Source: text lesson (links to original post)*

## Summary

Roc's example keeps tasks as Markdown, syncs through Git, uses hooks, and has an AI propose priorities. The page's value is the exercise: three fictional tasks each with owner, status and next action; update one, inspect the change, ask an assistant to propose a priority from those records only. The review asks whether task state can be reconstructed from the saved files, noting that local text works offline while sync and cloud model calls need a network.

## Core concepts

- **Tasks as plain text** are inspectable and exportable.
- **Owner, status, next action** are the minimum fields.
- **Priority from the records only,** not from assistant memory.

## Apply to icm-workshop

- **C3 desk:** the Friday review's "one flat open-items list" could be generated from per-client task lines; keep the owner, status and next-action fields structured. The goals note invoice facts need structure (tension 4); the same reasoning applies here.
- Adapt the Git hook idea only as a CI or commit check, consistent with "CI is truth".
- Original post not read; hook details unverified.
