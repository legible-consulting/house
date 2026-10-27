import { redirect } from "next/navigation";
import { DataTable, type Column } from "@/components/desk/data-table";
import { Heading } from "@/components/desk/document";
import { Field, FieldActions, FieldGroup } from "@/components/desk/field-group";
import { Flash } from "@/components/desk/flash";
import { Due, StatusTag } from "@/components/desk/status-tag";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { allProspects } from "@/lib/db";
import { flash, type Search } from "@/lib/guard";
import { clientBySlug } from "@/lib/house";
import { LANGUAGES, today, type DeskUser, type Prospect } from "@/lib/pool";
import { stageForSalesman } from "@/lib/rhythms";
import { currentUser } from "@/lib/user";
import { Shell } from "../_shell";
import { addProspect } from "./actions";

// The pool: every row, for Jamie and every salesman (prospecting: one owner per row, all read it, so
// two salesmen never approach one company). Add a row here; the rest is on the row's page.
// A handed-off row names its deal's stage from the client folder: a salesman follows a deal
// they sourced up to agreement and nothing after it; Jamie sees the stage itself.
export const dynamic = "force-dynamic";

const open = (s: string) => s !== "handed off" && s !== "lost";

// The rows. On the phone a prospect is one card: the company, then the status, the deal and
// who sourced it, then the next action and the touches; the contact and the date are for the
// desk.
const columns = (user: DeskUser, now: string): Column<Prospect>[] => [
  { key: "company", label: "Company", phone: "title", cell: (p) => p.company },
  { key: "status", label: "Status", phone: "meta", cell: (p) => <StatusTag status={p.status} /> },
  {
    key: "deal",
    label: "Deal",
    phone: "meta",
    cell: (p) => {
      const stage = p.record && p.slug ? clientBySlug(p.slug)?.stage : undefined;
      const deal = user.role === "jamie" ? (stage ?? "") : stageForSalesman(stage);
      if (!deal) return null;
      return deal && user.role === "jamie" && p.slug ? (
        <a href={`/clients/${p.slug}`} className="relative font-mono text-meta hover:underline">
          {deal}
        </a>
      ) : (
        <span className="font-mono text-meta">{deal}</span>
      );
    },
  },
  {
    key: "sourced",
    label: "Sourced by",
    phone: "meta",
    cell: (p) => (
      <>
        <span className="md:hidden">by </span>
        {p.sourced_by}
      </>
    ),
  },
  { key: "next", label: "Next action", cell: (p) => <Due date={p.next_action} today={now} flag={open(p.status)} /> },
  { key: "touches", label: "Touches", align: "end", cell: (p) => p.touches },
  {
    key: "contact",
    label: "Contact",
    phone: "hide",
    cell: (p) => [p.contact_name, p.email || p.phone].filter(Boolean).join(" · "),
  },
  {
    key: "updated",
    label: "Updated",
    phone: "hide",
    cell: (p) => <span className="font-mono text-meta text-muted-foreground">{p.updated}</span>,
  },
];

export default async function Pool({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "client") redirect("/");
  const [rows, { error, note }] = await Promise.all([allProspects(), flash(searchParams)]);
  const now = today();
  // The rows due now: a next action today or past, on an open row the user works (Jamie: all).
  const mine = (p: Prospect) => user.role === "jamie" || p.salesman === user.id;
  const due = rows.filter((p) => p.next_action && p.next_action <= now && open(p.status) && mine(p));
  return (
    <Shell user={user} current="/pool">
      <Heading title="Pool" />
      <Flash error={error} note={note} />
      {due.length > 0 && (
        <p className="mb-4 text-body">
          <span className="font-semibold">Due now:</span>{" "}
          {due.map((p, i) => (
            <span key={p.id}>
              {i > 0 && ", "}
              <a href={`/pool/${p.id}`} className="underline">
                {p.company}
              </a>{" "}
              <span className="font-mono text-meta font-semibold text-warning-text">{p.next_action}</span>
            </span>
          ))}
          .
        </p>
      )}
      <DataTable
        columns={columns(user, now)}
        rows={rows}
        rowKey={(p) => p.id}
        href={(p) => `/pool/${p.id}`}
        empty="No prospect in the pool yet. Add one below; the site's contact form and the free look add theirs."
      />
      <p className="mt-2 text-ui font-normal text-muted-foreground">
        {rows.length} prospects. An amber next action is due inside seven days; a red one is overdue. You write the
        rows you sourced; the others are read-only.
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Add a prospect</CardTitle>
          <CardDescription>Company and source now; the rest on the row&apos;s page.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={addProspect}>
            <FieldGroup>
              <Field label="Company">
                <Input name="company" required autoComplete="organization" enterKeyHint="next" />
              </Field>
              <Field label="Source">
                <Input name="source" required placeholder="who referred, which event, which list" enterKeyHint="next" />
              </Field>
              <Field label="Contact">
                <Input name="contact_name" autoComplete="name" enterKeyHint="next" />
              </Field>
              <Field label="Email">
                <Input type="email" name="email" autoComplete="email" inputMode="email" enterKeyHint="next" />
              </Field>
              <Field label="Phone">
                <Input name="phone" placeholder="+351 …" autoComplete="tel" inputMode="tel" enterKeyHint="next" />
              </Field>
              <Field label="Country">
                <Input name="country" placeholder="PT, BE, GB" maxLength={2} autoComplete="country" enterKeyHint="next" />
              </Field>
              <Field label="Language">
                <NativeSelect name="language" defaultValue="">
                  <NativeSelectOption value="">—</NativeSelectOption>
                  {LANGUAGES.map((l) => (
                    <NativeSelectOption key={l} value={l}>
                      {l}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>
              <Field label="Notes" full>
                <Textarea name="notes" rows={2} />
              </Field>
              <FieldActions>
                <Button type="submit">Add</Button>
              </FieldActions>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </Shell>
  );
}
