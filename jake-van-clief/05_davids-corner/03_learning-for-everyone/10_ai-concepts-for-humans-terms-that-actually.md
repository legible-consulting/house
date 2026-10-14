# AI Concepts for Humans: Terms That Actually Matter

*David's Corner › Learning for Everyone · Author: David's Corner (author not stated) · Source: text lesson*

## Summary

Five terms explained for practical use: tokens, context window, temperature, hallucination and retrieval-augmented generation. Each comes with a caveat that corrects a common simplification. Tokens depend on the tokenizer and drive limits and cost; a context window holds instructions, messages, retrieved text and the reply, and a model can miss material before it fills; temperature changes sampling randomness and does not make answers factual; hallucinated citations look confident; RAG supplies material and does not retrain. The page flags its own illustrations as metaphors, and one label ("safe/facts") as misleading.

## Core concepts

- **Tokens:** unit of processing and billing; use the provider's counter.
- **Context window:** limited working space; save important state and supply it explicitly.
- **Temperature:** variation control, not a truth dial; not exposed everywhere.
- **Hallucination:** confident style is not evidence; open the source.
- **RAG:** failures can come from missing sources, poor retrieval or misuse of a retrieved passage.

## Apply to icm-workshop

- Strong fit for O1's concept library and O4 course material: five short explainers to reuse across proposals and training, one home per fact.
- "Supply state explicitly" supports every module starting cold, with stage Inputs naming the files it needs.
- Adopt the practice exercise (recap from a note, remove a fact, check the gap is flagged) as a workshop demo.
