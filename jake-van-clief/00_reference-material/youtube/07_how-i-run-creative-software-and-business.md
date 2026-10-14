# How I Run Creative, Software, and Business Work as One System (Ai memory vs Human memory?)

*YouTube · Author: Jake Van Clief · Published: 2026-04-28 · Length: 14:04 · Views: 11,908 (as of 2026-10-14) · Link: https://youtu.be/hALln9wrrQo*

## Why it made the top 10

Scores: influence 19.9/40 · educational 23/40 · fit 16/20 = 58.9/100. Its distinct contribution is a compact taxonomy of three ways to give a model memory (by content, by link, by position) and an argument for why position wins for client work; the coursework uses folders but never sets them against vector stores and self-maintained wikis this directly. It overlaps with note 10 (second brain); read this one for the addressing taxonomy and the business framing, note 10 for the build.

## Summary

An animated essay arguing that creative, technical and business work collapse into one problem once a single folder structure carries the context. Jake uses a paid client project (four animated, voiced explainer videos for NLP Logix) as the running example. The middle section compares three bets on AI memory: embeddings in a vector database, an LLM-maintained wiki in the style Karpathy published, and the plain folder tree, where the path itself tells the model which client, pipeline and conventions apply. The close reframes the same folder as the agency template, a licensable asset and the reason AI can take the logistics while the human keeps the taste. A viewer leaves with vocabulary for choosing a memory approach and a case for treating the folder template as the product.

## Core concepts

- **Content-addressed memory (vector embeddings):** everything is turned into numbers and recalled by similarity; it works but is slow to set up, costly to keep running and can return loosely related notes when you wanted one precise thing. He stresses this is a description of trade-offs, not an attack.
- **Link-addressed memory (LLM wiki):** markdown entity pages that an agent audits for contradictions and orphans; he likens it to Bush's Memex and to his own ICM, but it only stays useful while a maintenance model keeps tending it.
- **Position-addressed memory (folder paths):** opening a file deep in a client project already implies the client, the pipeline and the file conventions; nothing is embedded or retrieved, location does the routing.
- **Context cascade:** the root CLAUDE.md applies everywhere and each project's CONTEXT.md adds to it, the way environment variables or CSS specificity narrow from general to specific. "The folder name is a namespace."
- **Human memory as a layer:** the person remembers where things live and steers the model through the tree with short prompts; position addressing is the only one of the three a human can read at a glance.
- **Folder as agency:** a new client gets a copy of a ready structure (routing rules, context files, brand templates, voice files, scene primitives, export settings), so work is filling in rather than designing.
- **Logistics versus taste:** the model handles brand-colour matching, re-takes, renaming and resizing; script writing, strategy, performance and rebuilding scenes that do not land stay with him.

## Frameworks and methods

1. **Pick a memory bet by addressing mode:** content (similarity search), link (maintained wiki pages), position (paths). All three can coexist; for work due to a client this week he ranks position cheapest, fastest and most legible.
2. **Three lenses on one artefact:** the cascading brand voice is the creative system, the path-as-memory is the software system, the cloned client template is the business system; the model runtime underneath is interchangeable (local, Claude, Codex).
3. **Clone, don't design:** start each client by copying the template folder and adding a project subfolder that inherits voice and patterns from above.

## Tools, settings and resources

- **Karpathy's LLM wiki gist** — the link-addressed approach — referenced, no link given in the transcript.
- **OpenBrain, Obsidian second brains, PG vector, MCP servers** — named as the typical vector-memory stack.
- **Hermes** — named as another wiki-style open-source system.
- **ElevenLabs voice clone** — reads his scripts for client videos.
- **Git and Azure DevOps (or plain GitHub)** — stated plan for a production version of the folder system; not shown.
- **His Skool community** — promoted at the end; free courses.

## Claims and evidence

- Four fully animated, voiced videos delivered in a day, against an agency norm of three weeks per video — his own report on a paying client — self-reported, sales context, unverified.
- His small operation can now compete with 100 to 150 person firms — assertion only — unverified.
- The folder structure is licensable IP that other companies are asking for — anecdote — no named buyer.
- Vector setups often pull the wrong notes after days of indexing — illustrative scenario, not data.
- He says Karpathy posted the wiki idea in the same month as recording — dated to roughly April 2026.

## Key moments

- [0:02] Thesis: three kinds of work, one underlying problem.
- [0:32] The NLP Logix brief and the four-videos-in-a-day claim.
- [1:33] The person spending days on a vector database that still misfires.
- [2:04] Bet one: vector embeddings and their costs.
- [2:34] Bet two: the LLM wiki, the Memex, and its upkeep cost.
- [3:35] Bet three: the path as context; CLAUDE.md to CONTEXT.md cascade.
- [4:38] Unix, CSS and the content / link / position taxonomy.
- [6:11] The folder as the agency; copying it for each new client.
- [7:14] Folder structure as licensable IP; advisor rather than vendor.
- [8:16] Voice clone and the logistics-versus-taste split.

## Related coursework

- `jake-van-clief/01_the-foundation/02_build-it-around-your-work/02_design-your-folder.md` — repeats the wiki shape as one option; this video extends it by naming the addressing difference and the maintenance cost.
- `jake-van-clief/06_the-legends/04_bas-rosario-memory-engineering/03_class-2-of-3-structure-and-retrieval.md` — extends: Bas covers being found within loaded context; Jake's position addressing is a way to decide what gets loaded at all.
- `jake-van-clief/05_davids-corner/04_developer-resources/02_hermes-cognee-architecture-and-tradeoffs.md` — contrasts: that stack is content-plus-graph memory, which Jake ranks below folders for client work.
- `jake-van-clief/01_the-foundation/05_history-and-concepts/06_video-as-code-my-ai-animation-stack.md` — repeats the animation pipeline and the human-keeps-the-creative-cuts point; this video adds the business model around it.
- `jake-van-clief/01_the-foundation/03_automate-it-keep-your-judgment/03_keep-it-useful-hand-it-on.md` — repeats handing the folder to collaborators so they inherit context.

## Apply to icm-workshop

- **C2 client folder, boundary every module starts cold:** adopt position addressing as the design rule; a client folder's path (and the module subfolder inside it) should tell a cold session which client and which stage it is in before it opens a file.
- **C1 shared core, boundary one home per fact:** adopt the cascade explicitly: voice, terms and house rules declared once at the root, module contracts adding only what is specific, client folders adding only client facts.
- **O1 research:** reject vector stores and LLM-maintained wikis as default memory; log adopt / watch / decline verdicts with recheck dates. A wiki that needs a model tending it constantly would also breach the unattended-run boundary (only three sweeps allowed).
- **O4 training:** adapt the folder-as-agency idea as the pitch for the client ICM workspace template, where the client leaves with their own factory; the clone-don't-design step is the kit's first exercise.
- **Boundary, never build an orchestrator:** his planned Git / Azure DevOps production version is worth watching, but in this repo the folders stay the pipeline.

## Open questions

- What does his production version on Git / Azure DevOps actually add over a cloned folder, and does it drift towards an orchestrator?
- Does position addressing hold when one fact (a price, a contact) is needed across many client folders, or does it push towards duplication?
