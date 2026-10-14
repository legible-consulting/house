# 4.2 GitHub and Folder Structure

*AI Animations & Workflows › Module 4: Building Websites · Author: Jake Van Clief · Source: text lesson*

## Summary

Takes the website from 4.1 and explains the difference between saving, staging, committing and pushing, and what a readable project layout looks like. It describes a recommended folder shape with an entry file for the agent, docs for voice, design tokens and requirements, source folders with short readmes, public assets and an ignore file. The practical exercise is to make one approved heading change and inspect the diff without committing, pushing or deploying.

## Core concepts

- **Four separate steps:** edits change the working copy; staging selects; a commit records a snapshot; a push sends commits to a remote. A push may trigger a deployment workflow whose result must be inspected.
- **Branch and publishing source:** the publishing configuration determines which branch, folder or workflow deploys the site.
- **Entry file per tool:** Claude Code reads one instruction file name, Codex another; the file should say what the project is, key paths, how to preview and where it deploys, and name supporting files explicitly because folder readmes are not guaranteed to be read.
- **Ignore rules do not erase history:** they keep untracked files out of future commits only; a committed secret must be revoked or rotated first, then the repository cleaned.
- **Never embed credentials in browser code.**
- **Single writer for the first exercise.**
- **Tidy is not correct:** a neat folder cannot guarantee correct edits.

## Frameworks and methods

Inspect first without changing; propose one change; approve; make only that change; show diff; stop. Confirm the changed-file list contains no unrelated files or secrets before choosing commit and publish moments.

## Tools, settings and resources

- **Git, GitHub, GitHub Desktop** — history, remote, optional diff viewer.
- **GitHub Pages docs** — publishing source configuration.

## Apply to icm-workshop

- **D4 estate conformance:** the folder map and the "carries only what it uses" check align; adopt the explicit-secrets-and-ignore item as part of the conformance report.
- **Boundary — one home per fact:** brand voice and design tokens each live in one docs file referenced from the entry file; matches C1.
- **Boundary — CI is truth:** the push-versus-deployed distinction reinforces reading CI results rather than assuming success.
- **O4:** the four-step save/stage/commit/push explanation is a good beginner handout.
