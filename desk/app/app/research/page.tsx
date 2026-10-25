import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { flash, type Search } from "@/lib/guard";
import { queue } from "@/lib/research";
import { currentUser } from "@/lib/user";
import { Shell } from "../_shell";
import { Field, Flash, Heading } from "../_ui";
import { addLink } from "./actions";

// Jamie's research queue (O1, operator/research/CONTEXT.md): the links shared to the desk
// that the daily intake has not judged yet, read per request from main. A link is pasted
// here from the computer, or shared from the phone to the installed desk (/share). The
// verdicts live in the house and reach a session, not this page.
export const dynamic = "force-dynamic";

export default async function Research({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "jamie") redirect("/");
  const { error, note } = await flash(searchParams);
  const q = await queue();
  return (
    <Shell user={user} current="/research">
      <Heading
        title="Research"
        lede="A link lands here, and the daily intake writes its verdict into the house. On the phone: install the desk from Chrome's menu, then share any link to Desk."
      />
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
      <Heading title={q.ok ? `Waiting for the intake: ${q.files.length}` : "Waiting for the intake"} />
      {!q.ok && <p className="text-sm text-muted-foreground">{q.reason}</p>}
      {q.ok && q.files.length === 0 && <p className="text-sm text-muted-foreground">Nothing waits.</p>}
      {q.ok && q.files.length > 0 && (
        <ul className="text-sm">
          {q.files.map((f) => (
            <li key={f.name} className="border-b py-1.5">
              <a href={f.url} className="underline">
                {f.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}
