# PROMPT ENGINEERING: Where this fits in ICM

*THE LEGENDS › 2. Bas Rosario – Prompt Engineering · Author: Bas Rosario · Source: text lesson*

## Summary

Bas places rung one inside the Interpretable Context Methodology (ICM), the Jake Van Clief and David McDermott approach to numbered stage folders with plain markdown files. His claim is that the prompt lives in a stage contract, specifically the middle part that says what to do, between the declared Inputs and Outputs. He shows an example script-writing stage taken from the ICM paper. He ends with an honest limit: ICM gives the instruction an address and makes editing easy, but it does not write, route or diagnose the prompt for you.

## Core concepts

- **Stage folder, contract file:** a job is cut into steps, each step gets a numbered folder, and one plain-text file inside it tells the agent what to do there.
- **Three-part contract:** inputs (what it reads), process (what it does), outputs (what it writes). The prompt skills from the series belong to the process part.
- **Process in the example mirrors the series order:** name the task, hand over the shape, set the tone. The Inputs and Outputs are for later rungs.
- **Prompt repair becomes an edit:** because the prompt is a file, changing it is a small edit rather than a rewrite from memory.
- **ICM is not a prompt writer:** weak lines in a tidy folder stay weak.
- **Folder names do not execute instructions:** the practice exercise notes the agent must be told explicitly to read the named input, which the Foundation lesson on folders and one agent explains.

## Frameworks and methods

1. Split the job into stages, one folder each.
2. In each folder, write one contract with Inputs, Process and Outputs.
3. Write the Process lines using the prompt-series order: task, shape, tone.
4. Fix prompts by editing the file and keeping the prior version.

## Tools, settings and resources

- **ICM paper** — arXiv 2603.16021 — cited as the source of the quoted passages; the lesson says its quotes are word for word from the paper and the conventions file.
- Related Foundation notes: `01_the-foundation/01_the-three-layers/03_folders-agent.md` (map file, routing table, folder with one agent) and `01_the-foundation/02_build-it-around-your-work/02_design-your-folder.md` (separating method, facts, work and outputs).

## Claims and evidence

- A non-technical reader can follow a contract file — quoted from the ICM conventions — plausible, authored by the method's own writers.

## Apply to icm-workshop

- **Adopt** the Inputs, Process, Outputs shape for every module contract; it already matches the goals file's rule that a downstream module declares an upstream artefact as an Input and nothing else couples them.
- **Adopt** the split of where things live: the Process text is module-owned, while shared voice and references are read from the shared core (C1), so each fact has one home. The example's `_config/voice.md` reference is exactly that pattern.
- **Reject** treating folders as orchestration of prompt quality; contracts still need hand-written Process lines.
- Foundation counterparts: the routing table described in the 1.3 note is the pattern for module routing, and 2.2 covers the design walk.

## Open questions

- Does Jamie's module contract template match the paper's three-part layout, or have Apps contracts drifted from it?
