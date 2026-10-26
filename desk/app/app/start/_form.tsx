"use client";

import { useActionState, useState, type ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import type { FormField, FormSnapshot } from "@/lib/forms";
import { submitStart } from "./actions";
import type { Copy, StartState } from "./copy";

// The free look as the visitor fills it: the three identity fields, the honeypot, then one
// control per question. Every control is controlled: React resets a <form action> when the
// action resolves, and a failed check must not empty the page (why: the typed values stay ·
// 2026-10-25). The errors come back from the action, in the visitor's language.

type PageCopy = Omit<Copy, "errors">;

function Row({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: string | null;
  error?: string;
  optional?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <span className="ml-2 text-xs font-normal text-muted-foreground">{optional}</span>}
      </label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function Question({
  field,
  value,
  set,
  error,
  copy,
}: {
  field: FormField;
  value: string;
  set: (v: string) => void;
  error?: string;
  copy: PageCopy;
}) {
  const id = `q_${field.key}`;
  const a11y = { id, name: id, "aria-invalid": Boolean(error), "aria-describedby": error ? `${id}-error` : undefined };
  const control =
    field.type === "textarea" ? (
      <Textarea {...a11y} rows={3} value={value} onChange={(e) => set(e.target.value)} />
    ) : field.type === "select" ? (
      <NativeSelect {...a11y} className="w-full" value={value} onChange={(e) => set(e.target.value)}>
        <NativeSelectOption value="">{copy.choose}</NativeSelectOption>
        {field.options?.map((o) => (
          <NativeSelectOption key={o} value={o}>
            {o}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    ) : field.type === "boolean" ? (
      <input
        {...a11y}
        type="checkbox"
        value="yes"
        className="size-4"
        checked={value === "yes"}
        onChange={(e) => set(e.target.checked ? "yes" : "")}
      />
    ) : (
      <Input {...a11y} value={value} onChange={(e) => set(e.target.value)} />
    );
  return (
    <Row id={id} label={field.label} hint={field.hint} error={error} optional={field.required ? undefined : copy.optional}>
      {control}
    </Row>
  );
}

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
        aria-describedby={err[name] ? `${name}-error` : undefined}
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
        <h2 className="text-base font-medium">{copy.identity}</h2>
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
        <h2 className="text-base font-medium">{copy.questions}</h2>
        {form.fields.map((f) => (
          <Question
            key={f.key}
            field={f}
            value={values[`q_${f.key}`] ?? ""}
            set={set(`q_${f.key}`)}
            error={err[f.key]}
            copy={copy}
          />
        ))}
      </section>
      <Button type="submit" disabled={pending} className="w-full sm:w-auto sm:justify-self-start">
        {pending ? copy.submitting : copy.submit}
      </Button>
    </form>
  );
}
