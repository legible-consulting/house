---
kind: form
title: "Before we start building"
intro: "These questions set up the build: who decides, which accounts exist and who holds them, what you have for content and brand, how it must work, and when it goes live. A few words per answer is enough. Skip what you don't know yet, and we settle it together. Never put a password or a key in this form. Tell me who holds the account, and we share access another way."
language: en-GB
folder: kickoff
---
## What does the business do, and for whom?

- key: business
- type: textarea
- hint: Two or three sentences, the way you'd tell a friend.

## Who decides what the site or app says and does?

- key: decides
- type: textarea
- hint: Name and role. If two people decide together, name both and say how you decide.

## Who tests the work and says yes before it goes live?

- key: tests
- type: text
- hint: One name is easiest. It can be the same person.

## How do you want to send feedback and questions?

- key: channel
- type: select
- options: Email | WhatsApp | Slack | A shared document | A short call each week

## Which languages must the site or app speak?

- key: site_languages
- type: text
- hint: The main one first, then the others in order.

## Which domain will it live on, and who holds it?

- key: domain
- type: textarea
- hint: The address (example.com), the registrar if you know it, and whose name the domain is in. No passwords.

## Is there a site or app online today? Where is it hosted?

- key: hosting_today
- type: textarea
- optional: yes
- hint: The address, the host, and who pays for it. Leave it empty if nothing exists yet.

## Which email do you use on your domain?

- key: email_provider
- type: select
- options: Google Workspace | Microsoft 365 | A mailbox from the registrar or the host | Another provider | No email on the domain yet

## Which address should the site send its emails from, and who reads the replies?

- key: email_sends
- type: textarea
- optional: yes
- hint: For example bookings@ for confirmations, and the inbox that reads the answers.

## Will the site take payments?

- key: payments
- type: select
- options: No | Yes, and we have a Stripe account | Yes, and we use another payment provider | Yes, but we have no payment account yet

## Who holds the payment account, and in which company's name?

- key: payments_owner
- type: text
- optional: yes
- hint: The account receives the money, so it is in your company's name. The name only, no password.

## Which other accounts must the site connect to?

- key: other_accounts
- type: textarea
- optional: yes
- hint: A booking or calendar tool, a CRM, Google Business Profile, Instagram or Facebook, analytics, an accounting app. One per line, with who holds it.

## What do you have for the brand?

- key: brand
- type: textarea
- hint: A logo and its formats, colours, fonts, a brand guide, and who made them. Send the files by email or a shared folder, not here.

## Where do the photos and videos come from?

- key: photos
- type: select
- options: We have our own, ready to use | We have some, and we need more | We need a photographer | Stock images are fine

## Who writes the words on the site?

- key: words
- type: select
- options: We write them | You write them from what we tell you | Our copywriter or agency writes them | We reuse the texts of the old site

## Who provides the legal texts: the terms, the privacy policy, the cookie policy?

- key: legal_texts
- type: select
- options: We have them already | Our lawyer or accountant writes them | We have none yet

## What must a visitor be able to do, from start to finish?

- key: visitor_path
- type: textarea
- hint: Walk me through the main path: they arrive, they look, they ask, book or buy, and what they get back.

## What must you and your team do in it every day?

- key: team_tasks
- type: textarea
- optional: yes
- hint: Answer requests, change prices or availability, edit pages, read reports. Who does it, and on a phone or a computer.

## What does it replace?

- key: replaces
- type: textarea
- optional: yes
- hint: The spreadsheet, the old tool, the messages you send by hand: what stops when this goes live.

## When must it be live, and why that date?

- key: go_live
- type: textarea
- hint: A season, an event, a launch. If no date is fixed, say so.

## What must be ready on your side before it goes live?

- key: before_launch
- type: textarea
- optional: yes
- hint: Texts, photos, the legal texts, an account to open, a contract to sign.

## Anything else I should know before we start?

- key: anything_else
- type: textarea
- optional: yes
