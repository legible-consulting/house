---
title: "Tool and concept research — audited verdicts"
kind: reference
status: audited
owner: jamie
date: 2026-10-14
source: https://claude.ai/artifact/KL8Pd5jPep16VVREz2bFvj (full ledger, 188 rows; 114 dropped at audit and not recorded here)
recheck: adopt → 2027-04-14 · watch → 2027-01-14
---

# Tool and concept research — audited verdicts

Every line is a verdict with its why and its date (the audit date above). Licence and latest
release were verified on 2026-10-14 against GitHub, PyPI, npm or vendor docs. **Adopt** = goes
into the reference layer when the module that needs it is built. **Watch** = recorded, not used,
rechecked on the date above. Rows are grouped by the goal codes in `01-goals.md`.

## ICM references (Layer 3 for the rebuild)

| Item | Verdict | Why | Facts |
|---|---|---|---|
| [RinDig/Interpretable-Context-Methodology](https://github.com/RinDig/Interpretable-Context-Methodology) | adopt | The protocol's own conventions: 15 patterns in `_core/CONVENTIONS.md`, CONTEXT.md ≤ 80 lines, references ≤ 200, zero-padded kebab-case stages, `{{SCREAMING_SNAKE}}` placeholders, `setup` and `status` trigger words. No CLI tooling shipped. | MIT · ~1.3k stars · 21 commits |
| [RinDig/icm-architect](https://github.com/RinDig/icm-architect) | adopt | Defines the six forms (pipeline, umbrella, record library, knowledge bundle, context map, system map), the walk test and the reference-integrity gate. Model-driven skill: run only inside a session Jamie steers. | MIT · ~1.9k stars |
| [arXiv 2603.16021 (HTML)](https://arxiv.org/html/2603.16021v2) | adopt | Paper text online; the PDF is at `jake-van-clief/00_reference-material/icm.pdf`. Names no tools; its "Verify section", provenance markers and edit-source principle are workshop material. | CC BY 4.0 · v2 2026-03-18 |
| [mcmespinaa/folder-structure-protocol](https://github.com/mcmespinaa/folder-structure-protocol) | watch | Mine its scored audit rubric and 14 anti-patterns for the conformance checks; its five skills are model-driven, not scripts. | MIT · 6 stars |
| [filesnfolders.com](https://filesnfolders.com/blog/icm-paper-plain-english) | watch | Plain-English explainer and free 6-folder/2-file starter by a non-coder; source for O4 workshop framing. Affiliate for Clief Notes. | third party |
| [ai.miraheze.org ICM page](https://ai.miraheze.org/wiki/Interpretable_Context_Methodology) | watch | Keeps the one named criticism online: ICM lacks programmatic validation of stage contracts. Its enterprise-deployment claims are unverified. | community wiki |
| Community videos [Lk2bqochfig](https://www.youtube.com/watch?v=Lk2bqochfig), [uyjCVNOiYsM](https://www.youtube.com/watch?v=uyjCVNOiYsM) | watch | Third-party small-business setup walkthroughs; not Jake's channel, which `00_reference-material/youtube/` already mines. | third party |

## A. Repo structure, validation and voice (C1, C2, D4, every module)

| Tool | Verdict | Why · what it offloads | Licence · latest |
|---|---|---|---|
| [jq](https://github.com/jqlang/jq) | adopt | JSON filter language; post-processes yq and mdq output; roll-ups in CI. | MIT · 1.8.2 (2026-06) |
| [yq](https://github.com/mikefarah/yq) | adopt | `--front-matter=extract` / `=process` turns every record's frontmatter into a JSON row or edits it in place. The hinge for all other checks. | MIT · 4.54.1 (2026-09) |
| [mdq](https://github.com/yshavit/mdq) | adopt | "jq for Markdown": select a section (`## Inputs`), task items, links, tables; markdown or JSON out. Reads the one section instead of the whole file. | Apache-2.0 · 0.10.0 (2026-03) |
| [mq](https://github.com/harehare/mq) | watch | Fuller markdown query language; single maintainer, API still moving. Recheck against mdq. | MIT · 0.9.3 (2026-10) |
| [check-jsonschema](https://github.com/python-jsonschema/check-jsonschema) | adopt | CLI and pre-commit hook; validates `_config/*.yaml` and yq-extracted frontmatter against JSON Schema. Does not parse markdown itself. | Apache-2.0 · 0.38.2 (2026-09) |
| [yamllint](https://github.com/adrienverge/yamllint) | adopt | Duplicate keys, indentation, truthy values caught before a model reads the file. | GPL-3.0 · 1.38.0 (2026-01) |
| [ls-lint](https://github.com/loeffel-io/ls-lint) | adopt | Directory and filename rules from `.ls-lint.yml`: kebab-case, regex, must-exist. Lints the folder tree itself. | MIT · 2.3.1 (2025-06) |
| [pre-commit](https://github.com/pre-commit/pre-commit) | adopt | One config runs check-jsonschema, yamllint, gitleaks; `pre-commit run --all-files` in CI. | MIT · 4.7.0 (2026-10) |
| [prettier](https://github.com/prettier/prettier) | adopt | Formats markdown with frontmatter so diffs show content only. | MIT · 3.9.10 (2026-10) |
| [glow](https://github.com/charmbracelet/glow) | adopt | Terminal markdown renderer; read a CONTEXT.md without asking a model to summarise it. | MIT · 3.0.0 (2026-08) |
| [ripgrep](https://github.com/BurntSushi/ripgrep) · [fd](https://github.com/sharkdp/fd) · tree · [eza](https://github.com/eza-community/eza) | adopt | Excerpts (`rg -n`, `tree -L 2`) instead of whole files in the context window. | MIT/Unlicense · rg 15.2.0, fd 10.5.0, tree 2.3.2, eza 0.23.5 |
| [ast-grep](https://github.com/ast-grep/ast-grep) · [difftastic](https://github.com/Wilfred/difftastic) | adopt | AST search and structural diff for client code repos in the SDLC pipeline. | MIT · 0.50.0 / 0.71.0 (2026) |
| [tokei](https://github.com/XAMPPRocky/tokei) / [scc](https://github.com/boyter/scc) | adopt | Lines per language; size a repo before packing anything into a prompt. Pick one. | MIT · 15.0.0 / 4.1.0 (2026-09) |

## B. Documents: PDF, slides, sites, diagrams, extraction (S3, S4, S5, D3, O4)

| Tool | Verdict | Why · what it offloads | Licence · latest |
|---|---|---|---|
| [Typst](https://typst.app) | adopt | Single-binary typesetter that reads shared-core and client YAML in the template (`yaml()`, `--input`), pins fonts (`--font-path --ignore-system-fonts`), emits PDF/A and PDF/UA, reproducible with `--creation-timestamp`. The model writes the body only. Decision 2026-10-14: markdown-to-PDF goes through pdfcn (see Decisions below); Typst stays recorded as the data-driven alternative. | Apache-2.0 · 0.15.1 (2026-07) |
| [pdfcn](https://github.com/shadcn-labs/pdfcn) | adopt | Jamie's choice for markdown-to-PDF (2026-10-14). MIT registry of React PDF components (invoice, report, tables, forms, charts) installed with the shadcn CLI, so the code is owned, not a dependency. Two interchangeable renderers: Takumi (Rust) and Forme (HTML→PDF); server-side in Node 20.9+, no browser; PDF 1.7, fonts embedded and subsetted. Takes JSX, not markdown, so a markdown-to-components step is part of the build. By "shadcn-labs", not affiliated with shadcn. ~2.9k stars, last commit 2026-09-24, no release tags yet. | MIT · untagged (2026-09) |
| [gogcli](https://github.com/steipete/gogcli) | watch | Google Workspace CLI: `gog drive upload x.docx --parent id --convert-to doc`, `gog docs export`, `gog slides create-from-markdown`; needs own OAuth client. Alternative to GAM7 for Drive pushes. | MIT · 0.44.0 (2026-10-11) |
| [gws](https://github.com/googleworkspace/cli) | watch | Google's official Workspace CLI, Discovery-generated, JSON output, pre-1.0 "expect breaking changes"; ships optional MCP server and agent skills. Recheck at 1.0. | Apache-2.0 · 0.22.5 (2026-03) |
| [Marp CLI](https://github.com/marp-team/marp-cli) | adopt | One markdown file per workshop to HTML/PDF/PPTX; brand via a CSS theme; PDF export needs a browser. | MIT · 4.5.1 (2026-09) |
| [Astro](https://astro.build) | adopt | Static dashboard built in CI from client folders; content collections validate frontmatter against a schema at build; glob loader over md/yaml anywhere. | MIT · 7.3.8 (2026-10) |
| [mdBook](https://rust-lang.github.io/mdBook/) | adopt | Book-style site from a markdown folder for the workshop and course handbook. | MPL-2.0 · 0.5.4 (2026-07) |
| [D2](https://d2lang.com) | adopt | Text to SVG/PNG/PDF/PPTX diagrams, no browser; TALA layout now open source. | MPL-2.0 · 0.9.0 (2026-09) |
| [Graphviz](https://graphviz.org) | adopt | DOT to SVG/PDF for dependency graphs. | EPL-2.0 · 16.1.0 |
| [mermaid-cli](https://github.com/mermaid-js/mermaid-cli) | watch | Mermaid to SVG/PNG/PDF; needs Puppeteer and Node 22.13+. D2 covers most cases. | MIT · 12.0.0 (2026-09) |
| [poppler / pdftotext](https://poppler.freedesktop.org) | adopt | `pdftotext -layout` before any model reads a client PDF. | GPL · 26.10.0 (2026-10) |
| [pdfcpu](https://pdfcpu.io) | adopt | Merge, stamp, watermark drafts, forms, validate, sign in CI. | Apache-2.0 · 0.16.2 (2026-10) |

## C. Estate, templates, secrets, CI, write-back (D2, D4, S1, C2)

| Tool | Verdict | Why · what it offloads | Licence · latest |
|---|---|---|---|
| [gh CLI](https://cli.github.com) | adopt | `gh repo list --json --archived`, `gh repo archive`, `gh run list --status failure`, `gh ruleset`, `gh api`: the estate inventory is a JSON query. | MIT · 2.102.0 (2026-09) |
| [multi-gitter](https://github.com/lindell/multi-gitter) | adopt | Runs a script in every repo and opens one PR per repo; `status`, `merge`. PRs keep the gate human. | Apache-2.0 · 0.63.1 (2026-05) |
| [mani](https://github.com/alajmo/mani) | adopt | `mani.yaml` declares repos and tasks; `sync`, `run`, `exec` by tag. The estate manifest as a file. | MIT · 0.32.1 (2026-05) |
| [safe-settings](https://github.com/github/safe-settings) | watch | Repo settings, branch protection and rulesets as YAML, re-converged by cron. Needs a GitHub organisation; adopt if the estate moves to one. | ISC · 3.0.0 (2026-10) |
| [copier](https://copier.readthedocs.io) | adopt | Scaffolds tiers and re-applies them: `copier update --defaults --conflict rej` regenerates from `.copier-answers.yml` with a three-way merge. Drift is a diff. | MIT · 9.19.1 (2026-10-13) |
| [gitleaks](https://github.com/gitleaks/gitleaks) | adopt | Regex and entropy scan of history and tree; "secret-free" is exit 0. Action and pre-commit hook. | MIT · 8.30.1 (2026-03) |
| [trufflehog](https://github.com/trufflesecurity/trufflehog) | adopt | Verifies credentials live (`--only-verified`), cutting false positives. | AGPL-3.0 · 3.99.2 (2026-10) |
| [git-filter-repo](https://github.com/newren/git-filter-repo) | adopt | Rewrites history to purge a leak before archiving; git's recommended tool. | MIT · 2.47.0 (2024-12) |
| [actionlint](https://github.com/rhysd/actionlint) | adopt | Static check of workflow YAML; runs shellcheck on `run:` blocks. | MIT · 1.7.12 (2026-03) |
| [zizmor](https://github.com/zizmorcore/zizmor) | adopt | Security audit of workflows: injection, unpinned actions, permissions. | MIT · 1.30.1 (2026-09) |
| [release-please](https://github.com/googleapis/release-please) | adopt | Release PR from conventional commits; merging it is the release, so the gate stays human. | Apache-2.0 · 17.11.2 (2026-08) |
| [commitlint](https://github.com/conventional-changelog/commitlint) | adopt | Lints commit messages to the convention release-please reads. | MIT · 21.2.3 (2026-09) |
| [Dependabot](https://github.com/dependabot/dependabot-core) | adopt | GitHub-native; one templated `dependabot.yml` per tier; zero infrastructure. | MIT · 0.400.0 (2026-10) |
| GitHub Actions `schedule:` + failure notifications | adopt | The unattended runner for drift, deadline and recheck jobs. Runs on the default branch; can be delayed under load; auto-disabled after 60 days idle in public repos; "notify only on failure" goes to the workflow's creator. Pair with Healthchecks. | docs |
| [Healthchecks](https://github.com/healthchecks/healthchecks) | adopt | Dead-man's switch: silence from a cron job raises an alert. Hosted free tier is simpler than self-hosting. | BSD-3 · 4.4 (2026-08) |
| [OpenSSF Scorecard](https://github.com/ossf/scorecard) | watch | Repo hygiene checks; private repos need GitHub Advanced Security. | Apache-2.0 · 5.6.0 (2026-10) |
| Custom GitHub App for salesman write-back | watch | GitHub attributes a commit to whoever's token made it: a user access token (8 h, 6-month refresh) plus `PUT /repos/{o}/{r}/contents/{path}` lands the salesman's edit as his own commit. About 150 lines, but Jamie owns OAuth, refresh and sha conflicts. The off-the-shelf CMS routes were dropped at audit; salesman write-back is a separate research project (decision 2026-10-14). | [docs](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-with-a-github-app-on-behalf-of-a-user) |

## D. Money, hours, data, alerts, AI cost (C3, S4)

| Tool | Verdict | Why · what it offloads | Licence · latest |
|---|---|---|---|
| [hledger](https://hledger.org) | adopt | Plain-text double entry: `bal assets:receivable` is owed; `areg … amt:'>0'` invoiced, `'<0'` paid; `--pivot` by client or rep tag; invoicing cookbook in `examples/invoicing`. Money and hours in one grammar. | GPL-3 · 1.52.4 (2026-09) |
| hledger timedot | adopt | `acme.audit  2h` lines; `hledger -f time.timedot bal -W` gives hours per client per week beside the money. | — |
| [DuckDB](https://duckdb.org) | adopt | SQL over CSV/JSON/Parquet with globs; `SELECT client,next_action,deadline FROM read_json('fm/*.json') ORDER BY deadline` is the Friday review; `GROUP BY stage` is the pipeline. | MIT · 1.5.6 (2026-09) |
| [sqlite-utils](https://github.com/simonw/sqlite-utils) | adopt | Persistent queryable copy of folder data when DuckDB's in-memory view is not enough; also llm's log store. | Apache-2.0 · 4.2.1 (2026-08) |
| [dateutils](https://github.com/hroptatyr/dateutils) | adopt | `dateadd`, `datediff`, `dateseq`, `dategrep` for shell alerts without DuckDB. | BSD-3 · 0.4.12 (2026-09) |
| cron / systemd timers | adopt | Schedules the morning glance, Friday review and monthly close; paired with Healthchecks. | — |
| [ccusage](https://github.com/ryoppippi/ccusage) | adopt | Per-engagement Claude spend from `~/.claude/projects/**/*.jsonl`: `--instances` groups by project folder, `projectAliases` folds worktrees, `--offline` cached prices. Cost is list-price "would-cost" under a subscription. Anthropic's usage and cost APIs are closed to individual accounts, so this is the only deterministic source. Rust core since v20; expect churn. | MIT · 20.0.32 (2026-10-14) |
| Claude Code session JSONL | adopt | `~/.claude/projects/<encoded-cwd>/<session>.jsonl` carries cwd, timestamp, model and usage; DuckDB `read_json` plus a price CSV is the offline fallback. Transcripts are pruned after `cleanupPeriodDays` (default 30): run before month end or raise it. | local |

## E. Google Workspace (C3, S3, D1)

| Tool | Verdict | Why · what it offloads | Licence · latest |
|---|---|---|---|
| Drive, Docs, Calendar, Gmail APIs | adopt | `files.create` with `mimeType application/vnd.google-apps.document` converts DOCX, HTML, txt and `text/markdown` to a native Doc; `events.insert`; `messages.list/get/send`. Thirty-line scripts; the primitive every CLI wraps. | free (ToS) · [docs](https://developers.google.com/workspace/drive/api/guides/manage-uploads) |
| One service account with domain-wide delegation | adopt | Service accounts own nothing on Drive (no quota); impersonating jamie@ makes Jamie the owner and never expires; one key as a CI secret works from any cloud runner. OAuth apps left in "Testing" expire refresh tokens after 7 days. Keyless federation chained to delegation is unverified. | docs |
| [GAM7](https://github.com/GAM-team/GAM) | adopt | Workspace admin CLI on the same service account: `gam user j@ add drivefile localfile x.md mimetype gdoc parentid <id>`; calendar and gmail verbs. Jamie is his own admin. | Apache-2.0 · 7.48.26 (2026-10-12) |

## F. Research capture, prospect data (S1, S2, O1)

| Tool | Verdict | Why · what it offloads | Licence · latest |
|---|---|---|---|
| [trafilatura](https://trafilatura.readthedocs.io) | adopt | URL or HTML to main text plus title, author, date, URL as markdown or JSON; the model reads 3 kB of body, not 200 kB of HTML. No model inside. | Apache-2.0 · 2.3.1 (2026-10-06) |
| [monolith](https://github.com/Y2Z/monolith) | adopt | Page to one self-contained HTML file: the evidence snapshot kept beside the markdown. | CC0 · 2.11.5 (2026-10-12) |
| [shot-scraper](https://github.com/simonw/shot-scraper) | adopt | Playwright CLI; `html` returns the post-JavaScript DOM for single-page apps, then pipe into trafilatura. Needs a browser install. | Apache-2.0 · 1.12 (2026-09) |
| [yt-dlp](https://github.com/yt-dlp/yt-dlp) | adopt | `-j` metadata; `--write-auto-subs --convert-subs srt` transcript. Download is deterministic; auto-captions are Google's speech model upstream. | Unlicense · 2026.08.19 |
| [whisper.cpp](https://github.com/ggml-org/whisper.cpp) | watch | Local speech-to-text only when no captions exist; label its output as model-generated. | MIT · 1.9.5 (2026-10) |
| [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API) + [Nominatim](https://nominatim.org) | adopt | Query OpenStreetMap by tag and area (`craft=electrician` in Mafra); geocode with `countrycodes=pt`. The only free list source for local trades by area. ODbL attribution and share-alike on derived databases; fair use about 10k queries a day, 1 request/s on Nominatim; commercial volume means self-hosting. | AGPL software · ODbL data |
| [GLEIF LEI API](https://api.gleif.org/api/v1/lei-records) | adopt | No key; `filter[entity.legalAddress.country]=PT` returned 18,680 legal entities with names and addresses, skewed to finance-facing firms. | CC0 |
| Portuguese sources | watch | publicacoes.mj.pt (web search by name, NIF, municipality; no API); SICAE (CAE by NIF; API unverified); INE via dados.gov.pt (CC BY 4.0 counts by CAE and NUTS); VIES `check-vat-number` (one NIF to name and address); base.gov.pt (public-contract suppliers; API unverified). Sole traders are personal data under GDPR: record a lawful basis per list. | various |
| [newsboat](https://newsboat.org) | watch | Console RSS reader for release feeds; for reading, not scripting. The scripted recheck engine is a separate research item (decision 2026-10-14). | MIT · 2.45 (2026-10) |
| [llm](https://github.com/simonw/llm) + sqlite-utils | adopt | CLI with YAML templates and fragments; every call logged to SQLite (`llm logs`); `llm-anthropic` plugin. A queryable usage log for API calls outside Claude Code. | Apache-2.0 · 0.36 (2026-09) |

## Decisions from the audit (Jamie, 2026-10-14)

Each line closes a gap the audit left; the why is the decision itself.

| Gap | Decision | Note |
|---|---|---|
| Markdown to PDF | Use **pdfcn** (shadcn-labs/pdfcn). | Verified 2026-10-14: React PDF components on the Takumi (Rust) and Forme (HTML→PDF) renderers, generated server-side in a Node/React app, no headless browser, PDF 1.7 with embedded subsetted fonts. Input is JSX, not markdown: the pipeline needs a markdown-to-components step (for example react-markdown into pdfcn blocks). pdfcpu stays for post-processing. |
| Salesman write-back to the prospect folder | Separate research project. | Custom GitHub App stays as the only recorded candidate (watch). |
| Placing documents in a client's Drive folder | Use the **Claude Google Drive connector** from sessions. | GAM7 and the Drive API remain the path for unattended CI jobs, which have no connector. |
| Research recheck engine | Separate research item. | newsboat recorded as watch only. |
| Money truth (Stripe, Revolut) | Out of scope; handled by hand. | Paid status stays a manual entry in the client folder, as `01-goals.md` already says. |
| E-signature | Via **Google Workspace** (Docs eSignature). | No self-hosted signing tool is recorded. |
| Exact Claude token counts before a call | Not a priority. | ccusage after the fact is enough. |
