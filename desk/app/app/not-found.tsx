import Link from "next/link";
import { Logo } from "@/components/desk/logo";

// A path the desk does not have. The root layout is static and reads no session, so this
// view draws no shell: the mark, one sentence, the way to the desk. A page in the shell that
// calls notFound() renders app/(desk)/not-found.tsx instead, inside the chrome.
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col justify-center gap-4 px-gutter py-8">
      <span className="grid size-8 place-items-center rounded-sm bg-primary text-primary-foreground">
        <Logo className="size-6" />
      </span>
      <h1 className="text-title">Not found</h1>
      <p className="text-body text-muted-foreground">
        The desk has no page at this address.{" "}
        <Link href="/" className="underline">
          The desk
        </Link>{" "}
        starts at the root.
      </p>
    </div>
  );
}
