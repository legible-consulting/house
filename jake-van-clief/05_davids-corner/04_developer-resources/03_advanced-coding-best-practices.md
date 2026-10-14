# ADVANCED: Coding Best Practices

*David's Corner › Developer Resources · Author: David Herrera (named member) · Source: text lesson (attached reference file)*

## Summary

David Herrera shares the coding-conventions file he gives Claude, built from roughly twenty years of his own code so that generated code matches his mental model. The page's framing is that the conventions are personal (line limits, headers, no-autosave, dark-theme defaults, folder layouts) and should be reconciled with a project's existing conventions. The reference covers a philosophy of code as something navigated spatially through the folder tree, universal rules, an inline-documentation scheme, folder patterns for several languages, style and naming tables. His own comment says many of these rules belong in the project instructions file rather than a coding standard.

## Core concepts

- **Navigability first:** the tree and names act as landmarks; test is whether a file's role is clear from the tree alone.
- **Small units:** modest function and file size limits keep code holdable in the head.
- **Library-first design:** write functions so extraction means moving files, not rewriting.
- **Deliberate persistence:** every write traces back to a user action; no background saves.
- **Error transparency and dead-code deletion:** never swallow errors; delete rather than comment out, as version control keeps history.
- **Inline status for the model:** a fixed header per source file with status, known issues and to-dos gives the assistant context as it opens each file; to-dos there are breadcrumbs, not the project plan, and are cleaned up when the file is touched.

## Frameworks and methods

The folder-by-language section applies one principle (group by domain, descriptive names, thin entry point, small focused files) to JavaScript/TypeScript, Rust, C and Swift, with a general fallback pattern for new languages. The naming table maps casing conventions per artefact type.

## Tools, settings and resources

- **David Herrera's Best Practices** — attached file with the full text.

## Claims and evidence

- Generated code matches the author's style because of the training corpus — anecdote from the author, no comparison given.

## Apply to icm-workshop

- **D2 SDLC and D4:** adapt per-tier template conventions: pick a small set (descriptive naming, small files, dead-code deletion, error transparency) and make them checkable in CI rather than prose. Reject copying his language-specific style tables; Jamie's tiers have their own stacks.
- The file-header idea clashes with "one home per fact": status and to-dos in each file could drift from the plan files, so reject it or keep it for sandbox repos.
- Herrera's remark that rules belong in CLAUDE.md supports lean Layer 0 files with stage contracts holding detail.

## Open questions

- Which of these rules can a CI check enforce without a local run?
