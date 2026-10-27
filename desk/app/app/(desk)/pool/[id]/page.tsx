import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";
import { DataTable, type Column } from "@/components/desk/data-table";
import { Field, FieldActions, FieldGroup } from "@/components/desk/field-group";
import { Flash } from "@/components/desk/flash";
import { PageHeader } from "@/components/desk/page-header";
import { Due, StatusTag } from "@/components/desk/status-tag";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { prospectById, touchesOf } from "@/lib/db";
import { flash, type Search } from "@/lib/guard";
import {
  CHANNELS,
  DEAL_SIZES,
  LANGUAGES,
  LINES,
  NO_CONTACT,
  SERVICES,
  SIZES,
  UUID_RE,
  canGoReady,
  canWrite,
  missingForReady,
  nextMoves,
  slugOf,
  today,
  type Touch,
} from "@/lib/pool";
import { currentUser } from "@/lib/user";
import { readLinks, SendForm } from "@/app/_send";
import { NextTouch } from "@/app/_touch";
import { askedNotToBeContacted, checkHandoffPr, logTouch, moveStatus, readyForJamie, saveProspect } from "./actions";

// One prospect: the facts in four field groups, the touches, the next touch's draft
// (app/_touch.tsx), and the actions as cards: the move, "They asked not to be contacted", and
// "Ready for Jamie", which opens the handoff PR on the house and keeps its link here.
// Read-only for every salesman but the sourcer, and for everyone once handed off: one sentence
// under the header says so. Jamie also sends a form from here (app/_send.tsx); the answer is
// collected only, with no user.
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Search;
};

const Options = ({ list }: { list: readonly string[] }) => (
  <>
    <NativeSelectOption value="">—</NativeSelectOption>
    {list.map((v) => (
      <NativeSelectOption key={v} value={v}>
        {v}
      </NativeSelectOption>
    ))}
  </>
);

// A section of the page with its heading, so a reader lists it.
function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-4">
      <h2 id={id} className="text-heading">
        {title}
      </h2>
      {children}
    </section>
  );
}

// An action: one card, one sentence on what it does, one button at the end.
function Action({ title, what, children }: { title: string; what: ReactNode; children: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{title}</h2>
        </CardTitle>
        <CardDescription>{what}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">{children}</CardContent>
    </Card>
  );
}

// The touches: on the phone each is a card, the date first, the channel under it, the note.
const touchColumns: Column<Touch>[] = [
  {
    key: "date",
    label: "Date",
    phone: "title",
    cell: (t) => <span className="font-mono tabular-nums">{t.touched_on}</span>,
  },
  { key: "channel", label: "Channel", phone: "meta", cell: (t) => t.channel },
  { key: "note", label: "Note", className: "md:whitespace-normal", cell: (t) => t.note },
];

export default async function ProspectPage({ params, searchParams }: Props) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "client") redirect("/");
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();
  const p = await prospectById(id);
  if (!p) notFound();
  const jamie = user.role === "jamie";
  const [touches, { error, note }, sent] = await Promise.all([
    touchesOf(id),
    flash(searchParams),
    jamie ? readLinks(p.slug) : null,
  ]);

  const write = canWrite(p, user);
  const moves = nextMoves(p, user);
  const missing = missingForReady(p);
  const slug = p.slug ?? slugOf(p.company);
  const slugLocked = Boolean(p.pr_url) || p.status === "ready for Jamie" || p.status === "handed off";
  // A sent link names the slug, so the slug stays once one is sent. Read-only, not disabled: the
  // action still gets the slug and refuses a change (app/pool/[id]/actions.ts).
  const slugLinked = Boolean(sent?.links.length);
  const canTouch = write && p.status !== "ready for Jamie" && p.status !== "lost";
  const open = p.status !== "handed off" && p.status !== "lost";
  const noContact = write && p.lost_reason !== NO_CONTACT;
  const ready = write && canGoReady(p);
  const handoff = p.status === "ready for Jamie" && Boolean(p.pr_url);

  return (
    <>
      <PageHeader
        user={user}
        title={p.company}
        back={{ href: "/pool", label: "Pool" }}
        meta={`sourced by ${p.sourced_by} · added ${p.added} · updated ${p.updated}`}
        actions={<StatusTag status={p.status} />}
      />
      {!write && (
        <p className="mb-4 max-w-reading text-body text-foreground-2">
          {p.status === "handed off"
            ? "Handed off: the client folder is the record now, so this row is read-only."
            : `Read-only: only the sourcer, ${p.sourced_by}, and Jamie write this row.`}
        </p>
      )}
      <Flash error={error} note={note} />
      {(p.next_action || p.pr_url || p.record || p.lost_reason) && (
        <dl className="mb-6 flex flex-wrap items-baseline gap-x-6 gap-y-1 text-ui">
          {p.next_action && (
            <div className="flex items-baseline gap-2">
              <dt className="text-muted-foreground">Next action</dt>
              <dd>
                <Due date={p.next_action} today={today()} flag={open} />
              </dd>
            </div>
          )}
          {p.pr_url && (
            <div className="flex items-baseline gap-2">
              <dt className="text-muted-foreground">Handoff PR</dt>
              <dd>
                <a
                  href={p.pr_url}
                  className="inline-flex min-h-row items-center font-mono text-meta underline underline-offset-3"
                >
                  {p.pr_url.replace("https://github.com/", "")}
                </a>
              </dd>
            </div>
          )}
          {p.record && (
            <div className="flex items-baseline gap-2">
              <dt className="text-muted-foreground">Record</dt>
              <dd className="font-mono text-meta break-all">{p.record}</dd>
            </div>
          )}
          {p.lost_reason && (
            <div className="flex items-baseline gap-2">
              <dt className="text-muted-foreground">Lost</dt>
              <dd>{p.lost_reason}</dd>
            </div>
          )}
        </dl>
      )}

      <div className="grid gap-10">
        <Section id="facts" title="Facts">
          <form action={saveProspect} className="grid gap-6">
            <input type="hidden" name="id" value={p.id} />
            <FieldGroup legend="Company" disabled={!write}>
              <Field label="Company">
                <Input name="company" defaultValue={p.company} required enterKeyHint="next" />
              </Field>
              <Field
                label="Slug"
                hint={
                  slugLocked
                    ? "Fixed: the handoff names it."
                    : slugLinked
                      ? "Fixed: a sent link names it."
                      : "Lowercase words joined by hyphens."
                }
              >
                <Input
                  name="slug"
                  defaultValue={slug}
                  disabled={slugLocked}
                  readOnly={slugLinked}
                  pattern="[a-z0-9]+(-[a-z0-9]+)*"
                  maxLength={40}
                  className="font-mono"
                  autoCapitalize="none"
                  spellCheck={false}
                />
              </Field>
              <Field label="Website">
                <Input type="url" name="website" defaultValue={p.website} inputMode="url" enterKeyHint="next" />
              </Field>
              <Field label="Country">
                <Input
                  name="country"
                  defaultValue={p.country}
                  placeholder="PT, BE, GB"
                  maxLength={2}
                  autoCapitalize="characters"
                  enterKeyHint="next"
                />
              </Field>
              <Field label="Language">
                <NativeSelect name="language" defaultValue={p.language}>
                  <Options list={LANGUAGES} />
                </NativeSelect>
              </Field>
            </FieldGroup>

            <FieldGroup legend="Contact" disabled={!write}>
              <Field label="Contact">
                <Input name="contact_name" defaultValue={p.contact_name} enterKeyHint="next" />
              </Field>
              <Field label="Role">
                <Input name="role" defaultValue={p.role} enterKeyHint="next" />
              </Field>
              <Field label="Email">
                <Input type="email" name="email" defaultValue={p.email} inputMode="email" enterKeyHint="next" />
              </Field>
              <Field label="Phone">
                <Input name="phone" defaultValue={p.phone} placeholder="+351 …" inputMode="tel" enterKeyHint="next" />
              </Field>
            </FieldGroup>

            <FieldGroup legend="Fit" disabled={!write}>
              <Field label="Line">
                <NativeSelect name="line" defaultValue={p.line}>
                  <Options list={LINES} />
                </NativeSelect>
              </Field>
              <Field label="Size">
                <NativeSelect name="size" defaultValue={p.size}>
                  <Options list={SIZES} />
                </NativeSelect>
              </Field>
              <Field label="Service">
                <NativeSelect name="service" defaultValue={p.service}>
                  <Options list={SERVICES} />
                </NativeSelect>
              </Field>
              <Field label="Deal size">
                <NativeSelect name="deal_size" defaultValue={p.deal_size}>
                  <Options list={DEAL_SIZES} />
                </NativeSelect>
              </Field>
              <Field label="Source">
                <Input name="source" defaultValue={p.source} required enterKeyHint="next" />
              </Field>
            </FieldGroup>

            <FieldGroup legend="Ask" disabled={!write}>
              <Field label="Ask" full>
                <Textarea name="ask" rows={3} defaultValue={p.ask} placeholder="what they asked for, in your words" />
              </Field>
              <Field label="Notes" full>
                <Textarea name="notes" rows={3} defaultValue={p.notes} />
              </Field>
              <Field label="Next action">
                <Input type="date" name="next_action" defaultValue={p.next_action ?? ""} />
              </Field>
            </FieldGroup>

            {write && (
              <FieldActions>
                <Button type="submit">Save</Button>
              </FieldActions>
            )}
          </form>
        </Section>

        <Section id="touches" title="Touches">
          <p className="-mt-2 text-ui font-normal text-muted-foreground">
            Three touches over three weeks; a reply stops the cadence.
          </p>
          <DataTable
            columns={touchColumns}
            rows={touches}
            rowKey={(t) => t.id}
            empty={canTouch ? "No touch logged yet. Log each one below when you send it." : "No touch logged."}
          />
          {canTouch && (
            <form action={logTouch}>
              <input type="hidden" name="id" value={p.id} />
              <FieldGroup
                legend="Log a touch"
                className="sm:grid-cols-1 lg:grid-cols-[10rem_10rem_minmax(0,1fr)_auto] lg:items-end"
              >
                <Field label="Date">
                  <Input type="date" name="touched_on" defaultValue={today()} required />
                </Field>
                <Field label="Channel">
                  <NativeSelect name="channel">
                    {CHANNELS.map((c) => (
                      <NativeSelectOption key={c} value={c}>
                        {c}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </Field>
                <Field label="Note">
                  <Input name="note" placeholder="what was said" enterKeyHint="done" />
                </Field>
                <div className="max-sm:*:w-full">
                  <Button type="submit" variant="secondary">
                    Log a touch
                  </Button>
                </div>
              </FieldGroup>
            </form>
          )}
        </Section>

        {canTouch && <NextTouch p={p} />}

        {sent && (
          <SendForm
            target={{ prospect: p.id }}
            read={sent}
            language={p.language}
            name={p.contact_name}
            email={p.email}
          />
        )}

        {(moves.length > 0 || noContact || ready || handoff) && (
          <div className="grid items-start gap-4 md:grid-cols-2">
            {moves.length > 0 && (
              <Action
                title="Move"
                what={
                  p.status === "new" && p.touches === 0 && user.role !== "jamie"
                    ? "contacted needs one logged touch."
                    : "lost needs its reason."
                }
              >
                <form action={moveStatus}>
                  <input type="hidden" name="id" value={p.id} />
                  <FieldGroup className="sm:grid-cols-2 lg:grid-cols-2">
                    <Field label="To">
                      <NativeSelect name="status">
                        {moves.map((s) => (
                          <NativeSelectOption key={s} value={s}>
                            {s}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </Field>
                    <Field label="Reason, when lost">
                      <Input name="lost_reason" />
                    </Field>
                    <FieldActions>
                      <Button type="submit" variant="secondary">
                        Move
                      </Button>
                    </FieldActions>
                  </FieldGroup>
                </form>
              </Action>
            )}

            {ready && (
              <Action
                title="Ready for Jamie"
                what={
                  <>
                    Opens one PR on legible-consulting/house that creates{" "}
                    <code className="font-mono text-meta">clients/{slug}/record.md</code> at stage prospect from this
                    row. Jamie merges; &quot;Check the PR&quot; then moves the row to handed off.
                  </>
                }
              >
                <Flash note={missing.length > 0 ? `Fill first: ${missing.join(", ")}.` : undefined} className="mb-0" />
                <form action={readyForJamie} className="max-sm:*:w-full">
                  <input type="hidden" name="id" value={p.id} />
                  <Button type="submit" disabled={missing.length > 0}>
                    Ready for Jamie
                  </Button>
                </form>
              </Action>
            )}

            {handoff && (
              <Action
                title="Handoff"
                what={`Merged: the row moves to handed off and names its record. Closed without a merge: the row returns to ${p.previous_status ?? "replied"}.`}
              >
                <form action={checkHandoffPr} className="max-sm:*:w-full">
                  <input type="hidden" name="id" value={p.id} />
                  <Button type="submit" variant="secondary">
                    Check the PR
                  </Button>
                </form>
              </Action>
            )}

            {noContact && (
              <Action
                title="No contact"
                what={
                  <>
                    When they say no, on any channel. The row goes to lost with the reason {NO_CONTACT}, the next action
                    is cleared, and the row&apos;s email and phone go on the no-contact list for good: the pool takes no
                    new row for them, from any salesman or from the site.
                  </>
                }
              >
                <form action={askedNotToBeContacted} className="max-sm:*:w-full">
                  <input type="hidden" name="id" value={p.id} />
                  <Button type="submit" variant="destructive">
                    They asked not to be contacted
                  </Button>
                </form>
              </Action>
            )}
          </div>
        )}
      </div>
    </>
  );
}
