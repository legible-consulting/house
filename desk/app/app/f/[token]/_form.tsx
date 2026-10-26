"use client";

import { useActionState, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { FormSnapshot } from "@/lib/forms";
import { Question } from "../../_questions";
import { submitLink } from "./actions";
import type { LinkCopy, LinkState } from "./copy";
import { DeadEnd } from "./_dead-end";

// A sent link's questions as the person fills them, one control per question
// (app/_questions.tsx). The row already names the person, so the page asks nothing else. Every
// control is controlled, so a failed check keeps what was typed (why: the typed values stay ·
// 2026-10-25). The errors come back from the action, in the row's language.

export function LinkForm({
  token,
  form,
  copy,
  email,
}: {
  token: string;
  form: FormSnapshot;
  copy: LinkCopy;
  email: string; // the business email, for the dead end a spent row meets on submit
}) {
  const [state, action, pending] = useActionState(submitLink, { status: "idle" } as LinkState);
  const [values, setValues] = useState<Record<string, string>>({});
  const set = (name: string) => (v: string) => setValues((s) => ({ ...s, [name]: v }));
  const err = state.errors ?? {};

  if (state.status === "done") {
    return (
      <Alert>
        <AlertTitle>{copy.doneTitle}</AlertTitle>
        <AlertDescription>{copy.doneBody}</AlertDescription>
      </Alert>
    );
  }
  if (state.status === "invalid" || state.status === "answered") {
    return <DeadEnd kind={state.status} copy={copy} email={email} />;
  }

  return (
    <form action={action} noValidate className="grid gap-8">
      <input type="hidden" name="token" value={token} />
      {state.status === "error" && state.message && (
        <Alert variant="destructive">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <section className="grid gap-4">
        {form.fields.map((f) => (
          <Question
            key={f.key}
            field={f}
            value={values[`q_${f.key}`] ?? ""}
            set={set(`q_${f.key}`)}
            error={err[f.key]}
            words={copy}
          />
        ))}
      </section>
      <Button type="submit" disabled={pending} className="w-full sm:w-auto sm:justify-self-start">
        {pending ? copy.submitting : copy.submit}
      </Button>
    </form>
  );
}
