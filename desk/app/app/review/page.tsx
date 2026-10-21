import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Search } from "@/lib/guard";
import { clients, day, openItems, reviewDoc } from "@/lib/house";
import { isoWeek, review, today } from "@/lib/rhythms";
import { currentUser } from "@/lib/user";
import { cn } from "@/lib/utils";
import { Shell } from "../_shell";
import { Heading, Prose } from "../_ui";

// The Friday review (desk/CONTEXT.md): every client's next action and deadline, soonest
// first, plus the one flat open-items list from core/open-items.md. Jamie's page. When
// rhythms.yml has committed desk/review/<this ISO week>.md, the page renders that file, as
// the desk renders the glance; otherwise, or with ?live=1, it computes the same rules live
// (lib/rhythms.ts).
export const dynamic = "force-dynamic";

export default async function Review({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "jamie") redirect("/");
  const now = today();
  const week = isoWeek(now);
  const live = (await searchParams).live === "1";
  if (!live && reviewDoc?.file === `${week}.md`) {
    return (
      <Shell user={user} current="/review">
        <Heading
          title={reviewDoc.title}
          lede={
            <>
              desk/review/{reviewDoc.file}, written by rhythms.yml on {reviewDoc.date}.{" "}
              <a href="/review?live=1" className="underline">
                The live view
              </a>{" "}
              reads the house as of the last push.
            </>
          }
        />
        <Card>
          <CardContent>
            <Prose markdown={reviewDoc.body.replace(/^# .*\n+/, "")} />
          </CardContent>
        </Card>
      </Shell>
    );
  }
  const { rows, ongoing } = review(clients, now);
  return (
    <Shell user={user} current="/review">
      <Heading
        title={`Friday review · ${week}`}
        lede={`${now}. Every client's next action and deadline, then the open items. A red deadline is inside seven days or past.`}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Kind</TableHead>
            <TableHead>Next action</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="text-right">Days</TableHead>
            <TableHead>Salesman</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-muted-foreground">
                No client with a next action or a deadline.
              </TableCell>
            </TableRow>
          )}
          {rows.map(({ client: c, days }) => {
            const soon = days !== null && days <= 7;
            return (
              <TableRow key={c.slug}>
                <TableCell className="font-medium">
                  <a href={`/clients/${c.slug}`} className="hover:underline">
                    {c.name ?? c.slug}
                  </a>
                </TableCell>
                <TableCell>{c.stage ?? ""}</TableCell>
                <TableCell>{c.kind ?? ""}</TableCell>
                <TableCell className={cn(!c.next_action && "text-muted-foreground")}>
                  {c.next_action ?? "no next action"}
                </TableCell>
                <TableCell className={cn("tabular-nums", soon && "font-medium text-destructive")}>{day(c.deadline)}</TableCell>
                <TableCell className={cn("text-right tabular-nums", soon && "font-medium text-destructive")}>
                  {days === null ? "" : days < 0 ? `${days} overdue` : days}
                </TableCell>
                <TableCell className="text-muted-foreground">{c.salesman ?? ""}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {ongoing.length > 0 && (
        <p className="mt-2 text-xs text-muted-foreground">
          Ongoing, no next action needed: {ongoing.map((c) => `${c.name ?? c.slug} (${c.kind})`).join(", ")}.
        </p>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{openItems.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Prose markdown={openItems.body.replace(/^# .*\n+/, "")} />
        </CardContent>
      </Card>
    </Shell>
  );
}
