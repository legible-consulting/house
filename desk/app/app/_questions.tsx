"use client";

import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import type { FormField } from "@/lib/forms";

// A form's fields as a visitor fills them, shared by the two public pages: /start (app/start/)
// and /f/<token> (app/f/). A question posts as `q_<key>`; the error under it comes back from
// the page's action, in the visitor's language. Every control is controlled by the page.

export function Row({
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

export function Question({
  field,
  value,
  set,
  error,
  words,
}: {
  field: FormField;
  value: string;
  set: (v: string) => void;
  error?: string;
  words: { choose: string; optional: string };
}) {
  const id = `q_${field.key}`;
  const a11y = { id, name: id, "aria-invalid": Boolean(error), "aria-describedby": error ? `${id}-error` : undefined };
  const control =
    field.type === "textarea" ? (
      <Textarea {...a11y} rows={3} value={value} onChange={(e) => set(e.target.value)} />
    ) : field.type === "select" ? (
      <NativeSelect {...a11y} className="w-full" value={value} onChange={(e) => set(e.target.value)}>
        <NativeSelectOption value="">{words.choose}</NativeSelectOption>
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
    <Row id={id} label={field.label} hint={field.hint} error={error} optional={field.required ? undefined : words.optional}>
      {control}
    </Row>
  );
}
