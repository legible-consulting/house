import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { LinkCopy } from "./copy";

// The two dead ends of /f/<token>: a link with no row (mistyped, or withdrawn by Jamie in the
// Neon console), which names the business email, and a link answered already.
export function DeadEnd({ kind, copy, email }: { kind: "invalid" | "answered"; copy: LinkCopy; email: string }) {
  if (kind === "answered") {
    return (
      <Alert>
        <AlertTitle>{copy.answeredTitle}</AlertTitle>
        <AlertDescription>{copy.answeredBody}</AlertDescription>
      </Alert>
    );
  }
  return (
    <Alert variant="destructive">
      <AlertTitle>{copy.invalidTitle}</AlertTitle>
      <AlertDescription>
        <p>
          {copy.invalidBody}{" "}
          <a href={`mailto:${email}`} className="underline underline-offset-4">
            {email}
          </a>
          .
        </p>
      </AlertDescription>
    </Alert>
  );
}
