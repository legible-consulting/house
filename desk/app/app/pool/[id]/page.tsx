import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { prospectById, touchesOf } from "@/lib/db";
import { flash, type Search } from "@/lib/guard";
import {
  CHANNELS,
  DEAL_SIZES,
  LANGUAGES,
  LINES,
  SERVICES,
  SIZES,
  UUID_RE,
  canGoReady,
  canWrite,
  missingForReady,
  nextMoves,
  slugOf,
  today,
} from "@/lib/pool";
import { currentUser } from "@/lib/user";
import { Shell } from "../../_shell";
import { Field, Flash, StatusBadge } from "../../_ui";
import { checkHandoffPr, logTouch, moveStatus, readyForJamie, saveProspect } from "./actions";

// One prospect: the facts, the touches, the move, and "Ready for Jamie", which opens the
// handoff PR on the house and keeps its link here. Read-only for every salesman but the
// sourcer, and for everyone once handed off.
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

export default async function ProspectPage({ params, searchParams }: Props) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "client") redirect("/");
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();
  const p = await prospectById(id);
  if (!p) notFound();
  const [touches, { error, note }] = await Promise.all([touchesOf(id), flash(searchParams)]);

  const write = canWrite(p, user);
  const moves = nextMoves(p, user);
  const missing = missingForReady(p);
  const slug = p.slug ?? slugOf(p.company);
  const slugLocked = Boolean(p.pr_url) || p.status === "ready for Jamie" || p.status === "handed off";
  const canTouch = write && p.status !== "ready for Jamie" && p.status !== "lost";
  const grid = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Shell user={user} current="/pool">
      <p className="mb-2 text-sm">
        <a href="/pool" className="text-muted-foreground hover:text-foreground">
          ← Pool
        </a>
      </p>
      <div className="mb-1 flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-semibold tracking-tight">{p.company}</h2>
        <StatusBadge status={p.status} />
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        sourced by {p.sourced_by} · added {p.added} · updated {p.updated}
        {p.next_action && <> · next action {p.next_action}</>}
        {p.pr_url && (
          <>
            {" "}
            · handoff PR:{" "}
            <a href={p.pr_url} className="underline">
              {p.pr_url.replace("https://github.com/", "")}
            </a>
          </>
        )}
        {p.record && (
          <>
            {" "}
            · record: <code className="font-mono text-xs">{p.record}</code>
          </>
        )}
      </p>
      {!write && (
        <p className="mb-4 text-sm text-muted-foreground">
          {p.status === "handed off"
            ? "Handed off: the client folder is the record now."
            : "Read-only: only the sourcer and Jamie write this row."}
        </p>
      )}
      <Flash error={error} note={note} />
      {p.lost_reason && <p className="mb-4 text-sm">Lost: {p.lost_reason}</p>}

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={saveProspect}>
              <input type="hidden" name="id" value={p.id} />
              <fieldset className={grid} disabled={!write}>
                <Field label="Company">
                  <Input name="company" defaultValue={p.company} required />
                </Field>
                <Field label="Slug">
                  <Input
                    name="slug"
                    defaultValue={slug}
                    disabled={slugLocked}
                    pattern="[a-z0-9]+(-[a-z0-9]+)*"
                    maxLength={40}
                    className="font-mono"
                  />
                </Field>
                <Field label="Contact">
                  <Input name="contact_name" defaultValue={p.contact_name} />
                </Field>
                <Field label="Role">
                  <Input name="role" defaultValue={p.role} />
                </Field>
                <Field label="Email">
                  <Input type="email" name="email" defaultValue={p.email} />
                </Field>
                <Field label="Phone">
                  <Input name="phone" defaultValue={p.phone} placeholder="+351 …" />
                </Field>
                <Field label="Website">
                  <Input type="url" name="website" defaultValue={p.website} />
                </Field>
                <Field label="Country">
                  <Input name="country" defaultValue={p.country} placeholder="PT, BE, GB" maxLength={2} />
                </Field>
                <Field label="Language">
                  <NativeSelect name="language" defaultValue={p.language}>
                    <Options list={LANGUAGES} />
                  </NativeSelect>
                </Field>
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
                  <Input name="source" defaultValue={p.source} required />
                </Field>
                <Field label="Next action">
                  <Input type="date" name="next_action" defaultValue={p.next_action ?? ""} />
                </Field>
                <Field label="Ask" className="sm:col-span-2 lg:col-span-3">
                  <Textarea name="ask" rows={3} defaultValue={p.ask} placeholder="what they asked for, in your words" />
                </Field>
                <Field label="Notes" className="sm:col-span-2 lg:col-span-3">
                  <Textarea name="notes" rows={3} defaultValue={p.notes} />
                </Field>
                <div>
                  <Button type="submit">Save</Button>
                </div>
              </fieldset>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Touches</CardTitle>
            <CardDescription>Three touches over three weeks; a reply stops the cadence.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {touches.length === 0 ? (
              <p className="text-sm text-muted-foreground">No touch logged.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {touches.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="tabular-nums">{t.touched_on}</TableCell>
                      <TableCell>{t.channel}</TableCell>
                      <TableCell>{t.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {canTouch && (
              <form action={logTouch} className="flex flex-wrap items-end gap-3">
                <input type="hidden" name="id" value={p.id} />
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
                <Field label="Note" className="min-w-48 flex-1">
                  <Input name="note" placeholder="what was said" />
                </Field>
                <Button type="submit" variant="secondary">
                  Log a touch
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {moves.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Move</CardTitle>
              <CardDescription>
                {p.status === "new" && p.touches === 0 && user.role !== "jamie"
                  ? "contacted needs one logged touch."
                  : "lost needs its reason."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={moveStatus} className="flex flex-wrap items-end gap-3">
                <input type="hidden" name="id" value={p.id} />
                <Field label="To">
                  <NativeSelect name="status">
                    {moves.map((s) => (
                      <NativeSelectOption key={s} value={s}>
                        {s}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </Field>
                <Field label="Reason, when lost" className="min-w-48 flex-1">
                  <Input name="lost_reason" />
                </Field>
                <Button type="submit" variant="secondary">
                  Move
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {write && canGoReady(p) && (
          <Card>
            <CardHeader>
              <CardTitle>Ready for Jamie</CardTitle>
              <CardDescription>
                Opens one PR on legible-consulting/house that creates{" "}
                <code className="font-mono text-xs">clients/{slug}/record.md</code> at stage prospect from this row.
                Jamie merges; &quot;Check the PR&quot; then moves the row to handed off.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {missing.length > 0 && <Flash error={`Fill first: ${missing.join(", ")}.`} />}
              <form action={readyForJamie}>
                <input type="hidden" name="id" value={p.id} />
                <Button type="submit" disabled={missing.length > 0}>
                  Ready for Jamie
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {p.status === "ready for Jamie" && p.pr_url && (
          <Card>
            <CardHeader>
              <CardTitle>Handoff</CardTitle>
              <CardDescription>
                Merged: the row moves to handed off and names its record. Closed without a merge: the row returns to{" "}
                {p.previous_status ?? "replied"}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={checkHandoffPr}>
                <input type="hidden" name="id" value={p.id} />
                <Button type="submit" variant="secondary">
                  Check the PR
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </Shell>
  );
}
