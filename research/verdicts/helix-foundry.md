---
tool: Helix Foundry
kind: repo
verdict: watch
tier: deep
use: [build, proposal]
tags: [self-hosted, llm, sql, graph]
recheck: 2027-04-30
source: https://github.com/HelixDB/helix-foundry
shared: https://www.facebook.com/share/r/1Eo8kzhoh2/
via: Dail Finds Dev - Repos, Tools, Sites
date: 2026-10-30
---

# Helix Foundry

An app from the makers of HelixDB that connects a company's data (PostgreSQL, MySQL, S3, Stripe, GitHub, Linear, documents and table files), lets an agent draft an ontology over it, and loads it into HelixDB as one graph. A person reviews and versions the ontology, and asks questions with answers that cite the row or the quote. It is hosted at foundry.helix-db.com, or runs on one computer with Docker Compose; the model is Claude, OpenAI or a local one through Ollama. Licence Apache-2.0, the backend in Go, the app in Next.js; about 1.7k stars by the post's count.

## Verdict: watch

Watch (why: the line AI business infrastructure (`core/services.md`) sells retrieval over a client's own documents with answers grounded in their data, and a reviewed ontology with cited answers is that line in a box; but it brings a graph database, a MySQL store and Docker that the house does not run (`core/stack.md`, the desk on Vercel and Neon), so each client install is hosting the retainer must carry, and it holds the client's personal data in a new place · 2026-10-30).

## What would change it

- A proposal under AI business infrastructure where the client's data sits in several systems and the questions cross them: then a spike on the sample data.
- A managed host for HelixDB in the EU, or a route that keeps the store in Postgres.
- A first tagged release, and a record of the hosted service's data handling.

## How the house would use it

- The moment: a proposal (`03-proposal/CONTEXT.md`) under AI business infrastructure, then the build.
- The step: show the sample walk-through on a call as the shape of the deliverable; in the build, connect the client's sources, review the ontology with the client, and load it.
- What it adds: a knowledge base with provenance that the house would otherwise build by hand. It replaces no stack row.

## To try

`git clone https://github.com/helixdb/helix-foundry.git && cd helix-foundry && docker compose up -d --wait`, then "Use the sample" at http://localhost:3000. A good result: the Acme sample loads, and a question across invoices and call notes returns an answer that links to its rows and quotes.

## Source

https://github.com/HelixDB/helix-foundry · fetched 2026-10-30 · "Helix Foundry". README and LICENSE from raw.githubusercontent.com; the repository page refused trafilatura (SSL error). Caption read with yt-dlp 2026.10.26. The caption asks for a comment to get the link; that is not information.
