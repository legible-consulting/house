# 2.3 How a 1953 Word Game Explains AI Memory

*The Foundation › History and Concepts · Author: Jake Van Clief · Source: YouTube (linked video, transcript on disk) plus written page · Length: 14:23 · Link: https://www.youtube.com/watch?v=S3fXSc5z2n4*

## Summary

Jake uses the party game Mad Libs (a template with typed blanks filled by someone who cannot see the story) as an analogy for code, then lays the layers of computer memory next to the layers of AI "memory": model weights, context window, system instructions, retrieved context and persistent memory. His central claim is that in a language model, instructions and data are all text in one stream, which is why prompt injection works. He ends with the Grace Hopper compiler story and argues that prompting is programming at the highest abstraction layer so far. The written page is notably more careful, rewriting several claims, and is the version to rely on. The learner gets a vocabulary for what the assistant actually has in front of it at a given moment.

## Core concepts

- **Template with typed slots:** code, and a well-built prompt, both leave typed blanks for input; the person filling them may not see the whole structure. The page labels this a teaching analogy only.
- **Computer memory hierarchy:** registers, cache, RAM, disk and archival storage trade speed for capacity, and software moves data between levels based on how often it is used.
- **AI memory is several things:** learned weights, the material supplied for a single response, instructions set by the application, material retrieved on demand, and facts saved between conversations.
- **Stored is not active:** a file on disk or an earlier chat is not necessarily in the current request. Only what is actually supplied counts as context; check what the assistant really used.
- **Instructions and source material share a stream:** the video says code and data become the same thing, so reading is executing. The page softens this: they share the input, but authority differs by message role, tool permissions and application controls.
- **Prompt injection:** untrusted text in a loaded document can try to redirect the assistant; treat documents as evidence for the task, not as permission to change it.
- **Prompting as engineering:** the real questions are architectural: how to structure memory files, when to retrieve more, how system-level and user input interact.

## Frameworks and methods

1. Memory ladder for AI: weights, then context window, then system instructions, then retrieved context, then persistent memory, each compared to a computer analogue (read-only memory, working memory, firmware, loading from disk, saved state).
2. Page version of prompt structure: task, context, constraints, output format as an authoring structure, not literal slots inside the model.
3. Practice line: list what belongs in the current task and what can remain in reference files, then ask the assistant to name the source files it used.

## Tools, settings and resources

- **Mad Libs history page and Windows Data Execution Prevention docs** — cited on the page for the game's origin and as one code/data separation defence.
- **Claude context-window documentation** — a provider-specific example linked on the page.
- **Python glossary entry on bytecode** — linked to correct the template-fills-template description.

## Claims and evidence

- Mad Libs dates to 1953 — page corrects video: the idea began in 1953 per Leonard Stern's account, but Stern dates the name to 1958 (the video says five more years).
- Each Python layer fills a larger template down to machine code — page corrects video: running a function does not fill in and recompile C and assembly templates; the interpreter is already built.
- A hard code/data boundary is a basic architectural fact that AI "removes" — page: protections are implemented by particular languages, operating systems and hardware, not an absolute rule; for AI the equal-authority claim is only an analogy.
- Hopper's 1952 compiler story and the "most dangerous phrase" quote — quoted in both; the page's caveat is that a compiler's history does not establish a model is reliable on a given task.
- Page adds that an instruction file such as CLAUDE.md or AGENTS.md is project guidance, not the model's system prompt, and cannot override higher-priority instructions.

## Key moments

- [0:02] Mad Libs origin story.
- [1:00] Template, typed blanks and the syntax-tree comparison.
- [2:01] Memory hierarchy begins with registers and cache.
- [4:01] Hard boundary between code and data introduced.
- [5:00] AI memory hierarchy starts with weights.
- [6:00] Context window, system prompt, retrieved context.
- [7:02] Persistent memory, then code-equals-data claim.
- [8:01] Prompt injection explained.
- [8:01] Hopper's compiler skepticism.
- [11:01] Pivot to what prompting actually is.
- [13:00] Wrong word as joke, bug or hallucination.

## Apply to icm-workshop

- **Every module starts cold / CI is truth:** the stored-versus-active distinction supports the rule that a module's folder must be sufficient on its own and that a session must name the files it read; adopt as a check line in each stage contract.
- **C1 shared core, one home per fact:** the page's point that an entry file is guidance, not authority, helps decide what lives in the identity and house-rules files versus per-module contracts; adopt.
- **Gates are human:** the prompt-injection section is the best justification yet in the Foundation for never letting retrieved client text advance a stage; adapt into the S1 and S2 inputs (client emails and web research are evidence, not instructions).
- **D2 and D4:** a prompt-injection review item fits the SDLC release checklist and the conformance report; adopt as one line, not a whole stage.

## Open questions

- Which loading rules decide whether a CONTEXT.md in a stage folder is read automatically in Jamie's tools, and how is that verified?
- How should persistent memory be kept out of client folders to avoid a second home for facts?
