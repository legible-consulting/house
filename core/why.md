# Why — core

The why and the date behind each rule of this folder's files. No Inputs name this file.
Read it when you change a rule, not when you follow one. A rule without a why is deleted.

## lexicon.md

- When a term here and a word in another file disagree, this file wins and the other file is fixed
  Why: one home per fact; a brand speaks one vocabulary · 2026-10-16.
- Every client build is Jamie's own, under `k0d0minio`
  Why: the org is the method and the shared space; a collaborator who joins it must never see a client's code · 2026-10-21.
- The numbered folders are the stages a deal walks, in order; the rest have no order between them
  Why: a number promises a sequence, and a code names nothing a reader can say aloud · 2026-10-25.
- The stage numbers are final, in deal order, `01` to `08`
  Why: one renumber beats one renumber per new stage, and the numbers keep the sequence a deal walks · 2026-10-26.
- A module the business needs and the house does not have yet is a ticket in `.icm/intake/`, not an empty folder
  Why: the tree shows what exists; a folder with a stub contract promised work and held none · 2026-10-25.
- After Ready to merge the session merges, with the repo's `.icm/scripts/merge.sh`
  Why: Jamie ticks from the phone, and the session does the mechanics · Jamie, 2026-10-27.
- There is no `BUILD.md` and no list of tickets in the house
  Why: one home for tickets, the repo where the work is · 2026-10-21.

## stack.md

- A change to the tool set edits this file and `setup/` in the same commit
  Why: one home per fact; a script that drifts from its list installs the wrong toolbox · 2026-10-16.
- The house carries its own, hand-written; the blueprint renders one into every build and workspace
  Why: `.goosehints` carried this job until Goose left the stack, 2026-10-29.
- A verdict in `research/verdicts/` says what was judged and for which moment; it does not say what is installed
  Why: the review of 2026-10-29 found 31 of the 46 `adopt` verdicts in no stack, CI or contract, and several saying the opposite of this file · Jamie, 2026-10-29.
- Each machine carries only what a contract, hook, workflow or checklist item calls today; a tool joins `setup/` in the commit that builds the module that calls it
  Why: the audit found seven tools installed in cloud and six locally that nothing called, one of them failing, and mdq's compile alone took 95 s of cloud setup · 2026-10-16.
- Hermes Agent, the agent of the local lane, on the profile `legible`
  Why: an agent on Jamie's machine on the model he chooses, the replacement for Claude Code when the weekly usage runs out or the subscription ends · Jamie, 2026-10-29.
- The memory and skill writers stay on with approval, and a new skill lands in the profile's `scratch-skills/`
  Why: an unreviewed note or skill is a second home that drifts · Jamie, 2026-10-29.
- Frozen 2026-10-31: no session works on Hermes until a client ticket needs the local lane; the open Hermes stubs in `.icm/intake/triage/` are parked, and only the …
  Why: two days of the house went to the lane and not to clients, and the verdict is still `watch` · Jamie, 2026-10-31.
- Next.js was chosen over the Astro scaffold of 2026-10-15
  Why: Vercel's own framework, first-party Neon Auth support for Next.js, and one framework for the house's apps · 2026-10-19.
- Tailwind CSS, shadcn/ui and Motion joined it
  Why: one component and transition vocabulary for every app the house builds; shadcn's components are source in `desk/app/components/ui/`, owned here, not a dependency to chase · 2026-10-20.
- The cloud image ships kislyuk's Python yq, a jq wrapper without `--front-matter`; `setup/cloud.sh` puts mikefarah's ahead of it on PATH
  Why: frontmatter extraction is the hinge for the folder's checks · 2026-10-16.
- Forme was chosen over pdfcn's other base, Takumi, because it lays out pages: A4 pages that break where the text breaks, a footer on every page with its page number, …
  Why: a proposal is 4 to 8 pages of running text, and a client reads it as a document, not a picture · 2026-10-26.
- `place.sh` uses `/usr/bin/gio`, which Ubuntu ships, and `yq` and `jq` from `setup/local.sh`
  Why: the Drive copy is Jamie's hand over the GNOME mount, so no Drive key exists anywhere · 2026-10-22.
- Hermes: the profile `legible` reads each provider key from one system keyring item with service `hermes` and the Hermes provider as username, never from a file
  Why: a key in a file is plain text that every process can read and a commit can copy · 2026-10-29.
- Vercel AI Gateway, the house only
  Why: it does not avoid a provider that trains unless the request asks · 2026-10-29.
- `override_existing` is `true`, so the keyring value beats a value in a `.env`
  Why: with `false`, the plaintext keys in the `.env` files won, and the profile did not run on the keyring keys · 2026-10-29.
- Nothing in the house reads from it, and nothing reads from its repo, `k0d0minio/icm-board`: a module's sources are the house, the siblings and the estate's repos on …
  Why: the house is self-contained in the legible-consulting repos and the estate; a source on one machine or in a retired repo binds the work to it · 2026-10-26.
- The named exception: `~/.hermes/.env` and the profile's own `.env` stay on this machine with their plaintext keys
  Why: they are on Jamie's own machine, outside every repo, and Jamie keeps them · Jamie, 2026-10-29.
- No lane script
  Why: one way to make a worktree; the script's env copy and install served a run that CI-is-truth forbids, and its `done` could not work with squash merges · Jamie, 2026-10-30, `.icm/intake/ticket-leaves/`.
- Each guard defers only when the repo copy is a different file, so a verbatim copy still runs
  Why: a copy that deferred to itself left the house unguarded · 2026-10-19.
- `check.yml`'s `guards` job fails when a house copy differs from the blueprint's
  Why: three copies kept equal by hand drift; the first to drift is the one that stops guarding · 2026-10-19.
- The blueprint renders the router and the board into a build, never into a workspace, and registers them in the build's `.claude/settings.json`
  Why: both read a build's `.icm/`, and the house's own board is out of the epic · Jamie, 2026-10-27.
- Neither file holds a copy of a hook
  Why: the blueprint's script is the one home, and a Hermes session on a build gets the same board, router and guards as Claude Code · `_done/goose-worktrees/_done/plugin-router-and-board.md`, 2026-10-29.
- The app removes only its own session worktrees
  Why: house had 46 worktrees and blueprint 11 · 2026-10-27.
- Update both in one commit: `git -C ~/.claude/skills/asd-ste100 pull`, then the `STE_SKILL_SHA` in `check.yml`
  Why: the one skill that shapes every file a session writes; a linter that drifts from the skill reports rules the writer never saw · 2026-10-19.
- It never overwrites a file that is present, and it names a file that differs
  Why: Hermes writes `config.yaml` itself, an "always" approval among others, and an overwrite drops it · 2026-10-29.
- the provider and model, `secrets.command` (the keyring helper in § Local machine: one keyring item for each provider: Anthropic, OpenCode Zen and Vercel AI Gateway, …
  Why: an "always" answer to a guard's ask writes one, and it turns the human gate off for every later session · the loop walk, 2026-10-29.
- the provider and model, `secrets.command` (the keyring helper in § Local machine: one keyring item for each provider: Anthropic, OpenCode Zen and Vercel AI Gateway, …
  Why: an "always" answer to that prompt writes the key, and Hermes then approves the command at its own layer with no prompt · 2026-10-31.
- A hook command starts with `~`
  Why: Hermes expands only a leading `~` and runs the script with no shell · 2026-10-29.
- `skills.external_dirs` lists `~/.claude/skills` and the `.claude/skills` of each live repo's primary clone under `~/Desktop/legible-consulting/projects/` …
  Why: Hermes reads `.agents/skills` and `.hermes/skills` by itself, the estate keeps its skills in `.claude/skills`, and a list that a script rewrites drifts from its copy · 2026-10-30.
- Both scripts read the session's `cwd` from the profile's `state.db` (`sessions.cwd` by `session_id`), and the payload's `cwd` is the fallback
  Why: under the gateway, Hermes v0.22.5 sends the gateway process's own folder, `~/.hermes`, as the payload's `cwd` · 2026-10-29.

## CONTEXT.md

- SOUL.md carries no frontmatter, because Hermes # reads it whole as the profile's prompt
  Why: a file only on one machine is lost with it, and # the setup scripts are its installer · 2026-10-29.
- onboarding-collaborator.md # The pack for the accountant: the entity's tax status, its obligations and its compliance # calendar, beside the status identity.md names
  Why: one home per fact · 2026-10-26.
- "accountant/*.md" # The renderer: a Node package that turns a client document into the PDF in the design of # voice.md, and the script that places a PDF in Drive
  Why: voice.md is the design's one # home, so its reader lives beside it · 2026-10-26.
- The # stack owns where a value lives, so the core holds the list
  Why: one audit file instead of a # read of Vercel, Actions, the shell and the cloud dialog each time · 2026-10-23.
- What Jamie leaves open goes to the ticket it blocks in `.icm/intake/`, as a numbered question with a default, never into a file as a placeholder
  Why: a placeholder reads as a fact to a module that starts cold, and a question beside its ticket is answered where the work is · 2026-10-19.
- The core holds the pack because the entity's tax status, its obligations and its calendar are facts about the entity, and `identity.md` names the status
  Why: one home per fact · 2026-10-26.
- A value the table does not give stops the render
  Why: one home for the design; the renderer is its reader, not a second home · 2026-10-22.
- A proposal takes the body of `quote/quote.md` in place of its own last `## ` section
  Why: the price has one home, and the client says yes to one document · 2026-10-19.
- A table that fits on a page is kept whole, with the heading or the label line before it
  Why: a price table split across two pages, or one that runs off the page, is the part of a document a client reads twice · Jamie, 2026-10-27.
- The document's title is not in the name
  Why: the kind already says what the document is, and a title often repeats it · Jamie, 2026-10-27.
- A signed copy is named by Jamie and starts with the signed kind (`Signed`, `Signé`, `Assinado`); `place.sh` never writes or replaces a file whose name starts with it
  Why: the signed copy is the record of the deal; a render must never overwrite it · 2026-10-22.
- CI never places
  Why: no secret in the render path · 2026-10-22.

## services.md

- Work that fits no line is a finding: the file grows, or the work is declined
  Why: a catalogue that is not the one home for price becomes a habit of quoting from memory · 2026-10-19.
- The eight from GEO optimisation to Lead-gen channel development were the site's services, and Jamie kept them all on 2026-10-27
  Why: the site sold them, and the cases on it are tagged with them · Jamie, 2026-10-27.
- Handover offers it as the last section of the handover pack (`08-handover/retainer-offer.md`)
  Why: the client decides before the first month without support · 2026-10-19.
- A retainer at any number of hours stays a retainer; the role starts where the ownership starts
  Why: Remi AI · 2026-10-22.
- The client brings it, or it is its own line in the proposal
  Why: Jamie's answer · 2026-10-19.
- Time and materials is not sold
  Why: a fixed price makes scope the conversation; the regretted deals were the ones where the price moved and the scope did not · 2026-10-19.
- Each is said on a call or in a proposal, never on a page
  Why: a number on a page is a number to argue with before the work is scoped · 2026-10-19.
- The offer, not the agreed price, is the source: it was built from the anchor and read against the market, and the agreed price is a relationship discount that the agreement names as no reference rate
  Why: a list read from a discount is a discount · 2026-10-25.
- A retainer is priced from Jamie's hours, not from a range
  Why: a retainer runs from five hours a month to near full-time, and one range fits none of them · 2026-10-22.
- The term discount: the longer the committed block, the larger the discount
  Why: a committed block is income Jamie can plan on · 2026-10-22.

## terms.md

- The quote writes them into the proposal's price section, the agreement writes them as the agreement's clauses, and a deviation is named in the client's folder
  Why: a term restated per deal drifts, and a client who reads two of our agreements should find the same rules · 2026-10-19.
- The proposal names which one applies
  Why: silence here is the first question after launch · 2026-10-19.
- When neither names it, the first applies
  Why: basic support rides inside a retainer, and without one the client must know on the day of handover who keeps the build working · Jamie, 2026-10-26.
- A retainer the client ends before its committed block ends: the term discount (`services.md` § Retainer pricing) on the months already billed is invoiced with the last invoice
  Why: the discount buys the block; without the block it was not earned · 2026-10-22.
- A workshop has its own scale before the first day, in place of the notice period
  Why: a date held is a week Jamie cannot sell again, and a flight is booked at signature · Euro Register, 2026-10-26.
- At the end he keeps no copy of the client's documents
  Why: a client shows its working to someone it trusts, and the trust outlives the engagement · Euro Register, 2026-10-26.
- Jamie's liability under an agreement is limited to the price the client has paid
  Why: one person cannot carry a risk larger than the engagement · Euro Register, 2026-10-26.
- Where the two differ, the agreement prevails
  Why: the agreement is the later text and the one both sides sign · Berceo, Euro Register, 2026-10-26.

## voice.md

- A module reads this file and never quotes it at a client
  Why: a voice is shown, not described · 2026-10-19.
- The words that are never in client text
  Why: each one earned its place in a deal that went wrong · 2026-10-19.
- When the two disagree, the tokens win and this table is fixed
  Why: a copy that wins over its source drifts the site · 2026-10-19.
- When the file and the brand's tokens disagree, the tokens win and the file is fixed
  Why: one home for the desk's design, read by every component, and the brand stays the source · 2026-10-27.
- There is no separate quote document: the price is the proposal's last section
  Why: a client says yes to one document they understand, without a second call · 2026-10-19.
- One document: the render joins the four files in that order. 3 to 6 pages
  Why: the client reads one document on the day the build ends, and each part keeps one home · 2026-10-26.

## identity.md

- Every module and every client artefact reads these facts here
  Why: one home per fact; a bio restated in five proposals drifts five ways · 2026-10-19.
- Agreements and invoices carry the legal name and the NIF, never the trade name alone
  Why: the sole trader is the party that signs and is paid; a trade name binds nobody · 2026-10-19.
- Advise: a second opinion on where the tools fit in a client's business, and delivery run on a build
  Why: AI consultancy and project management are lines of `services.md` · Jamie, 2026-10-27.
