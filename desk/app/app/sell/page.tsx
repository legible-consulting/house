import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Search } from "@/lib/guard";
import { type Pitch, sell } from "@/lib/house";
import { render } from "@/lib/markdown";
import { CADENCE, LANGUAGES } from "@/lib/pool";
import { currentUser } from "@/lib/user";
import { cn } from "@/lib/utils";
import { CopyButton } from "../_copy";
import { Shell } from "../_shell";
import { Prose } from "../_ui";

// Sell: what prospecting gives a salesman before the first touch, read-only (prospect.md, "The
// salesman's deal"), from 01-prospecting/ at build time. The target profile and the
// cadence as cards, one per section of the file; the cadence's days as a strip; every pitch
// draft by touch, in one language or all (?lang=), each with a Copy button and its
// placeholders marked; the seller kit (kit.<language>.md) as cards, one per section, in the
// same language or all. A row's next touch, filled from the row, is on the pool row's page.
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

// A placeholder the sender fills (<first name>, <one thing seen>) is marked in the rendered
// draft. lib/markdown.ts shows raw HTML as text, so it is escaped here.
const marked = (html: string): string =>
  html.replace(/&lt;([^&<>]+)&gt;/g, '<mark class="rounded bg-amber-100 px-1 dark:bg-amber-900/40">&lt;$1&gt;</mark>');

const profile = sections(sell.profile.body);
const cadence = sections(sell.cadence.body);
const pitches = sell.pitch.map((p) => ({ ...p, html: marked(render(p.body)) }));
const touches = [...new Set(pitches.map((p) => p.touch))].sort((a, b) => a - b);
const kits = sell.kit.map((k) => ({
  ...k,
  sections: sections(k.body).map((s) => ({ ...s, html: marked(s.html) })),
}));

// "Opener · en-GB" → "Opener"
const angle = (p: Pitch) => p.title.split(" · ")[0];

function Sections({ list }: { list: { title: string; html: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {list.map((s, i) => (
        <Card key={i} className={cn(!s.title && "sm:col-span-2")}>
          {s.title && (
            <CardHeader>
              <CardTitle>{s.title}</CardTitle>
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
  const q = await searchParams;
  const lang = typeof q.lang === "string" && (LANGUAGES as readonly string[]).includes(q.lang) ? q.lang : "";
  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-3 py-1 text-xs",
      active ? "border-foreground bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
    );
  // One language or all, for the pitches and the kit alike; the anchor keeps the reader in place.
  const languages = (anchor: string) => (
    <nav className="flex flex-wrap gap-2" aria-label="Language">
      <a href={`/sell#${anchor}`} aria-current={lang === "" ? "true" : undefined} className={chip(lang === "")}>
        Every language
      </a>
      {LANGUAGES.map((l) => (
        <a key={l} href={`/sell?lang=${l}#${anchor}`} aria-current={lang === l ? "true" : undefined} className={chip(lang === l)}>
          {l}
        </a>
      ))}
    </nav>
  );
  return (
    <Shell user={user} current="/sell">
      <h2 className="mb-1 text-base font-medium">Sell</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Who the pool chases, how a prospect is approached, the draft for each touch, and the seller kit. Read-only: the
        words live in <code className="font-mono text-xs">01-prospecting/</code> and change there. On a pool row,
        the next touch comes filled in.
      </p>
      <nav className="mb-6 flex gap-3 text-sm">
        <a href="#profile" className="text-muted-foreground hover:text-foreground">
          {sell.profile.title}
        </a>
        <a href="#cadence" className="text-muted-foreground hover:text-foreground">
          {sell.cadence.title}
        </a>
        <a href="#pitch" className="text-muted-foreground hover:text-foreground">
          Pitch
        </a>
        <a href="#kit" className="text-muted-foreground hover:text-foreground">
          Kit
        </a>
      </nav>
      <div className="grid gap-8">
        <section id="profile" className="grid gap-3">
          <h3 className="text-base font-medium">{sell.profile.title}</h3>
          <Sections list={profile} />
        </section>

        <section id="cadence" className="grid gap-3">
          <h3 className="text-base font-medium">{sell.cadence.title}</h3>
          <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CADENCE.map((c) => (
              <li key={c.day} className="rounded-lg border px-4 py-3">
                <div className="text-2xl font-semibold tabular-nums">day {c.day}</div>
                <div className="text-xs text-muted-foreground">{c.touch ? `touch ${c.touch} · ${c.angle}` : c.angle}</div>
              </li>
            ))}
          </ol>
          <Sections list={cadence} />
        </section>

        <section id="pitch" className="grid gap-4">
          <div>
            <h3 className="text-base font-medium">Pitch</h3>
            <p className="text-sm text-muted-foreground">
              One draft per touch and language. A marked part is yours to fill. Adapt it in your own mailbox, in the
              prospect&apos;s language; the desk sends nothing.
            </p>
          </div>
          {languages("pitch")}
          {touches.map((t) => {
            const drafts = pitches.filter((p) => p.touch === t && (!lang || p.language === lang));
            if (drafts.length === 0) return null;
            return (
              <Card key={t}>
                <CardHeader>
                  <CardTitle>
                    {t} · {angle(drafts[0]!)}
                  </CardTitle>
                </CardHeader>
                <CardContent className={cn("grid gap-6", !lang && "lg:grid-cols-3")}>
                  {drafts.map((p) => (
                    <div key={p.file} className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{p.language}</Badge>
                        <CopyButton text={p.body} label="Copy the draft" size="xs" variant="outline" />
                      </div>
                      <Prose html={p.html} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section id="kit" className="grid gap-4">
          <div>
            <h3 className="text-base font-medium">Kit</h3>
            <p className="text-sm text-muted-foreground">
              How a lead reaches Jamie, the openers for your own channels, the answers when a prospect hesitates, what
              Jamie sells, and what your 10% looks like. A marked part is yours to fill.
            </p>
          </div>
          {languages("kit")}
          {kits
            .filter((k) => !lang || k.language === lang)
            .map((k) => (
              <div key={k.file} className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{k.language}</Badge>
                  <span className="text-sm font-medium">{k.title}</span>
                </div>
                <Sections list={k.sections} />
              </div>
            ))}
        </section>
      </div>
    </Shell>
  );
}
