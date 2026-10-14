# LESSON 3.3: The Real Cost of Knowledge

*The Archive › Module 3: Ownership In the AI Age · Author: Jake Van Clief · Source: text lesson (essay with course guide)*

## Summary

Jake uses an "apocalypse laptop" thought experiment, a solar-powered laptop with offline Wikipedia versus one running a local language model, to argue that AI's energy problem is about where it runs, not what each query costs. He concedes a chatbot query uses far more energy than a page view, then argues that synthesis is a different product from retrieval, and that centralised data centres plus cooling and network overhead are the real drain. His closing metric is energy per insight rather than per query. The course guide flags that the numbers are illustrative and mix different measurement boundaries.

## Core concepts

- **Retrieval versus synthesis:** an encyclopedia returns what exists; a model combines it for your specific situation.
- **Energy per insight:** compare the cost of a solved problem, not a single request.
- **Where compute lives:** local inference avoids network transmission and data-centre cooling, while training is a one-time cost and inference dominates lifetime use.
- **Measurement boundaries:** estimates vary widely because they include or exclude overhead, networking and cooling.
- **Distribution:** he argues that centralisation's overhead may start to outweigh its benefits for AI, while granting that efficient hyperscale sites can still win.
- **Link to orchestration:** the course note says putting each task on the right layer also avoids wasted compute.

## Frameworks and methods

The argument:

1. Intuition says offline Wikipedia wins the apocalypse laptop test.
2. Per-query numbers show the model is more costly than a page view.
3. But the model does synthesis that retrieval cannot.
4. Most energy concern is data-centre scale and inference at volume.
5. Local deployment removes some overhead, though not all.
6. So judge by problems solved per unit of energy and by deployment choice.

The guide's exercise: pick a harmless task, compare manual, local-model and cloud-model routes on quality, time and corrections, measure energy only with a meter, and judge against the same acceptance criteria.

## Claims and evidence

- Local AI adds roughly 38 W on an efficient laptop; ~1,128 queries per day — arithmetic from assumed wattage — the guide calls device and query figures illustrative; reference numbers are missing from the classroom copy.
- Per-query energy comparisons (Wikipedia, search, chat) — mixed server, device and infrastructure boundaries — not directly comparable.
- Data-centre and training figures — cited as footnoted, footnotes absent here — verify against the IEA analysis the guide links.
- The water-filter example — illustrative only, not safe drinking-water advice (guide points to CDC guidance).

## Apply to icm-workshop

- **O1 tool and concept research:** adapt the guide's three-route comparison (manual, local, cloud, same acceptance criteria) as a template for dated tool verdicts that may involve a local-versus-hosted choice. Record unknowns honestly.
- **S4 quote economics:** the point that model cost and where compute runs belong in an engagement's economics is a reminder to track hosting and model spend; the essay's numbers are not usable inputs.
- Weak relevance otherwise: this is an energy-policy essay with unverified figures; do not cite it in client material.

## Open questions

- Is there any local-model use case among Jamie's client services where local inference is a selling point, and what evidence would support it?
