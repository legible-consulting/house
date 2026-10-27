import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { FilterGroup } from "@/app/_filters";
import { CopyButton } from "@/app/_copy";
import { PageHeader } from "@/components/desk/page-header";
import { Prose } from "@/components/desk/prose";
import { Stat, StatGrid } from "@/components/desk/stat";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Search } from "@/lib/guard";
import { type Pitch, sell } from "@/lib/house";
import { render } from "@/lib/markdown";
import { CADENCE, LANGUAGES } from "@/lib/pool";
import { currentUser } from "@/lib/user";
import { cn } from "@/lib/utils";
import { JumpGroup } from "./_jump";

// Sell: what prospecting gives a salesman before the first touch, read-only (prospect.md, "The
// salesman's deal"), from 01-prospecting/ at build time. Four sections, reached from a toggle
// group at the top: the target profile and the cadence as card grids, one card per section of
// the file, the cadence's days as four stat tiles; every pitch draft by touch, in one
// language or all (?lang=, a toggle group), each with a Copy button and its placeholders
// marked; the seller kit (kit.<language>.md) in the same cards and the same language. A
// row's next touch, filled from the row, is on the pool row's page. A change in the folder
// ships with the next push to main.
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
  html.replace(/&lt;([^&<>]+)&gt;/g, '<mark class="rounded-key bg-warning-soft px-1 text-foreground">&lt;$1&gt;</mark>');

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

// The card grid: one card per section of a file, the intro across the row. One column on the
// phone, two from sm. `level` is the cards' heading level under the section's.
function Sections({ list, level = 3 }: { list: { title: string; html: string }[]; level?: 3 | 4 }) {
  const Heading = level === 4 ? "h4" : "h3";
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {list.map((s, i) => (
        <Card key={i} className={cn(!s.title && "sm:col-span-2")}>
          {s.title && (
            <CardHeader>
              <CardTitle>
                <Heading>{s.title}</Heading>
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

// A section of the page: the jump group's target, under the sticky page header.
function Section({ id, title, lede, children }: { id: string; title: string; lede?: string; children: ReactNode }) {
  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      className="grid scroll-mt-[calc(var(--page-header)+1.5rem)] gap-4 outline-none"
    >
      <div>
        <h2 id={`${id}-title`} className="text-heading">
          {title}
        </h2>
        {lede && <p className="mt-1 max-w-reading text-body text-muted-foreground">{lede}</p>}
      </div>
      {children}
    </section>
  );
}

export default async function Sell({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "client") redirect("/");
  const q = await searchParams;
  const lang = typeof q.lang === "string" && (LANGUAGES as readonly string[]).includes(q.lang) ? q.lang : "";
  // One language or all, for the pitches and the kit alike, kept in the URL. The page stays
  // where it is: the sections above the filter do not change with it.
  const languages = (label: string) => (
    <FilterGroup
      label={label}
      value={lang || "all"}
      items={[
        { value: "all", label: "Every language", href: "/sell" },
        ...LANGUAGES.map((l) => ({ value: l, label: l, href: `/sell?lang=${l}` })),
      ]}
    />
  );
  return (
    <>
      <PageHeader user={user} title="Sell" meta="01-prospecting/" />
      <p className="mb-4 max-w-reading text-body text-muted-foreground">
        Who the pool chases, how a prospect is approached, the draft for each touch, and the seller kit. Read-only: the
        words live in <code className="font-mono text-meta">01-prospecting/</code> and change there. On a pool row,
        the next touch comes filled in.
      </p>
      <div className="mb-6">
        <JumpGroup
          label="Sections"
          items={[
            { id: "profile", label: sell.profile.title },
            { id: "cadence", label: sell.cadence.title },
            { id: "pitch", label: "Pitch" },
            { id: "kit", label: "Kit" },
          ]}
        />
      </div>
      <div className="grid gap-10">
        <Section id="profile" title={sell.profile.title}>
          <Sections list={profile} />
        </Section>

        <Section id="cadence" title={sell.cadence.title}>
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
        </Section>

        <Section
          id="pitch"
          title="Pitch"
          lede="One draft per touch and language. A marked part is yours to fill. Adapt it in your own mailbox, in the prospect's language; the desk sends nothing."
        >
          {languages("Language of the pitches")}
          {touches.map((t) => {
            const drafts = pitches.filter((p) => p.touch === t && (!lang || p.language === lang));
            if (drafts.length === 0) return null;
            return (
              <Card key={t}>
                <CardHeader>
                  <CardTitle>
                    <h3>
                      <span className="font-mono tabular-nums">{t}</span> · {angle(drafts[0]!)}
                    </h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className={cn("grid gap-6", !lang && "lg:grid-cols-3")}>
                  {drafts.map((p) => (
                    <div key={p.file} className="grid min-w-0 content-start gap-2">
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
        </Section>

        <Section
          id="kit"
          title="Kit"
          lede="How a lead reaches Jamie, the openers for your own channels, the answers when a prospect hesitates, what Jamie sells, and what your 10% looks like. A marked part is yours to fill."
        >
          {languages("Language of the kit")}
          {kits
            .filter((k) => !lang || k.language === lang)
            .map((k) => (
              <div key={k.file} className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{k.language}</Badge>
                  <h3 className="text-ui font-semibold">{k.title}</h3>
                </div>
                <Sections list={k.sections} level={4} />
              </div>
            ))}
        </Section>
      </div>
    </>
  );
}
