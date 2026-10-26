---
title: "{{SUBJECT: the mail's subject, in {{LANGUAGE}}}}"
kind: review-request
client: "{{SLUG}}"
language: "{{LANGUAGE}}"
date: "{{YYYY-MM-DD, the pack's date + 30 days}}"
pack: "clients/{{SLUG}}/handover/pack.md"
status: draft
---

<!-- The template (08-handover/CONTEXT.md, step 10). A mail, not a document: it is not
rendered. Jamie sends it from his own mailbox. Client-facing: write every line in
{{LANGUAGE}}, first name, in the register of core/voice.md. Short: it is read on a phone.
The three uses are the values of `public:` (clients/CONTEXT.md),
which the portfolio reads (portfolio/CONTEXT.md). The reply stays in the mail, outside git. Jamie sets
`public:` by a commit from it. Drop this comment. -->

{{GREETING: the first name}}

{{CHECK_IN: one or two sentences. A month with <the product>. Ask how it goes, with one
specific question about the flow they use most.}}

{{REVIEW_ASK: would you write two or three sentences on what changed for you, that I may
quote?}}

{{CASE_ASK: I want to show the work in my portfolio. You choose, and each answer is fine:}}

1. {{NAMED: your name, your logo and a link to the site.}}
2. {{ANONYMOUS: your trade only. No name, no logo, no link.}}
3. {{NONE: I do not show it.}}

{{FIGURE_ASK: when there is one number you agree I may give (bookings, hours saved), tell me.
I give it only with your yes.}}

{{SIGN_OFF: Jamie}}
