import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/desk/logo";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// The card of sign-in and the two password pages: one card of 360 px at most on a centred
// column, the mark above the title, the title as the page's one h1. At 390 the card fills the
// column inside the gutter. The column starts near the top and is never centred on the
// height, so a phone's keyboard (interactive-widget=resizes-content, app/layout.tsx) shrinks
// the page under the field and the browser scrolls the focused field into view.
export function AuthCard({
  title,
  description,
  footer,
  children,
}: {
  title: string;
  description: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto mt-8 w-full max-w-auth">
      <Card>
        <CardHeader className="gap-2">
          <span className="mb-2 grid size-8 place-items-center rounded-sm bg-primary text-primary-foreground">
            <Logo className="size-6" />
          </span>
          <h1 className="text-title">{title}</h1>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex-col items-start gap-1">{footer}</CardFooter>
      </Card>
    </main>
  );
}

// A link in the card's footer: a full row tall, so it reaches 44 px on touch.
export function AuthLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-row items-center text-ui text-muted-foreground transition-colors duration-100 hover:text-foreground",
        className,
      )}
    >
      {children}
    </Link>
  );
}
