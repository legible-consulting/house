import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/desk/page-header";
import { Prose } from "@/components/desk/prose";
import { VerdictTag } from "@/components/desk/status-tag";
import { verdictBySlug } from "@/lib/house";
import { currentUser } from "@/lib/user";

// One verdict or concept (research/{verdicts,concepts}/<slug>.md), from the house at
// build time (lib/house.ts): the frontmatter as the lede, the body as prose, the file on
// GitHub and the item's source as links. Jamie only.
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
  const facts = [
    v.kind,
    v.tier,
    v.use.join(" "),
    v.tags.join(", "),
    v.date && `judged ${v.date}`,
    v.recheck && `recheck ${v.recheck}`,
    v.via && `via ${v.via}`,
  ]
    .filter(Boolean)
    .join(" · ");
  const file = `https://github.com/legible-consulting/house/blob/main/research/${v.folder}/${v.slug}.md`;
  return (
    <>
      <PageHeader
        user={user}
        title={v.name}
        back={{ href: "/research", label: "Research" }}
        meta={facts}
        actions={<VerdictTag verdict={v.verdict} />}
      />
      <Prose markdown={v.body} />
      <p className="mt-6 text-xs text-muted-foreground">
        <a href={file} className="underline">
          The file on GitHub
        </a>
        {v.source && (
          <>
            {" · "}
            <a href={v.source} className="underline">
              Source
            </a>
          </>
        )}
      </p>
    </>
  );
}
