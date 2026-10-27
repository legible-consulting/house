"use client";

import { useActionState, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FormSnapshot } from "@/lib/forms";
import { describedBy, Question, Row } from "@/app/_questions";
import { submitStart } from "./actions";
import type { Copy, StartState } from "./copy";

// The free look as the visitor fills it: the three identity fields, the honeypot, then one
// control per question (app/_questions.tsx). Every control is controlled: React resets a
// <form action> when the action resolves, and a failed check must not empty the page (why: the
// typed values stay · 2026-10-25). The errors come back from the action, in the visitor's
// language.

type PageCopy = Omit<Copy, "errors">;

export function StartForm({ form, copy }: { form: FormSnapshot; copy: PageCopy }) {
  const [state, action, pending] = useActionState(submitStart, { status: "idle" } as StartState);
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

  const identity = (name: "name" | "email" | "phone", type: string, autoComplete: string) => (
    <Row
      id={name}
      label={copy[name]}
      hint={name === "phone" ? copy.phoneHint : undefined}
      optional={name === "phone" ? copy.optional : undefined}
      error={err[name]}
    >
      <Input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(err[name])}
        aria-describedby={describedBy(name, name === "phone" ? copy.phoneHint : undefined, err[name])}
        value={values[name] ?? ""}
        onChange={(e) => set(name)(e.target.value)}
      />
    </Row>
  );

  return (
    <form action={action} noValidate className="grid gap-8">
      <input type="hidden" name="lang" value={form.language} />
      {state.status === "error" && state.message && (
        <Alert variant="destructive">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <section className="grid gap-4">
        <h2 className="text-heading">{copy.identity}</h2>
        {identity("name", "text", "name")}
        {identity("email", "email", "email")}
        {identity("phone", "tel", "tel")}
        {/* The honeypot: no person sees it or reaches it by tab. A value is a bot. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>
      </section>
      <section className="grid gap-4">
        <h2 className="text-heading">{copy.questions}</h2>
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
