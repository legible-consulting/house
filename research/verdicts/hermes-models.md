---
tool: Models for the Hermes profile legible
kind: service
verdict: watch
tier: deep
use: [house]
tags: [agents, models, providers, local-lane, hermes]
recheck: 2027-01-29
source: .icm/intake/triage/hermes-cheap-models.md
date: 2026-10-29
---

# Models for the Hermes profile `legible`

The providers and models that Hermes Agent v0.22.5 can run on, compared on the work of the local lane. The lane needs these things: tool calls in a long agent loop, the three guards, and a key that Jamie can get from Portugal. The monthly ceiling is 20 dollars. A provider that trains on its inputs serves the house only, never a client repo (Jamie's answers on `triage/hermes-cheap-models`, 2026-10-29).

## Verdict: watch

Watch, until the trials run (why: a price and a policy page do not prove that a model follows the guards and the router in a Hermes session. The stub declines a model that fails the guards or the tool calls, whatever its price · 2026-10-29). The shortlist below names the three finalists and the keys that they need.

## The candidates

All rows were read on 2026-10-29 from the public page in the Source column. A session read the pages with no login and no account. Prices are USD per million tokens, input · output, at list price, for prompts at or under the first price tier. "Tools in Hermes" says how Hermes reaches the provider. "Native" means Hermes v0.22.5 has a provider entry for it (`hermes_cli/auth.py`, `plugins/model-providers/`). Every native entry except Anthropic uses the OpenAI chat-completions route with tool calls. "Custom" means that the provider has no entry, so Hermes reaches it through `custom` (an OpenAI-compatible base URL) or through OpenRouter.

| Candidate | Model read | In · out | Context | Tools in Hermes | Data policy | What Jamie needs for a key | Source |
|---|---|---|---|---|---|---|---|
| Anthropic (reference) | `claude-sonnet-5-5` · `claude-haiku-5-5` | 2.00 · 10.00 · Haiku 0.10 · 0.50 up to 100K, then 0.50 · 2.50 | 1M | Native, `anthropic` | No training on API data by default. Deleted within 30 days. Global inference, no EU-only option | None: the key is in the keyring now | docs.anthropic.com/en/docs/about-claude/pricing · privacy.claude.com |
| OpenRouter | Any of 456 models, at the provider's list price | List price, plus 5.5 % on each credit purchase | Per model | Native, `openrouter` | No training by OpenRouter. Prompts not logged by default. A paid and a free toggle decide if a request goes to a provider that trains. EU routing is Business plan only | Sign-up. Credits by card. The 16 `:free` models: 50 requests a day, 1000 after 10 dollars bought | openrouter.ai/docs/faq · openrouter.ai/pricing · openrouter.ai/api/v1/models |
| DeepSeek | `deepseek-flash` (V4.1 Flash) | 0.30 · 1.20 peak, 0.15 · 0.60 off-peak. Cache hit 0.006 | 1M | Native, `deepseek` | Stored in the PRC, under PRC law. The policy names "foundation model training" and an opt-out. No API no-training clause found | Email or phone sign-up. Prepaid top-up by PayPal or card | api-docs.deepseek.com/quick_start/pricing · cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html |
| Qwen (Alibaba Model Studio, international) | `qwen3.8-flash` · `qwen3.7-flash` | 0.15 · 0.47 · 3.7 Flash 0.03 · 0.13 up to 32K | Up to 1M | Native, `alibaba` | No training without separate consent. Kept 30 days. Frankfurt region has an EU scope | Alibaba Cloud international account, with the account details complete. Payment terms not found | alibabacloud.com/help/en/model-studio/model-pricing · …/data-retention-policy |
| Kimi (Moonshot) | `kimi-k3.1-pro` · `kimi-k2.7-code` | 2.00 · 10.00 · K2.7 0.95 · 4.00 | 1M · 262K | Native, `kimi-coding` | Content "helps us optimize our models". No opt-out for a single API user found. Servers in Singapore. No account deletion | Phone or Google sign-up. Top-up by WeChat Pay or Alipay only. K2 closes to new users on 2026-10-31 | platform.kimi.ai/docs/pricing/chat · platform.kimi.ai/docs/guide/account-and-payments.md |
| GLM (Z.ai) | `glm-5.3-flash` · `glm-5.3` | 0.15 · 0.50 · 5.3 1.40 · 4.40 | 1M | Native, `zai` | The no-training sentence is in square brackets on the live terms page. Processing region not found. Singapore law | Email sign-up. Card or PayPal. Coding Plan Lite 18 dollars a month, which lists Hermes as best effort | docs.z.ai/guides/overview/pricing · docs.z.ai/legal-agreement/terms-of-use.md · z.ai/subscribe |
| Google Gemini | `gemini-3.8-flash` · `gemini-3.1-flash-lite` | 0.75 · 3.75, doubles on 2027-01-01 · Flash-Lite 0.25 · 1.50 | 1M | Native, `gemini` | In the EEA, the paid terms (no training) apply to the free tier too. Paid: prompts logged for abuse for a limited time, in any country | Google account. The free tier needs no card. The paid tier needs a 5-dollar prepay. Portugal is listed | ai.google.dev/gemini-api/docs/pricing · ai.google.dev/gemini-api/terms |
| Groq | `openai/gpt-oss-120b` | 0.15 · 0.60 | 131K | Custom | Not kept by default. Abuse logs up to 30 days, with an opt-out. No training statement found. Data in the US | Sign-up. Free tier 8K tokens a minute. The paid tier needs a card or SEPA | console.groq.com/docs/models · console.groq.com/docs/your-data |
| Cerebras | `gpt-oss-120b` | 0.35 · 0.75 | 65K free, 131K paid | Custom | Inputs and outputs not kept. No training statement found. US and other countries | Sign-up and a card. A one-time 5-dollar credit for 30 days. No free tier | cerebras.ai/pricing · inference-docs.cerebras.ai/support/rate-limits |
| Mistral | `mistral-small-2603` · `mistral-medium-3-5` | 0.15 · 0.60 · Medium 1.50 · 7.50 | 256K | Custom | Hosted in the EU. Trains on the free mode by default. Pay-as-you-go has an opt-out toggle, so training is on until Jamie turns it off. Devstral retired | Sign-up. Working keys need active billing. Pay-as-you-go is prepaid | docs.mistral.ai/inference/pricing · help.mistral.ai/en/articles/347617 |
| Vercel AI Gateway | `zai/glm-5.3-flash` · `deepseek/deepseek-v4-flash` · `anthropic/claude-haiku-5.5` | List price, no markup. DeepSeek V4 Flash 0.13 · 0.26 | Per model | Native, `ai-gateway` | Vercel does not train or keep prompts. The gateway does not route by provider policy unless a request asks. A provider with an unknown stance is assumed to train. ZDR is Pro plan only | A key may exist (`AI_GATEWAY_API_KEY` in the profile's `.env`). Free credits need a card on the team | vercel.com/docs/ai-gateway/pricing · ai-gateway.vercel.sh/v1/models |
| OpenCode Zen | `glm-5.3-flash` · `qwen3.8-flash` · `deepseek-v4.1-flash` · `claude-haiku-5-5` | List price. GLM 5.3 Flash 0.15 · 0.50. Plus 4.6 % and 0.31 dollars on each top-up | 1M | Native, `opencode-zen` | Hosted in the US and the EU. Providers keep nothing and do not train, except OpenAI and Anthropic, which keep 30 days. The free models do not serve Hermes | A key may exist (`OPENCODE_ZEN_API_KEY` in the profile's `.env`). Balance by card, 20 dollars shown | opencode.ai/docs/zen/ |
| OpenCode Go | The Zen models under a plan, for example `deepseek-v4.1-flash` and `glm-5.3-flash` | 10 dollars a month. Each model has a monthly allowance at list price, for example 60 dollars of GLM 5.3 Flash | 1M | Native, `opencode-go` | Most models: not used for training, kept 0 days. The DeepSeek agreement renews each month | Subscription by card. Hermes v0.21.6 or later is a validated client | opencode.ai/docs/go/ · opencode.ai/go |
| Ollama, on this laptop | `gpt-oss:20b` · `qwen3:8b` | 0 | Not read | Native through `custom` (`ollama` is an alias) | Stays on the machine | None. `brew install ollama` | This session, 2026-10-29: § The local model |
| Nous Portal (fact only) | 341 models, the same Claude prices | Per model | Not found | Native, `nous` (OAuth) | Terms license Your Data for training, unless Privacy Mode is on. Privacy Mode is off by default | Account. Plans from 20 dollars a month. An API key bills pay-as-you-go credits | portal.nousresearch.com · portal.nousresearch.com/terms |

## The local model

The laptop has 22 threads, 31 GB of memory, Intel Arc integrated graphics and no NVIDIA card, so Ollama 0.40.13 runs on the CPU only. This session tried two models on 2026-10-29, with the Hermes desktop app, GNOME and the browser open:

- `gpt-oss:20b` needs 13 GB of weights when loaded (3.4 GB plus a 9.7 GB repacked buffer). The load failed three times. Each time, the OOM killer stopped the Ollama process.
- `qwen3:8b` loaded its weights. The warm-up run did not finish in 7 minutes, and the request timed out.

No local model answered one request, so no speed was measured. A local model is not usable on this laptop during a normal working session. The cause of the slow warm-up is not known. A read with the desktop app closed may give a different result.

## The shortlist

The rule: a candidate is out when one of these is true:

- It has no native tool route in Hermes.
- Its price breaks the 20-dollar ceiling.
- Its key needs a card or a wallet that Jamie does not have.
A provider that trains, or whose terms are unclear, serves the house only.

Out, with the why:

- Kimi: the top-up is WeChat Pay or Alipay only, and K2 closes to new users on 2026-10-31.
- Groq and Cerebras: no native entry in Hermes. Groq's free tier allows 8K tokens a minute, which may be less than the Hermes system prompt and the tool list. Cerebras has no free tier and a 65K context on its trial.
- Mistral: no native entry in Hermes, and training is on until an opt-out.
- DeepSeek direct: data in the PRC, and no API no-training clause. The same model is on OpenCode Zen under a no-training term.
- Nous Portal: read as a fact only, as the stub says.
- Ollama: § The local model.

The finalists:

1. **OpenCode Zen, `glm-5.3-flash`.** It is the cheapest tool-calling model on a provider that states no training and no retention. A key may already exist. It is the second provider for R6. `qwen3.8-flash` and `deepseek-v4.1-flash` are on the same key, as the second and third tries.
2. **Anthropic, `claude-haiku-5-5`.** It costs 0.10 · 0.50 up to 100K tokens, with no training, on the key that the profile has now. It is the candidate for the light turns.
3. **Google Gemini free tier, `gemini-3.8-flash`.** In the EEA the free tier has the paid terms, with no training. It needs no card. The free-tier rate limits are not published, so the trial reads them.

The reference stays `claude-sonnet-5-5` on Anthropic.

Vercel AI Gateway, OpenRouter, Qwen direct and OpenCode Go stay as second choices. Vercel and OpenRouter do not filter by a provider's training policy unless the request or the account says so. OpenCode Go is a paid plan, and Jamie decides on a plan.

## What would change it

- A finalist fails a guard or the tool calls in its trial: it is declined. The next model on the same key is tried.
- The OpenCode Zen key has no balance, and Jamie does not top it up: Vercel AI Gateway with `zai/glm-5.3-flash` is the next try.
- A laptop with more free memory, or a smaller model that passes the trial: the local row is read again.
- Gemini's prices double on 2027-01-01, and Gemini 4 Argon's on 2026-12-01: the recheck date reads them again.

## How the house would use it

The profile `legible` keeps `model.default` on one model for a ticket. `secrets.command` reads one keyring item for each provider, with service `hermes` and the provider as username. `/model` switches the provider in the session. `smart_model_routing` stays off until two models pass (the stub, § Out of scope).

## To try

Each finalist takes one open house triage stub with `complexity: low`, in file order, in a Hermes session that `ticket` starts. Jamie drives the session. A good result has four parts:

1. The guards' `block` and `approve` reach the model and the gate.
2. The model follows `AGENTS.md` and the router.
3. `asd-ste100` loads.
4. The cost on the provider's usage page is under one dollar.
In one trial, `/model` switches from Anthropic to OpenCode Zen in the middle of the session, and the ticket continues.

## Source

The pages in the table, read on 2026-10-29. Hermes v0.22.5 source: `hermes_cli/auth.py`, `hermes_cli/providers.py`, `plugins/model-providers/`. Jamie, 2026-10-29: "Jamie wants to know which models are the cheapest and the easiest to get for Hermes" (`.icm/intake/triage/hermes-cheap-models.md`).
