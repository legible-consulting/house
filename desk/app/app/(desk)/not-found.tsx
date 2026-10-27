import Link from "next/link";
import { PageHeader } from "@/components/desk/page-header";
import { currentUser } from "@/lib/user";

// The not-found view inside the shell: a page called notFound() for a slug or an id the house
// or the pool does not have. A path outside the desk's routes renders app/not-found.tsx.
export default async function DeskNotFound() {
  const user = await currentUser();
  return (
    <>
      <PageHeader user={user} title="Not found" />
      <p className="text-body text-muted-foreground">
        Nothing in the house or the pool has this address.{" "}
        <Link href="/" className="underline">
          Back to the desk
        </Link>
        .
      </p>
    </>
  );
}
