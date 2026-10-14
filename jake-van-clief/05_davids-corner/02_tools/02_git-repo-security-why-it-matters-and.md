# Git Repo Security: Why It Matters, and ...

*David's Corner › Tools · Author: David · Source: text lesson*

## Summary

David's guide is about vetting a public repository before depending on it. It offers two community-built agent skills for gathering evidence (a quick health check and a deeper evidence collector) and a method for turning the findings into a traceable decision: what was checked, what is unknown, and whether the repo suits the intended use. The page is explicit that the skills use custom scoring (weights, caps, verdict bands) and are not official OpenSSF certification or proof of safety. The package was not executed during the page refresh.

## Core concepts

- **Five opening questions:** is it the genuine project, who maintains it, what do tests and security policy cover, how are releases built and delivered, does the licence fit.
- **Depth matches stakes:** a throwaway example and a dependency touching client data need different scrutiny; re-review after major releases or new advisories.
- **Missing evidence is unknown, not a pass:** an imputed midpoint score is not a check passed.
- **Heuristics, not verdicts:** Scorecard-style checks have false positives and negatives; signatures and SBOMs add evidence but do not show behaviour is harmless.
- **Read-only first:** do not install dependencies or run repo code during assessment.

## Frameworks and methods

1. Choose review depth by stakes.
2. Gather public evidence (repo health signals, then deeper API signals if warranted).
3. Report version or commit, date, checks run, failures and unknowns.
4. Pick a format: short card, executive brief or evidence table.

For repos you maintain, the page lists applicable controls: a reporting policy, reviewed changes, dependency updates, secret protection, tested workflows, and pinning third-party CI actions to full commit SHAs.

## Tools, settings and resources

- **repo-scorecard and repo-eval skills** — attached package; inspect before running; compatibility untested by the page.
- **OpenSSF Scorecard, Concise Guide for Evaluating OSS, SLSA, Sigstore, OSV, EPSS, CISA KEV** — linked references; links as of the page's refresh.

## Claims and evidence

- Custom 1-10 score and verdict bands — contributor design — not an official standard.
- EPSS as a 30-day exploitation estimate — page's note — combine with exposure checks.

## Apply to icm-workshop

- **D4 estate conformance:** adopt the "unknown is not a pass" rule and the report fields (commit, date, checks, unknowns) for the conformance report, and add a secret-free check for dormant repos, consistent with the boundary "never in git: credentials".
- **O1 tool research:** use the read-only assessment as the evidence step before an adopt, watch or decline verdict on any third-party skill or repo, with a recheck date.
- **CI is truth:** pinning actions to SHAs is a candidate conformance rule for tier templates; scripts themselves should be read, not run locally by habit.
- Reject installing the attached skills unreviewed; they are custom tooling.

## Open questions

- Does the attached package match the page after the refresh? Inspect before any use.
- Which of the SHA-pinning and secret-protection checks already live in Jamie's tier templates?
