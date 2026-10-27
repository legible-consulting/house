import { redirect } from "next/navigation";
import { Heading } from "@/components/desk/document";
import { Field } from "@/components/desk/field-group";
import { Flash } from "@/components/desk/flash";
import { PageHeader } from "@/components/desk/page-header";
import { VerdictTag } from "@/components/desk/status-tag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { flash, type Search } from "@/lib/guard";
import { research, type Verdict } from "@/lib/house";
import { queue } from "@/lib/research";
import { currentUser } from "@/lib/user";
import { cn } from "@/lib/utils";
import { addLink } from "./actions";

// Jamie's research page (research, research/CONTEXT.md). Three parts: the form to paste a
// link from the computer (the phone shares to /share instead); every verdict and concept
// from main at build time (lib/house.ts), under four filters in the query (?use=, ?kind=,
// ?verdict=, ?tier=), each opening on /research/<slug>; and the queue, the links the daily
// intake has not judged yet, read per request from main (lib/research.ts). The filters'
// values come from the files, so a new kind or use appears without a change here.
export const dynamic = "force-dynamic";

const FILTERS = ["use", "kind", "verdict", "tier"] as const;
type Filter = (typeof FILTERS)[number];

const valuesOf = (v: Verdict, f: Filter): string[] =>
  f === "use" ? v.use : [v[f]].filter(Boolean);

const choices = (f: Filter): string[] => [...new Set(research.flatMap((v) => valuesOf(v, f)))].sort();

export default async function Research({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "jamie") redirect("/");
  const q = await searchParams;
  const { error, note } = await flash(searchParams);
  const active = Object.fromEntries(FILTERS.map((f) => [f, typeof q[f] === "string" ? q[f] : ""])) as Record<
    Filter,
    string
  >;
  const shown = research.filter((v) => FILTERS.every((f) => !active[f] || valuesOf(v, f).includes(active[f])));
  const href = (f: Filter, value: string) => {
    const p = new URLSearchParams();
    for (const g of FILTERS) {
      const val = g === f ? value : active[g];
      if (val) p.set(g, val);
    }
    const s = p.toString();
    return `/research${s ? `?${s}` : ""}`;
  };
  const chip = (on: boolean) =>
    cn(
      "rounded-full border px-3 py-1 text-xs",
      on ? "border-foreground bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
    );
  const waiting = await queue();
  return (
    <>
      <PageHeader user={user} title="Research" meta={`${research.length} verdicts and concepts`} />
      <p className="mb-4 text-body text-muted-foreground">
        A link lands here, the daily intake writes its verdict into the house, and the verdict shows below after the
        next push to main. On the phone: install the desk from Chrome&apos;s menu, then share any link to Desk.
      </p>
      <Flash error={error} note={note} />
      <form action={addLink} className="mb-8 flex flex-wrap items-end gap-3">
        <Field label="Link" className="min-w-64 flex-1">
          <Input name="url" type="url" required placeholder="https://…" />
        </Field>
        <Field label="Note" className="min-w-64 flex-1">
          <Input name="text" placeholder="why it caught your eye, optional" />
        </Field>
        <Button type="submit">Queue</Button>
      </form>

      <section className="mb-8">
        <Heading title={`Verdicts and concepts: ${shown.length} of ${research.length}`} />
        <div className="mb-4 grid gap-2">
          {FILTERS.map((f) => (
            <div key={f} className="flex flex-wrap items-center gap-2">
              <span className="w-14 text-xs text-muted-foreground">{f}</span>
              <a href={href(f, "")} className={chip(!active[f])}>
                all
              </a>
              {choices(f).map((v) => (
                <a key={v} href={href(f, v)} className={chip(active[f] === v)}>
                  {v}
                </a>
              ))}
            </div>
          ))}
        </div>
        {shown.length === 0 && <p className="text-sm text-muted-foreground">No file matches these filters.</p>}
        <ul className="text-sm">
          {shown.map((v) => (
            <li key={`${v.folder}/${v.slug}`} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-b py-2">
              <a href={`/research/${v.slug}`} className="font-medium underline">
                {v.name}
              </a>
              <VerdictTag verdict={v.verdict} />
              <span className="text-xs text-muted-foreground">
                {[v.kind, v.tier, v.use.join(" "), v.tags.join(", "), v.date].filter(Boolean).join(" · ")}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Heading title={waiting.ok ? `Waiting for the intake: ${waiting.files.length}` : "Waiting for the intake"} />
        {!waiting.ok && <p className="text-sm text-muted-foreground">{waiting.reason}</p>}
        {waiting.ok && waiting.files.length === 0 && <p className="text-sm text-muted-foreground">Nothing waits.</p>}
        {waiting.ok && waiting.files.length > 0 && (
          <ul className="text-sm">
            {waiting.files.map((f) => (
              <li key={f.name} className="border-b py-1.5">
                <a href={f.url} className="underline">
                  {f.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
