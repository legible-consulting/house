import { notFound, redirect } from "next/navigation";
import { Document } from "@/components/desk/document";
import { type Fact, Facts } from "@/components/desk/facts";
import { PageHeader } from "@/components/desk/page-header";
import { VerdictTag } from "@/components/desk/status-tag";
import { verdictBySlug } from "@/lib/house";
import { currentUser } from "@/lib/user";

// One verdict or concept (research/{verdicts,concepts}/<slug>.md), from the house at
// build time (lib/house.ts), as a document: the date as the eyebrow, the name as the title,
// the frontmatter as a definition list in the masthead, the body as prose, and the file on
// GitHub under it. The page header names the folder, so the full name is the document's
// title and is never cut. Jamie only.
export const dynamic = "force-dynamic";

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export default async function VerdictPage({ params }: { params: Promise<{ slug: string }> }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "jamie") redirect("/");
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) notFound();
  const v = verdictBySlug(slug);
  if (!v) notFound();
  const facts = (
    [
      { label: "Kind", value: v.kind, mono: true },
      { label: "Verdict", value: v.verdict && <VerdictTag verdict={v.verdict} /> },
      { label: "Tier", value: v.tier, mono: true },
      { label: "Use", value: v.use.join(" "), mono: true },
      { label: "Recheck", value: v.recheck, mono: true },
      { label: "Via", value: v.via },
      { label: "Tags", value: v.tags.join(", "), wide: true },
      {
        label: "Source",
        value: v.source && (
          <a href={v.source} className="inline-flex min-h-row items-center underline underline-offset-3">
            {v.source}
          </a>
        ),
        mono: true,
        wide: true,
      },
    ] as Fact[]
  ).filter((f) => f.value);
  const file = `https://github.com/legible-consulting/house/blob/main/research/${v.folder}/${v.slug}.md`;
  return (
    <>
      <PageHeader
        user={user}
        title={v.folder === "verdicts" ? "Verdict" : "Concept"}
        back={{ href: "/research", label: "Research" }}
        meta={v.slug}
      />
      <Document
        date={v.date && `judged ${v.date}`}
        title={v.name}
        facts={<Facts facts={facts} />}
        markdown={v.body}
      >
        <p className="mt-6 border-t pt-4 text-ui">
          <a href={file} className="inline-flex min-h-row items-center underline underline-offset-3">
            The file on GitHub
          </a>
        </p>
      </Document>
    </>
  );
}
