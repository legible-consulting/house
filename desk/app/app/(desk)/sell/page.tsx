import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Fold } from "@/components/desk/fold";
import { PageHeader } from "@/components/desk/page-header";
import { Prose } from "@/components/desk/prose";
import { Stat, StatGrid } from "@/components/desk/stat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Search } from "@/lib/guard";
import { sell } from "@/lib/house";
import { KIT_PARTS } from "@/lib/kit";
import { LANGUAGE_NAMES } from "@/lib/language";
import { render } from "@/lib/markdown";
import { CADENCE } from "@/lib/pool";
import { currentUser } from "@/lib/user";
import { cn } from "@/lib/utils";
import { courseHref, kitIn, marked, ReadIn, readingLanguage } from "./_course";

// Sell: the course's index (salesman-desk, decision 4). The seller kit (kit.<language>.md, parsed
// into lessons by lib/kit.ts) in one language: the user's (lib/language.ts), or another for one
// read (?lang=, the "Read in" group). The kit's intro as prose, then its three parts, each a list
// of its lessons in the kit's order, one row per lesson linked to /sell/<key>. Jamie also gets the
// house's model, target-profile.md and cadence.md, under a fold at the foot; a salesman does not
// read them in the desk (the breakdown, question 1). No paragraph explains the page
// (desk/app/DESIGN.md, rule 9). The page's own words are the reader's (lib/words.ts sell): the
// URL's language for one read, under `lang`, else the user's; the fold is Jamie's and English.
// A change in the folder ships with the next push to main.
export const dynamic = "force-dynamic";

// A file's H2 sections, rendered once per server: the words are fixed at build time. The H1
// and the paragraph before the first H2 are the intro.
function sections(markdown: string): { title: string; html: string }[] {
  const parts = markdown.replace(/^# .*\n+/, "").split(/^## /m);
  const out: { title: string; html: string }[] = [];
  const intro = (parts[0] ?? "").trim();
  if (intro) out.push({ title: "", html: render(intro) });
  for (const part of parts.slice(1)) {
    const nl = part.indexOf("\n");
    const title = (nl < 0 ? part : part.slice(0, nl)).trim();
    const body = nl < 0 ? "" : part.slice(nl + 1).trim();
    out.push({ title, html: render(body) });
  }
  return out;
}

const profile = sections(sell.profile.body);
const cadence = sections(sell.cadence.body);
const intros = new Map(sell.kit.map((k) => [k.language, marked(render(k.intro))]));

// The card grid of a model file: one card per section, the intro across the row. One column on
// the phone, two from sm.
function Sections({ list }: { list: { title: string; html: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {list.map((s, i) => (
        <Card key={i} className={cn(!s.title && "sm:col-span-2")}>
          {s.title && (
            <CardHeader>
              <CardTitle>
                <h4>{s.title}</h4>
              </CardTitle>
            </CardHeader>
          )}
          <CardContent>
            <Prose html={s.html} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default async function Sell({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "client") redirect("/");
  const [q, h] = await Promise.all([searchParams, headers()]);
  const { lang, pinned, w } = await readingLanguage(user, q.lang, h.get("accept-language"));
  const kit = kitIn(lang);
  return (
    <div lang={pinned ?? undefined}>
      <PageHeader user={user} title={w.sell.title} meta={w.sell.meta(LANGUAGE_NAMES[lang], kit.lessons.length)} />
      <div className="grid gap-10">
        <div className="grid max-w-reading gap-6">
          <ReadIn path="/sell" lang={lang} label={w.sell.readIn} />
          {kit.intro && <Prose html={intros.get(kit.language)} />}
        </div>

        {KIT_PARTS.map((part) => {
          const lessons = kit.lessons.filter((l) => l.part === part);
          if (lessons.length === 0) return null;
          return (
            <section key={part} aria-labelledby={`part-${part}`} className="grid max-w-reading gap-3">
              <h2 id={`part-${part}`} className="text-heading">
                {w.sell.parts[part]}
              </h2>
              <ol className="divide-y border-y">
                {lessons.map((l, i) => (
                  <li key={l.key}>
                    <Link
                      href={courseHref(`/sell/${l.key}`, pinned)}
                      className="group flex min-h-row items-center gap-3 py-2 text-ui"
                    >
                      <span className="w-6 shrink-0 font-mono text-meta tabular-nums text-muted-foreground">
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1 font-semibold group-hover:underline">{l.title}</span>
                      {l.status && (
                        <span className="shrink-0 font-mono text-meta text-muted-foreground">{l.status}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}

        {user.role === "jamie" && (
          <Fold label="The house's model" count={2} limit={0}>
            <div className="grid gap-10 pt-4">
              <section aria-labelledby="model-profile" className="grid gap-4">
                <h3 id="model-profile" className="text-heading">
                  {sell.profile.title}
                </h3>
                <Sections list={profile} />
              </section>
              <section aria-labelledby="model-cadence" className="grid gap-4">
                <h3 id="model-cadence" className="text-heading">
                  {sell.cadence.title}
                </h3>
                <StatGrid>
                  {CADENCE.map((c) => (
                    <Stat
                      key={c.day}
                      value={`day ${c.day}`}
                      label={c.touch ? `touch ${c.touch} · ${c.angle}` : c.angle}
                    />
                  ))}
                </StatGrid>
                <Sections list={cadence} />
              </section>
            </div>
          </Fold>
        )}
      </div>
    </div>
  );
}
