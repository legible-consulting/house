import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { estate } from "@/lib/house";
import { currentUser } from "@/lib/user";
import { Shell } from "../_shell";
import { Heading, Prose } from "../_ui";

// The estate: the latest drift report in desk/estate/ (D4 writes one per run against the
// blueprint's tag). Jamie's page. The quarterly audit stays a file: it is read, not glanced.
export const dynamic = "force-dynamic";

export default async function Estate() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "jamie") redirect("/");
  return (
    <Shell user={user} current="/estate">
      <Heading
        title={estate?.title ?? "Estate"}
        lede="Every repo in desk/mani.yaml against the blueprint. A drifted repo gets one PR from conform.sh; the merge is Jamie's."
      />
      <Card>
        <CardContent>
          {estate ? (
            <Prose markdown={estate.body.replace(/^# .*\n+/, "")} />
          ) : (
            <p className="text-sm text-muted-foreground">No drift report yet in desk/estate/.</p>
          )}
        </CardContent>
      </Card>
    </Shell>
  );
}
