---
tool: Open Notebook
kind: repo
verdict: watch
tier: deep
use: [build, proposal]
tags: [self-hosted, llm, research, gdpr]
recheck: 2027-05-04
source: https://github.com/lfnovo/open-notebook
shared: https://github.com/lfnovo/open-notebook?sfnsn=mo
date: 2026-11-04
---

# Open Notebook

A self-hosted, open-source alternative to Google's NotebookLM, by Luis Novo (lfnovo). A user adds PDFs, videos, audio and web pages to a notebook, then searches them and chats with answers that cite the sources. It also makes podcasts with one to four speakers. It runs in Docker with SurrealDB, has a REST API and works with more than 20 model providers, Ollama included. MIT licence. Free; the user pays only for model use.

## Verdict: watch

Watch for `build` and `proposal`, for the AI business infrastructure line (why: `core/services.md` sells "a knowledge base, retrieval over their own documents, the parts that keep answers grounded in their data", and Open Notebook is that part, self-hosted, with cited answers and a choice of provider that keeps a client's documents under GDPR control; but no client build has needed it yet, it adds SurrealDB and a Python service that are in no row of `core/stack.md`, and its default ports have no password · 2026-11-04).

## What would change it

- A client asks for search and chat over their own documents, and wants the data on their own server. Then try it as the base of that build.
- A hosted option with an EU data region fits the same need with less upkeep. Then compare the two in the proposal.
- The project stops releasing, or the licence changes from MIT.

## How the house would use it

Proposal and build, for AI business infrastructure (`03-proposal/CONTEXT.md`, then `07-build/CONTEXT.md`): the knowledge base runs on the client's server in Docker, behind a password and bound to localhost, with the client's chosen model provider. It adds a ready base; it replaces building retrieval from scratch for a small client.

## To try

`curl -o docker-compose.yml https://raw.githubusercontent.com/lfnovo/open-notebook/main/docker-compose.yml`, set the encryption key and bind the ports to `127.0.0.1`, then `docker compose up -d` and open http://localhost:8502. Add three of a client's sample PDFs. A good result: an answer to a question about them cites the right page.

## Source

https://github.com/lfnovo/open-notebook · fetched 2026-11-04 · "Open Notebook". README read from raw.githubusercontent.com; repository page read with trafilatura. The README asks for a star and a Discord join; these are calls to act.
