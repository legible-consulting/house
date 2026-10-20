import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { allProspects } from "@/lib/db";
import { flash, type Search } from "@/lib/guard";
import { LANGUAGES, today } from "@/lib/pool";
import { currentUser } from "@/lib/user";
import { cn } from "@/lib/utils";
import { Shell } from "../_shell";
import { Field, Flash, StatusBadge } from "../_ui";
import { addProspect } from "./actions";

// The pool: every row, for Jamie and every salesman (S1: one owner per row, all read it, so
// two salesmen never approach one company). Add a row here; the rest is on the row's page.
export const dynamic = "force-dynamic";

export default async function Pool({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "client") redirect("/");
  const [rows, { error, note }] = await Promise.all([allProspects(), flash(searchParams)]);
  const now = today();
  const open = (s: string) => s !== "handed off" && s !== "lost";
  return (
    <Shell user={user} current="/pool">
      <h2 className="mb-3 text-base font-medium">Pool</h2>
      <Flash error={error} note={note} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sourced by</TableHead>
            <TableHead>Next action</TableHead>
            <TableHead className="text-right">Touches</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-muted-foreground">
                No prospects yet.
              </TableCell>
            </TableRow>
          )}
          {rows.map((p) => {
            const due = Boolean(p.next_action && p.next_action <= now && open(p.status));
            return (
              <TableRow key={p.id}>
                <TableCell className="font-medium">
                  <a href={`/pool/${p.id}`} className="hover:underline">
                    {p.company}
                  </a>
                </TableCell>
                <TableCell>{[p.contact_name, p.email || p.phone].filter(Boolean).join(" · ")}</TableCell>
                <TableCell>
                  <StatusBadge status={p.status} />
                </TableCell>
                <TableCell>{p.sourced_by}</TableCell>
                <TableCell className={cn("tabular-nums", due && "font-medium text-destructive")}>
                  {p.next_action ?? ""}
                </TableCell>
                <TableCell className="text-right tabular-nums">{p.touches}</TableCell>
                <TableCell className="tabular-nums text-muted-foreground">{p.updated}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <p className="mt-2 text-xs text-muted-foreground">
        {rows.length} prospects. A red next action is due. You write the rows you sourced; the others are read-only.
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Add a prospect</CardTitle>
          <CardDescription>Company and source now; the rest on the row&apos;s page.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={addProspect} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Company">
              <Input name="company" required />
            </Field>
            <Field label="Source">
              <Input name="source" required placeholder="who referred, which event, which list" />
            </Field>
            <Field label="Contact">
              <Input name="contact_name" />
            </Field>
            <Field label="Email">
              <Input type="email" name="email" />
            </Field>
            <Field label="Phone">
              <Input name="phone" placeholder="+351 …" />
            </Field>
            <Field label="Country">
              <Input name="country" placeholder="PT, BE, GB" maxLength={2} />
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
            <Field label="Notes" className="sm:col-span-2 lg:col-span-3">
              <Textarea name="notes" rows={2} />
            </Field>
            <div>
              <Button type="submit">Add</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Shell>
  );
}
