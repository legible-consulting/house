import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";
import { DataTable, type Column } from "@/components/desk/data-table";
import { Field, FieldActions, FieldGroup } from "@/components/desk/field-group";
import { Flash } from "@/components/desk/flash";
import { PageHeader } from "@/components/desk/page-header";
import { Phrase } from "@/components/desk/phrase";
import { PoolTrack } from "@/components/desk/pool-track";
import { Due } from "@/components/desk/status-tag";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { prospectById, touchesOf } from "@/lib/db";
import { flash, type Search } from "@/lib/guard";
import { languageOf } from "@/lib/language";
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
  instagramUrl,
  linkOf,
  meetingOf,
  meetingWho,
  missingForReady,
  nextMoves,
  slugOf,
  today,
  whatsappUrl,
  type Prospect,
  type Touch,
} from "@/lib/pool";
import { currentUser, wordsLanguage } from "@/lib/user";
import { words, type Words } from "@/lib/words";
import { kitIn } from "@/app/(desk)/sell/_course";
import { readLinks, SendForm } from "@/app/_send";
import { NextTouch } from "@/app/_touch";
import { askedNotToBeContacted, checkHandoffPr, logTouch, moveStatus, readyForJamie, saveProspect } from "./actions";

// One prospect: the status on its track in the header (pool-track.tsx), the facts in four field
// groups, the touches, the next touch's draft (app/_touch.tsx), and the actions as cards: the
// move, "They asked not to be contacted", and "Ready for Jamie", which opens the handoff PR on
// the house and keeps its link here. Read-only for every salesman but the sourcer, and for
// everyone once handed off: one sentence under the header says so. On an open row the user
// writes, one line under the header names the next step and links its lesson, from the kit's
// lesson for the row's status in the user's language (DESIGN.md, rule 9). Jamie also sends a
// form from here (app/_send.tsx); the answer is collected only, with no user. The meeting
// (prospect.md, Fields) is asked for by the move to `meeting`, edited in the Meeting field group
// from `replied` on, and shown in the facts line from `meeting` on, as Jamie's time. Every word of
// the page is the user's (lib/words.ts); a status, a channel, a language code, a country, a key
// and a date stay the model's, a status in a sentence in mono (components/desk/phrase.tsx).
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

// Who takes the meeting: the sourcer by handle, or Jamie. A row Jamie sourced has one choice.
function WithOptions({ p, w }: { p: Prospect; w: Words }) {
  return (
    <>
      <NativeSelectOption value="">—</NativeSelectOption>
      {p.sourced_by !== "jamie" && (
        <NativeSelectOption value="sourcer">{w.row.sourcer(p.sourced_by)}</NativeSelectOption>
      )}
      <NativeSelectOption value="jamie">Jamie</NativeSelectOption>
    </>
  );
}

// The meeting's four fields, in the Move card and in the Meeting field group. The time is Jamie's.
// `when` follows each label in the Move card: ", when `meeting`".
function MeetingFields({ p, w, when = "" }: { p: Prospect; w: Words; when?: string }) {
  const m = meetingOf(p);
  return (
    <>
      <Field label={<Phrase text={`${w.fields.date}${when}`} />}>
        <Input type="date" name="meeting_date" defaultValue={m?.date ?? ""} />
      </Field>
      <Field label={<Phrase text={`${w.fields.time}${when}`} />} hint={w.row.lisbonTime}>
        <Input type="time" name="meeting_time" defaultValue={m?.time ?? ""} />
      </Field>
      <Field label={<Phrase text={`${w.fields.with}${when}`} />}>
        <NativeSelect name="meeting_with" defaultValue={m?.with ?? ""}>
          <WithOptions p={p} w={w} />
        </NativeSelect>
      </Field>
      <Field label={<Phrase text={`${w.fields.where}${when}`} />} hint={w.row.whereHint}>
        <Input name="meeting_where" defaultValue={m?.where ?? ""} enterKeyHint="done" />
      </Field>
    </>
  );
}

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

// A link under a contact field, out to the app that opens it. An anchor, so it also works on a
// read-only row, where the field's fieldset is disabled.
function OutLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="inline-flex min-h-row items-center font-mono text-meta underline underline-offset-3">
      {label}
    </a>
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
const touchColumns = (w: Words): Column<Touch>[] => [
  {
    key: "date",
    label: w.fields.date,
    phone: "title",
    cell: (t) => <span className="font-mono tabular-nums">{t.touched_on}</span>,
  },
  { key: "channel", label: w.fields.channel, phone: "meta", cell: (t) => t.channel },
  { key: "note", label: w.fields.note, className: "md:whitespace-normal", cell: (t) => t.note },
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
  const [touches, { error, note }, sent, h] = await Promise.all([
    touchesOf(id),
    flash(searchParams),
    jamie ? readLinks(p.slug) : null,
    headers(),
  ]);
  const kit = kitIn(languageOf(user, h.get("accept-language")));
  const w = words(await wordsLanguage(user));

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
  const wa = whatsappUrl(p.whatsapp);
  const ig = instagramUrl(p.instagram);
  const meeting = meetingOf(p);
  const meetingLink = meeting ? linkOf(meeting.where) : null;
  const showMeeting = Boolean(meeting) && ["meeting", "ready for Jamie", "handed off"].includes(p.status);
  const meetingGroup = ["replied", "meeting", "ready for Jamie", "handed off"].includes(p.status) || Boolean(meeting);
  const toMeeting = moves.includes("meeting");
  // A status with no lesson shows no line.
  const lesson = write && open ? kit.lessons.find((l) => l.status === p.status) : undefined;

  return (
    <>
      <PageHeader
        user={user}
        title={p.company}
        back={{ href: "/pool", label: w.pool.title, said: w.back(w.pool.title) }}
        meta={w.row.meta(p.sourced_by, p.added, p.updated)}
        actions={<PoolTrack status={p.status} track unit={w.status} of={w.of} />}
      />
      {!write && (
        <p className="mb-4 max-w-reading text-body text-foreground-2">
          {p.status === "handed off" ? w.row.handedOff : w.row.readOnly(p.sourced_by)}
        </p>
      )}
      {lesson?.next && (
        <p className="mb-4 flex max-w-reading flex-wrap items-center gap-x-2 text-body text-foreground-2">
          <span>
            {w.row.next} {lesson.next}
          </span>
          <Link
            href={`/sell/${lesson.key}`}
            className="inline-flex min-h-row items-center text-foreground underline underline-offset-3"
          >
            {lesson.title}
          </Link>
        </p>
      )}
      <Flash error={error} note={note} />
      {(p.next_action || showMeeting || p.pr_url || p.record || p.lost_reason) && (
        <dl className="mb-6 flex flex-wrap items-baseline gap-x-6 gap-y-1 text-ui">
          {p.next_action && (
            <div className="flex items-baseline gap-2">
              <dt className="text-muted-foreground">{w.fields.nextAction}</dt>
              <dd>
                <Due date={p.next_action} today={today()} flag={open} words={w.due} />
              </dd>
            </div>
          )}
          {showMeeting && meeting && (
            <div className="flex flex-wrap items-baseline gap-x-2">
              <dt className="text-muted-foreground">{w.row.meeting}</dt>
              <dd className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-mono text-meta tabular-nums">
                  {meeting.date} {meeting.time} {w.row.lisbon}
                </span>
                <span>{w.row.with(meetingWho(meeting, p))}</span>
                {meetingLink ? (
                  <a
                    href={meetingLink}
                    className="inline-flex min-h-row items-center font-mono text-meta break-all underline underline-offset-3"
                  >
                    {meetingLink.replace(/^https?:\/\//, "")}
                  </a>
                ) : (
                  meeting.where && <span>{meeting.where}</span>
                )}
              </dd>
            </div>
          )}
          {p.pr_url && (
            <div className="flex items-baseline gap-2">
              <dt className="text-muted-foreground">{w.row.handoffPr}</dt>
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
              <dt className="text-muted-foreground">{w.row.record}</dt>
              <dd className="font-mono text-meta break-all">{p.record}</dd>
            </div>
          )}
          {p.lost_reason && (
            <div className="flex items-baseline gap-2">
              <dt className="text-muted-foreground">{w.row.lost}</dt>
              <dd>{p.lost_reason}</dd>
            </div>
          )}
        </dl>
      )}

      <div className="grid gap-10">
        <Section id="facts" title={w.row.facts}>
          <form action={saveProspect} className="grid gap-6">
            <input type="hidden" name="id" value={p.id} />
            <FieldGroup legend={w.row.legends.company} disabled={!write}>
              <Field label={w.fields.company}>
                <Input name="company" defaultValue={p.company} required enterKeyHint="next" />
              </Field>
              <Field
                label={w.fields.slug}
                hint={slugLocked ? w.row.slugHint.handoff : slugLinked ? w.row.slugHint.link : w.row.slugHint.free}
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
              <Field label={w.fields.website}>
                <Input type="url" name="website" defaultValue={p.website} inputMode="url" enterKeyHint="next" />
              </Field>
              <Field label={w.fields.country}>
                <Input
                  name="country"
                  defaultValue={p.country}
                  placeholder="PT, BE, GB"
                  maxLength={2}
                  autoCapitalize="characters"
                  enterKeyHint="next"
                />
              </Field>
              <Field label={w.fields.language}>
                <NativeSelect name="language" defaultValue={p.language}>
                  <Options list={LANGUAGES} />
                </NativeSelect>
              </Field>
            </FieldGroup>

            <FieldGroup legend={w.row.legends.contact} disabled={!write}>
              <Field label={w.fields.contact}>
                <Input name="contact_name" defaultValue={p.contact_name} enterKeyHint="next" />
              </Field>
              <Field label={w.fields.role}>
                <Input name="role" defaultValue={p.role} enterKeyHint="next" />
              </Field>
              <Field label={w.fields.email}>
                <Input type="email" name="email" defaultValue={p.email} inputMode="email" enterKeyHint="next" />
              </Field>
              <Field label={w.fields.phone}>
                <Input name="phone" defaultValue={p.phone} placeholder="+351 …" inputMode="tel" enterKeyHint="next" />
              </Field>
              <Field label={w.fields.whatsapp} hint={wa && <OutLink href={wa} label={wa.replace("https://", "")} />}>
                <Input
                  name="whatsapp"
                  defaultValue={p.whatsapp}
                  placeholder="+351 …"
                  inputMode="tel"
                  enterKeyHint="next"
                />
              </Field>
              <Field label={w.fields.instagram} hint={ig && <OutLink href={ig} label={ig.replace("https://www.", "")} />}>
                <Input
                  name="instagram"
                  defaultValue={p.instagram}
                  placeholder={w.placeholders.handle}
                  autoCapitalize="none"
                  spellCheck={false}
                  enterKeyHint="next"
                />
              </Field>
            </FieldGroup>

            <FieldGroup legend={w.row.legends.fit} disabled={!write}>
              <Field label={w.fields.line}>
                <NativeSelect name="line" defaultValue={p.line}>
                  <Options list={LINES} />
                </NativeSelect>
              </Field>
              <Field label={w.fields.size}>
                <NativeSelect name="size" defaultValue={p.size}>
                  <Options list={SIZES} />
                </NativeSelect>
              </Field>
              <Field label={w.fields.service}>
                <NativeSelect name="service" defaultValue={p.service}>
                  <Options list={SERVICES} />
                </NativeSelect>
              </Field>
              <Field label={w.fields.dealSize}>
                <NativeSelect name="deal_size" defaultValue={p.deal_size}>
                  <Options list={DEAL_SIZES} />
                </NativeSelect>
              </Field>
              <Field label={w.fields.source}>
                <Input name="source" defaultValue={p.source} required enterKeyHint="next" />
              </Field>
            </FieldGroup>

            <FieldGroup legend={w.row.legends.ask} disabled={!write}>
              <Field label={w.fields.ask} full>
                <Textarea name="ask" rows={3} defaultValue={p.ask} placeholder={w.placeholders.ask} />
              </Field>
              <Field label={w.fields.notes} full>
                <Textarea name="notes" rows={3} defaultValue={p.notes} />
              </Field>
              <Field label={w.fields.nextAction}>
                <Input type="date" name="next_action" defaultValue={p.next_action ?? ""} />
              </Field>
            </FieldGroup>

            {meetingGroup && (
              <FieldGroup legend={w.row.legends.meeting} disabled={!write}>
                <input type="hidden" name="meeting_group" value="1" />
                <MeetingFields p={p} w={w} />
              </FieldGroup>
            )}

            {write && (
              <FieldActions>
                <Button type="submit">{w.save}</Button>
              </FieldActions>
            )}
          </form>
        </Section>

        <Section id="touches" title={w.row.touches}>
          <p className="-mt-2 text-ui font-normal text-muted-foreground">{w.row.touchesWhat}</p>
          <DataTable
            columns={touchColumns(w)}
            rows={touches}
            rowKey={(t) => t.id}
            empty={canTouch ? w.row.noTouchYet : w.row.noTouch}
          />
          {canTouch && (
            <form action={logTouch}>
              <input type="hidden" name="id" value={p.id} />
              <FieldGroup
                legend={w.row.logTouch}
                className="sm:grid-cols-1 lg:grid-cols-[10rem_10rem_minmax(0,1fr)_auto] lg:items-end"
              >
                <Field label={w.fields.date}>
                  <Input type="date" name="touched_on" defaultValue={today()} required />
                </Field>
                <Field label={w.fields.channel}>
                  <NativeSelect name="channel">
                    {CHANNELS.map((c) => (
                      <NativeSelectOption key={c} value={c}>
                        {c}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </Field>
                <Field label={w.fields.note}>
                  <Input name="note" placeholder={w.placeholders.note} enterKeyHint="done" />
                </Field>
                <div className="max-sm:*:w-full">
                  <Button type="submit" variant="secondary">
                    {w.row.logTouch}
                  </Button>
                </div>
              </FieldGroup>
            </form>
          )}
        </Section>

        {canTouch && <NextTouch p={p} kit={kit} w={w} />}

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
                title={w.row.move.title}
                what={
                  <Phrase
                    text={[
                      p.status === "new" && p.touches === 0 && user.role !== "jamie" ? w.row.move.needsTouch : "",
                      toMeeting ? w.errors.meetingNeeded : "",
                      w.errors.lostReason,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                }
              >
                <form action={moveStatus}>
                  <input type="hidden" name="id" value={p.id} />
                  <FieldGroup className="sm:grid-cols-2 lg:grid-cols-2">
                    <Field label={w.row.move.to}>
                      <NativeSelect name="status">
                        {moves.map((s) => (
                          <NativeSelectOption key={s} value={s}>
                            {s}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </Field>
                    <Field label={<Phrase text={w.row.move.reason} />}>
                      <Input name="lost_reason" />
                    </Field>
                    {toMeeting && <MeetingFields p={p} w={w} when={w.row.whenMeeting} />}
                    <FieldActions>
                      <Button type="submit" variant="secondary">
                        {w.row.move.submit}
                      </Button>
                    </FieldActions>
                  </FieldGroup>
                </form>
              </Action>
            )}

            {ready && (
              <Action
                title={w.row.ready.title}
                what={
                  <>
                    {w.row.ready.before} <code className="font-mono text-meta">clients/{slug}/record.md</code>{" "}
                    <Phrase text={w.row.ready.after} />
                  </>
                }
              >
                <Flash
                  note={missing.length > 0 ? w.row.fillFirst(missing.map((m) => w.row.missing[m])) : undefined}
                  className="mb-0"
                />
                <form action={readyForJamie} className="max-sm:*:w-full">
                  <input type="hidden" name="id" value={p.id} />
                  <Button type="submit" disabled={missing.length > 0}>
                    {w.row.ready.title}
                  </Button>
                </form>
              </Action>
            )}

            {handoff && (
              <Action
                title={w.row.handoff.title}
                what={<Phrase text={w.row.handoff.what(p.previous_status ?? "replied")} />}
              >
                <form action={checkHandoffPr} className="max-sm:*:w-full">
                  <input type="hidden" name="id" value={p.id} />
                  <Button type="submit" variant="secondary">
                    {w.row.handoff.check}
                  </Button>
                </form>
              </Action>
            )}

            {noContact && (
              <Action title={w.row.noContact.title} what={<Phrase text={w.row.noContact.what} />}>
                <form action={askedNotToBeContacted} className="max-sm:*:w-full">
                  <input type="hidden" name="id" value={p.id} />
                  <Button type="submit" variant="destructive">
                    {w.row.noContact.submit}
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
