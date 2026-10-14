# 2.5 OpenClaw: Orchestration and AI

*The Foundation › History and Concepts · Author: Jake Van Clief · Source: YouTube (linked video, transcript on disk) plus written page · Length: 13:16 · Link: https://youtu.be/bQXi5Nd8c40*

## Summary

Jake takes the viral personal-assistant project (called by an earlier name in the recording, OpenClaw today) and asks what is actually inside it. His answer: no model at all. It is an orchestration layer that connects chat channels, a routing gateway, built-in tools and a bring-your-own model, which he explains with an orchestra-and-conductor image and a shapes diagram. He maps its codebase onto his 60/30/10 heuristic (mostly ordinary code, some rule-based logic, a small slice of AI calls), then weighs whether it survives once the big AI vendors ship native integrations. The written page reframes the lesson as a model-versus-system distinction and strips out the video's percentages and popularity counts as dated or unverified.

## Core concepts

- **Orchestration versus model:** the model supplies intelligence; orchestration decides who gets the message, which tool is called, how results flow back and how errors are handled. Without it every integration is custom and brittle.
- **Four parts to look for:** model, tools, routing and orchestration, and channels or interface. The useful test is which parts survive if the model is swapped.
- **Terms to keep apart:** a model is the thinking component; a wrapper is a thin layer over an API; an agent acts autonomously using a model; an orchestration layer coordinates models, tools, channels and context.
- **Gateway as routing brain:** a local server through which every channel message passes, managing sessions (conversation memory) and authentication.
- **Model-agnostic, self-hosted:** the model slot is empty and filled with your own key or a local model; page cautions that self-hosting one part does not keep model or tool calls on your machine.
- **Getting "sherlocked":** a product is exposed when a platform adds its function natively; the open question is whether flexibility and privacy outweigh convenience.
- **The AI is a component, not the whole:** most production AI value sits in the plumbing and rules around the model.

## Frameworks and methods

1. Layered view: channel layer (messaging connectors), gateway (routing, sessions, authentication), then tools and model hooks underneath.
2. Shapes walk-through: message, model, tool and channel, first wired manually, then through a central hub.
3. 60/30/10 heuristic: roughly 60 percent ordinary code, 30 percent explicit rule-based logic, 10 percent model calls. The page calls it a design heuristic only, not a measured share of any codebase, cost or performance.
4. Page's worked example (illustrative): meeting preparation split into inputs, ordinary software, rules, a model task and human review.
5. Three takeaway questions: what still matters if the model changes, where does information go, what can a human check for themselves, and how does the system behave if a tool breaks.

## Tools, settings and resources

- **OpenClaw (earlier names in the recording)** — open-source assistant orchestration project — official repository linked on the page for current setup; names and star counts in the video are dated.
- **Channel libraries for messaging platforms** — named in the video as the connectors — details not verified.
- **60/30/10 System Architecture** — applied exercise in the paid Vault — not reproduced here.

## Claims and evidence

- Over 100,000 GitHub stars, 200 contributors, about 50,000 lines of code — stated in the video; page says counts are historical.
- Code split of about 35 percent channels, 25 percent gateway, 20 percent tools, 10 percent configuration and AI — presented as a measurement in the video; page: the lesson does not establish percentages of the codebase, so treat as illustrative.
- "There is no AI inside" — page corrects video: calling it AI-free mixes up the product with whichever model it connects to.
- Security concerns and likely data leaks — offhand opinion, no evidence shown.
- Predicts it may be one vendor announcement from niche status — opinion, explicitly uncertain.

## Key moments

- [0:03] Notification overload and the hook about a viral assistant.
- [1:00] Claim that the codebase contains no model; introduction of orchestration.
- [2:02] Shapes diagram of message, model, tool and channel.
- [3:02] With a hub, one clean routing flow.
- [4:00] Definitions of model, wrapper, agent and orchestration layer.
- [5:01] Channel layer and gateway explained.
- [6:00] Tools built in; model slots left empty.
- [7:00] Codebase breakdown and the 60/30/10 heuristic.
- [9:01] Question of vendors building this natively; "sherlocked".
- [10:01] Counter-case: model-agnostic, self-hosted, open source.
- [12:01] Verdict: useful for a specific audience, uncertain as a mainstream product.

## Apply to icm-workshop

- **Never build an orchestrator:** this lesson is a good foil; the whole case for orchestration layers is what Jamie's boundary deliberately avoids. Reject building one, but adopt the four-part vocabulary (model, tools, routing, channels) to explain in O4 why folder contracts do the routing job.
- **O1 tool research:** a clean candidate for a dated verdict (watch, with a recheck date) in the "could build for a client" catalogue as a personal-assistant offer; note the page's privacy caution before pitching self-hosting as data-safe.
- **D2 SDLC tiers:** adapt the 60/30/10 heuristic as a design prompt in the app and platform tiers (what is plain code, what is explicit rules, what needs a model), never as a quota.
- **Gates are human:** the meeting-preparation example ends in human review; adopt that ending as the standard shape for any S1 or S3 drafting step.

## Open questions

- Does Jamie's unattended-runs list (drift check, deadline sweep, research recheck) need a gateway-like pattern, or do scheduled sessions cover it?
- What does the current official repository say about security posture before any client demo?
